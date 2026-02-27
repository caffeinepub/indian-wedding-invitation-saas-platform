import React, { useEffect, useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useActor } from '../../hooks/useActor';
import { UserRole } from '../../backend';
import { Heart, Loader2, AlertTriangle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface AuthGuardProps {
  children: React.ReactNode;
}

type RoleAssignmentStatus = 'idle' | 'assigning' | 'done' | 'error';

export default function AuthGuard({ children }: AuthGuardProps) {
  const { identity, isInitializing, loginStatus, login } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const navigate = useNavigate();
  const isLoggingIn = loginStatus === 'logging-in';

  const [roleStatus, setRoleStatus] = useState<RoleAssignmentStatus>('idle');
  const [roleError, setRoleError] = useState<string | null>(null);

  useEffect(() => {
    if (!identity || !actor || actorFetching) {
      // Reset role status when identity/actor changes
      setRoleStatus('idle');
      setRoleError(null);
      return;
    }

    // Assign user role when first authenticated
    const assignRole = async () => {
      setRoleStatus('assigning');
      setRoleError(null);

      // Retry logic with exponential backoff
      const maxRetries = 3;
      let lastError: unknown = null;

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          await actor.assignCallerUserRole(identity.getPrincipal(), UserRole.user);
          setRoleStatus('done');
          return;
        } catch (err) {
          lastError = err;
          const raw = err instanceof Error ? err.message : String(err);
          // If role is already assigned or it's a permission issue that means role exists, treat as done
          if (
            raw.includes('already') ||
            raw.includes('Already') ||
            raw.includes('admin') // admins already have higher role
          ) {
            setRoleStatus('done');
            return;
          }
          // Wait before retrying (exponential backoff: 500ms, 1000ms, 2000ms)
          if (attempt < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, attempt)));
          }
        }
      }

      // After all retries, try to verify if the role was actually assigned
      try {
        const role = await actor.getCallerUserRole();
        if (role === UserRole.user || role === UserRole.admin) {
          setRoleStatus('done');
          return;
        }
      } catch {
        // ignore verification error
      }

      const errMsg = lastError instanceof Error ? lastError.message : String(lastError);
      setRoleError(errMsg);
      setRoleStatus('error');
    };

    assignRole();
  }, [identity, actor, actorFetching]);

  // Show loading while initializing or actor is fetching
  if (isInitializing || actorFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-gold-500 mx-auto mb-4" />
          <p className="text-charcoal-600 font-serif">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-50 to-gold-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-8">
            <Heart className="w-16 h-16 text-gold-500 mx-auto mb-4 fill-current" />
            <h1 className="text-3xl font-serif text-charcoal-800 mb-3">Welcome Back</h1>
            <p className="text-charcoal-600 leading-relaxed">
              Please sign in to access your wedding invitations and create beautiful memories.
            </p>
          </div>

          <button
            onClick={() => login()}
            disabled={isLoggingIn}
            className="w-full py-3 px-8 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-full transition-all duration-300 shadow-luxury hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 fill-current" />
                Sign In to Continue
              </>
            )}
          </button>

          <button
            onClick={() => navigate({ to: '/' })}
            className="mt-4 text-charcoal-500 hover:text-charcoal-700 text-sm underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Show loading while role is being assigned
  if (roleStatus === 'idle' || roleStatus === 'assigning') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-gold-500 mx-auto mb-4" />
          <p className="text-charcoal-600 font-serif">Setting up your account...</p>
          <p className="text-charcoal-400 text-sm mt-1">This only takes a moment</p>
        </div>
      </div>
    );
  }

  // Show error if role assignment failed after retries
  if (roleStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-50">
        <div className="text-center max-w-md mx-auto px-6">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-serif text-charcoal-800 mb-2">Account Setup Issue</h2>
          <p className="text-charcoal-600 text-sm mb-6">
            We had trouble setting up your account. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-full transition-all duration-300"
          >
            Refresh Page
          </button>
          <button
            onClick={() => navigate({ to: '/' })}
            className="mt-3 block mx-auto text-charcoal-500 hover:text-charcoal-700 text-sm underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Role is confirmed — render children
  return <>{children}</>;
}

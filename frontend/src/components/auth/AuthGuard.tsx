import React, { useEffect } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useActor } from '../../hooks/useActor';
import { UserRole } from '../../backend';
import { Heart, Loader2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { identity, isInitializing, loginStatus, login } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const navigate = useNavigate();
  const isLoggingIn = loginStatus === 'logging-in';

  useEffect(() => {
    if (!identity || !actor || actorFetching) return;

    // Assign user role when first authenticated
    const assignRole = async () => {
      try {
        await actor.assignCallerUserRole(identity.getPrincipal(), UserRole.user);
      } catch {
        // Role may already be assigned, ignore error
      }
    };

    assignRole();
  }, [identity, actor, actorFetching]);

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

  return <>{children}</>;
}

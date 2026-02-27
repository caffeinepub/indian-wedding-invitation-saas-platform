import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Plus, Edit, Trash2, Eye, Share2, Users, Calendar, MapPin, RefreshCw, Loader2, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useGetAllInvitations, useDeleteInvitation, usePublishInvitation } from '../hooks/useQueries';
import RSVPResponsesModal from '../components/dashboard/RSVPResponsesModal';
import Header from '../components/layout/Header';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: invitations, isLoading, error, refetch } = useGetAllInvitations();
  const deleteInvitation = useDeleteInvitation();
  const publishInvitation = usePublishInvitation();
  const [actionError, setActionError] = useState<string | null>(null);
  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>(null);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this invitation?')) return;
    setActionError(null);
    try {
      await deleteInvitation.mutateAsync(slug);
      toast.success('Invitation deleted successfully');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete invitation';
      setActionError(msg.includes('Unauthorized') ? 'Unable to delete invitation. Please try again.' : msg);
    }
  };

  const handlePublish = async (slug: string) => {
    setActionError(null);
    try {
      await publishInvitation.mutateAsync(slug);
      toast.success('Invitation published successfully!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to publish invitation';
      setActionError(msg.includes('Unauthorized') ? 'Unable to publish invitation. Please try again.' : msg);
    }
  };

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/invitation/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success('Invitation link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.98 0.005 80)' }}>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: 'oklch(0.72 0.12 75)' }} />
            <p style={{ color: 'oklch(0.50 0.04 60)' }}>Loading your invitations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.98 0.005 80)' }}>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto p-8 rounded-2xl border shadow-card" style={{ backgroundColor: 'oklch(0.99 0.003 80)', borderColor: 'oklch(0.88 0.02 80)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'oklch(0.93 0.03 15)' }}>
              <RefreshCw className="w-8 h-8" style={{ color: 'oklch(0.55 0.20 25)' }} />
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
              Service Unavailable
            </h2>
            <p className="text-sm mb-6" style={{ color: 'oklch(0.50 0.04 60)' }}>
              We're having trouble loading your invitations. Please check your connection and try again.
            </p>
            <Button onClick={() => refetch()} className="flex items-center gap-2 mx-auto" style={{ backgroundColor: 'oklch(0.55 0.18 45)', color: 'oklch(0.99 0.003 80)' }}>
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.98 0.005 80)' }}>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
              My Invitations
            </h1>
            <p className="text-sm" style={{ color: 'oklch(0.50 0.04 60)' }}>
              {invitations?.length || 0} invitation{(invitations?.length || 0) !== 1 ? 's' : ''} created
            </p>
          </div>
          <Button
            onClick={() => navigate({ to: '/create' })}
            className="flex items-center gap-2"
            style={{ backgroundColor: 'oklch(0.55 0.18 45)', color: 'oklch(0.99 0.003 80)' }}
          >
            <Plus className="w-4 h-4" />
            New Invitation
          </Button>
        </div>

        {/* Action Error Banner */}
        {actionError && (
          <div className="mb-6 p-4 rounded-xl border flex items-center gap-3" style={{ backgroundColor: 'oklch(0.97 0.03 80)', borderColor: 'oklch(0.82 0.09 78)', color: 'oklch(0.45 0.16 45)' }}>
            <span className="text-sm">{actionError}</span>
            <button onClick={() => setActionError(null)} className="ml-auto text-xs underline">Dismiss</button>
          </div>
        )}

        {/* Empty State */}
        {(!invitations || invitations.length === 0) && (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'oklch(0.94 0.02 80)' }}>
              <Calendar className="w-12 h-12" style={{ color: 'oklch(0.72 0.12 75)' }} />
            </div>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
              No Invitations Yet
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'oklch(0.50 0.04 60)' }}>
              Create your first beautiful wedding invitation and share it with your loved ones.
            </p>
            <Button
              onClick={() => navigate({ to: '/create' })}
              size="lg"
              className="flex items-center gap-2 mx-auto"
              style={{ backgroundColor: 'oklch(0.55 0.18 45)', color: 'oklch(0.99 0.003 80)' }}
            >
              <Plus className="w-5 h-5" />
              Create Your First Invitation
            </Button>
          </div>
        )}

        {/* Invitations Grid */}
        {invitations && invitations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="rounded-2xl border shadow-card overflow-hidden transition-all hover:shadow-card-hover"
                style={{ backgroundColor: 'oklch(0.99 0.003 80)', borderColor: 'oklch(0.88 0.02 80)' }}
              >
                {/* Card Header */}
                <div className="p-5 border-b" style={{ borderColor: 'oklch(0.88 0.02 80)', background: 'linear-gradient(135deg, oklch(0.97 0.01 80), oklch(0.94 0.02 80))' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold leading-tight" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
                        {invitation.brideName} & {invitation.groomName}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: 'oklch(0.50 0.04 60)' }}>/{invitation.id}</p>
                    </div>
                    <Badge
                      variant={invitation.isPublished ? 'default' : 'secondary'}
                      className="text-xs"
                      style={invitation.isPublished
                        ? { backgroundColor: 'oklch(0.55 0.18 45)', color: 'oklch(0.99 0.003 80)' }
                        : { backgroundColor: 'oklch(0.88 0.02 80)', color: 'oklch(0.50 0.04 60)' }
                      }
                    >
                      {invitation.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    {invitation.weddingDate && (
                      <div className="flex items-center gap-2 text-xs" style={{ color: 'oklch(0.50 0.04 60)' }}>
                        <Calendar className="w-3.5 h-3.5" style={{ color: 'oklch(0.72 0.12 75)' }} />
                        {invitation.weddingDate}
                        {invitation.weddingTime && ` at ${invitation.weddingTime}`}
                      </div>
                    )}
                    {invitation.venueName && (
                      <div className="flex items-center gap-2 text-xs" style={{ color: 'oklch(0.50 0.04 60)' }}>
                        <MapPin className="w-3.5 h-3.5" style={{ color: 'oklch(0.72 0.12 75)' }} />
                        {invitation.venueName}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 space-y-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate({ to: '/edit/$slug', params: { slug: invitation.id } })}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs"
                      style={{ borderColor: 'oklch(0.88 0.02 80)', color: 'oklch(0.40 0.03 60)' }}
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate({ to: '/invitation/$slug', params: { slug: invitation.id } })}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs"
                      style={{ borderColor: 'oklch(0.88 0.02 80)', color: 'oklch(0.40 0.03 60)' }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(invitation.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs"
                      style={{ borderColor: 'oklch(0.88 0.02 80)', color: 'oklch(0.40 0.03 60)' }}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedInvitationId(invitation.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs"
                      style={{ borderColor: 'oklch(0.88 0.02 80)', color: 'oklch(0.40 0.03 60)' }}
                    >
                      <Users className="w-3.5 h-3.5" />
                      RSVPs
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    {!invitation.isPublished && (
                      <Button
                        size="sm"
                        onClick={() => handlePublish(invitation.id)}
                        disabled={publishInvitation.isPending}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs"
                        style={{ backgroundColor: 'oklch(0.55 0.18 45)', color: 'oklch(0.99 0.003 80)' }}
                      >
                        {publishInvitation.isPending ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <BarChart2 className="w-3.5 h-3.5" />
                        )}
                        Publish
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(invitation.id)}
                      disabled={deleteInvitation.isPending}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs"
                      style={{ borderColor: 'oklch(0.85 0.07 15)', color: 'oklch(0.55 0.20 25)' }}
                    >
                      {deleteInvitation.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* RSVP Modal */}
      {selectedInvitationId && (
        <RSVPResponsesModal
          invitationId={selectedInvitationId}
          onClose={() => setSelectedInvitationId(null)}
        />
      )}

      {/* Footer */}
      <footer className="mt-16 border-t py-8 text-center" style={{ borderColor: 'oklch(0.88 0.02 80)', backgroundColor: 'oklch(0.99 0.003 80)' }}>
        <p className="text-sm" style={{ color: 'oklch(0.50 0.04 60)' }}>
          © {new Date().getFullYear()} Built with{' '}
          <span style={{ color: 'oklch(0.55 0.20 25)' }}>♥</span>{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: 'oklch(0.55 0.18 45)' }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

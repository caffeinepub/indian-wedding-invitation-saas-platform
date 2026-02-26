import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Plus, Edit, Eye, Trash2, Copy, Users, Heart, Loader2, CheckCircle, Globe } from 'lucide-react';
import { useGetAllInvitations, useDeleteInvitation, usePublishInvitation } from '../hooks/useQueries';
import RSVPResponsesModal from '../components/dashboard/RSVPResponsesModal';
import SkeletonLoader from '../components/SkeletonLoader';
import type { Invitation } from '../backend';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: invitations, isLoading, error } = useGetAllInvitations();
  const deleteInvitation = useDeleteInvitation();
  const publishInvitation = usePublishInvitation();
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this invitation? This action cannot be undone.')) return;
    try {
      await deleteInvitation.mutateAsync(slug);
    } catch (err) {
      console.error('Failed to delete invitation:', err);
    }
  };

  const handlePublish = async (slug: string) => {
    try {
      await publishInvitation.mutateAsync(slug);
    } catch (err) {
      console.error('Failed to publish invitation:', err);
    }
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/invitation/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleViewRSVPs = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setShowRSVPModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory-50 dark:bg-charcoal-900 pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <SkeletonLoader key={i} variant="invitation-card" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ivory-50 dark:bg-charcoal-900 pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-crimson-500 text-lg mb-4">Failed to load invitations</p>
          <p className="text-charcoal-500 text-sm">{String(error)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-50 dark:bg-charcoal-900 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-8 bg-gold-400" />
              <span className="text-gold-600 font-sans text-xs tracking-[0.3em] uppercase">Your Collection</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-charcoal-800 dark:text-ivory-100">
              Wedding Invitations
            </h1>
            <p className="text-charcoal-500 dark:text-ivory-400 mt-1 font-sans">
              {invitations?.length || 0} invitation{invitations?.length !== 1 ? 's' : ''} created
            </p>
          </div>

          <button
            onClick={() => navigate({ to: '/create' })}
            className="flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold rounded-full transition-all duration-300 shadow-luxury hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Create New
          </button>
        </div>

        {/* Empty State */}
        {(!invitations || invitations.length === 0) && (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gold-50 dark:bg-gold-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gold-400" />
            </div>
            <h2 className="text-2xl font-serif text-charcoal-700 dark:text-ivory-200 mb-3">
              No Invitations Yet
            </h2>
            <p className="text-charcoal-500 dark:text-ivory-400 mb-8 max-w-md mx-auto">
              Create your first beautiful wedding invitation and share it with your loved ones.
            </p>
            <button
              onClick={() => navigate({ to: '/create' })}
              className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold rounded-full transition-all duration-300 shadow-luxury"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Create Your First Invitation
            </button>
          </div>
        )}

        {/* Invitation Grid */}
        {invitations && invitations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="bg-white dark:bg-charcoal-800 rounded-2xl shadow-soft hover:shadow-luxury transition-all duration-300 border border-gold-100 dark:border-charcoal-700 overflow-hidden group"
              >
                {/* Card Header with Photos */}
                <div className="relative h-32 bg-gradient-to-br from-gold-100 to-gold-200 dark:from-gold-900/30 dark:to-gold-800/20 flex items-center justify-center overflow-hidden">
                  <div className="flex items-center gap-4">
                    {invitation.bridePhoto ? (
                      <img
                        src={invitation.bridePhoto.getDirectURL()}
                        alt="Bride"
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gold-200 dark:bg-gold-800 flex items-center justify-center border-2 border-white shadow-md">
                        <Heart className="w-6 h-6 text-gold-500" />
                      </div>
                    )}
                    <Heart className="w-5 h-5 text-gold-500 fill-current" />
                    {invitation.groomPhoto ? (
                      <img
                        src={invitation.groomPhoto.getDirectURL()}
                        alt="Groom"
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gold-200 dark:bg-gold-800 flex items-center justify-center border-2 border-white shadow-md">
                        <Heart className="w-6 h-6 text-gold-500" />
                      </div>
                    )}
                  </div>

                  {invitation.isPublished && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      <Globe className="w-3 h-3" />
                      Live
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-serif text-charcoal-800 dark:text-ivory-100 mb-1">
                    {invitation.brideName} & {invitation.groomName}
                  </h3>
                  <p className="text-charcoal-500 dark:text-ivory-400 text-sm font-sans mb-1">
                    {invitation.weddingDate} {invitation.weddingTime && `at ${invitation.weddingTime}`}
                  </p>
                  <p className="text-charcoal-400 dark:text-ivory-500 text-xs font-sans mb-4 truncate">
                    {invitation.venueName}
                  </p>

                  <div className="text-xs text-charcoal-400 dark:text-ivory-500 font-sans mb-4">
                    <span className="bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 px-2 py-1 rounded-full">
                      /{invitation.id}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigate({ to: '/edit/$slug', params: { slug: invitation.id } })}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-charcoal-100 dark:bg-charcoal-700 hover:bg-charcoal-200 dark:hover:bg-charcoal-600 text-charcoal-700 dark:text-ivory-200 rounded-lg text-sm font-sans transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </button>

                    <button
                      onClick={() => navigate({ to: '/invitation/$slug', params: { slug: invitation.id } })}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-charcoal-100 dark:bg-charcoal-700 hover:bg-charcoal-200 dark:hover:bg-charcoal-600 text-charcoal-700 dark:text-ivory-200 rounded-lg text-sm font-sans transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>

                    <button
                      onClick={() => handlePublish(invitation.id)}
                      disabled={invitation.isPublished || publishInvitation.isPending}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gold-500 hover:bg-gold-400 disabled:bg-gold-200 dark:disabled:bg-gold-900/30 text-charcoal-900 disabled:text-charcoal-400 rounded-lg text-sm font-sans transition-colors"
                    >
                      {publishInvitation.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : invitation.isPublished ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <Globe className="w-3.5 h-3.5" />
                      )}
                      {invitation.isPublished ? 'Published' : 'Publish'}
                    </button>

                    <button
                      onClick={() => handleCopyLink(invitation.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-charcoal-100 dark:bg-charcoal-700 hover:bg-charcoal-200 dark:hover:bg-charcoal-600 text-charcoal-700 dark:text-ivory-200 rounded-lg text-sm font-sans transition-colors"
                    >
                      {copiedSlug === invitation.id ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedSlug === invitation.id ? 'Copied!' : 'Copy Link'}
                    </button>

                    <button
                      onClick={() => handleViewRSVPs(invitation)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-charcoal-100 dark:bg-charcoal-700 hover:bg-charcoal-200 dark:hover:bg-charcoal-600 text-charcoal-700 dark:text-ivory-200 rounded-lg text-sm font-sans transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" />
                      RSVPs
                    </button>

                    <button
                      onClick={() => handleDelete(invitation.id)}
                      disabled={deleteInvitation.isPending}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-crimson-50 dark:bg-crimson-900/20 hover:bg-crimson-100 dark:hover:bg-crimson-900/40 text-crimson-600 dark:text-crimson-400 rounded-lg text-sm font-sans transition-colors"
                    >
                      {deleteInvitation.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RSVP Modal */}
      {showRSVPModal && selectedInvitation && (
        <RSVPResponsesModal
          invitationId={selectedInvitation.id}
          invitationTitle={`${selectedInvitation.brideName} & ${selectedInvitation.groomName}`}
          isOpen={showRSVPModal}
          onClose={() => {
            setShowRSVPModal(false);
            setSelectedInvitation(null);
          }}
        />
      )}
    </div>
  );
}

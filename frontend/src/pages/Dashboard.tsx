import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Share2,
  Globe,
  Lock,
  Users,
  Heart,
  Loader2,
  Copy,
  CheckCheck,
} from 'lucide-react';
import {
  useGetAllInvitations,
  usePublishInvitation,
  useDeleteInvitation,
} from '../hooks/useQueries';
import { Invitation } from '../backend';
import RSVPResponsesModal from '../components/dashboard/RSVPResponsesModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: invitations, isLoading } = useGetAllInvitations();
  const publishInvitation = usePublishInvitation();
  const deleteInvitation = useDeleteInvitation();

  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [publishingSlug, setPublishingSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [rsvpModalInvitation, setRsvpModalInvitation] = useState<Invitation | null>(null);

  const handlePublish = async (slug: string) => {
    setPublishingSlug(slug);
    try {
      await publishInvitation.mutateAsync(slug);
    } finally {
      setPublishingSlug(null);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this invitation? This action cannot be undone.')) return;
    setDeletingSlug(slug);
    try {
      await deleteInvitation.mutateAsync(slug);
    } finally {
      setDeletingSlug(null);
    }
  };

  const handleCopyLink = async (slug: string) => {
    const url = `${window.location.origin}/invitation/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory dark:bg-charcoal flex items-center justify-center pt-16">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
          <p className="text-charcoal/60 dark:text-ivory/60">Loading your invitations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold text-charcoal dark:text-ivory">
              My Invitations
            </h1>
            <p className="text-charcoal/60 dark:text-ivory/60 mt-1">
              Manage and share your wedding invitations
            </p>
          </div>
          <button
            onClick={() => navigate({ to: '/create' })}
            className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-full font-medium hover:bg-gold/90 transition-colors shadow-md self-start sm:self-auto"
          >
            <Plus className="w-5 h-5" />
            New Invitation
          </button>
        </div>

        {/* Empty State */}
        {(!invitations || invitations.length === 0) && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 mb-6">
              <Heart className="w-10 h-10 text-gold" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-charcoal dark:text-ivory mb-3">
              No invitations yet
            </h2>
            <p className="text-charcoal/60 dark:text-ivory/60 mb-8 max-w-md mx-auto">
              Create your first beautiful wedding invitation and share it with your loved ones.
            </p>
            <button
              onClick={() => navigate({ to: '/create' })}
              className="px-8 py-3 bg-gold text-white rounded-full font-medium hover:bg-gold/90 transition-colors shadow-md"
            >
              Create Your First Invitation
            </button>
          </div>
        )}

        {/* Invitation Cards Grid */}
        {invitations && invitations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map(invitation => (
              <div
                key={invitation.id}
                className="bg-white dark:bg-charcoal/50 rounded-2xl border border-gold/10 shadow-sm hover:shadow-luxury transition-shadow overflow-hidden"
              >
                {/* Card Header / Preview */}
                <div className="relative h-40 bg-gradient-to-br from-gold/20 to-crimson/10 flex items-center justify-center">
                  {(invitation.bridePhoto || invitation.groomPhoto) ? (
                    <div className="flex items-center gap-3">
                      {invitation.bridePhoto && (
                        <img
                          src={invitation.bridePhoto.getDirectURL()}
                          alt={invitation.brideName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/60 shadow-md"
                        />
                      )}
                      {invitation.groomPhoto && (
                        <img
                          src={invitation.groomPhoto.getDirectURL()}
                          alt={invitation.groomName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/60 shadow-md"
                        />
                      )}
                    </div>
                  ) : (
                    <Heart className="w-12 h-12 text-gold/40" />
                  )}
                  {/* Published badge */}
                  <div className="absolute top-3 right-3">
                    {invitation.isPublished ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-500/90 text-white text-xs rounded-full font-medium">
                        <Globe className="w-3 h-3" /> Live
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-1 bg-charcoal/60 text-white text-xs rounded-full font-medium">
                        <Lock className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-lg font-serif font-bold text-charcoal dark:text-ivory mb-1">
                    {invitation.brideName} & {invitation.groomName}
                  </h3>
                  <p className="text-sm text-charcoal/50 dark:text-ivory/50 mb-1">
                    {invitation.weddingDate
                      ? new Date(invitation.weddingDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Date not set'}
                  </p>
                  <p className="text-sm text-charcoal/50 dark:text-ivory/50 mb-4 truncate">
                    {invitation.venueName || 'Venue not set'}
                  </p>

                  {/* Action Buttons — always visible */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate({ to: `/edit/${invitation.id}` })}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-charcoal dark:text-ivory border border-gold/30 hover:border-gold/60 rounded-full transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </button>

                    <button
                      onClick={() => navigate({ to: `/invitation/${invitation.id}` })}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-charcoal dark:text-ivory border border-gold/30 hover:border-gold/60 rounded-full transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>

                    {!invitation.isPublished && (
                      <button
                        onClick={() => handlePublish(invitation.id)}
                        disabled={publishingSlug === invitation.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gold text-white rounded-full hover:bg-gold/90 disabled:opacity-50 transition-colors"
                      >
                        {publishingSlug === invitation.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Globe className="w-3.5 h-3.5" />
                        )}
                        Publish
                      </button>
                    )}

                    {invitation.isPublished && (
                      <button
                        onClick={() => handleCopyLink(invitation.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gold/10 text-gold border border-gold/30 rounded-full hover:bg-gold/20 transition-colors"
                      >
                        {copiedSlug === invitation.id ? (
                          <CheckCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        {copiedSlug === invitation.id ? 'Copied!' : 'Copy Link'}
                      </button>
                    )}

                    <button
                      onClick={() => setRsvpModalInvitation(invitation)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-charcoal dark:text-ivory border border-gold/30 hover:border-gold/60 rounded-full transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" />
                      RSVPs
                    </button>

                    <button
                      onClick={() => handleDelete(invitation.id)}
                      disabled={deletingSlug === invitation.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 border border-red-200 hover:border-red-400 rounded-full transition-colors disabled:opacity-50"
                    >
                      {deletingSlug === invitation.id ? (
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
      {rsvpModalInvitation && (
        <RSVPResponsesModal
          invitationId={rsvpModalInvitation.id}
          invitationTitle={`${rsvpModalInvitation.brideName} & ${rsvpModalInvitation.groomName}`}
          onClose={() => setRsvpModalInvitation(null)}
        />
      )}
    </div>
  );
}

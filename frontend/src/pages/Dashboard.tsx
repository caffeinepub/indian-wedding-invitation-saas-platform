import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Plus, Edit2, Eye, Trash2, Globe, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Header from '@/components/layout/Header';
import SkeletonLoader from '@/components/SkeletonLoader';
import { useGetAllInvitations, useDeleteInvitation, usePublishInvitation } from '@/hooks/useQueries';
import { toast } from 'sonner';
import type { Invitation } from '@/backend';

function InvitationCard({
  invitation,
  onDelete,
  onPublish,
}: {
  invitation: Invitation;
  onDelete: (slug: string) => void;
  onPublish: (slug: string) => void;
}) {
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Date TBD';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="luxury-card p-6 hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1 group animate-scale-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant={invitation.isPublished ? 'default' : 'secondary'}
              className={`text-xs font-cinzel tracking-wider ${
                invitation.isPublished
                  ? 'bg-gold/20 text-gold-dark border-gold/30'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {invitation.isPublished ? '● Published' : '○ Draft'}
            </Badge>
          </div>
          <h3 className="font-cinzel text-xl font-bold text-foreground truncate">
            {invitation.brideName} & {invitation.groomName}
          </h3>
          <p className="font-inter text-sm text-muted-foreground mt-1">/{invitation.id}</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 text-gold/60 flex-shrink-0" />
          <span className="font-inter">{formatDate(invitation.weddingDate)}</span>
        </div>
        {invitation.venueName && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4 text-gold/60 flex-shrink-0" />
            <span className="font-inter truncate">{invitation.venueName}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => navigate({ to: '/dashboard/$slug', params: { slug: invitation.id } })}
          className="btn-gold rounded-full text-xs font-cinzel tracking-wider flex-1"
        >
          <Edit2 className="w-3.5 h-3.5 mr-1.5" />
          Edit
        </Button>

        {invitation.isPublished && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate({ to: '/$slug', params: { slug: invitation.id } })}
            className="rounded-full text-xs font-cinzel border-gold/30 text-gold-dark hover:bg-gold/5 flex-1"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            View
          </Button>
        )}

        {!invitation.isPublished && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPublish(invitation.id)}
            className="rounded-full text-xs font-cinzel border-gold/30 text-gold-dark hover:bg-gold/5 flex-1"
          >
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            Publish
          </Button>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full text-xs text-crimson hover:bg-crimson/10 hover:text-crimson"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="luxury-card">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-cinzel text-foreground">
                Delete Invitation?
              </AlertDialogTitle>
              <AlertDialogDescription className="font-inter text-muted-foreground">
                This will permanently delete the invitation for{' '}
                <strong>
                  {invitation.brideName} & {invitation.groomName}
                </strong>
                . This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-cinzel rounded-full">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(invitation.id)}
                className="btn-crimson rounded-full font-cinzel"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: invitations, isLoading } = useGetAllInvitations();
  const deleteMutation = useDeleteInvitation();
  const publishMutation = usePublishInvitation();

  const handleDelete = async (slug: string) => {
    try {
      await deleteMutation.mutateAsync(slug);
      toast.success('Invitation deleted successfully');
    } catch {
      toast.error('Failed to delete invitation');
    }
  };

  const handlePublish = async (slug: string) => {
    try {
      await publishMutation.mutateAsync(slug);
      toast.success('Invitation published! Share the link with your guests.');
    } catch {
      toast.error('Failed to publish invitation');
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <p className="font-inter text-sm tracking-[0.2em] uppercase text-gold mb-1">
                ✦ Creator Panel ✦
              </p>
              <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-foreground">
                My Invitations
              </h1>
              <p className="font-inter text-muted-foreground mt-1">
                {invitations?.length || 0} invitation
                {invitations?.length !== 1 ? 's' : ''} created
              </p>
            </div>
            <Link to="/create">
              <Button className="btn-gold px-6 py-3 rounded-full font-cinzel tracking-wider shadow-gold">
                <Plus className="w-4 h-4 mr-2" />
                New Invitation
              </Button>
            </Link>
          </div>

          {/* Divider */}
          <div className="section-divider mb-10" />

          {/* Content */}
          {isLoading ? (
            <SkeletonLoader variant="invitation-card" count={3} />
          ) : invitations && invitations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {invitations.map((inv, i) => (
                <div key={inv.id} style={{ animationDelay: `${i * 0.1}s` }}>
                  <InvitationCard
                    invitation={inv}
                    onDelete={handleDelete}
                    onPublish={handlePublish}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 animate-float">
                <Heart className="w-10 h-10 text-gold" />
              </div>
              <h2 className="font-cinzel text-2xl font-bold text-foreground mb-3">
                No Invitations Yet
              </h2>
              <p className="font-inter text-muted-foreground mb-8 max-w-sm mx-auto">
                Create your first wedding invitation and share it with your loved ones.
              </p>
              <Link to="/create">
                <Button className="btn-gold px-8 py-3 rounded-full font-cinzel tracking-wider shadow-gold">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Invitation
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 bg-ivory">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-inter text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vivah. Built with{' '}
            <Heart className="w-3 h-3 inline text-crimson fill-crimson" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'vivah-wedding'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-dark hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

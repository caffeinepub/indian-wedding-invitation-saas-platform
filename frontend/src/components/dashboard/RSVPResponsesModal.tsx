import React from 'react';
import { Users, CheckCircle2, XCircle, MessageSquare, Phone, Calendar, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRSVPsByInvitation, useRSVPsStats } from '@/hooks/useQueries';

interface RSVPResponsesModalProps {
  invitationId: string;
  invitationTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(nanoseconds: bigint): string {
  try {
    const ms = Number(nanoseconds) / 1_000_000;
    return new Date(ms).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '—';
  }
}

export default function RSVPResponsesModal({
  invitationId,
  invitationTitle,
  isOpen,
  onClose,
}: RSVPResponsesModalProps) {
  const { data: rsvps, isLoading: rsvpsLoading } = useRSVPsByInvitation(invitationId);
  const { data: stats, isLoading: statsLoading } = useRSVPsStats(invitationId);

  const isLoading = rsvpsLoading || statsLoading;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="luxury-card max-w-2xl w-full max-h-[90vh] flex flex-col p-0 overflow-hidden">
        {/* Modal Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gold/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-crimson/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-gold-dark" />
            </div>
            <div>
              <DialogTitle className="font-cinzel text-lg font-bold text-foreground">
                RSVP Responses
              </DialogTitle>
              <DialogDescription className="font-inter text-xs text-muted-foreground mt-0.5">
                {invitationTitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            {stats && (
              <div className="px-6 py-4 border-b border-gold/10 flex-shrink-0">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gold/8 rounded-xl p-3 text-center border border-gold/20">
                    <p className="font-cinzel text-2xl font-bold text-gold-dark">
                      {stats.totalResponses.toString()}
                    </p>
                    <p className="font-inter text-xs text-muted-foreground mt-0.5">Total Responses</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 text-center border border-emerald-200 dark:border-emerald-800">
                    <p className="font-cinzel text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {stats.totalConfirmedGuests.toString()}
                    </p>
                    <p className="font-inter text-xs text-muted-foreground mt-0.5">Confirmed Guests</p>
                  </div>
                  <div className="bg-crimson/5 rounded-xl p-3 text-center border border-crimson/20">
                    <p className="font-cinzel text-2xl font-bold text-crimson">
                      {stats.totalDeclined.toString()}
                    </p>
                    <p className="font-inter text-xs text-muted-foreground mt-0.5">Declined</p>
                  </div>
                </div>
              </div>
            )}

            {/* Responses List */}
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-6 py-4">
                {!rsvps || rsvps.length === 0 ? (
                  /* Empty State */
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-gold/50" />
                    </div>
                    <h3 className="font-cinzel text-base font-semibold text-foreground mb-2">
                      No Responses Yet
                    </h3>
                    <p className="font-inter text-sm text-muted-foreground max-w-xs mx-auto">
                      Share your invitation with guests and their RSVP responses will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {rsvps.map((rsvp) => (
                      <div
                        key={rsvp.id}
                        className={`rounded-xl border p-4 transition-all ${
                          rsvp.attending
                            ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20'
                            : 'border-crimson/20 bg-crimson/5'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                rsvp.attending
                                  ? 'bg-emerald-100 dark:bg-emerald-900'
                                  : 'bg-crimson/10'
                              }`}
                            >
                              {rsvp.attending ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              ) : (
                                <XCircle className="w-4 h-4 text-crimson" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-cinzel text-sm font-bold text-foreground truncate">
                                {rsvp.guestName}
                              </p>
                              {rsvp.guestPhone && (
                                <div className="flex items-center gap-1 mt-0.5">
                                  <Phone className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                  <p className="font-inter text-xs text-muted-foreground">
                                    {rsvp.guestPhone}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge
                              className={`text-xs font-cinzel tracking-wider ${
                                rsvp.attending
                                  ? 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700'
                                  : 'bg-crimson/10 text-crimson border-crimson/30'
                              }`}
                              variant="outline"
                            >
                              {rsvp.attending ? '✓ Attending' : '✗ Declined'}
                            </Badge>
                            {rsvp.attending && (
                              <Badge
                                variant="outline"
                                className="text-xs font-inter border-gold/30 text-gold-dark bg-gold/5"
                              >
                                {rsvp.guestCount.toString()} guest{Number(rsvp.guestCount) !== 1 ? 's' : ''}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {rsvp.message && (
                          <div className="mt-2 pl-10">
                            <p className="font-inter text-xs text-muted-foreground italic">
                              "{rsvp.message}"
                            </p>
                          </div>
                        )}

                        <div className="mt-2 pl-10 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-muted-foreground/60" />
                          <p className="font-inter text-xs text-muted-foreground/60">
                            {formatDate(rsvp.submittedAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

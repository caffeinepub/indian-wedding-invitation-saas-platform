import React from 'react';
import { Users, CheckCircle2, XCircle, MessageSquare, Phone, Calendar, Loader2, X, AlertTriangle, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetRSVPsByInvitation, useGetRSVPsStats } from '@/hooks/useQueries';

interface RSVPResponsesModalProps {
  invitationId: string;
  invitationTitle?: string;
  isOpen?: boolean;
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
  onClose,
}: RSVPResponsesModalProps) {
  const {
    data: rsvps,
    isLoading: rsvpsLoading,
    error: rsvpsError,
    refetch: refetchRsvps,
    isFetching: rsvpsFetching,
  } = useGetRSVPsByInvitation(invitationId);

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useGetRSVPsStats(invitationId);

  const isLoading = rsvpsLoading || statsLoading;
  const hasError = rsvpsError || statsError;
  const errorMessage = rsvpsError?.message || statsError?.message || 'Service temporarily unavailable.';

  const handleRetry = () => {
    refetchRsvps();
    refetchStats();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-gold/20">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gold/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-crimson/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-charcoal">
                  RSVP Responses
                </h2>
                {invitationTitle && (
                  <p className="text-xs text-charcoal/60 mt-0.5">{invitationTitle}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-charcoal/10 transition-colors text-charcoal/60 hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        ) : hasError ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-4">
              <AlertTriangle className="w-7 h-7 text-amber-500" />
            </div>
            <h3 className="font-serif text-base font-semibold text-charcoal mb-2">
              Unable to Load Responses
            </h3>
            <p className="text-sm text-charcoal/60 max-w-xs mb-5">
              {errorMessage}
            </p>
            <button
              onClick={handleRetry}
              disabled={rsvpsFetching}
              className="flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold rounded-full transition-all text-sm disabled:opacity-50"
            >
              {rsvpsFetching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            {stats && (
              <div className="px-6 py-4 border-b border-gold/10 flex-shrink-0">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gold/8 rounded-xl p-3 text-center border border-gold/20">
                    <p className="font-serif text-2xl font-bold text-gold-dark">
                      {stats.totalResponses.toString()}
                    </p>
                    <p className="text-xs text-charcoal/60 mt-0.5">Total Responses</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-200">
                    <p className="font-serif text-2xl font-bold text-emerald-600">
                      {stats.totalConfirmedGuests.toString()}
                    </p>
                    <p className="text-xs text-charcoal/60 mt-0.5">Confirmed Guests</p>
                  </div>
                  <div className="bg-crimson/5 rounded-xl p-3 text-center border border-crimson/20">
                    <p className="font-serif text-2xl font-bold text-crimson">
                      {stats.totalDeclined.toString()}
                    </p>
                    <p className="text-xs text-charcoal/60 mt-0.5">Declined</p>
                  </div>
                </div>
              </div>
            )}

            {/* Responses List */}
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-6 py-4">
                {!rsvps || rsvps.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-gold/50" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-charcoal mb-2">
                      No Responses Yet
                    </h3>
                    <p className="text-sm text-charcoal/60 max-w-xs mx-auto">
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
                            ? 'border-emerald-200 bg-emerald-50/50'
                            : 'border-crimson/20 bg-crimson/5'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                rsvp.attending
                                  ? 'bg-emerald-100'
                                  : 'bg-crimson/10'
                              }`}
                            >
                              {rsvp.attending ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-crimson" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-serif text-sm font-bold text-charcoal truncate">
                                {rsvp.guestName}
                              </p>
                              {rsvp.guestPhone && (
                                <div className="flex items-center gap-1 mt-0.5">
                                  <Phone className="w-3 h-3 text-charcoal/40 flex-shrink-0" />
                                  <p className="text-xs text-charcoal/60">
                                    {rsvp.guestPhone}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge
                              className={`text-xs ${
                                rsvp.attending
                                  ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                                  : 'bg-crimson/10 text-crimson border-crimson/30'
                              }`}
                              variant="outline"
                            >
                              {rsvp.attending ? '✓ Attending' : '✗ Declined'}
                            </Badge>
                            {rsvp.attending && (
                              <Badge
                                variant="outline"
                                className="text-xs border-gold/30 text-gold-dark bg-gold/5"
                              >
                                {rsvp.guestCount.toString()} guest{Number(rsvp.guestCount) !== 1 ? 's' : ''}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {rsvp.message && (
                          <div className="mt-2 pl-10">
                            <p className="text-xs text-charcoal/60 italic">
                              "{rsvp.message}"
                            </p>
                          </div>
                        )}

                        <div className="mt-2 pl-10 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-charcoal/40" />
                          <p className="text-xs text-charcoal/40">
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
      </div>
    </div>
  );
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Invitation, Event, RSVPEntry, RSVPStats, Photo, BackgroundMusic } from '../backend';
import { EventType } from '../backend';

export { EventType };

// ─── Invitations ────────────────────────────────────────────────────────────

export function useGetAllInvitations() {
  const { actor, isFetching } = useActor();
  return useQuery<Invitation[]>({
    queryKey: ['invitations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInvitations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetInvitationBySlug(slug: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Invitation | null>({
    queryKey: ['invitation', slug],
    queryFn: async () => {
      if (!actor || !slug) return null;
      try {
        return await actor.getInvitationBySlug(slug);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!slug,
    retry: false,
  });
}

export function useCreateInvitation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      slug: string;
      brideName: string;
      groomName: string;
      weddingDate: string;
      weddingTime: string;
      venueName: string;
      venueAddress: string;
      googleMapsLink: string;
      familyDetails: string;
      invitationMessage: string;
      selectedTemplate: string;
      colorScheme: string;
      fontChoice: string;
      backgroundChoice: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createInvitation(
        params.slug,
        params.brideName,
        params.groomName,
        params.weddingDate,
        params.weddingTime,
        params.venueName,
        params.venueAddress,
        params.googleMapsLink,
        params.familyDetails,
        params.invitationMessage,
        params.selectedTemplate,
        params.colorScheme,
        params.fontChoice,
        params.backgroundChoice
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
}

export function useUpdateInvitation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      slug: string;
      brideName: string;
      groomName: string;
      weddingDate: string;
      weddingTime: string;
      venueName: string;
      venueAddress: string;
      googleMapsLink: string;
      familyDetails: string;
      invitationMessage: string;
      selectedTemplate: string;
      colorScheme: string;
      fontChoice: string;
      backgroundChoice: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateInvitation(
        params.slug,
        params.brideName,
        params.groomName,
        params.weddingDate,
        params.weddingTime,
        params.venueName,
        params.venueAddress,
        params.googleMapsLink,
        params.familyDetails,
        params.invitationMessage,
        params.selectedTemplate,
        params.colorScheme,
        params.fontChoice,
        params.backgroundChoice
      );
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      queryClient.invalidateQueries({ queryKey: ['invitation', vars.slug] });
    },
  });
}

export function usePublishInvitation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slug: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.publishInvitation(slug);
    },
    onSuccess: (_, slug) => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      queryClient.invalidateQueries({ queryKey: ['invitation', slug] });
    },
  });
}

export function useDeleteInvitation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slug: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteInvitation(slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
}

// ─── Events ─────────────────────────────────────────────────────────────────

export function useGetEvents(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Event[]>({
    queryKey: ['events', invitationId],
    queryFn: async () => {
      if (!actor || !invitationId) return [];
      return actor.getEventsByInvitation(invitationId);
    },
    enabled: !!actor && !isFetching && !!invitationId,
  });
}

export function useAddEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      invitationId: string;
      eventId: string;
      title: string;
      date: string;
      time: string;
      venue: string;
      description: string;
      eventType: EventType;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addEvent(
        params.invitationId,
        params.eventId,
        params.title,
        params.date,
        params.time,
        params.venue,
        params.description,
        params.eventType
      );
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['events', vars.invitationId] });
    },
  });
}

export function useUpdateEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      invitationId: string;
      eventId: string;
      title: string;
      date: string;
      time: string;
      venue: string;
      description: string;
      eventType: EventType;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateEvent(
        params.eventId,
        params.title,
        params.date,
        params.time,
        params.venue,
        params.description,
        params.eventType
      );
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['events', vars.invitationId] });
    },
  });
}

export function useDeleteEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { eventId: string; invitationId: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteEvent(params.eventId);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['events', vars.invitationId] });
    },
  });
}

// ─── Photos ──────────────────────────────────────────────────────────────────

export function useGetPhotos(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Photo[]>({
    queryKey: ['photos', invitationId],
    queryFn: async () => {
      if (!actor || !invitationId) return [];
      return actor.getPhotosByInvitation(invitationId);
    },
    enabled: !!actor && !isFetching && !!invitationId,
  });
}

export function useAddPhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { invitationId: string; photoId: string; imageUrl: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addPhoto(params.invitationId, params.photoId, params.imageUrl);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['photos', vars.invitationId] });
    },
  });
}

export function useDeletePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { photoId: string; invitationId: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deletePhoto(params.photoId);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['photos', vars.invitationId] });
    },
  });
}

// ─── Music ───────────────────────────────────────────────────────────────────

export function useGetBackgroundMusic(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<BackgroundMusic[]>({
    queryKey: ['music', invitationId],
    queryFn: async () => {
      if (!actor || !invitationId) return [];
      return actor.getBackgroundMusic(invitationId);
    },
    enabled: !!actor && !isFetching && !!invitationId,
  });
}

export function useSetBackgroundMusic() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      invitationId: string;
      musicId: string;
      musicUrl: string;
      autoPlay: boolean;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.setBackgroundMusic(params.invitationId, params.musicId, params.musicUrl, params.autoPlay);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['music', vars.invitationId] });
    },
  });
}

// ─── RSVP ────────────────────────────────────────────────────────────────────

export function useSubmitRSVP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      invitationId: string;
      rsvpId: string;
      guestName: string;
      guestPhone: string;
      attending: boolean;
      guestCount: bigint;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitRSVP(
        params.invitationId,
        params.rsvpId,
        params.guestName,
        params.guestPhone,
        params.attending,
        params.guestCount,
        params.message
      );
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['rsvps', vars.invitationId] });
      queryClient.invalidateQueries({ queryKey: ['rsvp-stats', vars.invitationId] });
    },
  });
}

export function useRSVPsByInvitation(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<RSVPEntry[]>({
    queryKey: ['rsvps', invitationId],
    queryFn: async () => {
      if (!actor || !invitationId) return [];
      return actor.getRSVPsByInvitation(invitationId);
    },
    enabled: !!actor && !isFetching && !!invitationId,
  });
}

export function useRSVPsStats(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<RSVPStats>({
    queryKey: ['rsvp-stats', invitationId],
    queryFn: async () => {
      if (!actor || !invitationId) {
        return { totalResponses: BigInt(0), totalConfirmedGuests: BigInt(0), totalDeclined: BigInt(0) };
      }
      return actor.getRSVPsStats(invitationId);
    },
    enabled: !!actor && !isFetching && !!invitationId,
  });
}

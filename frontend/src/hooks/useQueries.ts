import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import {
  Invitation,
  Event,
  RSVPEntry,
  Photo,
  BackgroundMusic,
  ThemeConfig,
  EventType,
  ExternalBlob,
} from '../backend';

// ─── Invitations ──────────────────────────────────────────────────────────────

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
  return useQuery<Invitation>({
    queryKey: ['invitation', slug],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getInvitationBySlug(slug);
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
      if (!actor) throw new Error('Actor not available');
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
        params.backgroundChoice,
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
      if (!actor) throw new Error('Actor not available');
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
        params.backgroundChoice,
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      queryClient.invalidateQueries({ queryKey: ['invitation', variables.slug] });
    },
  });
}

export function useAddPhotos() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      invitationId: string;
      bridePhoto: ExternalBlob | null;
      groomPhoto: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addPhotos(params.invitationId, params.bridePhoto, params.groomPhoto);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invitation', variables.invitationId] });
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
}

export function usePublishInvitation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slug: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.publishInvitation(slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
}

export function useDeleteInvitation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slug: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteInvitation(slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
}

// ─── Events ───────────────────────────────────────────────────────────────────

export function useGetEventsByInvitation(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Event[]>({
    queryKey: ['events', invitationId],
    queryFn: async () => {
      if (!actor) return [];
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
      if (!actor) throw new Error('Actor not available');
      return actor.addEvent(
        params.invitationId,
        params.eventId,
        params.title,
        params.date,
        params.time,
        params.venue,
        params.description,
        params.eventType,
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events', variables.invitationId] });
    },
  });
}

export function useUpdateEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      eventId: string;
      invitationId: string;
      title: string;
      date: string;
      time: string;
      venue: string;
      description: string;
      eventType: EventType;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateEvent(
        params.eventId,
        params.title,
        params.date,
        params.time,
        params.venue,
        params.description,
        params.eventType,
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events', variables.invitationId] });
    },
  });
}

export function useDeleteEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { eventId: string; invitationId: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteEvent(params.eventId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events', variables.invitationId] });
    },
  });
}

// ─── RSVP ─────────────────────────────────────────────────────────────────────

export function useGetRSVPsByInvitation(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<RSVPEntry[]>({
    queryKey: ['rsvps', invitationId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRSVPsByInvitation(invitationId);
    },
    enabled: !!actor && !isFetching && !!invitationId,
  });
}

export function useGetRSVPsStats(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['rsvpStats', invitationId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRSVPsStats(invitationId);
    },
    enabled: !!actor && !isFetching && !!invitationId,
  });
}

/** Submit a wedding RSVP response from a guest */
export function useSubmitWeddingRSVP() {
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
      if (!actor) throw new Error('Actor not available');
      return actor.submitWeddingInvitationRSVP(
        params.invitationId,
        params.rsvpId,
        params.guestName,
        params.guestPhone,
        params.attending,
        params.guestCount,
        params.message,
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rsvps', variables.invitationId] });
      queryClient.invalidateQueries({ queryKey: ['rsvpStats', variables.invitationId] });
    },
  });
}

// ─── Photos ───────────────────────────────────────────────────────────────────

export function useGetPhotosByInvitation(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Photo[]>({
    queryKey: ['photos', invitationId],
    queryFn: async () => {
      if (!actor) return [];
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
      if (!actor) throw new Error('Actor not available');
      return actor.addPhoto(params.invitationId, params.photoId, params.imageUrl);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['photos', variables.invitationId] });
    },
  });
}

export function useDeletePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { photoId: string; invitationId: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePhoto(params.photoId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['photos', variables.invitationId] });
    },
  });
}

// ─── Background Music ─────────────────────────────────────────────────────────

export function useGetBackgroundMusic(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<BackgroundMusic[]>({
    queryKey: ['music', invitationId],
    queryFn: async () => {
      if (!actor) return [];
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
      if (!actor) throw new Error('Actor not available');
      return actor.setBackgroundMusic(
        params.invitationId,
        params.musicId,
        params.musicUrl,
        params.autoPlay,
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['music', variables.invitationId] });
    },
  });
}

// ─── Theme Variants ───────────────────────────────────────────────────────────

export function useGetThemeVariants(invitationId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<ThemeConfig[]>({
    queryKey: ['themes', invitationId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getThemeVariants(invitationId);
    },
    enabled: !!actor && !isFetching && !!invitationId,
  });
}

export function useSaveThemeVariant() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { invitationId: string; themeConfig: ThemeConfig }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveThemeVariant(params.invitationId, params.themeConfig);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['themes', variables.invitationId] });
    },
  });
}

export function useDeleteThemeVariant() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { invitationId: string; themeIndex: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteThemeVariant(params.invitationId, params.themeIndex);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['themes', variables.invitationId] });
    },
  });
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: { name: string; email: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

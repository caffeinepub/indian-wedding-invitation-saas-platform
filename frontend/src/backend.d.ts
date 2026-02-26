import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RSVPEntry {
    id: string;
    guestCount: bigint;
    invitationId: string;
    submittedAt: bigint;
    guestName: string;
    message: string;
    attending: boolean;
    guestPhone: string;
}
export interface RSVPStats {
    totalConfirmedGuests: bigint;
    totalResponses: bigint;
    totalDeclined: bigint;
}
export interface Event {
    id: string;
    title: string;
    venue: string;
    date: string;
    invitationId: string;
    time: string;
    description: string;
    eventType: EventType;
}
export interface Invitation {
    id: string;
    weddingDate: string;
    invitationMessage: string;
    weddingTime: string;
    isPublished: boolean;
    venueAddress: string;
    createdAt: bigint;
    googleMapsLink: string;
    fontChoice: string;
    updatedAt: bigint;
    selectedTemplate: string;
    backgroundChoice: string;
    brideName: string;
    groomName: string;
    venueName: string;
    familyDetails: string;
    colorScheme: string;
}
export interface BackgroundMusic {
    id: string;
    musicUrl: string;
    autoPlay: boolean;
    invitationId: string;
    uploadedAt: bigint;
}
export interface Photo {
    id: string;
    invitationId: string;
    imageUrl: string;
    uploadedAt: bigint;
}
export enum EventType {
    mehndi = "mehndi",
    sangeet = "sangeet",
    haldi = "haldi",
    custom = "custom",
    wedding = "wedding",
    reception = "reception"
}
export interface backendInterface {
    addEvent(invitationId: string, eventId: string, title: string, date: string, time: string, venue: string, description: string, eventType: EventType): Promise<Event>;
    addPhoto(invitationId: string, photoId: string, imageUrl: string): Promise<Photo>;
    createInvitation(slug: string, brideName: string, groomName: string, weddingDate: string, weddingTime: string, venueName: string, venueAddress: string, googleMapsLink: string, familyDetails: string, invitationMessage: string, selectedTemplate: string, colorScheme: string, fontChoice: string, backgroundChoice: string): Promise<Invitation>;
    deleteEvent(eventId: string): Promise<void>;
    deleteInvitation(slug: string): Promise<void>;
    deletePhoto(photoId: string): Promise<void>;
    getAllInvitations(): Promise<Array<Invitation>>;
    getBackgroundMusic(invitationId: string): Promise<Array<BackgroundMusic>>;
    getEventsByInvitation(invitationId: string): Promise<Array<Event>>;
    getInvitationBySlug(slug: string): Promise<Invitation>;
    getPhotosByInvitation(invitationId: string): Promise<Array<Photo>>;
    getRSVPsByInvitation(invitationId: string): Promise<Array<RSVPEntry>>;
    getRSVPsStats(invitationId: string): Promise<RSVPStats>;
    publishInvitation(slug: string): Promise<Invitation>;
    setBackgroundMusic(invitationId: string, musicId: string, musicUrl: string, autoPlay: boolean): Promise<BackgroundMusic>;
    submitRSVP(invitationId: string, rsvpId: string, guestName: string, guestPhone: string, attending: boolean, guestCount: bigint, message: string): Promise<RSVPEntry>;
    updateEvent(eventId: string, title: string, date: string, time: string, venue: string, description: string, eventType: EventType): Promise<Event>;
    updateInvitation(slug: string, brideName: string, groomName: string, weddingDate: string, weddingTime: string, venueName: string, venueAddress: string, googleMapsLink: string, familyDetails: string, invitationMessage: string, selectedTemplate: string, colorScheme: string, fontChoice: string, backgroundChoice: string): Promise<Invitation>;
}

import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
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
export type Time = bigint;
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
export interface ThemeConfig {
    name: string;
    fontChoice: string;
    backgroundChoice: string;
    template: string;
    colorScheme: string;
}
export interface Invitation {
    id: string;
    weddingDate: string;
    invitationMessage: string;
    groomPhoto?: ExternalBlob;
    weddingTime: string;
    isPublished: boolean;
    venueAddress: string;
    createdAt: bigint;
    googleMapsLink: string;
    fontChoice: string;
    updatedAt: bigint;
    selectedTemplate: string;
    savedThemes: Array<ThemeConfig>;
    backgroundChoice: string;
    brideName: string;
    groomName: string;
    venueName: string;
    familyDetails: string;
    bridePhoto?: ExternalBlob;
    colorScheme: string;
}
export interface InviteCode {
    created: Time;
    code: string;
    used: boolean;
}
export interface RSVP {
    name: string;
    inviteCode: string;
    timestamp: Time;
    attending: boolean;
}
export interface RSVPStats {
    totalConfirmedGuests: bigint;
    totalResponses: bigint;
    totalDeclined: bigint;
}
export interface BackgroundMusic {
    id: string;
    musicUrl: string;
    autoPlay: boolean;
    invitationId: string;
    uploadedAt: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addEvent(invitationId: string, eventId: string, title: string, date: string, time: string, venue: string, description: string, eventType: EventType): Promise<Event>;
    addPhoto(invitationId: string, photoId: string, imageUrl: string): Promise<Photo>;
    addPhotos(invitationId: string, bridePhoto: ExternalBlob | null, groomPhoto: ExternalBlob | null): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createInvitation(slug: string, brideName: string, groomName: string, weddingDate: string, weddingTime: string, venueName: string, venueAddress: string, googleMapsLink: string, familyDetails: string, invitationMessage: string, selectedTemplate: string, colorScheme: string, fontChoice: string, backgroundChoice: string): Promise<Invitation>;
    deleteEvent(eventId: string): Promise<void>;
    deleteInvitation(slug: string): Promise<void>;
    deletePhoto(photoId: string): Promise<void>;
    deleteThemeVariant(invitationId: string, themeIndex: bigint): Promise<void>;
    generateInviteCode(): Promise<string>;
    getAllInvitations(): Promise<Array<Invitation>>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getBackgroundMusic(invitationId: string): Promise<Array<BackgroundMusic>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEventsByInvitation(invitationId: string): Promise<Array<Event>>;
    getInvitationBySlug(slug: string): Promise<Invitation>;
    getInviteCodes(): Promise<Array<InviteCode>>;
    getPhotosByInvitation(invitationId: string): Promise<Array<Photo>>;
    getRSVPsByInvitation(invitationId: string): Promise<Array<RSVPEntry>>;
    getRSVPsStats(invitationId: string): Promise<RSVPStats>;
    getThemeVariants(invitationId: string): Promise<Array<ThemeConfig>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    publishInvitation(slug: string): Promise<Invitation>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveThemeVariant(invitationId: string, themeConfig: ThemeConfig): Promise<void>;
    setBackgroundMusic(invitationId: string, musicId: string, musicUrl: string, autoPlay: boolean): Promise<BackgroundMusic>;
    submitRSVP(name: string, attending: boolean, inviteCode: string): Promise<void>;
    submitWeddingInvitationRSVP(invitationId: string, rsvpId: string, guestName: string, guestPhone: string, attending: boolean, guestCount: bigint, message: string): Promise<RSVPEntry>;
    updateEvent(eventId: string, title: string, date: string, time: string, venue: string, description: string, eventType: EventType): Promise<Event>;
    updateInvitation(slug: string, brideName: string, groomName: string, weddingDate: string, weddingTime: string, venueName: string, venueAddress: string, googleMapsLink: string, familyDetails: string, invitationMessage: string, selectedTemplate: string, colorScheme: string, fontChoice: string, backgroundChoice: string): Promise<Invitation>;
}

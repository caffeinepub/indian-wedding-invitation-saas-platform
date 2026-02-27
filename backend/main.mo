import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import InviteLinksModule "invite-links/invite-links-module";
import Random "mo:core/Random";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  include MixinStorage();

  // Authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserProfile = {
    name : Text;
    email : Text;
  };

  type ThemeConfig = {
    name : Text;
    template : Text;
    colorScheme : Text;
    fontChoice : Text;
    backgroundChoice : Text;
  };

  type Invitation = {
    id : Text;
    brideName : Text;
    groomName : Text;
    weddingDate : Text;
    weddingTime : Text;
    venueName : Text;
    venueAddress : Text;
    googleMapsLink : Text;
    familyDetails : Text;
    invitationMessage : Text;
    selectedTemplate : Text;
    colorScheme : Text;
    fontChoice : Text;
    backgroundChoice : Text;
    bridePhoto : ?Storage.ExternalBlob;
    groomPhoto : ?Storage.ExternalBlob;
    isPublished : Bool;
    createdAt : Int;
    updatedAt : Int;
    savedThemes : [ThemeConfig];
  };

  type InvitationInput = {
    slug : Text;
    brideName : Text;
    groomName : Text;
    weddingDate : Text;
    weddingTime : Text;
    venueName : Text;
    venueAddress : Text;
    googleMapsLink : Text;
    familyDetails : Text;
    invitationMessage : Text;
    selectedTemplate : Text;
    colorScheme : Text;
    fontChoice : Text;
    backgroundChoice : Text;
  };

  type UpdateEventInput = {
    title : Text;
    date : Text;
    time : Text;
    venue : Text;
    description : Text;
    eventType : Text;
  };

  type RSVPInput = {
    invitationId : Text;
    rsvpId : Text;
    guestName : Text;
    guestPhone : Text;
    attending : Bool;
    guestCount : Nat;
    message : Text;
  };

  type EventType = {
    #haldi;
    #mehndi;
    #sangeet;
    #wedding;
    #reception;
    #custom;
  };

  type Event = {
    id : Text;
    invitationId : Text;
    title : Text;
    date : Text;
    time : Text;
    venue : Text;
    description : Text;
    eventType : EventType;
  };

  type EventInput = {
    id : Text;
    invitationId : Text;
    title : Text;
    date : Text;
    time : Text;
    venue : Text;
    description : Text;
    eventType : Text;
  };

  type RSVPEntry = {
    id : Text;
    invitationId : Text;
    guestName : Text;
    guestPhone : Text;
    attending : Bool;
    guestCount : Nat;
    message : Text;
    submittedAt : Int;
  };

  type Photo = {
    id : Text;
    invitationId : Text;
    imageUrl : Text;
    uploadedAt : Int;
  };

  type BackgroundMusic = {
    id : Text;
    invitationId : Text;
    musicUrl : Text;
    autoPlay : Bool;
    uploadedAt : Int;
  };

  type RSVPStats = {
    totalResponses : Nat;
    totalConfirmedGuests : Nat;
    totalDeclined : Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let invitationStore = Map.empty<Text, Invitation>();
  let eventStore = Map.empty<Text, Event>();
  let rsvpStore = Map.empty<Text, RSVPEntry>();
  let photoStore = Map.empty<Text, Photo>();
  let musicStore = Map.empty<Text, BackgroundMusic>();

  let inviteState = InviteLinksModule.initState();

  func now() : Int {
    Time.now();
  };

  func validateSlug(slug : Text) {
    if (invitationStore.containsKey(slug)) {
      Runtime.trap("This slug is already taken. Please choose a unique slug.");
    };
  };

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Invitation management - requires user role (authenticated users manage their invitations)
  public shared ({ caller }) func createInvitation(input : InvitationInput) : async Invitation {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create invitations");
    };

    validateSlug(input.slug);

    let invitation : Invitation = {
      id = input.slug;
      brideName = input.brideName;
      groomName = input.groomName;
      weddingDate = input.weddingDate;
      weddingTime = input.weddingTime;
      venueName = input.venueName;
      venueAddress = input.venueAddress;
      googleMapsLink = input.googleMapsLink;
      familyDetails = input.familyDetails;
      invitationMessage = input.invitationMessage;
      selectedTemplate = input.selectedTemplate;
      colorScheme = input.colorScheme;
      fontChoice = input.fontChoice;
      backgroundChoice = input.backgroundChoice;
      bridePhoto = null;
      groomPhoto = null;
      isPublished = false;
      createdAt = now();
      updatedAt = now();
      savedThemes = [];
    };

    invitationStore.add(input.slug, invitation);
    invitation;
  };

  public shared ({ caller }) func updateInvitation(
    slug : Text,
    brideName : Text,
    groomName : Text,
    weddingDate : Text,
    weddingTime : Text,
    venueName : Text,
    venueAddress : Text,
    googleMapsLink : Text,
    familyDetails : Text,
    invitationMessage : Text,
    selectedTemplate : Text,
    colorScheme : Text,
    fontChoice : Text,
    backgroundChoice : Text,
  ) : async Invitation {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update invitations");
    };
    switch (invitationStore.get(slug)) {
      case (null) { Runtime.trap("Invitation not found") };
      case (?existing) {
        let updated : Invitation = {
          id = slug;
          brideName;
          groomName;
          weddingDate;
          weddingTime;
          venueName;
          venueAddress;
          googleMapsLink;
          familyDetails;
          invitationMessage;
          selectedTemplate;
          colorScheme;
          fontChoice;
          backgroundChoice;
          bridePhoto = existing.bridePhoto;
          groomPhoto = existing.groomPhoto;
          isPublished = existing.isPublished;
          createdAt = existing.createdAt;
          updatedAt = now();
          savedThemes = existing.savedThemes;
        };
        invitationStore.add(slug, updated);
        updated;
      };
    };
  };

  // Public read - no auth needed (wedding guests need to view invitations)
  public query func getInvitationBySlug(slug : Text) : async Invitation {
    switch (invitationStore.get(slug)) {
      case (null) { Runtime.trap("Invitation not found") };
      case (?invitation) { invitation };
    };
  };

  public shared ({ caller }) func addPhotos(
    invitationId : Text,
    bridePhoto : ?Storage.ExternalBlob,
    groomPhoto : ?Storage.ExternalBlob,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add photos");
    };
    switch (invitationStore.get(invitationId)) {
      case (null) { Runtime.trap("Invitation not found") };
      case (?invitation) {
        let updated : Invitation = {
          invitation with bridePhoto;
          groomPhoto;
        };
        invitationStore.add(invitationId, updated);
      };
    };
  };

  // Public read - no auth needed (listing invitations is public)
  public query func getAllInvitations() : async [Invitation] {
    invitationStore.values().toArray();
  };

  public shared ({ caller }) func publishInvitation(slug : Text) : async Invitation {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can publish invitations");
    };
    switch (invitationStore.get(slug)) {
      case (null) { Runtime.trap("Invitation not found") };
      case (?existing) {
        let updated = { existing with isPublished = true; updatedAt = now() };
        invitationStore.add(slug, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func deleteInvitation(slug : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete invitations");
    };
    if (not invitationStore.containsKey(slug)) {
      Runtime.trap("Invitation not found");
    };
    invitationStore.remove(slug);
  };

  public shared ({ caller }) func createEvent(input : EventInput) : async Event {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create events");
    };
    switch (invitationStore.get(input.invitationId)) {
      case (null) { Runtime.trap("Associated invitation not found") };
      case (?_) {
        let event : Event = {
          id = input.id;
          invitationId = input.invitationId;
          title = input.title;
          date = input.date;
          time = input.time;
          venue = input.venue;
          description = input.description;
          eventType = #custom;
        };
        eventStore.add(input.id, event);
        event;
      };
    };
  };

  public shared ({ caller }) func updateEvent(eventId : Text, input : UpdateEventInput) : async Event {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update events");
    };
    switch (eventStore.get(eventId)) {
      case (null) { Runtime.trap("Event not found") };
      case (?existing) {
        let updated : Event = {
          id = eventId;
          invitationId = existing.invitationId;
          title = input.title;
          date = input.date;
          time = input.time;
          venue = input.venue;
          description = input.description;
          eventType = #custom;
        };
        eventStore.add(eventId, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func deleteEvent(eventId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete events");
    };
    if (not eventStore.containsKey(eventId)) {
      Runtime.trap("Event not found");
    };
    eventStore.remove(eventId);
  };

  // Public read - no auth needed (wedding guests view event details)
  public query func getEventsByInvitation(invitationId : Text) : async [Event] {
    let list = List.empty<Event>();
    for (event in eventStore.values()) {
      if (event.invitationId == invitationId) {
        list.add(event);
      };
    };
    list.toArray();
  };

  // RSVP submission - open to all including guests (wedding guests submit RSVPs)
  public shared ({ caller }) func submitWeddingInvitationRSVP(input : RSVPInput) : async RSVPEntry {
    switch (invitationStore.get(input.invitationId)) {
      case (null) { Runtime.trap("Associated invitation not found") };
      case (?_) {
        let rsvp : RSVPEntry = {
          id = input.rsvpId;
          invitationId = input.invitationId;
          guestName = input.guestName;
          guestPhone = input.guestPhone;
          attending = input.attending;
          guestCount = input.guestCount;
          message = input.message;
          submittedAt = now();
        };
        rsvpStore.add(input.rsvpId, rsvp);
        rsvp;
      };
    };
  };

  // RSVP reads - require user role (only invitation owners should see RSVP lists)
  public query ({ caller }) func getRSVPsByInvitation(invitationId : Text) : async [RSVPEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view RSVPs");
    };
    let list = List.empty<RSVPEntry>();
    for (rsvp in rsvpStore.values()) {
      if (rsvp.invitationId == invitationId) {
        list.add(rsvp);
      };
    };
    list.toArray();
  };

  public query ({ caller }) func getRSVPsStats(invitationId : Text) : async RSVPStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view RSVP stats");
    };
    var totalResponses = 0;
    var totalConfirmedGuests = 0;
    var totalDeclined = 0;

    for (rsvp in rsvpStore.values()) {
      if (rsvp.invitationId == invitationId) {
        totalResponses += 1;
        if (rsvp.attending) {
          totalConfirmedGuests += rsvp.guestCount;
        } else {
          totalDeclined += 1;
        };
      };
    };

    {
      totalResponses;
      totalConfirmedGuests;
      totalDeclined;
    };
  };

  public shared ({ caller }) func addPhoto(invitationId : Text, photoId : Text, imageUrl : Text) : async Photo {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add photos");
    };
    switch (invitationStore.get(invitationId)) {
      case (null) { Runtime.trap("Associated invitation not found") };
      case (?_) {
        let photo : Photo = {
          id = photoId;
          invitationId;
          imageUrl;
          uploadedAt = now();
        };
        photoStore.add(photoId, photo);
        photo;
      };
    };
  };

  public shared ({ caller }) func deletePhoto(photoId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete photos");
    };
    if (not photoStore.containsKey(photoId)) {
      Runtime.trap("Photo not found");
    };
    photoStore.remove(photoId);
  };

  // Public read - no auth needed (wedding guests view gallery)
  public query func getPhotosByInvitation(invitationId : Text) : async [Photo] {
    let list = List.empty<Photo>();
    for (photo in photoStore.values()) {
      if (photo.invitationId == invitationId) {
        list.add(photo);
      };
    };
    list.toArray();
  };

  public shared ({ caller }) func setBackgroundMusic(invitationId : Text, musicId : Text, musicUrl : Text, autoPlay : Bool) : async BackgroundMusic {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set background music");
    };
    switch (invitationStore.get(invitationId)) {
      case (null) { Runtime.trap("Associated invitation not found") };
      case (?_) {
        let music : BackgroundMusic = {
          id = musicId;
          invitationId;
          musicUrl;
          autoPlay;
          uploadedAt = now();
        };
        musicStore.add(musicId, music);
        music;
      };
    };
  };

  // Public read - no auth needed (wedding guests hear background music)
  public query func getBackgroundMusic(invitationId : Text) : async [BackgroundMusic] {
    let list = List.empty<BackgroundMusic>();
    for (music in musicStore.values()) {
      if (music.invitationId == invitationId) {
        list.add(music);
      };
    };
    list.toArray();
  };

  public shared ({ caller }) func saveThemeVariant(invitationId : Text, themeConfig : ThemeConfig) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save theme variants");
    };
    switch (invitationStore.get(invitationId)) {
      case (null) { Runtime.trap("Invitation not found") };
      case (?invitation) {
        let newSavedThemes = invitation.savedThemes.concat([themeConfig]);
        let updatedInvitation : Invitation = {
          invitation with savedThemes = newSavedThemes;
        };
        invitationStore.add(invitationId, updatedInvitation);
      };
    };
  };

  // Public read - no auth needed (theme variants are part of the public invitation)
  public query func getThemeVariants(invitationId : Text) : async [ThemeConfig] {
    switch (invitationStore.get(invitationId)) {
      case (null) { Runtime.trap("Invitation not found") };
      case (?invitation) { invitation.savedThemes };
    };
  };

  public shared ({ caller }) func deleteThemeVariant(invitationId : Text, themeIndex : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete theme variants");
    };
    switch (invitationStore.get(invitationId)) {
      case (null) { Runtime.trap("Invitation not found") };
      case (?invitation) {
        if (themeIndex >= invitation.savedThemes.size()) {
          Runtime.trap("Invalid theme index");
        };

        let themesArray : [ThemeConfig] = invitation.savedThemes;
        let mutableThemes : [var ?ThemeConfig] = themesArray.toVarArray<ThemeConfig>().map(
          func(theme) {
            ?theme;
          }
        );
        mutableThemes[themeIndex] := null;

        let filteredThemes = mutableThemes.toArray().filterMap(
          func(theme) {
            switch (theme) {
              case (null) { null };
              case (?t) { ?t };
            };
          }
        );

        let updatedInvitation : Invitation = {
          invitation with savedThemes = filteredThemes;
        };
        invitationStore.add(invitationId, updatedInvitation);
      };
    };
  };

  // Invite codes - requires user role (only invitation owners generate invite codes)
  public shared ({ caller }) func generateInviteCode() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can generate invite codes");
    };
    let blob = await Random.blob();
    let code = InviteLinksModule.generateUUID(blob);
    InviteLinksModule.generateInviteCode(inviteState, code);
    code;
  };

  // RSVP submission via invite code - open to all including guests
  public shared ({ caller }) func submitRSVP(name : Text, attending : Bool, inviteCode : Text) : async () {
    InviteLinksModule.submitRSVP(inviteState, name, attending, inviteCode);
  };

  // RSVP and invite code reads - require user role (only invitation owners view these)
  public query ({ caller }) func getAllRSVPs() : async [InviteLinksModule.RSVP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view all RSVPs");
    };
    InviteLinksModule.getAllRSVPs(inviteState);
  };

  public query ({ caller }) func getInviteCodes() : async [InviteLinksModule.InviteCode] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view invite codes");
    };
    InviteLinksModule.getInviteCodes(inviteState);
  };
};

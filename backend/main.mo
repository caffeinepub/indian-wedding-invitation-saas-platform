import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

actor {
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
    isPublished : Bool;
    createdAt : Int;
    updatedAt : Int;
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

  let invitationStore = Map.empty<Text, Invitation>();
  let eventStore = Map.empty<Text, Event>();
  let rsvpStore = Map.empty<Text, RSVPEntry>();
  let photoStore = Map.empty<Text, Photo>();
  let musicStore = Map.empty<Text, BackgroundMusic>();

  func now() : Int {
    Time.now();
  };

  func validateSlug(slug : Text) {
    if (invitationStore.containsKey(slug)) {
      Runtime.trap("This slug is already taken. Please choose a unique slug.");
    };
  };

  public shared ({ caller }) func createInvitation(slug : Text, brideName : Text, groomName : Text, weddingDate : Text, weddingTime : Text, venueName : Text, venueAddress : Text, googleMapsLink : Text, familyDetails : Text, invitationMessage : Text, selectedTemplate : Text, colorScheme : Text, fontChoice : Text, backgroundChoice : Text) : async Invitation {
    validateSlug(slug);

    let invitation : Invitation = {
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
      isPublished = false;
      createdAt = now();
      updatedAt = now();
    };
    invitationStore.add(slug, invitation);
    invitation;
  };

  public shared ({ caller }) func updateInvitation(slug : Text, brideName : Text, groomName : Text, weddingDate : Text, weddingTime : Text, venueName : Text, venueAddress : Text, googleMapsLink : Text, familyDetails : Text, invitationMessage : Text, selectedTemplate : Text, colorScheme : Text, fontChoice : Text, backgroundChoice : Text) : async Invitation {
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
          isPublished = existing.isPublished;
          createdAt = existing.createdAt;
          updatedAt = now();
        };
        invitationStore.add(slug, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func getInvitationBySlug(slug : Text) : async Invitation {
    switch (invitationStore.get(slug)) {
      case (null) { Runtime.trap("Invitation not found") };
      case (?invitation) { invitation };
    };
  };

  public query ({ caller }) func getAllInvitations() : async [Invitation] {
    invitationStore.values().toArray();
  };

  public shared ({ caller }) func publishInvitation(slug : Text) : async Invitation {
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
    if (not invitationStore.containsKey(slug)) {
      Runtime.trap("Invitation not found");
    };
    invitationStore.remove(slug);
  };

  public shared ({ caller }) func addEvent(invitationId : Text, eventId : Text, title : Text, date : Text, time : Text, venue : Text, description : Text, eventType : EventType) : async Event {
    switch (invitationStore.get(invitationId)) {
      case (null) { Runtime.trap("Associated invitation not found") };
      case (?_) {
        let event : Event = {
          id = eventId;
          invitationId;
          title;
          date;
          time;
          venue;
          description;
          eventType;
        };
        eventStore.add(eventId, event);
        event;
      };
    };
  };

  public shared ({ caller }) func updateEvent(eventId : Text, title : Text, date : Text, time : Text, venue : Text, description : Text, eventType : EventType) : async Event {
    switch (eventStore.get(eventId)) {
      case (null) { Runtime.trap("Event not found") };
      case (?existing) {
        let updated : Event = {
          id = eventId;
          invitationId = existing.invitationId;
          title;
          date;
          time;
          venue;
          description;
          eventType;
        };
        eventStore.add(eventId, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func deleteEvent(eventId : Text) : async () {
    if (not eventStore.containsKey(eventId)) {
      Runtime.trap("Event not found");
    };
    eventStore.remove(eventId);
  };

  public query ({ caller }) func getEventsByInvitation(invitationId : Text) : async [Event] {
    let list = List.empty<Event>();
    for (event in eventStore.values()) {
      if (event.invitationId == invitationId) {
        list.add(event);
      };
    };
    list.toArray();
  };

  public shared ({ caller }) func submitRSVP(invitationId : Text, rsvpId : Text, guestName : Text, guestPhone : Text, attending : Bool, guestCount : Nat, message : Text) : async RSVPEntry {
    switch (invitationStore.get(invitationId)) {
      case (null) { Runtime.trap("Associated invitation not found") };
      case (?_) {
        let rsvp : RSVPEntry = {
          id = rsvpId;
          invitationId;
          guestName;
          guestPhone;
          attending;
          guestCount;
          message;
          submittedAt = now();
        };
        rsvpStore.add(rsvpId, rsvp);
        rsvp;
      };
    };
  };

  public query ({ caller }) func getRSVPsByInvitation(invitationId : Text) : async [RSVPEntry] {
    let list = List.empty<RSVPEntry>();
    for (rsvp in rsvpStore.values()) {
      if (rsvp.invitationId == invitationId) {
        list.add(rsvp);
      };
    };
    list.toArray();
  };

  public query ({ caller }) func getRSVPsStats(invitationId : Text) : async RSVPStats {
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
    if (not photoStore.containsKey(photoId)) {
      Runtime.trap("Photo not found");
    };
    photoStore.remove(photoId);
  };

  public query ({ caller }) func getPhotosByInvitation(invitationId : Text) : async [Photo] {
    let list = List.empty<Photo>();
    for (photo in photoStore.values()) {
      if (photo.invitationId == invitationId) {
        list.add(photo);
      };
    };
    list.toArray();
  };

  public shared ({ caller }) func setBackgroundMusic(invitationId : Text, musicId : Text, musicUrl : Text, autoPlay : Bool) : async BackgroundMusic {
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

  public query ({ caller }) func getBackgroundMusic(invitationId : Text) : async [BackgroundMusic] {
    let list = List.empty<BackgroundMusic>();
    for (music in musicStore.values()) {
      if (music.invitationId == invitationId) {
        list.add(music);
      };
    };
    list.toArray();
  };
};

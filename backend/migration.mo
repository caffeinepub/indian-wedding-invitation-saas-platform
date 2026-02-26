import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type ThemeConfig = {
    template : Text;
    colorScheme : Text;
    fontChoice : Text;
    backgroundChoice : Text;
  };

  // Old record types
  type OldInvitation = {
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

  type OldActor = {
    invitationStore : Map.Map<Text, OldInvitation>;
  };

  // New record types
  type NewInvitation = {
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
    savedThemes : [ThemeConfig];
  };

  type NewActor = {
    invitationStore : Map.Map<Text, NewInvitation>;
  };

  public func run(old : OldActor) : NewActor {
    // Only migrate invitationStore, leave the rest unchanged
    let newInvitationStore = old.invitationStore.map<Text, OldInvitation, NewInvitation>(
      func(_id, oldInvitation) {
        { oldInvitation with savedThemes = [] };
      }
    );
    { invitationStore = newInvitationStore };
  };
};

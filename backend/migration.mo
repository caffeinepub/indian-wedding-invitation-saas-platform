import Map "mo:core/Map";
import Text "mo:core/Text";
import Storage "blob-storage/Storage";

module {
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
    savedThemes : [OldThemeConfig];
  };

  type OldThemeConfig = {
    name : Text;
    template : Text;
    colorScheme : Text;
    fontChoice : Text;
    backgroundChoice : Text;
  };

  type OldActor = {
    invitationStore : Map.Map<Text, OldInvitation>;
  };

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
    bridePhoto : ?Storage.ExternalBlob;
    groomPhoto : ?Storage.ExternalBlob;
    isPublished : Bool;
    createdAt : Int;
    updatedAt : Int;
    savedThemes : [NewThemeConfig];
  };

  type NewThemeConfig = {
    name : Text;
    template : Text;
    colorScheme : Text;
    fontChoice : Text;
    backgroundChoice : Text;
  };

  type NewActor = {
    invitationStore : Map.Map<Text, NewInvitation>;
  };

  public func run(old : OldActor) : NewActor {
    let invitationStore = old.invitationStore.map<Text, OldInvitation, NewInvitation>(func(_id, oldInvitation) {
      {
        oldInvitation with
        bridePhoto = null;
        groomPhoto = null;
        savedThemes = oldInvitation.savedThemes.map<OldThemeConfig, NewThemeConfig>(func(theme) { theme });
      }
    });
    { invitationStore };
  };
};

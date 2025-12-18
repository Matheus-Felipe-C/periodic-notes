export function messageForNoteResult(result) {
  if (result.ok) return null;

  switch (result.reason) {
    case "MISSING_TEMPLATE_UUID":
      return "This note command is not configured. Please select a template in settings.";

    case "TEMPLATE_NOT_FOUND":
      return "The template note could not be found. It may have been deleted.";

    case "TEMPLATE_LOOKUP_FAILED":
      return "Could not access your notes. Please try again later.";

    case "NOTE_LOOKUP_FAILED":
      return "Something went wrong while searching for existing notes.";

    case "NOTE_CREATION_FAILED":
      return "The note could not be created. Please check your permissions.";

    default:
      return "An unknown error occurred.";
  }
}

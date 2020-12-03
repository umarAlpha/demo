import Announcement from "../../BussinessObjects/Announcement";
import {
  generateFieldObject,
  generateSortingObject,
} from "../../Utility/CommonMethods";

class AnnouncementBody {
  getFilters = () => {
    let filters = [];
    filters.push(
      generateFieldObject(Announcement.fields.AnnouncementStatus, "Current")
    );
    return filters;
  };
  alertsBody = () => {
    return {
      busObId: Announcement.busObId,
      fields: Object.values(Announcement.fields),
      filters: this.getFilters(),
      sorting: [
        generateSortingObject(Announcement.fields.AnnouncementLastModDate, 0),
      ],
    };
  };
}
let announcementBody = new AnnouncementBody();
export default announcementBody;
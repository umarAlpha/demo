class ComAroundArticleBody {
  postComInformationFilters = (contentID, reason, email, title) => {
    return {
      contentId: contentID,
      culture: 'en-US',
      reason: reason,
      email: email,
      title: title,
    };
  };

  contentFormBody = (specificContentID, reason, email, title) => {
    return {
      contentId: specificContentID,
      culture: 'en-US',
      reason: reason,
      email: email,
      title: title,
    };
  };

  postNoComInformationFilters = (contentID) => {
    return {
      contentId: contentID, //PLACE contentID
      culture: 'en-US', //remains the same
      isHelpful: true, //TRUE: Like FALSE: Dislike
    };
  };
}

let ComAroundBody = new ComAroundArticleBody();
export default ComAroundBody;

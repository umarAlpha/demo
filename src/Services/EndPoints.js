const endPoints = {
  baseUrl: 'http://sigmagodev.centralus.cloudapp.azure.com',
  connectionID: '/CherwellService/api.asmx?WSDL=',
  token: 'CherwellAPI/token',
  loginUser: 'CherwellAPI/api/V3/getuserbyloginid',
  logout: 'CherwellAPI/api/V1/logout?',
  getsearchresults: 'CherwellAPI/api/V1/getsearchresults',
  getrelatedbusinessobject: 'CherwellAPI/api/V1/getrelatedbusinessobject',
  saverelatedbusinessobject: 'CherwellAPI/api/V1/saverelatedbusinessobject',
  savebusinessobject: 'CherwellAPI/api/V1/savebusinessobject',
  fieldvalueslookup: 'CherwellAPI/api/V1/fieldvalueslookup',
  getImage: 'CherwellAPI/api/V1/getgalleryimage/name/',
  linkrelatedbusinessobject: 'CherwellAPI/api/V1/linkrelatedbusinessobject',
  uploadbusinessobjectattachment:
    'CherwellAPI/api/V1/uploadbusinessobjectattachment',
  getBusinessObject: 'CherwellAPI/api/V1/getbusinessobject',
  getbusinessobjectattachments1:
    'CherwellAPI/api/V1/getbusinessobjectattachments',
  getbusinessobjectattachments2:
    'CherwellAPI//type/File/attachmenttype/Imported?includelinks=true',
  getbusinessobjectschema: 'CherwellAPI/api/V1/getbusinessobjectschema',
  getRights:
    'CherwellAPI/api/V2/getsecuritygroupbusinessobjectpermissionsforcurrentuserbybusobid',
  saveuser: 'CherwellAPI/api/V2/saveuser',
  saveBusinessObjectBatch: 'CherwellAPI//api/V1/savebusinessobjectbatch',

  // Comarounf end ponints
  BASE_URL: 'https://api2.comaround.com/rest',
  content_id: 'https://api2.comaround.com/rest/v2/content/',
  SUB_key: '79d6a16ede3d4749a36558ca14e4717a',
  Authentication_End_Point: `/v2/token/`,
  Get_Search: `/v2/search?SortBy=`,
  Get_Search_With_Filter: `/v2/search?SearchPhrase=`,
  ArticleFeedback: `/v2/articleflag/`,
  VoteApi: `/v2/statistics/vote/`,
  Suggestions: `/v2/search/suggestions/`,

  // Search Catalog
  getquicksearchresults: 'CherwellAPI/api/V1/getquicksearchresults',
};

export default endPoints;

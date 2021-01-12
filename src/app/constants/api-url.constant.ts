import { environment } from "src/environments/environment";

export class ApiUrlConstant {
  private static appurl = environment.myApiUrl;
  //add product and categary CATEGART
  public static get TEST(): string {
    return this.appurl + "/test";
  }
  public static get CATEGARTLIST(): string {
    return this.appurl + "/category/getAllCategorys";
  }
  public static get GETSEARCHCATEGORYTLIST(): string {
    return this.appurl + "/category/getSearchCategoryList";
  }
  // public static get SUBCATEGARTLIST(): string { return this.appurl + '/subcategory/getallSubcategory' }
  public static get GETSUBCATEGORY(): string {
    return this.appurl + "/subcategory/getSubCategoryList";
  }
  public static get SUBSCRIPTIONPLANLIST(): string {
    return this.appurl + "/subscription/getAllsubscriptions";
  }
  public static get FEEDBACKLIST(): string {
    return this.appurl + "/feedback/getAllfeedbacks";
  }
  public static get FEEDBACKSTATUSCHANGE(): string {
    return this.appurl + "/feedback/statusChange";
  }
  public static get USERSTATUSCHANGE(): string {
    return this.appurl + "/user/statusChange";
  }
  public static get SENDCONTACTUS(): string {
    return this.appurl + "/user/sendContactUs";
  }
  public static get PRODUCTFEATUREDCHANGE(): string {
    return this.appurl + "/product/productFeatureChange";
  }
  public static get SEARCHCONTACTINCHAT(): string {
    return this.appurl + "/chat/searchContact";
  }
  public static get GETOFFERLISTINCHAT(): string {
    return this.appurl + "/chat/getofferlist";
  }
  public static get SUBCATEGARTLIST(): string {
    return this.appurl + "/subcategory/getallSubcategory/";
  }
  public static get SUBCATEGART(): string {
    return this.appurl + "/subcategory/getSubcategory";
  }
  public static get CATEGART(): string {
    return this.appurl + "/category/getCategory";
  }
  public static get SUBCATEGARTLISTBYCATE(): string {
    return this.appurl + "/subcategory/getallSubcategoryBycate";
  }
  public static get SEARCHSUBCATEGORY(): string {
    return this.appurl + "/subcategory/getSearchSubCategory";
  }
  public static get ADDCATEGARY(): string {
    return this.appurl + "/category/saveCategory";
  }
  public static get ADDSUBSCRIPTIONPLAN(): string {
    return this.appurl + "/subscription/savesubscription";
  }
  public static get SUBSCRIPTIONPLAN(): string {
    return this.appurl + "/subscription/getsubscription";
  }
  public static get FEEDBACKPLAN(): string {
    return this.appurl + "/feedback/getfeedback";
  }
  public static get CHANGESUBSCRIPTIONSTATUS(): string {
    return this.appurl + "/setting/enabledisablesubscription";
  }
  public static get UPDATEEMAILSTATUS(): string {
    return this.appurl + "/setting/updateEmailStatus";
  }
  public static get UPDATECARTSTATUS(): string {
    return this.appurl + "/setting/updateCartStatus";
  }
  public static get UPDATECONTACTSTATUS(): string {
    return this.appurl + "/setting/updateContactStatus";
  }
  public static get UPDATESMTPSTATUS(): string {
    return this.appurl + "/setting/updateSmtpStatus";
  }
  public static get UPDATEPAYPALSTATUS(): string {
    return this.appurl + "/setting/updatePaypalStatus";
  }
  public static get GETSETTINGSTATUS(): string {
    return this.appurl + "/setting/settingstatus";
  }
  public static get GETEMAILBLASTUSERS(): string {
    return this.appurl + "/user/getEmailBlastUser";
  }
  public static get EXPORT_CSV_BULKUPLOAD(): string {
    return this.appurl + "/product/exportcsvbulkupload";
  }

  public static get ADDSUBCATEGARY(): string {
    return this.appurl + "/subcategory/saveSubcategory";
  }
  public static get DELETECATE(): string {
    return this.appurl + "/category/deleteCategory";
  }
  public static get DELETESUBCATE(): string {
    return this.appurl + "/subcategory/deletesubcategory";
  }
  public static get DELETEFEEDBACK(): string {
    return this.appurl + "/feedback/deletefeedback";
  }
  public static get SAVEFEEDBACK(): string {
    return this.appurl + "/feedback/savefeedback";
  }

  public static get DELETEUSER(): string {
    return this.appurl + "/user/deleteUser";
  }
  public static get DELETEPRODUCT(): string {
    return this.appurl + "/product/deleteProduct";
  }
  public static get DELETESUBSCRIPTIONPLAN(): string {
    return this.appurl + "/subscription/deletesubscription";
  }
  public static get ADDPRODUCT(): string {
    return this.appurl + "/product/saveProduct";
  }
  public static get BULKUPLOAD(): string {
    return this.appurl + "/product/bulkUpload";
  }
  public static get UPLOADLISTING(): string {
    return this.appurl + "/bidsasks/uploadListing";
  }
  public static get PRODUCTLIST(): string {
    return this.appurl + "/product/getAllProducts";
  }
  public static get GETPROD(): string {
    return this.appurl + "/product/getProduct";
  }
  public static get USERLIST(): string {
    return this.appurl + "/user/getAllUsers";
  }
  public static get TRANSACTIONLIST(): string {
    return this.appurl + "/user/getTransactionList";
  }
  public static get EXPORTTRANSACTIONLIST(): string {
    return this.appurl + "/user/exportTransactionList";
  }
  public static get ADMINUSERLIST(): string {
    return this.appurl + "/user/getAllAdminUsers";
  }
  public static get GETUSER(): string {
    return this.appurl + "/user/getUser";
  }
  public static get GETLASTTHREETRANSACTION(): string {
    return this.appurl + "/user/getLastThreeTransaction";
  }
  public static get GETUSERBID(): string {
    return this.appurl + "/bidsasks/getUserBid";
  }
  public static get SAVETXNHISTORY(): string {
    return this.appurl + "/user/saveTxnHistory";
  }
  public static get GETTXNHISTORY(): string {
    return this.appurl + "/user/getTxnHistory";
  }

  public static get YEARLIST(): string {
    return this.appurl + "/product/getAllCategorysYears";
  }
  public static get PRODUCTBYEARLIST(): string {
    return this.appurl + "/product/getAllproductByYears";
  }
  public static get SEARCHLIST(): string {
    return this.appurl + "/product/getSearchList";
  }
  public static get GETALLNEWPRODUCT(): string {
    return this.appurl + "/product/getAllNewProduct";
  }
  public static get GETPOPULARPRODUCT(): string {
    return this.appurl + "/product/getPopularProduct";
  }

  public static get GETPRODUCTBYID(): string {
    return this.appurl + "/product/getProductById";
  }
  public static get GETOFFERBYID(): string {
    return this.appurl + "/user/getOfferById";
  }
  public static get ACCEPTOFFER(): string {
    return this.appurl + "/user/acceptOffer";
  }

  public static get CANCELOFFER(): string {
    return this.appurl + "/user/cancelOffer";
  }

  public static get CONFIRMDELIVERY(): string {
    return this.appurl + "/user/confirmDelivery";
  }
  public static get ADDTRACKNO(): string {
    return this.appurl + "/user/addTrackNo";
  }
  public static get ADDPAYMENTDETAIL(): string {
    return this.appurl + "/user/addPaymentDetail";
  }
  public static get ADDTOCART(): string {
    return this.appurl + "/cart/addtocart";
  }
  public static get DELETEFROMCART(): string {
    return this.appurl + "/cart/deleteFromCart";
  }

  public static get SENDOFFERFROMCART(): string {
    return this.appurl + "/cart/sendOfferFromCart";
  }

  public static get DECLINEOFFER(): string {
    return this.appurl + "/user/declineOffer";
  }
  public static get GETALLTWONEWPRODUCT(): string {
    return this.appurl + "/product/getAllNewProductTwodays";
  }
  public static get GETALLTODAYNEWPRODUCT(): string {
    return this.appurl + "/product/getAllNewProductToday";
  }
  public static get GETALLTHREENEWPRODUCT(): string {
    return this.appurl + "/product/getAllNewProductThreedays";
  }
  public static get CREATECOUNTER(): string {
    return this.appurl + "/product/createCounter";
  }
  public static get CREATECHATROOM(): string {
    return this.appurl + "/chat/createRoom";
  }

  //create bids and Asks
  public static get CREATEBIDSASKS(): string {
    return this.appurl + "/bidsasks/createbidsorask";
  }
  public static get GETALLBIDS(): string {
    return this.appurl + "/bidsasks/getfilterData";
  }
  public static get DELETEBIDORASK(): string {
    return this.appurl + "/bidsasks/deleteBidOrAsk";
  }
  public static get UPDATEBIDORASK(): string {
    return this.appurl + "/bidsasks/updateBidOrAsk";
  }
  public static get UPDATENOTES(): string {
    return this.appurl + "/bidsasks/updateNotes";
  }
  public static get INACTIVEBIDORASK(): string {
    return this.appurl + "/bidsasks/inactiveBidOrAsk";
  }
  public static get GETLISTINGSEARCH(): string {
    return this.appurl + "/bidsasks/getListingSearch";
  }
  public static get GETLISTINGFILTERRESULT(): string {
    return this.appurl + "/bidsasks/getlistingfilterData";
  }
  public static get GETUSERPROFILELISTINGFILTER(): string {
    return this.appurl + "/bidsasks/getUserProfilelistingfilter";
  }
  public static get GETUSERDATA(): string {
    return this.appurl + "/bidsasks/getUserData";
  }
  public static get GETUSERFEEDBACK(): string {
    return this.appurl + "/bidsasks/getUserFeedback";
  }
  public static get UPDATEUSERDATA(): string {
    return this.appurl + "/bidsasks/updateMyAsk";
  }
  public static get DELETEALLBIDORASK(): string {
    return this.appurl + "/bidsasks/deleteAllBidOrAsk";
  }
  public static get INACTIVEALLBIDORASK(): string {
    return this.appurl + "/bidsasks/inactiveAllBidOrAsk";
  }
  public static get DELETELISTINGBIDORASK(): string {
    return this.appurl + "/bidsasks/deleteListingBidOrAsk";
  }
  public static get INACTIVELISTINGBIDORASK(): string {
    return this.appurl + "/bidsasks/inactiveListingBidOrAsk";
  }
  public static get BIDANDASKINFO(): string {
    return this.appurl + "/bidsasks/getBidAndAskId";
  }

  public static get GETMYCONTACTLIST(): string {
    return this.appurl + "/chat/getcontactlist";
  }
  public static get GETMYCHATS(): string {
    return this.appurl + "/chat/getchatlist";
  }

  public static get GETALLHIGHLOWBIDASK(): string {
    return this.appurl + "/bidsasks/getHighestBidOrMinAsk";
  }
  //admin user/product/categary update api
  public static get UPDATEPRODUCT(): string {
    return this.appurl + "/product/editProduct";
  }
  public static get UPDATESUBCATE(): string {
    return this.appurl + "/subcategory/editsubcategory";
  }

  public static get UPDATECATE(): string {
    return this.appurl + "/category/editCategory";
  }
  public static get UPDATEUSER(): string {
    return this.appurl + "/user/editUser";
  }
  public static get GETACTIVEOFFER(): string {
    return this.appurl + "/user/getActiveOfferByUserId";
  }
  public static get GETACTIVEOFFERRECIEVED(): string {
    return this.appurl + "/user/getActiveRecievedByUserId";
  }
  public static get GETACCEPTOFFER(): string {
    return this.appurl + "/user/getAcceptOfferByUserId";
  }
  public static get GETSENTACCEPTOFFER(): string {
    return this.appurl + "/user/getSentAcceptOfferByUserId";
  }

  public static get GETPENDINGOFFERS(): string {
    return this.appurl + "/user/getPendingOfferByUserId";
  }
  public static get DELETEOFFER(): string {
    return this.appurl + "/user/deleteOffer";
  }
  public static get DELETEALLOFFER(): string {
    return this.appurl + "/user/deleteAllOffer";
  }
  public static get GETRECIEVEDOFFER(): string {
    return this.appurl + "/user/getRecievedOfferByUserId";
  }
  public static get GETSENTDOFFER(): string {
    return this.appurl + "/user/getSentOfferByUserId";
  }
  public static get GETCLOSEDOFFER(): string {
    return this.appurl + "/user/getClosedOfferByUserId";
  }
  public static get GETCOUNTER(): string {
    return this.appurl + "/user/getCounter";
  }
  public static get GETUSERS(): string {
    return this.appurl + "/user/getUsers";
  }
  public static get GETCHATOFFER(): string {
    return this.appurl + "/user/getChatOffers";
  }
  public static get GETCOUNTERHISTORY(): string {
    return this.appurl + "/bidsasks/getCounterHistory";
  }
  public static get SAVECOUNTERHIS(): string {
    return this.appurl + "/bidsasks/saveCounterHistory";
  }

  public static get UPDATESUBSCRIPTIONPLAN(): string {
    return this.appurl + "/subscription/editsubscription";
  }
  public static get UPDATEFEEDBACK(): string {
    return this.appurl + "/feedback/editfeedback";
  }

  // Notifications apis
  public static get ADDNOTIFICATION(): string {
    return this.appurl + "/user/addNotification";
  }
  public static get GETNOTIFICATIONSBYUSERID(): string {
    return this.appurl + "/user/getNotificationByUserId";
  }
  public static get READNOTIFICATIONBYID(): string {
    return this.appurl + "/user/readNotification";
  }
  public static get DELETENOTIFICATIONBYID(): string {
    return this.appurl + "/user/deleteNotification";
  }
  public static get UPDADTEBIDSANDASK(): string {
    return this.appurl + "/bidsasks/updateBidAndAsk";
  }
  // auth api
  // public static get LOGIN(): string { return this.appurl + '/user/login' };
  public static get LOGIN(): string {
    return this.appurl + "/user/userlogin";
  }
  public static get VERIFYUSER(): string {
    return this.appurl + "/user/verifyUser";
  }
  public static get REGISTER(): string {
    return this.appurl + "/user/userRegister";
  }
  public static get GETADMINUSERS(): string {
    return this.appurl + "/admin/getAllAdminDetails";
  }
  public static get RESETPASSWORD(): string {
    return this.appurl + "/user/resetPassword";
  }
  public static get FORGOTPASSWORD(): string {
    return this.appurl + "/user/forgotPassword";
  }
  public static get ACTIVATEUSER(): string {
    return this.appurl + "/user/activateUser";
  }
  //user Profile
  public static get UPDATEUSERPROFILE(): string {
    return this.appurl + "/user/updateUserProfile";
  }
  public static get UPLOADFILE(): string {
    return this.appurl + "/user/uploadFile";
  }
  public static get UPDATEUSERSTATUS(): string {
    return this.appurl + "/admin/updateUserStatus";
  }
  public static get GETINDIVIDUALUSERDATA(): string {
    return this.appurl + "//user/getIndivdualuserData";
  }
  public static get UPDATEPROFILE(): string {
    return this.appurl + "/user/updateprofile";
  }
  public static get SAVEEMAILBLAST(): string {
    return this.appurl + "/user/saveEmailBlast";
  }
  //UserArticle
  public static get SAVEMYARTICLE(): string {
    return this.appurl + "/article/saveMyArticle";
  }
  public static get SAVEMYARTICLEIMAGE(): string {
    return this.appurl + "/article/uploadArticleImage";
  }
  public static get GETALLMYARTILES(): string {
    return this.appurl + "/article/getAllAdminArticles";
  }
  public static get GETALLMYARTILE(): string {
    return this.appurl + "/article/getUserArticle";
  }
  public static get UPDATEMYARTICLE(): string {
    return this.appurl + "/article/updateMyArticle";
  }
  public static get UPLOADDOCUMENTCALLBACK(): string {
    return this.appurl + "/article/uploadDocumentCallback";
  }
  public static get DELETEARTICLE(): string {
    return this.appurl + "/article/deleteArticle";
  }
  //Cart
  public static get LIST_ADD_TO_CART(): string {
    return this.appurl + "/cart/listAddToCart";
  }

  //UserSurvey

  public static get SAVEMYSURVEYS(): string {
    return this.appurl + "/survey/addSurvey";
  }
  public static get UPDATESAVEMYSURVEYS(): string {
    return this.appurl + "/survey/updateSurvey";
  }
  public static get GETALLSURVEYS(): string {
    return this.appurl + "/survey/getAllUserSurveys";
  }
  public static get DELETESURVEY(): string {
    return this.appurl + "/survey/deleteSurvey";
  }
  public static get UPDATESURVEYQUESTION(): string {
    return this.appurl + "/survey/updateSurveyQue";
  }
  public static get GETUSERFILLEDSURVEYDATA(): string {
    return this.appurl + "/survey/getUserFilledSurvey";
  }
  public static get SAVENEWUSERQUESTIONLIST(): string {
    return this.appurl + "/questionlist/saveQuestionList";
  }
  public static get GETALLQUESTIONLIST(): string {
    return this.appurl + "/questionlist/getAllQuestionList";
  }
  public static get DELETESURVEYLISTITEM(): string {
    return this.appurl + "/questionlist/deleteSurveyListItem";
  }
  public static get GETSUBMITTEDSURVEYS(): string {
    return this.appurl + "/survey/getAllUserSubmittedSurvey";
  }
  public static get CHANGESTATUSOFSURVEY(): string {
    return this.appurl + "/questionlist/changeStatusSurveyListItem";
  }

  //admin info
  public static get DASHBOARDAPI(): string {
    return this.appurl + "/admin/dashBoardAPI";
  }
  public static get GETREGISTERUSERS(): string {
    return this.appurl + "/user/getRegisterUsers";
  }

  //email
  public static get LISTEMAILTEMPLATE(): string {
    return this.appurl + "/emailTemplate/listEmailTemplate";
  }
  public static get GETTEMPLATEBYID(): string {
    return this.appurl + "/email/getTemplateById";
  }
  public static get EDITEMAILTEMPLATE(): string {
    return this.appurl + "/email/editEmailTemplate";
  }
  public static get DELETEEMAILTEMPLATE(): string {
    return this.appurl + "/email/deleteEmailTemplate";
  }

  //noitification
  public static get ADDNEWNOTIFICATION(): string {
    return this.appurl + "/notification/addNotification";
  }
  public static get GETALLNOTIFICATIONLIST(): string {
    return this.appurl + "/notification/getAllnoitification";
  }
  public static get GETNOTIFICATION(): string {
    return this.appurl + "/notification/getNotification";
  }
  public static get UPDATENOTIFICATION(): string {
    return this.appurl + "/notification/updateNotification";
  }
  public static get DELETENOTIFICATION(): string {
    return this.appurl + "/notification/deleteNotification";
  }
  public static get UPDATESTATUSNOTIFICATION(): string {
    return this.appurl + "/notification/updatenotificationStatus";
  }

  //role & Permission
  public static get ADDNEWROLEANDPERMISSION(): string {
    return this.appurl + "/rolesAndPermission/addrolesAndPermission";
  }
  public static get GETALLROLESANDPERMISSION(): string {
    return this.appurl + "/rolesAndPermission/getAllRolesAndPermission";
  }
  public static get GETUSERROLESANDPERMISSION(): string {
    return this.appurl + "/rolesAndPermission/getUserRolesAndPermission";
  }

  public static get UPDATEUSERROLESANDPERMISSION(): string {
    return this.appurl + "/rolesAndPermission/updateUserRolesAndPermission";
  }

  public static get DELETEROLE(): string {
    return this.appurl + "/rolesAndPermission/deleteRolesAndPermission";
  }

  public static get WATCHLIST(): string {
    return this.appurl + "/user/addWatchList";
  }
  public static get GETWATCHLIST(): string {
    return this.appurl + "/user/getWatchListData";
  }
  public static get GETALLWATCHLIST(): string {
    return this.appurl + "/user/getAllWatchListData";
  }

  public static get GETMYOFFERS(): string {
    return this.appurl + "/user/getMyOffers";
  }
}

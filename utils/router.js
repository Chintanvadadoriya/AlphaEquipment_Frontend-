export const router = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/register",
  RESETPASSWORD: "/auth/resetpassword",
  FORGETPASSWORD: "/auth/forgetpassword",
  ADMIN: "/admin",
  BUYER: "/buyer",
  SELLER: "/seller",
  SPLASH: "/",
  PROFILE: "/profile",
  NOTIFICATION:"/buyer/notification",
  CHAT:"/buyer/chat",
  BUYERCATEGORY: "/buyer/category",
  CATEGORY: {
    SUBCATEGORY: "/buyer/category/subcategory",
    PRODUCTLIST: "/buyer/category/listing",
    PRODUCT: "/buyer/category/detail",
  },
  BUYERAUCTION: "/buyer/auction",
  AUCTION: {
    DETAIL: "/buyer/auction/detail",
  },
  BUYERSPAREPARTS: "/buyer/spareparts",
  SPAREPARTS: {
    DETAIL: "spareparts/detail",
  },
  BUYERFINANCING: "/buyer/financing",
  BUYERRENTED: "/buyer/rented",
  RENTED: {
    SUBCATEGORY: "/buyer/rented/subcategory",
    PRODUCT: "/buyer/rented/listing",
    DETAIL: "/buyer/rented/detail",
  },
  BUYERCALCULATOR: "/buyer/calculator",
  ADMIN: {
    INDEX: "/admin",
    HOME: "/admin/home",
  },
};

export const apiRoutes = {
  user: {
    REGISTER: `user/register`,
    LOGIN: `user/login`,
    OTPSEND: `user/email-otp`,
    OTPVERIFY: `user/verify-otp`,
    FORGETPASSWORD: `user/forget-password`,
    GETPROFILE: "user/get-detail",
    RESETPASSWORD: `user/reset-password`,
    UPDATEPROFILE: `user/update-user`,
    PHONENUMBERVERIFY: `user/verify-phonenumber`,
    SENDOTPSMS: `user/sms-otp`,
    ACCOUNTDELETE: `user/`,
    LOGOUT: `user/logout`,
  },
  role: {
    GETALLROLES: `role/`,
  },
  shop: {
    GETALLSHOPS: "seller/shop/",
    GETVERIFICATIONOTP: "/seller/shop/otp/",
    CREATESHOP: "/seller/shop/",
  },
  product: {
    CREATEPRODUCT: "seller/product",
    GETCATEGORY: "seller/category/allCategory",
    GETSUBCATEGORYBYCATEGORY: "seller/sub-category",
    GETMODELNO: "seller/model-number",
    GETPRODUCT: "seller/product",
    DELETEPRODUCT: "seller/product",
    PRODUCTBYID: "seller/product/productById",
    UPDATEPRODUCT: "seller/product",
  },
  buyer: {
    HOME: "buyer/pages",
    SIDECATEGORY: "/buyer/pages/categorySidebar",
    CATEGORYMAIN: "buyer/pages/categoryMain",
    SIDESUBCATEGORY: "buyer/pages/subcategorySidebar/1",
    SUBCATEGORYMAIN: "buyer/pages/subcategoryMain/1",
    PRODUCTLIST: "buyer/pages/productList",
    PRODUCT: "buyer/pages/product",
    PRODUCTTYPEPRODUCTLIST: "buyer/pages/productTypeProductList",
    CREATEPAYMENTINTENT: "buyer/payment/create-payment-intent",
    SELLTYPEPRODUCT: "buyer/pages/sellTypeProductpage",
  },
  subscription: {
    GETALLPLANS: "subscription/all-plans",
    GETCARDLIST: "subscription/card-list",
    ADDCARD: "subscription/add-card",
    CREATECUSTOMER: "subscription/create-customer",
    SUBSCRIPTION: "subscription/create-subscription",
    DEFAULTCARD: "subscription/set-default-card",
  },
  buyRequest: {
    CREATEREQUEST: "buyer/buy-requests",
    BUYREQUESTLIST: "seller/buy-requests",
    BUYREQUESTLISTBYPRODUCT: "seller/buy-requests/get-by-product",
    BUYREQUESTACCEPTDENY: "seller/buy-requests",
  },
  rentRequest: {
    CREATEREQUEST: "buyer/rent-requests",
    RENTREQUESTLIST: "seller/rent-requests",
    RENTREQUESTBYID: "seller/rent-requests/get-by-product",
    RENTREQUESTRESPONSE: "seller/rent-requests",
    RENTREQUESTCAPTURE: "seller/payment/capture-payment",
    RENTREQUESTCANCEL: "seller/payment/cancel-payment",
  },
  auctionRequest: {
    AUCTIONREQUESTLIST: "buyer/auction",
    AUCTIONREQUESTBYID: "seller/auction/get-by-product?",
    CREATEAUCTIONREQUEST: "buyer/auction",
    GETBID: "buyer/auction/get-bid",
    AUCTIONPRODUCTLIST: "seller/auction",
    AUCTIONREQUESTACCEPTDENY: "seller/auction",
  },
  paymentHistory: {
    GETPAYMENTHISTORY: "seller/payment/payment-history",
  },
  notification: {
    NOTIFICATIONLIST:"notification/list"
  },
  orderStatus:{
    GETORDERSTATUS:"seller/payment/order-status"
  },
  admin: {
    adminLogin: "admin/auth/login",
  },
};

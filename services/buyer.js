import { apiRoutes, catchAsyncError, getAxiosInstance } from "@utils";

const getAxios = getAxiosInstance();
const axiosInstance = getAxios();

export const getHomeDetail = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.buyer.HOME);
  return response.data;
});

export const getSidebarCategory = catchAsyncError(async (payload = "") => {
  const response = await axiosInstance.get(apiRoutes.buyer.SIDECATEGORY + payload);
  return response?.data;
});

export const categoryDetail = catchAsyncError(async (payload = "") => {
  const response = await axiosInstance.get(apiRoutes.buyer.CATEGORYMAIN + payload);
  return response?.data;
});

export const getSidebarSubcategory = catchAsyncError(async (payload = "") => {
  const response = await axiosInstance.get(apiRoutes.buyer.SIDESUBCATEGORY + payload);
  return response?.data;
});

export const subCategoryDetail = catchAsyncError(async (payload = "") => {
  const response = await axiosInstance.get(apiRoutes.buyer.SUBCATEGORYMAIN + payload);
  return response?.data;
});

export const getProducts = catchAsyncError(async (payload = "") => {
  const response = await axiosInstance.get(apiRoutes.buyer.PRODUCTLIST + payload);
  return response?.data;
});

export const getProduct = catchAsyncError(async (payload = "") => {
  const response = await axiosInstance.get(apiRoutes.buyer.PRODUCT + payload);
  return response?.data;
});

export const getProductListByProductType = catchAsyncError(async (payload = "") => {
  const response = await axiosInstance.get(apiRoutes.buyer.PRODUCTTYPEPRODUCTLIST + payload);
  return response?.data;
});

export const createProductRequest = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.buyRequest.CREATEREQUEST, payload);
  return response?.data;
});

export const createProductPaymentIntenet = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.buyer.CREATEPAYMENTINTENT, payload);
  return response?.data;
});

export const getSellTypeProductList = catchAsyncError(async (payload = "") => {
  const response = await axiosInstance.get(apiRoutes.buyer.SELLTYPEPRODUCT + payload);
  return response?.data;
});

export const createRentProductRequest = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.rentRequest.CREATEREQUEST, payload);
  return response?.data;
});

export const createAuctionProductRequest = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.auctionRequest.CREATEAUCTIONREQUEST, payload);
  return response?.data;
});

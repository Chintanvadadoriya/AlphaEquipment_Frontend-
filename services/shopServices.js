import { apiRoutes, catchAsyncError, getAxiosInstance } from "@utils";
import { pinJSON } from "utils/web3Utils";

const getAxios = getAxiosInstance();
const axiosInstance = getAxios();

export const getShopList = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.shop.GETALLSHOPS);
  return response.data;
});
export const shopverificationotp = catchAsyncError(async (payload) => {
  const response = await axiosInstance.get(`${apiRoutes.shop.GETVERIFICATIONOTP}${payload?.email}`);

  return response.data;
});

export const createShop = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.shop.CREATESHOP, payload);

  return response.data;
});

//old
export const createProduct = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.product.CREATEPRODUCT, payload);

  return response.data;
});

export const getCategory = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.product.GETCATEGORY);
  return response.data;
});

export const getSubcategoryByCategory = catchAsyncError(async (payload) => {
  const response = await axiosInstance.get(`${apiRoutes.product.GETSUBCATEGORYBYCATEGORY}/${payload}`);
  return response.data;
});

export const getModelNo = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.product.GETMODELNO);
  return response.data;
});

export const getProductList = catchAsyncError(async (payload) => {
  console.log("payload :>> ", payload);
  const response = payload ? await axiosInstance.get(`${apiRoutes.product.GETPRODUCT}?${payload}`) : await axiosInstance.get(apiRoutes.product.GETPRODUCT);
  return response.data;
});

export const getProductById = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.product.PRODUCTBYID, payload);
  return response.data;
});

export const deleteProduct = catchAsyncError(async (payload) => {
  const response = await axiosInstance.delete(`${apiRoutes.product.DELETEPRODUCT}/${payload}`);
  return response.data;
});

export const updateProduct = catchAsyncError(async (payload) => {
  const response = await axiosInstance.patch(`${apiRoutes.product.UPDATEPRODUCT}/${payload.id}`, payload);
  return response.data;
});

//new

export const createProductIpfs = catchAsyncError(async (payload) => {
  return await pinJSON(payload);
});

export const getNotificationList = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.notification.NOTIFICATIONLIST);
  return response.data;
});

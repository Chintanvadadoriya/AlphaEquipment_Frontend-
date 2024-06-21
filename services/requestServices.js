import { apiRoutes, catchAsyncError, getAxiosInstance } from "@utils";

const getAxios = getAxiosInstance();
const axiosInstance = getAxios();

export const getRentList = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.rentRequest.RENTREQUESTLIST);
  return response.data;
});

export const getRentByProductId = catchAsyncError(async (payload) => {
  const response = await axiosInstance.get(`${apiRoutes.rentRequest.RENTREQUESTBYID}/${payload}`);
  return response.data;
});

export const rentRequestResponse = catchAsyncError(async (id, payload) => {
  const response = await axiosInstance.patch(`${apiRoutes.rentRequest.RENTREQUESTRESPONSE}/${id}`, payload);
  return response.data;
});

export const capturePayment = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.rentRequest.RENTREQUESTCAPTURE, payload);
  return response.data;
});

export const cancelPayment = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.rentRequest.RENTREQUESTCANCEL, payload);
  return response.data;
});

export const getBuyReqList = catchAsyncError(async (payload) => {
  const response = await axiosInstance.get(`${apiRoutes.buyRequest.BUYREQUESTLIST}`);
  return response.data;
});

export const getBuyReqListByProduct = catchAsyncError(async (payload) => {
  const response = await axiosInstance.get(`${apiRoutes.buyRequest.BUYREQUESTLISTBYPRODUCT}?${payload}`);
  return response.data;
});

export const getBuyReqAcceptDeny = catchAsyncError(async (payload) => {
  const response = await axiosInstance.patch(`${apiRoutes.buyRequest.BUYREQUESTACCEPTDENY}/${payload.id}`, payload);
  return response.data;
});

export const getAuctionProductList = catchAsyncError(async (payload) => {
  const response = await axiosInstance.get(`${apiRoutes.auctionRequest.AUCTIONREQUESTLIST}`);
  return response.data;
});

export const getAuctionBid = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(`${apiRoutes.auctionRequest.GETBID}`, payload);
  return response.data;
});

export const getAuctionSellerProductList = catchAsyncError(async (payload) => {
  const response = await axiosInstance.get(`${apiRoutes.auctionRequest.AUCTIONPRODUCTLIST}`);
  return response.data;
});

export const getAuctionSellerProductListById = catchAsyncError(async (payload) => {
  const response = await axiosInstance.get(`${apiRoutes.auctionRequest.AUCTIONREQUESTBYID}${payload}`);
  return response.data;
});

export const getAuctionReqAcceptDeny = catchAsyncError(async (payload) => {
  const response = await axiosInstance.patch(`${apiRoutes.auctionRequest.AUCTIONREQUESTACCEPTDENY}/${payload.id}`, payload);
  return response.data;
});

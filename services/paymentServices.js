import { apiRoutes, catchAsyncError, getAxiosInstance } from "@utils";

const getAxios = getAxiosInstance();
const axiosInstance = getAxios();

export const getPaymentHistory = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.paymentHistory.GETPAYMENTHISTORY);
  return response.data;
});

export const getOrderStatus = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.orderStatus.GETORDERSTATUS);
  return response.data;
});


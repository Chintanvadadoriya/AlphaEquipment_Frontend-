import { apiRoutes, catchAsyncError, getAxiosInstance } from "@utils";

const getAxios = getAxiosInstance();
const axiosInstance = getAxios();

export const registerUserService = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.user.REGISTER, payload);

  return response.data;
});

export const loginUserService = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.user.LOGIN, payload);
  return response.data;
});

export const sendOtp = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.user.OTPSEND, payload);
  return response.data;
});

export const verifyOtp = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.user.OTPVERIFY, payload);
  return response.data;
});

export const resetPassword = catchAsyncError(async (payload) => {
  const response = await axiosInstance.patch(
    apiRoutes.user.RESETPASSWORD,
    payload
  );
  return response.data;
});

export const forgetPassword = catchAsyncError(async (payload) => {
  const response = await axiosInstance.patch(
    apiRoutes.user.FORGETPASSWORD,
    payload
  );

  return response.data;
});

export const getProfile = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.user.GETPROFILE);
  return response.data;
});

export const updateProfile = catchAsyncError(async (payload) => {
  const response = await axiosInstance.patch(
    apiRoutes.user.UPDATEPROFILE,
    payload,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
});

export const sendSmsOtp = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.user.SENDOTPSMS, payload);
  return response.data;
});

export const verifyPhoneNumber = catchAsyncError(async (payload) => {
  const response = await axiosInstance.patch(
    apiRoutes.user.PHONENUMBERVERIFY,
    payload
  );

  return response.data;
});

export const deleteAccount = catchAsyncError(async (payload) => {
  const response = await axiosInstance.delete(apiRoutes.user.ACCOUNTDELETE, {
    data: payload,
  });

  return response.data;
});

export const userLogout = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.user.LOGOUT);
  return response.data;
});

export const adminLogin = catchAsyncError(async (payload) => {
  const response = await axiosInstance.post(apiRoutes.admin.adminLogin, payload);
  return response.data;
});
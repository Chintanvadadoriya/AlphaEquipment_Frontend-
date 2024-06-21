import { apiRoutes, catchAsyncError, getAxiosInstance } from "@utils";
import axios from "axios";

const getAxios = getAxiosInstance();
const axiosInstance = getAxios();

export const getAllRoles = catchAsyncError(async () => {
  const response = await axiosInstance.get(apiRoutes.role.GETALLROLES);
  return response.data;
});

import axios from "axios";
import { userLogout } from "@services";
import { router, toaster, useAuth } from "@utils";

const getAxiosInstance = (dispatch = null) => {
	return (action = null) => {
		const axiosInstance = axios.create({
			withCredentials: true,
			baseURL: process.env.API_URL,
		});

		axiosInstance.interceptors.request.use(
			function (config) {
				// Do something before request is sent
				config.headers.token = localStorage.getItem("token") || "";
				return config;
			}, function (error) {
				// Do something with request error
				console.error(error);
				return Promise.reject(error);
			});
		axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},
			async (error) => {
				if (error.response) {
					if (error.response.data?.aurthorize === "Unarthorize") {
						const logout = await userLogout();
						if (logout?.success) {
							localStorage.removeItem("persist:alpha");
							localStorage.removeItem("token");
							localStorage.clear();
							window.location.href = router.LOGIN;
						}
						// logout Api
						if (dispatch && action) {
							dispatch(action());
						}
					}
					if (error.response.status === 403) {
						console.log("You’re not authorized to do that.");
					}
					return error?.response
				}
			}
		);

		return axiosInstance;
	};
};

export { getAxiosInstance };

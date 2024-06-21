import { apiRoutes, catchAsyncError, getAxiosInstance } from '@utils';
import axios from 'axios';

const getAxios = getAxiosInstance();
const axiosInstance = getAxios();

export const getAllSubscription = catchAsyncError(async () => {
	const response = await axiosInstance.get(
		apiRoutes.subscription.GETALLPLANS
	);
	return response.data;
});

export const getCardList = catchAsyncError(async () => {
	const response = await axiosInstance.get(
		apiRoutes.subscription.GETCARDLIST
	);
	return response.data;
});

export const addCard = catchAsyncError(async (data) => {
	const response = await axiosInstance.post(
		apiRoutes.subscription.ADDCARD,{
			stripeToken:data
		}
	);
	return response.data;
});
export const createCustomer = catchAsyncError(async (data) => {
	const response = await axiosInstance.post(
		apiRoutes.subscription.CREATECUSTOMER,{
			stripeToken:data
		}
	);
	return response.data;
});
export const createSubscription = catchAsyncError(async (data) => {
	const response = await axiosInstance.post(
		apiRoutes.subscription.SUBSCRIPTION,{
			priceId:data
		}
	);
	return response.data;
});
export const defaultCard = catchAsyncError(async (data) => {
	const response = await axiosInstance.post(
		apiRoutes.subscription.DEFAULTCARD,{
			cardId:data
		}
	);
	return response.data;
});

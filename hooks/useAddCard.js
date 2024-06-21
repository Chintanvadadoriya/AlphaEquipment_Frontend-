import { useEffect, useRef, useState } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
	encodeData,
	getDecodedData,
	localStorageKeys,
	router,
	secureKeys,
	toaster,
} from '@utils';
import * as Yup from 'yup';
import {updatebuyerPlanStatus} from '@redux'
import store from '../store';
// import { byuerPlanSelector,updatebuyerPlanStatus } from '../redux/buyer'
export const useAddCard = () => {
	const dispatch = useDispatch()
	const formik = useFormik({
		initialValues: {
			name: '',
            cardNumber:'',
            expDate:'',
            cvv:'',
            zipCode:'',
            isCorrect: false,
		},
		validationSchema: Yup.object({
            name: Yup.string().required("name is required"),
            cardNumber: Yup.string()
              .required("cardNumber is required"),
              expDate: Yup.string().required("expDate is required"),
              cvv: Yup.string().required("cvv is required"),
      
              zipCode: Yup.string().required("zipCode is required"),
              isCorrect: Yup
              .bool()
              .oneOf([true], 'You need to verify your card details'),

		}),
		onSubmit: async (values, helpers) => {
			console.log('values :>> ', values)
		},
	});

	return {
		formik,
	};
};

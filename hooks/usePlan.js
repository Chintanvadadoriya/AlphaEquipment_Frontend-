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
import {updatePlanStatus} from '@redux'

export const usePlan = () => {
	const dispatch = useDispatch()
	const formik = useFormik({
		initialValues: {
			planid: '',
		},
		onSubmit: async (values, helpers) => {
			dispatch(updatePlanStatus(values.planid))
		},
	});

	return {
		formik,
	};
};

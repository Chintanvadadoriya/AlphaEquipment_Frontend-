import {
  forgetPassword,
  getAllRoles,
  loginUserService,
  registerUserService,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "services";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import {
  encodeData,
  getDecodedData,
  localStorageKeys,
  router,
  secureKeys,
  toaster,
} from "@utils";
import { useEffect, useRef, useState } from "react";
import { useStore, useDispatch, useSelector } from "react-redux";
import {
  userStore,
  verificationScreen,
  registerSlice,
  utilitySliceSelector,
} from "@redux";
import * as Yup from "yup";
import _ from "lodash";
import { useSendOtpApi } from "@hooks";

export const useRegisterUser = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [optionSelected, setOptionSelected] = useState([]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const userData = useRef([]);
  const [number, setNumber] = useState({ countryCode: "", num: "" });
  const data = useRef(null);
  const [token, setToken] = useState(null);
  const [toggle, setToggle] = useState("true");
  const { sendotp } = useSendOtpApi();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      userType: "buyer",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Please enter proper email"),
      phoneNumber: Yup.string().required("Phonenumber is required"),
      userType: Yup.string(),

      password: Yup.string().required("Please enter password"),
    }),
    onSubmit: async (values, helpers) => {

      values.countryCode = number.countryCode;
      values.phoneNumber = values.phoneNumber.replace(/[^\d]/g, '');

      userData.current = values;
      getSendOtp();
    },
  });

  const getSendOtp = async () => {
    sendOtp(
      { email: userData?.current?.email, isRegister: "register" },
      {
        Loading: setLoading,
        onSuccess: async (response) => {
          if (!response.success) {
            toaster("error", response.errors[0]);
          } else {
            setToggle("false");
            setToken(response.data);
          }
        },
        onError: (err) => {
          console.log("12345 :>> ", err);
          toaster("error", err.message);
        },
      }
    );
  };

  const userCreate = async () => {
    userData.current.verifyToken = token;
    userData.current.otp = otp;

    registerUserService(userData.current, {
      Loading: setLoading,
      onSuccess: async (response) => {
        if (!response.success) {
          toaster("error", response.errors[0]);
        } else {
          Router.push(router.LOGIN);
        }
      },
      onError: (err) => {
        console.log("12345 :>> ", err);
        toaster("error", err.message);
      },
    });
  };

  return {
    formik,
    loading,
    setNumber,
    otp,
    setOtp,
    userCreate,
    toggle,
    getSendOtp,
  };
};

export const useLoginUser = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const { sendotp } = useSendOtpApi();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Please enter proper email"),
      password: Yup.string().required("Please enter password"),
    }),
    onSubmit: async (values, helpers) => {
      loginUserService(values, {
        Loading: setLoading,
        onSuccess: async (res) => {
          if (res.success) {
            localStorage.setItem("token", res?.token);
            const setUserObject = res.data
            
            dispatch(userStore(setUserObject))
            Router.push("/");
          } else {
            toaster("error", res?.errors[0]);
          }
          // helpers.resetForm();
        },
        onError: (err) => {
          console.log("err :>> ", err.message);
          toaster("error", err.message);
        },
      });
    },
  });

  return {
    formik,
    loading,
  };
};

export const useForgetPassword = () => {
  const Router = useRouter();
  const [loading, setLoading] = useState();
  const [toggle, setToggle] = useState("forget");

  const [otp, setOtp] = useState("");
  const forgetData = useRef([]);
  const [token, setToken] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Please enter proper email"),
    }),
    onSubmit: async (values, helpers) => {
      forgetData.current = values;
      getSendOtp();
    },
  });

  const getSendOtp = async () => {
    sendOtp(
      { email: forgetData?.current.email, isRegister: "forget" },
      {
        Loading: setLoading,
        onSuccess: async (response) => {
          if (!response.success) {
            toaster("error", response.errors[0]);
          } else {
            setToggle("verification");
            setToken(response.data);
          }
        },
        onError: (err) => {
          console.log("12345 :>> ", err);
          toaster("error", err.message);
        },
      }
    );
  };

  const otpVerify = async () => {
    verifyOtp(
      { verifyToken: token, otp: otp },
      {
        Loading: setLoading,
        onSuccess: (response) => {
          if (response.success) {
            setToken(response.data);
            setToggle("createpassword");
          } else {
            toaster("error", response.errors[0]);
          }
        },
        onError: (err) => {
          console.log("err :>> ", err);
        },
      }
    );
  };

  const passwordForgetFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please enter password"),
      confirmPassword: Yup.string()
        .required("Please enter confirm password")
        .oneOf([Yup.ref("password"), null], "Password dose not match"),
    }),
    onSubmit: async (values, helpers) => {
      forgetPassword(
        {
          email: forgetData?.current.email,
          password: values.password,
          resetToken: token,
          otp: otp,
        },
        {
          Loading: setLoading,
          onSuccess: (response) => {
            if (response.success) {
              helpers.resetForm();
              Router.push(router.LOGIN);
            } else {
              toaster("error", response.errors[0]);
            }
          },
          onError: (err) => {
            console.log("err :>> ", err);
          },
        }
      );
    },
  });

  return {
    formik,
    loading,
    toggle,
    otp,
    setOtp,
    otpVerify,
    getSendOtp,
    passwordForgetFormik,
  };
};

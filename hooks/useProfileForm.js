import { userStore } from "@redux";
import { deleteAccount, getProfile, resetPassword, sendOtp, sendSmsOtp, updateProfile, userLogout, verifyPhoneNumber } from "@services";
import { encodeData, getDecodedData, localStorageKeys, secureKeys, toaster, awsFolder, s3ImageUpload, s3DeleteImage, router } from "@utils";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useRouter } from "next/router";

// import { values } from "lodash";

export const useProfileChangePwd = () => {
  const [loading, setLoading] = useState();
  const [toggle, setToggle] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Please enter currentPassword"),
      newPassword: Yup.string().required("Please enter newPassword"),
      confirmPassword: Yup.string()
        .required("Please enter confirm password")
        .oneOf([Yup.ref("newPassword"), null], "Password dose not match"),
    }),
    onSubmit: async (values, helpers) => {
      resetPassword(
        { password: values.currentPassword, newPassword: values.newPassword },
        {
          Loading: setLoading,
          onSuccess: (response) => {
            if (response.success) {
              setToggle(true);
            } else {
              toaster("error", response.errors[0]);
            }
          },
          onError: (err) => {
            toaster("error", err.message);
          },
        }
      );
    },
  });

  return {
    formik,
    toggle,
  };
};

export const useProfileUpdate = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((store) => store.user.userData);
  const [loader, setLoader] = useState(false);
  const [number, setNumber] = useState({ countryCode: "", num: "" });
  const [loading, setLoading] = useState();
  const [profilePic, setProfilePic] = useState({});

  const [smsNumber, setSmsNumber] = useState(profileData?.phoneNumber);
  const [reSend, setReSend] = useState(false);
  const [otp, setOtp] = useState("");
  const [enable, setEnable] = useState(true);
  const [updatePhoneNumber, setUpdatePhoneNumber] = useState(false);
  const [openVerifyModel, setOpenVerifyModel] = useState(false);
  const [dltAcOpenVerifyModel, setDltAcOpenVerifyModel] = useState(false);
  const [openSucModel, setOpenSucModel] = useState(false);
  const [openAccountDltModel, setOpenAccountDltModel] = useState(false);
  const [reSendAcDlt, setReSendAcDlt] = useState(false);
  const Router = useRouter();
  // const [dltAccountData, setDltAccountData] = useState()
  const [numberVerifyButtonDisabled, setNumberVerifyButtonDisabled] = useState(true);

  const countryCode = number.countryCode ? number.countryCode : profileData?.countryCode;
  const phoneNum = number?.num[1] ? number?.num[1].replace(/[^\d]/g, "") : smsNumber;
  const phoneNumer = countryCode + phoneNum;

  const formik = useFormik({
    initialValues: {
      profileName: profileData?.userName,
      profileNumber: profileData?.phoneNumber,
    },
    validationSchema: Yup.object({
      profileName: Yup.string().required("Please enter name"),
      profileNumber: Yup.string().required("Please enter phonenumber"),
    }),
    onSubmit: async (values, helpers) => {
      setEnable(true);
      setLoader(true);
      let res = {};
      if (!_.isEmpty(profilePic)) {
        if (profileData?.profilePic) {
          const slicedile = profileData?.profilePic?.split("/");

          const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

          const delres = await s3DeleteImage(dltKey);

          if (delres.success) {
            res = await s3ImageUpload(profilePic, awsFolder.USER);
          }
        } else {
          res = await s3ImageUpload(profilePic, awsFolder.USER);
        }
        setProfilePic({});
      }

      values.profileNumber = values.profileNumber.replace(/[^\d]/g, "");
      setSmsNumber(values.profileNumber);

      let formData = new FormData();
      formData.append("userName", values.profileName);
      formData.append("phoneNumber", values.profileNumber);
      formData.append("countryCode", number.countryCode ? number.countryCode : profileData.countryCode);

      res?.data?.Location && formData.append("profilePic", res?.data?.Location);

      updateProfile(formData, {
        Loading: setLoading,
        onSuccess: (response) => {
          setLoader(false);
          if (response.success) {
            if (response.verifyPhonenumber) {
              toaster("error", "please verify your phone number");
              setNumberVerifyButtonDisabled(false);
            }
            setEnable(true);

            userUpdateDetail(response.verifyPhonenumber);
          } else {
            toaster("error", response?.errors[0]);
            setEnable(false);
          }
        },
        onError: (err) => {
          toaster("error", err.message);
        },
      });
    },
  });

  const userUpdateDetail = async (verifyPhoneNumber) => {
    let detail = await getProfile();

    const setUserObject = detail.data;

    dispatch(userStore(setUserObject));
    if (!detail.data.isPhoneNumberVerified && !verifyPhoneNumber) {
      toaster("error", "please verify your phone number");
    }
  };

  const userSendSmsOtp = async () => {
    sendSmsOtp(
      { phoneNumber: phoneNumer },
      {
        Loading: setLoading,
        onSuccess: (response) => {
          setReSend(false);
          if (response.success) {
            localStorage.setItem("numverifytoken", response.data);
          } else {
            toaster("error", response?.errors[0]);
          }
        },
        onError: (err) => {
          toaster("error", err.message);
        },
      }
    );
  };
  if (otp) {
    encodeData(otp, secureKeys.profileOtp, localStorageKeys.profileOtp);
  }
  const userUpdatePhoneNumber = async () => {
    const numVerifyToken = localStorage.getItem("numverifytoken");
    const getOtp = getDecodedData(localStorageKeys.profileOtp, secureKeys.profileOtp);
    const payload = {
      otp: getOtp,
      verifyToken: numVerifyToken,
      phoneNumber: phoneNum,
      countryCode: countryCode,
    };

    verifyPhoneNumber(payload, {
      Loading: setLoading,
      onSuccess: (response) => {
        setUpdatePhoneNumber(false);
        if (response.success) {
          localStorage.removeItem("numverifytoken");
          localStorage.removeItem("otp");
          setOpenVerifyModel(false);
          setOpenSucModel(true);
          setNumberVerifyButtonDisabled(true);
        } else {
          toaster("error", response?.errors[0]);
        }
      },
      onError: (err) => {
        toaster("error", err.message);
      },
    });
  };

  const accountDltFormik = useFormik({
    initialValues: {
      Password: "",
    },
    validationSchema: Yup.object({
      Password: Yup.string().required("Please enter password"),
    }),
    onSubmit: async (values, helpers) => {
      encodeData(values.Password, secureKeys.profileDltAccount, localStorageKeys.profileDltAccount);
      sendAccountDltOtp();
    },
  });

  const sendAccountDltOtp = async () => {
    sendOtp(
      { email: profileData?.email },
      {
        Loading: setLoading,
        onSuccess: async (response) => {
          if (!response.success) {
            toaster("error", response.errors[0]);
          } else {
            localStorage.setItem("dltAccountToken", response.data);

            setOpenAccountDltModel(false);
            setDltAcOpenVerifyModel(true);
            setReSendAcDlt(false);
          }
        },
        onError: (err) => {
          toaster("error", err.message);
        },
      }
    );
  };

  const userDeleteAccount = async () => {
    const getOtp = getDecodedData(localStorageKeys.profileOtp, secureKeys.profileOtp);
    const getToken = localStorage.getItem("dltAccountToken");
    const getPassword = getDecodedData(localStorageKeys.profileDltAccount, secureKeys.profileDltAccount);

    deleteAccount(
      { otp: getOtp, verifyToken: getToken, password: getPassword },
      {
        Loading: setLoading,
        onSuccess: async (response) => {
          if (!response.success) {
            toaster("error", response.errors[0]);
            if (response.errors[0] === "your password is incorrect") {
              setDltAcOpenVerifyModel(false);
              setOpenAccountDltModel(true);
            }
          } else {
            setDltAcOpenVerifyModel(false);
            localStorage.removeItem("dltAccountPassword");
            localStorage.removeItem("otp");
            localStorage.removeItem("dltAccountToken");
            const userlogout = await userLogout();
            if (userlogout?.success) {
              localStorage.removeItem("token");
              localStorage.clear();
              Router.push(router.LOGIN);
            }
          }
        },
        onError: (err) => {
          toaster("error", err.message);
        },
      }
    );
  };

  return {
    formik,
    setNumber,
    setProfilePic,
    userSendSmsOtp,
    userUpdatePhoneNumber,
    reSend,
    setReSend,
    otp,
    setOtp,
    updatePhoneNumber,
    setUpdatePhoneNumber,
    openVerifyModel,
    setOpenVerifyModel,
    openSucModel,
    setOpenSucModel,
    openAccountDltModel,
    setOpenAccountDltModel,
    accountDltFormik,
    dltAcOpenVerifyModel,
    setDltAcOpenVerifyModel,
    sendAccountDltOtp,
    reSendAcDlt,
    setReSendAcDlt,
    userDeleteAccount,
    setNumberVerifyButtonDisabled,
    numberVerifyButtonDisabled,
    enable,
    setEnable,
    loader,
    setLoader,
  };
};

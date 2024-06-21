// import jwt, {TokenExpiredError, JsonWebTokenError, NotBeforeError} from "jsonwebtoken";
import { getProfile } from "@services";
const jwt = require("jsonwebtoken");
import { router, toaster, userType } from "@utils";
import { useRouter } from "next/router";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { updateMobileStatus, mobileCheckSelector, userStore, userSliceSelector } from "@redux";
import moment from "moment";
import BigNumber from "bignumber.js";

export const decode = async (token) => {
  console.log("token111111111 :>> ", token);
  // console.log("store11111111111", useSelector(store => store.user.userData.token));
  // const token = useSelector(store => store.user.userData.token)
  // console.log('useSelector(user)', useSelector(user))
  if (token) {
    console.log("token", jwt);

    // let res = await jwt.verify(token, 'jhnbskdfjbsdlfkjsbkflbjk', (err, decoded) => {

    //     try {
    //         console.log("decoded", decoded)
    //     } catch (err) {
    //         console.log("first", err)
    //     }
    // });
    try {
      // let res = await jwt.decode(token);
      var res = await jwt.verify(token, process.env.JWT_SECRET);
      console.log("555555", res);
      // return res;
      // console.log("555555", jwt.decode(token, {complete: true}))
    } catch (error) {
      // console.log("999999", error instanceof Error, error instanceof TokenExpiredError, error instanceof JsonWebTokenError, error instanceof NotBeforeError)
      console.log("999999", error);
    }
    // return jwt.verify(token, "jhnbskdfjbsdlfkjsbkflbjk");
  }
  // return null;
  return res;
};

export const checkLogin = async () => {
  const userDetails = {
    isLogin: false,
    redirectUrl: router.LOGIN,
  };
  let profile = await getProfile();

  if (!profile.success) {
    userDetails.redirectUrl = router.LOGIN;
  } else {
    userDetails.isLogin = profile?.success;
    if (profile?.data?.userType === userType.SELLER) {
      userDetails.redirectUrl = router.SELLER;
    } else if (profile?.data?.userType === userType.BUYER) {
      userDetails.redirectUrl = router.SPLASH;
    } else if (profile?.data?.userType === userType.ADMIN) {
      userDetails.redirectUrl = router.ADMIN;
    }
  }
  return userDetails;
};

export const encodeData = (data, key, name, storeToLocal = true) => {
  if (storeToLocal) {
    localStorage.setItem(name, jwt.sign(data, key));
  } else {
    return jwt.sign(data, key);
  }
};

export const decodeData = (token, key) => {
  if (token) {
    return jwt.verify(token, key);
  }
  return null;
};

export const getDecodedData = (localKey, secureKey) => {
  if (typeof window !== "undefined") {
    const encodedData = localStorage.getItem(localKey);

    if (encodedData) {
      const data = decodeData(encodedData, secureKey);

      return data;
    }
  }
  return null;
};

export const setImageUpload = (e, second) => {
  let file;
  let fileObj;
  let fileName;

  if (e.target.files[0]) {
    file && URL.revokeObjectURL(file);
    file = URL?.createObjectURL(e.target.files[0]);

    fileObj = e.target.files[0];
    fileName = e.target.files[0].name;
    fileObj.extension = fileName.substring(fileName.lastIndexOf(".") + 1);

    let type = fileObj["type"].split("/");
    // fileObj.type=type
    fileObj.isImage = type[0] == "image" ? true : false;
  }

  return {
    file,
    fileObj,
    fileName,
  };
};

export const getDateTime = (date, dateFormat) => {
  return {
    date: moment(new Date(date).toISOString().split("T")[0]).format(dateFormat),
  };
};

export const getUserDetail = async () => {
  let userData = await getProfile();
  if (userData?.success) {
    userData = userData?.data;
  }
  return userData;
};

export const toWei = (amount, decimals = 18) => {
  try {
    if (!amount) {
      return new BigNumber(0).toString();
    }
    return new BigNumber(amount).multipliedBy(new BigNumber(10).exponentiatedBy(decimals)).toFixed(0).toString();
  } catch (error) {
    console.log("exeption in toWei , ", error);
    return null;
  }
};

export const fromWei = (amount, decimals = 18) => {
  console.log("amount", amount);
  try {
    if (!amount) {
      return new BigNumber(0).toString();
    }

    return new BigNumber(amount).div(new BigNumber(10).exponentiatedBy(decimals)).toString();
  } catch (error) {
    console.log("exeption in fromWei ", error);
    return null;
  }
};

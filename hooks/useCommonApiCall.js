import { registerUserService, sendOtp, verifyOtp } from "@services";
import {
  encodeData,
  getDecodedData,
  localStorageKeys,
  router,
  secureKeys,
  toaster,
} from "@utils";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTransaction, shopState } from "@redux";
import { useWeb3React } from "@web3-react/core";

export const useSendOtpApi = () => {
  const Router = useRouter();
  const [loading, setLoading] = useState();
  const [otpToken, setOtpToken] = useState();
  const profileData = useSelector((store) => store.user.userData);

  const sendotp = async () => {
    sendOtp(
      {
        email: profileData?.email,
      },
      {
        Loading: setLoading,
        onSuccess: async (response) => {
          if (!response.success) {
            toaster("error", response.errors[0]);
          } else {
            return response.success;
          }
        },
        onError: (err) => {
          toaster("error", err.message);
        },
      }
    );
  };

  return {
    sendotp,
  };
};

export const useVerifyOtpApi = () => {
  const Router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState();

  const otpVerify = async (value) => {
    const token = localStorage.getItem("userToken");

    let payload = {
      verifyToken: token,
      otp: otp,
    };

    verifyOtp(payload, {
      Loading: setLoading,
      onSuccess: (response) => {
        if (response.success) {
          localStorage.setItem("userToken", response.data);
          value &&
            encodeData(
              value,
              secureKeys.registerToggle,
              localStorageKeys.registerToggle
            );
          otp &&
            encodeData(
              otp,
              secureKeys.forgetPasswordOtp,
              localStorageKeys.forgetPasswordOtp
            );
        } else {
          toaster("error", response?.errors[0]);
        }
      },
      onError: (err) => {
        console.log("err :>> ", err);
      },
    });
  };

  return {
    otpVerify,
    otp,
    setOtp,
  };
};

export const useImageUpload = () => {
  const [file, setFile] = useState(null);
  const [fileObj, setFileObj] = useState();
  // const fileObj = useRef();
  let file1;

  const imageUpload = (e) => {
    if (e.target.files[0]) {
      file && URL.revokeObjectURL(file);
      setFile(URL?.createObjectURL(e.target.files[0]));
      setFileObj(e.target.files[0]);
      file1 = e.target.files[0];
      // fileObj.current = e.target.files[0]
    }
  };
  return {
    file,
    setFile,
    imageUpload,
    fileObj,
    file1,
  };
};

export const useLocationMap = () => {
  const [getLocation, setGetLocation] = useState(
    getDecodedData(localStorageKeys.location, secureKeys.location) || {}
  );

  const calculateDistance = (lat, long) => {
    let getKMDifference = null;

    if (!_.isEmpty(getLocation)) {
      getKMDifference = calcCrow(
        lat,
        long,
        getLocation?.latitude,
        getLocation?.longitude
      );
    }

    return getKMDifference;
  };

  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    const toRad = (value) => (value * Math.PI) / 180;
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  return {
    calculateDistance,
  };
};

export const cleanTransaction = () => {
  const dispatch = useDispatch();

  const handleClose = (setModel, setProductList, reduxAction) => {
    dispatch(
      setTransaction({
        transaction: {
          type: null,
          hash: null,
          status: null,
          result: null,
        },
      })
    );
    if (reduxAction) {
      dispatch(reduxAction)
    }
    if (setModel) {
      setModel(false);
    }
    if (setProductList) {
      setProductList("productlist");
    }
  };

  return { handleClose }

};



export const useCheckAccount = ()=>{
  const [checkBalance, setCheckBalance] = useState(false);
console.log("111111111111111111111111")
  const checkWeb3Account =()=>{

    console.log("111111111111111111111")
    console.log('checkBalance :>> ', checkBalance);
    const { account, active, chainId, library } = useWeb3React();
    console.log('account :>> ', account);
    console.log('active :>> ', active);
    return {
      account
    }
  }
  return{
    checkWeb3Account
  }
}
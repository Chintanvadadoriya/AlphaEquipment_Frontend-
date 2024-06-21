import { useFormik } from "formik";
import { awsFolder, encodeData, getDecodedData, localStorageKeys, s3DeleteImage, s3ImageUpload, secureKeys, toaster } from "@utils";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import _, { values } from "lodash";
import { shopverificationotp, createShop, createProduct, getProductById, updateProduct } from "services";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addProduct, createProductAction, editProduct, editProductAction } from "@redux";
import { useRouter } from "next/router";
import moment from "moment";
import { useWeb3React } from "@web3-react/core";

export const useGetShop = () => {
  const [openVerifyModel, setOpenVerifyModel] = useState(false);
  const [reSend, setReSend] = useState(false);
  const [callFunction, setCallFunction] = useState(false);
  const [loading, setLoading] = useState();
  const [shop, setShop] = useState(null);
  const [token, setToken] = useState();
  const [number, setNumber] = useState({ countryCode: "", num: "" });
  const [profilePic, setProfilePic] = useState();
  const [openSucModel, setOpenSucModel] = useState(false);
  const [otp, setOtp] = useState("");
  const [showProductList, setShowProductList] = useState(null);
  const [loader, setLoader] = useState(false);
  // createstore
  const formik = useFormik({
    initialValues: {
      storeName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      storeName: Yup.string().required("Storename is required"),
      email: Yup.string().required("Email is required").email("Please enter proper email"),
      phoneNumber: Yup.string().required("Phonenumber is required"),
    }),
    onSubmit: async (values, helpers) => {
      setLoader(true);
      values.phoneNumber = values.phoneNumber.replace(/[^\d]/g, "");

      setShop(values);
      shopSendOtp(values.email);
    },
  });

  const shopSendOtp = async (email) => {
    const getEmail = shop?.email;

    shopverificationotp(
      { email: email ? email : getEmail },
      {
        Loading: setLoading,
        onSuccess: (response) => {
          setLoader(false);
          setReSend(false);
          if (response.success) {
            setOpenVerifyModel(true);
            setToken(response.data);
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
    encodeData(otp, secureKeys.shopOtp, localStorageKeys.shopOtp);
  }

  const shopCreate = async () => {
    setLoader(true);
    const getOtp = getDecodedData(localStorageKeys.shopOtp, secureKeys.shopOtp);
    const formData = new FormData();

    formData.append("name", shop.storeName);
    formData.append("email", shop.email);
    formData.append("phoneNumber", shop.phoneNumber);
    formData.append("otp", getOtp);
    formData.append("verifyToken", token);
    if (profilePic) {
      let res = await s3ImageUpload(profilePic, awsFolder?.PRODUCT);
      formData.append("imageUrl", res.data.Location);
    }

    createShop(formData, {
      Loading: setLoading,
      onSuccess: (response) => {
        setCallFunction(false);
        setLoader(false);
        if (response.success) {
          setOpenVerifyModel(false);
          setOpenSucModel(true);
          localStorage.removeItem("shopOtp");
        } else {
          toaster("error", response?.errors[0]);
        }
      },
      onError: (err) => {
        toaster("error", err.message);
      },
    });
  };

  return {
    formik,
    loading,
    setOpenVerifyModel,
    openVerifyModel,
    setProfilePic,
    openSucModel,
    setOpenSucModel,
    shopSendOtp,
    setReSend,
    reSend,
    otp,
    setOtp,
    setCallFunction,
    callFunction,
    shopCreate,
    setShowProductList,
    showProductList,
    loader,
    setLoader,
  };
};

export const useAddProduct = () => {
  const dispatch = useDispatch();
  const shopData = useSelector((store) => store.shop.shopDetail);

  const shopReducerDetail = useSelector((store) => store?.shop);
  const Router = useRouter();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState();
  const [selectProduct, setSelectProduct] = useState(shopData?.productType ? shopData.productType : "machine");

  const [equipmentType, setEquipmentType] = useState(shopData?.equipmentType ? shopData.equipmentType : "new");

  const [selectAuction, setSelectAuction] = useState(shopData?.sellType ? shopData.sellType : "fixedPrice");

  const [moneyType, setMoneyType] = useState(shopData?.isSellUsingCrypto ? shopData.isSellUsingCrypto : "false");

  const [screen, setScreen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [checkBalance, setCheckBalance] = useState(false);
  const { account, active, chainId, library } = useWeb3React();

  useEffect(() => {
    (async () => {
      let balance = await library?.getBalance(account);

      setCheckBalance(balance?.gt(0));
    })();
  }, [account]);

  const formik = useFormik({
    initialValues: {
      productType: "",
      equipmentType: "",
      sellType: "",
      moneyType: "",
      name: shopData?.name || "",
      price: shopData?.price || "",
      hourPrice: shopData?.hourPrice || "",
      Usage: shopData?.Usage || "",
      mileage: shopData?.mileage || "",
      auctionStartDate: shopData?.auctionStartDate || "",
      auctionEndDate: shopData?.auctionEndDate || "",
      auctionType: shopData?.auctionType || "",
    },
    validationSchema: Yup.object(
      (selectProduct === "machine" && selectAuction === "fixedPrice") || (selectProduct === "sparePart" && selectAuction === "fixedPrice")
        ? {
            productType: Yup.string(),
            equipmentType: Yup.string(),
            sellType: Yup.string(),
            moneyType: Yup.string(),
            name: Yup.string().required("name is required"),
            price: Yup.number().required("price is required"),
            Usage: Yup.number().required("Usage is required"),
            mileage: Yup.number().required("mileage is required"),
          }
        : (selectProduct === "machine" && selectAuction === "auction") || (selectProduct === "sparePart" && selectAuction === "auction")
        ? {
            productType: Yup.string(),
            equipmentType: Yup.string(),
            sellType: Yup.string(),
            moneyType: Yup.string(),
            name: Yup.string().required("name is required"),
            Usage: Yup.number().required("Usage is required"),
            mileage: Yup.number().required("mileage is required"),
            auctionStartDate: Yup.string().required("auctionStartDate is required"),
            auctionEndDate: Yup.string().required("auctionEndDate is required"),
            auctionType: Yup.string().required("auctionType is required"),
            price: Yup.number().required("price is required"),
          }
        : {
            productType: Yup.string(),
            equipmentType: Yup.string(),
            sellType: Yup.string(),
            moneyType: Yup.string(),
            name: Yup.string().required("name is required"),
            price: Yup.number().required("price per day is required"),
            hourPrice: Yup.number().required("price per hour is required"),
            Usage: Yup.number().required("Usage is required"),
            mileage: Yup.number().required("mileage is required"),
          }
    ),
    onSubmit: async (values, helpers) => {
      (values.productType = selectProduct), (values.equipmentType = equipmentType), (values.sellType = selectAuction), (values.isSellUsingCrypto = moneyType);
      setLoader(true);
      setIsDisabled(true);

      if (selectProduct === "machine") {
        if (shopData?.SparePart) {
          for await (const [key, data] of shopData?.SparePart?.entries()) {
            if (data) {
              const slicedile = shopData?.SparePart?.[key]?.split("/");

              const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

              const delres = await s3DeleteImage(dltKey);
            }
          }
          dispatch(addProduct({ ...shopData, SparePart: undefined, ...values }));
        } else if (shopData?.Equipment) {
          dispatch(addProduct({ ...shopData, ...values }));
        }
      } else {
        if (shopData?.Equipment) {
          for await (const [key, data] of shopData?.Equipment?.entries()) {
            if (data) {
              const slicedile = shopData?.Equipment?.[key]?.split("/");

              const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

              const delres = await s3DeleteImage(dltKey);
            }
          }
          dispatch(addProduct({ ...shopData, Equipment: undefined, ...values }));
        } else if (shopData?.SparePart) {
          dispatch(addProduct({ ...shopData, ...values }));
        }
      }

      if (!shopData?.SparePart && !shopData?.Equipment) {
        dispatch(addProduct({ ...shopData, ...values }));
      }
      setScreen(true);
    },
  });

  const fileEquip = selectProduct === "sparePart" ? "SparePart" : "Equipment";

  const formikDetail = useFormik({
    initialValues: {
      categoryId: shopData?.categoryId || "",
      catalogue: shopData?.catalogue || "",
      subcategoryId: shopData?.subcategoryId || "",
      feature: shopData?.feature || "",
      modelNoId: shopData?.modelNoId || "",
      [fileEquip]: shopData?.[fileEquip] || [],
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().required("category is required"),
      catalogue: Yup.string().required("catalogue is required"),
      subcategoryId: Yup.string().required("subcategory is required"),
      feature: Yup.string().required("feature is required"),
      modelNoId: Yup.string().required("modelNumber is required"),
      [fileEquip]: Yup.array().min(1, "choose at least 1 iamge"),
    }),
    onSubmit: async (values, helpers) => {
      setLoader(true);
      setIsDisabled(true);
      let res;

      let av = [];

      for await (const [key, data] of values?.[fileEquip].entries()) {
        if (data?.fileObj) {
          if (shopData?.[fileEquip]?.[key]) {
            const slicedile = shopData?.[fileEquip][key]?.split("/");

            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av[key] = res?.data?.Location;
          }
        } else {
          av[key] = data;
        }
      }

      if ((await av.length) != 0) {
        let year = moment().year();
        values.year = `${year}`;
        values.country = "us";
        values.latitude = "22.30";
        values.longitude = "70.80";
        if (selectProduct === "sparePart") {
          values.SparePart = av;
        } else {
          values.Equipment = av;
        }

        dispatch(addProduct({ ...shopData, ...values }));
        setScreen(true);
      }
    },
  });

  const formikGeneralApp = useFormik({
    initialValues: {
      serialnumber: shopData?.serialnumber || "",
      serialNumberUrl: shopData?.serialNumberUrl || "",
      odometer: shopData?.odometer || "",
      AdditionalEquipment: shopData?.AdditionalEquipment || [],
    },
    validationSchema: Yup.object(
      selectProduct === "machine"
        ? {
            serialnumber: Yup.string().required("serialnumber is required"),
            odometer: Yup.string().required("odometer is required"),
            AdditionalEquipment: Yup.array().min(1, "choose at least 1 iamge"),
          }
        : {
            AdditionalEquipment: Yup.array().min(1, "choose at least 1 iamge"),
          }
    ),
    onSubmit: async (values, helpers) => {
      setLoader(true);
      setIsDisabled(true);
      let res;

      let av = [];
      let serialUrl;

      if (values?.serialNumberUrl?.fileObj) {
        if (shopData?.serialNumberUrl) {
          const slicedile = shopData?.serialNumberUrl?.split("/");

          const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

          const delres = await s3DeleteImage(dltKey);

          if (delres.success) {
            res = await s3ImageUpload(values?.serialNumberUrl?.fileObj, awsFolder?.PRODUCT);
            serialUrl = res?.data?.Location;
          }
        } else {
          res = await s3ImageUpload(values?.serialNumberUrl?.fileObj, awsFolder?.PRODUCT);
          serialUrl = res?.data?.Location;
        }
      } else {
        serialUrl = values?.serialNumberUrl;
      }

      for await (const [key, data] of values?.AdditionalEquipment.entries()) {
        if (data?.fileObj) {
          if (shopData?.AdditionalEquipment?.[key]) {
            const slicedile = shopData?.AdditionalEquipment?.[key]?.split("/");
            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av[key] = res?.data?.Location;
          }
        } else {
          av[key] = data;
        }
      }

      if (av.length != 0) {
        values.AdditionalEquipment = av;
        values.serialNumberUrl = serialUrl;
        dispatch(addProduct({ ...shopData, ...values }));
        setScreen(true);
      }
    },
  });

  const formikControlStation = useFormik({
    initialValues: {
      ControlStation: shopData?.ControlStation || [],
      Engine: shopData?.Engine || [],
      Chassis: shopData?.Chassis || [],
      Undercarriage: shopData?.Undercarriage || [],
    },
    validationSchema: Yup.object({
      ControlStation: Yup.array().min(1, "choose at least 1 iamge"),
      Engine: Yup.array().min(1, "choose at least 1 iamge"),
      Chassis: Yup.array().min(1, "choose at least 1 iamge"),
      Undercarriage: Yup.array().min(1, "choose at least 1 iamge"),
    }),
    onSubmit: async (values, helpers) => {
      setLoader(true);
      setIsDisabled(true);
      let res;
      let av1 = [];
      let av2 = [];
      let av3 = [];
      let av4 = [];

      for await (const [key, data] of values?.ControlStation.entries()) {
        if (data?.fileObj) {
          if (shopData?.ControlStation?.[key]) {
            const slicedile = shopData?.ControlStation[key]?.split("/");

            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av1[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av1[key] = res?.data?.Location;
          }
        } else {
          av1[key] = data;
        }
      }

      for await (const [key, data] of values?.Engine.entries()) {
        if (data?.fileObj) {
          if (shopData?.Engine?.[key]) {
            const slicedile = shopData?.Engine[key]?.split("/");

            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av2[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av2[key] = res?.data?.Location;
          }
        } else {
          av2[key] = data;
        }
      }

      for await (const [key, data] of values?.Chassis.entries()) {
        if (data?.fileObj) {
          if (shopData?.Chassis?.[key]) {
            const slicedile = shopData?.Chassis[key]?.split("/");

            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av3[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av3[key] = res?.data?.Location;
          }
        } else {
          av3[key] = data;
        }
      }

      for await (const [key, data] of values?.Undercarriage.entries()) {
        if (data?.fileObj) {
          if (shopData?.Undercarriage?.[key]) {
            const slicedile = shopData?.Undercarriage[key]?.split("/");

            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av4[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av4[key] = res?.data?.Location;
          }
        } else {
          av4[key] = data;
        }
      }

      if (av1.length != 0 && av2.length != 0 && av3.length != 0 && av4.length != 0) {
        values.ControlStation = av1;
        values.Engine = av2;
        values.Chassis = av3;
        values.Undercarriage = av4;

        await dispatch(addProduct({ ...shopData, ...values }));
        let categoryName = shopData.categoryId.split(",");

        let subCategoryName = shopData.subcategoryId.split(",");

        let modelNoName = shopData.modelNoId.split(",");

        let payload;
        let imagesUrl;
        if (selectProduct === "machine") {
          imagesUrl = {
            Equipment: shopData?.Equipment,
            AdditionalEquipment: shopData?.AdditionalEquipment,
            ControlStation: av1,
            Engine: av2,
            Chassis: av3,
            Undercarriage: av4,
          };
        } else {
          imagesUrl = {
            SparePart: shopData?.SparePart,
            AdditionalEquipment: shopData?.AdditionalEquipment,
            ControlStation: av1,
            Engine: av2,
            Chassis: av3,
            Undercarriage: av4,
          };
        }

        if ((selectProduct === "machine" && selectAuction === "fixedPrice") || (selectProduct === "sparePart" && selectAuction === "fixedPrice")) {
          // let imageobj = JSON.stringify(imagesUrl);
          payload = {
            imagesUrl: imagesUrl,
            productType: shopData?.productType,
            equipmentType: shopData?.equipmentType,
            sellType: shopData?.sellType,
            isSellUsingCrypto: shopData?.isSellUsingCrypto === "true" ? true : false,
            name: shopData?.name,
            price: shopData?.price,
            Usage: shopData?.Usage,
            mileage: shopData?.mileage,
            latitude: shopData?.latitude,
            longitude: shopData?.longitude,
            country: shopData?.country,
            year: shopData?.year,
            categoryId: categoryName[0],
            catalogue: shopData?.catalogue,
            subcategoryId: subCategoryName[0],
            feature: shopData?.feature,
            modelNoId: modelNoName[0],
            ...(selectProduct === "machine" && {
              serialnumber: shopData?.serialnumber,
              serialNumberUrl: shopData?.serialNumberUrl,
              odometer: shopData?.odometer,
            }),
          };
        } else if ((selectProduct === "machine" && selectAuction === "auction") || (selectProduct === "sparePart" && selectAuction === "auction")) {
          // let imageobj = JSON.stringify(imagesUrl);
          payload = {
            imagesUrl: imagesUrl,
            productType: shopData?.productType,
            equipmentType: shopData?.equipmentType,
            sellType: shopData?.sellType,
            isSellUsingCrypto: shopData?.isSellUsingCrypto === "true" ? true : false,
            name: shopData?.name,
            price: shopData?.price,
            Usage: shopData?.Usage,
            auctionStartDate: shopData?.auctionStartDate,
            auctionEndDate: shopData?.auctionEndDate,
            auctionType: shopData?.auctionType,
            mileage: shopData?.mileage,
            latitude: shopData?.latitude,
            longitude: shopData?.longitude,
            country: shopData?.country,
            year: shopData?.year,
            categoryId: categoryName[0],
            catalogue: shopData?.catalogue,
            subcategoryId: subCategoryName[0],
            feature: shopData?.feature,
            modelNoId: modelNoName[0],
            ...(selectProduct === "machine" && {
              serialnumber: shopData?.serialnumber,
              serialNumberUrl: shopData?.serialNumberUrl,
              odometer: shopData?.odometer,
            }),
          };
        }
        // else if ((selectProduct === "machine" && selectAuction === "fixedPrice") || (selectProduct === "sparePart" && selectAuction === "fixedPrice")) {
        else {
          // let imageobj = JSON.stringify(imagesUrl);
          payload = {
            imagesUrl: imagesUrl,
            productType: shopData?.productType,
            equipmentType: shopData?.equipmentType,
            sellType: shopData?.sellType,
            isSellUsingCrypto: shopData?.isSellUsingCrypto === "true" ? true : false,
            name: shopData?.name,
            price: shopData?.price,
            hourPrice: shopData?.hourPrice,
            Usage: shopData?.Usage,
            mileage: shopData?.mileage,
            latitude: shopData?.latitude,
            longitude: shopData?.longitude,
            country: shopData?.country,
            year: shopData?.year,
            categoryId: categoryName[0],
            catalogue: shopData?.catalogue,
            subcategoryId: subCategoryName[0],
            feature: shopData?.feature,
            modelNoId: modelNoName[0],
            ...(selectProduct === "machine" && {
              serialnumber: shopData?.serialnumber,
              serialNumberUrl: shopData?.serialNumberUrl,
              odometer: shopData?.odometer,
            }),
          };
        }
        payload.categoryName = categoryName[1];
        payload.subcategoryName = subCategoryName[1];
        payload.modelNoName = modelNoName[1];

        const error = (toggle) => {
          setIsDisabled(toggle);
          setLoader(false);
        };

        let payloadData = {
          payload: payload,
          err: error,
          account: account,
          chainId: chainId,
          active: active,
          balance: checkBalance,
        };

        dispatch(createProductAction(payloadData));

        // if (shopReducerDetail?.error != null || shopReducerDetail?.error != undefined) {
        //   setIsDisabled(false);
        // }

        // console.log("imagesUrl", imagesUrl);
        // console.log("payload", payload);

        // return;
        // await createProduct(payload, {
        //   Loading: setLoading,
        //   onSuccess: async (res) => {
        //     if (res.success) {
        //       dispatch(addProduct(null));
        //       setScreen(true);
        //     } else {
        //       toaster("error", res?.errors[0]);
        //       setIsDisabled(false);
        //     }
        //   },
        //   onError: (err) => {
        //     toaster("error", err.message);
        //   },
        // });
      }
    },
  });

  return {
    formik,
    selectProduct,
    setSelectProduct,
    equipmentType,
    setEquipmentType,
    selectAuction,
    setSelectAuction,
    setScreen,
    screen,
    shopData,
    formikDetail,
    formikGeneralApp,
    formikControlStation,
    isDisabled,
    moneyType,
    setMoneyType,
    loader,
    setLoader,
  };
};

export const useEditProduct = () => {
  const dispatch = useDispatch();

  const shopData = useSelector((store) => store.shop.productEditDetail);

  const [loading, setLoading] = useState();
  const [selectProduct, setSelectProduct] = useState(shopData?.productType ? shopData.productType : "machine");

  const [equipmentType, setEquipmentType] = useState(shopData?.equipmentType ? shopData.equipmentType : "new");

  const [selectAuction, setSelectAuction] = useState(shopData?.sellType ? shopData.sellType : "fixedPrice");

  const [moneyType, setMoneyType] = useState(shopData?.isSellUsingCrypto ? "true" : "false");

  const [screen, setScreen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [checkBalance, setCheckBalance] = useState(false);
  const { account, active, chainId, library } = useWeb3React();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      let balance = await library?.getBalance(account);

      setCheckBalance(balance?.gt(0));
    })();
  }, [account]);

  let startDate;
  let endDate;
  if (shopData?.auctionStartDate?.length === 16 || shopData?.auctionEndDate?.length === 16) {
    startDate = shopData?.auctionStartDate;

    endDate = shopData?.auctionEndDate;
  } else {
    startDate = shopData?.auctionStartDate?.slice(0, shopData?.auctionStartDate?.length - 8);

    endDate = shopData?.auctionEndDate?.slice(0, shopData?.auctionEndDate?.length - 8);
  }
  const formik = useFormik({
    initialValues: {
      productType: "",
      equipmentType: "",
      sellType: "",
      name: shopData?.name || "",
      price: shopData?.price || "",
      hourPrice: shopData?.hourPrice || "",
      Usage: shopData?.Usage || "",
      mileage: shopData?.mileage || "",
      auctionStartDate: startDate || "",
      auctionEndDate: endDate || "",
      auctionType: shopData?.auctionType || "",
    },
    validationSchema: Yup.object(
      (selectProduct === "machine" && selectAuction === "fixedPrice") || (selectProduct === "sparePart" && selectAuction === "fixedPrice")
        ? {
            productType: Yup.string(),
            equipmentType: Yup.string(),
            sellType: Yup.string(),
            name: Yup.string().required("name is required"),
            price: Yup.number().required("price is required"),
            Usage: Yup.number().required("Usage is required"),
            mileage: Yup.number().required("mileage is required"),
          }
        : (selectProduct === "machine" && selectAuction === "auction") || (selectProduct === "sparePart" && selectAuction === "auction")
        ? {
            productType: Yup.string(),
            equipmentType: Yup.string(),
            sellType: Yup.string(),
            name: Yup.string().required("name is required"),
            Usage: Yup.number().required("Usage is required"),
            mileage: Yup.number().required("mileage is required"),
            auctionStartDate: Yup.string().required("auctionStartDate is required"),
            auctionEndDate: Yup.string().required("auctionEndDate is required"),
            auctionType: Yup.string().required("auctionType is required"),
            price: Yup.number().required("price is required"),
          }
        : {
            productType: Yup.string(),
            equipmentType: Yup.string(),
            sellType: Yup.string(),
            name: Yup.string().required("name is required"),
            price: Yup.number().required("price per day is required"),
            hourPrice: Yup.number().required("price per hour is required"),
            Usage: Yup.number().required("Usage is required"),
            mileage: Yup.number().required("mileage is required"),
          }
    ),
    onSubmit: async (values, helpers) => {
      (values.productType = selectProduct), (values.equipmentType = equipmentType), (values.sellType = selectAuction), (values.isSellUsingCrypto = moneyType === "true" ? true : false);
      setLoader(true);
      setIsDisabled(true);

      if (selectProduct === "machine") {
        if (shopData?.imagesUrl?.SparePart) {
          for await (const [key, data] of shopData?.imagesUrl?.SparePart?.entries()) {
            if (data) {
              const slicedile = shopData?.imagesUrl?.SparePart?.[key]?.split("/");

              const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

              const delres = await s3DeleteImage(dltKey);
            }
          }
          dispatch(editProduct({ ...shopData, imagesUrl: { ...shopData?.imagesUrl, SparePart: undefined }, ...values }));
        } else if (shopData?.imagesUrl?.Equipment) {
          dispatch(editProduct({ ...shopData, ...values }));
        }
      } else {
        if (shopData?.imagesUrl?.Equipment) {
          for await (const [key, data] of shopData?.imagesUrl?.Equipment?.entries()) {
            if (data) {
              const slicedile = shopData?.imagesUrl?.Equipment?.[key]?.split("/");

              const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

              const delres = await s3DeleteImage(dltKey);
            }
          }
          dispatch(editProduct({ ...shopData, imagesUrl: { ...shopData?.imagesUrl, Equipment: undefined }, ...values }));
        } else if (shopData?.imagesUrl?.SparePart) {
          dispatch(editProduct({ ...shopData, ...values }));
        }
      }

      if (!shopData?.imagesUrl?.SparePart && !shopData?.imagesUrl?.Equipment) {
        dispatch(editProduct({ ...shopData, ...values }));
      }
      setScreen(true);
    },
  });

  const fileEquip = shopData?.productType === "sparePart" ? "SparePart" : "Equipment";

  let category;
  let subCategory;
  let modelNo;
  if (/[,]/.test(shopData?.categoryId)) {
    category = shopData?.categoryId;
  } else {
    category = `${shopData?.categoryId},${shopData?.category?.name}`;
  }

  if (/[,]/.test(shopData?.subcategoryId)) {
    subCategory = shopData?.subcategoryId;
  } else {
    subCategory = `${shopData?.subcategoryId},${shopData?.subcategory?.name}`;
  }

  if (/[,]/.test(shopData?.modelNoId)) {
    modelNo = shopData?.modelNoId;
  } else {
    modelNo = `${shopData?.modelNoId},${shopData?.modelnumber}`;
  }
  // const category = `${shopData?.categoryId},${shopData?.category?.name}`

  const formikDetail = useFormik({
    initialValues: {
      categoryId: category || "",
      catalogue: shopData?.catalogue || "",
      subcategoryId: subCategory || "",
      feature: shopData?.feature || "",
      modelNoId: modelNo || "",
      [fileEquip]: shopData?.imagesUrl?.[fileEquip] || [],
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().required("category is required"),
      catalogue: Yup.string().required("catalogue is required"),
      subcategoryId: Yup.string().required("subcategory is required"),
      feature: Yup.string().required("feature is required"),
      modelNoId: Yup.string().required("modelNumber is required"),
      [fileEquip]: Yup.array().min(1, "choose at least 1 iamge"),
    }),
    onSubmit: async (values, helpers) => {
      setLoader(true);
      setIsDisabled(true);
      let res;

      let av = [];

      for await (const [key, data] of values?.[fileEquip].entries()) {
        if (data?.fileObj) {
          if (shopData?.imagesUrl?.[fileEquip]?.[key]) {
            const slicedile = shopData?.imagesUrl?.[fileEquip]?.[key]?.split("/");

            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av[key] = res?.data?.Location;
          }
        } else {
          av[key] = data;
        }
      }

      if ((await av.length) != 0) {
        let year = moment().year();
        values.year = `${year}`;
        values.country = "us";
        values.latitude = "22.30";
        values.longitude = "70.80";

        if (selectProduct === "sparePart") {
          values.SparePart = av;
        } else {
          values.Equipment = av;
        }

        dispatch(editProduct({ ...shopData, ...values, imagesUrl: { ...shopData.imagesUrl, [fileEquip]: av } }));
        setScreen(true);
      }
    },
  });

  const formikGeneralApp = useFormik({
    initialValues: {
      serialnumber: shopData?.serialnumber || "",
      serialNumberUrl: shopData?.serialNumberUrl || "",
      odometer: shopData?.odometer || "",
      AdditionalEquipment: shopData?.imagesUrl?.AdditionalEquipment || [],
    },
    validationSchema: Yup.object(
      selectProduct === "machine"
        ? {
            serialnumber: Yup.string().required("serialnumber is required"),
            odometer: Yup.string().required("odometer is required"),
            AdditionalEquipment: Yup.array().min(1, "choose at least 1 iamge"),
          }
        : {
            AdditionalEquipment: Yup.array().min(1, "choose at least 1 iamge"),
          }
    ),
    onSubmit: async (values, helpers) => {
      setLoader(true);
      setIsDisabled(true);
      let res;

      let av = [];
      let serialUrl;

      if (values?.serialNumberUrl?.fileObj) {
        if (shopData?.serialNumberUrl) {
          const slicedile = shopData?.serialNumberUrl?.split("/");

          const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

          const delres = await s3DeleteImage(dltKey);

          if (delres.success) {
            res = await s3ImageUpload(values?.serialNumberUrl?.fileObj, awsFolder?.PRODUCT);
            serialUrl = res?.data?.Location;
          }
        } else {
          res = await s3ImageUpload(values?.serialNumberUrl?.fileObj, awsFolder?.PRODUCT);
          serialUrl = res?.data?.Location;
        }
      } else {
        serialUrl = values?.serialNumberUrl;
      }

      for await (const [key, data] of values?.AdditionalEquipment.entries()) {
        if (data?.fileObj) {
          if (shopData?.imagesUrl?.AdditionalEquipment?.[key]) {
            const slicedile = shopData?.imagesUrl?.AdditionalEquipment?.[key]?.split("/");
            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av[key] = res?.data?.Location;
          }
        } else {
          av[key] = data;
        }
      }

      if ((await av.length) != 0) {
        values.AdditionalEquipment = av;
        values.serialNumberUrl = serialUrl;
        dispatch(editProduct({ ...shopData, ...values, imagesUrl: { ...shopData.imagesUrl, AdditionalEquipment: av } }));
        setScreen(true);
      }
    },
  });

  const formikControlStation = useFormik({
    initialValues: {
      ControlStation: shopData?.imagesUrl?.ControlStation || [],
      Engine: shopData?.imagesUrl?.Engine || [],
      Chassis: shopData?.imagesUrl?.Chassis || [],
      Undercarriage: shopData?.imagesUrl?.Undercarriage || [],
    },
    validationSchema: Yup.object({
      ControlStation: Yup.array().min(1, "choose at least 1 iamge"),
      Engine: Yup.array().min(1, "choose at least 1 iamge"),
      Chassis: Yup.array().min(1, "choose at least 1 iamge"),
      Undercarriage: Yup.array().min(1, "choose at least 1 iamge"),
    }),
    onSubmit: async (values, helpers) => {
      setLoader(true);
      setIsDisabled(true);
      let res;
      let av1 = [];
      let av2 = [];
      let av3 = [];
      let av4 = [];

      for await (const [key, data] of values?.ControlStation.entries()) {
        if (data?.fileObj) {
          if (shopData?.imagesUrl?.ControlStation?.[key]) {
            const slicedile = shopData?.imagesUrl?.ControlStation?.[key]?.split("/");

            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av1[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av1[key] = res?.data?.Location;
          }
        } else {
          av1[key] = data;
        }
      }

      for await (const [key, data] of values?.Engine.entries()) {
        if (data?.fileObj) {
          if (shopData?.imagesUrl?.Engine?.[key]) {
            const slicedile = shopData?.imagesUrl?.Engine?.[key]?.split("/");

            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av2[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av2[key] = res?.data?.Location;
          }
        } else {
          av2[key] = data;
        }
      }

      for await (const [key, data] of values?.Chassis.entries()) {
        if (data?.fileObj) {
          if (shopData?.imagesUrl?.Chassis?.[key]) {
            const slicedile = shopData?.imagesUrl?.Chassis?.[key]?.split("/");

            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av3[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av3[key] = res?.data?.Location;
          }
        } else {
          av3[key] = data;
        }
      }

      for await (const [key, data] of values?.Undercarriage.entries()) {
        if (data?.fileObj) {
          if (shopData?.imagesUrl?.Undercarriage?.[key]) {
            const slicedile = shopData?.imagesUrl?.Undercarriage?.[key]?.split("/");

            const dltKey = slicedile[slicedile?.length - 2] + "/" + slicedile[slicedile?.length - 1];

            const delres = await s3DeleteImage(dltKey);

            if (delres.success) {
              res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
              av4[key] = res?.data?.Location;
            }
          } else {
            res = await s3ImageUpload(data?.fileObj, awsFolder?.PRODUCT);
            av4[key] = res?.data?.Location;
          }
        } else {
          av4[key] = data;
        }
      }

      if ((await av1.length) != 0 && av2.length != 0 && av3.length != 0 && av4.length != 0) {
        values.ControlStation = av1;
        values.Engine = av2;
        values.Chassis = av3;
        values.Undercarriage = av4;

        dispatch(editProduct({ ...shopData, ...values, imagesUrl: { ...shopData.imagesUrl, ControlStation: av1, Engine: av2, Chassis: av3, Undercarriage: av4 } }));

        let categoryName = shopData.categoryId.split(",");

        let subCategoryName = shopData.subcategoryId.split(",");

        let modelNoName = shopData.modelNoId.split(",");

        let payload;
        let imagesUrl;
        if (selectProduct === "machine") {
          imagesUrl = {
            Equipment: shopData?.Equipment,
            AdditionalEquipment: shopData?.AdditionalEquipment,
            ControlStation: av1,
            Engine: av2,
            Chassis: av3,
            Undercarriage: av4,
          };
        } else {
          imagesUrl = {
            SparePart: shopData?.SparePart,
            AdditionalEquipment: shopData?.AdditionalEquipment,
            ControlStation: av1,
            Engine: av2,
            Chassis: av3,
            Undercarriage: av4,
          };
        }

        if ((selectProduct === "machine" && selectAuction === "fixedPrice") || (selectProduct === "sparePart" && selectAuction === "fixedPrice")) {
          // let imageobj = JSON.stringify(imagesUrl);
          payload = {
            imagesUrl: imagesUrl,
            productType: shopData?.productType,
            equipmentType: shopData?.equipmentType,
            sellType: shopData?.sellType,
            isSellUsingCrypto: shopData?.isSellUsingCrypto,
            name: shopData?.name,
            price: shopData?.price,
            Usage: shopData?.Usage,
            mileage: shopData?.mileage,
            latitude: shopData?.latitude,
            longitude: shopData?.longitude,
            country: shopData?.country,
            year: shopData?.year,
            categoryId: categoryName[0],
            catalogue: shopData?.catalogue,
            subcategoryId: subCategoryName[0],
            feature: shopData?.feature,
            modelNoId: modelNoName[0],
            ...(selectProduct === "machine" && {
              serialnumber: shopData?.serialnumber,
              serialNumberUrl: shopData?.serialNumberUrl,
              odometer: shopData?.odometer,
            }),
            id: shopData?.id,
            uuid: shopData?.uuid,
          };
        } else if ((selectProduct === "machine" && selectAuction === "auction") || (selectProduct === "sparePart" && selectAuction === "auction")) {
          // let imageobj = JSON.stringify(imagesUrl);
          payload = {
            imagesUrl: imagesUrl,
            productType: shopData?.productType,
            equipmentType: shopData?.equipmentType,
            sellType: shopData?.sellType,
            isSellUsingCrypto: shopData?.isSellUsingCrypto,
            name: shopData?.name,
            price: shopData?.price,
            Usage: shopData?.Usage,
            auctionStartDate: shopData?.auctionStartDate,
            auctionEndDate: shopData?.auctionEndDate,
            auctionType: shopData?.auctionType,
            mileage: shopData?.mileage,
            latitude: shopData?.latitude,
            longitude: shopData?.longitude,
            country: shopData?.country,
            year: shopData?.year,
            categoryId: categoryName[0],
            catalogue: shopData?.catalogue,
            subcategoryId: subCategoryName[0],
            feature: shopData?.feature,
            modelNoId: modelNoName[0],
            ...(selectProduct === "machine" && {
              serialnumber: shopData?.serialnumber,
              serialNumberUrl: shopData?.serialNumberUrl,
              odometer: shopData?.odometer,
            }),
            id: shopData?.id,
            uuid: shopData?.uuid,
          };
        }
        // else if ((selectProduct === "machine" && selectAuction === "fixedPrice") || (selectProduct === "sparePart" && selectAuction === "fixedPrice")) {
        else {
          // let imageobj = JSON.stringify(imagesUrl);
          payload = {
            imagesUrl: imagesUrl,
            productType: shopData?.productType,
            equipmentType: shopData?.equipmentType,
            sellType: shopData?.sellType,
            isSellUsingCrypto: shopData?.isSellUsingCrypto,
            name: shopData?.name,
            price: shopData?.price,
            hourPrice: shopData?.hourPrice,
            Usage: shopData?.Usage,
            mileage: shopData?.mileage,
            latitude: shopData?.latitude,
            longitude: shopData?.longitude,
            country: shopData?.country,
            year: shopData?.year,
            categoryId: categoryName[0],
            catalogue: shopData?.catalogue,
            subcategoryId: subCategoryName[0],
            feature: shopData?.feature,
            modelNoId: modelNoName[0],
            ...(selectProduct === "machine" && {
              serialnumber: shopData?.serialnumber,
              serialNumberUrl: shopData?.serialNumberUrl,
              odometer: shopData?.odometer,
            }),
            id: shopData?.id,
            uuid: shopData?.uuid,
          };
        }
        payload.categoryName = categoryName[1];
        payload.subcategoryName = subCategoryName[1];
        payload.modelNoName = modelNoName[1];

        const error = (toggle) => {
          setIsDisabled(toggle);
          setLoader(false);
        };

        let payloadData = {
          payload: payload,
          err: error,
          account: account,
          chainId: chainId,
          active: active,
          balance: checkBalance,
        };

        dispatch(editProductAction(payloadData));

        // if (shopReducerDetail?.error != null || shopReducerDetail?.error != undefined) {
        //   setIsDisabled(false);
        // }

        // updateProduct(payload, {
        //   Loading: setLoading,
        //   onSuccess: async (res) => {
        //     if (res.success) {
        //       dispatch(editProduct(null));
        //       setScreen(true);
        //       // dispatch(userStore(setUserObject))
        //       // Router.push("/");
        //     } else {
        //       toaster("error", res?.errors);
        //       setIsDisabled(false);
        //     }
        //     // helpers.resetForm();
        //   },
        //   onError: (err) => {
        //     toaster("error", err.message);
        //   },
        // });
      }
    },
  });

  return {
    formik,
    selectProduct,
    setSelectProduct,
    equipmentType,
    setEquipmentType,
    selectAuction,
    setSelectAuction,
    setScreen,
    screen,
    shopData,
    formikDetail,
    formikGeneralApp,
    formikControlStation,
    isDisabled,
    moneyType,
    setMoneyType,
    loader,
    setLoader,
  };
};

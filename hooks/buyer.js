import { getSidebarCategory, getSidebarSubcategory, getProducts } from "@services";
import {
  encodeData,
  getDecodedData,
  localStorageKeys,
  router,
  secureKeys,
  toaster,
} from "@utils";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";


export const buyerCommonApi = () => {

  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  // const [sell,setSell] = useState("")

  const Router = useRouter();
  // const sell = Router.pathname.includes('rent') && 'rent';
  // const sell = Router.pathname.includes('rent') && 'auction';

  // useEffect
  useEffect(() => {
    sidebarCategory();
  },[]);


  // functions
  const sidebarCategory = async () => {
    const result = await getSidebarCategory(Router.pathname.includes('rent') ?`?sellType=rent`:"");
    if (result?.success) {
      setCategory(result?.data);
    }
  };

  const sidebarSubCategory = async (categoryId = '') => {
    const result = await getSidebarSubcategory(Router.pathname.includes('rent') ? `${categoryId}&sellType=rent` : `${categoryId}`)
    if (result?.success) {
      setSubcategory(result?.data)
    }
  };




  return {
    category,
    sidebarSubCategory,
    subcategory,

  }
}
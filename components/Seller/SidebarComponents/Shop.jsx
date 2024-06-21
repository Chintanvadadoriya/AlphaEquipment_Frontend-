import { useEffect, useState } from "react";
import ShopList from "./ShopList";
import { useGetShop } from "@hooks";
import AllAddProductComponent from "../Product/AllAddProductComponent";
import ShopStoreCreate from "./ShopStoreCreate";
import { getShopList } from "@services";
import AllEditProductComponent from "../EditProduct/AllEditProductComponent";
import { LoaderComponent } from "@components";

const Shop = () => {
  const { setShowProductList, showProductList, loader,setLoader } = useGetShop();
  // const [loader, setLoader] = useState(false);

  useEffect(() => {
    shopList();
    setLoader(true)
  }, []);

  async function shopList() {
    const resShopList = await getShopList();
    setLoader(false)
    if (resShopList?.data?.length != 0) {
      setShowProductList("productlist");
    }else{
      setShowProductList("createstore");
    }
  }

  return (
    <>
      {loader && <LoaderComponent />}
      {showProductList === "createstore" && <ShopStoreCreate setShowProductList={setShowProductList} />}

      {showProductList === "productlist" && <ShopList setShowProductList={setShowProductList} />}
      {showProductList === "addproduct" && <AllAddProductComponent setShowProductList={setShowProductList} />}
      {showProductList === "editproduct" && <AllEditProductComponent setShowProductList={setShowProductList} />}
    </>
  );
};

export default Shop;

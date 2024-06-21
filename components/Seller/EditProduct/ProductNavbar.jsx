import { updateProduct } from "@services";
import {
  CommonBlockContent,
  TopContentCommon,
  CommonMiddleContent,
  Button,
} from "@style";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductNavbar = ({data}) => {
  const [imagesrc, setImageSrc] = useState("EquipmentInfoPic");

  useEffect(() => {
    if (data == "Detailed Information") {
      setImageSrc("DetailedInfoPic");
    } else if (data == "General Appearance") {
      setImageSrc("GeneralAppPic");
    } else if (data == "Control Station (optional)") {
      setImageSrc("ControlStationPic");
    }
  }, []);
//   const dispatch = useDispatch();
  

//   const shopData = useSelector((store) => store.shop.productEditDetail);
//    console.log('shopData :>> ', shopData);

//   const updateProductDetail = async()=>{
// console.log("123456789")
// console.log('fun :>> ', fun);
// await fun()
// let payload =shopData
// console.log('payload :>> ', payload);
// // updateProduct(payload, {
// //   Loading: setLoading,
// //   onSuccess: async (res) => {
  
// //     if (res.success) {
// //       dispatch(editProduct(null));
// //       setScreen(true);
// //       // dispatch(userStore(setUserObject))
// //       // Router.push("/");
// //     } else {
// //       toaster("error", res?.errors);
// //       setIsDisabled(false);
// //     }
// //     // helpers.resetForm();
// //   },
// //   onError: (err) => {
// //     toaster("error", err.message);
// //   },
// // });
//   }

  return (
    <CommonBlockContent>
      <TopContentCommon>
        <h3>Edit Product</h3>
        {/* <Button
            className="button-common"
            // onClick={() => {
            //   setShowProductList("addproduct");
            //   // dispatch(addProduct(null));
            // }}
            onClick={()=>updateProductDetail()}
          >
             Save
          </Button> */}
      </TopContentCommon>
   
      <CommonMiddleContent>
        <div className="product-title-block">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            pretium orci vel ante posuere, et pharetra magna consectetur.
          </p>
          <div className="block-product-step">
            <Image
              src={`/assets/addproduct/${imagesrc}.svg`}
              width={244}
              height={36}
              alt="EquipmentInfoPic"
            />
            <h6>{data}</h6>
          </div>
        </div>
      </CommonMiddleContent>
    </CommonBlockContent>
  );
};

export default ProductNavbar;

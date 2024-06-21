import { useEffect, useState } from "react";
import { AddProductWrap } from "@style";
import EquipmentInfo from "./EquipmentInfo";
import DetailedInfo from "./DetailedInfo";
import GeneralAppInfo from "./GeneralAppInfo";
import ControlStaInfo from "./ControlStaInfo";
import { addProduct } from "@redux";
import { useDispatch, useSelector } from "react-redux";

const AllEditProductComponent = ({ setShowProductList }) => {
  // const shopData = useSelector((store) => store.shop.shopDetail);
  // const dispatch = useDispatch();
  const [togle, setTogle] = useState(1);

  function child(data) {
    // dispatch(addProduct({ ...shopData, currentPage: data }));
    setTogle(data);
  }

  // useEffect(() => {
  //   if (shopData?.currentPage) {
  //     setTogle(shopData?.currentPage);
  //   }
  // }, []);

  return (
    <AddProductWrap>
      {togle == 1 && <EquipmentInfo child={child} />}

      {togle == 2 && <DetailedInfo child={child} />}

      {togle == 3 && <GeneralAppInfo child={child} />}

      {togle == 4 && (
        <ControlStaInfo child={child} setShowProductList={setShowProductList} />
      )}
    </AddProductWrap>
  );
};

export default AllEditProductComponent;

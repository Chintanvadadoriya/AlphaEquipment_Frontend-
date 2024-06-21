import {
  CommonBlockContent,
  TopContentCommon,
  CommonMiddleContent,
} from "@style";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ProductNavbar = (props) => {
  const [imagesrc, setImageSrc] = useState("EquipmentInfoPic");

  useEffect(() => {
    if (props.data == "Detailed Information") {
      setImageSrc("DetailedInfoPic");
    } else if (props.data == "General Appearance") {
      setImageSrc("GeneralAppPic");
    } else if (props.data == "Control Station (optional)") {
      setImageSrc("ControlStationPic");
    }
  }, []);
  const { t, i18n } = useTranslation();

  return (
    <CommonBlockContent>
      <TopContentCommon>
        <h3>{t("addProduct")}</h3>
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
            <h6>{props.data}</h6>
          </div>
        </div>
      </CommonMiddleContent>
    </CommonBlockContent>
  );
};

export default ProductNavbar;

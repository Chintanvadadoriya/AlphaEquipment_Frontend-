import { BtnWrap, FiveImgWrap, GeneralAprForm } from "@style";
import React, { useState } from "react";
import ControlStaInfo from "./ControlStaInfo";
import ProductNavbar from "./ProductNavbar";
import Form from "react-bootstrap/Form";
import Image from "next/image";
import FiveImgCmp from "./FiveImgCmp";
import { Button } from "react-bootstrap";
import { EquipInfoForm } from "@style";
import { useAddProduct } from "@hooks";
import { setImageUpload } from "@utils";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LoaderComponent } from "@components";

const GeneralAppInfo = ({ child, sparePart }) => {
  const { t, i18n } = useTranslation();
  const { shopData, formikGeneralApp, screen, isDisabled, loader, setLoader } = useAddProduct();
  const getImgData = useSelector((store) => store.shop.shopDetail);

  const blobGenerate = async (param, nameKey) => {
    let res = await setImageUpload(param);

    formikGeneralApp.setFieldValue(nameKey, res);
  };
  if (screen) {
    child(4);
  }
  return (
    <>
      <ProductNavbar data={"General Appearance"}></ProductNavbar>
      <EquipInfoForm onSubmit={formikGeneralApp.handleSubmit}>
        <div className="form-select-group-main">
          <div className="form-select-group-main-inner">
            {shopData?.productType === "sparePart" ? (
              <div className="form-group-main">
                <div className="form-group">
                  <Form.Label>{t("addAditionalImagesEquipment")}</Form.Label>
                  <FiveImgCmp name={"AdditionalEquipment"} formik={formikGeneralApp} />
                </div>
              </div>
            ) : (
              <>
                <div className="form-group-main">
                  <div className="form-group">
                    <Form.Label>{t("serialNo")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter serial number" name="serialnumber" onChange={formikGeneralApp.handleChange} onBlur={formikGeneralApp.handleBlur} value={formikGeneralApp.values.serialnumber} />
                    {formikGeneralApp.errors.serialnumber && <p>{formikGeneralApp.errors.serialnumber}</p>}
                  </div>
                </div>
                <div className="image-block-input">
                  <Form.Label>{t("addImagesOfSerialNo")}</Form.Label>
                  <FiveImgWrap>
                    <div className="equipment-picture-upload">
                      <Image src={formikGeneralApp?.values?.serialNumberUrl?.file ? formikGeneralApp?.values?.serialNumberUrl?.file : getImgData?.serialNumberUrl ? getImgData?.serialNumberUrl : "/assets/addproduct/DetInEquipPic.svg"} width={90} height={90} alt="Addimageequipmentpic" className="imgmain" />
                      <div className="input-type-block">
                        <input type="file" name="serialNumberUrl" className="file-input__input" id="file-input" onChange={(e) => blobGenerate(e, `serialNumberUrl`)}></input>
                        <label className="file-input__label" htmlFor="file-input">
                          <Image src="/assets/addproduct/DetInEquipAdPic.svg" width={20} height={21} alt="Addimageequipmentpic" className="imgadd" />
                        </label>
                      </div>
                    </div>
                  </FiveImgWrap>
                  <div className="form-group-main">
                    <div className="form-group">
                      <Form.Label>{t("odometer")}</Form.Label>
                      <Form.Control type="text" placeholder="Add odometer reading" name="odometer" onChange={formikGeneralApp.handleChange} onBlur={formikGeneralApp.handleBlur} value={formikGeneralApp.values.odometer} />
                      {formikGeneralApp.errors.odometer && <p>{formikGeneralApp.errors.odometer}</p>}
                    </div>
                  </div>
                  <div className="image-block-input">
                    <Form.Label>{t("addAditionalImagesEquipment")}</Form.Label>
                    <FiveImgCmp name={"AdditionalEquipment"} formik={formikGeneralApp} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <BtnWrap>
          <Button variant="primary" type="button" size="lg" className="btnBack" onClick={() => child(2)} disabled={isDisabled}>
            {t("back")}
          </Button>
          <Button variant="primary" type="submit" size="lg" className="btnNext" disabled={isDisabled}>
            {t("next")}
          </Button>
        </BtnWrap>
      </EquipInfoForm>
      {loader && <LoaderComponent />}
    </>
  );
};

export default GeneralAppInfo;

import React, { useEffect, useState } from "react";
import GeneralAppInfo from "./GeneralAppInfo";
import ProductNavbar from "./ProductNavbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "next/image";
import { BtnWrap, DetailInfoForm } from "@style";
import { EquipInfoForm } from "@style";

import FiveImgCmp from "./FiveImgCmp";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useAddProduct, useEditProduct } from "@hooks";
import { getCategory, getModelNo, getSubcategoryByCategory } from "@services";
import { useTranslation } from "react-i18next";
import { LoaderComponent } from "@components";

const DetailedInfo = ({ child }) => {
  const { formikDetail, screen, shopData, isDisabled, loader, setLoader } = useEditProduct();
  const [categoryData, setCategoryData] = useState();
  const [modelNoData, setModelNoData] = useState();
  const [subCategoryData, setSubCategoryData] = useState();
  const { t, i18n } = useTranslation();

  if (screen) {
    child(3);
  }

  useEffect(() => {
    getCategoryData();
    getModelNoData();
    if (formikDetail?.values?.categoryId) {
      getSubcategoryData(formikDetail?.values?.categoryId);
    }
  }, []);

  const getCategoryData = async () => {
    const res = await getCategory();
    setCategoryData(res?.data);
  };
  const getModelNoData = async () => {
    const res = await getModelNo();
    setModelNoData(res?.data);
  };
  const getSubcategoryData = async (e) => {
    if (e != formikDetail?.values?.categoryId) {
      formikDetail.values.subcategoryId = "";
    }
    const categoryId = e.split(",");

    const res = await getSubcategoryByCategory(categoryId[0]);

    setSubCategoryData(res?.data?.rows);
  };

  return (
    <>
      <ProductNavbar data={"Detailed Information"}></ProductNavbar>

      <EquipInfoForm onSubmit={formikDetail.handleSubmit}>
        <div className="form-select-group-main">
          <div className="form-select-group-main-inner">
            <Form.Group className="form-group-main" controlId="formBasicPassword">
              <div className="form-group">
                <Form.Label className="label-loaction-block">{t("location")}</Form.Label>
                {/* <GooglePlacesAutocomplete
                  apiKey="AIzaSyAQh5ByTvjOPWf0W5Qb2vvNumkYCIKiLMA"
                  placeholder="cityname"
                  className="form-select"
                  id="locationDataSet"
                  // ref={locationReference}
                  // selectProps={{
                  //   value: locationValue,
                  // }}
                  onSelect={(result) => {
                    // handleGoogleAutocomplete(result);
                  }}
                /> */}
                <Form.Control
                  type="text"
                  placeholder="Enter Location"
                  defaultValue="Rajkot"
                  // value="Rajkot"
                />
              </div>
              <div className="form-group">
                <Form.Label>{t("category")}</Form.Label>
                <Form.Select
                  name="categoryId"
                  onChange={(e) => {
                    formikDetail.handleChange(e), getSubcategoryData(e.target.value);
                  }}
                  onBlur={formikDetail.handleBlur}
                  value={formikDetail.values.categoryId}
                >
                  <option hidden>{t("selectCategory")}</option>
                  {categoryData?.map((data) => (
                    <option key={data.id} value={`${data.id},${data.name}`}>
                      {data.name}
                    </option>
                  ))}
                </Form.Select>
                {formikDetail.touched.categoryId && <p>{formikDetail.errors.categoryId}</p>}
              </div>
              <div className="form-group">
                <Form.Label>{t("catalogueNote")}</Form.Label>
                <Form.Control type="text" placeholder="Enter Catalogue of equipment" name="catalogue" onChange={formikDetail.handleChange} onBlur={formikDetail.handleBlur} value={formikDetail.values.catalogue} />
                {formikDetail.touched.catalogue && <p>{formikDetail.errors.catalogue}</p>}
              </div>
              <div className="form-group">
                <Form.Label>{t("subCategory")}</Form.Label>
                <Form.Select name="subcategoryId" onChange={formikDetail.handleChange} onBlur={formikDetail.handleBlur} value={formikDetail.values.subcategoryId}>
                  <option hidden>{t("subCategory")}</option>
                  {subCategoryData?.map((data) => (
                    <option key={data.id} value={`${data.id},${data.name}`}>
                      {data.name}
                    </option>
                  ))}
                </Form.Select>
                {formikDetail.touched.subcategoryId && <p>{formikDetail.errors.subcategoryId}</p>}
              </div>
              <div className="form-group">
                <Form.Label>{t("feature")}</Form.Label>
                <Form.Control className="textarea-block" type="text" as="textarea" placeholder="Enter features of equipment" name="feature" onChange={formikDetail.handleChange} onBlur={formikDetail.handleBlur} value={formikDetail.values.feature} />
                {formikDetail.touched.feature && <p>{formikDetail.errors.feature}</p>}
              </div>
              <div className="form-group">
                <Form.Label>{t("equipmentModel")}</Form.Label>
                <Form.Select name="modelNoId" onChange={formikDetail.handleChange} onBlur={formikDetail.handleBlur} value={formikDetail.values.modelNoId}>
                  <option hidden>{t("selectEquipmentModel")}</option>
                  {modelNoData?.map((data) => (
                    <option key={data.id} value={`${data.id},${data.name}`}>
                      {data.name}
                    </option>
                  ))}
                </Form.Select>
                {formikDetail.touched.modelNoId && <p>{formikDetail.errors.modelNoId}</p>}
              </div>
            </Form.Group>
            <div className="image-block-input">
              <Form.Label>{shopData?.productType === "sparePart" ? t("addImagesOfSparepart") : t("addImagesOfEquipment")}</Form.Label>
              <FiveImgCmp formik={formikDetail} name={shopData?.productType === "sparePart" ? "SparePart" : "Equipment"} />
            </div>
          </div>
        </div>
        <BtnWrap>
          <Button variant="primary" type="button" size="lg" className="btnBack" onClick={() => child(1)} disabled={isDisabled}>
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

export default DetailedInfo;

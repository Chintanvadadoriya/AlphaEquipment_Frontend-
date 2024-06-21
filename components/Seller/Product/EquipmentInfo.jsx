import ProductNavbar from "./ProductNavbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { EquipInfoForm } from "@style";
import { useEffect, useState } from "react";
import { addProduct } from "@redux";
import { useDispatch } from "react-redux";
import { useAddProduct } from "@hooks";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { LoaderComponent } from "@components";

const EquipmentInfo = ({ child }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { formik, selectProduct, setSelectProduct, equipmentType, setEquipmentType, selectAuction, setSelectAuction, screen, isDisabled, shopData, handleChange, moneyType, setMoneyType, loader, setLoader } = useAddProduct();
  console.log("loader :>> ", loader);
  if (screen) {
    child(2);
  }
  useEffect(() => {
    if (selectProduct === "machine" || selectProduct === "sparePart" || selectAuction === "fixedPrice" || selectAuction === "auction" || selectAuction === "rent") {
      formik.handleReset();
    }
  }, [selectProduct, selectAuction]);
  const rentMin = moment(formik.values.auctionStartDate.slice(0, 10)).add(1, "days");
  let rentMinPre;

  if (rentMin?._d != "Invalid Date") {
    rentMinPre = moment(rentMin?._d).format("YYYY-MM-DD HH:mm:ss");
  }

  const a = moment(formik.values.auctionEndDate.slice(0, 10));
  const b = moment(formik.values.auctionStartDate.slice(0, 10));
  const dif = a.diff(b, "days");

  if (dif <= 0) {
    formik.values.auctionEndDate = "";
  }

  return (
    <>
      <ProductNavbar data={"Equipment Info"}></ProductNavbar>
      <EquipInfoForm onSubmit={formik.handleSubmit}>
        <div className="form-select-group-main">
          <Form.Group className="inputRadioWrap" controlId="formBasicCheckbox">
            <Form.Label>{t("selectProductType")}</Form.Label>
            <Form.Check
              type="radio"
              label="Machine"
              name="productType"
              value="machine"
              id="Machine"
              defaultChecked={selectProduct === "machine"}
              onChange={(e) => {
                setSelectProduct(e.target.value), formik.handleChange(e);
              }}
            />
            <Form.Check
              type="radio"
              label="Spare Part"
              name="productType"
              value="sparePart"
              id="Spare Part"
              defaultChecked={selectProduct === "sparePart"}
              onChange={(e) => {
                setSelectProduct(e.target.value), formik.handleChange(e);
              }}
            />
            <Form.Label>{t("equipmentType")}</Form.Label>
            <Form.Check
              type="radio"
              label="New"
              name="equipmentType"
              value="new"
              id="New"
              defaultChecked={equipmentType === "new"}
              onChange={(e) => {
                setEquipmentType(e.target.value), formik.handleChange(e);
              }}
            />
            <Form.Check
              type="radio"
              label="Old"
              name="equipmentType"
              value="old"
              id="Old"
              defaultChecked={equipmentType === "old"}
              onChange={(e) => {
                setEquipmentType(e.target.value), formik.handleChange(e);
              }}
            />
            <Form.Label>{t("moneyType")}</Form.Label>
            <Form.Check
              type="radio"
              label="USD"
              name="moneyType"
              value={"false"}
              id="USD"
              defaultChecked={moneyType === "false"}
              onChange={(e) => {
                setMoneyType(e.target.value), formik.handleChange(e);
              }}
            />
            <Form.Check
              type="radio"
              label="CRYPTO"
              name="moneyType"
              value={"true"}
              id="CRYPTO"
              defaultChecked={moneyType === "true"}
              onChange={(e) => {
                setMoneyType(e.target.value), formik.handleChange(e);
              }}
            />

            <Form.Label>{t("select")}</Form.Label>
            <Form.Check
              type="radio"
              label="Fix price"
              name="sellType"
              value="fixedPrice"
              id="Fix price"
              defaultChecked={selectAuction === "fixedPrice"}
              onChange={(e) => {
                setSelectAuction(e.target.value);
                formik.handleChange(e);
              }}
            />
            <Form.Check
              type="radio"
              label="Auction"
              name="sellType"
              value="auction"
              id="Auction"
              defaultChecked={selectAuction === "auction"}
              onChange={(e) => {
                setSelectAuction(e.target.value);
                formik.handleChange(e);
              }}
            />
            <Form.Check
              type="radio"
              label="Rent"
              name="sellType"
              value="rent"
              id="Rent"
              defaultChecked={selectAuction === "rent"}
              onChange={(e) => {
                setSelectAuction(e.target.value);
                formik.handleChange(e);
              }}
            />
          </Form.Group>
        </div>
        <div className="form-select-group-main">
          <div className="form-select-group-main-inner">
            <Form.Group className="form-group-main" controlId="formBasicPassword">
              {((selectProduct === "machine" && selectAuction === "fixedPrice") || (selectProduct === "sparePart" && selectAuction === "fixedPrice")) && (
                <>
                  <div className="form-group">
                    <Form.Label>{t("name")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter Product Name" className="typeText" value={formik.values.name} name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.name && <p>{formik.errors.name}</p>}
                  </div>
                  <div className="form-group">
                    <Form.Label>{t("price")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price" className="typeText" name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.price && <p>{formik.errors.price}</p>}
                  </div>
                  <div className="form-group">
                    <Form.Label>{t("usage1")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter usage of equipment" className="typeText" name="Usage" value={formik.values.Usage} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.Usage && <p>{formik.errors.Usage}</p>}
                  </div>

                  <div className="form-group">
                    <Form.Label>{t("milage")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter milage of equipment" className="typeText" name="mileage" value={formik.values.mileage} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.mileage && <p>{formik.errors.mileage}</p>}
                  </div>
                </>
              )}
              {((selectProduct === "machine" && selectAuction === "auction") || (selectProduct === "sparePart" && selectAuction === "auction")) && (
                <>
                  <div className="form-group">
                    <Form.Label>{t("name")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter Product Name" className="typeText" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.name && <p>{formik.errors.name}</p>}
                  </div>
                  <div className="form-group">
                    <Form.Label>{t("usage1")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter usage of equipment" className="typeText" name="Usage" value={formik.values.Usage} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.Usage && <p>{formik.errors.Usage}</p>}
                  </div>

                  <div className="form-group">
                    <Form.Label>{t("auctionStartDate")}</Form.Label>
                    <Form.Control type="datetime-local" placeholder="Enter milage of equipment" className="typeText" name="auctionStartDate" value={formik.values.auctionStartDate} onChange={formik.handleChange} onBlur={formik.handleBlur} min={new Date().toISOString().slice(0, 16)} />
                    {formik.touched.auctionStartDate && <p>{formik.errors.auctionStartDate}</p>}
                  </div>
                  <div className="form-group">
                    <Form.Label>{t("auctionEndDate")}</Form.Label>
                    <Form.Control type="datetime-local" placeholder="Enter milage of equipment" className="typeText" name="auctionEndDate" value={formik.values.auctionEndDate} onChange={formik.handleChange} onBlur={formik.handleBlur} min={rentMinPre ? rentMinPre : ""} disabled={formik?.values?.auctionStartDate ? false : true} />
                    {formik.touched.auctionEndDate && <p>{formik.errors.auctionEndDate}</p>}
                  </div>
                  <div className="form-group">
                    <Form.Label>{t("milage")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter milage of equipment" className="typeText" name="mileage" value={formik.values.mileage} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.mileage && <p>{formik.errors.mileage}</p>}
                  </div>
                  <div className="form-group">
                    <Form.Label>{t("auctionType")}</Form.Label>
                    <Form.Select name="auctionType" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.auctionType}>
                      <option hidden>{t("selectAuctionType")}</option>
                      <option>{t("auto")}</option>
                      <option>{t("manual")}</option>
                    </Form.Select>
                    {formik.touched.auctionType && <p>{formik.errors.auctionType}</p>}
                  </div>

                  <div className="form-group">
                    <Form.Label>{t("price")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price" className="typeText" name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.price && <p>{formik.errors.price}</p>}
                  </div>
                </>
              )}
              {((selectProduct === "machine" && selectAuction === "rent") || (selectProduct === "sparePart" && selectAuction === "rent")) && (
                <>
                  <div className="form-group">
                    <Form.Label>{t("name")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter Product Name" className="typeText" value={formik.values.name} name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.name && <p>{formik.errors.name}</p>}
                  </div>
                  <div className="form-group">
                    <Form.Label>{t("pricePerDay")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price Per Day" className="typeText" name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.price && <p>{formik.errors.price}</p>}
                  </div>
                  <div className="form-group">
                    <Form.Label>{t("pricePerHour")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price Per Hour" className="typeText" name="hourPrice" value={formik.values.hourPrice} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.hourPrice && <p>{formik.errors.hourPrice}</p>}
                  </div>
                  <div className="form-group">
                    <Form.Label>{t("usage1")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter usage of equipment" className="typeText" name="Usage" value={formik.values.Usage} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.Usage && <p>{formik.errors.Usage}</p>}
                  </div>

                  <div className="form-group">
                    <Form.Label>{t("milage")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter milage of equipment" className="typeText" name="mileage" value={formik.values.mileage} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.mileage && <p>{formik.errors.mileage}</p>}
                  </div>
                </>
              )}
            </Form.Group>
          </div>
        </div>
        <div className="button-last">
          <Button variant="primary" type="submit" size="lg" disabled={isDisabled}>
            {t("next")}
          </Button>
        </div>
      </EquipInfoForm>
      {loader && <LoaderComponent />}
    </>
  );
};

export default EquipmentInfo;

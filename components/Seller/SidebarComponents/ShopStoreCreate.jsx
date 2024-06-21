import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import { CommonBlockContent, TopContentCommon, CommonMiddleContent } from "@style";
import { Input, LoaderComponent, SubmitButton } from "@components";
import { SuccessResModel, VerifyModel } from "@models";
import { useGetShop } from "@hooks";
import { useTranslation } from "react-i18next";
import { setImageUpload, toaster } from "@utils";
const ShopStoreCreate = ({ setShowProductList }) => {
  const { formik, loading, setOpenVerifyModel, openVerifyModel, setProfilePic, openSucModel, setOpenSucModel, shopSendOtp, setReSend, reSend, otp, setOtp, setCallFunction, callFunction, shopCreate, loader, setLoader } = useGetShop();
  const { t } = useTranslation();

  const [toggle, setToggle] = useState(false);

  const [number, setNumber] = useState({ countryCode: "", num: "" });
  const [file, setFile] = useState(null);
  const [phone, setPhone] = useState(null);

  async function shopProfilePic(e) {
    const res = await setImageUpload(e);

    setFile(res.file);
    setProfilePic(res.fileObj);
  }
  useEffect(() => {
    if (reSend) {
      shopSendOtp();
    }
  }, [reSend]);

  useEffect(() => {
    if (callFunction) {
      shopCreate();
    }
  }, [callFunction]);

  return (
    <>
      <CommonBlockContent>
        <TopContentCommon>
          <h3>{t("yourShop")}</h3>
        </TopContentCommon>
        <CommonMiddleContent>
          <div className="shop-block-main">
            <h3>{t("createStore")}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium orci vel ante posuere, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium orci vel ante posuere, et pharetra magna consectetur.</p>

            <div className="button-block-inner">
              {toggle ? (
                <div className="profile-picture-block">
                  <h6>{t("profilePicture")}</h6>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="profile-picture-upload">
                      <img src={file ? file : "/assets/icons/user-icon.jpg"} alt="profile-img"></img>
                      <div className="input-type-block">
                        <input type="file" accept=".png, .jpg, .jpeg" name="file-input" className="file-input__input" id="file-input" onChange={(e) => shopProfilePic(e)} />
                        <label className="file-input__label" htmlFor="file-input">
                          <img src="/assets/icons/plus-icon.svg" alt="img"></img>
                        </label>
                      </div>
                    </div>
                    <div className="form-block-shop">
                      <Form.Group controlId="formBasicEmail" className="form-group">
                        <Form.Label>{t("storeName")}</Form.Label>

                        <Input name="storeName" type="text" placeholder={t(`Enter Store Name`)} showError={Boolean(formik.touched.storeName)} errorMsg={formik.errors.storeName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail" className="form-group">
                        <Form.Label>{t("businessEmail")}</Form.Label>
                        <Input name="email" type="email" placeholder={t(`Enter Business Email`)} showError={Boolean(formik.touched.email)} errorMsg={formik.errors.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                      </Form.Group>
                      <Form.Group controlId="phoneNumber" className="form-group">
                        <PhoneInput
                          country={"in"}
                          specialLabel="Phone Number"
                          name="phoneNumber"
                          value={phone}
                          onChange={(phone, data, event, formattedValue, handleChange) => {
                            let cuntrycode = formattedValue.split(" ")[0];
                            let filedvalue = formattedValue.slice(cuntrycode.length + 1);
                            formik.setFieldValue("phoneNumber", filedvalue);
                            setNumber({
                              countryCode: formattedValue.split(" ")[0],
                              num: formattedValue.split(" ")[1],
                            });
                            setPhone(phone);
                          }}
                          onBlur={formik.handleBlur("phoneNumber")}
                        />

                        {formik.touched.phoneNumber && <p className="phoneError">{formik.errors.phoneNumber}</p>}
                      </Form.Group>
                    </div>

                    <SubmitButton name="Confirm" disabled={loading} loading={loading} type="submit" />
                  </Form>
                </div>
              ) : (
                <>
                  <div className="button-block-main">
                    <img src="/assets/shop/OnlineAds.svg" alt="alpha-link"></img>
                    <Button variant="primary" type="button" onClick={() => setToggle(true)}>
                      {t("start")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </CommonMiddleContent>
        <VerifyModel openVerifyModel={openVerifyModel} setOpenVerifyModel={setOpenVerifyModel} setCallFunction={setCallFunction} setReSend={setReSend} otp={otp} setOtp={setOtp} />
        <SuccessResModel openSucModel={openSucModel} setOpenSucModel={setOpenSucModel} setShowProductList={setShowProductList} successHead="Congratulations!" successMsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis fringilla eros, sit amet auctor justo accumsan et." />
      </CommonBlockContent>
      {loader && <LoaderComponent />}
    </>
  );
};

export default ShopStoreCreate;

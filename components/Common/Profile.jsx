import { ProfileInner, TopBLockProfile, ProfileBlockInner, ProfileForm } from "@style";
import { AccountDeleteModel, ChangePasswordModel, SuccessResModel, VerifyModel } from "@models";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Button from "react-bootstrap/Button";
import { Input, LoaderComponent } from "@components";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { useImageUpload, useProfileUpdate } from "@hooks";
import { setImageUpload, toaster } from "@utils";
import { getProfile } from "@services";
import { userStore } from "@redux";

const ProfileBar = ({ isBuyer }) => {
  const dispatch = useDispatch();
  const { formik, setNumber, setProfilePic, userSendSmsOtp, reSend, setReSend, setUpdatePhoneNumber, updatePhoneNumber, userUpdatePhoneNumber, openVerifyModel, setOpenVerifyModel, setOpenSucModel, openSucModel, openAccountDltModel, setOpenAccountDltModel, accountDltFormik, dltAcOpenVerifyModel, setDltAcOpenVerifyModel, sendAccountDltOtp, reSendAcDlt, setReSendAcDlt, userDeleteAccount, numberVerifyButtonDisabled, setNumberVerifyButtonDisabled, otp, setOtp, enable, setEnable, loader, setLoader } = useProfileUpdate();

  const [openChangePwdModel, setOpenChangePwdModel] = useState(false);
  // const [loader, setLoader] = useState(false);

  const profileData = useSelector((store) => store.user.userData);
  const [file, setFile] = useState(profileData?.profilePic);
  useEffect(() => {
    if (formik.initialValues !== formik.values || file !== profileData?.profilePic) {
      setEnable(false);
    }
  }, [formik?.values, file]);

  useEffect(() => {
    if (updatePhoneNumber) {
      userUpdatePhoneNumber();
    }
  }, [updatePhoneNumber]);

  useEffect(() => {
    if (reSend) {
      userSendSmsOtp();
    }
  }, [reSend]);

  useEffect(() => {
    if (reSendAcDlt) {
      sendAccountDltOtp();
    }
  }, [reSendAcDlt]);

  async function handleChange(e) {
    const res = await setImageUpload(e);

    setFile(res.file);
    setProfilePic(res.fileObj);
  }
  useEffect(() => {
    getDetail();
    setLoader(true);
  }, []);

  async function getDetail() {
    let detail = await getProfile();

    const setUserObject = detail.data;

    if (!setUserObject?.isPhoneNumberVerified) {
      setNumberVerifyButtonDisabled(false);
    }

    dispatch(userStore(setUserObject));
    setLoader(false);
  }

  return (
    <>
      <ProfileInner>
        <TopBLockProfile>
          <h3>Profile Setting</h3>
          <Button className="button-common" onClick={formik.handleSubmit} disabled={enable}>
            {isBuyer ? "Save" : "Edit"}
          </Button>
        </TopBLockProfile>
        <ProfileBlockInner>
          <div className="profile-block-main">
            <div className="top-block-title">
              <h3>Profile Picture</h3>
              <img src="/assets/icons/star-icon.svg" alt="img" />
            </div>
            <div className="profile-img-block">
              <img src={file ? file : "/assets/icons/user-icon.jpg"} alt="profile-img"></img>

              <div className="input-type-block">
                <input type="file" accept=".png, .jpg, .jpeg" name="file-input" className="file-input__input" id="file-input" onChange={(e) => handleChange(e)} />
                <label className="file-input__label" htmlFor="file-input">
                  <img src="/assets/icons/plus-icon.svg" alt="img" />
                </label>
              </div>
            </div>
          </div>
          <div className="profile-block-content">
            <ProfileForm checkBtn={numberVerifyButtonDisabled}>
              <div className="profile-block-content-form">
                <div className="left-profile-block">
                  <div className="left-profile-form">
                    <div className="form-group">
                      <Input name="profileName" lable="Name" type="text" placeholder="Enter Your Name" showError={Boolean(formik.touched.profileName && formik.errors.profileName)} errorMsg={formik.errors.profileName} onChange={formik.handleChange} onBlur={formik.handleBlur} defaultValue={profileData?.userName} />
                    </div>
                    <div className="form-group ">
                      <PhoneInput
                        // country={"in"}
                        placeholder="Enter Your PhoneNumber"
                        specialLabel="Phone Number"
                        name="profileNumber"
                        value={`${profileData?.countryCode} ${profileData?.phoneNumber}`}
                        onChange={(phone, data, event, formattedValue, handleChange) => {
                          let cuntrycode = formattedValue.split(" ")[0];
                          let filedvalue = formattedValue.slice(cuntrycode.length + 1);
                          formik.setFieldValue("profileNumber", filedvalue);
                          setNumber({
                            countryCode: formattedValue.split(" ")[0],
                            num: formattedValue.replace(/\s+/, "\x01").split("\x01"),
                          });
                        }}
                        onBlur={formik.handleBlur("profileNumber")}
                      />

                      {formik.touched.profileNumber && <p className="phoneError">{formik.errors.profileNumber}</p>}
                    </div>
                    <div className="phone-number-verify">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          setOpenVerifyModel(true), userSendSmsOtp();
                        }}
                        disabled={numberVerifyButtonDisabled}
                      >
                        Phone number Verify
                      </Button>
                      <VerifyModel openVerifyModel={openVerifyModel} setOpenVerifyModel={setOpenVerifyModel} setReSend={setReSend} setCallFunction={setUpdatePhoneNumber} otp={otp} setOtp={setOtp} />
                      <SuccessResModel
                        openSucModel={openSucModel}
                        setOpenSucModel={setOpenSucModel}
                        successHead="phonenummber verified"
                        successMsg="Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Pellentesque mattis fringilla
      eros, sit amet auctor justo accumsan et."
                      />
                    </div>
                  </div>
                  <div className="left-profile-form">
                    <div className="form-group">
                      <Input name="Email" lable="Email" type="email" placeholder="aadam123@gmail.com" defaultValue={profileData?.email} readonly={true} />
                    </div>
                    {/* <div className="form-group">
                      <label>Location</label>
                      <GooglePlacesAutocomplete
                        apiKey="AIzaSyAQh5ByTvjOPWf0W5Qb2vvNumkYCIKiLMA"
                        placeholder="cityname"
                        id="locationDataSet"
                        // ref={locationReference}
                        // selectProps={{
                        //   value: locationValue,
                        // }}
                        onSelect={(result) => {
                          // handleGoogleAutocomplete(result);
                        }}
                      />
                    </div> */}
                  </div>
                </div>
                <div className="change-delete-block">
                  <div className="right-profile-block-left">
                    <div className="right-profile-block-left-right" onClick={() => setOpenChangePwdModel(true)}>
                      <img src="/assets/icons/change-password.svg" alt="change-password-img"></img>
                      <div className="content-profile">
                        <h3>Change Password</h3>
                        <p>Lorem ipsum dolor amuet conse ctur adipi scing elit at bibendum ante bibendum.</p>
                      </div>
                    </div>
                    <ChangePasswordModel openChangePwdModel={openChangePwdModel} setOpenChangePwdModel={setOpenChangePwdModel} />
                  </div>
                  <div className="right-profile-block-left">
                    <div className="right-profile-block-left-right" onClick={() => setOpenAccountDltModel(true)}>
                      <img src="/assets/icons/delete-icon.svg" alt="change-password-img"></img>
                      <div className="content-profile">
                        <h3>Delete My Account</h3>
                        <p>Lorem ipsum dolor amuet conse ctur adipi scing elit at bibendum ante bibendum.</p>
                      </div>
                    </div>

                    <AccountDeleteModel openAccountDltModel={openAccountDltModel} setOpenAccountDltModel={setOpenAccountDltModel} accountDltFormik={accountDltFormik} />
                    <VerifyModel openVerifyModel={dltAcOpenVerifyModel} setOpenVerifyModel={setDltAcOpenVerifyModel} setReSend={setReSendAcDlt} setCallFunction={() => userDeleteAccount()} otp={otp} setOtp={setOtp} />
                  </div>
                </div>
              </div>
            </ProfileForm>
          </div>
        </ProfileBlockInner>
      </ProfileInner>
      {loader && <LoaderComponent />}
    </>
  );
};

export default ProfileBar;

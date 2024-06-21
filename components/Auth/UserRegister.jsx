import { Input, SubmitButton, OtpInput } from "@components";
import { useRegisterUser } from "@hooks";
import { AuthOption, HeadingContainer, RegisterForm } from "@style";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import Link from "next/link";
import { router } from "@utils";
import { useRouter } from "next/router";

const UserRegister = () => {
  const Router = useRouter();
  const [btnDisabled, setBtnDisabled] = useState(true);

  const {
    formik,
    loading,
    setNumber,
    userCreate,
    otp,
    setOtp,
    toggle,
    getSendOtp,
  } = useRegisterUser();

  useEffect(() => {
    if (
      formik.values.userName &&
      formik.values.email &&
      formik.values.phoneNumber &&
      formik.values.userType &&
      formik.values.password
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [formik?.values]);

  const [userType, setUserType] = useState(["buyer", "seller", "dealer"]);
  const [phone, setPhone] = useState();
  const { t, i18n } = useTranslation();

  return (
    <>
      {toggle === "true" && (
        <>
          <HeadingContainer>
            <h1>{t("createAccount")}</h1>
          </HeadingContainer>
          <RegisterForm noValidate onSubmit={formik.handleSubmit}>
            <Input
              name="userName"
              lable="User Name"
              placeholder={t("enterUname")}
              showError={Boolean(
                formik.touched.userName && formik.errors.userName
              )}
              errorMsg={formik.errors.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Input
              name="email"
              lable="Email"
              placeholder={t("enterEmail")}
              showError={Boolean(formik.touched.email && formik.errors.email)}
              errorMsg={formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

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

            {formik.touched.phoneNumber && (
              <p className="phoneError">{formik.errors.phoneNumber}</p>
            )}

            <div className="common-select">
              <label>User Type</label>
              <Form.Select
                aria-label="userType"
                name="userType"
                onChange={formik.handleChange}
              >
                {userType.map((value, index) => (
                  <option key={index} value={value} label={value.toUpperCase()}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </div>
            <Input
              name="password"
              lable="Password"
              type="password"
              placeholder={t("enterPassword")}
              showError={Boolean(
                formik.touched.password && formik.errors.password
              )}
              errorMsg={formik.errors.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <SubmitButton
              name={t("signUp")}
              disabled={btnDisabled}
              loading={loading}
            />
          </RegisterForm>

          <AuthOption>
            <p className="signupLink">
              {t("alreadyAccount")}{" "}
              <Link className="link" href={router.LOGIN}>
                {t("signIn")}
              </Link>
            </p>
          </AuthOption>
        </>
      )}

      {toggle === "false" && (
        <>
          <HeadingContainer>
            <h1>{t("verificationCode")}</h1>
          </HeadingContainer>
          <RegisterForm marginTop="25%">
            <OtpInput value={otp} onChange={(val) => setOtp(val)} />
            <SubmitButton
              type="button"
              marginTop="80px"
              name="VERIFY"
              onClick={userCreate}
              loading={loading}
              disabled={otp.length === 4 ? false : true}
            />
            <p className="msg">
              {t("Didn’t recieve a code?")}{" "}
              <span
                onClick={() => {
                  getSendOtp();
                  setOtp("");
                }}
              >
                {t("sendAgain")}
              </span>
            </p>
          </RegisterForm>
        </>
      )}
    </>
  );
};

export default UserRegister;

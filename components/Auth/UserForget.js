import { useForgetPassword } from "@hooks";
import { Button, HeadingContainer, RegisterForm } from "@style";
import { Input, SubmitButton } from "@components";
import { useRouter } from "next/router";
import { t } from "i18next";
import OtpInput from "../../components/OtpInput";

const UserForget = () => {
  
     const { formik, loading , getSendOtp , toggle , otp , setOtp, otpVerify, passwordForgetFormik} = useForgetPassword();
  const Router = useRouter();
  
  
  
 

  return (
    <>
      {toggle === "forget" && (
        <>
          <HeadingContainer>
            <h1>Forget Password</h1>
          </HeadingContainer>
          <RegisterForm
            marginTop="15%"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Input
              name="email"
              lable="Email"
              type="email"
              placeholder="Enter your Email"
              showError={Boolean(formik.errors.email)}
              errorMsg={formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <SubmitButton
              name="Send OTP"
              disabled={loading}
              loading={loading}
            />
          </RegisterForm>
        </>
      )}
      {toggle === "verification" && (
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
              onClick={()=>otpVerify()}
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
      {toggle === "createpassword" && (
        <>
          <HeadingContainer>
            <h1>{t("createPassword")}</h1>
          </HeadingContainer>
          <RegisterForm
            marginTop="15%"
            noValidate
            onSubmit={passwordForgetFormik.handleSubmit}
          >
            <Input
              name="password"
              lable="Password"
              placeholder={t("enterPassword")}
              type="password"
              showError={Boolean(
                passwordForgetFormik.touched.password && passwordForgetFormik.errors.password
              )}
              errorMsg={passwordForgetFormik.errors.password}
              onChange={passwordForgetFormik.handleChange}
              onBlur={passwordForgetFormik.handleBlur}
            />
            <Input
              name="confirmPassword"
              lable="Confirm Password"
              type="password"
              placeholder={t("enterPassword")}
              showError={Boolean(
                passwordForgetFormik.touched.confirmPassword && passwordForgetFormik.errors.confirmPassword
              )}
              errorMsg={passwordForgetFormik.errors.confirmPassword}
              onChange={passwordForgetFormik.handleChange}
              onBlur={passwordForgetFormik.handleBlur}
            />
            <Button type="submit" disabled={false}>
              {t("confirm")}
            </Button>
          </RegisterForm>
        </>
      )}
    </>
  );
};

export default UserForget;

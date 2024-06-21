import { useLoginUser } from "@hooks";
import { RegisterForm } from "@style";
import { Input, SubmitButton } from "@components";
import { router } from "@utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const UserLogin = () => {
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { formik, loading,} = useLoginUser();
  const Router = useRouter();
 
  const { t } = useTranslation();
  useEffect(() => {
    if (
      formik.values.email &&
      formik.values.password
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [formik?.values]);

  return (
    <RegisterForm marginTop="15%" noValidate onSubmit={formik.handleSubmit}>
      <Input
        name="email"
        lable="Email"
        type="email"
        placeholder={t(`enterEmail`)}
        showError={Boolean(formik.errors.email)}
        errorMsg={formik.errors.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        name="password"
        type="password"
        lable="Password"
        placeholder={t(`enterPassword`)}
        showError={Boolean(formik.touched.password && formik.errors.password)}
        errorMsg={formik.errors.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <div className="forgot-reset-block">
          <span className="msg">
            <p
              className="forgot-msg"
             
            >
              {t(`forgetPassword`)}{" "}<span className="link"  onClick={() => Router.push(router.FORGETPASSWORD)}>
              {t(`forget`)}
            </span>
            </p>
            
          </span>
        </div>
      </Input>
      <SubmitButton name={t(`signIn`)} disabled={btnDisabled} loading={loading} />
    </RegisterForm>
  );
};

export default UserLogin;

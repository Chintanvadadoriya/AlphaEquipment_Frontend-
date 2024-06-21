import { AuthScreenWrapper, PageDetails, UserRegister } from "@components";

import { useTranslation } from "react-i18next";

const Register = () => {
  const { t, i18n } = useTranslation();
  const metaDetail = {
    title: t("siteName"),
    desc: t("description"),
  };

  return (
    <>
      <PageDetails metaDetail={metaDetail} />
      <AuthScreenWrapper>
        <UserRegister />
      </AuthScreenWrapper>
    </>
  );
};

export default Register;

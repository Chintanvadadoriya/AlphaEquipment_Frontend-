import { PageDetails, ProfileBar } from "@components";
import { CommonWrapper } from "@style";
import Footer from "../../components/Common/Footer";
import Header from "../../components/Common/Header";
import Button from "react-bootstrap/Button";
import { Input } from "@components";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { Container } from "react-bootstrap";

const Profile = () => {
  // constant
  const { t, i18n } = useTranslation();
  const metaDetail = {
    title: t("profile"),
    desc: t("profilePage"),
  };
  const [show, setShow] = useState(false);

  return (
    <>
      <Header />
      <PageDetails metaDetail={metaDetail} />
      <CommonWrapper>
        <Container>
          <ProfileBar isBuyer={true} />
        </Container>
      </CommonWrapper>
      <Footer />
    </>
  );
};

export default Profile;

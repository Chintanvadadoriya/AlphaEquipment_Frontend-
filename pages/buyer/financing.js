import { AuthScreenWrapper, Header, Footer, PageDetails, SocialLoginButton, UserLogin, MainForm } from "@components";
import { AuthOption, HeadingContainer, FinancingIndex } from "@style";
import { useState } from "react";
import CommonStep from "../../components/MultiStepForm/CommonStep";
import { Container } from "react-bootstrap";
import FinancingModal from "../../components/Popups/Models/FinancingModal";
const Financing = () => {
  const [activeStep, setActiveStep] = useState(0);


  const metaDetail = {
    title: "Financing",
    desc: "Financing page",
  };

  return (
    <>
      <PageDetails metaDetail={metaDetail} />
      <Header />
      <Container>
        <FinancingIndex>
          <div className="common-box">
            <FinancingModal />
            <CommonStep activeStep={activeStep}  setActiveStep={setActiveStep}/>
            <MainForm activeStep={activeStep}  setActiveStep={setActiveStep}/>
          </div>
        </FinancingIndex>
      </Container>
      <Footer />
    </>
  );
};

export default Financing;

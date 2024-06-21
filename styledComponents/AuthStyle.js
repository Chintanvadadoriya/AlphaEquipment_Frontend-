import styled from "styled-components";
import css from "styled-jsx/css";
import { BrotherFont, fontLato } from "./fontStyle";
import { themeColor } from "./theme";


const contentCenterStyle = css`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const AuthScreen = styled.main`
  height: 100vh;
  display: flex;
  overflow-y: hidden;
  .image-container {
    flex-basis: 60%;
    position: relative;
    .overlay {
      overflow-y: auto;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: rgba(2, 2, 2, 0.2);
      z-index: 1;
    }

    .hero-image {
      .logo {
        /* position: absolute;
        top: 20;
        left: 0; */
      }
      .image {
        object-fit: cover;
        width: 100% !important;
        position: unset !important;
        height: 100vh !important;
      }
      .logo-auth {
        padding: 0px;
        position: absolute;
        top: 30px;
        left: 60px;
      }
      @media (max-width: 820px) {
        display: none;
        .image {
          object-fit: fill;
        }
      }
    }

    @media (max-width: 820px) {
      display: none;
    }
  }
  .contaent-container {
    flex-basis: 40%;
    overflow-y: auto;
    @media (max-width: 820px) {
      flex: 1;
    }
  }
`;

export const HeadingContainer = styled.div`
  text-align: center;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  h1 {
    margin-top: 70px;
    /* color: #f18805; */
    font-weight: 800;
    font-size: 32px;
    ${fontLato}
    line-height: 45px;
  }
  @media (max-width: 820px) {
    height: 100px;
  }
`;

export const RegisterForm = styled.form`
  /* margin: ${(props) => `${props.marginTop || "80px"} auto 0`}; */
  margin: 80px auto 0;
  ${contentCenterStyle} @media (max-width: 820px) {
    margin: ${(props) => `${props.marginTop || "5%"} auto 0`};
    width: 85%;
  }
  .msg {
    margin: 20px;
    text-align: center;
    ${BrotherFont}
    color: ${themeColor.gray600};
    span {
      color: ${themeColor.themePrimary};
    }
  }
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    ${BrotherFont}
    color: ${themeColor.black1000};
    margin-bottom: 1px;
  }
  .react-tel-input {
    margin-top: 7px;
    margin-bottom: 15px;
    .special-label {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      ${BrotherFont}
      font-style: normal;
      color: ${themeColor.black1000};
      left: 0px;
      top: 0px;
      margin-bottom: 8px;
    }
    .form-control {
      margin: 6px 0px 2px;
      background-color: rgba(217, 217, 217, 0.1);
      outline: none;
      border: 1px solid ${themeColor.gray400};
      border-radius: 10px;
      padding: 12px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      font-family: "Brother 1816";
      font-style: normal;
      outline: none;
      height: 54px;
      padding-left: 45px;
      outline: none;
      box-shadow: none;
      width: 100%;
      /* color: #0e191e; */
      color: ${themeColor.black1000};
      ::placeholder {
        color: ${themeColor.gray600};
      }
    }
    .flag-dropdown {
      border-radius: 10px 0 0 10px !important;
      background: none !important;
      height: 54px;
      top: 24px;
      .selected-flag {
        background: none !important;
        position: relative;
        height: 49px;
      }
    }
    .special-label {
      position: relative;
      display: block;
    }
  }
  .phoneError {
    color: ${themeColor.red};
  }
  .common-select {
    margin-bottom: 15px;
    .form-select {
      background-color: rgba(217, 217, 217, 0.1);
      outline: none;
      border: 1px solid ${themeColor.gray400};
      border-radius: 10px;
      padding: 14px;
      margin: 6px 0px 2px;
      ${BrotherFont}
      outline: none;
      box-shadow: none;
    }
  }
  .forgot-reset-block {
    margin-top: 8px;
    .msg {
      margin: 0px;
      height: auto;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: ${themeColor.gray700};
      p {
        margin: 0px;
      }
    }
  }
`;

export const AuthOption = styled.div`
  ${contentCenterStyle}
  margin: 5px auto;
  .or {
    margin: 20px 0;
    ${fontLato}
    line-height: 16px;
    color: ${themeColor.gray900};
    font-weight: 700;
  }
  .continueWith {
    margin: 20px 0;
    ${fontLato}
    line-height: 16px;
    font-weight: 400;
    color: ${themeColor.gray800};
  }
  .text-center {
    text-align: center;
  }
  .authOption {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;

    @media (max-width: 820px) {
      width: 100%;
    }
  }
  .signupLink {
    text-align: center;
    margin: 15px 0;
    ${BrotherFont}
    color: ${themeColor.gray700};
    font-weight: 400;
    .link {
      text-decoration: none;
      color: ${themeColor.themePrimary};
    }
  }
  @media (max-width: 820px) {
    width: 80%;
  }
`;

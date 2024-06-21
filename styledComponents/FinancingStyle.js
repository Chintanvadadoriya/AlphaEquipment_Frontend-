import styled from "styled-components";
import { themeColor } from "./theme";

export const FinancingIndex = styled.div`
  /* common scss */

  .common-box {
    border: 1px solid ${themeColor.gray331};
    padding: 40px 40px 20px;
    margin: 50px 0 60px;
    @media (max-width: 768px) {
      font-size: 20px;
      line-height: 24px;
      padding: 20px;
      margin: 20px 10px;
    }
  }
  .title-section {
    h1 {
      font-size: 32px;
      line-height: 32px;
      font-weight: 700;
      color: ${themeColor.themePrimary};
      margin-bottom: 20px;
      @media (max-width: 768px) {
        font-size: 22px;
        line-height: 26px;
      }
    }
    p {
      font-size: 18px;
      line-height: 25px;
      font-weight: 400;
      margin-bottom: 12px;
      @media (max-width: 768px) {
        font-size: 16px;
        line-height: 20px;
      }
    }
    h5 {
      font-size: 24px;
      font-weight: 500;
      line-height: 25px;
      color: ${themeColor.black900};
      text-align: center;
      margin-bottom: 40px;
      @media (max-width: 768px) {
        font-size: 20px;
        line-height: 22px;
        margin-bottom: 20px;
      }
    }
    h6 {
      font-size: 24px;
      line-height: 25px;
      font-weight: 700;
      color: ${themeColor.themePrimary};
      margin-bottom: 33px;
      @media (max-width: 768px) {
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 15px;
      }
    }
    .title-box {
      .title {
        h2 {
          font-size: 24px;
          font-weight: 700;
          line-height: 32px;
          color: ${themeColor.themePrimary};
          margin-bottom: 20px;
          @media (max-width: 768px) {
            font-size: 18px;
            line-height: 22px;
          }
        }
      }
    }
    .fi-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      .fi-box-detail {
        margin: 8px 0 40px;
        text-align: center;
        max-width: 350px;
        width: 100%;
        @media (max-width: 768px) {
          margin: 8px 0 20px;
        }
        figure {
          margin-bottom: 16px;
        }
        h3 {
          font-size: 18px;
          line-height: 24px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        p {
          font-size: 16px;
          font-weight: 400;
          line-height: 20px;
          margin-bottom: 0;
        }
      }
    }
    .common-title {
      margin-bottom: 28px;
    }
    .progress-bar {
      margin-bottom: 20px;
    }
  }
  .form-detail {
    max-width: 420px;
    width: 100%;
    .form-select {
      font-size: 15px;
      line-height: 20px;
      background: rgba(217, 217, 217, 0.1);
      border: 1px solid ${themeColor.gray400};
      border-radius: 10px;
      padding: 12px 15px;
      color: ${themeColor.gray600};
      @media (max-width: 768px) {
        padding: 8px 15px;
      }
      option {
        color: ${themeColor.gray600};
        font-weight: 300;
      }
      &:focus {
        box-shadow: none;
      }
      &::placeholder {
        font-weight: 400;
        color: ${themeColor.gray600};
      }
    }
    label {
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      color: ${themeColor.black1000};
      @media (max-width: 400px) {
        font-size: 14px;
      }
    }
    input {
      font-size: 15px;
      line-height: 20px;
      background: rgba(217, 217, 217, 0.1);
      border: 1px solid ${themeColor.gray400};
      border-radius: 10px;
      padding: 12px 15px;
      @media (max-width: 768px) {
        padding: 8px 15px;
      }
      &:focus {
        box-shadow: none;
      }
      &::placeholder {
        font-weight: 400;
        color: ${themeColor.gray600};
      }
      &:hover,
      &:focus {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          appearance: none;
        }
      }
      &[type="number"] {
        appearance: textfield;
      }
    }
    span {
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      color: ${themeColor.gray600};
      margin-bottom: 8px;
    }
  }
  .drop-arrow {
    position: relative;
    &::after {
      content: "";
      background-image: url("../assets/icons/drop-icon.svg");
      background-repeat: no-repeat;
      position: absolute;
      top: 42px;
      right: 10px;
      width: 25px;
      height: 18px;
    }
  }
  .btn-submit {
    display: flex;
    justify-content: center;
    .bg-gray {
      background-color: ${themeColor.gray333};
      color: ${themeColor.gray795};
    }
    button {
      font-size: 16px;
      line-height: 16px;
      font-weight: 700;
      margin-top: 52px;
      max-width: 161px;
      width: 100%;
      margin-left: 21px;
      @media (max-width: 768px) {
        font-size: 13px;
        line-height: 15px;
      }
    }
  }
  h4 {
    font-size: 18px;
    line-height: 25px;
    font-weight: 500;
    color: ${themeColor.black900};
    margin-bottom: 21px;
    @media (max-width: 768px) {
      font-size: 16px;
      line-height: 18px;
    }
  }
  .terms-checkbox {
    margin-top: 21px;
    max-width: 420px;
    width: 100%;
    input {
      margin-top: 0;
      box-shadow: none;
      border: 2px solid ${themeColor.gray332};
      &:checked {
        background-color: ${themeColor.themePrimary};
        border-color: ${themeColor.themePrimary};
      }
    }
    small {
      font-size: 18px;
      font-weight: 400;
      line-height: 20px;
      color: ${themeColor.gray796};
      padding-left: 8px;
      @media (max-width: 768px) {
        font-size: 16px;
        line-height: 18px;
      }
      span {
        color: ${themeColor.blue750};
      }
    }
  }
  /* common scss end*/
  .step-one-section {
    font-family: "Brother 1816";
    .step-one-form {
      @media (max-width: 768px) {
        max-width: 420px;
        width: 100%;
        margin: 0 auto;
      }
      .form-detail {
        label {
          font-weight: 400;
        }
      }
      p {
        font-size: 19px;
        font-weight: 400;
        line-height: 25px;
        margin-bottom: 40px;
      }
    }
    .terms-checkbox {
      padding-left: 100px;
      @media (max-width: 1400px) {
        padding-left: 0;
      }
    }
    .btn-submit {
      button {
        max-width: 343px;
        width: 100%;
        margin-left: 0;
      }
    }
  }
  .step-two-section {
    font-family: "Brother 1816";
    .step-one-form {
      h6 {
        font-size: 18px;
        line-height: 25px;
        font-weight: 500;
        color: ${themeColor.themePrimary};
        margin-bottom: 18px;
      }
    }
    .step-two-form {
      .form-detail {
        label {
          font-size: 16px;
          font-weight: 500;
          line-height: 16px;
          color: ${themeColor.black1000};
        }
      }
    }
    .form-detail {
      label {
        font-size: 18px;
        font-weight: 500;
        line-height: 20px;
        color: ${themeColor.black1000};
        @media (max-width: 768px) {
          font-size: 16px;
        }
        @media (max-width: 400px) {
          font-size: 14px;
        }
      }
    }
    .terms-checkbox {
      margin: 0 0 24px;
      .checkbox {
        display: flex;
        align-items: baseline;
        margin-bottom: 14px;
        input {
          box-shadow: none;
          border: 2px solid ${themeColor.themePrimary};
          border-radius: 50%;
          width: 18px;
          height: 18px;
          &:checked {
            background-color: ${themeColor.themePrimary};
            border-color: ${themeColor.themePrimary};
          }
        }
        h6 {
          font-size: 18px;
          font-weight: 400;
          line-height: 24px;
          color: ${themeColor.gray808};
          margin-left: 8px;
          margin-bottom: 0;
          /* @media (max-width: 768px) {
            font-size: 16px;
            line-height: 18px;
          } */
        }
      }
    }
    .step-two-img {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .btn-submit {
      button {
        margin-top: 28px;
      }
    }
    small {
      display: block;
      font-size: 16px;
      font-weight: 400;
      line-height: 18px;
      color: ${themeColor.gray796};
    }
  }
`;

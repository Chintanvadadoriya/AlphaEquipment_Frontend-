import styled from "styled-components";
import { themeColor } from "./theme";

export const CalculatorIndex = styled.div`
  background: ${themeColor.white};
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 0 0 20px;
  margin: 40px 0;
  @media (max-width: 768px) {
    padding: 0;
    margin: 25px 0;
  }
  &.select-section {
    padding: 0 15px;
  }
  .calculator-tital {
    padding: 40px 0;
    @media (max-width: 768px) {
      padding: 15px 0 0;
    }
    h1 {
      font-size: 36px;
      line-height: 40px;
      font-weight: 700;
      text-align: center;
      color: ${themeColor.themePrimary};
      margin-bottom: 20px;
      @media (max-width: 768px) {
        font-size: 20px;
        line-height: 24px;
      }
    }
    p {
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
      color: ${themeColor.gray865};
      @media (max-width: 768px) {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
  .calculator-select {
    margin-bottom: 40px;

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
    .form-select {
      font-size: 16px;
      font-weight: 400;
      line-height: 16px;
      color: ${themeColor.black1000};
      padding: 10px;
      background: rgba(217, 217, 217, 0.1);
      border: 1px solid ${themeColor.gray400};
      border-radius: 10px;
      &:focus {
        box-shadow: unset;
      }
      &:hover {
        border-color: none;
      }
    }
    .form-label {
      font-size: 16px;
      font-weight: 400;
      line-height: 16px;
      color: ${themeColor.black1000};
      margin-bottom: 6px !important;
      white-space: nowrap;
    }
    .form-control {
      font-size: 16px;
      font-weight: 400;
      line-height: 16px;
      color: ${themeColor.black1000};
      margin-bottom: 6px;
      background: rgba(217, 217, 217, 0.1);
      border: 1px solid ${themeColor.gray400};
      border-radius: 10px;
      &:focus-visible {
        box-shadow: unset;
      }
      &:hover {
        border-color: none;
      }
    }
    &::placeholder {
      color: ${themeColor.gray600};
    }
  }
  .dropdown-arrow {
    position: relative;
    &:after {
      content: "";
      background-image: url("../assets/icons/dropdown-icon.svg");
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      top: 38px;
      right: 5px;
      width: 20px;
      height: 15px;
    }
  }
  .bg-calculate {
    max-width: 212px;
    width: 100%;
    margin: 0 auto;
    font-size: 20px;
    line-height: 26px;
    padding: 11px 0;
    margin-bottom: 30px;

    &:hover {
      background-color: ${themeColor.themePrimary};
    }
    @media (max-width: 768px) {
      max-width: 125px;
      font-size: 14px;
      line-height: 18px;
      padding: 7px 0;
    }
  }
  .caclulater-img {
    max-width: 342px;
    width: 100%;
    margin: 0 auto;
  }
  .caclulater-detail {
    padding-top: 0;
    @media (max-width: 768px) {
      margin-top: 15px;
    }
    h3 {
      font-size: 28px;
      line-height: 30px;
      font-weight: 700;
      color: ${themeColor.themePrimary};
      margin-bottom: 12px;
      @media (max-width: 768px) {
        font-size: 20px;
        line-height: 24px;
      }
    }
    h4 {
      font-size: 24px;
      line-height: 20px;
      font-weight: 500;
      color: ${themeColor.gray865};
      margin-bottom: 38px;
      @media (max-width: 768px) {
        font-size: 18px;
        line-height: 22px;
        margin-bottom: 20px;
      }
    }
    p {
      font-size: 15px;
      line-height: 24px;
      font-weight: 400;
      color: ${themeColor.gray865};
      span {
        color: ${themeColor.blue290};
      }
    }
    h6 {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: ${themeColor.gray791};
      text-align: center;
      font-style: italic;
    }
  }
  .calculator-box {
    padding: 20px;
    display: flex;
    border: 1px solid ${themeColor.gray331};
    margin-bottom: 19px;
    @media (max-width: 768px) {
      display: block;
      padding: 15px;
    }
    figure {
      text-align: center;
      img {
        border-radius: 5px;
      }
    }
    .cal-box-detail {
      padding-left: 16px;
      @media (max-width: 768px) {
        padding-left: 0;
      }
      h3 {
        font-size: 24px;
        line-height: 30px;
        font-weight: 600;
        margin-bottom: 18px;
        @media (max-width: 768px) {
          font-size: 18px;
          line-height: 22px;
        }
      }
      .cal-location {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      h4 {
        font-size: 20px;
        line-height: 25px;
        font-weight: 500;
        color: ${themeColor.gray796};
        margin-bottom: 10px;
        @media (max-width: 768px) {
          font-size: 18px;
          line-height: 22px;
        }
        span {
          color: ${themeColor.gray950};
        }
      }
      h6 {
        font-size: 20px;
        line-height: 25px;
        font-weight: 600;
        margin-bottom: 12px;
        @media (max-width: 768px) {
          font-size: 18px;
          line-height: 22px;
        }
        span {
          font-weight: 400;
        }
      }
      p {
        font-size: 22px;
        line-height: 22px;
        font-weight: 700;
        color: ${themeColor.themePrimary};
        margin-bottom: 0;
        @media (max-width: 768px) {
          font-size: 20px;
          line-height: 24px;
        }
      }
    }
  }
  h2 {
    font-size: 36px;
    line-height: 40px;
    font-weight: 700;
    color: ${themeColor.themePrimary};
    text-align: center;
    padding: 20px 0;
    @media (max-width: 768px) {
      font-size: 24px;
      line-height: 28px;
      padding: 15px 0 0;
    }
  }
`;

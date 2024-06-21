import styled from "styled-components";
import { themeColor } from "./theme";

export const FaqsIndex = styled.div`
  border: 1px solid ${themeColor.gray331};
  margin: 50px 0;
  padding: 0 40px;
  @media (max-width: 768px) {
    padding: 0 15px;
  }
  h1 {
    font-size: 38px;
    line-height: 46px;
    font-weight: 700;
    color: ${themeColor.themePrimary};
    text-align: center;
    padding: 40px 0;
    @media (max-width: 768px) {
      font-size: 24px;
      line-height: 28px;
      padding: 20px 0;
    }
  }
  h2 {
    font-size: 28px;
    line-height: 30px;
    font-weight: 700;
    color: ${themeColor.themePrimary};
    margin-bottom: 20px;
    @media (max-width: 768px) {
      font-size: 18px;
      line-height: 22px;
      margin-bottom: 10px;
    }
  }
  .accordion {
    border: none;
    margin-bottom: 40px;
    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
    .accordion-item {
      border: none;
      .accordion-header {
        font-size: 18px;
        line-height: 22px;
        font-weight: 700;
        border-bottom: 3px solid rgba(205, 214, 218, 0.25);
        padding: 16px 0;
        margin-bottom: 0;
        &:hover {
          color: transparent;
        }
        .accordion-button {
          padding: 0;
          position: relative;
          &:hover {
            background-color: transparent;
          }
          &:focus {
            box-shadow: none;
          }

          &:after {
            display: none;
          }
          &:before {
            content: "+";
            font-size: 25px;
            color: ${themeColor.black850};
            position: absolute;
            right: 0;
          }
        }
        .accordion-button:not(.collapsed) {
          color: ${themeColor.black};
          background-color: unset;
          box-shadow: unset;

          &:before {
            content: "-";
            font-size: 35px;
            color: ${themeColor.black850};
            position: absolute;
            right: 0;
          }
        }
      }
      .accordion-body {
        font-size: 15px;
        font-weight: 500;
        line-height: 22px;
        color: ${themeColor.black};
        padding: 10px 0;
      }
    }
  }
`;

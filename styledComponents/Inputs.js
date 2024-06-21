import styled from "styled-components";
import { BrotherFont, LateefFont } from "./fontStyle";
import { ThemeColor, ThemeBalck, ThemeGrayInput, themeColor } from "./theme";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 10px;
  width: ${(props) => props.width || "100%"};
  input {
    margin: 6px 0px 2px;
    background-color: rgba(217, 217, 217, 0.1);
    outline: none;
    border: 1px solid ${themeColor.gray400};
    border-radius: 10px;
    padding: 12px;
    font-style: normal;
    font-weight: 300;
    ${ThemeBalck}
    font-size: 15px;
    ${BrotherFont}
    ::placeholder {
      ${ThemeGrayInput}
    }
  }
  .error-msg {
    /* height: 20px; */
    color: ${themeColor.red};
    ${BrotherFont}
    font-weight: 400;
    font-size: 13px;
  }
  .msg {
    margin: 0;
    text-align: end;
    display: flex;
    justify-content: flex-end;
    .forgot-msg {
      margin-right: 10px;
    }
    ${BrotherFont}
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: ${themeColor.gray700};
    .link {
      text-decoration: none;
      color: ${themeColor.themePrimary};

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export const OtpInputContainer = styled.div`
  display: flex;
  justify-content: space-around;
  input {
    height: 50px;
    width: 50px;
    outline: none;
    background: ${themeColor.gray400};
    border: 1px solid ${themeColor.gray400};
    border-radius: 10px;
    ${LateefFont};
    font-weight: 400;
    font-size: 32px;
    line-height: 32px;
    text-align: center;

    &::placeholder {
      font-weight: 400;
      color: ${themeColor.gray600};
    }
    &:focus {
      box-shadow: none;
    }
    &:focus-visible {
      outline: none;
    }
    &:hover,
    &:focus {
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
    &[type="number"] {
      -moz-appearance: textfield;
    }
  }
`;

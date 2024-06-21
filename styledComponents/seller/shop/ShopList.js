import styled from 'styled-components';
import { themeColor } from 'styledComponents/theme';
import {fontLato, BrotherFont, Urbanist} from './../../fontStyle';

export const TopBLockProfileShop = styled.div`
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${themeColor.gray302};
  position: relative;
  border: 1px solid ${themeColor.gray302};
  .tab-block-shop {
    .react-tabs__tab-list {
      border-bottom: none ;
      margin-bottom: 0px;
      .react-tabs__tab {

        border:1px solid transparent;
        margin-right: 15px;
        background-color: transparent;
        color:${themeColor.gray875};
        font-weight: 700;
        font-size: 16px;
        line-height: 16px;
        ${fontLato}
        text-transform: uppercase;
        padding: 11px 15px;
        border-radius: 0;
        transition: 0.5s;
        bottom: 1px;
        position: relative;
        &::after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: transparent;
          transition: all 0.3s ease;
        }

        &.react-tabs__tab--selected {
          &::after{
            width: 100%;
            background-color: ${themeColor.gray878};
          }
        }
      }


    }
  }
  .input-group-block {
    display: flex;
    width: auto;
    .from-group-input-inner {
      position: relative;
    }
    .input-group-block-inner {
      position: relative;
      height: 38px;
      &:before {
        content: "";
        position: absolute;
        right: 15px;
        z-index: 11;
        display: block;
        width: 9px;
        height: 9px;
        border-top: 1px solid ${themeColor.white};
        border-left: 1px solid ${themeColor.white};
        transform: rotate(-135deg);
        top: 11px;
      }
    }
    .form-select {
      background-color: ${themeColor.themePrimary};
      color: ${themeColor.white};
      outline: none;
      box-shadow: none;
      border-bottom-right-radius: 0px !important;
      border-top-right-radius: 0px !important;
      border-radius: 5px;
      width: auto;
      background-image: none;
      font-size: 16px;
      line-height: 16px;
      height: 38px;
      ${BrotherFont}
      border: none;
    }
    .from-group-input {
      position: relative;
      .from-group-input-inner {
        .form-control {
          width: 300px;
          border-radius: 5px;
          border-bottom-left-radius: 0px;
          border-top-left-radius: 0px;
          height: 38px;
          padding: 12px;
          font-weight: 400;
          font-size: 16px;
          ${BrotherFont}
          color: ${themeColor.gray450};
          outline: none;
          box-shadow: none;
          border: 1px solid ${themeColor.gray451};
          &::-webkit-input-placeholder {
            /* Edge */
            color: ${themeColor.gray450};
          }

          &:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: ${themeColor.gray450};
          }

          &::placeholder {
            color: ${themeColor.gray450};
          }
        }
      }
      button {
        position: absolute;
        top: 0px;
        right: 0px;
        background: transparent;
        border: none;
        outline: none;
        box-shadow: none;
        svg {
          fill: ${themeColor.gray420};
          width: 26px;
          height: 26px;
        }
      }
    }
  }
  .button-common {
    ${BrotherFont}
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    background-color: ${themeColor.themePrimary} !important;
    border-radius: 5px;
    font-style: normal;
    padding: 10px 15px 6px 15px;
    border: none;
    color: ${themeColor.white};
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 25px;
      line-height: 25px;
      padding-right: 10px;
    }
  }
  /* .input-group {
    width: auto;
    .form-select {
      background-color: ${themeColor.themePrimary};
      width: auto;
    }
    .form-control {
      width: auto;
    }
    svg {
      height: 2em;
      width: 2em;
      position: absolute;
      right: 0%;
      z-index: 5;
    }
  }
  h3 {
    margin: 0px;
    padding: 0px;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    color: ${themeColor.gray875};
    position: relative;
    ${fontLato}
    &:before {
      content: "";
      position: absolute;
      bottom: -22px;
      border: 1px solid ${themeColor.gray878};
      left: 0px;
      width: 100%;
    }
  }
  .button-common {
    ${BrotherFont}
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    background-color: ${themeColor.themePrimary} !important;
    border-radius: 5px;
    font-family: "Click Brother", sans-serif;
    font-style: normal;
    padding: 8px 36px;
    border: none;
    box-shadow: none;
  } */
`;

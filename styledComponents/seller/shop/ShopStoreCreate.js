import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import { fontLato, BrotherFont, Urbanist } from "../../fontStyle";
import { themeColor } from "styledComponents/theme";

export const CommonBlockContent = styled.div`
  background-color: ${themeColor.white};
  position: relative;
  border-radius: 5px;
  /* height: 100%; */
`;
export const TopContentCommon = styled.div`
  border: 1px solid ${themeColor.gray302};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  &.border-less-title {
    border: none;
    padding-bottom: 0px;
    h3 {
      &:before {
        content: none;
      }
    }
  }

  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: ${themeColor.gray875};
    position: relative;
    margin: 0;
    display: inline-block;
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
  /* button {
    width: 10%;
  } */
  .input-group-block-custom {
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
`;
export const CommonMiddleContent = styled.div`
  padding: 30px 20px 28px 20px;
  .shop-block-main {
    h3 {
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      color: ${themeColor.themePrimary};
      ${fontLato}
      margin-bottom: 12px;
    }
    p {
      font-weight: 400;
      font-size: 18px;
      line-height: 25px;
      color: ${themeColor.black900};
      ${fontLato}
    }
  }
  .button-block-inner {
    padding-top: 10px;
    .button-block-main {
      padding-top: 60px;

      text-align: center;
      display: flex;
      flex-direction: column;
      width: 400px;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      button {
        background-color: ${themeColor.themePrimary};
        border-radius: 10px;
        font-weight: 700;
        font-size: 18px;
        line-height: 16px;
        text-transform: uppercase;
        color: ${themeColor.white};
        width: 100%;
        border: none;
        padding: 16px;
        margin-top: 20px;
      }
    }
    p {
      color: ${themeColor.red};
    }
    .react-tel-input {
      margin-top: 7px;
      margin-bottom: 15px;
      .special-label {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 18px;
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
        padding: 14px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        font-family: "Brother 1816";
        font-style: normal;
        outline: none;
        height: 44px;
        padding-left: 45px !important;
        outline: none;
        box-shadow: none;
        width: 100%;
        color: ${themeColor.black1000};
        ::placeholder {
          color: ${themeColor.gray600};
        }
      }
      .flag-dropdown {
        border-radius: 10px 0 0 10px !important;
        background: none !important;
        height: 44px;
        top: 26px;
        .selected-flag {
          background: none !important;
          position: relative;
          height: 41px;
        }
      }
      .special-label {
        position: relative;
        display: block;
      }
    }
    .profile-picture-block {
      h6 {
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: ${themeColor.gray875};
        font-weight: 700;
        margin-bottom: 15px;
      }
      .profile-picture-upload {
        position: relative;
        display: flex;
        width: 160px;
        height: 160px;
        @media (max-width: 1200px) {
          width: 130px;
          height: 130px;
        }
        img {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          object-fit: cover;
          @media (max-width: 1200px) {
            width: 130px;
            height: 130px;
          }
        }
        .input-type-block {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 27px;
          height: 27px;
          background-color: ${themeColor.white};
          box-shadow: 0px 0px 19px rgb(0 0 0 / 10%);
          position: absolute;
          bottom: 20px;
          right: 0px;
          border-radius: 50%;
          .file-input__input {
            height: 0;
            overflow: hidden;
            width: 0;
          }
          .file-input__label {
            border: none;
            vertical-align: middle;
            cursor: pointer;
            img {
              width: 15px;
              height: 15px;
            }
          }
        }
      }
    }
    .form-block-shop {
      margin: 15px -25px 0px;
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      .form-group {
        width: 50%;
        padding: 0px 25px;
        margin-bottom: 20px;
        .form-label {
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 16px;
          color: ${themeColor.black1000};
          margin-bottom: 10px;
          ${fontLato}
        }
        .form-control {
          margin: 6px 0px 2px;
          background-color: rgba(217, 217, 217, 0.1);
          outline: none;
          border: 1px solid ${themeColor.gray400};
          border-radius: 10px;
          padding: 10px 14px;
          font-weight: 400;
          font-size: 15px;
          line-height: 15px;
          font-style: normal;
          outline: none;
          box-shadow: none;
          color: ${themeColor.gray600};
          ${BrotherFont}
          ::-webkit-input-placeholder {
            /* Edge */
            color: ${themeColor.gray600};
          }

          :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: ${themeColor.gray600};
          }

          ::placeholder {
            color: ${themeColor.gray600};
          }
        }
      }
    }
    form {
      button {
        background-color: ${themeColor.themePrimary} !important;
        border-radius: 10px;
        font-weight: 700;
        font-size: 18px;
        line-height: 16px;
        text-transform: uppercase;
        color: ${themeColor.white};
        width: 345px;
        border: none;
        padding: 16px;
        margin: 20px auto;
        display: table;
      }
    }
  }
  .block-shop-table {
    .table-title {
      font-weight: 600;
      font-size: 22px;
      line-height: 30px;
      ${fontLato}
      color: ${themeColor.black800};
      margin-bottom: 25px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      border: none;
      thead {
        background-color: ${themeColor.white900};
        th {
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: ${themeColor.gray875};
          ${BrotherFont}
          padding: 10px;
          width: 15%;
          &:nth-child(1) {
            width: 5%;
          }
          &:nth-child(2) {
            width: 30%;
          }
        }
      }
      tbody {
        tr {
          border-bottom: 1px solid ${themeColor.gray302};
        }
        td {
          font-weight: 400;
          font-size: 15px;
          ${fontLato}
          line-height: 18px;
          padding: 16px 10px;
          color: ${themeColor.gray875};
          .badge-custom {
            background: ${themeColor.caribeengreen};
            border-radius: 23px;
            font-weight: 500;
            font-size: 12px;
            line-height: 12px;
            ${BrotherFont}
            color: ${themeColor.white};
            padding: 5px 9px 3px;
            &.used-badge {
              background: ${themeColor.blue300};
            }
          }
          .action-edit-delete {
            a {
              font-weight: 400;
              font-size: 15px;
              line-height: 18px;
              letter-spacing: 0.05em;
              color: ${themeColor.blue500};
              margin-right: 24px;
            }
          }
          span {
            &.pending-process {
              color: ${themeColor.red900};
            }
            &.completed-process {
              color: ${themeColor.green500};
            }
          }
          .link-view-block {
            color: ${themeColor.blue500};
            letter-spacing: 0.05em;
            ${BrotherFont}
          }
        }
      }
      &.table-row-block-number {
        th {
          &:nth-child(1) {
            width: 15%;
          }
          &:nth-child(2) {
            width: 25%;
          }
        }
      }
      &.table-block-rent {
        th {
          &:nth-child(2) {
            width: 15%;
          }
        }
        td {
          .link-view-block {
            margin-right: 25px;
          }
        }
      }
      &.table-block-buy {
        th {
          &:nth-child(2) {
            width: 70%;
          }
        }
        td {
          .link-view-block {
            margin-right: 25px;
          }
        }
      }
      &.table-block-action {
        th {
          &:nth-child(2) {
            width: 55%;
          }
          &:nth-child(3) {
            width: 25%;
          }
        }
      }
    }
  }
  .product-title-block {
    text-align: center;
    p {
      font-size: 18px;
      line-height: 22px;
      color: ${themeColor.black900};
      ${BrotherFont}
      margin-bottom: 25px;
    }
    .block-product-step {
      h6 {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: ${themeColor.black900};
        margin-top: 12px;
        ${fontLato}
        margin-bottom: 0px;
      }
    }
  }
  .wallet-block {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .wallet-block-left {
      background-color: ${themeColor.white};
      box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding: 15px 40px 20px 15px;
      p {
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: ${themeColor.black};
        margin-bottom: 15px;
        ${BrotherFont}
      }
      h4 {
        font-weight: 800;
        font-size: 34px;
        line-height: 40px;
        color: ${themeColor.themePrimary};
        ${fontLato}
      }
    }
    .wallet-block-right {
      margin-left: 30px;
    }
  }
  .button-main-common {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    padding: 10px 20px;
    background-color: ${themeColor.orange700};
    border-radius: 4px;
    border: none;
    ${BrotherFont}
  }
  .edit-rent-block {
    padding: 0px 15px 60px 15px;
    display: flex;
    align-items: center;
    .img-block {
      width: 219px;
      img {
        border-radius: 10px;
        object-fit: cover;
      }
    }
    .edit-content-block {
      width: 85%;
      padding-left: 12px;
      h2 {
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        color: ${themeColor.black};
        ${fontLato}
        margin-bottom: 12px;
      }
      p {
        font-weight: 500;
        font-size: 20px;
        line-height: 25px;
        ${fontLato}
        margin-bottom: 10px;
        span {
          color: ${themeColor.gray796};
        }
      }
      h3 {
        font-weight: 700;
        font-size: 22px;
        line-height: 22px;
        color: ${themeColor.themePrimary};
        ${fontLato}
      }
      .edit-content-block-inner {
        display: flex;
        justify-content: space-between;
        .edit-content-block-inner-second {
          text-align: right;
          h5 {
            color: ${themeColor.green600};
            font-weight: 700;
            font-size: 20px;
            ${fontLato}
            line-height: 25px;
          }
        }
      }
    }
  }
`;
export const ShopForm = styled.div`
  background-color: ${themeColor.white};
  height: 810px;
  position: fixed;
  bottom: 28px;
  top: 140px;
  right: 24px;
  left: 264px;
  padding: 25px;

  div {
    display: inline-block;

    h5 {
      margin-top: 20px;
      color: ${themeColor.themePrimary};
    }
    p {
      margin-top: 20px;
    }
  }

  img {
    margin-top: 20px;
    margin-left: 460px;
  }
  button {
    margin-top: 460px;
    width: 348px;
    margin-left: -410px;
    color: ${themeColor.white};
    background-color: ${themeColor.themePrimary} !important;
    border-color: ${themeColor.themePrimary};
  }
`;
export const FormWrapper = styled.div`
  margin-top: 90px;

  h6 {
  }
  img {
    margin-top: 15px;
    margin-left: 95px;
  }
  form {
    margin-top: 16px;

    .FormAboveDiv {
      display: block;
      .FormInputEmail {
        margin-left: 200px;
      }
    }

    .FormInput {
      width: 500px;
    }
    button {
      margin-top: 150px;
      margin-left: -20px;
    }
  }
`;
export const StyleModal = styled(Modal)`
  width: 468px;

  position: fixed;

  top: 2%;
  left: 40%;

  .modal-content {
    h6 {
      margin-left: 50px;
      margin-top: 40px;
    }
    .modal-header {
      border: none;
      h5 {
        margin-top: 30px;
        margin-left: 173px;
      }
      button {
        border: none;

        margin-top: -30px;
      }
    }
  }

  form {
    margin-top: 40px;
    margin-left: 50px;
    .ModalInputWrapper {
      margin-left: 20px;
    }

    .ModalInput {
      width: 50px;
      display: inline-block;
      margin-left: 20px;
      background-color: ${themeColor.gray400};
    }
    button {
      display: block;
      margin-top: 54px;
      width: 348px;
      height: 48px;
      color: ${themeColor.gray701} !important;
      background-color: ${themeColor.gray321} !important;
      border-color: ${themeColor.gray321} !important;
    }
  }
  p {
    margin-left: 108px;
    margin-top: 8px;
    color: ${themeColor.gray600};
    margin-bottom: 30px;
    a {
      color: ${themeColor.themePrimary};
    }
  }
`;
export const StyleModalResponse = styled(Modal)`
  width: 363px;

  position: fixed;

  top: 2%;
  left: 40%;

  .modal-content {
    .modal-header {
      img {
        margin-left: 120px;
        margin-top: -200px;
      }
      div {
        margin-top: 260px;
        margin-left: -100px;
        h5 {
          color: ${themeColor.green200};
        }
        p {
          color: ${themeColor.gray799};
        }
        button {
          background-color: ${themeColor.themePrimary} !important;
          border-color: ${themeColor.themePrimary} !important;
        }
      }
    }
  }
`;

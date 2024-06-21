import styled from "styled-components";

// import { HomeMain } from "./homeStyle";
import { fontLato, BrotherFont, Urbanist } from "./fontStyle";
import Modal from "react-bootstrap/Modal";
import { themeColor } from "./theme";

export const CommonWrapper = styled.div`
  padding: 98px 0px 60px;
  position: relative;
  @media (max-width: 1400px) {
    padding: 50px 0px;
  }
`;
export const ProfileInner = styled.div`
  background-color: ${themeColor.white};
  box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.1);
  border-radius: 5px 5px 0px 5px;
`;
export const TopBLockProfile = styled.div`
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${themeColor.gray302};
  position: relative;
  h3 {
    margin: 0px;
    padding: 0px;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    color: ${themeColor.themePrimary};
    position: relative;
    ${fontLato}
    &:before {
      content: "";
      position: absolute;
      bottom: -19px;
      left: 0px;
      height: 1px;
      width: 100%;
      background-color: ${themeColor.themePrimary};
    }
  }
  .button-common {
    ${BrotherFont}
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    background-color: ${themeColor.themePrimary};
    border-radius: 5px;
    /* font-family: "Click Brother", sans-serif; */
    font-style: normal;
    padding: 8px 36px;
    border: none;
    box-shadow: none;
  }
`;
export const ProfileBlockInner = styled.div`
  padding: 38px 70px;
  @media (max-width: 1200px) {
    padding: 30px;
  }
  .profile-block-content {
    width: 88%;
    @media (max-width: 1400px) {
      width: 95%;
    }
    @media (max-width: 1200px) {
      width: 100%;
    }
  }
  .profile-block-main {
    .top-block-title {
      position: relative;
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      h3 {
        ${Urbanist}
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: ${themeColor.gray875};
      }
      img {
        position: relative;
        top: 0px;
        left: 5px;
      }
    }
    .profile-img-block {
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
  .left-profile-block {
    display: flex;
    margin-top: 50px;
    margin: 50px -60px 0px;
    @media (max-width: 1200px) {
      margin-top: 30px;
      margin: 30px -30px 0px;
    }
    .left-profile-form {
      padding: 0px 60px;
      width: 50%;
      @media (max-width: 1200px) {
        padding: 0px 30px;
      }
      .form-group {
        margin-bottom: 30px;
        label {
          ${BrotherFont}
          font-weight: 500;
          font-size: 18px;
          line-height: 18px;
          color: ${themeColor.black1000};
          margin-bottom: 10px;
          @media (max-width: 1200px) {
            font-size: 16px;
            line-height: 16px;
          }
        }
        input {
          margin: 0px;
          padding: 9px 14px;
        }
      }
      .phone-number-verify {
        margin: 0 auto 30px;
        display: table;
        width: 65%;
        @media (max-width: 1200px) {
          width: 100%;
        }
        .btn-primary {
          background-color: ${themeColor.themePrimary};
          border-radius: 10px;
          font-weight: 700;
          font-size: 16px;
          line-height: 16px;
          ${fontLato}
          font-style: normal;
          border: none;
          width: 100%;
          padding: 16px;
          text-transform: uppercase;
          @media (max-width: 1200px) {
            font-size: 14px;
            line-height: 14px;
          }
        }
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
          padding-left: 45px;
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
    }
  }
`;

export const ProfileForm = styled.form`
  .profile-block-content-form {
    .left-profile-block {
      .left-profile-form {
        .phone-number-verify {
          button {
            color: ${(props) => (props.checkBtn ? themeColor.gray701 : themeColor.white)};
            background-color: ${(props) => (props.checkBtn ? themeColor.gray321 : "${themeColor.themePrimary}")};
          }
        }
        .form-group {
          p {
            color: ${themeColor.red};
          }
        }
      }
    }
  }
  .change-delete-block {
    display: flex;
    margin: 0px -60px;
    @media (max-width: 1200px) {
      margin: 0px -30px;
    }
    .right-profile-block-left {
      padding: 0px 60px;
      @media (max-width: 1200px) {
        padding: 0px 30px;
      }
      .right-profile-block-left-right {
        background: ${themeColor.white};
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.09);
        border-radius: 10px;
        padding: 20px 20px;
        display: flex;
        align-items: start;
        @media (max-width: 1200px) {
          padding: 15px;
          img {
            width: 35px;
          }
        }
        .content-profile {
          padding-left: 15px;

          h3 {
            font-weight: 700;
            font-size: 20px;
            line-height: 25px;
            color: ${themeColor.black900};
            margin-bottom: 10px;
            ${fontLato}
            @media (max-width: 1200px) {
              font-size: 18px;
              line-height: 24px;
            }
          }
          p {
            font-weight: 350;
            font-size: 18px;
            line-height: 22px;
            color: ${themeColor.black900};
            margin: 0px;
            ${BrotherFont}
            @media (max-width: 1200px) {
              font-size: 16px;
              line-height: 22px;
            }
          }
        }
      }
    }
  }
`;

export const CommonModal = styled(Modal)`
  .modal-dialog {
    max-width: 480px;
    width: 100%;
    .modal-content {
      border-radius: 8px;
      border: none;
      .modal-header {
        text-align: center;
        position: relative;
        justify-content: center;
        background-color: ${themeColor.themePrimary};
        .modal-title {
          font-weight: 700;
          font-size: 24px;
          line-height: 29px;
          color: ${themeColor.white};
          ${fontLato}
        }
        .btn-close {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 20px;
          font-size: 10px;
          background-color: ${themeColor.white};
          opacity: 1;
          padding: 0px;
        }
      }
      .modal-body {
        padding: 25px;
        p {
          font-weight: 350;
          font-size: 16px;
          line-height: 22px;
          color: ${themeColor.black900};
          margin-bottom: 20px;
          ${BrotherFont}
        }
        .form-group {
          margin-bottom: 10px;
          p {
            color: ${themeColor.red};
          }
          &.mb-40 {
            margin-bottom: 40px;
          }
          label {
            ${BrotherFont}
            font-weight: 500;
            font-size: 18px;
            line-height: 18px;
            color: ${themeColor.black1000};
            margin-bottom: 10px;
          }
          input {
            margin: 0px;
            padding: 9px 14px;
            ${BrotherFont}
            font-style: normal;
            font-weight: 350;
            color: ${themeColor.gray600};
            &::placeholder {
              color: ${themeColor.gray600};
            }

            &:-ms-input-placeholder {
              color: ${themeColor.gray600};
            }

            &::-ms-input-placeholder {
              color: ${themeColor.gray600};
            }
          }
        }
        .delete-modal-content {
          border-bottom: 1px solid ${themeColor.gray331};
          padding-bottom: 10px;
          margin-bottom: 20px;

          .delete-noti {
            display: flex;
            align-items: center;
            p {
              font-weight: 700;
              font-size: 18px;
              line-height: 18px;
              margin: 0px;
              padding: 0px;
              color: ${themeColor.red990};
              padding-left: 12px;
              ${fontLato}
            }
          }
        }
        ul {
          margin: 0px;
          padding: 0px;
          list-style: none;
          li {
            padding-left: 55px;
            padding-right: 15px;
            position: relative;
            font-size: 16px;
            line-height: 22px;
            ${BrotherFont}
            color: ${themeColor.black750};
            padding-bottom: 10px;
            font-weight: 350;
            &:before {
              content: "";
              position: absolute;
              left: 35px;
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: ${themeColor.black750};
              top: 7px;
            }
          }
        }
        .modal-last-content {
          h4 {
            font-weight: 700;
            font-size: 18px;
            line-height: 25px;
            ${fontLato}
            color: ${themeColor.black};
            margin-bottom: 20px;
          }
        }
        .enter-verify {
          h4 {
            font-weight: 700;
            font-size: 22px;
            line-height: 25px;
            ${fontLato}
            margin-bottom: 12px;
            color: ${themeColor.themePrimary};
          }
          .form-verify-block {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px 0px;
            .form-group {
              width: 65px;
              padding: 0px 10px;
              input {
                text-align: center;
                background: ${themeColor.gray400};
                border: 2px solid ${themeColor.gray400};
                font-size: 25px;
                line-height: 26px;
                ${fontLato}
                font-weight: 500;
                color: ${themeColor.black};
                &::placeholder {
                  color: ${themeColor.black};
                }

                &:-ms-input-placeholder {
                  color: ${themeColor.black};
                }

                &::-ms-input-placeholder {
                  color: ${themeColor.black};
                }
                :focus {
                  border: 2px solid ${themeColor.gray425};
                }
              }
            }
          }
        }
        .modal-form-block {
          .form-group-block {
            .form-group-main {
              margin-bottom: 15px;
              .label-block {
                font-weight: 500;
                font-size: 18px;
                line-height: 18px;
                ${fontLato}
                font-style: normal;
                color: ${themeColor.black1000};
                margin-bottom: 10px;
              }
              input,
              textarea {
                background-color: rgba(217, 217, 217, 0.1);
                outline: none;
                border: 1px solid ${themeColor.gray400};
                border-radius: 10px;
                padding: 11px 14px;
                font-weight: 400;
                font-size: 15px;
                line-height: 15px;
                font-style: normal;
                outline: none;
                box-shadow: none;
                color: ${themeColor.gray600};
                font-style: normal;
                height: 45px;
                ${BrotherFont}
                font-style: normal;
              }
              textarea {
                height: auto;
              }
            }
          }
        }
        .pay-modal-block {
          h2 {
            font-weight: 700;
            font-size: 22px;
            line-height: 25px;
            ${fontLato}
            color: ${themeColor.themePrimary};
            margin-bottom: 10px;
          }
          p {
            font-weight: 350;
            font-size: 14px;
            line-height: 22px;
            color: ${themeColor.black900};
            ${BrotherFont}
            margin-bottom: 20px
          }
        }
        .datepiker-block-inner {
          padding: 0px 35px;
          .form-group-main {
            .label-block {
              font-weight: 500;
              font-size: 18px;
              line-height: 18px;
              ${fontLato}
              font-style: normal;
              color: ${themeColor.black1000};
              margin-bottom: 10px;
            }
            input {
              background-color: rgba(217, 217, 217, 0.1);
              outline: none;
              border: 1px solid ${themeColor.gray400};
              border-radius: 10px;
              padding: 11px 14px;
              font-weight: 350;
              font-size: 15px;
              line-height: 15px;
              font-style: normal;
              outline: none;
              box-shadow: none;
              color: ${themeColor.gray600};
              font-style: normal;
              height: 45px;
              ${BrotherFont}
              font-style: normal;
            }
          }
          h3 {
            font-weight: 700;
            font-size: 18px;
            line-height: 19px;
            color: ${themeColor.black};
            margin-bottom: 15px;
            ${fontLato}
          }
          .pay-table-block-inner {
            padding: 20px 0px 0px;
            .pay-table-inner-block {
              padding-left: 25px;
            }
            .pay-table-inner {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-bottom: 15px;

              h5 {
                font-size: 18px;
                line-height: 22px;
                text-transform: capitalize;
                color: ${themeColor.gray799};
                ${fontLato}
                margin: 0px;
              }
              p {
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                ${fontLato}
                color: ${themeColor.gray865};
                margin: 0px;
              }
              &.total-block-yellow {
                border-top: 1px solid ${themeColor.gray318};
                padding-top: 10px;
                h5 {
                  color: ${themeColor.themePrimary};
                  font-weight: 700;
                }
                p {
                  color: ${themeColor.themePrimary};
                }
              }
            }
          }
        }
      }
      .modal-footer {
        border: none;
        text-align: center;
        margin: 0 auto;
        padding: 0px 60px 40px 60px;
        width: 100%;
        .btn-primary {
          background-color: ${themeColor.themePrimary};
          border-radius: 10px;
          font-weight: 700;
          font-size: 16px;
          line-height: 16px;
          ${fontLato}
          font-style: normal;
          border: none;
          width: 100%;
          padding: 16px;
          text-transform: uppercase;
        }
        .delete-button {
          background-color: ${themeColor.red995};
          border-radius: 10px;
          font-weight: 700;
          font-size: 20px;
          line-height: 20px;
          ${fontLato}
          font-style: normal;
          border: none;
          width: 100%;
          padding: 16px;
          text-transform: uppercase;
        }
        div {
          width: 100%;
          color: ${themeColor.gray600};
          span {
            color: ${themeColor.themePrimary};
            cursor: pointer;
          }
        }
      }
    }
  }
  + .modal-backdrop {
    &.show {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
  &.diff-block-modal {
    .modal-body {
      padding: 55px 30px;
      text-align: center;
      .password-update-block {
        h3 {
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;
          letter-spacing: 0.015em;
          text-transform: uppercase;
          color: ${themeColor.themePrimary};
          ${fontLato}
          padding: 30px 0px 12px;
        }
        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          color: ${themeColor.gray799};
          ${fontLato}
        }
      }
    }
  }
  &.diff-delete-btn-block {
    .modal-dialog {
      .modal-content {
        border-radius: 18px;
        .modal-header {
          background-color: transparent;
          color: ${themeColor.black};
          border: none;
          .modal-title {
            color: ${themeColor.black};
            padding-top: 12px;
          }
          .btn-close {
            background-color: ${themeColor.black};
            top: 20px;
            &:before {
              content: "";
              position: absolute;
              height: 2px;
              width: 70%;
              top: 50%;
              left: 0;
              margin-top: -1px;
              background: ${themeColor.white};
              transform: rotate(45deg);
              left: 3px;
            }
            &:after {
              content: "";
              position: absolute;
              height: 2px;
              width: 70%;
              top: 50%;
              left: 0;
              margin-top: -1px;
              background: ${themeColor.white};
              transform: rotate(-45deg);
              left: 3px;
            }
          }
        }
        .delete-content-block {
          p {
            font-weight: 400;
            font-size: 18px;
            line-height: 22px;
            text-align: center;
            color: ${themeColor.black};
            ${fontLato}
          }
        }
        .button-content-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .btn-primary {
            width: 94px;
            height: 31px;
            border-radius: 5px;
            padding: 5px;
            &.cancel-btn {
              background: ${themeColor.red490};
            }
            &.confirm-btn {
              background: ${themeColor.green450};
            }
          }
        }
      }
    }
  }
  &.home-modal-block {
    .modal-dialog {
      .modal-content {
        .modal-header {
          &.modal-header-home {
            background-color: ${themeColor.themePrimary};
            .modal-title {
              padding-top: 0px;
              color: ${themeColor.white};
            }
            .btn-close {
              background-color: ${themeColor.white};
              &:before {
                background-color: ${themeColor.black};
              }
              &:after {
                background-color: ${themeColor.black};
              }
            }
          }
        }
      }
      .tab-block-custom {
        padding: 0px 32px;
        .radion-check-block-payment {
          padding: 0px;
        }
        .nav-tabs {
          border: none;
          .nav-item {
            padding: 0px 10px;
            &:before {
              content: none;
            }
            button {
              border: 1px solid ${themeColor.themePrimary};
              border-radius: 10px;
              color: ${themeColor.themePrimary};
              font-weight: 400;
              font-size: 18px;
              line-height: 20px;
              background: transparent;
              padding: 9px 22px;
              ${fontLato}
              font-style: normal;
              &.active {
                background-color: ${themeColor.themePrimary};
                color: ${themeColor.white};
              }
            }
          }
        }
        .plus-button {
          background-color: ${themeColor.themePrimary};
          border-radius: 10px;
          color: ${themeColor.white};
          font-weight: 400;
          font-size: 28px;
          line-height: 28px;
          padding: 9px 22px;
          ${fontLato}
          font-style: normal;
          border: none;
          margin: 15px auto;
          display: table;
        }
        .form-block-new {
          .form-group-main {
            margin-bottom: 15px;
            .label-block {
              font-weight: 500;
              font-size: 18px;
              line-height: 18px;
              ${fontLato}
              font-style: normal;
              color: ${themeColor.black1000};
              margin-bottom: 10px;
            }
            input,
            .form-control {
              background-color: rgba(217, 217, 217, 0.1);
              outline: none;
              border: 1px solid ${themeColor.gray400};
              border-radius: 10px;
              padding: 11px 14px;
              font-weight: 400;
              font-size: 15px;
              line-height: 15px;
              font-style: normal;
              outline: none;
              box-shadow: none;
              color: ${themeColor.gray600};
              font-style: normal;
              height: 45px;
              ${BrotherFont}
              font-style: normal;
            }
          }
        }
      }
    }

    h3 {
      font-weight: 700;
      font-size: 22px;
      line-height: 25px;
      color: ${themeColor.themePrimary};
      ${fontLato}
      margin-bottom: 8px;
    }
    > p {
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      color: ${themeColor.black};
      margin-bottom: 16px;
      ${fontLato}
    }
    .services-modal-block {
      padding: 0px 52px 0px 52px;
      .services-modal-inner {
        background: ${themeColor.cream100};
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 16px;
        display: flex;
        align-items: flex-start;
        &:last-child {
          margin-bottom: 5px;
        }
        .services-content-block {
          width: 85%;
          padding-left: 10px;
          h3 {
            font-weight: 700;
            font-size: 18px;
            line-height: 25px;
            color: ${themeColor.themePrimary};
            margin-bottom: 6px;
            ${fontLato}
          }
          p {
            font-weight: 350;
            font-size: 14px;
            line-height: 19px;
            color: ${themeColor.black900};
            ${BrotherFont}
            margin-bottom: 0px;
          }
        }
      }
    }
    .radion-check-block {
      padding: 0px 32px 0px 32px;
      .radion-check-inner {
        position: relative;
        margin-bottom: 16px;
        label {
          background: ${themeColor.white};
          border: 2px solid ${themeColor.cream100};
          border-radius: 5px;
          cursor: pointer;
          h2 {
            background-color: ${themeColor.cream100};
            border: 2px solid ${themeColor.cream100};
            padding: 5px 12px;
            font-size: 16px;
            line-height: 25px;
            color: ${themeColor.themePrimary};
            ${fontLato}
            text-transform: uppercase;
          }
          .label-radio-block-inner {
            text-align: center;
            h3 {
              font-weight: 700;
              font-size: 22px;
              line-height: 25px;
              color: ${themeColor.themePrimary};
              ${fontLato}
            }
            p {
              font-weight: 350;
              font-size: 14px;
              line-height: 19px;
              color: ${themeColor.black900};
              ${BrotherFont}
            }
          }
        }
        input[type="radio"] {
          display: none;
        }
        input[type="radio"]:checked + label {
          border: 2px solid ${themeColor.themePrimary};
          h2 {
            background-color: ${themeColor.themePrimary};
            border: 2px solid ${themeColor.themePrimary};
            color: ${themeColor.white};
          }
        }
      }
    }
    .radion-check-block-payment {
      padding: 0px 32px 0px 32px;
      .radion-check-inner-payment {
        input[type="radio"] {
          display: none;
        }
        label {
          background: ${themeColor.white};
          box-shadow: 0px 0px 15px rgba(57, 61, 72, 0.1);
          border-radius: 35px;
          margin-bottom: 16px;
          padding: 15px 20px;
          width: 100%;
          border: 2px solid transparent;

          .label-radio-block-payment {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            .img-wallet-inner {
              display: flex;
              align-items: center;
              img {
                width: 28px;
              }
              h4 {
                font-weight: 500;
                font-size: 16px;
                line-height: 19px;
                display: flex;
                align-items: center;
                text-transform: capitalize;
                color: ${themeColor.gray865};
                ${fontLato}
                margin: 0px;
                padding-left: 15px;
              }
            }
            .label-radio-round {
              width: 14px;
              height: 14px;
              border: 1px solid ${themeColor.themePrimary};
              border-radius: 50px;
              display: flex;
              position: relative;
            }
          }
        }
        input[type="radio"]:checked + label {
          border: 2px solid ${themeColor.themePrimary};
          .label-radio-round {
            &:before {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: ${themeColor.orange800};
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    }
  }
  &.add-card-detail {
    .modal-dialog {
      margin: 0 auto;
      .nav-item {
        @media (max-width: 575px) {
          margin-bottom: 15px;
        }
      }
    }
  }
  &.transaction-modal {
    .modal-header {
      background-color: transparent !important;
      border-bottom: none;
    }
    .modal-body {
      .password-update-block {
        img {
          width: 200px;
          margin: 30px auto;
          display: table;
        }
      }
      h3 {
        margin: 0px;
        padding: 0px !important;
      }
    }
    .modal-footer {
      display: flex;
      justify-content: center;
      span {
        padding-right: 15px;
      }
      .btn-primary {
        color: ${themeColor.white} !important;
        letter-spacing: 1px;
        text-transform: capitalize !important;
      }
    }
  }
  &.financing-modal {
    .modal-dialog {
      max-width: 363px;
      width: 100%;
      .modal-content {
        padding: 0 20px;
        .modal-header {
          padding: 66px 0 0;

          figure {
            margin-bottom: 22px;
          }
          h2 {
            font-size: 20px;
            font-weight: 700;
            line-height: 24px;
            letter-spacing: 0.015em;
            text-transform: uppercase;
            color: ${themeColor.green200};
            margin-bottom: 12px;
          }
        }
        .modal-body {
          padding: 0;
          margin-bottom: 10px;
          p {
            font-size: 16px;
            line-height: 22px;
            font-weight: 400;
            color: ${themeColor.gray799};
            margin-bottom: 10px;
          }
        }
      }
    }
  }
`;

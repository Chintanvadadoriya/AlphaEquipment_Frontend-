import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { fontLato, BrotherFont } from "./../../fontStyle";
import { themeColor } from "styledComponents/theme";

export const ProductNavWrapper = styled.div`
  /* background-color: #c03333; */
  margin-top: 20px;

  margin-left: 20px;
  h4 {
    margin-bottom: 0px;
  }
  hr {
    margin-bottom: 0px;
  }
  p {
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 0px;
  }
  div {
    display: flex;
    justify-content: center;
    img {
      margin-top: 30px;

      margin-bottom: 0px;
    }
  }
  h6 {
    margin-top: 10px;
    text-align: center;
  }
`;

export const AddProductWrap = styled.div`
  background-color: ${themeColor.white};
  /* height: 100%; */
  overflow: auto;
`;

export const EquipInfoForm = styled(Form)`
  padding-left: 40px;
  margin-top: 10px;
  .form-select-group-main {
    .inputRadioWrap {
      .form-label {
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: ${themeColor.black900};
        ${fontLato}
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .form-check {
        padding-left: 0px;
        margin-bottom: 10px;
        .form-check-input {
          border: 2px solid rgba(0, 0, 0, 0.25);
        }
        input[type="radio"] {
          height: 18px;
          width: 18px;
          background-color: transparent;
          border-color: ${themeColor.themePrimary} !important;
        }
        .form-check-input:checked[type="radio"] {
          background: none;
          position: relative;
          &:before {
            content: "";
            width: 11px;
            height: 11px;
            background: ${themeColor.themePrimary};
            position: absolute;
            border-radius: 10px;
            top: 49%;
            left: 49%;
            transform: translate(-50%, -50%);
          }
        }
        .form-check-label {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: ${themeColor.gray808};
          ${fontLato}
          margin-left: 15px;
        }
      }
    }
    .form-select-group-main-inner {
      .form-group-main {
        margin: 15px -25px 0;
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        .form-group {
          width: 50%;
          padding: 0px 25px 15px;
          p{
            color: ${themeColor.red};
          }
          .form-label {
            font-weight: 500;
            font-size: 18px;
            line-height: 18px;
            ${fontLato}
            color: ${themeColor.black1000};
            margin-bottom: 10px;
            &.label-loaction-block {
              + {
                div {
                  > div {
                    background-color: ${themeColor.gray100};
                    outline: none;
                    border: 1px solid ${themeColor.gray400};
                    border-radius: 10px;
                    padding: 3px 7px;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 15px;
                    font-style: normal;
                    outline: none;
                    box-shadow: none;
                    color: ${themeColor.gray600};
                    font-style: normal;
                    ${BrotherFont}
                  }
                }
              }
            }
          }
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
            &::placeholder {
              /* Chrome, Firefox, Opera, Safari 10.1+ */
              color: ${themeColor.gray600};
            }

            &:-ms-input-placeholder {
              /* Internet Explorer 10-11 */
              color: ${themeColor.gray600};
            }

            &::-ms-input-placeholder {
              /* Microsoft Edge */
              color: ${themeColor.gray600};
            }
            &.textarea-block {
              height: 120px;
            }
          }
          .form-select {
            background-color: rgba(217, 217, 217, 0.1);
            outline: none;
            border: 1px solid ${themeColor.gray400};
            border-radius: 10px;
            padding: 14px;
            font-weight: 400;
            font-size: 15px;
            line-height: 15px;
            font-style: normal;
            outline: none;
            box-shadow: none;
            color: ${themeColor.gray600};
            font-style: normal;
            ${BrotherFont}
          }
        }
      }
    }
  }
  .image-block-input {
    .form-label {
      font-weight: 500;
      font-size: 18px;
      line-height: 18px;
      ${fontLato}
      color: ${themeColor.black1000};
      margin-bottom: 10px;
    }
    .control-label-block {
      display: flex;
      align-items: center;
      padding: 30px 0px;
      justify-content: center;
      h6 {
        margin: 0px;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        ${fontLato}
        color: ${themeColor.black900};
      }
      p {
        margin: 0px;
        font-weight: 300;
        font-size: 18px;
        line-height: 22px;
        ${fontLato}
        color: ${themeColor.gray760};
        margin-left: 6px;
      }
    }
  }
  .equipInfoWrap {
    /* background-color: blue; */
    width: 80%;
    display: grid;
    grid-template-columns: auto auto;

    .equipInfoInput {
      /* background-color: green; */
      width: 80%;
      margin-top: 30px;
    }
  }
  .inputRadioWrap {
    .form-label {
      font-size: 18px;
      font-weight: 500;
    }
    .form-check {
      input[type="radio"] {
        /* accent-color: ${themeColor.themePrimary} !important; */
        /* background-color: ${themeColor.themePrimary} !important; */
        border-color: ${themeColor.themePrimary} !important;

        margin-left: 10px;
        height: 20px;
        width: 20px;
      }
      input:checked {
        background-color: ${themeColor.themePrimary};
      }
      .form-check-label {
        margin-left: 20px;
      }
    }
  }
  .inputwrapper {
    width: 80%;
    .form-label {
      font-size: 18px;
      font-weight: 500;
      /* font-family: Lato; */
    }
    .inputTextWrapper {
      display: flex;
      justify-content: space-between;
    }
    .inputText {
      width: 40%;

      margin-top: 2%;
    }
  }

  /* .button {
    text-align: center;
    margin-top: 3%;
    margin-bottom: 2%;
    button {
      width: 30%;

      background-color: ${themeColor.themePrimary} !important;
      border-color: ${themeColor.themePrimary} !important;
    }
  } */
  .button-last {
    margin: 25px auto 40px;
    display: table;
    button {
      background-color: ${themeColor.themePrimary} !important;
      border-radius: 10px;
      font-weight: 700;
      font-size: 18px;
      line-height: 18px;
      text-transform: uppercase;
      color: ${themeColor.white};
      width: 345px;
      border: none;
      padding: 16px;
    }
  }
`;

export const DetailInfoForm = styled(Form)`
  margin-left: 40px;
  margin-top: 30px;
  /* background-color: red; */
  .detailInfoWrap {
    /* background-color: blue; */
    width: 80%;
    display: grid;
    grid-template-columns: auto auto;

    .detailInfoInput {
      /* background-color: green; */
      width: 80%;
      margin-top: 15px;
    }
  }
  .equipmentImageWrap {
    margin-top: 15px;
    /* .equipmentImage {
        display: inline;
        position: relative;
        top: 0;
        left: 0;
        margin-left: 3%;
        .imgmain {
          position: relative;
          top: 0;
          left: 0;
        }
        .imgadd {
          position: absolute;
          top: 150%;
          left: 77%;
          bottom: 0%;
        }
      } */
    .form-label {
      display: block;
    }
  }
  /* .btnWrap{
    margin-top: 50px;
    text-align: center;
    .btnBack{
      color: ${themeColor.gray795} !important;
      background-color: #D2D2D2 !important;
      border-color: #D2D2D2 !important;
      width: 15%;
    }
    .btnNext{
      background-color: ${themeColor.themePrimary} !important;
      border-color: ${themeColor.themePrimary} !important;
      width: 15%;
      margin-left: 5%;
    }
  } */
`;

export const FiveImgWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  p{
    inline-size: -webkit-fill-available;
    color: ${themeColor.red};
  }
  .equipment-picture-upload {
    margin-right: 20px;
    position: relative;
    display: flex;
    width: 90px;
    height: 90px;
    border-radius: 30px;
    @media (max-width: 1200px) {
      width: 130px;
      height: 130px;
    }
    img {
      height: 100%;
      width: 100%;
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
      width: 25px;
      height: 25px;
      background-color: ${themeColor.white};
      box-shadow: 0px 0px 19px rgb(0 0 0 / 10%);
      position: absolute;
      bottom: 10px;
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
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

export const BtnWrap = styled.div`
  margin-top: 40px;
  text-align: center;
  margin-bottom: 40px;
  /* .btnBack {
    color: ${themeColor.gray795} !important;
    background-color: ${themeColor.gray333} !important;
    border-color: ${themeColor.gray333} !important;
    width: 15%;
  }
  .btnNext {
    background-color: ${themeColor.themePrimary} !important;
    border-color: ${themeColor.themePrimary} !important;
    width: 15%;
    margin-left: 5%;
  } */
  button {
    width: 160px;
    border-radius: 10px;
    font-size: 18px;
    line-height: 18px;
    color: ${themeColor.gray795} !important;
    background-color: ${themeColor.gray333} !important;
    border-radius: 10px;
    border: none;
    ${fontLato}
    font-weight: 700;
    margin: 0px 10px;
    padding: 15px;
    &.btnNext {
      background-color: ${themeColor.themePrimary} !important;
      color: ${themeColor.white} !important;
    }
  }
`;

export const GeneralAprForm = styled(Form)`
  margin-left: 40px;
  margin-top: 30px;
  /* background-color: red; */
  input {
    width: 40%;
  }
  .equipmentImageWrap {
    margin-top: 15px;
    .equipmentImage {
      display: inline;
      position: relative;
      top: 0;
      left: 0;
      margin-left: 3%;
      .imgmain {
        position: relative;
        top: 0;
        left: 0;
      }
      .imgadd {
        position: absolute;
        top: 150%;
        left: 77%;
        bottom: 0%;
      }
    }
    .form-label {
      display: block;
      margin-top: 15px;
    }
  }
`;

export const ControlStnForm = styled(Form)`
  margin-left: 40px;
  margin-top: 30px;
  /* background-color: red; */
  .equipmentImageWrap {
    margin-top: 15px;
    .ControlStnLabel {
      display: flex;
      margin-left: 50%;
      p {
        margin-left: 10px;
      }
    }
  }
`;

import styled from "styled-components";
import { themeColor } from "styledComponents/theme";

export const ChatIndex = styled.div`
  .chat-page-index {
    background-color: ${themeColor.white};
    .chat-tital {
      padding: 12px 0;
      border: 1px solid ${themeColor.gray320};
      border-left: none;
      border-bottom: 1px solid ${themeColor.gray330};
      h1 {
        font-size: 22px;
        line-height: 33px;
        font-weight: 700;
        padding-left: 30px;
        margin-bottom: 0;
      }
    }
    .left-chat-detail {
      border-right: 1px solid ${themeColor.gray330};
      min-height: 660px;
      @media (max-width: 991px) {
        min-height: unset;
      }

      .left-chat-user {
        display: flex;
        justify-content: space-around;
        background: ${themeColor.gray200};
        padding: 12px 0;
        border: 1px solid ${themeColor.gray330};
        border-top: none;
        figure {
          width: 44px;
          height: 44px;
          margin-bottom: 0;
          position: relative;
          img {
            width: 100%;
          }
          &::after {
            content: "";
            position: absolute;
            bottom: 5px;
            right: 2px;
            width: 6px;
            height: 6px;
            background-color: ${themeColor.lime900};
            border-radius: 50%;
          }
        }
        .chat-user-name {
          h3 {
            font-size: 16px;
            font-weight: 400;
            line-height: 23px;
            color: ${themeColor.gray860};
            margin-bottom: 0;
          }
          p {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: ${themeColor.gray790};
            margin-bottom: 0;
          }
          span {
            font-weight: 400;
            font-size: 11px;
            line-height: 16px;
            letter-spacing: -0.5px;
            color: ${themeColor.gray780};
          }
        }
      }
    }
    .right-chat-detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 660px;
      @media (max-width: 991px) {
        min-height: 200px;
      }
      .right-chat-user {
        display: flex;
        align-items: center;
        padding-top: 20px;
        @media (max-width: 991px) {
          padding: 20px 10px;
        }
        figure {
          width: 30px;
          margin-bottom: 0;
          position: relative;
          margin-left: 16px;
          img {
            width: 100%;
          }
        }
        .chat-user-name {
          background: ${themeColor.gray310};
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 7px;
          padding: 6px 12px;
          max-width: 268px;
          border-radius: 5px;
          width: 100%;
          h3 {
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            color: ${themeColor.gray805};
            margin-bottom: 0;
          }
        }
        span {
          font-weight: 300;
          font-size: 8px;
          line-height: 9px;
          color: ${themeColor.gray780};
          margin-bottom: 0;
        }
      }
      .right-msg-box {
        background: rgba(106, 112, 126, 0.1);
        border: 1px solid ${themeColor.gray340};
        display: flex;
        align-items: center;
        padding: 9px 12px 9px 0;
        .upload-file {
          background-color: ${themeColor.blue500};
          padding: 8px;
          margin: 9px 13px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          border-radius: 16px;
          label{
            cursor: pointer;
          }
          > input[type='file'] {
            display: none;
          }
        }
        .chat-emoji {
          .btn-primary {
            background-color: ${themeColor.blue500};
            padding: 8px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            &:focus {
              outline: none;
            }
            &:focus-visible {
              box-shadow: none;
            }
          }
        }
        .btn-primary {
          background-color: ${themeColor.blue500};
          padding: 8px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          &:focus {
            outline: none;
          }
          &:focus-visible {
            box-shadow: none;
          }
        }
        .form-control {
          margin: 0 15px;
        }
      }
    }

    .off-user {
      background-color: ${themeColor.white};
    }
  }
`;

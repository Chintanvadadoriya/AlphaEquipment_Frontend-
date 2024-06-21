import styled from "styled-components";
import { themeColor } from "styledComponents/theme";

export const HeaderStyle = styled.header``;
export const TopBarBLock = styled.div`
  background-color: ${themeColor.gray810};
  padding: 14px 0px;
  @media (max-width: 768px) {
    padding: 10px;
  }
  .menu-top-bar {
    @media (max-width: 575px) {
      width: 294px;
    }
    ul {
      margin: 0px;
      padding: 0px;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      @media (max-width: 575px) {
        justify-content: flex-start;
      }
      li {
        padding-left: 30px;
        line-height: normal;
        @media (max-width: 768px) {
          padding-left: 10px;
        }
        a {
          font-weight: 400;
          font-size: 15px;
          line-height: 15px;
          color: ${themeColor.white};

          @media (max-width: 1400px) {
            font-size: 14px;
            line-height: 14px;
          }
          @media (max-width: 1200px) {
            font-size: 13px;
            line-height: 13px;
          }
          @media (max-width: 768px) {
            font-size: 12px;
          }
        }
      }
    }
  }
`;
export const ContactHeader = styled.header`
  display: flex;
  @media (max-width: 768px) {
    width: 52px;
  }
  .conatct-header-common {
    margin-right: 22px;
    @media (max-width: 768px) {
      margin-right: 10px;
    }
    &:last-child {
      margin-right: 0;
    }
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      white-space: nowrap;

      p {
        margin: 0px;
        font-size: 15px;
        color: ${themeColor.white};
        padding-left: 8px;
        display: block;
        @media (max-width: 768px) {
          display: none;
        }
        img {
          width: 18px;
        }

        img {
          width: 15px;
        }
      }
    }
  }
`;
export const BottomBlockHeader = styled.div`
  padding: 27px 0px;
  background-color: ${themeColor.gray300};

  .header-inner-main {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 768px) {
      display: block;
    }
    .header-logo {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      justify-content: center;
    }
    .header-right {
      padding-left: 30px;
      margin-bottom: 0;
      @media (max-width: 991px) {
        margin-bottom: 20px;
      }
      .search-block-main-login {
        display: flex;
        align-items: center;
        margin-bottom: 28px;
        @media (max-width: 575px) {
          display: block;
        }
        .search-block-main {
          display: flex;
          margin-bottom: 0;
          @media (max-width: 575px) {
            margin-bottom: 20px;
          }
          align-items: center;
        }
      }
      .input-group {
        margin-bottom: 20px;
        max-width: 692px;
        width: 100%;

        .form-control {
          background: ${themeColor.white};
          border: 1px solid ${themeColor.gray510};
          border-radius: 5px;
          padding: 7px 27px;
          font-weight: 400;
          font-size: 16px;
          font-weight: 400;
          color: ${themeColor.gray520};
          box-shadow: none;
          outline: none;
          ::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: ${themeColor.gray520};
          }

          :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: ${themeColor.gray520};
          }

          ::-ms-input-placeholder {
            /* Microsoft Edge */
            color: ${themeColor.gray520};
          }
          @media (max-width: 992px) {
            padding: 7px 15px;
            font-size: 14px;
          }
        }
        .main-button {
          font-weight: 700;
          font-size: 20px;
          color: ${themeColor.white};
          /* border-radius: 5px; */
          background-color: ${themeColor.themePrimary};
          padding: 5px 50px;
          font-family: "Lato", sans-serif;
          font-weight: 700;
          border: none;
          outline: none;
          @media (max-width: 992px) {
            padding: 7px 15px;
            font-size: 14px;
          }
        }
      }
      .header-menu-block {
        .collapse {
          background-color: none;
          @media (max-width: 768px) {
            display: block;
          }
        }
        .collapse:not(.show) {
          display: block;
          @media (max-width: 768px) {
            display: none;
          }
        }
        ul {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0px;
          padding: 0px;
          @media (max-width: 768px) {
            display: block;
          }
          li {
            padding-right: 60px;
            margin-bottom: 0;
            @media (max-width: 1200px) {
              padding-right: 25px;
            }
            @media (max-width: 768px) {
              margin-bottom: 15px;
            }
            .dropdown {
              .dropdown-menu {
                margin-top: 10px;
                background-color: ${themeColor.white};
                box-shadow: 0px 0px 19px rgb(0 0 0 / 10%);
                border-radius: 10px;
                padding: 0px;
                .dropdown-item {
                  font-weight: 700;
                  font-size: 16px;
                  line-height: 22px;
                  font-family: "Lato", sans-serif;
                  font-style: normal;
                  color: ${themeColor.black};
                  padding: 10px;
                  margin: 0px;
                  background: none;
                  &:hover {
                    color: ${themeColor.themePrimary};
                  }
                }
              }
              .dropdown-toggle {
                background: none;
                border: none;
                outline: none;
                box-shadow: none;
                padding: 0px;
                color: ${themeColor.gray870};
                font-size: 18px;
                font-weight: 500;
                font-family: "Lato", sans-serif;
                &:after {
                  content: none;
                }
                @media (max-width: 1400px) {
                  font-size: 16px;
                }
                img {
                  margin-left: 8px;
                  @media (max-width: 1400px) {
                    margin-left: 5px;
                  }
                }
                &:hover {
                  color: ${themeColor.themePrimary};
                }
              }
            }
            a {
              font-weight: 500;
              font-size: 18px;
              color: ${themeColor.gray870};
              font-family: "Lato", sans-serif;
              transition: 0.5s;
              &:hover,
              &.active {
                color: ${themeColor.themePrimary};
              }
              @media (max-width: 1400px) {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    .login-register {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      @media (max-width: 768px) {
        justify-content: space-between;
      }

      .default-button {
        font-weight: 600;
        font-size: 16px;
        border: none;
        outline: none;
        padding: 0px 15px;
        background: none;
        margin-right: 10px;
        color: ${themeColor.themePrimary};
        font-family: "Lato", sans-serif;
      }
      .main-button {
        font-weight: 600;
        font-size: 16px;
        font-family: "Lato", sans-serif;
        letter-spacing: -0.33px;
        background: ${themeColor.themePrimary};
        border: 1px solid ${themeColor.themePrimary};
        border-radius: 5px;
        padding: 5px 20px;
      }

      .after-login-block {
        display: flex;
        align-items: center;
        .icon-after-login {
          padding-right:25px;
          @media (max-width: 768px){
            padding-right:10px;
          }
        }
        .dropdown-profile-block {
          padding-left: 10px;
          .dropdown {
            button {
              padding: 0px;
              margin: 0px;
              background: none;
              border: none;
              outline: none;
              box-shadow: none;
              display: flex;
              align-items: center;
              .porfile-block {
                img {
                  width: 42px;
                  height: 42px;
                  border-radius: 50%;
                  object-fit: cover;
                  margin-right: 5px;
                }
              }
              &::after {
                display: none;
              }
            }
            .dropdown-menu {
              left: auto;
              right: 0px;
              margin-top: 10px;
              background-color: ${themeColor.white};
              box-shadow: 0px 0px 19px rgb(0 0 0 / 10%);
              border-radius: 10px;
              padding: 0px;
              .dropdown-item {
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                font-family: "Lato", sans-serif;
                font-style: normal;
                color: ${themeColor.black};
                padding: 10px;
                margin: 0px;
                background: none;
                &:hover {
                  color: ${themeColor.themePrimary};
                }
              }
            }
          }
        }
      }
      .btn-primary {
        position: relative;
        background-color: ${themeColor.themePrimary};
        border-radius: 5px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;
        border: none;
        margin-left: 20px;
        @media (max-width: 768px) {
          display: flex;
        }
      }
    }
  }
`;

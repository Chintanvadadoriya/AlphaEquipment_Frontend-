import styled from "styled-components";
import { themeColor } from "styledComponents/theme";
import { fontLato } from "../../fontStyle";

export const SidebarCmp = styled.div`
  padding: 20px;
  background-color: ${themeColor.gray301};
  width: 240px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  .menu-navbar {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    .menu-primary {
      flex: 1;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      .active {
        svg {
          fill: ${themeColor.themePrimary};
        }
        span {
          color: ${themeColor.themePrimary};
        }
        .sidebar-icon {
          display: flex;
          .default-icon {
            display: none;
          }
          .hover-icon {
            display: block;
          }
        }
      }
      li {
        margin-bottom: 25px;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
        /* a { */
        display: flex;
        align-items: center;
        transition: 0.5s;
        svg {
          fill: ${themeColor.gray792};
          width: 22px;
        }
        span {
          color: ${themeColor.gray792};
          padding-left: 12px;
          font-weight: 500;
          font-size: 18px;
          color: ${themeColor.gray792};
          transition: 0.5s;
          ${fontLato}
        }
        &:hover {
          svg {
            fill: ${themeColor.themePrimary};
          }
          span {
            color: ${themeColor.themePrimary};
            transition: 0.5s;
          }
          .sidebar-icon {
            .hover-icon {
              display: block;
            }
            .default-icon {
              display: none;
            }
          }
        }
        .sidebar-icon {
          display: flex;
          .hover-icon {
            display: none;
          }
        }
        .accordion {
          width: 100%;
          background: none;
          border: none;
          .accordion__item {
            .accordion__heading {
              background: none;
              border: none;
              .accordion__button {
                padding: 0px;
                background: none;
                border: none;
                display: flex;
                align-items: center;
                position: relative;
                &:before {
                  position: absolute;
                  right: 10px;
                  transform: rotate(45deg);
                  border-color: ${themeColor.gray792};
                  right: -8px;
                  top: 7px;
                }
              }
              .accordion__button[aria-expanded="true"]::before,
              .accordion__button[aria-selected="true"]::before {
                transform: rotate(-135deg);
                top: 12px;
              }
            }
          }
          .accordion__panel {
            padding-bottom: 0px;
            a,
            p {
              display: block;
              padding-left: 12px;
              font-size: 18px;
              font-weight: 500;
              font-size: 18px;
              line-height: 22px;
              color: ${themeColor.gray792};
              margin-bottom: 15px;
              transition: 0.5s;
              padding-bottom: 15px;
              ${fontLato}

              &:last-child {
                margin-bottom: 0px;
              }
              &:hover,
              &.active {
                color: ${themeColor.themePrimary};
                transition: 0.5s;
              }
            }

            div {
              &:last-child {
                p {
                  padding-bottom: 0px;
                }
              }
            }
            .active {
              p {
                color: ${themeColor.themePrimary};
              }
            }
          }
        }
      }
      &.menu-secondry {
        padding-top: 25px;
        li {
          &:nth-child(1) {
            border-bottom: 2px solid ${themeColor.gray309};
            margin-bottom: 0px;
            padding-bottom: 25px;
          }
          &:nth-child(2) {
            margin-top: 25px;
          }
          a {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
`;
export const AlphaLogoWraper = styled.div`
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    img {
      width: 135px;
    }
  }
`;

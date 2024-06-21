import styled from "styled-components";
import { themeColor } from "styledComponents/theme";

export const FooterStyle = styled.footer`
  background-color: ${themeColor.black};
  padding-top: 40px;
  @media (max-width: 1200px) {
    padding-top: 30px;
  }
`;
export const FooterStyleInner = styled.footer`
  /* display: flex; */
  /* margin: 0px -15px; */
`;
export const FooterStyleBlock = styled.div`
  padding: 0px 15px;
    h3 {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    text-transform: uppercase;
    color: ${themeColor.themePrimary};
    padding-bottom: 18px;
    margin: 0px;
    @media (max-width: 1200px) {
      font-size: 16px;
      line-height: 20px;
      padding-bottom: 15px;
    }
  }
  ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
    li {
      padding-bottom: 22px;
      @media (max-width: 1200px) {
        padding-bottom: 15px;
      }
      a {
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        color: ${themeColor.white};
        text-decoration: none;
        transition: 0.5s;
        &:hover {
          color: ${themeColor.themePrimary};
        }
        @media (max-width: 1200px) {
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }
  &.footer-social-block {
    ul {
      display: flex;
      align-items: center;
      margin: 0px -16px;
      @media (max-width: 1200px) {
        margin: 0px -10px;
      }
      @media (max-width: 992px) {
        margin: 0px -5px;
      }
      li {
        padding: 0px 16px;
        @media (max-width: 1200px) {
          padding: 0px 10px;
        }
        @media (max-width: 992px) {
          padding: 0px 5px;
        }
        a {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${themeColor.gray850};
          border-radius: 50%;
          &:hover {
            background-color: ${themeColor.themePrimary};
          }
          @media (max-width: 1200px) {
            width: 30px;
            height: 30px;
            padding: 5px;
            img {
              width: 15px;
            }
          }
        }
      }
    }
  }
`;
export const FooterStyleBottom = styled.footer`
  padding: 12px 0px;
  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    color: ${themeColor.gray500};
    a {
      color: ${themeColor.gray500};
    }
  }
`;

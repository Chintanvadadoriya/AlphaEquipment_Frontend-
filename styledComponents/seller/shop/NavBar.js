import styled from "styled-components";
import { themeColor } from "styledComponents/theme";
import { fontLato, BrotherFont, Urbanist } from "../../fontStyle";

export const NavContainer = styled.div`
  background-color: ${themeColor.white};
  /* width: 1200px; */
  height: 116px;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  justify-content: space-between;
  z-index: 9;
 .btn-primary {
    display: none;
    @media (max-width: 768px) {
      display: block;
      background-color: transparent;
      border: none;
      height: 15px;
      margin-top: 29px;
      &:active{
        background-color: transparent;
      }
      span{
        width: 20px;
        height: 2px;
        display: block;
        background-color:${themeColor.gray};
        margin-bottom: 5px;

      }
    }
  }
`;

export const NavBarDetail = styled.div`
  margin-top: 32px;
  margin-left: 20px;
  margin-bottom: 32px;
  @media (max-width:575px){
    margin-left: 5px;
  }
  h5 {
    font-size: 24px;
    line-height: 29px;
    font-weight: 700;
    font-family: "Brother 1816";
    text-transform: capitalize;
    @media (max-width: 768px) {
      font-size: 16px;
      line-height: 22px;
    }
  }
  p {
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    color: ${themeColor.gray710};
    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 22px;
    }
  }

`;
export const NavBarProfile = styled.div`
  display: flex;
  margin: 38px 38px 38px 0;
`;
export const NavBarProfileBell = styled.div`/* margin-left: -60%; */`;
export const NavBarProfileDetail = styled.div`
  display: flex;
  margin-left: 40px;
  @media (max-width: 768px){
    margin-left: 20px;
  }
`;
export const NavBarProfileName = styled.h6`
  margin-right: 15%;
  margin-top: 8%;
  font-size: 18px;
  line-height: 26px;
  font-weight: 500;
  ${BrotherFont};
`;

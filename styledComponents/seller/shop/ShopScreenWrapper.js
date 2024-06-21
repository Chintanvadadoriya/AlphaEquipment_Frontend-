import styled from "styled-components";
import { themeColor } from "styledComponents/theme";

export const ShopScreen = styled.div`
  background-color: ${themeColor.gray305};
  /* height: 100vh; */
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  .sidebar-block {
    display: block;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .content-main {
    width: calc(100% - 240px);
    margin-left: auto;
    padding: 140px 24px 28px 24px;
    position: relative;
    /* height: 100vh; */
    @media (max-width: 768px) {
      width: 100%;
      margin-left: unset;
    }
  }
`;

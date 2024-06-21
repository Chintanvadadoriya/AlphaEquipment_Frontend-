import styled from "styled-components";
import { fontLato } from "./fontStyle";
import { themeColor } from "./theme";


export const Button = styled.button`
  background-color: ${(props) => (props.disabled ? themeColor.gray321 : themeColor.themePrimary)};
  font-family: "Lato", sans-serif;
  border-radius: ${(props) => props.radius || "10px"};
  padding: 16px;
  color: ${(props) => (props.disabled ? themeColor.gray701 : themeColor.white)};
  width: 100%;
  border: none;
  margin: ${(props) => `${props.marginTop || "40px"} 0 0`};
  ${fontLato}
  font-weight: 700;
  font-size: 20px;
  line-height: 16px;
  text-transform: uppercase;

  .loading-icon {
    color: ${themeColor.white};
    font-size: 14px;
    animation: animate 2s infinite;
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }
`;

export const SociaLoginBtn = styled.button`
  height: 46px;
  width: 78px;
  border: 0.851571px solid ${themeColor.gray799};
  border-radius: 20px;
  position: relative;
  background-color: ${themeColor.white};
  .logoImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    cursor: pointer;
  }
`;

import styled from "styled-components";
import { themeColor } from "styledComponents/theme";

export const ModelContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.6);
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;

	.model {
		width: ${(props) => `${props.width || "25%"}`};
		height: ${(props) => `${props.height || "600px"}`};
		position: relative;
		background: ${(props) => `${props.background || themeColor.white}`};
		border-radius: ${(props) => `${props.borderRadius || "10px"}`};
		.close-btn {
			width: 27px;
			height: 27px;
			position: absolute;
			top: 15px;
			right: 22px;
			background-color: transparent;
			border: none;
			outline: none;
		}
	}
`;

export const MembershipModelWrapper = styled.div`
	.heading {
		padding: 5% 20%;
		text-align: center;
		font-size: 24px;
		font-weight: 600;
		line-height: 34px;
		font-family: "Lato";
		font-style: normal;
		text-transform: capitalize;
	}
	.description {
		padding: 0 1% 4% 10%;
	}
`;

import styled from "styled-components";

export const SplaceScreenStyle = styled.div`
	width: 100vw;
	height: 100vh;
	position: relative;
	.fadeinout {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 165px;
		height: 90px;
		animation: fadeinout 2s infinite;
	}

	@keyframes fadeinout {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
`;


export const LoaderSection = styled.div`

`;
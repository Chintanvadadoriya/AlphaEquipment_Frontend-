import { SociaLoginBtn } from "@style";
// import { signIn } from "next-auth/react";
import Image from "next/image";

const SocialLoginButton = ({ method, imageSrc }) => {
	const onClickHandler = () => {
		// signIn(method, { callbackUrl: "/" });
	};
	return (
		<SociaLoginBtn onClick={onClickHandler}>
			<Image
				src={imageSrc}
				width={27}
				height={27}
				alt="socile media icon"
				className="logoImage"
			/>
		</SociaLoginBtn>
	);
};

export default SocialLoginButton;

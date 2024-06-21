import { SplaceScreenStyle } from "@style";
import Image from "next/image";

const SplashScreen = () => {
	return (
		<SplaceScreenStyle>
			<Image
				src="/assets/icons/AlphaLogo.svg"
				width={165}
				height={90}
				alt="logo"
				className="fadeinout"
			/>
		</SplaceScreenStyle>
	);
};

export default SplashScreen;

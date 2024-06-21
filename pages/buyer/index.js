import {
	AuthScreenWrapper,
	PageDetails,
	SocialLoginButton,
	UserLogin,
} from "@components";
import { AuthOption, HeadingContainer } from "@style";

const Buyer = () => {
	const metaDetail = {
		title: "Login",
		desc: "Login page",
	};


	return (
		<>
			<PageDetails metaDetail={metaDetail} />
			Buyer page
		</>
	);
};

export default Buyer;

import {
	AuthScreenWrapper,
	PageDetails,
	SocialLoginButton,
	UserForget,
} from "@components";


import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
	
	const metaDetail = {
		title: "Login",
		desc: "Login page",
	};
	const { t, i18n } = useTranslation();

	
	return (
		<>
			<PageDetails metaDetail={metaDetail} />
			<AuthScreenWrapper>
				
				<UserForget />
				
			</AuthScreenWrapper>
		</>
	);
};

export default ForgetPassword;

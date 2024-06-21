import {
	AuthScreenWrapper,
	PageDetails,
	SocialLoginButton,
	UserLogin,
} from "@components";
import { AuthOption, HeadingContainer } from "@style";
import Link from "next/link";
import { router } from "@utils";


import { useTranslation } from "react-i18next";

const Login = () => {
	
	const { t, i18n } = useTranslation();
	const metaDetail = {
		title: t('siteName'),
		desc: t('description'),
	};

	
	

	return (
		<>
			<PageDetails metaDetail={metaDetail} />
			<AuthScreenWrapper>
				<HeadingContainer>
					<h1>{t('signIn')}</h1>
				</HeadingContainer>
				<UserLogin />
				<AuthOption>
					<p className="signupLink">
						{t('alreadyAccount')}{" "}
						<Link className="link" href={router.SIGNUP}>
							{t('signUp')}
						</Link>
					</p>
				</AuthOption>
			</AuthScreenWrapper>
		</>
	);
};

export default Login;

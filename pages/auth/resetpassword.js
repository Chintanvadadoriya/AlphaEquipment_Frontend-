import {
	AuthScreenWrapper,
	Input,
	PageDetails,
	SubmitButton,
} from "@components";
import { useCommonApi, useRegisterUser, useResetPassword } from "@hooks";
import { Button, HeadingContainer, RegisterForm } from "@style";
import OtpInput from "components/OtpInput";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Resetpassword = () => {
	const router = useRouter();

	// const {
	// 	formik,
	// 	loading,
	// 	otpVerifeyd,
	// 	otp,
	// 	setOtp,
	// 	setQueryData,
	// 	otpVerify,
	// } = useResetPassword();

	const { otp, setOtp, loading } = useRegisterUser();
	// const {sendotp,otpVerify} =useCommonApi();

	// useEffect(() => {
	// 	if (!router.isReady) return;

	// 	setQueryData(router.query);
	// }, [router.isReady]);

	const { t, i18n } = useTranslation();
	const [toggle, setToggle] = useState(false)
	const metaDetail = {
		title: "Sign In",
		desc: "Sign In page",
	};

	return (
		<>
			<PageDetails metaDetail={metaDetail} />
			<AuthScreenWrapper>
				{toggle ? (
					<>
						<HeadingContainer>
							<h1>{t('createPassword')}</h1>
						</HeadingContainer>
						<RegisterForm
							marginTop="15%"
							noValidate
							// onSubmit={formik.handleSubmit}
						>
							<Input
								name="password"
								lable="Password"
								placeholder={t('enterPassword')}
								type="password"
								// showError={Boolean(
								// 	formik.touched.password &&
								// 		formik.errors.password
								// )}
								// errorMsg={formik.errors.password}
								// onChange={formik.handleChange}
								// onBlur={formik.handleBlur}
							/>
							<Input
								name="confirmPassword"
								lable="Confirm Password"
								type="password"
								placeholder={t('enterPassword')}
								// showError={Boolean(
								// 	formik.touched.confirmPassword &&
								// 		formik.errors.confirmPassword
								// )}
								// errorMsg={formik.errors.confirmPassword}
								// onChange={formik.handleChange}
								// onBlur={formik.handleBlur}
							/>
							<Button type="submit" disabled={false}>
								{t('confirm')}
							</Button>
						</RegisterForm>
					</>
				) : (
					<>
						<HeadingContainer>
							<h1>{t('verificationCode')}</h1>
						</HeadingContainer>
						<RegisterForm marginTop="25%">
							<OtpInput
								value={otp}
								onChange={(val) => setOtp(val)}
							/>
							<SubmitButton
								type="button"
								marginTop="80px"
								name="VERIFY"
								// onClick={otpVerify}
								loading={loading}
								disabled={otp.length === 4 ? false : true}
							/>
							<p className="msg">
								{t('Didn’t recieve a code?')}{" "}
								<span onClick={() => { sendotp(); setOtp("") }}>{t('sendAgain')}</span>
							</p>
						</RegisterForm>
					</>
				)}
			</AuthScreenWrapper>
		</>
	);
};

export default Resetpassword;

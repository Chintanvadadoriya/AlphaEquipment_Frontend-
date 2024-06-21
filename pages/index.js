import { WithAuth } from "@guard";
import { HomeScreen, MembershipModelWrapper } from "@style";
import { Wrapper, PageDetails, SplashScreen } from "@components";
import { checkLogin } from "@utils";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { router } from "@utils";

const Home = () => {

	// constants
	const Router = useRouter();
	const { t, i18n } = useTranslation();
	const metaDetail = {
		title: t('siteName'),
		desc: t('description'),
	};

	// state
	const [showSplashScreen, setShowSplashScreen] = useState(true)
	

	// useEffect
	useEffect(() => {
		splashScreenDisplay();

		(async () => {
			const {isLogin, redirectUrl} = await checkLogin();
	  
			if (isLogin) {
			  Router.push(redirectUrl);
			} else {
			  Router.push(router.LOGIN);
			}
	  
		})();

	}, []);


	// methods
	const splashScreenDisplay = () => {
		setTimeout(() => {
			setShowSplashScreen(false)
		// 	if (isLogin) {
		// 		return Router.push(redirectUrl);
		// 	} else {
		// 	  return <SplashScreen />;
		// 	}
		}, 2000);
	}

	return (
		<>
			<PageDetails metaDetail={metaDetail} />
			<HomeScreen>
				{showSplashScreen? <SplashScreen />: <Wrapper /> }
			</HomeScreen>
		</>
	);
};

export default WithAuth(Home);

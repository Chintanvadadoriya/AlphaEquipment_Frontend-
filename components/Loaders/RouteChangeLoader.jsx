import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import NProgress from "nprogress";

const RouteChangeLoader = () => {
	const Router = useRouter();

	useEffect(() => {
		Router.events.on("routeChangeStart", () => NProgress.start());
		Router.events.on("routeChangeComplete", () => NProgress.done());
		Router.events.on("routeChangeError", () => NProgress.done());

		return () => {
			Router.events.off("routeChangeStart", () => NProgress.start());
			Router.events.off("routeChangeComplete", () => NProgress.done());
			Router.events.off("routeChangeError", () => NProgress.done());
		};
	});

	return null;
};

export default RouteChangeLoader;

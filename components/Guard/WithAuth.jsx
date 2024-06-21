const { useRouter } = require("next/router");
import { SplashScreen } from "@components";
import Login from "pages/auth/login";
import { getProfile } from "@services";
import { useEffect } from "react";
import { decode } from "@utils";
import { useStore, useDispatch, useSelector } from "react-redux";

const WithAuth = (WrappedComponent) => {
	

	return (props) => {
		// const token = useSelector(store => store?.user?.userData?.token);
		// useEffect(() => {
		// 	(async () => {
		// 		await decode(token);
		// 	})()			
		// }, []);

		// if (status === "loading") {
		// 	return <SplashScreen />;
		// }

		// if (!session) {
		// 	return <Login />;
		// }

		return <WrappedComponent {...props} />;
	};
};

export default WithAuth;

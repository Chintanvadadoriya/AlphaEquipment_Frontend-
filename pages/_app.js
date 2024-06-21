import React, { useEffect, useLayoutEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { RouteChangeLoader } from "@components";
import { useStore, useDispatch, useSelector } from "react-redux";
import { getProfile } from "@services";
import { wrapper } from "../store";
import { ToastContainer } from "react-toastify";
import { router, toaster, useAuth, checkLogin } from "@utils";
import { useRouter } from "next/router";
import { updateMobileStatus, mobileCheckSelector, userStore, userSliceSelector } from "@redux";
import { i18, userType } from "@utils";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-phone-input-2/lib/style.css";
import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "@connection";

function App({ Component, pageProps: { session, ...pageProps } }) {
  const Router = useRouter();
  const store = useStore((state) => state);
  // console.log("first", useSelector(mobileCheckSelector)) for example
  console.log(
    "store",
    useSelector((store) => store)
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   (async () => {
  //     const {isLogin, redirectUrl} = await checkLogin();

  //     if (isLogin) {
  //       Router.push(redirectUrl);
  //     } else {
  //       Router.push(router.LOGIN);
  //     }

  //   })();
  // }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <PersistGate className="abc" persistor={store.__persistor}>
        <RouteChangeLoader />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Component {...pageProps} />
      </PersistGate>
    </Web3ReactProvider>
  );
}

export default wrapper.withRedux(App);

import {
  AuthOption,
  AuthScreen,
  Button,
  HeadingContainer,
  RegisterForm,
} from "@style";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Input from "./Input";

const AuthScreenWrapper = ({ children }) => {
  return (
    <AuthScreen>
      <div className="image-container">
        <div className="overlay" />
        <div className="hero-image">
          <Image
            src="/assets/troy.png"
            alt="troy"
            fill={true}
            className="image"
            priority
            sizes="(max-width: 768px) 100vh,
							(max-width: 1200px) 100vh"
          />
          <div className="logo-auth">
            <Image
              src="/assets/icons/AlphaLogo.svg"
              width={163}
              height={89}
              alt="logo"
              className="logo"
            />
          </div>
        </div>
      </div>
      <div className="contaent-container">{children}</div>
    </AuthScreen>
  );
};

export default AuthScreenWrapper;

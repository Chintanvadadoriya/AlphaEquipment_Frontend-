import React, { useState } from "react";
import Image from "next/image";
import { AlphaLogoWraper, SidebarCmp } from "@style";
import Link from "next/link";
import InlineSVG from "react-inlinesvg";
import { dashboard_icon, shop_icon, wallet_icon } from "../../../public/assets/svgOfPage";
import { router } from "@utils";
import { userLogout } from "@services";
import { useRouter } from "next/router";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import ConnectWallet from "components/Web3/ConnectWallet";
import { useTranslation } from "react-i18next";
import { LoaderComponent } from "@components";

const SideBar = () => {
  const [show, setShow] = useState(true);
  const [loader, setLoader] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t } = useTranslation();
  const Router = useRouter();
  const active = Router.query.tab;

  const handleLogout = async () => {
    setLoader(true);
    const logout = await userLogout();
    setLoader(false);
    if (logout?.success) {
      localStorage.removeItem("persist:alpha");
      localStorage.removeItem("token");
      localStorage.clear();
      Router.push(router.LOGIN);
    }
  };

  return (
    <>
      <SidebarCmp className="sidebar-main">
        <AlphaLogoWraper>
          <Link href="#" legacyBehavior>
            <a>
              {/* <Image
                src="/assets/icons/AlphaLogo.svg"
                width={135}
                height={63.07}
                alt="logo"
                className="alphalogo"
              /> */}
              <img src="/assets/icons/AlphaLogo.svg" alt="logo"></img>
            </a>
          </Link>
        </AlphaLogoWraper>
        <nav className="menu-navbar">
          <ul className="menu-primary">
            <ConnectWallet />
            <li
              className={Router?.asPath == "/seller" || active == "dashboard" ? "active" : ""}
              onClick={() => {
                Router.push({
                  pathname: router.SELLER,
                  query: { tab: "dashboard" },
                });
              }}
            >
              <InlineSVG src={dashboard_icon} />
              <span>{t("dashboard")}</span>
            </li>
            <li
              className={active == "shop" ? "active" : ""}
              onClick={() => {
                Router.push({
                  pathname: router.SELLER,
                  query: { tab: "shop" },
                });
              }}
            >
              <InlineSVG src={shop_icon} />
              <span>{t("shop")}</span>
            </li>
            <li
              className={active == "wallet" ? "active" : ""}
              onClick={() => {
                Router.push({
                  pathname: router.SELLER,
                  query: { tab: "wallet" },
                });
              }}
            >
              <InlineSVG src={wallet_icon} />
              <span>{t("wallet")}</span>
            </li>

            {/* <li
              className={active == "request" ? "active" : ""}
              onClick={() => {
                Router.push({
                  pathname: router.SELLER,
                  query: { tab: "request" },
                });
              }}
            >
              <div className="sidebar-icon">
                <img
                  src="../assets/request-icon.svg"
                  alt="icon"
                  className="default-icon"
                ></img>
                <img
                  src="../assets/request-icon-hover.svg"
                  alt="icon"
                  className="hover-icon"
                ></img>
              </div>
              <span>Request</span>
            </li> */}
            <li>
              <Accordion allowZeroExpanded>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <div className="sidebar-icon">
                        <img src="../assets/request-icon.svg" alt="icon" className="default-icon"></img>
                        <img src="../assets/request-icon-hover.svg" alt="icon" className="hover-icon"></img>
                      </div>
                      <span>{t("request")}</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div
                      className={active == "rentRequest" ? "active" : ""}
                      onClick={() => {
                        Router.push({
                          pathname: router.SELLER,
                          query: { tab: "rentRequest" },
                        });
                      }}
                    >
                      <p>{t("rent")}</p>
                    </div>
                    <div
                      className={active == "buyRequest" ? "active" : ""}
                      onClick={() => {
                        Router.push({
                          pathname: router.SELLER,
                          query: { tab: "buyRequest" },
                        });
                      }}
                    >
                      <p>{t("buy")}</p>
                    </div>
                    <div
                      className={active == "auctionRequest" ? "active" : ""}
                      onClick={() => {
                        Router.push({
                          pathname: router.SELLER,
                          query: { tab: "auctionRequest" },
                        });
                      }}
                    >
                      <p>{t("auctionText")}</p>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </li>
            <li
              className={active == "paymenthistory" ? "active" : ""}
              onClick={() => {
                Router.push({
                  pathname: router.SELLER,
                  query: { tab: "paymenthistory" },
                });
              }}
            >
              {/* <InlineSVG src={wallet_icon} /> */}
              <div className="sidebar-icon">
                <img src="../assets/payment-history.svg" alt="icon" className="default-icon"></img>
                <img src="../assets/payment-history-hover.svg" alt="icon" className="hover-icon"></img>
              </div>
              <span>{t("paymentHistory")}</span>
            </li>
            <li
              className={active == "ordersstatus" ? "active" : ""}
              onClick={() => {
                Router.push({
                  pathname: router.SELLER,
                  query: { tab: "ordersstatus" },
                });
              }}
            >
              {/* <InlineSVG src={wallet_icon} /> */}
              <div className="sidebar-icon">
                <img src="../assets/order-status-icon.svg" alt="icon" className="default-icon"></img>
                <img src="../assets/order-status-icon-hover.svg" alt="icon" className="hover-icon"></img>
              </div>
              <span>{t("orderdStatus")}</span>
            </li>
            <li
              className={active == "chat" ? "active" : ""}
              onClick={() => {
                Router.push({
                  pathname: router.SELLER,
                  query: { tab: "chat" },
                });
              }}
            >
              {/* <InlineSVG src={wallet_icon} /> */}
              <div className="sidebar-icon">
                <img src="../assets/chat-icon.svg" alt="icon" className="default-icon"></img>
                <img src="../assets/chat-icon-hover.svg" alt="icon" className="hover-icon"></img>
              </div>
              <span>{t("chat")}</span>
            </li>
          </ul>

          <ul className="menu-secondry">
            <li
              className={active == "profile" ? "active" : "liProfile"}
              onClick={() => {
                Router.push({
                  pathname: router.SELLER,
                  query: { tab: "profile" },
                });
              }}
            >
              {/* <InlineSVG src={wallet_icon} /> */}
              <div className="sidebar-icon">
                <img src="../assets/profile-icon.svg" alt="icon" className="default-icon"></img>
                <img src="../assets/profile-icon-hover.svg" alt="icon" className="hover-icon"></img>
              </div>
              <span>{t("profile")}</span>
            </li>
            <li className="liProfile">
              <Link href="" legacyBehavior>
                <a>
                  {/* <InlineSVG src={wallet_icon} /> */}
                  <div className="sidebar-icon">
                    <img src="../assets/logout-icon.svg" alt="icon" className="default-icon"></img>
                    <img src="../assets/logout-icon-hover.svg" alt="icon" className="hover-icon"></img>
                  </div>
                  <span onClick={() => handleLogout()}>{t("logout")}</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </SidebarCmp>
      {loader && <LoaderComponent />}
    </>
  );
};

export default SideBar;

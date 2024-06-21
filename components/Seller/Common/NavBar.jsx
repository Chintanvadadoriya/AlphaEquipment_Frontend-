import { NavBarDetail, NavBarProfile, NavBarProfileBell, NavBarProfileDetail, NavBarProfileName, NavContainer } from "@style";
import { router } from "@utils";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Offcanvas, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import InlineSVG from "react-inlinesvg";
import SideBar from "../Common/SideBar";
import { dashboard_icon, shop_icon, wallet_icon } from "../../../public/assets/svgOfPage";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t } = useTranslation();
  var CurrentDate = moment().format("D MMMM YYYY | LT");
  const profileData = useSelector((store) => store.user.userData);
  const Router = useRouter();
  const active = Router.query.tab;

  return (
    <>
      <NavContainer>
        <Button onClick={handleShow}>
          <span></span>
          <span></span>
          <span></span>
        </Button>
        <NavBarDetail>
          <h5>
            {t("welcome")}, {profileData?.userName?.toUpperCase()}
          </h5>
          <p>{CurrentDate}</p>
        </NavBarDetail>
        <NavBarProfile>
          <NavBarProfileBell
            onClick={() => {
              Router.push({
                pathname: router.SELLER,
                query: { tab: "notification" },
              });
            }}
          >
            <Image src={active == "notification" ? "/assets/icons/navbar/BellLogo.svg" : "/assets/icons/notification-block.svg"} width={40} height={40} alt="logo" className="menulogo" />
          </NavBarProfileBell>
          <NavBarProfileDetail>
            <NavBarProfileName>{profileData?.userName?.split(" ")[0]?.toUpperCase()}</NavBarProfileName>
            <img
              src={profileData?.profilePic ? profileData?.profilePic : "/assets/icons/navbar/ProfileLogo.svg"}
              width={40}
              height={40}
              alt="logo"
              className="menulogo"
              onError={(e) => {
                e.target.src = "/assets/icons/navbar/ProfileLogo.svg";
              }}
              onClick={() =>
                Router.push({
                  pathname: router.SELLER,
                  query: { tab: "profile" },
                })
              }
            />
          </NavBarProfileDetail>
        </NavBarProfile>
        <Offcanvas style={{ width: "240px" }} show={show} onHide={handleClose}>
          <Offcanvas.Body>
            <div className="sidebar-warp">
              <SideBar />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </NavContainer>
    </>
  );
};

export default NavBar;

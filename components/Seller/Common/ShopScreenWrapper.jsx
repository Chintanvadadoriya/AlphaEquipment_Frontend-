import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { ShopScreen } from "@style";

const ShopScreenWrapper = ({ children }) => {
  return (
    <>
      <ShopScreen>
        <div className="sidebar-block">
          <SideBar />
        </div>
        <div className="content-main">
          <NavBar className="top-nav" />
          <div className="dashboard">{children}</div>
        </div>
      </ShopScreen>
    </>
  );
};

export default ShopScreenWrapper;

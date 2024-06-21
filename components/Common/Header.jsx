import { HeaderStyle, TopBarBLock, ContactHeader, BottomBlockHeader } from "@style";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useEffect, useState } from "react";
import { router, toaster, useAuth } from "@utils";
import { useRouter } from "next/router";
import { userLogout } from "@services";
import ConnectWallet from "components/Web3/ConnectWallet";
import Collapse from "react-bootstrap/Collapse";

const Header = () => {
  // const
  const Router = useRouter();

  // state
  const [page, setPage] = useState("/");
  const [login, setLogin] = useState(true);
  const [open, setOpen] = useState(true);
  // useEffects

  // useEffect(() => {
  // 	checkRouter()
  // }, [])

  // methods

  const checkRouter = (path) => {
    if (Router.asPath.includes(path)) return "active";
    return;
  };

  const handleLogout = async () => {
    const logout = await userLogout();
    if (logout?.success) {
      localStorage.removeItem("persist:alpha");
      localStorage.removeItem("token");
      localStorage.clear();
      Router.push(router.LOGIN);
    }
  };

  return (
    <>
      <HeaderStyle>
        <TopBarBLock>
          <Container>
            <Row>
              <Col className="xs-1 gx-0 gx-md-3">
                <ContactHeader>
                  <div className="conatct-header-common">
                    <Link href="">
                      <img src="/assets/icons/call-icon.svg" alt="img" />
                      <p>+1 940 257 2957</p>
                    </Link>
                  </div>
                  <div className="conatct-header-common">
                    <Link href="">
                      <img src="/assets/icons/email-icon.svg" alt="img" />
                      <p>alphaequipmentlistings@listings.com</p>
                    </Link>
                  </div>
                </ContactHeader>
              </Col>
              <Col className="xs-11 gx-0 gx-md-3">
                <div className="menu-top-bar">
                  <ul>
                    <ConnectWallet />
                    <li>
                      <a href="#">Subscription</a>
                    </li>
                    <li>
                      <a href="#">Blog</a>
                    </li>
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </TopBarBLock>
        <BottomBlockHeader>
          <Container>
            <div className="header-inner-main">
              <div className="header-logo">
                <Link href={router.SPLASH} passHref>
                  <img src="/assets/icons/logo.svg" alt="logo" />
                </Link>
              </div>
              <div className="header-right">
                <InputGroup>
                  <Form.Control placeholder="Search over 85,523 items in inventory" />
                  <Button className="main-button">Search</Button>
                </InputGroup>
                <div className="header-menu-block">
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                      <ul>
                        <li>
                          <Link href={router.BUYERCATEGORY} passHref className={checkRouter(router.BUYERCATEGORY)}>
                            Category
                          </Link>
                        </li>
                        <li>
                          <Link href={router.BUYERAUCTION} passHref className={checkRouter(router.BUYERAUCTION)}>
                            Auction
                          </Link>
                        </li>
                        <li>
                          <Link href={router.BUYERSPAREPARTS} passHref className={checkRouter(router.BUYERSPAREPARTS)}>
                            Spare Parts
                          </Link>
                        </li>
                        <li>
                          <Link href={router.BUYERFINANCING} passHref className={checkRouter(router.BUYERFINANCING)}>
                            Financing
                          </Link>
                        </li>
                        <li>
                          <Link href={router.BUYERRENTED} passHref className={checkRouter(router.BUYERRENTED)}>
                            Rented
                          </Link>
                        </li>
                        <li>
                          <Link href={router.BUYERCALCULATOR} passHref className={checkRouter(router.BUYERCALCULATOR)}>
                            Calculator
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </div>
              <div className="login-register">
                {!login ? (
                  <>
                    <Button className="default-button">Register</Button>
                    <Button className="main-button">Login</Button>
                  </>
                ) : (
                  <>
                    <div className="after-login-block">
                      <div className="icon-after-login">
                        <Link href={router.NOTIFICATION} passHref className="bar-icon-link">
                          {checkRouter(router.NOTIFICATION) === "active" ? <img src="/assets/icons/navbar/BellLogo.svg" /> : <img src="/assets/icons/notification-block.svg" />}
                        </Link>
                      </div>
                      <div className="icon-after-login">
                      <Link href={router.CHAT} passHref className="bar-icon-link">
                          <img src="/assets/icons/messnger-icon.svg" />
                        </Link>
                      </div>
                      <div className="dropdown-profile-block">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <div className="porfile-block">
                              <img src="/assets/listing-img.png" />
                            </div>
                            <img src="/assets/icons/arrow-down.svg" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <Link href={router.PROFILE} passHref>
                                Profile
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <div onClick={() => handleLogout()}>Logout</div>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <Button className="bar-icon-link" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                      <img src="/assets/icons/bar-icon.svg" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Container>
        </BottomBlockHeader>
      </HeaderStyle>
    </>
  );
};

export default Header;

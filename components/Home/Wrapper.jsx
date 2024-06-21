import React, { useEffect, useState } from "react";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { HomeMain, CommonContent, AuctionBLock, AuctionBLockFlex, AuctionBLockFlexInner, CategoriesBlock, CategoriesFlex, CategoriesFlexInner, SparePartsBLock, SparePartsFlex, SparePartsFlexInner } from "@style";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CommonModal } from "@style";
import moment from "moment";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { ChooseAmountMembershipModel, ChoosePaymentMethodModel, UnblockMembershipModel, AddCardScreenModel, ChooseCardListModel } from "@models";
import { getHomeDetail, getProfile } from "@services";
import { getDateTime, router, toaster, encodeData, localStorageKeys, secureKeys } from "@utils";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { userSliceSelector, userStore } from "@redux";
import { useLocationMap } from "@hooks";
import { LoaderComponent } from "@components";

const Wrapper = () => {
  // state
  const [isModalUnlockMember, setIsUnlockMember] = useState(false);
  const [isModalUnlockMonthFree, setIsUnlockMonthFree] = useState(false);
  const [isModalPaymentMethod, setIsPaymentMethod] = useState(false);
  const [isAddtoCard, setIsAddtoCard] = useState(false);
  const [isCardList, setIsCardList] = useState(false);
  const [auctionData, setAuctionData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [rentedData, setRentedData] = useState([]);
  const [sparePartData, setSparePartData] = useState([]);
  const stripePromise = loadStripe(`${process.env.STRIPE_PRIVATE_KEY}`);
  const [disabledButtonAmount, setDisabledButtonAmount] = useState(true);
  const [loader, setLoader] = useState(false);

  // constant
  const { userData } = useSelector(userSliceSelector);
  const { t, i18n } = useTranslation();
  const Router = useRouter();
  const dispatch = useDispatch();
  const { calculateDistance } = useLocationMap();

  // useEffect
  useEffect(() => {
    setLoader(true);
    homeApiCall();

    if (!userData?.isSubscribe) {
      setIsUnlockMember(true);
    }
  }, [userData]);

  useEffect(() => {
    updateUserData();
    handleAllowLocation();
  }, []);

  // functions
  const homeApiCall = async () => {
    let detail = await getHomeDetail();
    setLoader(false);
    if (detail.success) {
      setAuctionData(detail?.data?.auctionData?.products);
      setCategoryData(detail?.data?.categoryData?.data);
      setRentedData(detail?.data?.rentedData?.products);
      setSparePartData(detail?.data?.sparePartData?.products);
    }
  };

  const updateUserData = async () => {
    const response = await getProfile();
    const setUserObject = response.data;
    dispatch(userStore(setUserObject));
  };

  const dateFormat = (data, dateFormat) => {
    let { date } = getDateTime(data, dateFormat || "MMM D yyyy");
    return date;
  };

  const handleAllowLocation = () => {
    let location = {
      permission: false,
    };
    navigator.permissions &&
      navigator.permissions.query({ name: "geolocation" }).then(function (PermissionStatus) {
        if (PermissionStatus.state !== "denied") {
          navigator.geolocation.getCurrentPosition(async (position) => {
            if (position) {
              location = {
                permission: true,
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
              };
              encodeData(location, secureKeys.location, localStorageKeys.location);
            }
          });
        } else {
          encodeData(location, secureKeys.location, localStorageKeys.location);
          toaster("error", "Please allow geolocation in browser");
        }
      });
  };

  return (
    <>
      <Header />
      <HomeMain>
        <div className="banner-img-block">
          <img src="/assets/icons/banner-img.png" alt="banner" />
        </div>
      </HomeMain>
      <CommonContent>
        {auctionData?.length && (
          <AuctionBLock className="common-padding-block">
            <Container>
              <div className="common-title-view">
                <h2>{t("auctionText")}</h2>
                <Button className="button-border" onClick={() => Router.push(router.BUYERAUCTION)}>
                  {t("viewAll")}
                </Button>
              </div>
              <AuctionBLockFlex>
                <Row>
                  {auctionData?.length &&
                    auctionData?.map((item, index) => {
                      return (
                        <Col xs={12} sm={6} lg={4} key={index}>
                          <AuctionBLockFlexInner>
                            <div className="action-block">
                              <div className="img-block-action">
                                <img
                                  src={item?.firstImage ? item?.firstImage : "/assets/action-block-img.png"}
                                  // for image error handling
                                  onError={(e) => {
                                    e.target.src = "/assets/action-block-img.png";
                                  }}
                                />
                              </div>
                              <div className="action-content">
                                <div className="action-content-title">
                                  <h3>{item?.name}</h3>
                                  {calculateDistance(item?.latitude, item?.longitude) && (
                                    <div className="distance-block">
                                      <img src="/assets/icons/distance-icon.svg" alt="img" />
                                      <p>{calculateDistance(item?.latitude, item?.longitude).toFixed(3)} km</p>
                                    </div>
                                  )}
                                </div>
                                <p className="location-disc">
                                  <span>{t("location")}:</span> {item?.country}
                                </p>
                                <div className="online-action">
                                  <Link href="">{t("onlineAuction")}</Link>
                                  <p className="last-date">
                                    {t("lastDate")}: <span>{item?.auctionEndDate && dateFormat(item?.auctionEndDate)}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </AuctionBLockFlexInner>
                        </Col>
                      );
                    })}
                </Row>
              </AuctionBLockFlex>
            </Container>
          </AuctionBLock>
        )}

        {categoryData?.length && (
          <CategoriesBlock className="common-padding-block">
            <Container>
              <div className="common-title-view">
                <h2>{t("categories")}</h2>
                <Button className="button-border" onClick={() => Router.push(router.BUYERCATEGORY)}>
                  {t("viewAll")}
                </Button>
              </div>
              <CategoriesFlex>
                <Row>
                  {categoryData?.length &&
                    categoryData?.map((item, index) => {
                      return (
                        <Col xs={12} sm={6} lg={3} key={index}>
                          <CategoriesFlexInner key={index}>
                            <div className="categories-block">
                              <div className="img-block-categories">
                                <img
                                  src={item?.image ? item?.image : "/assets/action-block-img.png"}
                                  onError={(e) => {
                                    e.target.src = "/assets/action-block-img.png";
                                  }}
                                />
                              </div>
                              <h2>
                                {item?.name} <span>({item?.subCategoryCount})</span>
                              </h2>
                            </div>
                          </CategoriesFlexInner>
                        </Col>
                      );
                    })}
                </Row>
              </CategoriesFlex>
            </Container>
          </CategoriesBlock>
        )}

        {sparePartData.length > 0 && (
          <SparePartsBLock className="common-padding-block">
            <Container>
              <div className="common-title-view">
                <h2>{t("spareParts")}</h2>
                <Button className="button-border" onClick={() => Router.push(router.BUYERSPAREPARTS)}>
                  {t("viewAll")}
                </Button>
              </div>
              <SparePartsFlex>
                {sparePartData?.length &&
                  sparePartData?.map((item, index) => {
                    return (
                      <SparePartsFlexInner key={index}>
                        <div className="spareparts-block">
                          <div className="img-block-spareparts">
                            <img
                              src={item?.firstImage ? item?.firstImage : "/assets/spareparts-img.png"}
                              onError={(e) => {
                                e.target.src = "/assets/spareparts-img.png";
                              }}
                            />
                          </div>
                          <div className="spareparts-block-content">
                            <h3>{item?.name}</h3>
                            <p>
                              {t("location")}: {item?.country}
                            </p>
                            <div className="price-distance">
                              {item?.price && (
                                <p className="price-tag">
                                  {t("price")}: {item?.price}$
                                </p>
                              )}
                              {calculateDistance(item?.latitude, item?.longitude) && (
                                <div className="distance-block">
                                  <img src="/assets/icons/distance-icon.svg" alt="img" />
                                  <p>{calculateDistance(item?.latitude, item?.longitude).toFixed(3)} km</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </SparePartsFlexInner>
                    );
                  })}
              </SparePartsFlex>
            </Container>
          </SparePartsBLock>
        )}

        {rentedData?.length > 0 && (
          <AuctionBLock className="common-padding-block">
            <Container>
              <div className="common-title-view">
                <h2>{t("rentedMachinery")}</h2>
                <Button className="button-border" onClick={() => Router.push(router.BUYERRENTED)}>
                  {t("viewAll")}
                </Button>
              </div>
              <AuctionBLockFlex>
                <Row>
                  {rentedData?.length &&
                    rentedData?.map((item, index) => {
                      return (
                        <Col xs={12} sm={6} lg={4} key={index}>
                          <AuctionBLockFlexInner key={index}>
                            <div className="action-block">
                              <div className="img-block-action">
                                <img
                                  src={item?.firstImage ? item?.firstImage : "/assets/action-block-img.png"}
                                  onError={(e) => {
                                    e.target.src = "/assets/spareparts-img.png";
                                  }}
                                />
                              </div>
                              <div className="action-content">
                                <div className="action-content-title">
                                  <h3>{item?.name}</h3>
                                  {calculateDistance(item?.latitude, item?.longitude) && (
                                    <div className="distance-block">
                                      <img src="/assets/icons/distance-icon.svg" alt="img" />
                                      <p>{calculateDistance(item?.latitude, item?.longitude).toFixed(3)} km</p>
                                    </div>
                                  )}
                                </div>
                                <p className="location-disc">
                                  <span>{t("location")}:</span> {item?.country}
                                </p>
                                <div className="online-action">
                                  <p className="last-date-rented">
                                    {t("meter")}: <span>3456hrs</span>
                                  </p>
                                  <p className="day-block-main">{item?.price}$/Day</p>
                                </div>
                              </div>
                            </div>
                          </AuctionBLockFlexInner>
                        </Col>
                      );
                    })}
                </Row>
              </AuctionBLockFlex>
            </Container>
          </AuctionBLock>
        )}
      </CommonContent>
      <Footer />
      <UnblockMembershipModel isModalUnlockMember={isModalUnlockMember} setIsUnlockMember={setIsUnlockMember} setIsUnlockMonthFree={setIsUnlockMonthFree} />

      <ChooseAmountMembershipModel isModalUnlockMonthFree={isModalUnlockMonthFree} setIsUnlockMonthFree={setIsUnlockMonthFree} setIsPaymentMethod={setIsPaymentMethod} setDisabledButtonAmount={setDisabledButtonAmount} disabledButtonAmount={disabledButtonAmount} />

      <ChoosePaymentMethodModel isModalPaymentMethod={isModalPaymentMethod} setIsPaymentMethod={setIsPaymentMethod} setIsAddtoCard={setIsAddtoCard} setDisabledButtonAmount={setDisabledButtonAmount} />
      <Elements stripe={stripePromise}>
        <AddCardScreenModel isAddtoCard={isAddtoCard} setIsAddtoCard={setIsAddtoCard} setDisabledButtonAmount={setDisabledButtonAmount} />
      </Elements>
      {loader && <LoaderComponent />}
    </>
  );
};

export default Wrapper;

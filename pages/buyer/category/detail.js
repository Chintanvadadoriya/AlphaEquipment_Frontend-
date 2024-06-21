import { AuthScreenWrapper, Header, Footer, PageDetails, SocialLoginButton, UserLogin, LoaderComponent } from "@components";
import { CommonInner } from "@style";
import { Button } from "react-bootstrap";

import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { createProductPaymentIntenet, createProductRequest, getProduct } from "@services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocationMap } from "@hooks";
import { AddCardScreenModel, ChooseAmountMembershipModel, ChoosePaymentMethodModel, UnblockMembershipModel } from "@models";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { userSliceSelector } from "@redux";
import { router } from "@utils";
import { useTranslation } from "react-i18next";

const CategoryDetail = () => {
  // state
  const [product, setProduct] = useState();

  const { t, i18n } = useTranslation();
  const metaDetail = {
    title: t("productDetail"),
    desc: t("productDetailPage"),
  };
  const { calculateDistance } = useLocationMap();
  const Router = useRouter();

  const { productId } = Router.query;
  const stripePromise = loadStripe(`${process.env.STRIPE_PRIVATE_KEY}`);
  const [isAddtoCard, setIsAddtoCard] = useState(false);
  const [disabledButtonAmount, setDisabledButtonAmount] = useState(true);
  const [isModalUnlockMember, setIsUnlockMember] = useState(false);
  const [isModalUnlockMonthFree, setIsUnlockMonthFree] = useState(false);
  const [isModalPaymentMethod, setIsPaymentMethod] = useState(false);
  const [buyProduct, setBuyProduct] = useState(false);
  const { userData } = useSelector(userSliceSelector);
  const [loading, setLoading] = useState();
  const [loader, setLoader] = useState(false);

  // useEffects

  useEffect(() => {
    setLoader(true);
    if (productId) {
      getProductDetail();
    }
  }, [Router.query]);

  // functions
  const getProductDetail = async () => {
    const result = await getProduct(`?productId=${productId}`);
    setProduct(result?.product);
    setLoader(false);
  };

  const pay = () => {
    if (userData?.isSubscribe) {
      setIsAddtoCard(true);
    } else {
      setIsUnlockMember(true);
    }
  };

  if (buyProduct) {
    const payload = {
      productId: product?.id,
      shopId: product?.shopId,
      price: product?.price,
    };
    createProductRequest(payload, {
      Loading: setLoading,
      onSuccess: async (res) => {
        if (res.success) {
          const payload = {
            amount: res.data.price,
            receiverId: res.data.receiverId,
            productId: res.data.productId,
            type: "fixedPrice",
            subId: res.data.id,
          };

          createProductPaymentIntenet(payload, {
            Loading: setLoading,
            onSuccess: async (res) => {},
            onError: (err) => {
              toaster("error", err.message);
            },
          });
        }
      },
      onError: (err) => {
        toaster("error", err.message);
      },
    });

    setBuyProduct(false);
  }

  return (
    <>
      <PageDetails metaDetail={metaDetail} />
      <Header />
      <CommonInner>
        <Container>
          <div className="category-detail-main">
            {product?.imagesUrl?.AdditionalEquipment && (
              <Carousel>
                {product?.imagesUrl?.AdditionalEquipment.filter((image) => {
                  return image != null;
                }).map((image, index) => (
                  <>
                    <div className="carousel-slider-img" key={index}>
                      {image && (
                        <img
                          src={image}
                          alt="slider-img"
                          onError={(e) => {
                            e.target.src = "/assets/action-block-img.png";
                          }}
                        />
                      )}
                    </div>
                  </>
                ))}
              </Carousel>
            )}
          </div>
          <div className="detail-content-inner">
            <Row>
              <Col md={8}>
                <div className="left-detail-content-inner">
                  <h2>{product?.name}</h2>
                  <div className="detail-product d-block d-sm-flex">
                    <div className="located-block">
                      <div class="common-block-lacted d-flex pe-2 justify-content-between align-items-end">
                        <div className="pe-3">
                          <img src="/assets/icons/location-icon.svg" alt="icon" />
                          <p>{t("located")}</p>
                        </div>

                        <div class="distance-block d-flex align-items-baseline">
                          <img src="/assets/icons/distance-icon.svg" alt="img" />
                          <p>
                            {calculateDistance(product?.latitude, product?.longitude)?.toFixed(3)}
                            km
                          </p>
                        </div>
                      </div>
                      <div className="lacted-address d-flex pe-2">
                        <figure className="mb-0 pe-2">
                          <img src="/assets/flag-img.png" alt="icon" />
                        </figure>
                        <h5>{product?.country}</h5>
                      </div>
                    </div>
                    <div className="common-block-content">
                      <img src="/assets/clock-icon.svg" alt="icon" />
                      <p>{t("hours")}</p>
                      <h4>4,465 hrs</h4>
                    </div>
                    {product?.serialnumber && (
                      <div className="common-block-content">
                        <img src="/assets/serial-number.svg" alt="icon" />
                        <p>{t("serialNo")}</p>
                        <h4>{product?.serialnumber}</h4>
                      </div>
                    )}
                  </div>
                  <div className="detail-main-block">
                    <h3>{t("detailInfo")}</h3>
                    <div className="feature-block-inner">
                      <h4>{t("feature")}:</h4>
                      <p>{product?.feature}</p>
                    </div>
                    <div className="feature-block-inner">
                      <h4>{t("usage1")}:</h4>
                      <p> {product?.Usage}</p>
                    </div>
                    <div className="feature-block-inner">
                      <h4>{t("catalogueNote")}:</h4>
                      <p>{product?.catalogue}</p>
                    </div>
                  </div>
                  <div className="common-details-block-img">
                    <div className="common-details-block-img-inner">
                      <div className="img-title-top">
                        <h3>{t("generalAppearance")}</h3>
                        <div className="img-block-photo">
                          <img src="/assets/icons/general-photo-img.svg" alt="general-img" />
                          <p>
                            {product?.imagesUrl?.AdditionalEquipment &&
                              product?.imagesUrl?.AdditionalEquipment?.filter((image) => {
                                return image != null;
                              }).length}{" "}
                            {t("photo")}
                          </p>
                        </div>
                      </div>
                      <div className="img-block-inner">
                        {product?.imagesUrl?.AdditionalEquipment &&
                          product?.imagesUrl?.AdditionalEquipment.filter((image) => {
                            return image != null;
                          }).map((image, index) => (
                            <>
                              <div className="img-block-slider" key={index}>
                                <img src={image} alt="slider-img" />
                              </div>
                            </>
                          ))}
                        <div className="icon-slider-img">
                          <a>
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </a>
                        </div>
                      </div>
                      <div className="feature-block-inner serial-number-block">
                        <h4>{t("serialNoVin")} :</h4>
                        <p>72846837978256375</p>
                      </div>
                      <div className="feature-block-inner">
                        <h4>{t("hourMeter")} :</h4>
                        <p>Sed iaculis ut lorem et interdum. Sed eu interdum dui, ac consectetur purus. Sed ac leo tincidunt, vestibulum augue in, viverra elit. Vivamus tristique, leo interdum fermentum ultrices, sem quam varius tellus</p>
                      </div>
                    </div>
                    <div className="common-details-block-img-inner">
                      <div className="img-title-top">
                        <h3>{t("engine")}</h3>
                        <div className="img-block-photo">
                          <img src="/assets/icons/general-photo-img.svg" alt="general-img" />
                          <p>
                            {product?.imagesUrl?.Engine &&
                              product?.imagesUrl?.Engine?.filter((image) => {
                                return image != null;
                              }).length}{" "}
                            {t("photo")}
                          </p>
                        </div>
                      </div>
                      <div className="img-block-inner">
                        {product?.imagesUrl?.Engine &&
                          product?.imagesUrl?.Engine.filter((image) => {
                            return image != null;
                          }).map((image, index) => (
                            <>
                              <div className="img-block-slider" key={index}>
                                <img src={image} alt="slider-img" />
                              </div>
                            </>
                          ))}
                        <div className="icon-slider-img">
                          <a>
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="common-details-block-img-inner">
                      <div className="img-title-top">
                        <h3>{t("drivetrain")}</h3>
                        <div className="img-block-photo">
                          <img src="/assets/icons/general-photo-img.svg" alt="general-img" />
                          <p>
                            {(product?.imagesUrl?.Equipment || product?.imagesUrl?.SparePart) &&
                              (product?.imagesUrl?.Equipment || product?.imagesUrl?.SparePart).filter((image) => {
                                return image != null;
                              }).length}{" "}
                            {t("photo")}
                          </p>
                        </div>
                      </div>
                      <div className="img-block-inner">
                        {(product?.imagesUrl?.Equipment || product?.imagesUrl?.SparePart) &&
                          (product?.imagesUrl?.Equipment || product?.imagesUrl?.SparePart)
                            .filter((image) => {
                              return image != null;
                            })
                            .map((image, index) => (
                              <>
                                <div className="img-block-slider" key={index}>
                                  <img src={image} alt="slider-img" />
                                </div>
                              </>
                            ))}
                        <div className="icon-slider-img">
                          <a>
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="common-details-block-img-inner">
                      <div className="img-title-top">
                        <h3>{t("controlStation")}</h3>
                        <div className="img-block-photo">
                          <img src="/assets/icons/general-photo-img.svg" alt="general-img" />
                          <p>
                            {product?.imagesUrl?.ControlStation &&
                              product?.imagesUrl?.ControlStation.filter((image) => {
                                return image != null;
                              }).length}{" "}
                            {t("photo")}
                          </p>
                        </div>
                      </div>
                      <div className="img-block-inner">
                        {product?.imagesUrl?.ControlStation &&
                          product?.imagesUrl?.ControlStation.filter((image) => {
                            return image != null;
                          }).map((image, index) => (
                            <>
                              <div className="img-block-slider" key={index}>
                                <img src={image} alt="slider-img" />
                              </div>
                            </>
                          ))}
                        <div className="icon-slider-img">
                          <a>
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="common-details-block-img-inner">
                      <div className="img-title-top">
                        <h3>{t("bodyConfig")}</h3>
                        <div className="img-block-photo">
                          <img src="/assets/icons/general-photo-img.svg" alt="general-img" />
                          <p>
                            {product?.imagesUrl?.Chassis &&
                              product?.imagesUrl?.Chassis.filter((image) => {
                                return image != null;
                              }).length}{" "}
                            {t("photo")}
                          </p>
                        </div>
                      </div>
                      <div className="img-block-inner">
                        {product?.imagesUrl?.Chassis &&
                          product?.imagesUrl?.Chassis.filter((image) => {
                            return image != null;
                          }).map((image, index) => (
                            <>
                              <div className="img-block-slider" key={index}>
                                <img src={image} alt="slider-img" />
                              </div>
                            </>
                          ))}
                        <div className="icon-slider-img">
                          <a>
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="common-details-block-img-inner border-none-padding">
                      <div className="img-title-top">
                        <h3>{t("underCarrige")}</h3>
                        <div className="img-block-photo">
                          <img src="/assets/icons/general-photo-img.svg" alt="general-img" />
                          <p>
                            {product?.imagesUrl?.Undercarriage &&
                              product?.imagesUrl?.Undercarriage.filter((image) => {
                                return image != null;
                              }).length}{" "}
                            {t("photo")}
                          </p>
                        </div>
                      </div>
                      <div className="img-block-inner">
                        {product?.imagesUrl?.Undercarriage &&
                          product?.imagesUrl?.Undercarriage.filter((image) => {
                            return image != null;
                          }).map((image, index) => (
                            <>
                              <div className="img-block-slider" key={index}>
                                <img src={image} alt="slider-img" />
                              </div>
                            </>
                          ))}
                        <div className="icon-slider-img">
                          <a>
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="right-detail-content-inner">
                  <div className="right-left-content">
                    <h3>{t("itemInfo")}</h3>
                    <div className="right-left-content-inner">
                      <div className="share-block-inner">
                        <p>{t("share")}</p>
                        <a>
                          <img src="/assets/icons/share-icon.svg" alt="icon" />
                        </a>
                      </div>
                      <h2>${product?.price}</h2>
                      <Button variant="primary" type="button" size="lg" className="btn-pay" onClick={() => pay()}>
                        {t("pay")}
                      </Button>
                      <p>Donec non tristique ex. Maecenas malesuada, nulla efficitur eleifend rutrum, risus quam consectetur ante, non fringilla libero nisi nec lectus. Morbi lectus ex, ultrices eget lobortis ut, dignissim a tortor. Donec sodales ante mi, id laoreet magna sodales vitae.</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="category-content-about">
            <h2>About Alpha Equipment Listings.</h2>
            <h3>Construction Equipment That You Can Trust</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacinia, augue nec imperdiet condimentum, est elit viverra ante, quis tincidunt ante ipsum in dui. Integer posuere, ipsum sed consequat suscipit, risus sem scelerisque odio, vehicula laoreet purus arcu at neque. Etiam varius enim eu tempor feugiat. Nulla facilisi. Donec rhoncus tortor ut dapibus mollis. Sed eu sem neque. Suspendisse ac pulvinar sem, sed pulvinar nunc. In quis dui id tellus malesuada consequat nec quis tellus. Ut consectetur elit orci, non dignissim lectus malesuada nec. Phasellus congue rhoncus mi, ut pellentesque tortor sollicitudin eu.</p>
            <h3>What type of used heavy equipment do we carry?</h3>
            <h4>Small Construction Equipment</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacinia, augue nec imperdiet condimentum, est elit viverra ante, quis tincidunt ante ipsum in dui. Integer posuere, ipsum sed consequat suscipit, risus sem scelerisque odio, vehicula laoreet purus arcu at neque. Etiam varius enim eu tempor feugiat. Nulla facilisi. Donec rhoncus tortor ut dapibus mollis. Sed eu sem neque.</p>
          </div>
        </Container>
      </CommonInner>
      <Footer />
      <UnblockMembershipModel isModalUnlockMember={isModalUnlockMember} setIsUnlockMember={setIsUnlockMember} setIsUnlockMonthFree={setIsUnlockMonthFree} />

      <ChooseAmountMembershipModel isModalUnlockMonthFree={isModalUnlockMonthFree} setIsUnlockMonthFree={setIsUnlockMonthFree} setIsPaymentMethod={setIsPaymentMethod} setDisabledButtonAmount={setDisabledButtonAmount} disabledButtonAmount={disabledButtonAmount} />

      <ChoosePaymentMethodModel isModalPaymentMethod={isModalPaymentMethod} setIsPaymentMethod={setIsPaymentMethod} setIsAddtoCard={setIsAddtoCard} setDisabledButtonAmount={setDisabledButtonAmount} />
      <Elements stripe={stripePromise}>
        <AddCardScreenModel isAddtoCard={isAddtoCard} setIsAddtoCard={setIsAddtoCard} setDisabledButtonAmount={setDisabledButtonAmount} setBuyProduct={setBuyProduct} />
      </Elements>
      {loader && <LoaderComponent />}
    </>
  );
};

export default CategoryDetail;

import { AuthScreenWrapper, Header, Footer, PageDetails, SocialLoginButton, UserLogin, LoaderComponent } from "@components";
import { CommonInner } from "@style";
import { Button, Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createAuctionProductRequest, createProductPaymentIntenet, getAuctionBid, getProduct } from "@services";
import { useLocationMap } from "@hooks";
import { useSelector } from "react-redux";
import { userSliceSelector } from "@redux";
import { loadStripe } from "@stripe/stripe-js";
import { getDateTime } from "@utils";
import { AddCardScreenModel, ChooseAmountMembershipModel, ChoosePaymentMethodModel, UnblockMembershipModel } from "@models";
import { Elements } from "@stripe/react-stripe-js";
import moment from "moment";

const AuctionDetail = () => {
  const [product, setProduct] = useState();
  const [bidData, setBidData] = useState([]);

  const [loading, setLoading] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const { userData } = useSelector(userSliceSelector);
  const stripePromise = loadStripe(`${process.env.STRIPE_PRIVATE_KEY}`);
  const [isAddtoCard, setIsAddtoCard] = useState(false);
  const [disabledButtonAmount, setDisabledButtonAmount] = useState(true);
  const [isModalUnlockMember, setIsUnlockMember] = useState(false);
  const [isModalUnlockMonthFree, setIsUnlockMonthFree] = useState(false);
  const [isModalPaymentMethod, setIsPaymentMethod] = useState(false);
  const [buyProduct, setBuyProduct] = useState(false);
  const [loader, setLoader] = useState(false);

  // constant
  let highBid = bidData[bidData?.length - 1];

  const [bidValue, setBidValue] = useState(product?.price);

  const { t, i18n } = useTranslation();
  const metaDetail = {
    title: t("auctionText"),
    desc: t("auctionPage"),
  };
  const Router = useRouter();
  const { calculateDistance } = useLocationMap();
  const { productId } = Router.query;

  useEffect(() => {
    setLoader(true);
    if (productId) {
      getProductDetail();
      getProductBid();
    }
  }, [Router.query]);

  useEffect(() => {
    if (highBid) {
      setBidValue(highBid?.bidAmount);
    } else {
      setBidValue(product?.price);
    }
  }, [highBid, product]);

  const pay = () => {
    if (userData?.isSubscribe) {
      setIsAddtoCard(true);
    } else {
      setIsUnlockMember(true);
    }
  };

  const getProductDetail = async () => {
    const result = await getProduct(`?productId=${productId}`);
    setProduct(result?.product);
    setLoader(false);
  };
  const getProductBid = async () => {
    const bidResult = await getAuctionBid({ productId: productId });

    setBidData(bidResult?.data.reverse());
  };

  const dateFormat = (data, dateFormat) => {
    let { date } = getDateTime(data, dateFormat || "LLL");
    return date;
  };

  if (buyProduct) {
    const payload = {
      productId: productId,
      shopId: product?.shopId,
      bidAmount: bidValue,
      bidType: product?.auctionType,
      lastDate: dateFormat(product?.auctionEndDate, "YYYY-MM-DD"),
    };

    createAuctionProductRequest(payload, {
      Loading: setLoading,
      onSuccess: async (res) => {
        if (res.success) {
          const payload = {
            amount: res.data.bidAmount,
            receiverId: res.data.receiverId,
            productId: res.data.productId,
            type: "auction",
            subId: res.data.id,
          };

          createProductPaymentIntenet(payload, {
            Loading: setLoading,
            onSuccess: async (res) => {
              if (res.success) {
                getProductBid();
                // setBidValue(0)
              }
            },
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
                      {image && <img src={image} alt="slider-img" />}
                    </div>
                  </>
                ))}
              </Carousel>
            )}
          </div>
          <div className="detail-content-inner">
            <Row>
              <Col lg={8}>
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
                      <p> {product?.feature}</p>
                    </div>
                    <div className="feature-block-inner">
                      <h4>{t("usage1")}:</h4>
                      <p>{product?.Usage}</p>
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
                            {" "}
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
                          <Link href="">
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </Link>
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
                          <Link href="">
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </Link>
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
                          <Link href="">
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </Link>
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
                          <Link href="">
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </Link>
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
                          <Link href="">
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </Link>
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
                          <Link href="">
                            <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="right-detail-content-inner">
                  <div className="right-left-content left-block-tabs">
                    {/* <h3>Item Info</h3> */}
                    <Tabs defaultActiveKey="item" id="uncontrolled-tab-example">
                      <Tab eventKey="item" title="Item Info">
                        <div className="right-left-content-inner">
                          <div className="share-block">
                            <p>Initial Price</p>
                            <Link href="#">
                              <img src="/assets/icons/share-icon.svg" alt="icon" />
                            </Link>
                          </div>
                          <h2>${product?.price}</h2>
                          {/* <Button variant="primary" type="button" size="lg" className="btn-pay">
                            Place Bid{" "}
                          </Button> */}
                          <div className="right-bid-time">
                            <div className="right-bid-time-detail">
                              <img src="/assets/icons/clock.svg" alt="clock" />
                              <h6>
                                Closes:<span className="blue">{product?.auctionEndDate && moment(product?.auctionEndDate).utc().format("MMM DD,YYYY HH:mm a")}</span>
                              </h6>
                            </div>
                            <div className="right-bid-time-detail">
                              <img src="/assets/icons/calender.svg" alt="calender" />
                              <h6>
                                Timed Auction: <span className="blue"> Australia National Unreserved Auction, AUS</span>
                              </h6>
                            </div>
                          </div>
                          <p>Donec non tristique ex. Maecenas malesuada, nulla efficitur eleifend rutrum, risus quam consectetur ante, non fringilla libero nisi nec lectus. Morbi lectus ex, ultrices eget lobortis ut, dignissim a tortor. Donec sodales ante mi, id laoreet magna sodales vitae.</p>
                        </div>
                      </Tab>
                      <Tab eventKey="bids" title={`Bids (${bidData?.length} bids)`}>
                        <div className="right-left-content-inner">
                          <div className="share-block-inner d-block share-warp">
                            {bidData?.map((data, index) => {
                              return (
                                <div className="bid-rate" key={index}>
                                  ${data?.bidAmount}
                                </div>
                              );
                            })}
                            {/* <div className="bid-rate">$73,000</div>
                            <div className="bid-rate">$80,000</div>
                            <div className="bid-rate high-bid">$80,000 High Bid</div>
                            <div className="bid-rate high-bid">$80,000 High Bid</div>
                            <div className="bid-rate high-bid">$80,000 High Bid</div>
                            <div className="bid-rate high-bid">$80,000 High Bid</div>
                            <div className="bid-rate high-bid">$80,000 High Bid</div>
                            <div className="bid-rate high-bid">$80,000 High Bid</div>
                            <div className="bid-rate high-bid">$80,000 High Bid</div> */}
                          </div>
                          <div className="bid-rate high-bid">{highBid?.bidAmount ? `$${highBid?.bidAmount} High Bid` : `Starts With Bid $${product?.price}`} </div>
                          {product?.auctionEndDate && (
                            <div className="bid-time-detail">
                              <h6>
                                Closes:<span className="blue">{moment(product?.auctionEndDate).utc().format("MMM DD,YYYY HH:mm a")}</span>
                              </h6>
                            </div>
                          )}
                          <Form.Group controlId="formBasicName" className="form-group-main">
                            {/* <Form.Label>Full Name</Form.Label> */}
                            <Form.Control
                              type="number"
                              // placeholder="Enter your bid amount"
                              value={bidValue}
                              onChange={(e) => {
                                setBidValue(e.target.value);
                              }}
                            />
                          </Form.Group>
                          {/* <Button type="button" size="lg" className="btn-pay outline-btn">
                            <h2>
                              $ <span>$82,000</span>
                            </h2>
                          </Button> */}
                          <div className="d-flex color-black">
                            <Button
                              type="button"
                              size="sm"
                              className="btn-pay increas-btn me-4"
                              onClick={() => {
                                setBidValue(Number(bidValue) - 10);
                              }}
                            >
                              -
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              className="btn-pay increas-btn"
                              onClick={() => {
                                setBidValue(Number(bidValue) + 10);
                              }}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            className="btn-pay mb-0"
                            disabled={bidValue > (highBid?.bidAmount ? Number(highBid?.bidAmount) : Number(product?.price)) ? false : true}
                            onClick={() => {
                              pay();
                            }}
                          >
                            Place Bid
                          </Button>
                        </div>
                      </Tab>
                    </Tabs>
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

export default AuctionDetail;

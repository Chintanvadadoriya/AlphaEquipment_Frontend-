import { AuthScreenWrapper, Header, Footer, PageDetails, SocialLoginButton, UserLogin, LoaderComponent } from "@components";
import { CommonInner } from "@style";
import { Button } from "react-bootstrap";

import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createProductPaymentIntenet, createProductRequest, getProduct } from "@services";
import { getDecodedData, localStorageKeys, secureKeys } from "@utils";
import { useSelector } from "react-redux";
import { userSliceSelector } from "@redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AddCardScreenModel, ChooseAmountMembershipModel, ChoosePaymentMethodModel, UnblockMembershipModel } from "@models";
import { useLocationMap } from "@hooks";
import { t } from "i18next";

const SparePartDetail = () => {
  const metaDetail = {
    title: t("sparePartDetail"),
    desc: t("sparePartDetail"),
  };
  const Router = useRouter();
  const [productDetailData, setProductDetailData] = useState();

  const stripePromise = loadStripe(`${process.env.STRIPE_PRIVATE_KEY}`);
  const [isAddtoCard, setIsAddtoCard] = useState(false);
  const [disabledButtonAmount, setDisabledButtonAmount] = useState(true);
  const [isModalUnlockMember, setIsUnlockMember] = useState(false);
  const [isModalUnlockMonthFree, setIsUnlockMonthFree] = useState(false);
  const [isModalPaymentMethod, setIsPaymentMethod] = useState(false);
  const [buyProduct, setBuyProduct] = useState(false);
  const [loading, setLoading] = useState();
  const [loader, setLoader] = useState(false);

  const { userData } = useSelector(userSliceSelector);

  const { calculateDistance } = useLocationMap();

  useEffect(() => {
    setLoader(true);
    getProductDetail(Router.asPath.slice(35));
  }, []);

  const getProductDetail = async (id) => {
    const result = await getProduct(`?productId=${id}`);

    setProductDetailData(result.product);
    setLoader(false);
  };

  let imgdata = productDetailData?.imagesUrl?.SparePart?.filter((image) => {
    return image != null;
  });

  const pay = () => {
    if (userData?.isSubscribe) {
      setIsAddtoCard(true);
    } else {
      setIsUnlockMember(true);
    }
  };

  if (buyProduct) {
    const payload = {
      productId: productDetailData?.id,
      shopId: productDetailData?.shopId,
      price: productDetailData?.price,
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
        <div className="category-detail-main">
          {/* <Carousel>

                  <div className="carousel-slider-img">
                <img src="/assets/slider-img.png" alt="slider-img" />
              </div>
              <div className="carousel-slider-img">
                <img src="/assets/slider-img.png" alt="slider-img" />
              </div>
              <div className="carousel-slider-img">
                <img src="/assets/slider-img.png" alt="slider-img" />
              </div>
            </Carousel> */}

          {productDetailData?.imagesUrl?.SparePart && (
            <Container>
              <Carousel>
                {imgdata.map((image, index) => (
                  <>
                    <div className="carousel-slider-img" key={index}>
                      {image && (
                        <img
                          src={image}
                          onError={(e) => {
                            e.target.src = "/assets/spareparts-img.png";
                          }}
                          alt="slider-img"
                        />
                      )}
                    </div>
                  </>
                ))}
              </Carousel>
            </Container>
          )}
        </div>
        <Container>
          <div className="detail-content-inner">
            <Row>
              <Col md={8}>
                <div className="left-detail-content-inner">
                  <h2>{productDetailData?.name}</h2>
                  <div className="detail-product spare-distance">
                    <div className="lacted-address">
                      <img src="/assets/icons/location-icon.svg" alt="icon" />
                      <p>{t("located")}</p>
                      <div className="d-flex">
                        <figure className="mb-0">
                          <img src="/assets/flag-img.png" alt="icon" />
                        </figure>
                        <span>{productDetailData?.country}</span>
                      </div>
                    </div>
                    <div className="location-detail">
                      <div class="distance-block">
                        <img src="/assets/icons/distance-icon.svg" alt="img" />
                        <p>
                          {calculateDistance(productDetailData?.latitude, productDetailData?.longitude)?.toFixed(3)}
                          km
                        </p>
                      </div>
                    </div>
                    {/* <div className="common-block-content">
                  <img src="/assets/clock-icon.svg" alt="icon" />
                  <p>Hours</p>
                  <h4>4,465 hrs</h4>
                </div>
                <div className="common-block-content">
                  <img src="/assets/serial-number.svg" alt="icon" />
                  <p>Serial number</p>
                  <h4>JEE0139930</h4>
                </div> */}
                  </div>
                  <div className="detail-main-block">
                    <h3>{t("detailInfo")}</h3>
                    <div className="feature-block-inner">
                      <h4>{t("feature")}:</h4>
                      <p>{productDetailData?.feature}</p>
                    </div>
                    <div className="feature-block-inner">
                      <h4>{t("usage1")}:</h4>
                      <p>{productDetailData?.Usage}</p>
                    </div>
                    <div className="feature-block-inner">
                      <h4>{t("catalogueNote")}:</h4>
                      <p>{productDetailData?.catalogue}</p>
                    </div>
                  </div>
                  {imgdata && (
                    <div className="common-details-block-img">
                      <div className="common-details-block-img-inner">
                        <div className="img-title-top">
                          <h3>{t("generalAppearance")}</h3>
                          <div className="img-block-photo">
                            <img src="/assets/icons/general-photo-img.svg" alt="general-img" />
                            <p>
                              {imgdata?.length} {t("photo")}
                            </p>
                          </div>
                        </div>
                        <div className="img-block-inner">
                          {imgdata?.map((image, index) => (
                            <div className="img-block-slider">{image && <img src={image} alt="slider-img" />}</div>
                          ))}
                          {/* <div className="img-block-slider">
                      <img src="/assets/slider-img.png" alt="slider-img" />
                    </div>
                    <div className="img-block-slider">
                      <img src="/assets/slider-img.png" alt="slider-img" />
                    </div>
                    <div className="img-block-slider">
                      <img src="/assets/slider-img.png" alt="slider-img" />
                    </div>
                    <div className="img-block-slider">
                      <img src="/assets/slider-img.png" alt="slider-img" />
                    </div> */}
                          <div className="icon-slider-img">
                            <Link href="">
                              <img src="/assets/icons/arrow-icon.svg" alt="slider-icon" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col md={4}>
                <div className="right-detail-content-inner">
                  <div className="right-left-content">
                    <h3>{t("itemInfo")}</h3>
                    <div className="right-left-content-inner">
                      <div className="share-block-inner">
                        <p>{t("share")}</p>
                        <Link href="#">
                          <img src="/assets/icons/share-icon.svg" alt="icon" />
                        </Link>
                      </div>
                      <h2>${productDetailData?.price}</h2>
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
        </Container>
        <Container>
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

export default SparePartDetail;

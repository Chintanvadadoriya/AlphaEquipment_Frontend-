import { AuthScreenWrapper, Header, Footer, PageDetails, SocialLoginButton, UserLogin, LoaderComponent } from "@components";
import { CommonInner } from "@style";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CommonModal } from "@style";
import Form from "react-bootstrap/Form";

import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import { createProductPaymentIntenet, createRentProductRequest, getProduct } from "@services";
import { useLocationMap } from "@hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { useSelector } from "react-redux";
import { userSliceSelector } from "@redux";
import { AddCardScreenModel, ChooseAmountMembershipModel, ChoosePaymentMethodModel, UnblockMembershipModel } from "@models";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { t } from "i18next";

const RentedDetail = () => {
  const [isAddtoCard, setIsAddtoCard] = useState(false);
  const [disabledButtonAmount, setDisabledButtonAmount] = useState(true);
  const [isModalUnlockMember, setIsUnlockMember] = useState(false);
  const [isModalUnlockMonthFree, setIsUnlockMonthFree] = useState(false);
  const [isModalPaymentMethod, setIsPaymentMethod] = useState(false);
  const [buyProduct, setBuyProduct] = useState(false);
  const [loading, setLoading] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [product, setProduct] = useState();
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(false);

  const metaDetail = {
    title: t("rentedDetail"),
    desc: t("rentedDetailPage"),
  };
  const Router = useRouter();
  const stripePromise = loadStripe(`${process.env.STRIPE_PRIVATE_KEY}`);
  const { productId } = Router.query;
  const { calculateDistance } = useLocationMap();
  const date = new Date().toJSON().slice(0, 10);
  const { userData } = useSelector(userSliceSelector);
  const formik = useFormik({
    initialValues: {
      rentStartDate: "",
      rentEndDate: "",
    },
    validationSchema: Yup.object({
      rentStartDate: Yup.string().required("rentStartDate is required"),
      rentEndDate: Yup.string().required("rentEndDate is required"),
    }),
    onSubmit: async (values, helpers) => {
      handleClose();
      if (userData?.isSubscribe) {
        setIsAddtoCard(true);
      } else {
        setIsUnlockMember(true);
      }
    },
  });
  const rentMin = moment(formik.values.rentStartDate.slice(0, 10)).add(1, "days");
  let rentMinPre;

  if (rentMin?._d != "Invalid Date") {
    rentMinPre = moment(rentMin?._d).format("YYYY-MM-DD HH:mm:ss");
  }

  useEffect(() => {
    setLoader(true);
    getProductDetail();
  }, [Router.query.productId]);

  useEffect(() => {
    if (Object.keys(formik.errors).length == 0) {
      if (formik?.values?.rentStartDate && formik?.values?.rentEndDate) {
        const a = moment(formik.values.rentEndDate.slice(0, 10));
        const b = moment(formik.values.rentStartDate.slice(0, 10));
        const dif = a.diff(b, "days");

        if (dif > 0) {
          setDays(dif);
          setTotal(product?.price * dif);
        } else {
          setDays(0);
          setTotal(0);
          formik.values.rentEndDate = "";
        }
      }
    }
  }, [formik]);

  const getProductDetail = async () => {
    const result = await getProduct(`?productId=${productId}`);
    setProduct(result?.product);
    setLoader(false);
  };

  if (buyProduct) {
    const rentStartDate = formik.values.rentStartDate.split("T");
    const rentEndDate = formik.values.rentEndDate.split("T");

    const payload = {
      productId: product?.id,
      shopId: product?.shopId,
      rentPrice: product?.price,
      days: days,
      fromDate: rentStartDate[0],
      toDate: rentEndDate[0],
      fromTime: rentStartDate[1],
      toTime: rentEndDate[1],
    };

    createRentProductRequest(payload, {
      Loading: setLoading,
      onSuccess: async (res) => {
        formik.handleReset();
        setDays(0);
        setTotal(0);

        if (res.success) {
          const payload = {
            amount: total,
            receiverId: res.data.receiverId,
            productId: res.data.productId,
            type: "rent",
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
                    <div className="carousel-slider-img">{image && <img src={image} alt="slider-img" />}</div>
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
                      <h2>${product?.price}</h2>
                      <Button variant="primary" type="button" size="lg" className="btn-pay" onClick={handleShow}>
                        {t("reqforRent")}
                      </Button>
                      <CommonModal className="modal-common-block commonmodal-block-modal" show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" style={{}} centered>
                        <Modal.Header
                          closeButton
                          onClick={(e) => {
                            formik.handleReset(e), setDays(0), setTotal(0);
                          }}
                        >
                          <Modal.Title>{t("booking")}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="pay-modal-block">
                            <h2>{t("addDetail")}</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium orci vel ante posuere, et pharetra magna consectetur.</p>
                          </div>
                          <div className="datepiker-block-inner">
                            <Form>
                              <Form.Group controlId="RentTimeStart" className="form-group-main">
                                <Form.Label for="RentTimeStart">{t("rentStartDate")} </Form.Label>
                                <Form.Control type="datetime-local" controlid="RentTimeStart" name="rentStartDate" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik?.values?.rentStartDate} min={new Date().toISOString().slice(0, 16)} />
                              </Form.Group>
                              {formik?.errors?.rentStartDate && formik?.touched?.rentStartDate && <p>{formik?.errors?.rentStartDate}</p>}
                              <Form.Group controlId="RentTimeEnd" className="form-group-main">
                                <Form.Label for="RentTimeEnd">{t("rentEndDate")} </Form.Label>
                                <Form.Control type="datetime-local" controlid="RentTimeEnd" name="rentEndDate" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik?.values?.rentEndDate} min={rentMinPre ? rentMinPre : ""} disabled={formik?.values?.rentStartDate ? false : true} />
                              </Form.Group>
                            </Form>
                            {formik?.errors?.rentEndDate && formik?.touched?.rentEndDate && <p>{formik?.errors?.rentEndDate}</p>}
                            <div className="pay-table-block-inner">
                              <h3>{t("totalAmountWillBe")}</h3>
                              <div className="pay-table-inner-block">
                                <div className="pay-table-inner">
                                  <h5>{t("perDay")}</h5>
                                  <p>${product?.price}</p>
                                </div>
                                <div className="pay-table-inner">
                                  <h5>{t("totalDays")}</h5>
                                  <p>
                                    {days} {t("days")}
                                  </p>
                                </div>
                                <div className="pay-table-inner total-block-yellow">
                                  <h5>{t("total")}</h5>
                                  <p>$ {total}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="primary"
                            type="submit"
                            // onClick={() => setOpenAccountDltModel(false)}
                            onClick={() => formik.handleSubmit()}
                            disabled={days ? false : true}
                          >
                            {t("pay")}
                          </Button>
                        </Modal.Footer>
                      </CommonModal>
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

export default RentedDetail;

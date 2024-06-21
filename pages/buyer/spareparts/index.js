import { AuthScreenWrapper, Header, Footer, PageDetails, SocialLoginButton, UserLogin, LoaderComponent } from "@components";
import { CommonInner } from "@style";
import Link from "next/link";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getProductListByProductType } from "@services";
import { useRouter } from "next/router";
import { getDecodedData, localStorageKeys, router, secureKeys } from "@utils";
import { useLocationMap } from "@hooks";
import { useTranslation } from "react-i18next";

const SpareParts = () => {
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(true);
  const [productData, setProductData] = useState([]);
  const [loader, setLoader] = useState(false);

  const { calculateDistance } = useLocationMap();
  const Router = useRouter();
  const { t, i18n } = useTranslation();
  const metaDetail = {
    title: t("spareParts"),
    desc: t("sparePartPage"),
  };
  let limit = 3;
  let pagination = true;
  let productType = "sparepart";
  useEffect(() => {
    getSparePartProduct(page);
  }, []);

  const getSparePartProduct = async (pageNo) => {
    setLoader(true);
    setPage(pageNo);
    const result = await getProductListByProductType(`?pageNo=${pageNo}&limit=${limit}&pagination=${pagination}&productType=${productType}`);
    setLoader(false);
    if (result?.Data?.currentPage <= result?.Data?.totalPages) {
      if (pageNo == 1) {
        setProductData(result?.Data?.products);
        if (result?.Data?.currentPage == result?.Data?.totalPages) {
          setIsNext(!isNext);
        }
      } else {
        setProductData(productData.concat(result?.Data?.products));
        if (result?.Data?.currentPage == result?.Data?.totalPages) {
          setIsNext(!isNext);
        }
      }
    } else {
      setIsNext(!isNext);
    }
  };

  return (
    <>
      <PageDetails metaDetail={metaDetail} />
      <Header />
      <CommonInner>
        <Container>
          <div className="category-block listing-block-category">
            <Row>
              <Col lg={3}>
                <div className="category-block-sidebar ">
                  <div className="category-block-sidebar-inner">
                    <div className="top-block-sidebar">
                      <h2>{t("filter")}</h2>
                    </div>
                    <div className="sidebar-link">
                      <Accordion>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>{t("region")}</AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>{t("buyFormat")}</AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>{t("auctionText")}</AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>{t("usage")}</AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>{t("make")}</AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>{t("model")}</AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>{t("year")}</AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>{t("buyPlatform")}</AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>{t("service")}</AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                            <Link href="#">Abc</Link>
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={9}>
                <div className="listing-block-inner category-detail">
                  <div className="listing-top-block">
                    <h2>{t("spareParts")}</h2>
                    <div className="search-block-main">
                      <InputGroup>
                        <Form.Control placeholder={t("searchCategory")} />
                        <Button className="main-button">
                          <img src="/assets/icons/search-icon.png" alt="icon"></img>
                        </Button>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="listing-block-roller inner-spear-parts-block">
                    {productData.map((data, index) => {
                      return (
                        <div className="listing-block-roller-inner ">
                          <div className="listing-block-img-inner">
                            <div className="listing-block-img">
                              <Link
                                href={{
                                  pathname: router.SPAREPARTS.DETAIL,
                                  query: { productId: data?.id },
                                }}
                              >
                                <img
                                  src={data.firstImage ? data.firstImage : "/assets/listing-img.png"}
                                  onError={(e) => {
                                    e.target.src = "/assets/spareparts-img.png";
                                  }}
                                  alt="listing-img"
                                ></img>
                              </Link>
                            </div>
                            <div className="listing-content">
                              <h3>{data?.name}</h3>
                              <div className="listing-laction">
                                <p>
                                  {t("location")}: {data?.country}
                                </p>
                                <div class="distance-block">
                                  <img src="/assets/icons/distance-icon.svg" alt="img"></img>
                                  <p>
                                    {(calculateDistance(data?.latitude, data?.longitude) && calculateDistance(data?.latitude, data?.longitude).toFixed(3)) || ""}
                                    km
                                  </p>
                                </div>
                              </div>
                              <div className="price-block-listing">
                                <p>
                                  <span>{t("price")}:</span> {data.price}$
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {isNext && (
                      <div className="last-btn-block">
                        <button type="button" className="main-button btn btn-primary" onClick={() => getSparePartProduct(page + 1)}>
                          {t("seeNxtPage")}
                        </button>
                      </div>
                    )}
                    {/* <div className="listing-block-roller-inner ">
                  <div className="listing-block-img-inner">
                    <div className="listing-block-img">
                      <img
                        src="/assets/listing-img.png"
                        alt="listing-img"
                      ></img>
                    </div>
                    <div className="listing-content">
                      <h3>Wheel Hub Seal Kits Truck</h3>
                      <div className="listing-laction">
                        <p>Location: Lorem ipsum dolor sit amet ipsum dolor</p>
                        <div class="distance-block">
                          <img
                            src="/assets/icons/distance-icon.svg"
                            alt="img"
                          ></img>
                          <p>4.3 km</p>
                        </div>
                      </div>

                      <div className="price-block-listing">
                        <p>
                          <span>Price:</span> 500$
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
                    {/* <div className="listing-block-roller-inner ">
                  <div className="listing-block-img-inner">
                    <div className="listing-block-img">
                      <img
                        src="/assets/listing-img.png"
                        alt="listing-img"
                      ></img>
                    </div>
                    <div className="listing-content">
                      <h3>Wheel Hub Seal Kits Truck</h3>
                      <div className="listing-laction">
                        <p>Location: Lorem ipsum dolor sit amet ipsum dolor</p>
                        <div class="distance-block">
                          <img
                            src="/assets/icons/distance-icon.svg"
                            alt="img"
                          ></img>
                          <p>4.3 km</p>
                        </div>
                      </div>

                      <div className="price-block-listing">
                        <p>
                          <span>Price:</span> 500$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-block-roller-inner ">
                  <div className="listing-block-img-inner">
                    <div className="listing-block-img">
                      <img
                        src="/assets/listing-img.png"
                        alt="listing-img"
                      ></img>
                    </div>
                    <div className="listing-content">
                      <h3>Wheel Hub Seal Kits Truck</h3>
                      <div className="listing-laction">
                        <p>Location: Lorem ipsum dolor sit amet ipsum dolor</p>
                        <div class="distance-block">
                          <img
                            src="/assets/icons/distance-icon.svg"
                            alt="img"
                          ></img>
                          <p>4.3 km</p>
                        </div>
                      </div>

                      <div className="price-block-listing">
                        <p>
                          <span>Price:</span> 500$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-block-roller-inner ">
                  <div className="listing-block-img-inner">
                    <div className="listing-block-img">
                      <img
                        src="/assets/listing-img.png"
                        alt="listing-img"
                      ></img>
                    </div>
                    <div className="listing-content">
                      <h3>Wheel Hub Seal Kits Truck</h3>
                      <div className="listing-laction">
                        <p>Location: Lorem ipsum dolor sit amet ipsum dolor</p>
                        <div class="distance-block">
                          <img
                            src="/assets/icons/distance-icon.svg"
                            alt="img"
                          ></img>
                          <p>4.3 km</p>
                        </div>
                      </div>

                      <div className="price-block-listing">
                        <p>
                          <span>Price:</span> 500$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-block-roller-inner ">
                  <div className="listing-block-img-inner">
                    <div className="listing-block-img">
                      <img
                        src="/assets/listing-img.png"
                        alt="listing-img"
                      ></img>
                    </div>
                    <div className="listing-content">
                      <h3>Wheel Hub Seal Kits Truck</h3>
                      <div className="listing-laction">
                        <p>Location: Lorem ipsum dolor sit amet ipsum dolor</p>
                        <div class="distance-block">
                          <img
                            src="/assets/icons/distance-icon.svg"
                            alt="img"
                          ></img>
                          <p>4.3 km</p>
                        </div>
                      </div>

                      <div className="price-block-listing">
                        <p>
                          <span>Price:</span> 500$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-block-roller-inner ">
                  <div className="listing-block-img-inner">
                    <div className="listing-block-img">
                      <img
                        src="/assets/listing-img.png"
                        alt="listing-img"
                      ></img>
                    </div>
                    <div className="listing-content">
                      <h3>Wheel Hub Seal Kits Truck</h3>
                      <div className="listing-laction">
                        <p>Location: Lorem ipsum dolor sit amet ipsum dolor</p>
                        <div class="distance-block">
                          <img
                            src="/assets/icons/distance-icon.svg"
                            alt="img"
                          ></img>
                          <p>4.3 km</p>
                        </div>
                      </div>

                      <div className="price-block-listing">
                        <p>
                          <span>Price:</span> 500$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-block-roller-inner ">
                  <div className="listing-block-img-inner">
                    <div className="listing-block-img">
                      <img
                        src="/assets/listing-img.png"
                        alt="listing-img"
                      ></img>
                    </div>
                    <div className="listing-content">
                      <h3>Wheel Hub Seal Kits Truck</h3>
                      <div className="listing-laction">
                        <p>Location: Lorem ipsum dolor sit amet ipsum dolor</p>
                        <div class="distance-block">
                          <img
                            src="/assets/icons/distance-icon.svg"
                            alt="img"
                          ></img>
                          <p>4.3 km</p>
                        </div>
                      </div>

                      <div className="price-block-listing">
                        <p>
                          <span>Price:</span> 500$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-block-roller-inner ">
                  <div className="listing-block-img-inner">
                    <div className="listing-block-img">
                      <img
                        src="/assets/listing-img.png"
                        alt="listing-img"
                      ></img>
                    </div>
                    <div className="listing-content">
                      <h3>Wheel Hub Seal Kits Truck</h3>
                      <div className="listing-laction">
                        <p>Location: Lorem ipsum dolor sit amet ipsum dolor</p>
                        <div class="distance-block">
                          <img
                            src="/assets/icons/distance-icon.svg"
                            alt="img"
                          ></img>
                          <p>4.3 km</p>
                        </div>
                      </div>

                      <div className="price-block-listing">
                        <p>
                          <span>Price:</span> 500$
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </CommonInner>
      <Footer />
      {loader && <LoaderComponent />}
    </>
  );
};

export default SpareParts;

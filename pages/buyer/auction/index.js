import { AuthScreenWrapper, Header, Footer, PageDetails, SocialLoginButton, UserLogin, LoaderComponent } from "@components";
import { AuthOption, HeadingContainer } from "@style";
import { CommonInner } from "@style";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { useTranslation } from "react-i18next";
import { getAuctionProductList, getSellTypeProductList } from "@services";
import { useEffect, useState } from "react";
import { router } from "@utils";
import { useLocationMap } from "@hooks";

const Auction = () => {
  //state
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(true);
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(false);

  // constant
  const { t, i18n } = useTranslation();
  const metaDetail = {
    title: t("auctionText"),
    desc: t("auctionPage"),
  };
  const { calculateDistance } = useLocationMap();
  let limit = 3;
  let pagination = true;
  // let param = ``;
  let sellType = "auction";

  // useEffect
  useEffect(() => {
    getProduct(1);
  }, []);

  // function
  const getProduct = async (pageNo = page) => {
    setLoader(true);
    setPage(pageNo);
    const result = await getSellTypeProductList(`?pageNo=${pageNo}&limit=${limit}&pagination=${pagination}&sellType=${sellType}`);
    console.log("result", result);
    setLoader(false);
    if (result?.Data?.currentPage && result?.Data?.totalPages && result?.Data?.currentPage <= result?.Data?.totalPages) {
      if (pageNo == 1) {
        setProduct(result?.Data?.products);
        if (result?.Data?.currentPage == result?.Data?.totalPages) {
          setIsNext(!isNext);
        }
      } else {
        setProduct(product.concat(result?.Data?.products));
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
                <div className="category-block-sidebar">
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
              <Col lg={9} className="g-4 g-lg-0">
                <div className="listing-block-inner">
                  <div className="listing-top-block">
                    <h2>Tamder Roller</h2>
                    <p>Showing 346 results for</p>
                  </div>
                  {product.length ? (
                    <div className="listing-block-roller">
                      {product?.map((item, index) => {
                        return (
                          <Link href={{ pathname: router.AUCTION.DETAIL, query: { productId: item?.id } }} key={index}>
                            <div className="listing-block-roller-inner" key={index}>
                              <div className="listing-block-img">
                                <img
                                  src={item?.firstImage ? item?.firstImage : "/assets/listing-img.png"}
                                  // for image error handling
                                  onError={(e) => {
                                    e.target.src = "/assets/listing-img.png";
                                  }}
                                  alt="listing-img"
                                ></img>
                              </div>
                              <div className="listing-content">
                                <h3>{item?.name}</h3>
                                <div className="listing-laction">
                                  <p>
                                    <span>{t("location")}:</span>
                                    {item?.country}
                                  </p>
                                  {calculateDistance(item?.latitude, item?.longitude) && (
                                    <div class="distance-block">
                                      <img src="/assets/icons/distance-icon.svg" alt="img"></img>
                                      <p>{calculateDistance(item?.latitude, item?.longitude).toFixed(3)} km</p>
                                    </div>
                                  )}
                                </div>
                                <div className="hourse-meeter-block">
                                  <p>
                                    <span>{t("hoursMeter")}:</span> 300h
                                  </p>
                                </div>
                                <div className="note-listing">
                                  <p>
                                    <span>{t("catalogueNote")}:</span> {item?.feature}
                                  </p>
                                </div>
                                <div className="price-block-listing">
                                  <p>
                                    <span>{t("price")}:</span> ${item?.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                      {isNext && (
                        <div className="last-btn-block">
                          <button type="button" className="main-button btn btn-primary" onClick={() => getProduct(page + 1)}>
                            {t("seeNxtPage")}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ textAlign: "center" }}>{t("noDataFound")}</div>
                  )}
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

export default Auction;

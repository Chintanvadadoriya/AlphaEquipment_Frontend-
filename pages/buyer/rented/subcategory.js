import { AuthScreenWrapper, Header, Footer, PageDetails, SocialLoginButton, UserLogin, LoaderComponent } from "@components";
import { CommonInner } from "@style";
import { Container, Row, Col } from "react-bootstrap";
import { router, toaster, useAuth } from "@utils";
import { buyerCommonApi } from "@hooks";
import { useEffect, useState } from "react";
import { subCategoryDetail } from "@services";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const RentedSubCategory = () => {
  //state
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(true);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [loader, setLoader] = useState(false);

  // constant
  const { t, i18n } = useTranslation();
  const Router = useRouter();
  const { categoryId } = Router.query;
  let limit = 3;
  let pagination = true;
  let param = ``;
  let sellType = "rent";
  const { sidebarSubCategory, subcategory } = buyerCommonApi();
  const metaDetail = {
    title: t("rentedSubCategory"),
    desc: t("rentedSubCategoryPage"),
  };

  // useEffect

  useEffect(() => {
    if (categoryId) {
      param += `?categoryId=${categoryId}`;
    }
    sidebarSubCategory(`${param}`);
    getSubCategory(1, param);
  }, [Router.query]);

  // functions

  const handleRedirect = async (subId, name, count) => {
    Router.push({
      pathname: router.RENTED.PRODUCT,
      query: { subCId: subId, subCName: name, subCCount: count },
    });
  };

  const getSubCategory = async (pageNo = page, param = "") => {
    setLoader(true);
    if (param) {
      setPage(pageNo);
      const result = await subCategoryDetail(`${param}&pagination=${pagination}&pageNo=${pageNo}&limit=${limit}&sellType=${sellType}`);
      setLoader(false);
      if (result?.currentPage && result?.totalPages && result?.currentPage <= result?.totalPages) {
        if (pageNo == 1) {
          setSubCategoryData(result?.data[0]?.data);
          if (result?.currentPage == result?.totalPages) {
            setIsNext(!isNext);
          }
        } else {
          setSubCategoryData(subCategoryData.concat(result?.data[0]?.data));
          if (result?.currentPage == result?.totalPages) {
            setIsNext(!isNext);
          }
        }
      } else {
        setIsNext(!isNext);
      }
    }
  };

  return (
    <>
      <PageDetails metaDetail={metaDetail} />
      <Header />
      <CommonInner>
        <Container>
          <Row>
            <Col md={3}>
              <div className="category-block-sidebar">
                <div className="category-block-sidebar-inner">
                  <div className="top-block-sidebar">
                    <h2>{t("compactors")}</h2>
                  </div>
                  <div className="sidebar-link">
                    {subcategory?.length ? (
                      <ul>
                        {subcategory?.map((item, index) => {
                          return (
                            <li key={index} onClick={() => handleRedirect(item?.id, item?.name, item?.productsCount)}>
                              <a>
                                {item?.name} <span>({item?.productsCount})</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div style={{ textAlign: "center" }}>{t("noDataFound")}</div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={9}>
              <div className="category-block-right">
                <div className="category-block-right-inner">
                  <div className="top-block-right">
                    <h2>{t("topCategory")}</h2>
                    <div className="input-group">
                      <input placeholder={t("searchCategory")} className="form-control"></input>
                      <button type="button" className="main-button btn btn-primary">
                        <img src="/assets/icons/search-icon.png" alt="search-icon" />
                      </button>
                    </div>
                  </div>
                  <div className="category-block-list">
                    {subCategoryData?.length ? (
                      <div className="category-box">
                        {subCategoryData?.map((item, index) => {
                          return (
                            <div className="category-box-detail" key={index}>
                              <Link href={{ pathname: router.RENTED.PRODUCT, query: { subCId: item?.id, subCName: item?.name, subCCount: item?.productsCount } }}>
                                <img
                                  src={item?.image ? item?.image : "/assets/category-img.png"}
                                  alt="category-img"
                                  onError={(e) => {
                                    e.target.src = "/assets/category-img.png";
                                  }}
                                />
                                <p>
                                  {item?.name} <span>({item?.productsCount})</span>
                                </p>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ textAlign: "center" }}>{t("noDataFound")}</div>
                    )}

                    {isNext && (
                      <div className="button-block-last">
                        <button type="button" className="main-button btn btn-primary" onClick={() => getSubCategory(page + 1, `?categoryId=${categoryId}`)}>
                          {t("seeNxtPage")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </CommonInner>
      <Footer />
      {loader && <LoaderComponent />}
    </>
  );
};

export default RentedSubCategory;

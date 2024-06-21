import React, { useState, useEffect } from "react";
import { CommonBlockContent, TopContentCommon, CommonMiddleContent } from "@style";
import { CiSearch } from "react-icons/ci";
import { router, toaster, useAuth, encodeData, localStorageKeys, secureKeys } from "@utils";
import { LoaderComponent, RentList } from "@components";
import { useRouter } from "next/router";
import { Button, Form, Modal } from "react-bootstrap";
import Link from "next/link";
import { getRentList } from "@services";
import { useTranslation } from "react-i18next";

const Request = () => {
  // state
  const [url, setUrl] = useState({});
  const [rentList, setRentList] = useState([]);
  const [loader, setLoader] = useState(false);

  // constant
  const Router = useRouter();
  const { tab = null, id = null } = url;
  const { t, i18n } = useTranslation();
  // useEffect

  useEffect(() => {
    setUrl(Router.query);
    rentListFun();
    setLoader(true)
  }, [Router.query]);

  // functions
  async function rentListFun() {
    const resRentList = await getRentList();
    setRentList(resRentList?.data);
    setLoader(false)
  }

  return (
    <div>
      {!id && (
        <CommonBlockContent>
          <TopContentCommon>
            <h3>{t("rentRequest")}</h3>
            <div className="input-group-block-custom">
              <div className="input-group-block-inner">
                <Form.Select aria-label="userType" name="userType">
                  <option key="1" value="All">
                  {t("all")}
                  </option>
                  <option key="2" value="Name">
                    {t("name")}
                  </option>
                  <option key="3" value="Condition">
                    {t("condition")}
                  </option>
                  <option key="4" value="In Stock">
                    {t("inStock")}
                  </option>
                  <option key="5" value="Price">
                    {t("price")}
                  </option>
                  <option key="6" value="Type">
                    {t("type")}
                  </option>
                </Form.Select>
              </div>
              <div className="from-group-input">
                <div className="from-group-input-inner">
                  <Form.Control aria-label="Example text with button addon" aria-describedby="basic-addon1" placeholder="abc" />
                </div>
                <Button>
                  <CiSearch />
                </Button>
              </div>
            </div>
            <div className="blank-space"></div>
          </TopContentCommon>
          <CommonMiddleContent>
            <div className="block-shop-table">
              <div className="common-table-block">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>{t("product")} </th>
                      <th>{t("rentDay")}</th>
                      <th>{t("request")}</th>
                      <th>{t("action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                  {rentList?.length !== 0?
                    rentList.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}-</td>
                          <td>{data?.productName}</td>
                          <td>{data?.price}$</td>
                          <td>{data?.request}</td>
                          <td>
                            <Link href={{ pathname: router.SELLER, query: { tab: "rentRequest", id: data?.productId } }} className="link-view-block">
                              {t("view")}
                            </Link>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={5} style={{textAlign: "center"}}>
                          {t("noDataFound")}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CommonMiddleContent>
        </CommonBlockContent>
      )}

      {id && <RentList />}
      {loader && <LoaderComponent />}
    </div>
  );
};

export default Request;

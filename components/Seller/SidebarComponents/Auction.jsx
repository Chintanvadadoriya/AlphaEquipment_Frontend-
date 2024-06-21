import React, { useState, useEffect } from "react";
import { CommonBlockContent, TopContentCommon, CommonMiddleContent } from "@style";
import { CiSearch } from "react-icons/ci";
import { CommonModal } from "@style";
import Image from "next/image";
import { Button, Form, Modal } from "react-bootstrap";
import { getDateTime, router } from "@utils";
import { AuctionList, LoaderComponent } from "@components";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAuctionSellerProductList } from "@services";
import { useTranslation } from "react-i18next";

const Auction = () => {
  // state
  const [url, setUrl] = useState({});
  const [reqListData, setReqListData] = useState();
  const [loader, setLoader] = useState(false);

  // constant
  const Router = useRouter();
  const { tab = null, id = null } = url;
  const { t, i18n } = useTranslation();

  // useEffect
  useEffect(() => {
    setUrl(Router.query);
    auctionReqList();
    setLoader(true)
  }, [Router.query]);

  // functions
  const auctionReqList = async () => {
    const res = await getAuctionSellerProductList();

    setReqListData(res?.data);
    setLoader(false)
  };

  const dateFormat = (data, dateFormat) => {
    let { date } = getDateTime(data, dateFormat || "DD-MM-YYYY");
    return date;
  };

  return (
    <div>
      {!id && (
        <CommonBlockContent>
          <TopContentCommon>
            <h3>Auction</h3>
            <div className="input-group-block-custom">
              <div className="input-group-block-inner">
                <Form.Select aria-label="userType" name="userType">
                  <option key="1" value="All">
                    All
                  </option>
                  <option key="2" value="Name">
                    Name
                  </option>
                  <option key="3" value="Condition">
                    Condition
                  </option>
                  <option key="4" value="In Stock">
                    In Stock
                  </option>
                  <option key="5" value="Price">
                    Price
                  </option>
                  <option key="6" value="Type">
                    Type
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
                      <th>Product </th>
                      <th>Total Bid</th>
                      <th>Highest Bid</th>
                      <th>Bid Type</th>
                      <th>Last Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reqListData?.length !== 0 ? (
                      reqListData?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}-</td>
                            <td>{data?.productName}</td>
                            <td>{data?.totalBid}</td>
                            <td>{data?.maxBidAmount}$</td>
                            <td>{data?.auctionType}</td>
                            <td>{dateFormat(data?.auctionEndDate)}</td>
                            <td>
                              <Link href={{ pathname: router.SELLER, query: { tab: "auctionRequest", id: data?.productId } }} className="link-view-block">
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} style={{"text-align": "center"}}>
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

      {id && <AuctionList />}
      {loader && <LoaderComponent />}
    </div>
  );
};

export default Auction;

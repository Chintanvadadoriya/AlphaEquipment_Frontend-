import React, { useEffect, useState } from "react";
import { CommonBlockContent, TopContentCommon, CommonMiddleContent } from "@style";
import { CiSearch } from "react-icons/ci";
// import Form from "react-bootstrap/Form";
import { Button, Form } from "react-bootstrap";
import { getOrderStatus } from "@services";
import { useTranslation } from "react-i18next";
import { getDateTime } from "@utils";

const OrdersStatus = () => {
  const [orderStatusData, setOrderStatusData] = useState([]);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    orderStatus();
  }, []);

  const orderStatus = async () => {
    const result = await getOrderStatus();

    setOrderStatusData(result?.data);
  };

  const dateFormat = (data, dateForamte) => {
    const { date } = getDateTime(data, dateForamte);
    return date;
  };

  return (
    <CommonBlockContent>
      <TopContentCommon>
        <h3>Order Detail</h3>
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
            <table className="table-row-block-number">
              <thead>
                <tr>
                  <th>Buyer Name</th>
                  <th>Product Name</th>
                  {/* <th>In Stock</th> */}
                  <th>State</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orderStatusData.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {t("noDataFound")}
                    </td>
                  </tr>
                ) : (
                  orderStatusData?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data?.buyerName}</td>
                        <td>{data?.productName ? data?.productName : "-"}</td>
                        <td>
                          <span className={data.status === "canceled" || data.status === "requires_capture" ? "pending-process" : "completed-process"}>{data.status === "canceled" ? "Rejected" : data.status === "requires_capture" ? "Pending" : "Completed"}</span>
                        </td>
                        <td>{dateFormat(data?.createdAt, "DD-MM-YYYY")}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CommonMiddleContent>
    </CommonBlockContent>
  );
};

export default OrdersStatus;

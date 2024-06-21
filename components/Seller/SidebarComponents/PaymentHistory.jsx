import React from "react";
import { CommonBlockContent, TopContentCommon, CommonMiddleContent } from "@style";
import { CiSearch } from "react-icons/ci";
// import Form from "react-bootstrap/Form";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { getPaymentHistory } from "@services";
import moment from "moment";
import { LoaderComponent } from "@components";
const PaymentHistory = () => {
  //state
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  console.log("paymentHistoryData", paymentHistoryData);
  const [loader, setLoader] = useState(false);

  //const

  //useeffect

  useEffect(() => {
    paymentHistory();
    setLoader(true)
  }, []);

  //function
  const paymentHistory = async () => {
    const result = await getPaymentHistory();

    setPaymentHistoryData(result?.data);
    setLoader(false)
  };

  return (
    <CommonBlockContent>
      <TopContentCommon>
        <h3>Payment History</h3>
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
                  <th>Sale</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistoryData?.map((data, index) => {
                  return (
                    <tr>
                      <td>{data?.buyerName}</td>
                      <td>{data?.productName}</td>
                      <td>{data?.productType}</td>
                      <td>{moment(data?.createdAt).format("DD/MM/YYYY")}</td>
                      <td>{data?.amount}$</td>
                      <td>Wallet</td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        </div>
      </CommonMiddleContent>
      {loader && <LoaderComponent />}
    </CommonBlockContent>

  );
};

export default PaymentHistory;

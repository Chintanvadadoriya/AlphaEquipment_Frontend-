import { CommonBlockContent, TopBLockProfileShop, CommonMiddleContent } from "@style";
import { CommonModal } from "@style";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { CiSearch } from "react-icons/ci";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, shopState } from "@redux";
import { deleteProduct, getProductList, getProductById } from "@services";
import { useEditProduct, cleanTransaction } from "@hooks";
import { useTranslation } from "react-i18next";
import { deleteProductAction } from "redux/Actions/deleteProduct";
import { TransactionModel } from "@models";
import { useWeb3React } from "@web3-react/core";
import { LoaderComponent } from "@components";

const ShopList = ({ setShowProductList = () => {} }) => {
  const [isModalProductDelete, setisProductDelete] = useState(false);
  const handleProductDelete = () => setisProductDelete(true);
  const handleProductDeleteClose = () => setisProductDelete(false);
  const [openSucModel, setOpenSucModel] = useState(false);
  const [productListData, setProductListData] = useState();
  const [productListSoldData, setProductListSoldData] = useState();
  console.log("productListData", productListData);
  const [dltProductId, setDltProductId] = useState();
  const { updateProduct, setData } = useEditProduct();
  const { handleClose } = cleanTransaction();
  const [tabIndex, setTabIndex] = useState(0);
  const { transaction, loading } = useSelector(shopState);
  const { account, active, chainId, library } = useWeb3React();
  const [checkBalance, setCheckBalance] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [editProductId, setEditProductId] = useState();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    getProduct();
    setLoader(true);
  }, []);

  useEffect(() => {
    (async () => {
      let balance = await library?.getBalance(account);

      setCheckBalance(balance?.gt(0));
    })();
  }, [account]);

  useEffect(() => {
    if (tabIndex == 2) {
      setLoader(true);
      getSoldProduct();
    }
  }, [tabIndex]);

  useEffect(() => {
    if (!transaction?.hash && !transaction?.type) {
      return;
    }

    if ((["delete_product"].includes(transaction?.type) && (transaction?.status === "success" || transaction?.status === "failed")) || (transaction?.status === "pending" && !openSucModel)) {
      setOpenSucModel(true);
    }
  }, [openSucModel, transaction, transaction?.status]);

  const getProduct = async () => {
    const res = await getProductList();

    setProductListData(res?.data);
    setLoader(false);
  };

  const getSoldProduct = async () => {
    const res = await getProductList("status=sold");

    setProductListSoldData(res?.data);
    setLoader(false);
  };

  const selectEditProduct = async (id) => {
    const res = await getProductById({ productId: id });

    dispatch(editProduct(res?.product));
    setShowProductList("editproduct");
  };

  const selectDltProduct = async (id, uuid) => {
    console.log("uuid :>> ", uuid);
    setDltProductId({ id: id, uuid: uuid });
    handleProductDelete();
  };

  const dltProduct = async () => {
    // const res = await deleteProduct(dltProductId);
    console.log("dltProductId :>> ", dltProductId);
    // if (res?.success) {
    //   handleProductDeleteClose();
    //   getProduct();
    // }
    const closeModel = async () => {
      handleProductDeleteClose();
      getProduct();
    };
    let payloadData = {
      productUuid: dltProductId.uuid,
      account: account,
      chainId: chainId,
      active: active,
      balance: checkBalance,
      closeModel: closeModel,
    };
    dispatch(deleteProductAction(payloadData));
  };

  return (
    <>
      <Tabs onSelect={(index) => setTabIndex(index)}>
        <CommonBlockContent>
          <TopBLockProfileShop>
            {/* <h3>My Shop</h3> */}
            <div className="tab-block-shop">
              <TabList>
                <Tab>{t("myShop")}</Tab>
                <Tab>{t("stock")}</Tab>
                <Tab>sold</Tab>
              </TabList>
              {/* </Tabs> */}
            </div>
            <div className="input-group-block">
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

            <Button
              className="button-common"
              onClick={() => {
                // console.log("first");
                // handleClose(setOpenSucModel, setShowProductList, editProduct(null));
                setShowProductList("addproduct");
                // dispatch(addProduct(null));
              }}
            >
              <span>+</span> {t("addProduct")}
            </Button>
          </TopBLockProfileShop>
          <CommonMiddleContent>
            <div className="block-shop-table">
              {/* <Tabs> */}
              <TabPanel>
                <div className="common-table-block">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>{t("name")}</th>
                        <th>{t("condition")}</th>
                        {/* <th>In Stock</th> */}
                        <th>{t("price")}</th>
                        <th>{t("type")}</th>
                        <th>{t("actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productListData?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}-</td>
                            <td>{data?.name}</td>
                            <td>
                              <span className={data?.equipmentType === "new" ? "badge-custom" : "badge-custom used-badge"}>{data?.equipmentType}</span>
                            </td>
                            {/* <td>3</td> */}
                            <td>{data?.price ? `${data?.price}$` : "-"}</td>
                            <td>{data?.productType}</td>
                            <td>
                              <div className="action-edit-delete">
                                <a
                                  onClick={() => {
                                    // setShowProductList("editproduct");
                                    selectEditProduct(data?.id);
                                  }}
                                >
                                  {t("edit")}
                                </a>
                                <a onClick={() => selectDltProduct(data?.id, data?.uuid)}>{t("delete")}</a>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <CommonModal className="modal-common-block diff-delete-btn-block" show={isModalProductDelete} onHide={() => setisProductDelete(false)} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" style={{}} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>{t("deleteProduct")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="delete-content-block">
                        <p>{t("confirmDeleteProduct")}</p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <div className="button-content-footer">
                        <Button className="cancel-btn" onClick={() => handleProductDeleteClose()}>
                          {t("cancel")}
                        </Button>
                        <Button className="confirm-btn" onClick={() => dltProduct()}>
                          {t("confirm")}
                        </Button>
                      </div>
                    </Modal.Footer>
                  </CommonModal>
                </div>
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
              <TabPanel>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>{t("name")}</th>
                      <th>{t("condition")}</th>
                      {/* <th>In Stock</th> */}
                      <th>{t("price")}</th>
                      <th>{t("type")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productListSoldData?.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}-</td>
                          <td>{data?.name}</td>
                          <td>
                            <span className={data?.equipmentType === "new" ? "badge-custom" : "badge-custom used-badge"}>{data?.equipmentType}</span>
                          </td>
                          {/* <td>3</td> */}
                          <td>{data?.price ? `${data?.price}$` : "-"}</td>
                          <td>{data?.productType}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </TabPanel>
            </div>
          </CommonMiddleContent>
        </CommonBlockContent>
      </Tabs>
      {loader && <LoaderComponent />}
      <TransactionModel open={openSucModel} handleClose={() => handleClose(setOpenSucModel)} transaction={transaction} />
    </>
  );
};

export default ShopList;

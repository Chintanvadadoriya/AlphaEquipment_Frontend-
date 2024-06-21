import { LoaderComponent } from "@components";
import { getNotificationList } from "@services";
import { CommonBlockContent, CommonMiddleContent } from "@style";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Notification = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [loader, setLoader] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setLoader(true);
    notificationList();
  }, []);

  const notificationList = async () => {
    const res = await getNotificationList();

    setNotificationData(res?.data);
    setLoader(false);
  };

  return (
    <>
      <CommonBlockContent>
        <CommonMiddleContent>
          <div className="block-shop-table">
            {/* <Tabs> */}

            <div className="common-table-block">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("name")}</th>
                    {/* <th>{t("condition")}</th> */}
                    {/* <th>In Stock</th> */}
                    <th>{t("price")}</th>
                    <th>{t("type")}</th>
                    {/* <th>{t("actions")}</th> */}
                  </tr>
                </thead>
                <tbody>
                  {notificationData?.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ "text-align": "center" }}>
                        {t("noDataFound")}
                      </td>
                    </tr>
                  ) : (
                    notificationData?.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}-</td>
                          <td>{data?.product?.name}</td>
                          {/* <td>
                              <span
                                className={
                                  // data?.equipmentType === "new"
                                  //   ? "badge-custom"
                                  //   :
                                    "badge-custom used-badge"
                                }
                              >
                                {"data?.equipmentType"}
                              </span>
                            </td> */}

                          <td>{data?.price ? `${data?.price}$` : "-"}</td>
                          <td>{data?.productSellType}</td>
                          {/* <td>
                              <div className="action-edit-delete">
                                <a
                                  onClick={() => {

                                    selectEditProduct(data?.id);
                                  }}
                                >
                                  {t("edit")}
                                </a>
                                <a onClick={() => selectDltProduct(data?.id)}>
                                  {t("delete")}
                                </a>
                              </div>
                            </td> */}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              {/* <CommonModal
                    className="modal-common-block diff-delete-btn-block"
                    show={isModalProductDelete}
                    onHide={() => setisProductDelete(false)}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    style={{}}
                    centered
                  >
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
                        <Button
                          className="cancel-btn"
                          onClick={() => handleProductDeleteClose()}
                        >
                          {t("cancel")}
                        </Button>
                        <Button
                          className="confirm-btn"
                          onClick={() => dltProduct()}
                        >
                          {t("confirm")}
                        </Button>
                      </div>
                    </Modal.Footer>
                  </CommonModal> */}
            </div>
          </div>
        </CommonMiddleContent>
      </CommonBlockContent>
      {loader && <LoaderComponent />}
    </>
  );
};

export default Notification;

import Modal from "react-bootstrap/Modal";
import { Input } from "@components";
import { CommonModal, themeColor } from "@style";
import Button from "react-bootstrap/Button";
import SuccessResModel from "./SuccessResModel";
import { useMemo, useEffect, useState } from "react";
import { userSliceSelector, planSelector, userStore } from "@redux";
import { useProfileChangePwd } from "@hooks";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import {
  addCard,
  createCustomer,
  createSubscription,
  getCardList,
  defaultCard,
} from "@services";
import { toaster, getUserDetail } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import {addCard} from '@services'

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          border: "1px solid red",
          color: "#212529",
          backgroundColor: `${themeColor.white}`,
          fontSize: "16px",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
        },
        invalid: {
          color: "#9e2146",
        },
        showIcon: true,
      },
    }),
    []
  );
  return options;
};

const AddCardScreenModel = ({
  isAddtoCard = false,
  setIsAddtoCard = () => {},
  setDisabledButtonPost = () => {},
  setDisabledButtonAmount = () => {},
  setBuyProduct = () => {},
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  // const options = {
  // 	showIcon: true,
  // };
  const [cardNumber, setCardNumber] = useState(null);
  const [expDate, setExpDate] = useState(null);
  const [cvc, setCvc] = useState(null);
  const [name, setName] = useState(null);
  const userDataMain = useSelector(userSliceSelector);
  const planId = useSelector(planSelector);
  const [error, setError] = useState({
    name: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
  });
  const [cardList, setCardList] = useState([]);
  const [DefaultCard, setDefaultCard] = useState();
  const [cardId, setCardId] = useState();
  const { userData } = userDataMain;
  const [key, setKey] = useState("tabOne");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (key == "tabOne") {
      const resSubscription = await createSubscription(`${planId}`);
      console.log('resSubscription', resSubscription)
      if (resSubscription.success) {
        dispatch(userStore(await getUserDetail()));
        setIsAddtoCard(false);
        setBuyProduct(true);
      }
    }

    if (key == "tabTwo") {
      setError("");

      let nameErr, cardNumErr, expDateErr, cvcErr;
      if (!name) {
        // setError({...error,expDate:'enter card expire Date'})
        nameErr = "enter card holder name";
      }
      if (!cardNumber) {
        // setError({...error,cardNumber:'enter card number'})
        cardNumErr = "enter card number";
      }
      if (!expDate) {
        // setError({...error,expDate:'enter card expire Date'})
        expDateErr = "enter card expire Date";
      }
      if (!cvc) {
        // setError({...error,cvc:'enter card cvc'})
        cvcErr = "enter card cvc";
      }
      if (nameErr || cardNumErr || expDateErr || cvcErr) {
        setError({
          name: nameErr,
          cardNumber: cardNumErr,
          expDate: expDateErr,
          cvc: cvcErr,
        });
      } else {
        if (!stripe || !elements) {
          return;
        }
        const card = elements.getElement(CardNumberElement);
        const result = await stripe.createToken(card);

        if (result.error) {
          toaster("error", result.error.message);
        } else {
          const data = result.token.id;
          if (userData?.customer?.length) {
            const tokenAdd = await addCard(data);
            if (tokenAdd.success) {
              const ressub = await createSubscription(`${planId}`);
              console.log('ressub', ressub)
              if (ressub.success) {
                dispatch(userStore(await getUserDetail()));
                fetchCardList();
                setIsAddtoCard(false);
                setBuyProduct(true);
              }
            }
          } else {
            const res = await createCustomer(data);
            if (res.success) {
              const ressub = await createSubscription(`${planId}`);
              console.log('ressub', ressub)
              if (ressub.success) {
                dispatch(userStore(await getUserDetail()));
                fetchCardList();
                setIsAddtoCard(false);
                setBuyProduct(true);
              }
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    fetchCardList();
  }, []);

  const fetchCardList = async () => {
    const response = await getCardList();

    if (response?.success) {
      setCardList(response.data);
      setDefaultCard(response.data[0].id);
      setCardId(response.data[0].id);
    } else {
      setCardList([]);
    }
  };

  const handleChangeForDefaultCard = async (e) => {
    const cardIdSub = e.target.value;
    await defaultCard(cardIdSub);
    setCardId(cardIdSub);
    setDefaultCard(cardIdSub);
  };

  return (
    <>
      <CommonModal
        className="modal-common-block diff-delete-btn-block home-modal-block"
        show={isAddtoCard}
        onHide={() => {
          setIsAddtoCard(false);
          setDisabledButtonPost(true);
          setDisabledButtonAmount(true);
        }}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        style={{}}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Unlock Your Membership</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="inner-page-common edit-profile home-modal-block-inner">
            <div className="tab-block-custom">
              <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                id="fill-tab-example"
                className="mb-3"
                fill
              >
                <Tab eventKey="tabOne" title="CardList">
                  <div className="radion-check-block-payment">
                    {cardList?.length > 0 ? (
                      cardList?.map((cardData, index) => {
                        return (
                          <div
                            className="radion-check-inner-payment"
                            key={index}
                          >
                            <input
                              type="radio"
                              id={cardData.id}
                              name="cardId"
                              value={cardData.id}
                              defaultChecked={
                                cardData.id == DefaultCard ? true : false
                              }
                              onChange={handleChangeForDefaultCard}
                            />
                            <label htmlFor={cardData.id}>
                              <div className="label-radio-block-payment">
                                <div className="img-wallet-inner">
                                  <img
                                    src="/assets/icons/credit-card-icon.svg"
                                    alt="img"
                                  />
                                  <h4>XXXX XXXX XXXX {cardData.last4}</h4>
                                </div>
                                <div className="label-radio-round"></div>
                              </div>
                            </label>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div style={{ textAlign: "center" }}>No Card Found</div>
                      </>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="tabTwo" title="AddCard">
                  <div className="form-block-new">
                    <Form>
                      <>
                        <Form.Group
                          controlId="formBasicName"
                          className="form-group-main"
                        >
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your full name as per card"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </Form.Group>
                        <span>{error.name}</span>
                      </>
                      <>
                        <Form.Group
                          controlId="formBasicCardNumber"
                          className="form-group-main"
                        >
                          <Form.Label>Card Number</Form.Label>
                          <CardNumberElement
                            className="form-control"
                            // options={options}
                            onChange={(event) => {
                              setCardNumber(event);
                            }}
                          />
                        </Form.Group>
                        <span>{error.cardNumber}</span>
                      </>
                      <>
                        <>
                          <Form.Group className="form-group-main">
                            <Form.Label htmlFor="formBasicExpDate">
                              Exp-Date
                            </Form.Label>
                            <CardExpiryElement
                              className="form-control"
                              options={options}
                              onChange={(event) => {
                                setExpDate(event);
                              }}
                            />
                          </Form.Group>
                          <span>{error.expDate}</span>
                        </>
                        <>
                          <Form.Group className="form-group-main">
                            <Form.Label htmlFor="formBasicCVV">CVV</Form.Label>
                            <CardCvcElement
                              className="form-control"
                              options={options}
                              onChange={(event) => {
                                setCvc(event);
                              }}
                            />
                          </Form.Group>
                          <span>{error.cvc}</span>
                        </>
                      </>
                    </Form>
                  </div>
                </Tab>
              </Tabs>
            </div>
            {/* <PreLoader loading={loading} /> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            CONTINUE
          </Button>
        </Modal.Footer>
      </CommonModal>
    </>
  );
};

export default AddCardScreenModel;

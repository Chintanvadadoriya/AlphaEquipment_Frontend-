import { Chat, Dashboard, NavBar, OrdersStatus, PageDetails, PaymentHistory, ProfileBar, Request, Buy, Auction, ShopScreenWrapper, Shop, SideBar, Wallet, Notification } from "@components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { router, checkLogin } from "@utils";
import { useSelector, useDispatch } from "react-redux";
import { userSliceSelector, userStore } from "@redux";
import { ChooseAmountMembershipModel, ChoosePaymentMethodModel, UnblockMembershipModel, AddCardScreenModel, ChoosePostMembershipModel, ChooseAmountMembershipSellerModel } from "@models";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getProfile } from "@services";

const Seller = () => {
  // constant
  const metaDetail = {
    title: "Seller",
    desc: "Seller page",
  };
  const Router = useRouter();

  // state
  const [menu, setMenu] = useState("dashboard");
  const [isModalUnlockMember, setIsUnlockMember] = useState(false);
  const [isModalUnlockMonthFree, setIsUnlockMonthFree] = useState(false);
  const [isModalUnlockPostValue, setIsUnlockPostValue] = useState("5");
  const [isModalSellerPlan, setIsSellerPlan] = useState(false);
  const [isModalPaymentMethod, setIsPaymentMethod] = useState(false);
  const [isAddtoCard, setIsAddtoCard] = useState(false);
  const [disabledButtonPost, setDisabledButtonPost] = useState(true);
  const [disabledButtonAmount, setDisabledButtonAmount] = useState(true);
  const stripePromise = loadStripe(`${process.env.STRIPE_PRIVATE_KEY}`);
  const dispatch = useDispatch();
  const { userData } = useSelector(userSliceSelector);

  // use Effects

  useEffect(() => {
    (async () => {
      const { isLogin, redirectUrl } = await checkLogin();

      if (!isLogin) {
        Router.push(router.LOGIN);
      }
    })();
    updateUserData();
  }, []);

  useEffect(() => {
    if (Router.query.tab != undefined) {
      setMenu(Router?.query?.tab);
    }
    if (!userData?.isSubscribe) {
      setIsUnlockMember(true);
    }
    updateUserData();
  }, [Router.query.tab]);

  // useEffect(() => {
  //   updateUserData();
  // }, []);

  const updateUserData = async () => {
    const response = await getProfile();
    const setUserObject = response.data;
    dispatch(userStore(setUserObject));
  };

  return (
    <>
      <PageDetails metaDetail={metaDetail} />
      <ShopScreenWrapper>
        {menu == "dashboard" && <Dashboard />}
        {menu == "shop" && <Shop />}
        {menu == "wallet" && <Wallet />}
        {menu == "rentRequest" && <Request />}
        {menu == "buyRequest" && <Buy />}
        {menu == "auctionRequest" && <Auction />}
        {menu == "paymenthistory" && <PaymentHistory />}
        {menu == "ordersstatus" && <OrdersStatus />}
        {menu == "chat" && <Chat />}
        {menu == "profile" && <ProfileBar isBuyer={false} />}
        {menu == "notification" && <Notification />}
      </ShopScreenWrapper>

      <UnblockMembershipModel isModalUnlockMember={isModalUnlockMember} setIsUnlockMember={setIsUnlockMember} setIsUnlockMonthFree={setIsUnlockMonthFree} />

      <ChoosePostMembershipModel isModalUnlockMonthFree={isModalUnlockMonthFree} setIsUnlockMonthFree={setIsUnlockMonthFree} setIsSellerPlan={setIsSellerPlan} setIsUnlockPostValue={setIsUnlockPostValue} setDisabledButtonPost={setDisabledButtonPost} disabledButtonPost={disabledButtonPost} />

      <ChooseAmountMembershipSellerModel isModalSellerPlan={isModalSellerPlan} setIsSellerPlan={setIsSellerPlan} setIsPaymentMethod={setIsPaymentMethod} isModalUnlockPostValue={isModalUnlockPostValue} setDisabledButtonPost={setDisabledButtonPost} setDisabledButtonAmount={setDisabledButtonAmount} disabledButtonAmount={disabledButtonAmount} />

      <ChoosePaymentMethodModel isModalPaymentMethod={isModalPaymentMethod} setIsPaymentMethod={setIsPaymentMethod} setIsAddtoCard={setIsAddtoCard} setDisabledButtonPost={setDisabledButtonPost} setDisabledButtonAmount={setDisabledButtonAmount} />

      <Elements stripe={stripePromise}>
        <AddCardScreenModel isAddtoCard={isAddtoCard} setIsAddtoCard={setIsAddtoCard} setDisabledButtonPost={setDisabledButtonPost} setDisabledButtonAmount={setDisabledButtonAmount} />
      </Elements>
    </>
  );
};

export default Seller;

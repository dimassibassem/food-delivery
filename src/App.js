import "./App.css";

import { useEffect, useState } from "react";
import Header from "./Components/Header";
import MenuContainer from "./Components/MenuContainer";
import {
  AccountBalanceWalletRounded,
  Chat,
  Favorite,
  HomeRounded,
  Settings,
  SummarizeRounded,
} from "@mui/icons-material";
import BannerName from "./Components/BannerName";
import MenuCard from "./Components/MenuCard";
import { MenuItems, Items } from "./Components/Data";
import ItemCard from "./Components/ItemCard";
import DebitCard from "./Components/DebitCard";
import SubMenuContainer from "./Components/SubMenuContainer";
import CartItem from "./Components/CartItem";
import { useSelector } from "react-redux";
function App() {
  const cart = useSelector((state) => state?.cart?.currentCart);
  const total = useSelector((state) => state?.cart?.total);
  const [isFavoriteOpen, setFavoriteOpen] = useState(false);
  const favs = useSelector((state) => state?.favorites?.items);
  const [isMainData, setMainData] = useState(
    Items.filter((element) => element.itemId == "buger01")
  );

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const menuLi = document.querySelectorAll("#menu li");

    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
      if (this.id === "4") {
        setFavoriteOpen(true);
      }else{
        setFavoriteOpen(false);
      }
    }

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));

    // menu Card active class changer
    const menuCard = document
      .querySelector(".rowContainer")
      .querySelectorAll(".rowMenuCard");

    function setMenuCardActive() {
      menuCard.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
      console.log("menuCard" , menuCard);
    }

    menuCard.forEach((n) => n.addEventListener("click", setMenuCardActive));
  }, [isMainData, totalPrice]);

  const setData = (itemId) => {
    setMainData(Items.filter((element) => element.itemId == itemId));
  };

  useEffect(() => {
    if (isFavoriteOpen) {
      setMainData(favs);
    }else{
      setMainData(Items.filter((element) => element.itemId === "buger01"));
    }
  }, [isFavoriteOpen])

  return (
    <div className="App">
      {/* Header section */}
      <Header />
      {/* Left menu */}
      <div className="leftMenu">
        <ul id="menu">
          {/* prettier-ignore */}
          <MenuContainer id={'1'} link = {'#'} icon = {<HomeRounded />}  isHome/>
          {/* prettier-ignore */}
          <MenuContainer id={'2'} link = {'#'} icon = {<Chat />}  />
          {/* prettier-ignore */}
          <MenuContainer id={'3'}link = {'#'} icon = {<AccountBalanceWalletRounded />}  />
          {/* prettier-ignore */}
          <MenuContainer id={'4'} link = {'#'} icon = {<Favorite />} />
          {/* prettier-ignore */}
          <MenuContainer id={'5'} link = {'#'} icon = {<SummarizeRounded />}  />
          {/* prettier-ignore */}
          <MenuContainer id={'6'} link = {'#'} icon = {<Settings />}  />
          <div className="indicator"></div>
        </ul>
      </div>
      <main>
        <div className="mainContainer">
          {/* Banner  */}
          <div className="banner">
            <BannerName name={"Oussama"} discount={"20"} more={"#"} />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdelivery.png?alt=media&token=69b9823d-96df-452a-bd4e-14d27a4cc337"
              alt=""
              className="deliveryPic"
            />
          </div>

          <div className="dishContainer">
            <div className="menuCard">
              <SubMenuContainer />
            </div>

            <div className="rowContainer">
              {!isFavoriteOpen &&
                MenuItems &&
                MenuItems.map((data) => (
                  <div key={data.id} onClick={() => setData(data.itemId)}>
                    <MenuCard
                      imgSrc={data.imgSrc}
                      name={data.name}
                      isActive={data.id === "1"}
                    />
                  </div>
                ))
              }
            </div>

            <div className="dishItemContainer">
              {isMainData &&
                  isMainData.map((data) => (
                      <ItemCard
                          key={data.id}
                          itemId={data.id}
                          imgSrc={data.imgSrc}
                          name={data.name}
                          ratings={data.ratings}
                          price={data.price}
                      />
                  ))}
            </div>
          </div>
        </div>

        <div className="rightMenu">
          <div className="debitCardContainer">
            <div className="debitCard">
              <DebitCard />
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="addSomeItem">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2FemptyCart.png?alt=media&token=50b733d4-cdd9-4025-bffe-8efa4066ca24"
                alt=""
                className="emptyCart"
              />
            </div>
          ) : (
            <div className="cartCheckOutContianer">
              <div className="cartContainer">
                <SubMenuContainer />

                <div className="cartItems">
                  {
                    cart?.map((data) => (
                      <CartItem
                        key={data.id}
                        itemId={data.id}
                        name={data.name}
                        imgSrc={data.imgSrc}
                        qty={"4"}
                        price={data.price}
                      />
                    ))}
                </div>
              </div>
              <div className="totalSection">
                <h3> Total</h3>
                <p>
                {total}<span> Dt </span>
                </p>
              </div>
              <button className="checkOut">Check Out</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

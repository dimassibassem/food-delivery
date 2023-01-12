import { AddRounded, RemoveRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addTotal, removeTotal } from "../redux/cartSlice";

function CartItem({ itemId, name, imgSrc, price }) {

  const dispatch = useDispatch()
  const cart = useSelector((state) => state?.cart?.currentCart);
  const total = useSelector((state) => state?.cart?.total);
  
  const [qty, setQty] = useState(1);
  const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseFloat(price));


  useEffect(() => {
    setItemPrice(parseInt(qty) * parseFloat(price));
  }, [qty, cart, total]);

  const addByOne = () => {
      setQty((prevQty) => prevQty + 1);
      setItemPrice(parseInt(qty) * parseFloat(price));
      dispatch(addTotal(price))
  }

  console.log(total)

  const removeByOne = (itemId) => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1)
      setItemPrice(parseInt(qty) * parseFloat(price));
      dispatch(removeTotal(price))
    } else {
      dispatch(removeFromCart(itemId))
      dispatch(removeTotal(price))
    }
  }

  return (
    <div className="cartItem" id={itemId}>
      <div className="imgBox">
        <img src={imgSrc} alt="" />
      </div>
      <div className="itemSection">
        <h2 className="itemName">{name}</h2>
        <div className="itemQuantity">
          <span>x {qty}</span>
          <div className="quantity">
            <RemoveRounded
              className="itemRemove"
              onClick={() => removeByOne(itemId)}
            />
            <AddRounded
              className="itemAdd"
              onClick={addByOne}
            />
          </div>
        </div>
      </div>
      <p className="itemPrice">
        <span className="itemPriceValue">{itemPrice}</span>
        <span className="dolorSign">Dt</span>{" "}
      </p>
    </div>
  );
}

export default CartItem;

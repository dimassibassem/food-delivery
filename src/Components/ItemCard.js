import {AddRounded, Favorite, StarRounded} from "@mui/icons-material";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Items} from "./Data";
import {addToCart} from "../redux/cartSlice";
import {addToFavorites, removeFromFavorites} from "../redux/favoriteSlice";

function ItemCard({itemId, imgSrc, name, price, ratings}) {
    const dispatch = useDispatch();
    const favs = useSelector((state) => state?.favorites?.items);
    const [currentValue, setCurrentValue] = useState(Math.floor(ratings));

    //find the product you want to add to the cart
    const item = Items.find((elem) => elem.id === itemId);

    const handleClick = (value) => {
        setCurrentValue(value);
    };

    //add to favorites
    const favoritesHandler = () => {
        if (favs.find((elem) => elem.id === itemId)) {
            dispatch(removeFromFavorites(itemId));
        } else {
            dispatch(addToFavorites(item));
        }
    }

    console.log({favs});


    return (
        <div className="itemCard" id={itemId}>
            <div
                className={`isFavourite ${favs.find((elem) => elem.id === itemId)
                    ? "active" : ""}`}
                onClick={favoritesHandler}
            >
                <Favorite/>
            </div>

            <div className="imgBox">
                <img src={imgSrc} alt="" className="itemImg"/>
            </div>

            <div className="itemContent">
                <h3 className="itemName">{name}</h3>
                <div className="bottom">
                    <div className="ratings">
                        {Array.apply(null, {length: 5}).map((e, i) => (
                            <i
                                key={i}
                                className={`rating ${currentValue > i ? "orange" : "gray"}`}
                                onClick={() => handleClick(i + 1)}
                            >
                                <StarRounded/>
                            </i>
                        ))}
                        <h3 className="price">

                            {price}
                            <span> Dt </span>
                        </h3>
                    </div>
                    <i
                        className="addToCart"
                        onClick={() => dispatch(addToCart(item))}
                    >
                        <AddRounded/>
                    </i>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;

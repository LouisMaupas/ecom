import React, {useContext} from "react";
import {StoreContext} from "../../src/utils/Store";
import Header from "../../src/components/Header/Header";


const Cart = () => {
    const store = useContext(StoreContext);
    let totalPrice = 0;
    if (store && store.cart && store.cart[0]) {
        store.cart[0].forEach(item => {
            totalPrice += item.price;
        });
    }

    return (
        <>
            <Header/>
            <div className="container mx-auto px-4">
                {store && store.cart && store.cart[0] && store.cart[0][0] ?
                    ` Le prix total de votre panier est de ${totalPrice}€:`
                    : "Le panier est vide."}
            </div>
        </>)
}


export default Cart;
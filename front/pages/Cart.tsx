import React, {useContext, useEffect, useState} from "react";
import * as firebase from 'firebase/app';
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../src/config/firebase";
import {Card} from "flowbite-react";
import {StoreContext} from "../../src/utils/Store";
import Header from "../../src/components/Header/Header";


const Cart = () => {
    const {cart} = useContext(StoreContext)
    let totalPrice = 0
    cart[0].forEach(item => {
        totalPrice += item.item.price
    })

    return (
        <>
            <Header/>

            <div className="container mx-auto px-4">

                {cart[0] && cart[0][0] ?
                    ` Le prix total de votre panier est de ${totalPrice}€:`
                    : "Le panier est vide."}


            </div>
        </>)
}


export default Cart;
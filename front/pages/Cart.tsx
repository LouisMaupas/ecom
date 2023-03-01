import {useContext, useEffect, useState} from "react";
import * as firebase from 'firebase/app';
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../src/config/firebase";
import {Card} from "flowbite-react";
import {StoreContext} from "../../src/utils/Store";


const Cart = () => {
    const {cart} = useContext(StoreContext)

    return (
        <>
            <div className="container mx-auto px-4">
                Panier : {cart[0] ? cart[0] : "vide"}
            </div>
        </>)
}


export default Cart;
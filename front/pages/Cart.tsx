import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../src/utils/Store";
import Header from "../../src/components/Header/Header";
import {Alert, Button, Card} from "flowbite-react";
import 'firebase/firestore';
import {Toast} from "flowbite-react";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../src/config/firebase";

interface IceCream {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

const Cart = () => {
    const store = useContext(StoreContext),
        updateStore = store?.cart[1],
        [display, useDisplay] = useState("hidden")


    useEffect((): void => {

    }, [display])

    const orderCart = async () => {
        const user = store?.userFireStore[0]
        let address = null, email = null
        if (user === null) {
            alert("Authentifiez vous ou donnez votre [adress + mail]") // TODO
            // afficher modal
            // recup mail + adress
        }
        const order = {
            item: `item/${store?.cart[0].map((item) => item.id)}`, // arrayOfIceCreamsIds
            validated: false,
            price: totalPrice,
            user: user ? user.uid : null,
            email: user ? null : email,
            address: user ? null : address
        }
        // const docRef = await addDoc(collection(db, "order"), order); in case we want to see api response
        useDisplay("")
        if (updateStore) updateStore([]) // empty cart
    }

    // total price
    let totalPrice = 0, oldPrice = 0;
    if (store && store.cart && store.cart[0]) {
        store.cart[0].forEach(item => {
            totalPrice += item.price;
        });
        oldPrice = totalPrice;
        totalPrice = totalPrice - totalPrice / 10
    }

    // group ice-creams by id
    let iceCreamsGroupedById: IceCream[] = [];
    if (store && store?.cart[0]?.length > 0) {
        iceCreamsGroupedById = Object.values( // so we get an array of objects
            store.cart[0].reduce((acc, item) => { // we reduce the array of objects
                if (!acc[item.id]) { // if ice-cream id doesn't exist in acc
                    acc[item.id] = { // build a new ice-cream object
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        quantity: 0,
                    };
                    iceCreamsGroupedById.push(acc[item.id]); // add the new ice-cream object to the array
                }
                acc[item.id].quantity += 1; // if ice-cream with this id already exist in acc, increase quantity by 1
                return acc;
            }, {})
        );
    }

    return (
        <>
            <Header/>
            <div className="container mx-auto px-4">
                <Alert color="info">
                  <span>
                    <span className="font-medium">
                      PROMO !
                    </span>
                      {' '}Profitez en ce moment de 10% de réduction 💰!
                  </span>
                </Alert>
                <div>
                    <div>
                        {store && store.cart && store.cart[0] && store.cart[0][0] ?
                            <>
                                <div>Le prix total de votre panier est de {totalPrice}€ au lieu de {oldPrice}€ !</div>
                                <div> Passer la commande : {' '}
                                    <button
                                        onClick={orderCart}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Commander
                                    </button>
                                </div>

                            </>
                            : "Le panier est vide."
                        }
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {iceCreamsGroupedById.map((item, i) =>
                        <div key={`${item.id}-${i}`}
                             className={`max-w-sm ${item.quantity < 1 ? 'hidden' : ''} max-w-sm w-1/3 p-4`}>
                            <Card
                                imgAlt="Meaningful alt text for an image that is not purely decorative"
                                imgSrc={`../../image/${item.name}.jpg`}
                            >
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.name}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {item.description}
                                </p>
                                <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {item.price}€
                                        </span>
                                    <span>
                                        Quantité : {item.quantity}
                                    </span>
                                    <div>

                                        <Button size={"xs"}
                                                onClick={(ev) => alert("TODO")}
                                                href="#"
                                                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            <span className={"text-white"}>➕</span>

                                        </Button>
                                        <Button size={"xs"}
                                                onClick={(ev) => alert("TODO")}
                                                href="#"
                                                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            ➖
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
            <Toast className={display}>
                <div
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                </div>
                <div className="ml-3 text-sm font-normal">
                    Commande effectuée !
                </div>
                <Toast.Toggle/>
            </Toast>
        </>)
}


export default Cart;
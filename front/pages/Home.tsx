import {MouseEvent, useContext, useEffect, useState} from "react";
import * as firebase from 'firebase/app';
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../src/config/firebase";
import {Card, Button} from "flowbite-react";
import {StoreContext} from "../../src/utils/Store";

interface Item {
    id: string,
    name: string,
    description: string,
    price: number,
}

const Home = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true),
        [items, setItems] = useState<Item[]>([]),
        store = useContext(StoreContext),
        updateCart = store?.cart[1];


    // get data from firebase
    async function getData(): Promise<Item[]> {
        const querySnapshot = await getDocs(collection(db, "item"));
        const itemsApi: Item[] = [];
        querySnapshot.forEach((doc) => {
            const itemData = doc.data() as Item; // explicitly define the type of itemData
            itemsApi.push({...itemData, id: doc.id});
        });
        return itemsApi
    }

    // useEffect to get data from firebase
    useEffect(() => {
        getData().then((res: Item[]) => {
            setItems(res)
            setIsLoading(false);
        })
    }, [isLoading, store])

    const addItemToCart = (
        // ev: MouseEvent<HTMLButtonElement, MouseEvent>,
        ev: any,
        item: Item
    ) => {
        ev.preventDefault()
        if (store && updateCart) updateCart([...store.cart[0], item])
    }

    return (
        <>
            {!isLoading ?
                items.map(item =>
                    <div key={item.id} className="max-w-sm">
                        <Card
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg"
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
                                <Button onClick={(ev) => addItemToCart(ev, item)}
                                        href="#"
                                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Ajouter au panier
                                </Button>
                            </div>
                        </Card>
                    </div>
                ) :
                <div className="flex justify-center items-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                         role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Home
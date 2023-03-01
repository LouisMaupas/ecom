import {useEffect, useState} from "react";
import * as firebase from 'firebase/app';
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../src/config/firebase";
import {Card} from "flowbite-react";


const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState(true)

    async function getData() {
        const querySnapshot = await getDocs(collection(db, "item"));
        const itemsApi = []
        querySnapshot.forEach((doc) => {
            itemsApi.push({...doc.data(), id: doc.id})
        });
        return itemsApi
    }

    useEffect(() => {
        getData().then((res) => {
            setItems(res)
            setIsLoading(false);
            console.log(res)
        })
    }, [isLoading])

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
                                        {item.price}
                                      </span>
                                    <a
                                        href="#"
                                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Ajouter au panier
                                    </a>
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
        </>)
}


export default Home
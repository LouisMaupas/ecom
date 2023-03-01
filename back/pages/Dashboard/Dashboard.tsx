// Import des 
import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../../src/config/firebase';
import firebase from 'firebase/app';
import firestore from'firebase/firestore';
import { StoreContext } from '../../../src/utils/Store';
import { collection, query, where, getDocs } from "firebase/firestore";
import {Table, Button} from "flowbite-react";

interface Order {
    address: String;
    date: Date;
    email: String;
    isValidated: Boolean;
    item: String;
    price: Number;
    user: String;
    id: String;
}

const Dashboard: React.FunctionComponent = () => {

    const {item} = useContext(StoreContext);
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async (): Promise<Order[]> => {
        const docRef = collection(db, "order");
        const querySnapshot = await getDocs(collection(db, "order"));
        const OrderAPI: Order[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data() as Order;
            OrderAPI.push({
                id: doc.id,
                address: data.address,
                date: data.date,
                email: data.email,
                isValidated: data.isValidated,
                item: data.item,
                price: data.price,
                user: data.user,
            });
        });
        return OrderAPI;
    }

    useEffect(() => {
        fetchOrders().then((res: Order[]) => {
            setOrders(res);
        });
    }, []);

    console.log(orders);

    return(
        <div>
            <h4 className="mt-10 text-left">Historique des Commandes</h4>
            <Table>
                <Table.Head>
                <Table.HeadCell>
                    Id Commande
                </Table.HeadCell>
                <Table.HeadCell>
                    Nom Complet
                </Table.HeadCell>
                <Table.HeadCell>
                    Adresse
                </Table.HeadCell>
                <Table.HeadCell>
                    Prix
                </Table.HeadCell>
                <Table.HeadCell>
                    Statut
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                    Supprimer
                    </span>
                </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {orders.map((order) => (
                        <Table.Row key={order.id.toString()} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {order.id}
                            </Table.Cell>
                            <Table.Cell>
                                John Doe
                            </Table.Cell>
                            <Table.Cell>
                                {order.address}
                            </Table.Cell>
                            <Table.Cell>
                                {order.price.toString()}€
                            </Table.Cell>
                            <Table.Cell>
                                <Button>
                                    Valider
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button>
                                    Supprimer
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table>
        </div>
 
    )
}

export default Dashboard;
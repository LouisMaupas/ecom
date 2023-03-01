import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../../src/config/firebase';
import Header from '../../../src/components/Header/Header';
import { collection, deleteDoc, doc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { Table, Button } from "flowbite-react";
import {StoreContext} from "../../../src/utils/Store";
import moment from "moment";


interface Order {
    address: string;
    date: Timestamp;
    email: string;
    isValidated: boolean;
    item: string;
    price: number;
    user: string;
    id: string;
}

const Dashboard: React.FunctionComponent = () => {

    const store = useContext(StoreContext);
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async (): Promise<Order[]> => {
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

    // Function to validate the order
    const validateOrder = async (orderId: string) => {
        const orderRef = doc(db, "order", orderId.toString());
        await updateDoc(orderRef, {
          isValidated: true,
        });
        const updatedOrders = orders.map((order) =>
          order.id === orderId ? { ...order, isValidated: true } : order
        );
        setOrders(updatedOrders);
    };

    // Function to delete an order
    const deleteOrder = async (orderId: string) => {
        try {
            await deleteDoc(doc(db, "order", orderId));

            // Update Orders List
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error("Erreur lors de la suppression de la commande : ", error);
        }
    }

    useEffect(() => {
        fetchOrders().then((res: Order[]) => {
            setOrders(res);
        });
    }, []);

    console.log(orders);

    return(
        <div>
            <Header/>
            <h4 className="mt-10 text-left">Historique des Commandes</h4>
            <Table>
                <Table.Head>
                <Table.HeadCell>
                    Id Commande
                </Table.HeadCell>
                <Table.HeadCell>
                    Date
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
                    {orders.map((order, i) => (
                        <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {order.id}
                            </Table.Cell>
                                <Table.Cell>
                                    {moment(order.date.toDate()).format("DD/MM/YYYY")}
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
                            <Table.Cell >
                                {order.isValidated ? 
                                <p className='text-green-500'><b>Commande Validé</b></p> : 
                                <Button onClick={() => validateOrder(order.id)}>
                                    Valider
                                </Button>}
                            </Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => deleteOrder(order.id)}>
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
import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../../../src/config/firebase';
import Header from '../../../src/components/Header/Header';
import { collection, deleteDoc, doc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { Table, Button } from "flowbite-react";
import {StoreContext} from "../../../src/utils/Store";
import moment from "moment";


interface Item {
    name: string;
    quantity: number;
}

interface User {
    first_name: string;
    last_name: string;
    address: string;
    email: string;
    isAdmin : boolean;
    id: string;
}

interface Order {
    address: string;
    date: Timestamp;
    email: string;
    validated: boolean;
    item: Array<Item>;
    price: number;
    user: User | null;
    id: string;
}

const Dashboard: React.FunctionComponent = () => {

    const store = useContext(StoreContext);
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async (): Promise<Order[]> => {
        const [orderSnapshot, userSnapshot] = await Promise.all([
          getDocs(collection(db, "order")),
          getDocs(collection(db, "user"))
        ]);
      
        const usersById: Record<string, User> = {};
        userSnapshot.forEach((doc) => {
          const user = doc.data() as User;
          usersById[doc.id] = user;
        });
      
        const orders: Order[] = [];
        orderSnapshot.forEach((doc) => {
          const order = doc.data() as Order;
          const user = order.user ? usersById[order.user.id] : null;
      
          orders.push({
            id: doc.id,
            address: order.address,
            date: order.date,
            email: order.email,
            validated: order.validated,
            item: order.item,
            price: order.price,
            user: user ? {
              first_name: user.first_name,
              last_name: user.last_name,
              address: user.address,
              email: user.email,
              id: user.id,
              isAdmin: user.isAdmin,
            } : null,
          });
        });
      
        return orders;
      };

    // Function to validate the order
    const validateOrder = async (orderId: string) => {
        const orderRef = doc(db, "order", orderId.toString());
        await updateDoc(orderRef, {
          validated: true,
        });
        const updatedOrders = orders.map((order) =>
          order.id === orderId ? { ...order, validated: true } : order
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

    if (store?.userFireStore[0]?.email === "admin@admin.com") {
        return(
            <div>
                <Header/>
                <h4 className="mt-10 mb-5 text-left">Historique des Commandes</h4>
                <Table>
                    <Table.Head className='text-center'>
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
                        Action
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
                                <Table.Cell className='text-center'>
                                    {order.user ? `${order.user.first_name} ${order.user.last_name}`  : "Anonyme"}
                                </Table.Cell>
                                <Table.Cell>
                                    {order.user ? order.user.address : order.address}
                                </Table.Cell>
                                <Table.Cell>
                                    {order.price.toString()}.00€
                                </Table.Cell>
                                <Table.Cell >
                                    {order.validated ? 
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
    } else {
        return(
            <div>
                <Header/>
                <p>Vous n'avez pas la permission d'accéder à ce contenu</p>
            </div>
        )
    }
}

export default Dashboard;
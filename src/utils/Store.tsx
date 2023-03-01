// global store

import React, {useState, createContext} from "react"

interface Props {
    children: React.ReactNode
}

interface Store {
    cart: [any[], React.Dispatch<React.SetStateAction<any[]>>],
    userFireStore: [any, React.Dispatch<React.SetStateAction<any>>],
    userECom: [any, React.Dispatch<React.SetStateAction<any>>],
    items: [any[], React.Dispatch<React.SetStateAction<any[]>>],
    orders: [any[], React.Dispatch<React.SetStateAction<any[]>>]
}


export const StoreContext = createContext<Store | null>(null)

export default ({children}: Props) => {
    const [userFireStore, setUserFireStore] = useState(null),
        [userECom, setUserECom] = useState(null),
        [items, setItems] = useState<any[]>([]),
        [cart, setCart] = useState<any[]>([]),
        [orders, setOrders] = useState<any[]>([]);

    const store: Store | null = {
        cart: [cart, setCart],
        userFireStore: [userFireStore, setUserFireStore],
        userECom: [userECom, setUserECom],
        items: [items, setItems],
        orders: [orders, setOrders],
    }

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}
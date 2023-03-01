import {Navbar, Button, Badge} from "flowbite-react";
import Login from "../forms/Login/Login";
import SignUp from "../forms/SignUp/SignUp";
import {useContext, useEffect} from "react";
import {StoreContext} from "../../utils/Store";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase";
import {useQuery} from "react-query";

const Header = () => {
    const {userECom, cart} = useContext(StoreContext)
    // async function getData() {
    //     const querySnapshot = await getDocs(collection(db, "item"));
    //     const itemsApi = []
    //     querySnapshot.forEach((doc) => {
    //         itemsApi.push({...doc.data(), id: doc.id})
    //     });
    //     return itemsApi
    // }

    return (
        <header>
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Navbar.Link
                        href="/"
                        active={true}
                    >
                        Home
                    </Navbar.Link>
                    {userECom[0]?.firstName === "admin" ?
                        <Navbar.Link href="/dashboard">
                            Tableau de bord
                        </Navbar.Link>
                        : null}
                    {userECom[0] ?
                        <span>Bonjour {userECom[0].firstName}</span>
                        :
                        <>
                            <SignUp/>
                            <Login/>
                        </>
                    }
                    <Navbar to="/cart">
                        Panier
                        <Badge color="info">
                            {cart[0].length}
                        </Badge>
                    </Navbar>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
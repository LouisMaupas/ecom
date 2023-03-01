import {Navbar, Button, Badge} from "flowbite-react";
import Login from "../forms/Login/Login";
import SignUp from "../forms/SignUp/SignUp";
import {useContext, useEffect} from "react";
import {StoreContext} from "../../utils/Store";
import {Link} from "react-router-dom";

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
                    <Link
                        to="/"
                    >
                        Home
                    </Link>
                    {userECom[0]?.firstName === "admin" ?
                        <Link to="/dashboard">
                            Tableau de bord
                        </Link>
                        : null}
                    {userECom[0] ?
                        <span>Bonjour {userECom[0].firstName}</span>
                        :
                        <>
                            <SignUp/>
                            <Login/>
                        </>
                    }
                    <Link to="/cart">
                        Panier
                        <Badge color="info">
                            {cart[0].length}
                        </Badge>
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
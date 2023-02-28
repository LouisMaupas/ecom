import {Navbar, Button} from "flowbite-react";
import Login from "../forms/Login/Login";
import SignUp from "../forms/SignUp/SignUp";
import {useContext} from "react";
import {StoreContext} from "../../utils/Store";

const Header = () => {
    const {user} = useContext(StoreContext)
    console.log(user[0])
    return (
        <header>
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Navbar.Link
                        href="/navbars"
                        active={true}
                    >
                        Home
                    </Navbar.Link>
                    {user[0]?.firstName === "admin" ?
                        <Navbar.Link href="/dashboard">
                            Tableau de bord
                        </Navbar.Link>
                        : null}
                    {user[0] ?
                        <span>Bonjour {user[0].firstName}</span>
                        :
                        <>
                            <SignUp/>
                            <Login/>
                        </>
                    }


                    <Navbar.Link href="/cart">
                        Panier
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
import {Navbar, Button} from "flowbite-react";
import Login from "../forms/Login/Login";
import SignUp from "../forms/SignUp/SignUp";
import {useContext} from "react";
import {StoreContext} from "../../utils/Store";

const Header = () => {
    const {userECom} = useContext(StoreContext)

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
                    <Navbar.Link href="/cart">
                        Panier
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
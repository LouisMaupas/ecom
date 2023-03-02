import {Navbar, Button, Badge} from "flowbite-react";
import Login from "../forms/Login/Login";
import SignUp from "../forms/SignUp/SignUp";
import {useContext, useEffect} from "react";
import {StoreContext} from "../../utils/Store";
import {Link} from "react-router-dom";

const Header: React.FunctionComponent = () => {
    const store = useContext(StoreContext);

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
                    {store?.userECom[0]?.email === "admin@admin.com" ?
                        <Link to="/dashboard">
                            Tableau de bord
                        </Link>
                        : null}
                    {store?.userECom[0] ?
                        <span>
                            Bonjour {" "} {store?.userECom[0].first_name}
                        </span>
                        :
                        <>
                            <SignUp/>
                            <Login/>
                        </>
                    }
                    <Link to="/cart">
                        Panier
                        <Badge color="info">
                            {store?.cart[0].length}
                        </Badge>
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
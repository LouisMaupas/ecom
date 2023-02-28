import {Navbar, Button} from "flowbite-react";

const Header = () => {
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
                    <Navbar.Link href="/login">
                        Tableau de bord
                    </Navbar.Link>
                    <div className="flex md:order-2">
                        <Button>
                            S'inscrire
                        </Button>
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Link href="/login">
                        Se connecter
                    </Navbar.Link>
                    <Navbar.Link href="/cart">
                        Panier
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
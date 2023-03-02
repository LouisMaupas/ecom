import React, {useContext, useState} from "react"
import {Button, Label, TextInput, Modal} from "flowbite-react"
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../config/firebase";
import {StoreContext} from "../../../utils/Store";
import {getEComUserFromFireBaseUser} from "./utils";

function Login(): JSX.Element {

    const store = useContext(StoreContext),
        userFirebaseSetter = store?.userFireStore[1],
        userEComSetter = store?.userECom[1],
        [showModal, setShowModal] = React.useState(false),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const fireBaseUser = userCredential.user;
                if (userFirebaseSetter) userFirebaseSetter(fireBaseUser)
                getEComUserFromFireBaseUser(fireBaseUser.uid)
                    .then((user) => {
                        if (userEComSetter) userEComSetter(user)
                    })
                setShowModal(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <React.Fragment>
            <Button onClick={() => setShowModal(true)}>
                Se connecter
            </Button>
            <Modal
                show={showModal}
                size="md"
                popup={true}
                onClose={() => setShowModal(false)}
            >
                <Modal.Header/>
                <Modal.Body>
                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Se Connecter
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="Adresse Mail"
                                    />
                                </div>
                                <TextInput
                                    id="email"
                                    placeholder="name@company.com"
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='mt-2'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password"
                                        value="Mot de Passe"
                                    />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="w-full mt-5 text-center">
                                <Button type={"submit"} className="w-full">
                                    Se connecter
                                </Button>
                            </div>
                        </form>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Pas encore de compte ?
                            <a
                                href="/modal"
                                className="text-blue-700 hover:underline dark:text-blue-500 ml-1"
                            >
                                Inscrivez-vous
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default Login
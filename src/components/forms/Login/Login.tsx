import React, {useState} from "react"
import {Button, Label, TextInput, Modal} from "flowbite-react"
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../config/firebase";

function Login(): JSX.Element {

    const [showModal, setShowModal] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUid] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUid(user.uid)
                console.log(user);
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
                            Se connecter
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="Votre email"
                                    />
                                </div>
                                <TextInput
                                    id="email"
                                    placeholder="name@mail.com"
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password"
                                        value="Votre mot de passe"
                                    />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <Button type={"submit"}>
                                    Se connecter
                                </Button>
                            </div>
                        </form>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Vous n'avez pas encore de compte ?
                            <a
                                href="/modal"
                                className="text-blue-700 hover:underline dark:text-blue-500 ml-1"
                            >
                                Créer un compte
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default Login
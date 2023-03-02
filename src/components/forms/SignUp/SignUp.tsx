import React, {useContext, useState} from 'react';
import {auth} from '../../../config/firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {Button, Label, TextInput, Modal} from "flowbite-react"
import {createEComUser} from "./utils";
import {StoreContext} from "../../../utils/Store";

function SignUp(): JSX.Element {

    const store = useContext(StoreContext),
        userFirebaseSetter = store?.userFireStore[1],
        userEComSetter = store?.userECom[1],
        [showModal, setShowModal] = useState(false),
        [first_name, setFirstName] = useState(''),
        [last_name, setLastName] = useState(''),
        [address, setAddress] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const fireBaseUser = userCredential.user;
                if (userFirebaseSetter) userFirebaseSetter(fireBaseUser)
                createEComUser(fireBaseUser.uid, first_name, last_name, address);
                if (userEComSetter) userEComSetter({first_name: first_name, last_name: last_name, address: address});
                setShowModal(false);
                // TODO popup de confirmation
            });
    }

    return (
        <React.Fragment>
            <Button onClick={() => setShowModal(true)}>
                S'inscrire
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
                            Créer son Compte
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="first-name"
                                        value="Prénom"
                                    />
                                </div>
                                <TextInput
                                    id="first-name"
                                    placeholder="Thierry"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className='mt-2'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="last-name"
                                        value="Nom"
                                    />
                                </div>
                                <TextInput
                                    id="last-name"
                                    placeholder="Chevalier"
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className='mt-2'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="address"
                                        value="Adresse"
                                    />
                                </div>
                                <TextInput
                                    id="laddress"
                                    placeholder="15 Rue Saint Paul"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className='mt-2'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="sign-email"
                                        value="Adresse Mail"
                                    />
                                </div>
                                <TextInput
                                    id="sign-email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className='mt-2'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="sign-password"
                                        value="Mot de Passe"
                                    />
                                </div>
                                <TextInput
                                    id="sign-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className="w-full mt-5 text-center">
                                <Button type='submit' className='w-full'>
                                    Inscription
                                </Button>
                            </div>
                        </form>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Voux avez déjà un compte ?
                            <a
                                href="/modal"
                                className="text-blue-700 hover:underline dark:text-blue-500 ml-2"
                            >
                                Se Connecter
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default SignUp;

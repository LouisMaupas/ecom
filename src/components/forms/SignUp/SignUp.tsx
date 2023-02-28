import React, { useState } from 'react';
import {auth} from '../../../config/firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {Button, Label, TextInput, Modal} from "flowbite-react"

function SignUp() {

    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    // @ts-ignore
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
                        {/* <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="first-name"
                                    value="Prénom"
                                />
                            </div>
                            <TextInput
                                id="first-name"
                                placeholder="Thierry"
                                required={true}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="last-name"
                                    value="Nom"
                                />
                            </div>
                            <TextInput
                                id="last-name"
                                placeholder="Chevalier"
                                required={true}
                            />
                        </div> */}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div>
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    {/*<No Display Name id="remember" />*/}
                                    <Label htmlFor="remember">
                                        Remember me
                                    </Label>
                                </div>
                                <a
                                    href="/modal"
                                    className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                                >
                                    Lost Password?
                                </a>
                            </div>
                            <div className="w-full">
                                <Button type='submit'>
                                    Log in to your account
                                </Button>
                            </div>
                        </form>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?
                            <a
                                href="/modal"
                                className="text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Create account
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default SignUp;
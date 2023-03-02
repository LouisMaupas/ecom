import {db} from "../../../config/firebase";
import {addDoc, collection} from "firebase/firestore";


export const createEComUser = async (fireBaseUserId: string, first_name: string, last_name: string, address: string) => {
    // let ecomUser


    // const userRef = doc(firestore, 'user', fireBaseUserId);
    // await setDoc(userRef, {
    //     first_name: first_name,
    //     last_name: last_name,
    //     address: address
    // })

    //
    // db.collection("user")
    //     .doc(fireBaseUserId)
    //     .set({
    //         first_name: first_name,
    //         last_name: last_name,
    //         address: address
    //     })


    let ecomUser
    addDoc(collection(db, 'user'), {fireBaseUserId, first_name, last_name, address})
        .then(res => {
            ecomUser = res
        })
    return ecomUser
}
import {db} from "../../../config/firebase";
import {addDoc, collection} from "firebase/firestore";


export const createEComUser = (fireBaseUserId: string, first_name: string, last_name: string, address: string) => {
    let ecomUser
    addDoc(collection(db, 'user'), {fireBaseUserId, first_name, last_name, address})
        .then(res => {
            ecomUser = res
        })
    return ecomUser
}
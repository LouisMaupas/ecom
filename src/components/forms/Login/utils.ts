import {doc, getDoc, collection} from "firebase/firestore";
import {db} from "../../../config/firebase";

export const getEComUserFromFireBaseUser = async (fireBaseUserId) => {
    const docRef = doc(db, "user", fireBaseUserId);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
}
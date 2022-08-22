import { collection, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { db } from './firebase';

export async function GET_PROFILE() {
    const colRef = collection(db, 'profile');
    const snapshot = await getDocs(colRef);
    const docs = snapshot.docs.map(doc => {
        return {
            ...doc.data(),
            id: doc.id
        }
    });
    return docs;
}

export async function CREATE_PROFILE(email: string, password: string) {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    return credentials;
}

export async function LOGIN(email: string, password: string) {
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user.providerData;
}

export async function LOGOUT() {
    return await getAuth().signOut();
}

export async function CURRENT_USER() {
    return getAuth().currentUser?.providerData;
}
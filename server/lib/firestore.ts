import { addDoc, collection, getDoc, getDocs, orderBy, query, setDoc, startAt, where, WhereFilterOp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { db } from './firebase';

export async function GET_DOC(table: string, property?: string, value?: string, operator: WhereFilterOp = '>=') {
    const colRef = collection(db, table);
    const col = property && value ? query(colRef, where(property, operator, value)) : colRef;
    const snapshot = await getDocs(col);
    const docs = snapshot.docs.map(doc => {
        return {
            ...doc.data(),
            id: doc.id
        }
    });
    return docs;
}

export async function CREATE_DOC(table, data) {
    const doc = await addDoc(collection(db, table), data);
    return (await getDoc(doc)).data();
}

export async function CREATE_PROFILE(data) {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
    delete data.email;
    delete data.password;
    data.uid = credentials.user?.uid;
    data = await CREATE_DOC('profile', data);
    return { ...credentials.user?.providerData[0], ...data };
}

export async function LOGIN(email: string, password: string) {
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user?.providerData[0];
}

export async function LOGOUT() {
    return await getAuth().signOut();
}

export async function CURRENT_USER() {
    return getAuth().currentUser?.providerData[0];
}
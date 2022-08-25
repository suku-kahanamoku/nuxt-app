import { addDoc, collection, getDoc, getDocs, query, where, documentId } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';

import { db } from './firebase';
import { ITERATE } from '~~/core/utils/modify-object.function';
import { IS_OBJECT } from '~~/core/utils/check.functions';

export async function GET_DOC(table: string, filter: any) {
    const colRef = collection(db, table);
    const filterArr = [];
    ITERATE(filter, (item, key) => {
        const name = key === 'id' ? documentId() : key;
        const value = IS_OBJECT(item) ? item.value : item;
        filterArr.push(where(name, '==', value));
    });
    const col = filter ? query(colRef, ...filterArr) : colRef;
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

export async function GET_STORAGE() {
    const storage = getStorage();
    const storageRef = ref(storage, 'img');
    const snapshot = await listAll(storageRef);
    return await Promise.all(snapshot.items.map(item => getDownloadURL(item)));
}
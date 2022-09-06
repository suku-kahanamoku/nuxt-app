import {
	addDoc,
	collection,
	getDoc,
	getDocs,
	query,
	where,
	documentId,
	deleteDoc,
	doc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';

import { db } from './firebase';
import { ITERATE } from '@/core/utils/modify-object.function';
import { IS_OBJECT } from '@/core/utils/check.functions';

export async function GET_DOCS(colName: string, params: any) {
	const colRef = collection(db, colName);
	const paramsArr = [];
	ITERATE(params, (item, key) => {
		const name = key === 'id' ? documentId() : key;
		const value = IS_OBJECT(item) ? item.value : item;
		paramsArr.push(where(name, item.operator?.value || '==', value));
	});
	const col = params ? query(colRef, ...paramsArr) : colRef;
	const snapshot = await getDocs(col);
	return snapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
}

export async function CREATE_DOC(colName, params) {
	const docRef = await addDoc(collection(db, colName), params);
	const docObj = await getDoc(docRef);
	return {
		...docObj.data(),
		id: docObj.id,
	};
}

export async function UPDATE_DOC(colName, id, params) {
	const docRef = doc(collection(db, colName), id);
	await updateDoc(docRef, params);
	const docObj = await getDoc(docRef);
	return {
		...docObj.data(),
		id: docObj.id,
	};
}

export async function DELETE_DOC(colName, id) {
	const docRef = doc(collection(db, colName), id);
	await deleteDoc(docRef);
}

export async function CREATE_PROFILE(params) {
	const auth = getAuth();
	const credentials = await createUserWithEmailAndPassword(auth, params.email, params.password);
	delete params.email;
	delete params.password;
	params.uid = credentials.user?.uid;
	return { ...(await CREATE_DOC('profile', params)), ...credentials.user?.providerData[0] };
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
	return await Promise.all(snapshot.items.map((item) => getDownloadURL(item)));
}

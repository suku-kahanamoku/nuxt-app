import admin from 'firebase-admin';
import { DecodedIdToken, getAuth, GetUsersResult } from 'firebase-admin/auth';

import { db, apiKey } from './firebase';
import { ITERATE } from '@/core/utils/modify-object.function';
import { IS_DEFINED, IS_OBJECT } from '@/core/utils/check.functions';

/**
 * Nacte a vrati data z dane kolekce
 *
 * @export
 * @param {string} colName
 * @param {*} params
 * @returns {*}  {Promise<admin.firestore.DocumentData>}
 */
export async function GET_DOCS(colName: string, params): Promise<admin.firestore.DocumentData[]> {
	let query = db.collection(colName);
	ITERATE(params, (item, key) => {
		const name = key === 'id' ? admin.firestore.FieldPath.documentId() : key;
		const value = IS_OBJECT(item) ? item.value : item;
		query = query.where(name, item.operator?.value || '==', value) as any;
	});
	const snapshot = await query.get();
	return snapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
		ctype: colName,
	}));
}

/**
 * Vytvori zaznam v dane kolekci a vrati nove vytvorena data
 *
 * @export
 * @param {string} colName
 * @param {*} params
 * @returns {*}  {Promise<admin.firestore.DocumentData>}
 */
export async function CREATE_DOC(colName: string, params): Promise<admin.firestore.DocumentData> {
	delete params.ctype;
	const colRef = db.collection(colName);
	const docRef = await colRef.add(params);
	const snapshot = await docRef.get();
	return {
		...snapshot.data(),
		id: snapshot.id,
		ctype: colName,
	};
}

/**
 * Upravi dany zaznam z dane kolekce a vrati nove upravena data
 *
 * @export
 * @param {string} colName
 * @param {string} id
 * @param {*} params
 * @returns {*}  {Promise<admin.firestore.DocumentData>}
 */
export async function UPDATE_DOC(colName: string, id: string, params): Promise<admin.firestore.DocumentData> {
	delete params.ctype;
	const colRef = db.collection(colName);
	const docRef = colRef.doc(id);
	// pokud urcity field ma v hodnote NULL, tak se dany field odstrani
	ITERATE(params, (value, key) => {
		if (value === null) {
			params[key] = admin.firestore.FieldValue.delete();
		}
	});
	await docRef.update(params);
	const snapshot = await docRef.get();
	return {
		...snapshot.data(),
		id: snapshot.id,
		ctype: colName,
	};
}

/**
 * Odstrani dany zaznam z dane kolekce
 *
 * @export
 * @param {string} colName
 * @param {string} id
 * @returns {*}  {Promise<admin.firestore.WriteResult>}
 */
export async function DELETE_DOC(colName: string, id: string): Promise<admin.firestore.WriteResult> {
	const colRef = db.collection(colName);
	return await colRef.doc(id).delete();
}

/**
 * Dle danych kriterii (query) vrati seznam uzivatelu
 * napr.
 * [
    { uid: 'uid1' },
    { email: 'user2@example.com' },
    { phoneNumber: '+15555550003' },
    { providerId: 'google.com', providerUid: 'google_uid4' },
  ]
 * 
 * @export
 * @param {*} params
 * @returns {*}  {Promise<GetUsersResult>}
 */
export async function GET_PROFILES(params): Promise<admin.firestore.DocumentData> {
	const auth = getAuth();
	const docRefs = await GET_DOCS('profile', params);
	const userRefs = await auth.getUsers(docRefs.map((item) => ({ uid: item.uid })));
	return docRefs.map((item) => ({
		...item,
		...userRefs.users.find((user) => user.uid === item.uid),
		id: item.id,
	}));
}

/**
 * Vrati uzivatele dle id
 *
 * @export
 * @param {string} id
 * @returns {*}  {Promise<admin.firestore.DocumentData>}
 */
export async function GET_PROFILE(id: string): Promise<admin.firestore.DocumentData> {
	const colName = 'profile';
	const auth = getAuth();
	const colRef = db.collection(colName);
	const docRef = await colRef.doc(id).get();
	const docData = docRef.data();
	const userRef = await auth.getUser(docData.uid);
	return {
		...docData,
		...userRef,
		id: docRef.id,
		ctype: colName,
	};
}

/**
 * Vytvori noveho uzivatele
 *
 * @export
 * @param {*} params
 * @returns {*}  {Promise<admin.firestore.DocumentData>}
 */
export async function CREATE_PROFILE(params): Promise<admin.firestore.DocumentData> {
	const colName = 'profile';
	const auth = getAuth();
	const userRef = await auth.createUser(params);
	delete params.password;
	params.uid = userRef.uid;
	const docRef = await CREATE_DOC(colName, params);
	return {
		...docRef,
		...userRef,
		id: docRef.id,
	};
}

/**
 * Upravi daneho uzivatele a vrati upravena data
 *
 * @export
 * @param {string} id
 * @param {*} params
 * @returns {*}  {Promise<admin.firestore.DocumentData>}
 */
export async function UPDATE_PROFILE(id: string, params): Promise<admin.firestore.DocumentData> {
	const colName = 'profile';
	const auth = getAuth();
	delete params.password;
	const docRef = await UPDATE_DOC(colName, id, params);
	const userRef = await auth.updateUser(docRef.uid, params);
	return {
		...docRef,
		...userRef,
		id: docRef.id,
	};
}

/**
 * Smaze uzivatele a zaznam z kolekce
 *
 * @export
 * @param {string} id
 * @returns {*}  {Promise<any>}
 */
export async function DELETE_PROFILE(id: string): Promise<any> {
	const colName = 'profile';
	const auth = getAuth();
	// nejdriv si vytahne uid z kolekce
	const colRef = db.collection(colName);
	const docRef = await colRef.doc(id).get();
	const uid = docRef.data().uid;
	return await Promise.all([DELETE_DOC(colName, docRef.id), auth.deleteUser(uid)]);
}

/**
 * Prihlasi a vrati data uzivatele
 *
 * @export
 * @param {string} email
 * @param {string} password
 * @returns {*}  {Promise<admin.firestore.DocumentData>}
 */
export async function LOGIN(email: string, password: string): Promise<admin.firestore.DocumentData> {
	const { localId, idToken }: any = await $fetch(
		'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey,
		{
			method: 'POST',
			body: { returnSecureToken: true, email: email, password: password },
		}
	);
	const colName = 'profile';
	const auth = getAuth();
	const [userRef, docRefs] = await Promise.all([auth.getUser(localId), GET_DOCS(colName, { uid: localId })]);
	const docRef = docRefs.find((item) => item.uid === localId);
	return {
		...docRef,
		...userRef,
		id: docRef.id,
		idToken: idToken,
	};
}

/**
 * Odhlasi uzivatele
 *
 * @export
 * @param {*} event
 * @returns {*}  {Promise<void>}
 */
export async function LOGOUT(event): Promise<void> {
	const data = await GET_TOKEN_DATA(event);
	SET_TOKEN(event, null, data?.uid);
}

/**
 * Zkontroluje, zda je uzivatel prihlaseny
 *
 * @export
 * @param {*} event
 * @returns {*}  {Promise<boolean>}
 */
export async function VERIFY(event): Promise<boolean> {
	let result = false;
	const data = await GET_TOKEN_DATA(event);
	if (data) {
		const date = new Date();
		const exp = data.exp * 1000;
		result = exp > date.getTime();
		// pokud je to expirovane, zrusi token
		if (result) {
			SET_TOKEN(event, data.idToken);
		} else {
			SET_TOKEN(event, null);
		}
	} else {
		SET_TOKEN(event, null);
	}
	return result;
}

/**
 * Vrati dekodovana data z tokenu
 *
 * @export
 * @param {*} event
 * @returns {*}  {Promise<DecodedIdToken>}
 */
export async function GET_TOKEN_DATA(event): Promise<DecodedIdToken> {
	let result;
	const token = getCookie(event, 'x-xsrf-token');
	if (token) {
		try {
			result = await getAuth().verifyIdToken(token);
			result = {
				...result,
				idToken: token,
			};
		} catch (error) {}
	}
	return result;
}

export async function SET_TOKEN(event, token: string, uid?: string) {
	if (token) {
		setCookie(event, 'x-xsrf-token', token);
	} else {
		deleteCookie(event, 'x-xsrf-token');
		if (uid) {
			getAuth().revokeRefreshTokens(uid);
		}
	}
}

export async function GENERATE_TOKEN(uid: string): Promise<string> {
	return await getAuth().createCustomToken(uid);
}

export async function GET_STORAGE() {
	/*const storage = getStorage();
	const storageRef = ref(storage, 'img');
	const snapshot = await listAll(storageRef);
	return await Promise.all(snapshot.items.map((item) => getDownloadURL(item)));*/
}

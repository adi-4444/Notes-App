import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	query,
	getDocs,
	updateDoc,
	doc,
	serverTimestamp,
	deleteDoc,
	getDoc,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB3s9TTl0gJkk7DAjbBglpYwhcOAOZkMes",
	authDomain: "notes-app-e3493.firebaseapp.com",
	projectId: "notes-app-e3493",
	storageBucket: "notes-app-e3493.appspot.com",
	messagingSenderId: "151777704382",
	appId: "1:151777704382:web:e5f3d51e916434b90da1ef",
	measurementId: "G-WB2D4J6QWJ",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const logOut = () => signOut(auth);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});
	}, [onAuthStateChanged]);
	const signUp = async (displayName, email, password) => {
		const { user } = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		await updateProfile(user, { displayName });
		return user;
	};
	const signIn = async (email, password) => {
		const { user } = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return user;
	};
	const writeData = async (data) => {
		const user = currentUser;
		if (!user) return;
		await addDoc(collection(firestore, `users/${user.uid}/notes`), {
			title: data.title,
			description: data.description,
			createdAt: serverTimestamp(),
		});
		return "Note Created Successfully";
	};
	const getNotesByUser = async () => {
		const user = currentUser;
		if (!user) {
			// user is not authenticated
			return [];
		}
		const q = query(collection(firestore, `users/${user.uid}/notes`));
		const querySnapshot = await getDocs(q);
		const notes = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return notes;
	};
	const editNote = async (noteId, updatedData) => {
		const user = currentUser;
		const noteRef = doc(firestore, `users/${user.uid}/notes/${noteId}`);
		await updateDoc(noteRef, updatedData);
		return "Note updated successfully";
	};
	const deleteNote = async (noteId) => {
		const user = currentUser;
		const noteRef = doc(firestore, `users/${user.uid}/notes/${noteId}`);
		await deleteDoc(noteRef);
		return "Note deleted successfully";
	};
	return (
		<FirebaseContext.Provider
			value={{
				currentUser,
				logOut,
				signUp,
				signIn,
				writeData,
				getNotesByUser,
				editNote,
				deleteNote,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};

export default FirebaseProvider;

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
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
		const res = addDoc(collection(firestore, "notes"), {
			data,
			date: Date.now(),
		});
		return res;
	};
	return (
		<FirebaseContext.Provider
			value={{ currentUser, logOut, signUp, signIn, writeData }}
		>
			{children}
		</FirebaseContext.Provider>
	);
};

export default FirebaseProvider;

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";

const Home = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { currentUser } = useFirebase();
	useEffect(() => {
		if (currentUser) {
			navigate("/notes");
		} else {
			navigate("/login");
		}
	}, [pathname, currentUser]);

	return (
		<div className='text-center py-5 my-5'>
			<h1>Welcome to the Note Maker</h1>
			{currentUser ? (
				<h4 className='my-4'>
					You are Logged in as {currentUser?.displayName}
				</h4>
			) : (
				<h4 className='my-4'>You are not Logged in Please Login</h4>
			)}
		</div>
	);
};

export default Home;

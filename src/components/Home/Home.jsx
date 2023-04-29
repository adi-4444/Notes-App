import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		if (pathname === "/") {
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		}
	}, [pathname]);
	return (
		<div className='text-center py-5 my-5'>
			<h1>Welcome to the Note Maker</h1>
		</div>
	);
};

export default Home;

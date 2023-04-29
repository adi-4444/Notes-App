import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useFirebase } from "../../context/Firebase";

const Header = () => {
	const firebase = useFirebase();
	const { currentUser, logOut } = firebase;
	console.log(firebase);
	return (
		<div>
			<Navbar bg='primary'>
				<Container>
					<Navbar.Brand href='/'>Notes Maker</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
						<Navbar.Text className='mx-5'>
							Hi 👋 {currentUser?.displayName}
						</Navbar.Text>
						{currentUser && (
							<button
								type='button'
								className='btn btn-outline-info'
								onClick={logOut}
							>
								Logout
							</button>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Header;

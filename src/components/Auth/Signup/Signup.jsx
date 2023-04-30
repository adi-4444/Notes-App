import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../../context/Firebase";

const Signup = () => {
	const [data, setData] = useState({});
	const [size, setSize] = useState();
	const navigate = useNavigate();
	const { signUp, currentUser } = useFirebase();
	const dataChangeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await signUp(data.name, data.email, data.password);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (currentUser) {
			navigate("/notes");
		}
	}, [currentUser]);

	useLayoutEffect(() => {
		function updateSize() {
			setSize(window.innerWidth);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return (
		<Container className={size <= 1024 ? "w-75" : "w-25"}>
			<h1 className='text-center my-2'>Signup</h1>
			<div>
				<div className='text-center my-2'>Welcome to Notes Maker</div>
				<Form onSubmit={handleLoginSubmit}>
					<FloatingLabel label='Name' className='my-4'>
						<Form.Control
							required
							type='text'
							name='name'
							placeholder='Enter Your Name'
							onChange={dataChangeHandler}
						/>
					</FloatingLabel>
					<FloatingLabel label='Email address' className='my-4'>
						<Form.Control
							required
							type='email'
							name='email'
							placeholder='name@example.com'
							onChange={dataChangeHandler}
						/>
					</FloatingLabel>
					<FloatingLabel label='Password' className='my-4'>
						<Form.Control
							required
							type='password'
							name='password'
							placeholder='Password'
							onChange={dataChangeHandler}
						/>
					</FloatingLabel>
					<div className='text-center'>
						<Button
							variant='primary'
							type='submit'
							className='text-center inline'
						>
							Signup
						</Button>
					</div>
					<p className='text-center mt-3'>
						Already Have an Account ?<Link to='/login'> Login</Link>
					</p>
				</Form>
			</div>
		</Container>
	);
};

export default Signup;

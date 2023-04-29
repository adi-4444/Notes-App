import React, { useEffect, useState } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFirebase } from "../../../context/Firebase";

const Login = () => {
	const [data, setData] = useState({});
	const { signIn, currentUser } = useFirebase();
	const dataChangeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		console.log(data);
		try {
			const res = await signIn(data.email, data.password);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	console.log(currentUser);
	return (
		<Container className='w-25'>
			<h1 className='text-center my-2'>Login</h1>
			<div>
				<div className='text-center my-4'>Welcome to Note Maker</div>
				<Form onSubmit={handleLoginSubmit}>
					<FloatingLabel
						controlId='floatingInput'
						label='Email address'
						className='my-5'
					>
						<Form.Control
							type='email'
							name='email'
							placeholder='name@example.com'
							onChange={dataChangeHandler}
						/>
					</FloatingLabel>
					<FloatingLabel
						controlId='floatingPassword'
						label='Password'
						className='my-4'
					>
						<Form.Control
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
							Login
						</Button>
					</div>
					<p className='text-center mt-3'>
						Don't Have an Account ?<Link to='/signup'> Signup</Link>
					</p>
				</Form>
			</div>
		</Container>
	);
};

export default Login;

import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../../context/Firebase";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [size, setSize] = useState();
	const navigate = useNavigate();
	const { signIn, currentUser } = useFirebase();
	const dataChangeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await signIn(data.email, data.password);
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
	const guestLogin = () => {
		setData({ email: "guest@gmail.com", password: "123456" });
	};
	return (
		<Container className={size <= 1024 ? "w-75" : "w-25"}>
			<h1 className='text-center my-2'>Login</h1>
			<div>
				<div className='text-center my-4'>Welcome to Notes Maker</div>
				<Form onSubmit={handleLoginSubmit}>
					<FloatingLabel
						controlId='floatingInput'
						label='Email address'
						className='my-5'
					>
						<Form.Control
							type='email'
							name='email'
							value={data.email}
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
							value={data.password}
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
				<div className='text-center mt-3'>
					<button
						className='mt-3 btn btn-outline-success'
						onClick={guestLogin}
					>
						Login As Guest
					</button>
				</div>
			</div>
		</Container>
	);
};

export default Login;

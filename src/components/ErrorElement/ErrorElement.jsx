import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorElement = () => {
	const error = useRouteError();
	console.error(error);
	return (
		<div id='error-page'>
			<h1 className='text-center my-5'>Oops!</h1>
			<p className='text-center my-4'>
				Sorry, an unexpected error has occurred.
			</p>
			<p className='text-center my-3'>
				<p>{error.statusText || error.message}</p>

				<Link to='/'>
					<button type='button' class='btn btn-outline-secondary'>
						Go Back
					</button>{" "}
				</Link>
			</p>
		</div>
	);
};

export default ErrorElement;

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Auth/Signup/Signup";
import Home from "./components/Home/Home";
import Notes from "./components/Notes/Notes";
import ErrorElement from "./components/ErrorElement/ErrorElement";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorElement />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/notes",
		element: <Notes />,
	},
]);

function App() {
	return (
		<>
			<Header />
			<main className='main-content'>
				<RouterProvider router={router} />
			</main>
			<Footer />
		</>
	);
}

export default App;

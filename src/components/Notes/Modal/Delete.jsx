import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useFirebase } from "../../../context/Firebase";

const Delete = ({ onHide, show, selectedNote }) => {
	const { deleteNote } = useFirebase();

	const deleteHandler = async () => {
		let res = await deleteNote(selectedNote);
		console.log(res);
		onHide();
	};
	return (
		<Container className='w-75'>
			<Modal show={show} onHide={onHide} centered>
				<Modal.Header closeButton>
					<Modal.Title>Delete Note</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					To Delete Note Click Confirm , Else Close
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={onHide}>
						Close
					</Button>
					<Button variant='danger' onClick={deleteHandler}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Delete;

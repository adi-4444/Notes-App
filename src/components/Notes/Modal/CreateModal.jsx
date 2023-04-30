import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFirebase } from "../../../context/Firebase";

const CreateModal = ({ onHide, show }) => {
	const [note, setNote] = useState({});
	const { writeData } = useFirebase();
	const noteHandler = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	const createHandler = async (e) => {
		e.preventDefault();
		console.log(note);
		const res = await writeData(note);
		console.log(res);
		onHide();
	};

	return (
		<Modal
			onHide={onHide}
			show={show}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
			backdrop='static'
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter text-center'>
					Create a Note
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={createHandler}>
				<Modal.Body>
					<Form.Group className='mb-3'>
						<Form.Label>Note Title</Form.Label>
						<Form.Control
							type='text'
							name='title'
							onChange={noteHandler}
							placeholder='Enter Note Title'
						/>
					</Form.Group>
					<Form.Group
						className='mb-3'
						controlId='exampleForm.ControlTextarea1'
					>
						<Form.Label>Note Description</Form.Label>
						<Form.Control
							as='textarea'
							name='description'
							onChange={noteHandler}
							placeholder='Enter Your Note Description'
							rows={10}
						/>
					</Form.Group>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={onHide}>Close</Button>
					<Button variant='success' type='submit'>
						Create Note
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default CreateModal;

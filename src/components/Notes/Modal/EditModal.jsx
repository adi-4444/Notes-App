import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFirebase } from "../../../context/Firebase";

const EditModal = ({ onHide, show, selectedNote }) => {
	const [note, setNote] = useState({});
	const { editNote } = useFirebase();
	useEffect(() => {
		setNote({
			title: selectedNote?.title || "",
			description: selectedNote?.description || "",
		});
	}, [selectedNote]);

	const noteHandler = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	const editHandler = async (e) => {
		e.preventDefault();
		let res = await editNote(selectedNote?.id, note);
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
					Edit a Note
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={editHandler}>
				<Modal.Body>
					<Form.Group className='mb-3'>
						<Form.Label>Note Title</Form.Label>
						<Form.Control
							type='text'
							name='title'
							value={note.title}
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
							value={note.description}
							onChange={noteHandler}
							placeholder='Enter Your Note Description'
							rows={10}
						/>
					</Form.Group>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={onHide}>Close</Button>
					<Button variant='success' type='submit'>
						Edit Note
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default EditModal;

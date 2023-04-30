import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Notes.css";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import CreateModal from "./Modal/CreateModal";
import Delete from "./Modal/Delete";
import EditModal from "./Modal/EditModal";

const Notes = () => {
	const [createModal, setCreateModal] = useState(false);
	const [deleteNote, setDeleteNote] = useState(false);
	const [editNote, setEditNote] = useState(false);
	const [selectedNote, setSelectedNote] = useState();
	const [allNotes, setAllNotes] = useState();
	const [size, setSize] = useState();
	const navigate = useNavigate();
	const { currentUser, getNotesByUser } = useFirebase();
	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
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

	const fetchdata = async () => {
		let res = await getNotesByUser();
		setAllNotes(res);
	};

	useEffect(() => {
		fetchdata();
	}, [createModal, deleteNote, editNote]);

	const deleteHandler = (id) => {
		setSelectedNote(id);
		setDeleteNote(true);
	};
	const editHandler = (item) => {
		setSelectedNote(item);
		setEditNote(item);
	};
	return (
		<div>
			<Container
				className={`${
					size <= 768 ? "w-75" : "w-25"
				} d-flex justify-content-between align-items-center py-2`}
			>
				<h4>Your Notes</h4>
				<button
					type='button'
					className='btn btn-outline-success'
					onClick={() => setCreateModal(true)}
				>
					Create Note
				</button>
			</Container>
			<div className='all-notes d-flex align-items-center justify-content-center flex-wrap gap-3 p-5'>
				{allNotes &&
					allNotes.map((item) => (
						<Container
							key={item.id}
							className={`${
								window.innerWidth <= 1000
									? "w-100 mx-auto px-4"
									: "w-25"
							} overflow-auto`}
						>
							<Card className='text-center'>
								<Card.Header className='font-weight-bold'>
									{item.title}
								</Card.Header>
								<Card.Body>
									<Card.Text className='description'>
										{item.description}
									</Card.Text>
									<div className='card-btns d-flex justify-content-between align-items-center px-3'>
										<button
											type='button'
											className='btn btn-outline-info'
											onClick={() => editHandler(item)}
										>
											Edit
										</button>
										<button
											type='button'
											className='btn btn-outline-primary'
											onClick={() =>
												deleteHandler(item.id)
											}
										>
											Delete
										</button>
									</div>
								</Card.Body>
								<Card.Footer className='text-muted'>
									Created :
									{item.createdAt.toDate().toLocaleString()}
								</Card.Footer>
							</Card>
						</Container>
					))}
			</div>

			{
				<CreateModal
					show={createModal}
					onHide={() => setCreateModal(false)}
				/>
			}
			{
				<Delete
					show={deleteNote}
					onHide={() => setDeleteNote(false)}
					selectedNote={selectedNote}
				/>
			}
			{
				<EditModal
					show={editNote}
					onHide={() => setEditNote(false)}
					selectedNote={selectedNote}
				/>
			}
		</div>
	);
};

export default Notes;

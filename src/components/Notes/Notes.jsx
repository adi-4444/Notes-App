import React, { useState } from "react";
import "./Notes.css";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import ViewModal from "./Modal/ViewModal";

const Notes = () => {
	const [modalShow, setModalShow] = useState(false);
	return (
		<div>
			<Container className='d-flex justify-content-between align-items-center py-2'>
				<h4>Your Notes</h4>
				<button type='button' class='btn btn-outline-success'>
					Create Note
				</button>
			</Container>

			<Container className='w-25 all-notes overflow-auto'>
				<div className='a-card'>
					<Card className='text-center'>
						<Card.Header>Note Title</Card.Header>
						<Card.Body>
							<Card.Title>Special title treatment</Card.Title>
							<Card.Text
								className=''
								style={{ cursor: "pointer" }}
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Eos distinctio error
								voluptatibus recusandae. Reiciendis fugiat
								numquam quidem error similique ipsa! Maxime
								officia laudantium beatae rem sint labore
								assumenda aperiam nisi corporis animi debitis
								totam veniam, architecto sapiente aliquid
								doloribus minus accusantium voluptatibus. Rerum
								enim asperiores ducimus libero magni velit
								officiis!
							</Card.Text>
							<div className='card-btns d-flex justify-content-between align-items-center px-3'>
								<button
									type='button'
									class='btn btn-outline-info'
								>
									Edit
								</button>
								<button
									type='button'
									class='btn btn-outline-primary'
								>
									Delete
								</button>
							</div>
						</Card.Body>
						<Card.Footer className='text-muted'>
							Created at :
						</Card.Footer>
					</Card>
				</div>
			</Container>

			{<ViewModal show={modalShow} onHide={() => setModalShow(false)} />}
		</div>
	);
};

export default Notes;

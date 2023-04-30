import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
	return (
		<footer
			style={{
				width: "100%",
				position: "relative",
				bottom: "0",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
			}}
		>
			<Container>
				<Row>
					<Col className='text-center py-2'>
						Copyright &copy; Note Maker
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;

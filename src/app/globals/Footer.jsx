import React from "react";
import "./Footer.scss";
import Link from "next/link";

const Footer = () => {
	return (
		<>
			<footer className="footer-section">
				<p>
					© 2024 TopFlight Tracker | <Link href="#">Privacy Policy</Link> |{" "}
					<Link href="#">Terms of Service</Link>
				</p>
			</footer>
		</>
	);
};

export default Footer;

import React from "react";
import "./Footer.scss"


const Footer = () => {
	return (
		<>
			<footer className="footer-section">
				<p>
					© 2024 TopFlight Tracker | <a href="#">Privacy Policy</a> |{" "}
					<a href="#">Terms of Service</a>
				</p>
				<div className="social-links">
					<a href="#">
						<img src="/images/facebook-icon.png" alt="Facebook" />
					</a>
					<a href="#">
						<img src="/images/twitter-icon.png" alt="Twitter" />
					</a>
					<a href="#">
						<img src="/images/instagram-icon.png" alt="Instagram" />
					</a>
				</div>
			</footer>
		</>
	);
};

export default Footer;

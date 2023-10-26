import { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, error, isLoading } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	useEffect(() => {
		const ping = async () => {
			fetch("https://workout-helper-backend-lw08.onrender.com").then(
				console.log("Server pinged.")
			);
		};
		ping();
	}, []);

	return (
		<>
			<form className="login" onSubmit={handleSubmit}>
				<h3>Login</h3>

				<label>Email:</label>
				<input
					type="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					value={email}
				/>
				<label>Password:</label>
				<input
					type="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					value={password}
				/>
				<button disabled={isLoading}>Login</button>
				{error && <div className="error">{error}</div>}
			</form>

			<div className="account-credentials">
				<h3>Test account credentials</h3>
				<p>
					Use these credentials if you want to try out the website, and don't
					want to create an account
					<br />
				</p>
				<p>
					<strong>Email: </strong>test@gmail.com
					<br />
					<strong>Password: </strong>ABCabc123@
				</p>
			</div>
		</>
	);
};

export default Login;

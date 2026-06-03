import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Login Page</h1>
        <Link to="/register">
          <button>Go To Sign Up</button>
        </Link>

        <h2>Login</h2>


        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Access your account</legend>

            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jane@example.com"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minlength="8"
              placeholder="Enter your password"
            />
          </fieldset>

          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
} export default LoginPage;
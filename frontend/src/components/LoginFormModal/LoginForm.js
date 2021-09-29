import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const loginDemo = async (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password'}));

  };

  return (
    <>
      <h1 className="login__h1">Log In</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <ul className="login__errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button onClick={loginDemo}>Demo</button>
      </form>
    </>
  );
}

export default LoginForm;

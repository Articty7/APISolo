import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

// TODO: format errors

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.message) setErrors(data.message);
      }
    );
  };

  const demoUser = () => {
    setCredential('Demo-lition');
    setPassword('password');
  }

  return (
    <>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder='Username or Email'
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </label>
        {errors && <p className='error'>{errors}</p>}
        <button className='login' disabled={password.length < 6 || credential.length < 4} type="submit">Log In</button>
        <button className='demo' onClick={() => demoUser()} type="submit">Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
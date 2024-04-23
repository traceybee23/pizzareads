import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import DemoUser from './DemoUser';

import './LoginForm.css';

function LoginFormModal() {

  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };


  return (
    <div className='login-modal'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Email or Username'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className='errors'>{errors.credential && <p>{errors.credential}</p>}</span>
        <button className='login-button' type="submit">Log In</button>
      </form>
      <span >
          new to pizzareads?
          <OpenModalMenuItem
          itemText={<span className="modalLink">sign up</span>}
          modalComponent={<SignupFormModal />}
          />
      </span>
      <div><DemoUser /></div>
    </div>
  );
}

export default LoginFormModal;

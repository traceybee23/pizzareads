import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import DemoUser from './DemoUser';

import './LoginForm.css';

function LoginFormModal({navigate}) {

  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(navigate('/'))
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
      <h1 className='heading'>log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='email or username'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className='errors'>{errors.credential && <p>{errors.credential}</p>}</span>
        <button className='login-button' type="submit">log in</button>
      </form>
      <span className="new-message">
          new to pizzareads?
          <OpenModalMenuItem
          itemText={<span className="modalLink">sign up</span>}
          modalComponent={<SignupFormModal />}
          />
      </span>
      <div><DemoUser navigate={navigate}/></div>
    </div>
  );
}

export default LoginFormModal;

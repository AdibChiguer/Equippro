import React , {useState} from 'react';
import './login.css';
import logo from '../../../assets/E.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [user , setUser] = useState({
    email: '',
    password: '',
  })
  const [err , setErr] = useState('');
  const navigate = useNavigate();

  function getemail(e) { 
    setUser(prevUser => ({ ...prevUser, email: e.target.value }))
  }

  function getpassword(e) {
    setUser(prevUser => ({ ...prevUser, password: e.target.value }))
  }

  async function login() {
    setIsSubmited(true);
    if (user.userName === '' || user.email === '' || user.password === '') {
      setErr('please fill all the fields')
      return;
    }
    await axios.post('http://localhost:8080/auth/login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      if(res.data.roles[0] === 'ROLE_admin') {
        navigate('/admin/home');
      } else if (res.data.roles[0] === 'ROLE_client') {
        navigate('/client/home');
      } else if (res.data.roles[0] === 'ROLE_technician') {
        navigate('/technician/tickets');
      } else {
        setErr('Invalid');
        setIsSubmited(false);
      }
    })
    .catch(err => {
      console.log(err);
      setErr('Invalid email or password');
      setIsSubmited(false);
    })
    setIsSubmited(false);
  }


  return (
    <div className="login-page-container" >
      <div className="login-content">
        <div className="login-page-header">
          <div className="logo-container">
            <img src={logo} alt="logo" />
          </div>
          <span>Your Online Dashboard</span>
        </div>
        <div className="login-form-container">
          <form className="login-form">
            {err === '' ? null : <p className='err'>{err}</p>}
            <div className="input-form-container">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" autoComplete='false' placeholder='example@email.com' onChange={getemail}/>
            </div>
            <div className="input-form-container">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder='Password' autoComplete='false' onChange={getpassword}/>
            </div>
            <button type="button" className="login-btn" onClick={(e) => {e.preventDefault(); login();}} disabled={isSubmited}>{isSubmited ? 'Loading...' : 'Log in'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

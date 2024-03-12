import React , {useState , useEffect} from 'react';
import './login.css';
import logo from '../../../assets/E.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [user , setUser] = useState({
    email: '',
    password: '',
  })

  const [err , setErr] = useState('')

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
    console.log(user);
    await axios.post('http://localhost:8080/auth/login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      console.log(res.data);
      if(res.data.roles[0] === 'ROLE_admin') {
        localStorage.setItem('token', res.data.token);
        window.location = '/home';
      } else {
        setErr('Unauthorized : juste the admin can login here');
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
              <input type="password" id="password"autoComplete='false' onChange={getpassword}/>
            </div>
            <button className="login-btn" onClick={() => {login()}} disabled={isSubmited}>{isSubmited ? 'Louding...' : 'Log in'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

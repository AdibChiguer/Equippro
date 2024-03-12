import React from 'react';
import './error.css';
import { Link } from 'react-router-dom';
import notFound from '../../../assets/undraw_page_not_found_re_e9o6.svg'

const Error = () => {
  return (
    <div className="container-404">
      <img src={notFound} alt="not found" />
      <h2>UH OH! You're lost.</h2>
      <p>
        The page you are looking for does not exist.
        How you got here is a mystery. But you can click the button below
        to go back to the homepage.
      </p>
      <Link to="/" className="btn green">HOME</Link>
    </div>
  );
};

export default Error;
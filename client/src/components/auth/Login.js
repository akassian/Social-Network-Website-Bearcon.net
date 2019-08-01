import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Spinner from '../layout/Spinner';

const Login = ({ login, isAuthenticated, auth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
    console.log('SUCCESS');
    // const newUser = {
    //   name,
    //   email,
    //   password
    // };
    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   };
    //   const body = JSON.stringify(newUser);
    //   const res = await axios.post('http://localhost:5000/api/users', body, config);
    //   console.log(res.data);
    // } catch (err) {
    //   console.error(err.response.data);
    // }
  };

  if (auth.loading) {
    return <Spinner />;
  }
  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to={`/profile/${auth.user._id}`} />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' />
        Sign Into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            minLength='6'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);

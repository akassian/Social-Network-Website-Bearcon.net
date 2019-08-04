import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  history
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-paw' />
          <span className='hide-sm'>
            {''}
            Profiles
          </span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='fas fa-comment' />
          <span className='hide-sm'>
            {''}
            Posts
          </span>
        </Link>
      </li>
      <li>
        {user && isAuthenticated && loading === false && (
          <Link to={`/profile/${user._id}`}>
            <i className='fas fa-user' />
            <span className='hide-sm'>
              {''}
              Profile
            </span>
          </Link>
        )}
      </li>

      <li>
        <a onClick={() => logout(history)} href='#!'>
          {''}
          <i className='fas fa-sign-out-alt' />
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
      <li>
        <Link to='/about'>
          <i className='fas fa-info-circle' />
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-paw' />
          <span className='hide-sm'>
            {''}
            Profiles
          </span>
        </Link>
      </li>
      <li>
        <Link to='/register'>
          {''}
          <i className='fas fa-user-plus' />
          <span className='hide-sm'>Register</span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          {''}
          <i className='fas fa-sign-in-alt' />
          <span className='hide-sm'>Login</span>
        </Link>
      </li>
      <li>
        <Link to='/about'>
          <i className='fas fa-info-circle' />
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-paw'> Bearcon</i>
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Navbar));

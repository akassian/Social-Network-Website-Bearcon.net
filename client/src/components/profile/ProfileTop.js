import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    images: { picture, cover },
    resume,
    user: { name, avatar }
  },
  edit
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <div className='cover-overlay' />
      <div className='bg-cover'>
        <img src={cover} alt='' />
      </div>
      <div className='content'>
        {edit && (
          <Link to={'/edit-profile'}>
            <i
              title='Edit'
              className='fas fa-edit rightside bigger text-white'
            />
          </Link>
        )}
        <div className=''>
          <div className='rounder'>
            <img
              className='round-img-profile'
              src={picture === '' ? avatar : picture}
              alt=''
            />
          </div>
          <h1 className='large'>{name}</h1>

          <p className='lead'>
            {status} {company && <span> at {company}</span>}
          </p>
          <p>{location && <span>{location}</span>}</p>
          <div className='icons my-1'>
            {website && (
              <a href={website} target='_blank' rel='noopener noreferrer'>
                <i className='fas fa-globe fa-2x' />
              </a>
            )}
            {social && social.twitter && (
              <a
                href={social.twitter}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-twitter fa-2x' />
              </a>
            )}
            {social && social.facebook && (
              <a
                href={social.facebook}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-facebook fa-2x' />
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={social.linkedin}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-linkedin fa-2x' />
              </a>
            )}
            {social && social.youtube && (
              <a
                href={social.youtube}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-youtube fa-2x' />
              </a>
            )}
            {social && social.instagram && (
              <a
                href={social.instagram}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-instagram fa-2x' />
              </a>
            )}
            <br />
            <br />
            <p>
              {edit && (
                <Link to='/upload' className='btn btn-dark'>
                  Add or update avatar and cover pictures
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;

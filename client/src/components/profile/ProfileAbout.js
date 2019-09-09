import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  },
  edit
}) => (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          {edit && (
            <Link to={'/edit-profile'}>
              <i title='Edit' className='fas fa-edit bigger rightside' />
            </Link>
          )}
          <h2 className='text-primary text-center'>About Me</h2>
          <br />
          <p>{bio}</p>
          <br />
          <div className='line' />
        </Fragment>
      )}
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.map((skill, index) => (
          <Fragment>
            <div key={index} className='p-1'>
              <i className='fas fa-check' /> {skill}
            </div>
            <br />

          </Fragment>
        ))}

      </div>
    </div>
  );

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;

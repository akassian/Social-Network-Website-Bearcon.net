import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const MyProfile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  useEffect(() => {
    getProfileById(auth.user._id);
  }, [getProfileById]);

  //, match.params.id

  return (
    <Fragment>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated && auth.loading === false && (
            <Link to='/edit-profile' className='btn btn-dark'>
              Edit Profile
            </Link>
          )}
          <div className='profile-grid my-1'>
            {/* <ProfileTop profile={profile} /> */}
            <ProfileTop profile={profile} edit={true} />
            <ProfileAbout profile={profile} edit={true} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>
                {' '}
                <i className='fas fa-user-tie' /> Experience
                {auth.isAuthenticated && auth.loading === false && (
                  <Link to='/add-experience' className='btn btn-gray rightside'>
                    <i className='fas fa-plus-circle' /> Add Experience
                  </Link>
                )}
              </h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                      edit={true}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>
                <i className='fas fa-user-graduate' /> Education
                {auth.isAuthenticated && auth.loading === false && (
                  <Link to='/add-education' className='btn btn-gray rightside'>
                    <i className='fas fa-plus-circle' /> Add Education
                  </Link>
                )}
              </h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                      edit={true}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

MyProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(MyProfile);

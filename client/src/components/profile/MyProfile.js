import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileCourse from './ProfileCourse';
import ProfileGithub from './ProfileGithub';
import { getProfileById, getCurrentProfile } from '../../actions/profile';

const MyProfile = ({
  getProfileById,
  getCurrentProfile,
  profile: { profile, loading },
  auth
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

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
                {/* {auth.isAuthenticated && auth.loading === false && (
                  <Link to='/add-course' className='btn btn-gray rightside'>
                    <i className='fas fa-plus-circle' /> Add Course
                  </Link>
                )} */}
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

            <div className='profile-course bg-white p-2'>
              <h2 className='text-primary'>
                <i className='fas fa-user-graduate' /> Courses
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Link to='/add-course' className='btn btn-gray rightside'>
                      <i className='fas fa-plus-circle' /> Add Course
                    </Link>
                  )}
              </h2>
              {profile.courses.length > 0 ? (
                <Fragment>
                  {profile.courses.map(course => (
                    <ProfileCourse
                      key={course._id}
                      course={course}
                      edit={true}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No courses listed</h4>
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
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MyProfile);

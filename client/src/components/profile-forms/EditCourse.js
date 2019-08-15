import React, { Fragment, useState, useEffect } from 'react';

import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createProfile, getCurrentProfile } from '../../actions/profile';

import { deleteAccount } from '../../actions/profile';

import { editCourse } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';

const EditCourse = ({
  profile: { profile, loading },

  // createProfile,
  getCurrentProfile,
  editCourse,
  history,
  // deleteAccount,
  auth: { user },

  match
}) => {
  const [formData, setFormData] = useState({
    title: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  // => {
  //   const [formData, setFormData] = useState({
  //     company: "",
  //     website: "",
  //     location: "",
  //     status: "",
  //     skills: "",
  //     githubusername: "",

  //     bio: "",
  //     twitter: "",
  //     facebook: "",
  //     linkedin: "",
  //     youtube: "",
  //     instagram: ""
  //   });

  //   const [displaySocialInputs, toggleSocialInputs] = useState(false);
  // console.log('match: ', match);
  const courseId = match.params.courseId;
  // console.log('courseId: ', courseId);
  // if (loading && profile === null) {
  //   return <Spinner />;
  // }

  useEffect(() => {
    getCurrentProfile(); // get profile of the current user from server (which takes from database) and put it in store
    // console.log('profile: ', profile);
    const courseArray = profile.courses;
    const courseToEdit = courseArray.find(course => course._id === courseId);

    setFormData({
      // set local state to the values from profile from store
      title: loading || !courseToEdit.title ? '' : courseToEdit.title
    });
  }, [loading, getCurrentProfile]);

  //   setFormData({
  //     company: loading || !profile.company ? "" : profile.company,
  //     website: loading || !profile.website ? "" : profile.website,
  //     location: loading || !profile.location ? "" : profile.location,
  //     status: loading || !profile.status ? "" : profile.status,
  //     skills: loading || !profile.skills ? "" : profile.skills.join(","),
  //     githubusername:
  //       loading || !profile.githubusername ? "" : profile.githubusername,
  //     bio: loading || !profile.bio ? "" : profile.bio,
  //     twitter: loading || !profile.social ? "" : profile.social.twitter,
  //     facebook: loading || !profile.social ? "" : profile.social.facebook,
  //     linkedin: loading || !profile.social ? "" : profile.social.linkedin,
  //     youtube: loading || !profile.social ? "" : profile.social.youtube,
  //     instagram: loading || !profile.social ? "" : profile.social.instagram
  //   });
  // }, [loading, getCurrentProfile]);

  const { title } = formData; // detructure local state into variables

  // const {
  //   company,
  //   website,
  //   location,
  //   status,
  //   skills,
  //   githubusername,
  //   bio,
  //   twitter,
  //   facebook,
  //   linkedin,
  //   youtube,
  //   instagram
  // } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    editCourse(formData, history, courseId); // true means edit = true
  };

  // return (
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Edit Course</h1>{' '}
      <p className='lead'>
        {' '}
        <i className='fas fa-code-branch' /> Edit course of relevant experience
        you have taken.{' '}
      </p>{' '}
      <small>*=required field</small>{' '}
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          {' '}
          <textarea
            name='title'
            cols='30'
            rows='5'
            placeholder='Course Title'
            value={title}
            onChange={e => onChange(e)}
          />{' '}
        </div>{' '}
        <input type='submit' className='btn btn-primary my-1' />{' '}
        <Link className='btn btn-light my-1' to='/login'>
          {' '}
          Go Back{' '}
        </Link>{' '}
      </form>{' '}
    </Fragment>
  );
};

EditCourse.propTypes = {
  editCourse: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    editCourse
  }
)(withRouter(EditCourse));

//=====================
// EditProfile.propTypes = {
//   createProfile: PropTypes.func.isRequired,
//   getCurrentProfile: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,

//   deleteAccount: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile
// });

// export default connect(
//   mapStateToProps,
//   { createProfile, getCurrentProfile, deleteAccount }
// )(withRouter(EditProfile));

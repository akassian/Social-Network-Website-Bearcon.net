import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { editCourse } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const EditCourse = ({
  profile: { profile, loading },
  getCurrentProfile,
  editCourse,
  history,
  auth: { user },
  match
}) => {
  const [formData, setFormData] = useState({
    title: ''
  });

  const courseId = match.params.courseId;

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

  const { title } = formData; // detructure local state into variables
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    editCourse(formData, history, courseId); // true means edit = true
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Edit Course</h1>{' '}
      <p className='lead'>
        {' '}
        <i className='fas fa-code-branch' /> Edit course you have taken.{' '}
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

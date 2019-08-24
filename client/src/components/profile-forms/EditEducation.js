import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { editEducation } from '../../actions/profile';
import Spinner from '../layout/Spinner';
const EditEducation = ({
  profile: { profile, loading },
  getCurrentProfile,
  editEducation,
  history,
  auth: { user },

  match
}) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const eduId = match.params.eduId;

  useEffect(() => {
    getCurrentProfile(); // get profile of the current user from server (which takes from database)
    // and put it in store.
    // console.log('profile: ', profile);
    const eduArray = profile.education;
    const eduToEdit = eduArray.find(edu => edu._id === eduId);

    setFormData({
      // set local state to the values from profile from store
      school: loading || !eduToEdit.school ? '' : eduToEdit.school,
      degree: loading || !eduToEdit.degree ? '' : eduToEdit.degree,
      fieldofstudy:
        loading || !eduToEdit.fieldofstudy ? '' : eduToEdit.fieldofstudy,
      from: loading || !eduToEdit.from ? '' : eduToEdit.from,
      to: loading || !eduToEdit.to ? '' : eduToEdit.to,
      current: loading || !eduToEdit.current ? false : eduToEdit.current,
      description:
        loading || !eduToEdit.description ? '' : eduToEdit.description
    });
  }, [loading, getCurrentProfile]);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData; // detructure local state into variables

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    editEducation(formData, history, eduId);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Edit Your Education</h1>{' '}
      <p className='lead'>
        {' '}
        <i className='fas fa-code-branch' /> Enter any school or program that
        you have attended{' '}
      </p>{' '}
      <small>*=required field</small>{' '}
      <form className='form' onSubmit={onSubmit}>
        {' '}
        <div className='form-group'>
          {' '}
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={e => onChange(e)}
            required
          />{' '}
        </div>{' '}
        <div className='form-group'>
          {' '}
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={e => onChange(e)}
            required
          />{' '}
        </div>{' '}
        <div className='form-group'>
          {' '}
          <input
            type='text'
            placeholder='* Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => onChange(e)}
            required
          />{' '}
        </div>{' '}
        <div className='form-group'>
          {' '}
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => onChange(e)}
          />{' '}
        </div>{' '}
        <div className='form-group'>
          {' '}
          <p>
            {' '}
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={e => {
                setFormData({
                  ...formData,
                  current: e.target.checked ? true : false,
                  to: current ? '' : to
                });
              }}
            />{' '}
            {console.log('current', current)}
            Current School{' '}
          </p>{' '}
        </div>{' '}
        <div className='form-group'>
          {' '}
          <h4>To Date</h4>{' '}
          <input
            type='date'
            name='to'
            value={to}
            onChange={e => onChange(e)}
            disabled={current ? 'disabled' : ''}
          />{' '}
        </div>{' '}
        <div className='form-group'>
          {' '}
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={description}
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

EditEducation.propTypes = {
  editEducation: PropTypes.func.isRequired,
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
    editEducation
  }
)(withRouter(EditEducation));

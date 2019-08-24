import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, editExperience } from '../../actions/profile';
import Spinner from '../layout/Spinner';
const EditExperience = ({
  profile: { profile, loading },
  getCurrentProfile,
  editExperience,
  history,
  auth: { user },
  match
}) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  //console.log('match: ', match);
  const expId = match.params.expId;
  //console.log('expId: ', expId);

  useEffect(() => {
    getCurrentProfile(); // get profile of the current user from server (which takes from database) and put it in store
    console.log('profile: ', profile);
    const expArray = profile.experience;
    const expToEdit = expArray.find(exp => exp._id === expId);
    setFormData({
      // set local state to the values from profile from store
      company: loading || !expToEdit.company ? '' : expToEdit.company,
      title: loading || !expToEdit.title ? '' : expToEdit.title,
      location: loading || !expToEdit.location ? '' : expToEdit.location,
      from: loading || !expToEdit.from ? '' : expToEdit.from,
      to: loading || !expToEdit.to ? '' : expToEdit.to,
      current: loading || !expToEdit.current ? false : expToEdit.current,
      description:
        loading || !expToEdit.description ? '' : expToEdit.description
    });
  }, [loading, getCurrentProfile]);

  const { company, title, location, from, to, current, description } = formData; // detructure local state into
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editExperience(formData, history, expId); // true means edit = true
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Edit An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
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
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={e => onChange(e)}
            disabled={current ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/login'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditExperience.propTypes = {
  editExperience: PropTypes.func.isRequired,
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
  { getCurrentProfile, editExperience }
)(withRouter(EditExperience));

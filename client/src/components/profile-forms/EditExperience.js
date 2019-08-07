import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

import { deleteAccount } from '../../actions/profile';
import { editExperience } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';

import Experience from '../dashboard/Experience';

const EditExperience = ({
  profile: { profile, loading },
  // createProfile,
  getCurrentProfile,
  editExperience,
  history,
  // deleteAccount,
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
  console.log('match: ', match);
  const expId = match.params.expId;
  console.log('expId: ', expId);
  // if (loading && profile === null) {
  //   return <Spinner />;
  // }

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
      current: loading || !expToEdit.current ? '' : expToEdit.current,
      description:
        loading || !expToEdit.description ? '' : expToEdit.description
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

  const { company, title, location, from, to, current, description } = formData; // detructure local state into variables

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
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editExperience(formData, history, expId); // true means edit = true
  };

  // return (
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
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
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
            disabled={toDateDisabled ? 'disabled' : ''}
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

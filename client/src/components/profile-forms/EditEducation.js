import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

import { deleteAccount } from '../../actions/profile';
import { addEducation } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';

import Experience from '../dashboard/Experience';
import Education from '../dashboard/Education';

const EditEducation = ({
  profile: { profile, loading },
  // createProfile,
  getCurrentProfile,
  addEducation,
  history,
  // deleteAccount,
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
  const eduId = match.params.eduId;
  console.log('eduId: ', eduId);
  // if (loading && profile === null) {
  //   return <Spinner />;
  // }

  useEffect(() => {
    getCurrentProfile(); // get profile of the current user from server (which takes from database) and put it in store
    console.log('profile: ', profile);
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
      current: loading || !eduToEdit.current ? '' : eduToEdit.current,
      description:
        loading || !eduToEdit.description ? '' : eduToEdit.description
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

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData; // detructure local state into variables

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
    addEducation(formData, history, true); // true means edit = true
  };

  // return (
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Enter any school or program that
        you have attended
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => onChange(e)}
            required
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
            Current School
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
            placeholder='Program Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
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
  { getCurrentProfile, addEducation }
)(withRouter(EditEducation));

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

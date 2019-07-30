import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ProfileEducation = ({
  education: {
    school,
    degree,
    fieldofstudy,
    current,
    to,
    from,
    description,
    _id
  }
}) => (
  <div>
    <h3 className='text-dark'>
      {school}{' '}
      <Link title='edit' to={`/edit-education/${_id}`}>
        <i className='fas fa-edit rightside' />
      </Link>
    </h3>
    <p>
      <Moment format='MM/DD/YYYY'>{moment.utc(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format='MM/DD/YYYY'>{moment.utc(to)}</Moment>}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;

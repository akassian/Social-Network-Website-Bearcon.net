import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description, _id }
}) => (
  <div>
    <h3 className='text-dark'>
      {company}
      <Link title='edit' to={`/edit-experience/${_id}`}>
        <i className='fas fa-edit rightside' />
      </Link>
    </h3>
    <p>
      <Moment format='MM/YYYY'>{moment.utc(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format='MM/YYYY'>{moment.utc(to)}</Moment>}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Location: </strong> {location}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;

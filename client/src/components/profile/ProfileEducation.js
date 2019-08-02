import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteEducation } from '../../actions/profile';
import { connect } from 'react-redux';

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
  },
  deleteEducation,
  edit
}) => (
  <div>
    <h3 className='text-dark'>
      {school}{' '}
      {edit && (
        <Fragment>
          <Link title='Edit' to={`/edit-education/${_id}`}>
            <i className='fas fa-edit rightside' />
          </Link>
          <button
            title='Delete row'
            onClick={() => deleteEducation(_id)}
            className='btn-del'
          >
            <i className='fas fa-minus-circle rightside' />
          </button>
        </Fragment>
      )}
    </h3>
    <p>
      <Moment format='MM/YYYY'>{moment.utc(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format='MM/YYYY'>{moment.utc(to)}</Moment>}
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
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(ProfileEducation);
// export default ProfileEducation;

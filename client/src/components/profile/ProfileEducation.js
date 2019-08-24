import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
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
  history,
  deleteEducation,
  edit
}) => (
  <div>
    <h3 className='text-dark'>
      {school}{' '}
      {edit && (
        <Fragment>
          <button
            title='Delete row'
            onClick={() => deleteEducation(history, _id)}
            className='btn-del rightside'
          >
            {/* {console.log(history)}
            {console.log(_id)} */}
            <i className='fas fa-minus-circle' />
          </button>
          <Link
            title='Edit'
            to={`/edit-education/${_id}`}
            className='rightside'
          >
            <i className='fas fa-edit' />
          </Link>
        </Fragment>
      )}
    </h3>
    <p>
      <Moment format='MM/DD/YYYY'>{moment.utc(from)}</Moment> -{' '}
      {current ? ' Now' : <Moment format='MM/DD/YYYY'>{moment.utc(to)}</Moment>}
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
)(withRouter(ProfileEducation));
// export default ProfileEducation;

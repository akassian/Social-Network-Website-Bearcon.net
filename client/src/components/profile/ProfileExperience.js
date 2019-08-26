import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { deleteExperience } from '../../actions/profile';
import { connect } from 'react-redux';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description, _id },
  deleteExperience,
  history,
  edit
}) => (
    <div>
      <h3 className='text-dark'>
        {company}
        {edit && (
          <Fragment>
            <button
              title='Delete row'
              onClick={() => deleteExperience(history, _id)}
              className='btn-del rightside'
            >
              {/* {console.log(_id)} */}
              <i className='fas fa-minus-circle' />
            </button>
            <Link
              title='Edit'
              to={`/edit-experience/${_id}`}
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
  experience: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(withRouter(ProfileExperience));

// export default ProfileExperience;

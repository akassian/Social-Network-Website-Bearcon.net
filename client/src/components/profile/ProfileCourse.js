import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
// import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { deleteCourse } from '../../actions/profile';
import { connect } from 'react-redux';

const ProfileCourses = ({
  course: { title, _id },
  history,
  deleteCourse,
  edit
}) => (
  <div>
    <h3 className='text-dark'>
      {edit && (
        <Fragment>
          <button
            title='Delete row'
            onClick={() => deleteCourse(history, _id)}
            className='btn-del rightside'
          >
            <i className='fas fa-minus-circle' />
          </button>
          <Link title='Edit' to={`/edit-course/${_id}`} className='rightside'>
            <i className='fas fa-edit' />
          </Link>
        </Fragment>
      )}
    </h3>
    <p>{title}</p>
  </div>
);

ProfileCourses.propTypes = {
  course: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCourse }
)(withRouter(ProfileCourses));

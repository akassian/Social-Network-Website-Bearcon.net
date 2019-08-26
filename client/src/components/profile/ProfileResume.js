import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
// import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
//import { deleteCourse } from '../../actions/profile';
import { connect } from 'react-redux';

const ProfileResume = ({
  resume: { url, _id },
  history,
  //deleteCourse,
  edit
}) => (
    <div>
      {/* <h3 className='text-dark'>
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
    </h3> */}
      {/* <p>{title}</p> */}
      <br />
      <br />
      <object width="100%" height="400" data={url}
        type="application/pdf">   </object>

    </div>
  );

ProfileResume.propTypes = {
  resume: PropTypes.object.isRequired,
  //deleteCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  {}
  //{ deleteCourse }
)(withRouter(ProfileResume));

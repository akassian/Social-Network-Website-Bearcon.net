import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { deleteResume } from '../../actions/profile';
import { connect } from 'react-redux';

const ProfileResume = ({
  resume: { url, _id },
  history,
  deleteResume,
  edit
}) => (
    <Fragment>
      <Fragment>
        <h3 className='text-dark'>
          {edit && (
            <button
              title='Delete Resume'
              onClick={() => deleteResume(history)}
              className='btn-del rightside'
            >
              <i className='fas fa-minus-circle' />
            </button>)}
        </h3>
      </Fragment>
      <br />
      <br />
      <object width="100%" height="1000" data={url}
        type="application/pdf">   </object>

    </Fragment >
  );

ProfileResume.propTypes = {
  resume: PropTypes.object.isRequired,
  deleteResume: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteResume }
)(withRouter(ProfileResume));

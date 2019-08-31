import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadResume } from '../../actions/profile';

const UploadResume = ({ uploadResume, history }) => {
  let resume = { url: '' };
  let myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'akass1122',
      uploadPreset: 'pdfPreset',
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        //console.log('result: ', result);
        resume.url = result.info.secure_url;
        uploadResume(resume, history);
      }
    }
  );

  return (
    <Fragment>
      <h1 className='large text-primary'>Upload Resume in pdf</h1>{' '}
      <button
        className='btn btn-primary my-1'
        onClick={() => {
          myWidget.open();
        }}
      >
        Upload Resume in pdf
      </button>
    </Fragment>
  );
};

UploadResume.propTypes = {
  uploadResume: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    uploadResume,
  }
)(withRouter(UploadResume));

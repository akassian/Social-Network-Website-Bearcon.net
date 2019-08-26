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

  // let images2 = { cover: '' };
  // let myWidget2 = window.cloudinary.createUploadWidget(
  //   {
  //     cloudName: 'akass1122',
  //     uploadPreset: 'coverpreset'
  //   },
  //   (error, result) => {
  //     if (!error && result && result.event === 'success') {
  //       //console.log('result: ', result);
  //       images2.cover = result.info.secure_url;
  //       uploadCover(images2, history);
  //     }
  //   }
  // );

  return (
    <Fragment>
      <h1 className='large text-primary'>Upload Resume in pdf</h1>{' '}
      {/* <p className='lead'>For best results, crop image into a square.</p> */}
      <button
        className='btn btn-primary my-1'
        onClick={() => {
          myWidget.open();
        }}
      >
        Upload Resume in pdf
      </button>
      {/* <h1 className='large text-primary'>Upload Cover</h1>{' '}
      <button
        className='btn btn-primary my-1'
        onClick={() => {
          myWidget2.open();
        }}
      >
        Upload Cover
      </button> */}
    </Fragment>
  );
};

UploadResume.propTypes = {
  uploadResume: PropTypes.func.isRequired,
  //uploadCover: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    uploadResume,
    //uploadCover
  }
)(withRouter(UploadResume));

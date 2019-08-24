import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadAvatar, uploadCover } from '../../actions/profile';

const UploadImages = ({ uploadAvatar, uploadCover, history }) => {
  let images1 = { picture: '' };
  let myWidget1 = window.cloudinary.createUploadWidget(
    {
      cloudName: 'akass1122',
      uploadPreset: 'coverpreset',
      cropping: 'server'
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        //console.log('result: ', result);
        images1.picture = result.info.secure_url;
        uploadAvatar(images1, history);
      }
    }
  );

  let images2 = { cover: '' };
  let myWidget2 = window.cloudinary.createUploadWidget(
    {
      cloudName: 'akass1122',
      uploadPreset: 'coverpreset'
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        //console.log('result: ', result);
        images2.cover = result.info.secure_url;
        uploadCover(images2, history);
      }
    }
  );

  return (
    <Fragment>
      <h1 className='large text-primary'>Upload Avatar</h1>{' '}
      <p className='lead'>For best results, crop image into a square.</p>
      <button
        className='btn btn-primary my-1'
        onClick={() => {
          myWidget1.open();
        }}
      >
        Upload Avatar
      </button>
      <h1 className='large text-primary'>Upload Cover</h1>{' '}
      <button
        className='btn btn-primary my-1'
        onClick={() => {
          myWidget2.open();
        }}
      >
        Upload Cover
      </button>
    </Fragment>
  );
};

UploadImages.propTypes = {
  uploadAvatar: PropTypes.func.isRequired,
  uploadCover: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    uploadAvatar,
    uploadCover
  }
)(withRouter(UploadImages));

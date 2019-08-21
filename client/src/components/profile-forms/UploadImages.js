import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadAvatar, uploadCover } from '../../actions/profile';

const UploadImages = ({ uploadAvatar, uploadCover, history }) => {
  //let formData = new FormData();

  // const onSubmitAvatar = e => {
  //   //formData.append("picture", e.target.files[0]);

  //   //formData.append("description", "Night Sky");  //if user wants to add a description of the picture
  //   // "photo" is the name in in upload.single("photo") in server routing app.post(...)
  //   //app.post("/uploading", [auth, upload.single("photo")], uploadcallback);
  //   // If console.log a FormData, it will show an empty object, so need to
  //   // console.log entries of a FormData
  //   for (var pair of formData.entries()) {
  //     console.log("formData: ", pair[0] + ", " + pair[1]);
  //   }
  //   uploadAvatar(formData, history);
  // };

  // const onSubmitCover = e => {
  //   //formData = new FormData();
  //   formData.append("cover", e.target.files[0]);
  //   //formData.append("description", "Night Sky");  //if user wants to add a description of the picture
  //   // If console.log a FormData, it will show an empty object, so need to
  //   // console.log entries of a FormData
  //   for (var pair of formData.entries()) {
  //     console.log(pair[0] + ", " + pair[1]);
  //   }

  // };
  let images1 = { picture: '' };
  let myWidget1 = window.cloudinary.createUploadWidget(
    {
      cloudName: 'akass1122',
      uploadPreset: 'defaultPreset'
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('result: ', result);
        // console.log("Done! Here is the avatar image info: ", result.info);
        // console.log("result.info.secure_url: ", result.info.secure_url);
        // formData.append("picture", result.info.secure_url);
        images1.picture = result.info.secure_url;
      }
    }
  );

  let images2 = { cover: '' };

  let myWidget2 = window.cloudinary.createUploadWidget(
    {
      cloudName: 'akass1122',
      uploadPreset: 'defaultPreset'
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('result: ', result);
        // console.log("Done! Here is the cover image info: ", result.info);
        // console.log("result.info.secure_url: ", result.info.secure_url);
        images2.cover = result.info.secure_url;
      }
    }
  );

  return (
    <Fragment>
      {/* //========================================================= */}{' '}
      <h1 className='large text-primary'>Add or update avatar picture</h1>{' '}
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          uploadAvatar(images1, history);
        }}
      >
        {' '}
        <div className='form-group'>
          {' '}
          <h2>
            {' '}
            Please choose your avatar picture. When done uploading, click Update
            Avatar. Wait a minute to see your new avatar on Profile.{' '}
          </h2>
          <div>
            <button
              className='btn btn-primary my-1'
              onClick={() => {
                myWidget1.open();
              }}
            >
              Upload Avatar
            </button>
          </div>
        </div>{' '}
        <input type='submit' value='Update Avatar' className='btn btn-dark' />{' '}
      </form>{' '}
      {/* //========================================================= */}
      {/* //========================================================= */}{' '}
      <h1 className='large text-primary'>Add or update cover picture</h1>{' '}
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          console.log('images2: ', images2);
          uploadCover(images2, history);
        }}
      >
        {' '}
        <div className='form-group'>
          {' '}
          <h2>
            {' '}
            Please choose your cover picture. When done uploading, click Update
            Cover. Wait a minute to see your new cover on Profile.{' '}
          </h2>
          <div>
            <button
              className='btn btn-primary my-1'
              onClick={() => {
                myWidget2.open();
              }}
            >
              Upload Cover
            </button>
          </div>
        </div>{' '}
        <input type='submit' value='Update Cover' className='btn btn-dark' />{' '}
      </form>{' '}
      {/* //========================================================= */}
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

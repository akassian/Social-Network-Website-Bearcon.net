// This file is used for uploading avatar from client to Cloudinary through our server,
// using Multer.
// We are not using it in the current version of our project.
// We instead upload avatar from client directly to Cloudinary.

import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadFile } from '../../actions/profile';

const UploadFile = ({ uploadFile, history }) => {
  let data;
  const onChange = e => {
    data = new FormData();
    data.append('photo', e.target.files[0]);
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
  };

  return (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Add Avatar Picture</h1>{' '}
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          uploadFile(data, history);
        }}
      >
        {' '}
        <div>
          {' '}
          {/* <input type='file' accept='image/*' onChange={onChange} /> */}
          <input type='file' accept='.jpg, .png' onChange={onChange} />
        </div>{' '}
        <input type='submit' className='btn btn-primary my-1' />{' '}
      </form>{' '}
    </Fragment>
  );
};

UploadFile.propTypes = {
  uploadFile: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    uploadFile
  }
)(withRouter(UploadFile));

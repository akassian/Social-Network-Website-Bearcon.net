import React, { Fragment, useState } from 'react';

import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { uploadFile } from '../../actions/profile';

const UploadFile = ({ uploadFile, history }) => {
  let data;
  const onChange = e => {
    data = new FormData();
    data.append('photo', e.target.files[0]);
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
  };

  return (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Add A Course</h1>{' '}
      <p className='lead'>
        {' '}
        <i className='fas fa-code-branch' /> Add any course of relevant
        experience you have taken.{' '}
      </p>{' '}
      <small>*=required field</small>{' '}
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
          <input type='file' accept='image/*' onChange={onChange} />
        </div>{' '}
        <input type='submit' className='btn btn-primary my-1' />{' '}
        <Link className='btn btn-light my-1' to='/login'>
          {' '}
          Go Back{' '}
        </Link>{' '}
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

import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <center>
      <Fragment>
        <h1 className='large text-primary'>
          <i className='fas fa-exclamation-triangle' />
          Page Not Found!
        </h1>
        <p className='large'>Sorry, this page doesn't exist</p>
      </Fragment>
    </center>
  );
};

export default NotFound;

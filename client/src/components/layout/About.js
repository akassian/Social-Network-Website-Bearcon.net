import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <center>
      {/* <section className='nfbg'> */}
      <h1 className='large text-primary' />
      <Fragment>
        <h1 className='large text-primary'>
          <i className='fas fa-exclamation-triangle' />
          <p>
            This is my side project - a social network site for UC Berkeley
            students and alumni.
          </p>
          <p>
            The site uses MERN stack: a Nodejs server, Expressjs, a Mongo
            database, and React with Redux for front end. Users' images are
            stored on Cloudinary server. In this version of project, users'
            images are uploaded from client directly to Cloudinary. In another
            version of the project, users' images are uploaded from client to
            server, then from server to Cloudinary.
          </p>
          <p>Andrei K., UC Berkeley student</p>
        </h1>
        <p className='large'>Test, about, contact</p>
      </Fragment>
      {/* </section> */}
    </center>
  );
};

export default NotFound;

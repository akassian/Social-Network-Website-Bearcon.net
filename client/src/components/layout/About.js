import React, { Fragment } from 'react';

const NotFound = () => {
  return (

    <Fragment>
      <h3 className='text-dark'>
        <br />
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
        <br />
        <p>Andrei K.</p>
        <p> UC Berkeley student</p>
        <p> akassweb@gmail.com</p>
      </h3>

    </Fragment>

  );
};

export default NotFound;

import React, { Fragment } from 'react';

const NotFound = () => {
  return (

    <Fragment>
      <div className='text-dark medium'>
        <br />
        <p>
          This is my side project - a social network site for UC Berkeley
          students and alumni. Cal Bears can connect, share, post their profiles, and upload their pictures and resumes.
          </p>
        <p>
          The site uses MERN stack: a Nodejs server, Expressjs, REST API, a Mongo database, and React with Redux for front end. It uses JSON Web Tokens (JWT) for authentication. User images and resume are stored on Cloudinary server. In this version of project, user files are uploaded from browser directly to Cloudinary. In another version of the project, user files are uploaded from browser to server, then from server to Cloudinary.
          </p>
        <br />
        <p>Andrei Kassiantchouk</p>
        <p> UC Berkeley Computer Science student</p>
        <p> akassweb@gmail.com</p>
      </div>

    </Fragment>

  );
};

export default NotFound;

import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCourse } from '../../actions/profile';

const AddCourse = ({ addCourse, history }) => {
  const [formData, setFormData] = useState({
    title: ''
  });
  const { title } = formData;
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  return (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Add A Course</h1>{' '}
      <p className='lead'>
        {' '}
        <i className='fas fa-code-branch' /> Add any course you have taken.{' '}
      </p>{' '}
      <small>*=required field</small>{' '}
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addCourse(formData, history);
        }}
      >
        {' '}
        <div className='form-group'>
          {' '}
          <textarea
            name='title'
            cols='30'
            rows='5'
            placeholder='Course'
            value={title}
            onChange={e => onChange(e)}
          />{' '}
        </div>{' '}
        <input type='submit' className='btn btn-primary my-1' />{' '}
        <Link className='btn btn-light my-1' to='/me'>
          {' '}
          Go Back{' '}
        </Link>{' '}
      </form>{' '}
    </Fragment>
  );
};

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    addCourse
  }
)(withRouter(AddCourse));

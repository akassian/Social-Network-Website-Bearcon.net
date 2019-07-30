import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='MM/YYYY'>{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format='MM/YYYY'>{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td className='td-del'>
        <button
          title='Delete row'
          onClick={() => deleteEducation(edu._id)}
          className='btn-del'
        >
          <i className='fas fa-minus-circle' />
        </button>
      </td>
      <td className='td-del'>
        {/* <button onClick={() => editEducation(edu._id)} className="btn-del"> */}
        <Link to={`/edit-education/${edu._id}`}>
          <i className='fas fa-edit' />
          {/* <i className='fas fa-paw' /> */}
          {/* <span className='hide-sm'>
            {''}
            Profiles
          </span> */}
        </Link>

        {/* </button> */}
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2' />
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            {/* <th /> */}
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);

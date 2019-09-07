import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
//import moment from 'moment';
import { deleteComment } from '../../actions/post';

const CommentItemAuth = ({
  postId,
  comment: { _id, text, name, avatar, picture, user, date },
  auth,
  deleteComment
}) => (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={picture === '' ? avatar : picture} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date inblock'>
          {/* Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
         */}
          {/* <Moment fromNow>{moment.utc(date)}</Moment> */}
          <Moment fromNow>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteComment(postId, _id)}
            type='button'
            className='btn-del rightside'
          >
            <i className='fa fa-times-circle' />
          </button>
        )}
      </div>
    </div>
  );

CommentItemAuth.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItemAuth);

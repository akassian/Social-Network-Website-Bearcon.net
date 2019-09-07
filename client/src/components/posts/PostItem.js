import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
//import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, picture, user, likes, comments, date },
}) => (
    < div className='post bg-white p-1 my-1' >
      {/* {console.log("in PostItem, _id: ", _id)} */}
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={picture === '' ? avatar : picture} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          {/* Posted on <Moment format='lll'>{date}</Moment>
         */}
          {/* <Moment fromNow>{moment.utc(date)}</Moment> */}
          <Moment fromNow>{date}</Moment>
          {/* <p>Posted {moment(date).calendar()}</p>
        <div>Posted {moment(date).format('MM/DD/YYYY')}</div>
        Posted on <Moment format='lll'>{date}</Moment> */}
        </p>
        <Link to={`/posts/${_id}`} className='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
      </div>
    </div >
  );

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};
export default PostItem;

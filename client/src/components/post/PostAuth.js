import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItemAuth from '../posts/PostItemAuth';
import CommentForm from '../post/CommentForm';
import CommentItemAuth from '../post/CommentItemAuth';
import { getPost } from '../../actions/post';

const PostAuth = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <Link to='/posts-auth' className='btn'>
          Back To Posts
      </Link>
        <PostItemAuth post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className='comments'>
          {post.comments.map(comment => (
            <CommentItemAuth key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      </Fragment>
    );
};

PostAuth.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(PostAuth);

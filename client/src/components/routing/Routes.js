import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import AddCourse from '../profile-forms/AddCourse';
import EditEducation from '../profile-forms/EditEducation';
import EditExperience from '../profile-forms/EditExperience';
// import Uploader from '../profile-forms/Uploader';
import UploadFile from '../profile-forms/UploadFile';
import UploadImages from '../profile-forms/UploadImages';
import UploadResume from '../profile-forms/UploadResume';
import EditCourse from '../profile-forms/EditCourse';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import MyProfile from '../profile/MyProfile';
import Posts from '../posts/Posts';
import PostsAuth from '../posts/PostsAuth';
import Post from '../post/Post';
import PostAuth from '../post/PostAuth';
import NotFound from '../layout/NotFound';
import About from '../layout/About';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/about' component={About} />
        <Route exact path='/profile/:id' component={Profile} />
        <Route exact path='/me' component={MyProfile} />
        <Route exact path='/posts' component={Posts} />
        <Route exact path='/posts/:id' component={Post} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        {/* <PrivateRoute exact path='/upload1' component={Uploader} /> */}
        <PrivateRoute exact path='/upload2' component={UploadFile} />
        <PrivateRoute exact path='/upload' component={UploadImages} />
        <PrivateRoute exact path='/upload-resume' component={UploadResume} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/add-course' component={AddCourse} />
        <PrivateRoute
          exact
          path='/edit-education/:eduId'
          component={EditEducation}
        />
        <PrivateRoute
          exact
          path='/edit-experience/:expId'
          component={EditExperience}
        />
        <PrivateRoute
          exact
          path='/edit-course/:courseId'
          component={EditCourse}
        />
        <PrivateRoute exact path='/posts-auth' component={PostsAuth} />
        <PrivateRoute exact path='/posts-auth/:id' component={PostAuth} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

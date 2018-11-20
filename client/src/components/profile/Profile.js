import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
   componentDidMount() {
      if (this.props.match.params.handle) {
         this.props.getProfileByHandle(this.props.match.params.handle);
      }
   }

   // componentWillReceiveProps(nextProps) {
   //    if (nextProps.profile.profile === null && this.props.profile.loading) {
   //       this.props.history.push('/not-found');
   //    } else if (nextProps.profile.profile === null && !this.props.profile.loading) {
   //       // console.log(this.props.location);
   //       // this.props.history.push(this.props.location.pathname);
   //       // this.props.getProfileByHandle(this.props.match.params.handle);
   //    }
   // }

  render() {
     const { publicProfile, loading } = this.props.profile;
     let profileContent;

     if (publicProfile === null || loading) {
        profileContent = <Spinner />;
     } else {
        profileContent = (
           <div>
              <div className="row">
               <div className="col-md-6">
                  <Link to="/profiles" className="btn btn-dark mb-3 float-left">
                     Back to Profiles
                  </Link>
               </div>
              </div>
              <ProfileHeader profile={publicProfile}></ProfileHeader>
              <ProfileAbout profile={publicProfile}></ProfileAbout>
              <ProfileCreds education={publicProfile.education} experience={publicProfile.experience}></ProfileCreds>
              {publicProfile.githubusername ? (<ProfileGithub username={publicProfile.githubusername}/>) : null}
           </div>
        )
     }

    return (
      <div className="profile">
        <div className="container">
         <div className="row">
            <div className="col-md-12">
               {profileContent}
            </div>
         </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
   profile: PropTypes.object.isRequired,
   getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
   profile: state.profile,
   auth: state.auth
});

export default connect(mapStateToProps, {getProfileByHandle})(Profile);

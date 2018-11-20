import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    console.log(profile);

    const renderSocialLinks = socObj => {
      return Object.keys(socObj).map(key => {
        if (socObj[key]) {
          const link = `${socObj[key]}`;
          return (
            <a key={key} className="text-white p-2" href={link} rel="noopener noreferrer" target="_blank">
            <i className={`fab fa-${key} fa-2x`} />
            </a>
          );
        } else return null;
      });
    };

    return (
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    <img className="rounded-circle" src={profile.user.avatar} alt="" />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="display-4 text-center">{profile.user.name}</h1>
                  <p className="lead text-center">{profile.status} {isEmpty(profile.company) ? null : (<span> at {profile.company}</span>)}</p>
                  {isEmpty(profile.location) ? null : (<p>{profile.location}</p>)}
                  <p>
                    {isEmpty(profile.website) ? null : (
                      <a className="text-white p-2" href={profile.website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                      </a>
                    )}

                    {isEmpty(profile.social) ? null : renderSocialLinks(profile.social)}
                    
                  </p>
                </div>
              </div>
            </div>
          </div>

    )
  }
}

export default ProfileHeader;

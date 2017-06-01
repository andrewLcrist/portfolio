import Ember from 'ember';
import RSVP from 'rsvp';
import env from '../../config/environment'

export default Ember.Route.extend({
  model(){
    return RSVP.hash({
      user: $.get(`https://api.github.com/users/andrewlcrist?access_token=${env.githubToken}`),
      repos: $.get(`https://api.github.com/users/andrewlcrist/repos?access_token=${env.githubToken}`),
      highlightedProjects:
        [
          {id: 'movie-keeper', name: 'Movie Keeper'},
          {id: 'weather-forecast', name: 'Weather Forecast'},
          {id: 'pennywise', name: 'PennyWise'}
        ]
    })
  }
});

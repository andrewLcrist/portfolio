import Ember from 'ember';
import RSVP from 'rsvp';
import env from '../config/environment'

export default Ember.Route.extend({
  model(){
    return RSVP.hash({
      user: $.get(`https://api.github.com/users/andrewlcrist?access_token=${env.githubToken}`),
      repos: $.get(`https://api.github.com/users/andrewlcrist/repos?page=1&per_page=100&access_token=${env.githubToken}`),
      highlightedProjects:
        [
          {id: 'moviekeeper', name: 'Movie Keeper'},
          {id: 'weatherforecast', name: 'Weather Forecast'},
          {id: 'pennywise', name: 'PennyWise'}
        ]
    })
  }
});

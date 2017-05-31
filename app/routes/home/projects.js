import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(){
    return RSVP.hash({
      user: $.get('https://api.github.com/users/andrewlcrist'),
      repos: $.get('https://api.github.com/users/andrewlcrist/repos')
    })
  }
});

import Ember from 'ember';
import env from '../config/environment'

export default Ember.Route.extend({
  model(){
    return $.get(`https://api.github.com/users/andrewlcrist?access_token=${env.githubToken}`)
  }
});

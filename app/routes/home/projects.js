import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return $.get(`https://api.github.com/users/andrewlcrist`)
  }
});

import Ember from 'ember';
// import RSVP from 'rsvp';

export default Ember.Route.extend({
  projects: { moviekeeper: {id: 'moviekeeper', name: 'Movie Keeper'},
  weatherforecast: {id: 'weatherforecast', name: 'Weather Forecast'},
  pennywise: {id: 'pennywise', name: 'PennyWise'} },
  model(params){
    return this.projects[params.projectid]
  }
});

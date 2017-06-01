import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(){
    return
      highlightedProjects:
        [
          {id: 'movie-keeper', name: 'Movie Keeper'},
          {id: 'weather-forecast', name: 'Weather Forecast'},
          {id: 'pennywise', name: 'PennyWise'}
        ]
  }
});

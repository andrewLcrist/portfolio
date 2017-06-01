import Ember from 'ember';
// import RSVP from 'rsvp';

export default Ember.Route.extend({
  projects:
    { moviekeeper: {
        id: 'moviekeeper',
        name: 'Movie Keeper',
        about: 'Allows user to keep track of their movie collection and the format in which they own each individual movie.',
        built: 'React, CSS/SCSS, React Bootstrap, React YouTube, React Router 4, webpack, and Firebase.Movie information was acquired using The Movie Database API.',
        createdBy: 'Andrew Crist',
        images: ['../../public/assets/moviekeeper/1', '../../public/assets/moviekeeper/2', '../../public/assets/moviekeeper/3', '../../public/assets/moviekeeper/4',],
        githubURL: 'https://github.com/andrewLcrist/movie-keeper'
      },
      weatherforecast: {
        id: 'weatherforecast',
        name: 'Weather Forecast',
        about: 'Utilizes geolocation to provide user with current location. User can add up to four other locations to track.',
        built: 'React, React Router, webpack and Mocha for testing.',
        createdBy: 'Alex Pilewski, Andrew Crist, Chrstine Gamble, Gabi Procell',
        images: ['../../public/assets/weatherforecast/1'],
        githubURL: 'https://github.com/andrewLcrist/weather-forecast'
      },
      pennywise: {
        id: 'pennywise',
        name: 'PennyWise',
        about: 'PennyWise is a budget app created for the first-time budgeter who has tried other budget apps that ended up being too complicated.',
        built: 'React Native and Firebase.',
        createdBy: 'Andrew Crist, Gabi Procell, Ryan Westlake',
        images: ['../../public/assets/pennywise/1', '../../public/assets/pennywise/2', '../../public/assets/pennywise/3', '../../public/assets/pennywise/4', '../../public/assets/pennywise/5', '../../public/assets/pennywise/6'],
        githubURL: 'https://github.com/andrewLcrist/penny-wise'
      }
    },
  model(params){
    return this.projects[params.projectid]
  }
});

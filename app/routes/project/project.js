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
        images: ['https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/moviekeeper%2F1.png?alt=media&token=5bfb0ce1-92af-4fff-a5f3-e97587a1aca3', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/moviekeeper%2F2.png?alt=media&token=12924998-2f69-4c86-bfa3-f4936fd77b1d', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/moviekeeper%2F3.png?alt=media&token=80ac925a-620f-41dc-902c-24ef4fe8a723', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/moviekeeper%2F4.png?alt=media&token=aa500597-fe15-4988-81fe-ead7f8ebee88',],
        githubURL: 'https://github.com/andrewLcrist/movie-keeper'
      },
      weatherforecast: {
        id: 'weatherforecast',
        name: 'Weather Forecast',
        about: 'Utilizes geolocation to provide user with current location. User can add up to four other locations to track.',
        built: 'React, React Router, webpack and Mocha for testing.',
        createdBy: 'Alex Pilewski, Andrew Crist, Chrstine Gamble, Gabi Procell',
        images: ['https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/weatherforecast%2F1.png?alt=media&token=2d1c3867-2684-4260-9197-2a2f06a4ffe3'],
        githubURL: 'https://github.com/andrewLcrist/weather-forecast'
      },
      pennywise: {
        id: 'pennywise',
        name: 'PennyWise',
        about: 'PennyWise is a budget app created for the first-time budgeter who has tried other budget apps that ended up being too complicated.',
        built: 'React Native and Firebase.',
        createdBy: 'Andrew Crist, Gabi Procell, Ryan Westlake',
        images: ['https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F1.png?alt=media&token=0bb43bf5-c2ec-4267-951d-8fb318322488', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F2.png?alt=media&token=fe34d7b2-9212-406a-9c79-05a1e6a87cfc', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F3.png?alt=media&token=7a736dba-9984-461a-a059-2e0bdd88ac53', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F4.png?alt=media&token=1325ccf6-b220-4e10-9f3a-bf4c82323988', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F5.png?alt=media&token=b28cb881-93ac-4cbd-8405-75416a432beb', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F6.png?alt=media&token=586885c1-ed33-49c0-9a86-5027ef91f89a'],
        githubURL: 'https://github.com/andrewLcrist/penny-wise'
      }
    },
  model(params){
    return this.projects[params.projectid]
  }
});

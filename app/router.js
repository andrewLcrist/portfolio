import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

console.log(Router.reopen());

Router.reopen({
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});

Router.map(function() {
  this.route('home', {path: '/'}, function() {});
  this.route('projects');
  this.route('about');

  this.route('project', function() {
    this.route('project', {path: ':projectid'});
  });
});

export default Router;

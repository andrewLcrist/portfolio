import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: '/'}, function() {});
  this.route('projects', function() {});
  this.route('about');

  this.route('project', function() {
    this.route('project', {path: ':projectid'});
  });
});

export default Router;

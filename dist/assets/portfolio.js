"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('portfolio/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _emberfireAdaptersFirebase) {
  exports['default'] = _emberfireAdaptersFirebase['default'].extend({});
});
define('portfolio/app', ['exports', 'ember', 'portfolio/resolver', 'ember-load-initializers', 'portfolio/config/environment'], function (exports, _ember, _portfolioResolver, _emberLoadInitializers, _portfolioConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _portfolioConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _portfolioConfigEnvironment['default'].podModulePrefix,
    Resolver: _portfolioResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _portfolioConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('portfolio/components/nav-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('portfolio/helpers/app-version', ['exports', 'ember', 'portfolio/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _portfolioConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _portfolioConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('portfolio/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('portfolio/helpers/production-site', ['exports', 'ember'], function (exports, _ember) {
  exports.productionSite = productionSite;

  function productionSite(params /*, hash*/) {
    var answer = undefined;
    if (!params === '') {
      answer = params;
    } else {
      answer = 'iOS app not in production';
    }
    return answer;
  }

  exports['default'] = _ember['default'].Helper.helper(productionSite);
});
define('portfolio/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('portfolio/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'portfolio/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _portfolioConfigEnvironment) {
  var _config$APP = _portfolioConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('portfolio/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('portfolio/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('portfolio/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/index'], function (exports, _emberDataSetupContainer, _emberDataIndex) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('portfolio/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfireInitializersEmberfire) {
  exports['default'] = _emberfireInitializersEmberfire['default'];
});
define('portfolio/initializers/export-application-global', ['exports', 'ember', 'portfolio/config/environment'], function (exports, _ember, _portfolioConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_portfolioConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _portfolioConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_portfolioConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('portfolio/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('portfolio/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('portfolio/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("portfolio/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('portfolio/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('portfolio/router', ['exports', 'ember', 'portfolio/config/environment'], function (exports, _ember, _portfolioConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _portfolioConfigEnvironment['default'].locationType,
    rootURL: _portfolioConfigEnvironment['default'].rootURL
  });

  Router.reopen({
    notifyGoogleAnalytics: (function () {
      return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
    }).on('didTransition')
  });

  Router.map(function () {
    this.route('home', { path: '/' }, function () {});
    this.route('projects');
    this.route('about');

    this.route('project', function () {
      this.route('project', { path: ':projectid' });
    });
  });

  exports['default'] = Router;
});
define('portfolio/routes/about', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('portfolio/routes/home', ['exports', 'ember', 'portfolio/config/environment'], function (exports, _ember, _portfolioConfigEnvironment) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return $.get('https://api.github.com/users/andrewlcrist?access_token=' + _portfolioConfigEnvironment['default'].githubToken);
    }
  });
});
define('portfolio/routes/project/project', ['exports', 'ember'], function (exports, _ember) {
  // import RSVP from 'rsvp';

  exports['default'] = _ember['default'].Route.extend({
    projects: { moviekeeper: {
        id: 'moviekeeper',
        name: 'Movie Keeper',
        about: 'Allows user to keep track of their movie collection and the format in which they own each individual movie.',
        built: 'React, CSS/SCSS, React Bootstrap, React YouTube, React Router 4, webpack, and Firebase.Movie information was acquired using The Movie Database API.',
        createdBy: 'Andrew Crist',
        images: ['https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/moviekeeper%2F1.png?alt=media&token=5bfb0ce1-92af-4fff-a5f3-e97587a1aca3', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/moviekeeper%2F2.png?alt=media&token=12924998-2f69-4c86-bfa3-f4936fd77b1d', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/moviekeeper%2F3.png?alt=media&token=80ac925a-620f-41dc-902c-24ef4fe8a723', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/moviekeeper%2F4.png?alt=media&token=aa500597-fe15-4988-81fe-ead7f8ebee88'],
        githubURL: 'https://github.com/andrewLcrist/movie-keeper',
        production: 'moviekeeper-65458.firebaseapp.com'
      },
      weatherforecast: {
        id: 'weatherforecast',
        name: 'Weather Forecast',
        about: 'Utilizes geolocation to provide user with current location. User can add up to four other locations to track.',
        built: 'React, React Router, webpack and Mocha for testing.',
        createdBy: 'Alex Pilewski, Andrew Crist, Chrstine Gamble, Gabi Procell',
        images: ['https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/weatherforecast%2F1.png?alt=media&token=2d1c3867-2684-4260-9197-2a2f06a4ffe3'],
        githubURL: 'https://github.com/andrewLcrist/weather-forecast',
        production: 'https://andrewlcrist.github.io/weather-forecast/'
      },
      pennywise: {
        id: 'pennywise',
        name: 'PennyWise',
        about: 'PennyWise is a budget app created for the first-time budgeter who has tried other budget apps that ended up being too complicated.',
        built: 'React Native and Firebase.',
        createdBy: 'Andrew Crist, Gabi Procell, Ryan Westlake',
        images: ['https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F1.png?alt=media&token=0bb43bf5-c2ec-4267-951d-8fb318322488', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F2.png?alt=media&token=fe34d7b2-9212-406a-9c79-05a1e6a87cfc', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F3.png?alt=media&token=7a736dba-9984-461a-a059-2e0bdd88ac53', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F4.png?alt=media&token=1325ccf6-b220-4e10-9f3a-bf4c82323988', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F5.png?alt=media&token=b28cb881-93ac-4cbd-8405-75416a432beb', 'https://firebasestorage.googleapis.com/v0/b/ember-portfolio-36de9.appspot.com/o/pennywise%2F6.png?alt=media&token=586885c1-ed33-49c0-9a86-5027ef91f89a'],
        githubURL: 'https://github.com/andrewLcrist/penny-wise',
        production: ''
      }
    },
    model: function model(params) {
      return this.projects[params.projectid];
    }
  });
});
define('portfolio/routes/projects', ['exports', 'ember', 'rsvp', 'portfolio/config/environment'], function (exports, _ember, _rsvp, _portfolioConfigEnvironment) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return _rsvp['default'].hash({
        user: $.get('https://api.github.com/users/andrewlcrist?access_token=' + _portfolioConfigEnvironment['default'].githubToken),
        repos: $.get('https://api.github.com/users/andrewlcrist/repos?page=1&per_page=100&access_token=' + _portfolioConfigEnvironment['default'].githubToken),
        highlightedProjects: [{ id: 'moviekeeper', name: 'Movie Keeper' }, { id: 'weatherforecast', name: 'Weather Forecast' }, { id: 'pennywise', name: 'PennyWise' }]
      });
    }
  });
});
define('portfolio/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('portfolio/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _emberfireServicesFirebaseApp) {
  exports['default'] = _emberfireServicesFirebaseApp['default'];
});
define('portfolio/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _emberfireServicesFirebase) {
  exports['default'] = _emberfireServicesFirebase['default'];
});
define("portfolio/templates/about", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "+uiuP+Mb", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"nav-bar\"]],false],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"about-container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"about the site\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"am i pretty?\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" no. my developer built me using ember. he wanted to simply focus on the framework, not styling.\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "portfolio/templates/about.hbs" } });
});
define("portfolio/templates/components/nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "SQKHjhTi", "block": "{\"statements\":[[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"header-container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"header-link\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"home\"],null,2],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"header-link\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"projects\"],null,1],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"header-link\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"about\"],null,0],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"about the site\"]],\"locals\":[]},{\"statements\":[[\"text\",\"projects\"]],\"locals\":[]},{\"statements\":[[\"text\",\"about me\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "portfolio/templates/components/nav-bar.hbs" } });
});
define("portfolio/templates/home", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cLJOk3Am", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width: 100vw;\\n            height: 100vh;\\n            justify-content: center;\\n            align-items: center;\\n            display: flex;\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"coming soon\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "portfolio/templates/home.hbs" } });
});
define("portfolio/templates/project/project", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "s0AXiwDk", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"nav-bar\"]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"project-container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"project-text\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"project-title\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"content\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"github-link\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"target\",\"_blank\"],[\"dynamic-attr\",\"href\",[\"unknown\",[\"content\",\"githubURL\"]],null],[\"flush-element\"],[\"text\",\"view on github\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"project-content\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"project-header\"],[\"flush-element\"],[\"text\",\"production site:\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"append\",[\"helper\",[\"production-site\"],[[\"get\",[\"content\",\"production\"]]],null],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"project-content\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"project-header\"],[\"flush-element\"],[\"text\",\" about:\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"append\",[\"unknown\",[\"content\",\"about\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"project-content\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"project-header\"],[\"flush-element\"],[\"text\",\"built using:\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"append\",[\"unknown\",[\"content\",\"built\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"project-content\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"project-header\"],[\"flush-element\"],[\"text\",\"created by:\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"append\",[\"unknown\",[\"content\",\"createdBy\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"project-content\"],[\"flush-element\"],[\"text\",\"screenshots:\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"project-screenshot-container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"content\",\"images\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"app-screenshot\"],[\"dynamic-attr\",\"src\",[\"get\",[\"image\"]],null],[\"static-attr\",\"alt\",\"app screenshot\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"image\"]}],\"hasPartials\":false}", "meta": { "moduleName": "portfolio/templates/project/project.hbs" } });
});
define("portfolio/templates/projects", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EwcDbewU", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"nav-bar\"]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"projects-container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"highlighted-projects-container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"highlighted projects\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"content\",\"highlightedProjects\"]]],null,2],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"github-projects-container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"github projects\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"github-projects-user-info-container\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"user-container\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"link-to-github\"],[\"flush-element\"],[\"text\",\"link to my\\n          \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"tartet\",\"_blank\"],[\"dynamic-attr\",\"href\",[\"unknown\",[\"content\",\"user\",\"html_url\"]],null],[\"flush-element\"],[\"text\",\"GitHub\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"table-container\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"github-projects-repos\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"content\",\"repos\"]]],null,0],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"link\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"target\",\"_blank\"],[\"dynamic-attr\",\"href\",[\"unknown\",[\"repo\",\"html_url\"]],null],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"unknown\",[\"repo\",\"name\"]],false],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"repo\"]},{\"statements\":[[\"append\",[\"unknown\",[\"project\",\"name\"]],false]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"highlight-project link\"],[\"flush-element\"],[\"text\",\" \"],[\"block\",[\"link-to\"],[\"project.project\",[\"get\",[\"project\",\"id\"]]],null,1],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"project\"]}],\"hasPartials\":false}", "meta": { "moduleName": "portfolio/templates/projects.hbs" } });
});
define('portfolio/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _emberfireToriiProvidersFirebase) {
  exports['default'] = _emberfireToriiProvidersFirebase['default'];
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('portfolio/config/environment', ['ember'], function(Ember) {
  var prefix = 'portfolio';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("portfolio/app")["default"].create({"name":"portfolio","version":"0.0.0+378e3247"});
}

/* jshint ignore:end */
//# sourceMappingURL=portfolio.map

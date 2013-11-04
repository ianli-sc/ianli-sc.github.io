// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "../javascripts/lib",
    "paths": {
      "biz": "../biz",
      "applet": "../applet"
    },
    "shim": {
        "bootstrap": ["jquery"]
    }
});

// Load the main app module to start the app
requirejs(["biz/manager"]);

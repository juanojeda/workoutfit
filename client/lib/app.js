angular.module('workoutfit',
[
    'angular-meteor',
    'ui.router',
    'ngMaterial'
]);

// global variable for workoutfit angular module
Workoutfit = angular.module('workoutfit');

Workoutfit.config(function($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider
    .theme('default')
        .primaryPalette('blue')
        .accentPalette('teal');

    $mdIconProvider
        .iconSet('action', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg')
        .iconSet('av', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg')
        .iconSet('content', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg')
});

function onReady() {
    angular.bootstrap(document, ['workoutfit'], {
        strictDi: true
    });
}

if (Meteor.isCordova){
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}

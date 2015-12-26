angular.module('workoutfit',
[
    'angular-meteor',
    'ui.router',
    'ngMaterial'
]);

// global variable for workoutfit angular module
Workoutfit = angular.module('workoutfit');

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

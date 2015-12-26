Workoutfit
    .directive('workoutList', function(){
        return {
            restrict: 'E',
            templateUrl: 'client/workouts/workout-list/workout-list.html',
            controllerAs: 'workoutList',
            controller: function ($scope, $reactive){

                $reactive(this).attach($scope);

                this.helpers({
                    workouts: () => {
                        return Workouts.find({});
                    }
                });

            }
        }
    });

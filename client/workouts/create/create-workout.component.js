Workoutfit
    .directive('createWorkout', function(){
        return {
            restrict: 'E',
            templateUrl: 'client/workouts/create/create-workout.html',
            controllerAs: 'createWorkout',
            controller: function($scope, $stateParams, $reactive, $state){
                $reactive(this).attach($scope);

                this.cancelCreate = function(){
                    $state.transitionTo('workouts');
                };

                this.canSubmit = function(){
                    if (_.isEmpty(this.workout.exercises)){
                        return !!this.tempExercise.exerciseId;
                    } else {
                        return true;
                    };
                };

                this.helpers({
                    tempExercise: () => {
                        return {}
                    },
                    workout: () => {
                        return {
                            name: '',
                            exercises: []
                        }
                    },
                    saveWorkout: () => {
                        // save the workout to the database
                    },
                    exerciseList: () => {
                        return Exercises.find({});
                    }
                });
            }
        }
    });

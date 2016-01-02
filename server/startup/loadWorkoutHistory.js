Meteor.startup(function(){
    if (WorkoutHistory.find().count() === 0){
        for (var i = 0; i < workoutHistoryFixture.length; i++){
            WorkoutHistory.insert(workoutHistoryFixture[i]);
        }
    }
});

Meteor.startup(function(){
    if (Workouts.find().count() === 0){
        for (var i = 0; i < workoutsFixture.length; i++){
            Workouts.insert(workoutsFixture[i]);
        }
    }
});

$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyCZ51o4V_QDpC0SkADC9MX6KZo7xr40_AU",
        authDomain: "train-time-e520e.firebaseapp.com",
        databaseURL: "https://train-time-e520e.firebaseio.com",
        projectId: "train-time-e520e",
        storageBucket: "",
        messagingSenderId: "351220503982"
      };
      firebase.initializeApp(config);
    
    var dataRef = firebase.database();
    
    // initial Values
    var trainName = "";
    var destination = "";
    var firstTrainTime = 0;
    var frequency = 0;
    //create on-click event
    $("#add-train").on("click", function(event) {
        event.preventDefault();
        
        trainName = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = $("#time-input").val().trim();
        frequency = $("#frequency-input").val().trim();

      // push to Firebase 
        dataRef.ref().push({
            
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
          });
        });
        
        dataRef.ref().on("child_added", function(childSnapshot) {
      
          //set variables to stored values
          var trainName = childSnapshot.val().trainName;
          var destination = childSnapshot.val().destination;
          var firstTrainTime = childSnapshot.val().firstTrainTime;
          var frequency = childSnapshot.val().frequency;
          //convert time of first train to come before current time
          var firstTimeConverted = moment(firstTrainTime, "HH:mm:").subtract(1, "years");
          console.log(firstTimeConverted);
          //grab the current time
          var currentTime = moment().format("HH:mm");
          console.log("CURRENT TIME: " + currentTime);
          //get the difference in time between the current time and the first train
          var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
          console.log("Difference in Time: " + timeDiff);
          //get the remainder 
          var timeRemainder = timeDiff % frequency;
          console.log(timeRemainder);
          //subtract the remainder from the frequency to determine minutes until the next train
          var minToNextTrain = frequency - timeRemainder;
          console.log(minToNextTrain);
          //add the minutes until next train to the current time to determine time next train arrives
          var nextTrain = moment().add(minToNextTrain, "minutes").format("HH:mm");
          console.log(nextTrain);

          //add train data to table
          $("#trainTable").append(
            "<tr><td id='trainName'>" + trainName + "</td><td id='destination'>" + destination + "</td><td id='frequency'>" + frequency + "</td><td id='next'>" + nextTrain + "</td><td id='minsToNext'>" + minToNextTrain + "</td></tr>");
          
            //handle the errors
          }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);

      });
    });
          
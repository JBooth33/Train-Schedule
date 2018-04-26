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
            
            name: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
        });
    
      });
          
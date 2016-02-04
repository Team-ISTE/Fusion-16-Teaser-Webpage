
$(document).ready(function(){

  // Setup the form to watch for the submit event
         $('#myForm').submit(function(e){
              e.preventDefault();
              //alert('In function block');
              // Grab the elements from the form to make up
              // an object containing name, email and message
              var data = { 
                email: document.getElementById('email').value,
              }
               // Initialize Parse with your Parse application & javascript keys
              Parse.initialize("qrfE5XPrF0T012QJR9VHTufDsyd9YGW1JKmgrxF2", "GCo5n6P82NhYnroObWWQWKCexeahJqseSKPLJh5W");
              var TestObject = Parse.Object.extend("TestObject");
              var testObject = new TestObject();
              testObject.set("email",data);
              testObject.save(null, {
                  success: function(TestObject) {
                  // Execute any logic that should take place after the object is saved.
                  // Run our Parse Cloud Code and 
                  // pass our 'data' object to it
                  Parse.Cloud.run("mail", data, {
                    success: function(object) {
                      $('#subtitle').html('Thanks for subscribing!').addClass('show').fadeIn('fast');
                    },

                    error: function(object, error) {
                      console.log(error);
                      $('#subtitle').html('Oops Something went wrong! Do try again!').addClass('show').fadeIn('fast');
                      }
                    });
                  },
                  error: function(TestObject, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                  }
            });
        });             
  });
  

  

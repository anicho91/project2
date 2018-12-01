//Create an array of Route Titles
const routes = ["Blue", "Emory Shuttle", "Green", "Midnight Rambler", "NARA TEP", "Red", "T/S Express", "Tech Trolley"];

//Create elements to append the select options to the page
const busesForm = $(".busesForm");

//for Routes
const routeDiv = $("<div>").addClass("form-group").attr("id", "routeTitle");
const routeSelect = $("<select>").addClass("form-control").attr("id", "route-name");

//for stops
const stopDiv = $("<div>").addClass("form-group").attr("id", "stopTitle");
const stopSelect = $("<select>").addClass("form-control").attr("id", "stop-name");

//Prepend the route div to the html page
busesForm.prepend(routeDiv);

//Append the label name to the route div
routeDiv.append('<label for="route-name">Route Name:</label><br>');

//Append the select tag to the route div
routeDiv.append(routeSelect);

//Append the routes array to the div
for (let i = 0; i < routes.length; i++) {
    routeSelect.append(`<option value="${routes[i]}">${routes[i]}</option>`);
}

//Prepend a disabled option to the select tag
routeSelect.prepend('<option value="" selected="selected" disabled="disabled">Select a stingerbus route</option>');

//Append the stop div to the html page
busesForm.append(stopDiv);

//Append the label name to the stop div
stopDiv.append('<br><label for="stop-name">Route Stop:</label><br>');

//Append the select tag to the stop div
stopDiv.append(stopSelect);

//Prepend a  disabled option to the select tag
stopSelect.prepend('<option value="" selected="selected" disabled="disabled">Select a stingerbus stop</option>');

//Append the search button to the page

busesForm.append('<br><button type="submit" class="btn btn-primary" id="search-btn">Submit</button>')

//Make a get request to the API
$.ajax({
    method: "GET",
    url: "https://gtbuses.herokuapp.com/api/v1/agencies/georgia-tech/predictions"
}).then(function (data) {
    



    //Display the stops served by the route chosen
    const displayStops = function () {

        //Hide the result table on route change
        $("#result").addClass("d-none");

        //Grab the route inpute value
        const route = $("#route-name").val();

        //Create stops array
        const stops = [];

        //Push all the stops names to the stops array
        for (let i = 0; i < data.predictions.length; i++) {

            const routeTitle = data.predictions[i].routeTitle;

            if (routeTitle === route) {
                stops.push(data.predictions[i].stopTitle);
            }

            //Empty the stop select options
            $("#stop-name").empty();

            //Create a select button for the stops served by the chosen route 
            for (let i = 0; i < stops.length; i++) {
                stopSelect.append(`<option value="${stops[i]}">${stops[i]}</option>`)
            }

            //Append the route name to the table title
            $("#stingerRoute").text(`${route}`);


            const displayPredictions = function () {

                //Grab the stop input value
                const stop = $("#stop-name").val();

                //Display table on click
                const displayTable = function (e) {
                    e.preventDefault();

                    $("#result").removeClass("d-none");

                    //Create a constante for the prediction div
                    const forecast = $("#predict");

                    //Retrieve the informations from the API
                    const stopTitle = data.predictions[i].stopTitle;

                    if (routeTitle === route && stopTitle === stop) {
                        

                        //if there is a bus prediction
                        const direction = data.predictions[i].direction;

                        if (direction && direction.prediction) {
                            

                            //Grab the direction title
                            const dirTitle = direction.title;

                            //Append the direction Title to the page
                            $("#direction").text(`${dirTitle}`);

                            $("#predict").empty();

                            for (let j = 0; j < direction.prediction.length; j++) {


                                //Grab the predicted time
                                const time = direction.prediction[j].minutes;

                                //Append the time to the table
                                
                                forecast.append(`<tr>
                                                   <td class="num1">${j}</td>
                                                   <td colspan="2" class="num2">${time} minutes</td>
                                                 </tr>`);

                                
                                
                            }
                            forecast.prepend(` <tr>
                                                     <th scope="row" colspan="4" class="text-center">Next Bus Prediction</th>
                                                   </tr>
                                                   <tr>
                                                     <th scope="row">id</th>
                                                     <th colspan="2">Arrives in</th>
                                                   </tr>`);

                        } else {
                            
                        }
                    }
                    
                }
                
                $("#search-btn").on("click", displayTable);
                

            }
            $("#stop-name").change(displayPredictions);
        }

        //Prepend a  disabled option to the select tag
        stopSelect.prepend('<option value="" selected="selected" disabled="disabled">Select a stingerbus stop</option>');
    }
    $("#route-name").change(displayStops);
});


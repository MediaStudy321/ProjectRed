$(async ()=>{
        
    // Loads hero data.
    async function load() {
        try {
            await $.ajax({
                url: 'getpartyheroes',
                type: 'GET',
                success: (data) => {   //Needs Looking At Logs correctly in router but not in party.js code
                    party=data;
                    displayControls();
                }
            });
        }
        catch(e) {
            console.log(e);
            window.alert("I'm sorry, the server is down!");
        }
    }

    function optionString(){
        var stringy="<form action='firstmem' method='POST'><label for='character'>Choose party member 1:</label><select id='character'>"
      
        for(i=0;i<party.length;i++){
        stringy = stringy + "<option value='"+ party[i]+"'>"+party[i]+"</option>"
        }
        stringy = stringy + "</select> <button type='submit'>Select 1</button></form>"
        console.log(stringy)
        return stringy
    }

    function optionString2(){
        var stringy2="<form action='secondmem' method='POST'><label for='character2'>Choose party member 2:</label><select id='character2'>"
      
        for(i=0;i<party.length;i++){
        stringy2 = stringy2 + "<option value='"+ party[i]+"'>"+party[i]+"</option>"
        }
        stringy2 = stringy2 + "</select> <button type='submit'>Select 2</button></form>"
        return stringy2
    }

    function optionString3(){
        var stringy3="<form action='thirdmem' method='POST'><label for='character3'>Choose party member 3:</label><select id='character3'>"
      
        for(i=0;i<party.length;i++){
        stringy3 = stringy3 + "<option value='"+ party[i]+"'>"+party[i]+"</option>"
        }
        stringy3 = stringy3 + "</select> <button type='submit'>Select 3</button></form>"
        return stringy3
    }

    function displayControls(){
        $('#banner').html("Create your party!");//code seems to stop here ???
        $('#controls').html('');
        optionString();
        optionString2();
        optionString3();
        //Rolls
        $('#controls').append(stringy + stringy2 + stringy3 + "<button id='confirm'>Confirm</button>");
        }

	//  Party SET-UP
      
    await load();

})

// To-do
// Fix Ajax
// Pull the three option picked on submit button press
// Check to make sure that no duplicate characters or else alert
// Check to make sure that user selected one character atleast
// Allow for less than three characters
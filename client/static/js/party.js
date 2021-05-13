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
        party=party[0]
        var stringy=""
        for(i=0;i<party.length;i++){
        stringy = stringy + "<option value='"+ party[i]+"'>"+party[i]+"</option>"
        }
        console.log(stringy)
        return stringy
    }

    function displayControls(){
        stringy=optionString();
        //Rolls
        $('#firstmenu').append(stringy);
        $('#secondmenu').append(stringy);
        $('#thirdmenu').append(stringy);
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
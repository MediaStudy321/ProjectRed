$(async ()=>{
        
    // Loads hero data.
    async function load() {
        try {
            await $.ajax({
                url: 'getpartyheroes',
                type: 'GET',
                success: (data) => {   //Needs Looking At Logs correctly in router but not in party.js code
                    party=data;
                    optionList(party);
                }
            });
        }
        catch(e) {
            console.log(e);
            window.alert("I'm sorry, the server is down!");
        }
    }

    //populate three options with every character a player has.
    function optionList(){
    console.log("test");
    $(party).each(function() {
        var x = this;
        $('#partySelect select[name=party-select]').append(
            $('<option/>', {
                value: x.name,
                text: x.name,
                id: x.id
            })
        );
        $('#partySelect2 select[name=party-select2]').append(
            $('<option/>', {
                value: x.name,
                text: x.name,
                id: x.id
            })
        );
        $('#partySelect3 select[name=party-select3]').append(
            $('<option/>', {
                value: x.name,
                text: x.name,
                id: x.id
            })
        );
    });
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
$(async ()=>{
        
    // Loads hero data.
    async function load() {
        displayControls();
    }
    function displayControls(){
        $('#banner').html("Reach into the abyss and claim your champions!");
        $('#controls').html('');

        //Rolls
        $('#controls').append("<button id='abyssRoll'>The Abyss</button>");
        $('#abyssRoll').on('click', ()=>{
                    $.ajax({
                     type: "GET",
                     url: "reward",
                     success: (data) => {
                         $('#banner').html("You rolled " + data.name);
                        }
                    });
            });
        }
	//  Party SET-UP
    await load();

})

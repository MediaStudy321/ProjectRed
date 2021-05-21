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
                        if(data.name){
                            $('#banner').html("You rolled " + data.name);
                         } else{
                            $('#banner').html("You are out of rolls");
                         }
                         
                        }
                    });
            });
        }
	//  Party SET-UP
    await load();

})

$(async ()=>{
        
    // Loads hero data.
    async function load() {
        try {
            await $.ajax({
                url: 'getallheroes',
                type: 'GET',
                success: (data) =>{
                    heroSet=data;
                    displayControls()
                }
            });
        }
        catch(e) {
            console.log(e);
            window.alert("I'm sorry, the server is down!");
        }
    }

    function randomHero() {
		let choice=Math.floor(Math.random()*heroSet.length);
		return heroSet[choice];
      }

    function displayControls(){
        $('#banner').html("Reach into the abyss and claim your champions!");
        $('#controls').html('');

        //Rolls
        $('#controls').append("<button id='abyssRoll'>The Abyss</button>");
        $('#abyssRoll').on('click', ()=>{
            randomHero(heroSet);
            $('#banner').html('You pulled'+ hero);
            $('#controls').append("<button id='confirm'>Confirm</button>");
                $('#confirm').on('click', ()=>{
                    console.log(hero)
                    $.ajax({
                     type: "POST",
                     data: hero,
                     url: "heroPull",
                     success: (data) => {
                         alert(hero + 'was added to your hero pool!')
                        }
                    });
                    displayControls(heroSet);
                });
            });
        }
	//  Party SET-UP
    await load();

})

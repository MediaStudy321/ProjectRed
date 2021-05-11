$(async ()=>{
        
    // Loads hero data.
    async function load() {
        try {
            await $.ajax({
                url: 'getpartyheroes',
                type: 'GET',
                success: (data) => {
                    party=data;
                    partySetup(party);
                }
            });
        }
        catch(e) {
            console.log(e);
            window.alert("I'm sorry, the server is down!");
        }
    }
	//  Party SET-UP
    await load();

})
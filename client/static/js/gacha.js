$(async ()=>{
        
    // Loads hero data.
    async function load() {
        try {
            await $.ajax({
                url: 'getcharacters',
                type: 'GET',
                success: (data) => {
                    characters=data;
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

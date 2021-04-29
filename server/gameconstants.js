const sampleHeroes = {
    FloridaMan: {
        id: 2,
        name: 'Florida Man',
        attack: 20,
        max_hp: 400,
        max_mp: 200,
        speed: .5,
        color: 'yellow',
        img: 'picture of hero',
        type: 'Gemini',
    },
    Ed: {
        id: 1,
        name: 'Ed',
        attack: 30,
        max_hp: 300,
        max_mp: 200,
        speed: 1,
        color: 'white',
        img: 'picture of hero',
        type: 'fire',
    },
    YesMan: {
        id: 3,
        name: 'Yes Man',
        attack: 50,
        max_hp: 200,
        max_mp: 400,
        speed: 2,
        color: 'green',
        img: 'picture of hero',
        type: 'Lutheran',
    },
}

const sampleMonsters = {
    Leeches: {
        id: 41,
        name: 'Leeches',
        attack: 10,
        max_hp: 50,
        max_mp: 0,
        speed: 18,
        icon: '',
        color:'black',
        img: 'picture of villians',
        type: 'poison',
    },
}

module.exports = {sampleHeroes, sampleMonsters}
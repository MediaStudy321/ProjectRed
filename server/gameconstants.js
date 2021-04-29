const heroSet = {
    FloridaMan: {
        id: 2,
        name: 'Florida Man',
        attack: 20,
        max_hp: 400,
        max_mp: 200,
        speed: .5,
        color: 'yellow',
        img: '',
        type: 'Gemini',
    },
    Ed: {
        id: 1,
        name: 'Ed',
        attack: 30,
        max_hp: 300,
        max_mp: 200,
        speed: 10,
        color: 'white',
        img: 'https://i.imgur.com/sEOYWsX.png',
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

const monsterSet = {
    Leeches: {
        id: 41,
        name: 'Leeches',
        attack: 10,
        max_hp: 50,
        max_mp: 0,
        speed: 12,
        icon: '',
        color:'black',
        img: 'https://i.imgur.com/Q06fVmP.png',
        type: 'poison',
    },
}

module.exports = {heroSet, monsterSet}
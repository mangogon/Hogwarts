var facultets=[
    {id:1,
    facultet: 'Gryffindor'},
    {id:2,
    facultet: 'Hufflepuff'},
    {id:3,
    facultet: 'Ravenclaw'},
    {id:4,
    facultet: 'Slytherin'},
    {id:5,
    facultet: 'Sorry, but you are a muggle :D'},
];

function choosingHat() {
    return facultets[parseInt(Math.random() * 5)].facultet;
};





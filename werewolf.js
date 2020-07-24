let names = [];
let villagers = [];
let werewolfs = [];
let seers = [];
let doctors = [];

function generate() {
    let namesInput = document.getElementById("player-names").value;
    names = namesInput.split("\n");
    villagers = [...names];

    werewolfs = [];
    seers = [];
    doctors = [];
    
    const numWerewolfs = 1;
    const numDoctors = 1;
    const numSeers = 1;

    for (var i = 0; i < numWerewolfs; i++)
    {
        let index = Math.floor(Math.random() * villagers.length);
        let selection = villagers.splice(index, 1)[0];
        werewolfs.push(selection);
    }

    for (var i = 0; i < numDoctors; i++)
    {
        let index = Math.floor(Math.random() * villagers.length);
        let selection = villagers.splice(index, 1)[0];
        doctors.push(selection);
    }

    for (var i = 0; i < numSeers; i++)
    {
        let index = Math.floor(Math.random() * villagers.length);
        let selection = villagers.splice(index, 1)[0];
        seers.push(selection);
    }
    
    names.forEach(name => {
        var type = 'villager';
        if (werewolfs.includes(name))
            type = 'werewolf';
        else if (seers.includes(name))
            type = 'seer';
        else if (doctors.includes(name))
            type = 'doctor';
        
        addPlayer(name, type);
    })
}

function addPlayer(name, type) {
    let gameContainer = document.getElementById("game");
    let playerContainer = document.createElement("div");
    playerContainer.classList.add("player");
    playerContainer.innerHTML = '<img src="images/' + type + '.svg" /><h5>' + name + '</h5>';
    gameContainer.appendChild(playerContainer);

    playerContainer.addEventListener("click", event => {
        if (playerContainer.classList.contains("dead"))
            playerContainer.classList.remove("dead");
        else
            playerContainer.classList.add("dead");
    });
}

window.onload = function() {
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", generate);
}
let names = [];
let villagers = [];
let werewolfs = [];
let seers = [];
let doctors = [];
let hunters = [];

function generate() {
    let namesInput = document.getElementById("player-names").value;
    names = namesInput.split("\n");
    villagers = [...names];

    console.log(villagers.length);
    if (namesInput.length == 0)
    {
        throwError("No names on list!");
        return;
    }
    
    const numWerewolfs = document.getElementById("werewolfCount").value;
    const numDoctors = document.getElementById("doctorCount").value;
    const numSeers = document.getElementById("seerCount").value;
    const numHunters = document.getElementById("hunterCount").value;

    if (numWerewolfs < 1)
    {
        throwError("You need at least 1 werewolf!");
        return;
    }

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

    for (var i = 0; i < numHunters; i++)
    {
        let index = Math.floor(Math.random() * villagers.length);
        let selection = villagers.splice(index, 1)[0];
        hunters.push(selection);
    }
    
    names.forEach(name => {
        var type = 'villager';
        if (werewolfs.includes(name))
            type = 'werewolf';
        else if (seers.includes(name))
            type = 'seer';
        else if (doctors.includes(name))
            type = 'doctor';
        else if (hunters.includes(name))
            type = 'hunter';
        
        addPlayer(name, type);
    });

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
}

function throwError(error) {
    document.getElementById("error").innerText = error;
}

function addPlayer(name, type) {
    let gameContainer = document.getElementById("players");
    let playerContainer = document.createElement("div");
    playerContainer.classList.add("player");
    playerContainer.innerHTML = '<img src="images/' + type + '.svg" alt="' + type + '" title="' + type + '" /><h5>' + name + '</h5><span class="skull"></span>';
    gameContainer.appendChild(playerContainer);

    playerContainer.addEventListener("click", event => {
        if (playerContainer.classList.contains("dead"))
            playerContainer.classList.remove("dead");
        else
            playerContainer.classList.add("dead");
    });
}

function endGame() {
    werewolfs = [];
    seers = [];
    doctors = [];
    villagers = [];
    hunters = [];

    document.getElementById("players").innerHTML = "";
    document.getElementById("setup").style.display = "grid";
    document.getElementById("game").style.display = "none";
}

window.onload = function() {
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", generate);
    var endButton = document.getElementById("end");
    endButton.addEventListener("click", endGame);
}
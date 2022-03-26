let pokemonData;
let pokemonInputField = document.getElementById("pkmn-input-field");
let pokemonNameElm = document.getElementById("pkmn-name");
let pokemonImgElm = document.getElementById("pkmn-img");
let pokemonTypeElm = document.getElementById("pkmn-type-text");
let selectedSprites = ["default", "default", "not-shiny"] //front, gender, shiny
const spriteRotation = ["back", "front"]
const spriteGender = ["default", "female"]
let spriteShiny = false;
let pokemonSprites;
let pokemonNumber;
let stat_area = document.getElementById("stats-area");
let moves_area = document.getElementById("moves-area");
//let pokemonTabIcon = document.getElementById("pkmn-tab-icon");

function changeShiny() {
    if (selectedSprites[2] == "not-shiny") {
        selectedSprites[2] == "shiny";
        displaySprite()

    }
}

function changeGender(gender) {
    selectedSprites[1] = gender
    
}

function selectSprite() {
    var string = selectedSprites[0] //back or front
    if (selectedSprites[1] != "") {
        string += "_"  + selectedSprites[1] //if male we're done, if female we need to specify
    }
    if (selected_Sprites[2] == "female") {
        string += "_" + selectedSprites[2]
    }
}

function generateSpriteURLArray(spritesObject) {
    spritesObject.forEach(() => {
        
    });
}

function changeSprite(direction) {

}

const getPkmnText = () => {
    return pokemonInputField.value;
}

const displaySprite = (spriteURL) => {
    //pokemonTabIcon.href=spriteURL;
    pokemonImgElm.src = spriteURL;

}

const fetchPokemon = (pkmnName) => {
    let url; 
    if (typeof(pkmnName) == "string") {
        url = 'https://pokeapi.co/api/v2/pokemon/'+pkmnName.toLowerCase(); //You could also use backticks and ${} 
    } else if(Number.isInteger(pkmnName)) {
        url = 'https://pokeapi.co/api/v2/pokemon/'+ Math.abs(pkmnName) //You could also use backticks and ${} 
    } else {
        return
    }
    fetch(url).then((res) => {
        if (res.status != "200") {
            //console.log(res);
            displaySprite("https://i.pinimg.com/736x/f0/47/8e/f0478e1b4c0705c316d9612f705cdab7.jpg")
        } else {
            return res.json();
        }
    }).then((data) => {
        pokemonData = data
        //STEP 1: Save the SPRITES to a list of selected
        pokemonSprites = data.sprites;
        //STEP 2: Save the SELECTED GENDER
        //STEP 3: Set the Sprite to the default sprite, selected gender
        //STEP 4: Set the Buttons for sprite changes
        setPrevNextArrowNumbers(pokemonData.id);
        //STEP 5: Save the current number, and set the buttons for next/previous (n-1), (n+1) unless n=0 or n=last_pkmn
        //STEP 6: Send the stats to a function that will display all of them.
        //STEP 7: Set the Name
        //STEP 8: Set the moves in a for loop
        //STEP 9: Set the Type
        
        displaySprite(pokemonData.sprites.front_default);
        displayStats(pokemonData.stats);
        displayMoves(pokemonData.moves);
        displayTypes(pokemonData.types);
        pokemonNameElm.innerHTML = pokemonData.name;
        pokemonInputField.value = pokemonData.name;
        
        
    })
}

function setPrevNextArrowNumbers(pokemonNumber) {
    if (pokemonNumber == 898) {
        document.getElementById("sel-prev-pkmn").setAttribute("onclick", "fetchPokemon("+(pokemonNumber-1)+")") 
        document.getElementById("sel-next-pkmn").setAttribute("onclick", "fetchPokemon(1)") 
    } else if (pokemonNumber == 1) {
        document.getElementById("sel-prev-pkmn").setAttribute("onclick", "fetchPokemon(898)") 
        document.getElementById("sel-next-pkmn").setAttribute("onclick", "fetchPokemon("+(pokemonNumber+1)+")") 
    } else {
        document.getElementById("sel-prev-pkmn").setAttribute("onclick", "fetchPokemon("+(pokemonNumber-1)+")") 
        document.getElementById("sel-next-pkmn").setAttribute("onclick", "fetchPokemon("+(pokemonNumber+1)+")") 
    }
}

function displayTypes(types_list) {
    pokemonTypeElm.innerHTML = "";
    var multitypeFlag = false;
    if (types_list.length > 1) {
        multitypeFlag = true;
    }
    types_list.forEach((object, index) => {
        pokemonTypeElm.innerHTML += object.type.name
        if (index == 0 && multitypeFlag == true) {
            pokemonTypeElm.innerHTML += " / ";
        }
    });
    pokemonTypeElm.innerHTML += "</p>";
}

function changeGenderSprites(genderText) {

}

function displayStats(stats_list) {
    stat_area.innerHTML = "";
    stats_list.forEach( (object) => {
        stat_area.innerHTML += `
        <div class="stat-box">
            <div class="sb-title">
                <p>`+object.stat.name+`</p>
            </div>
            <div class="sb-number">
                <p>`+object.base_stat+`</p>
            </div>
        </div>
        `;
    });
}

function displayMoves(moves_list) {
    moves_area.innerHTML = "";
    moves_list.forEach( (object) => {
        moves_area.innerHTML += `
        <div class="move-box">
            <h3>`+object.move.name+`</h3>
        </div>`;
    });
}

function displayPokemon(pokeData) {

    let pokeFront = pokemonData.sprites.front_default;
    displaySprite(pokeFront);
}

function changeBackground(backgroundKey) {
    
}

const pokemonBackgrounds = {
    "ocean": "https://cutewallpaper.org/21/pokemon-showdown-backgrounds/Index-of-spritesgen6bgs.png",
    "cave": "http://i.imgur.com/JXS6ps2.png",
    "forest": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK7KXFKUj5PBffgip6e74M0e4ZipdRV8rzUXtufrOQ7SjIum2mUUanN6ELU0H0WC9yVvQ&usqp=CAU",
    "open-field": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d83m36e-3b58ca48-fe8a-456e-9ffc-a5a84eca6613.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDgzbTM2ZS0zYjU4Y2E0OC1mZThhLTQ1NmUtOWZmYy1hNWE4NGVjYTY2MTMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.jOpoPaOypPatcb4k7flznTP9YiwUEX2q2BKoeWUPU74",
    "city": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d8b0izs-815cbb3b-ca66-42dc-b5a2-0607c6d10ab0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDhiMGl6cy04MTVjYmIzYi1jYTY2LTQyZGMtYjVhMi0wNjA3YzZkMTBhYjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YIm772BPO4jonA5ZHprjVaDL1Zlga7V0uv5rcbH-czY",
    "lab": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d84cezp-8bcdf5f7-f3e3-4b15-8c2f-3263fd2a1f02.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDg0Y2V6cC04YmNkZjVmNy1mM2UzLTRiMTUtOGMyZi0zMjYzZmQyYTFmMDIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.tGaD1VsQ8t7Mu5nPcg_YdRoBoF8Gj7dnK_DPkZlOJeA",
    "galaxy": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d83th12-efc3afd1-2ea6-43dd-a4aa-0ce6fba311f6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDgzdGgxMi1lZmMzYWZkMS0yZWE2LTQzZGQtYTRhYS0wY2U2ZmJhMzExZjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5IqcIuqVP5f9WQEQoc3ZGTDYrhV28dQLhzzspOcqhpU",
    "virtual": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d841b5t-d14186ca-887a-4f10-b4ca-b16d5aaff49a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDg0MWI1dC1kMTQxODZjYS04ODdhLTRmMTAtYjRjYS1iMTZkNWFhZmY0OWEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5Pv6KPt53igISARqXxlqkRR4qtwKEB3LhHLyc1OQ9Wo",
    "desert": "http://i.imgur.com/LuS9rAU.png",
    "greytiles": "https://i.imgur.com/2uPDR0X.png",
    "room": "http://i.imgur.com/aZFYJT3.png"
};

//More at:https://pastebin.com/nkPFr8i1
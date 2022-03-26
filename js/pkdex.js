let pokemonData;
let pokemonInputField = document.getElementById("pkmn-input-field");
let pokemonNameElm = document.getElementById("pkmn-name");
let pokemonImgElm = document.getElementById("pkmn-img");
let pokemonTypeElm = document.getElementById("pkmn-type-text");
let pokemonSprites;
let pokemonNumber;
let stat_area = document.getElementById("stats-area");
let moves_area = document.getElementById("moves-area");
//let pokemonTabIcon = document.getElementById("pkmn-tab-icon");

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
        url = 'https://pokeapi.co/api/v2/pokemon/'+ pkmnName.toLowerCase(); //You could also use backticks and ${} 
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
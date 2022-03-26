const fetchPokemonExplanation = () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/chikorita';
    fetch(url).then((res) => {
        return res.json(); //La respuesta, en un Objeto.
    }).then((data) => {
        console.log(data); //La data de la respuesta, ya que se pasó a json
        let pokeImg = data.sprites;
        console.log(pokeImg); //Esto imprime un objeto; todavía en este tiene más atributos.
        let pokeImgFront = data.sprites.front_default;
        console.log(pokeImgFront);
    }); //función que hace consulta al API
    //Pregunta al servidor el resultado de la consulta por GET en este caso
    //Recibes una Promise
    //Programación Asíncrona
    //Un hilo aparte esperando una respuesta que eventualmente va a llegar.
    //Stack de Programación, tiene diferentes niveles
    //Si llega algo asíncrono, en lugar de síncrono,
    //Queda en otro Stack (¿?)
    //Tiene que esperar a que el Servidor conteste

    //La promesa es con .then
    //Creamos una función dentro de esa respuesta 
    //Pondrás el resultado en "res", y creamos una función flecha que sólo convierte esa respuesta a json.
}

//DOM - Document Object Model
//Identificar las cosas que tenemos en la página de HTML para entonces enviarle datos y colocarlos.
//O para llamar funciones en HTML.
let tablero;
let player1 = new Player(1,'','X');
let player2 = new Player(2,'','O');

function seleccionarCasilla(id,p,t){
    /*---------- REFACTOR --------------*/
    /*
        - Para seleccionar la casilla primero la tengo que obtener con el id
        - Get posicion
        - Verificar que esté disponible
        - Si está disponible
        - Alterar el objeto, de la posición indicada con aviable: false y player
        - Crear una nueva modificacion y pushearla al array de modificaciones
        - Setear el siguiente player en el tablero
        - Ver si el player que modifica el tablero ganó o el juego terminó 
    */

   let selectedBox = t.getposition(id);
   if(selectedBox && selectedBox.aviable && !t.getEnded()){
    t.setposition(id,p);
    t.setModification(id,p)
    t.turno = player1.symbol === t.turno ? player2.symbol : player1.symbol;  
    checkWinner(p,t);
    if(t.getWinner()){
        // Disable all positions tanto del back como del front
        console.log('GANO')
        $(`#modal-winner`).attr('class', 'winner-modal').show();
        $(`#winner`).attr('class', `player-winner-${p.symbol}`);
        $(`.player-winner-${p.symbol}`).text(`${p.namePlayer.toUpperCase()}\n WINS`)
    }
    $(`#box-${id}`).attr('disabled', true);
    $(`#box-${id}`).attr('class', `box-${p && p.symbol ? p.symbol : p}`);
    $(`#box-${id}`).text(`${p && p.symbol ? p.symbol : p}`);
    // 
   }else{
   console.log('Error no se puede seleccionar la casilla')

   }
    /*----------------------------------*/
}

function checkWinner(p,t){
    let  positions = tablero.getposition();
    // console.log('positions => ',positions)
    Tablero.winnerRaws.forEach((raw)=>{
        let aciertos= 0;
        raw.forEach((wr)=>{
            // console.log('p.symbol => ',p.symbol)
            // console.log('positions[wr.raw][wr.colum] => ',positions[wr.raw][wr.colum])
            aciertos = p.symbol === positions[wr.raw][wr.colum].player ? aciertos+1 : aciertos;
        })
        if(aciertos === 3){
            $(`.box`).attr('disabled', true);
            t.setWinner(p);
            t.setEnded();
        }
    })
}


function generarTablero(p){
    const posiciones = [[],[],[]]
    $("#tableContainer").empty();
    $("#winner").attr('class', 'player-winner').empty();
    let table = "<table class='table'>";
    for(let x=0; x<=2; x++){
        table +=`<tr id='columnId${x}'>`
        for(let y=0;y <=2;y++){
        table +=`<td id='rawId${y}'> <button id= "box-${x}${y}" class="box">  </button></td>` 
        /*A cada posición del tablero le asigno un id y un estado para luego hacer comprobaciones en el back*/
        posiciones[x].push(
            {
                id:`${x}${y}`,
                player:'',
                aviable: true
            }
        );
        }
        table +="</tr>" 
    }
    table += "</table>";
    $("#tableContainer").append(table)
    return new Tablero(posiciones,p.symbol);

}


function addEventListenerBox(){
    $(".box").click(function () {
        // console.log('ENTRAMOS AL LISSENER DEL BOX')
        let id = $(this).attr("id").split("-")[1];
        let player = tablero.turno === player1.symbol ? player1 : player2;
        seleccionarCasilla(id,player,tablero);
        /*FUNCTION PARA CHEKEAR TODAS LAS CASILLAS*/
    });
}

function addEventListenerForm(){
    $("#start").click(function (){
        $("#modal-player").attr('class', 'form-player').hide();
        // TODO: TENGO QUE SETEAR LOS NOMBRES DE LOS PLAYERS:
        player1.setplayerName($(".player-1").val());   
        player2.setplayerName($(".player-2").val());   
        let player = Math.random() > 0.5 ? player1 : player2 // TODO: TENGO QUE ELEGIR AL AZAR QUE PLAYER CREADO EMPIEZA
        tablero = generarTablero(player);
        addEventListenerBox(player);
    })
}

function addEventListenerTablero(){
/*------------------ACCIONES DEL BOTÓN VERDE------------------*/
    $("#newGame").click(function () {
        player1.resetScore();   
        player2.resetScore();  
            // Si tengo una tabla la cierro
        $("#tableContainer").empty();

            // Si tengo el modal del winner lo cierro
        $(`#modal-winner`).attr('class', 'winner-modal').hide();

            // Muestro el modal del form para el nuevo juego
        $("#modal-player").attr('class', 'form-player').show();

        $(`#player`).attr('class', `form-player-newgame`);
    });
}

function addEventListenerCloseButton(){
        $(".close-modal").click(function () {
            $("#modal-player").attr('class', 'form-player').hide();
        });
}

function addEventListenerAgainButton(){
    $(".winner-button").click(function () {
        //TODO: Guardar en el storage todo, players y tablero
        $(`#modal-winner`).attr('class', 'winner-modal').hide();
        tablero = generarTablero(player);
        addEventListenerBox(player);

    })
}
addEventListenerAgainButton();
addEventListenerCloseButton();
addEventListenerForm();
addEventListenerTablero();


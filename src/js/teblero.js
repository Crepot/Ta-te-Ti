
function generarTablero(){
    $("#tableContainer").empty();
    $("#winner").attr('class', 'player-winner').empty();
    // $("#winner").attr('class', 'player-winner');
    let table = "<table class='table'>";
    let z=1
    for(let x=1; x<=3; x++){
        table +=`<tr id='columnId${x}'>`
        for(let y=1;y <=3;y++){
        table +=`<td id='rawId${y}'> <button id= "box-${y}${x}" class="box">  </button></td>` 
        z++;
        }
        table +="</tr>" 
    }
    table += "</table>";
    $("#tableContainer").append(table)
}


function addEventListenerBox(player){
    $(".box").click(function () {
        // console.log('ENTRAMOS AL LISSENER DEL BOX')
        let id = $(this).attr("id").split("-")[1];
        player = seleccionarCasilla(id,player);
        /*FUNCTION PARA CHEKEAR TODAS LAS CASILLAS*/
    });
}

function addEventListenerTablero(){
    // console.log('ENTRA')
    $("#newGame").click(function () {
        generarTablero();
        let player = Math.random() > 0.5 ? 'X' :'O'
        addEventListenerBox(player);
    });
}

addEventListenerTablero();
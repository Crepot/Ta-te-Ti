//#6495ED
//#708090
const winnerRaws = [
     [11,12,13],
     [21,22,23],
     [31,32,33],
     [11,21,31],
     [12,22,32],
     [13,23,33],
     [11,22,33],
     [13,22,31],
 ]
 
 function seleccionarCasilla(id,p){
    $(`#box-${id}`).attr('disabled', true);
    $(`#box-${id}`).attr('class', `box-${p}`);
    $(`#box-${id}`).text(`${p}`);


    return nextPlayer(p)
}

function checkWinner(p){
    winnerRaws.forEach((raw)=>{
        let aciertos= 0;
        raw.forEach((id)=>{
            aciertos = p === $(`#box-${id}`).text()? aciertos+1:aciertos;
        })
        if(aciertos === 3){
            $(`.box`).attr('disabled', true);
            $(`.box`).attr('style.opacity', 1);
            // document.getElementsByClassName("box").style.opacity = "0.5";
            $(`#winner`).attr('class', `player-winner-${p}`);
            $(`.player-winner-${p}`).text(`${p} WINS`)
            /*TODO: ACÁ TENGO QUE MOSTRAR BIEN BONITO EL GANADOR*/
            return true;
        }
        return false;
    })
}

function nextPlayer(p){
    // Muestro un mensajito para que el proximo jugador marque la casilla
    if(checkWinner(p)){
        alert(`GANADOR: ${p}`);
        console.log('gano')
    }
    return p === 'X' ? 'O' : 'X'
    // console.log('player => ',player,'p => ',p)

}
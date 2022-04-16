// TODO: Crear la clase tablero
class Tablero{
    constructor(posiciones,turno){
        this.posiciones = posiciones;
        this.turno = turno;
        this.inicio= Date.now();
        this.modification = [];
        this.winner = undefined;
        this.isEnded = false;
    };

    static winnerRaws = [
        [{raw:'0', colum:'0'},{raw:'0', colum:'1'},{raw:'0', colum:'2'}], // Pirmera fila
        [{raw:'1', colum:'0'},{raw:'1', colum:'1'},{raw:'1', colum:'2'}], // Segunda fila
        [{raw:'2', colum:'0'},{raw:'2', colum:'1'},{raw:'2', colum:'2'}], // Tercera fila
        [{raw:'0', colum:'0'},{raw:'1', colum:'0'},{raw:'2', colum:'0'}], // Primera columna
        [{raw:'0', colum:'1'},{raw:'1', colum:'1'},{raw:'2', colum:'1'}], // Segunda columna
        [{raw:'0', colum:'2'},{raw:'1', colum:'2'},{raw:'2', colum:'2'}], // Tercera columna
        [{raw:'0', colum:'0'},{raw:'1', colum:'1'},{raw:'2', colum:'2'}], // Diagonal derecha
        [{raw:'0', colum:'2'},{raw:'1', colum:'1'},{raw:'2', colum:'0'}], // Diagonal izquierda
    ];

    getposition(boxId){
        // Se obtiene una posicion del tablero
        let raw = boxId ? boxId.split('')[0] : undefined;
        let colum = boxId ? boxId.split('')[1] : undefined;
        return raw && colum ? this.posiciones[raw][colum] : this.posiciones;
    };

    setposition(boxId, player){
        // Marca la posicion elejida por el jugador
        /* Tendría que mapear el objeto entero de posiciones y */
        let raw = boxId.split('')[0]
        let colum = boxId.split('')[1]
        this.posiciones[raw][colum].player = player.symbol;
        this.posiciones[raw][colum].aviable = false;
    };

    setState(){
        //TODO: Estado Finalizado o no

    };

    setModification(boxId,player){
        //TODO: Acá meto un objeto con timestamp, la posicion y el player que modificó
        // TODO: COMPROBAR QUE EL ARRAY NO SEA MAYOR A LAS POSICIONES
        let modificacion = {
            timestampMod: Date.now(),
            player:player.playerId,
            namePlayer:player.namePlayer,
            potition:boxId,
        }
        this.modification.push(modificacion)

    };

    getModification(){
        //TODO: Me devuelve todas las modificaciones realizadas en el juego
        return this.modification;
    };

    setWinner(player){
        this.winner =  
        {
            player:player.symbol,
            playerId:player.playerId
        };
        player.setScore(20);
    };

    getWinner(){
        return this.winner;
    };

    setEnded(){
        this.posiciones.forEach(p => {
            p.forEach((r) => {
                r.aviable = false;
            })            
        });
        this.isEnded = true
    };

    getEnded(){
        return this.isEnded;
    };

}



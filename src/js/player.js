class Player{
    constructor(playerId,namePlayer,symbol){
        this.playerId = playerId;
        this.namePlayer = namePlayer;
        this.symbol= symbol;
        this.score = 0;
    };

    setplayerName(namePlayer){
        this.namePlayer = namePlayer;
    }

    getplayerName(){
        return this.namePlayer;
    }

    setplayerSymbol(symbol){
        this.symbol = symbol;
    }

    getplayerSymbol(){
        return this.symbol;
    }
    getplayerId(){
        return this.playerId;
    }

    setScore(score) {
        this.score += score;
    }
    
    resetScore(){
        this.score = 0;
    }

    getScore(){
        return this.score;
    }

}
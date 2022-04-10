class player{
    constructor(namePlayer,symbol){
        this.namePlayer =namePlayer;
        this.symbol=symbol;
        let score = 0;

    };


    setScore(score) {
        console.log('setScore:',score)
    }

    getScore(){
        console.log('getScore:',score)
    }
}
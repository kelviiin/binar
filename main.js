class Player{
    constructor(props){
        let{rock,paper,scissor}=props;
        this.rock = rock;
        this.paper = paper;
        this.scissor = scissor;
    }

    getHand(player){
        player.forEach(element => {
            element.addEventListener('click',function(){
                console.log(element.id,"element");
                if(playerClick == false){
                    element.style.background = ' #C4C4C4';
                    element.style.border = 'solid 1px white';
                    element.style.borderRadius = '10px';
                    playerClick = true;
                    computerStart(element.id);
                }
            })
        });
    }
}

class Computer extends Player{
    constructor(props){
        super({...props});
        this.computerMove = ['rock','paper','scissor'];
    }

    getHand(){
        const computerCalculation = Math.floor(Math.random()*3);
        const computerChoice = this.computerMove[computerCalculation];
        return computerChoice;
    }
}

const Match = (Base) =>
    class extends Base  {
        constructor(props){
            super(props);
        }
}

class Result extends Match(Computer){
    playerChoice;
    computerChoice;
    constructor(props){
        super(props);
        this.playerChoice = props.playerChoice;
        this.computerChoice = props.computerChoice;
    }
    getResult(player,com){
        if(player === com){
            console.log("DRAW");
            winStatusStyle('DRAW','#035B0C');
        }
        else if(player == 'rock'){
            if(com == 'paper'){
                console.log("COM WIN");
                winStatusStyle('COM WIN','#4C9654');
            }else{
                console.log("PLAYER WIN");
                winStatusStyle('PLAYER 1 WIN','#4C9654');
            }
        }else if(player == 'paper'){
            if(com == 'scissor'){
                console.log("COM WIN");
                winStatusStyle('COM WIN','#4C9654');
    
            }else{
                console.log("PLAYER WIN");
                winStatusStyle('PLAYER 1 WIN','#4C9654');
            }
        }else if(player == 'scissor'){
            if(com == 'rock'){
                console.log("COM WIN");        
                winStatusStyle('COM WIN','#4C9654');
    
            }else{
                console.log("PLAYER WIN");
                winStatusStyle('PLAYER 1 WIN','#4C9654');
            }
        }
    }
}

clickPlay = () => {
    console.log("masuk");
    document.location.href="play.html";
}
clickBack = () => {
    document.location.href="index.html";
}

const player_1 = new Player({
    rock:document.querySelector('.rock-player'),
    paper:document.querySelector('.paper-player'),
    scissor:document.querySelector('.scissor-player')
})
const computer_1 = new Computer({
    rock:'rock',
    paper:'paper',
    scissor:'scissor'
});

const player = [player_1.rock,player_1.paper,player_1.scissor];
const reload = document.querySelector('.refresh');
const winStatus = document.querySelector('.vs');
let playerClick = false;
winStatus.innerText = " V S ";
console.log(winStatus,"status")
player_1.getHand(player);



function compStyle(choice){
    choice.style.background = ' #C4C4C4';
    choice.style.border = 'solid 1px white';
    choice.style.borderRadius = '10px';
}


//Computer make choice
function computerStart(playerChoice){
    const computerChoice = computer_1.getHand();
    console.log(computer_1,"ini computer");
    if(computerChoice == 'rock'){
        const rockCom = document.querySelector('.rock-com');
        compStyle(rockCom);
    }else if(computerChoice == 'paper'){
        const paperCom = document.querySelector('.paper-com');
        compStyle(paperCom);
    }else if(computerChoice == 'scissor'){
        const scissorCom = document.querySelector('.scissor-com');
        compStyle(scissorCom);
    }
    const winningCalc = new Result({
        playerChoice:playerChoice,
        computerChoice:computerChoice
    });
    console.log(winningCalc,"GET RESULT");
    winningCalc.getResult(winningCalc.playerChoice,winningCalc.computerChoice);
    }

function winStatusStyle(innerText,background){
        winStatus.innerText = innerText;
        winStatus.style.width = '24vh';
        winStatus.style.height = '14vh';
        winStatus.style.background = background;
        winStatus.style.borderRadius = '10px';
        winStatus.style.transform = 'rotate(-28.87deg)';
        winStatus.style.color = '#FFFFFF';
        winStatus.style.fontFamily= 'Open Sans';
        winStatus.style.fontStyle= 'normal';
        winStatus.style.fontWeight= '700';
        winStatus.style.fontSize = '4vh';
}

console.log("reload...");
reload.addEventListener('click',function(){
    window.location.reload();
})

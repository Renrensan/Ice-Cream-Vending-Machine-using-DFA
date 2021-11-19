const vendingDFA = {
    q0:{
        5000 : "q1",
        10000 : "q2",
        20000 : 'q4',
        Vanilla : 'q0',
        Strawberry:'q0',
        Chocolate :'q0',
        Orange: 'q0',
        Banana: 'q0'
    },
    q1:{
        5000 : "q2",
        10000 : "q3",
        20000 : 'q5',
        Vanilla : 'q0',
        Strawberry:'q1',
        Chocolate :'q1',
        Orange: 'q1',
        Banana: 'q1'
    },
    q2:{
        5000 : "q3",
        10000 : "q4",
        20000 : 'q6',
        Vanilla : 'q1',
        Strawberry : 'q1',
        Chocolate :'q1',
        Orange: 'q1',
        Banana: 'q1'
    },
    q3:{
        5000 : "q4",
        10000 : "q5",
        20000 : 'q7',
        Vanilla : 'q2',
        Strawberry : 'q1',
        Chocolate :'q1',
        Orange: 'q1',
        Banana: 'q1'
    },
    q4:{
        5000 : "q5",
        10000 : "q6",
        20000 : 'q8',
        Vanilla : 'q3',
        Strawberry : 'q2',
        Chocolate :'q2',
        Orange: 'q2',
        Banana: 'q2'

    },
    q5:{
        5000 : "q6",
        10000 : "q6",
        20000 : 'q9',
        Vanilla : 'q4',
        Strawberry : 'q3',
        Chocolate :'q3',
        Orange: 'q3',
        Banana: 'q3'
    },
    q6:{
        5000 : "q7",
        10000 : "q8",
        20000 : 'q10',
        Vanilla : 'q5',
        Strawberry : 'q4',
        Chocolate :'q4',
        Orange: 'q4',
        Banana: 'q4'
    },
    q7:{
        5000 : "q8",
        10000 : "q9",
        Vanilla : 'q6',
        Strawberry : 'q5',
        Chocolate :'q5',
        Orange: 'q5',
        Banana: 'q5'
    },
    q8:{
        5000 : "q9",
        10000 : "q10",
        20000 :"Reject",
        Vanilla : 'q7',
        Strawberry : 'q6',
        Chocolate :'q6',
        Orange: 'q6',
        Banana: 'q6'
    },
    q9:{
        5000 : "q10",
        10000 : 'Reject',
        20000 : 'Reject',
        Vanilla : 'q8',
        Strawberry : 'q7',
        Chocolate :'q7',
        Orange: 'q7',
        Banana: 'q7'
    },
    q10:{
        5000 : "Reject",
        10000 : 'Reject',
        20000 : 'Reject',
        Vanilla : 'q9',
        Strawberry : 'q8',
        Chocolate :'q8',
        Orange: 'q8',
        Banana: 'q8'
    },
    startState : 'q0'
}
const toppings = ['Vanilla', 'Strawberry','Chocolate','Orange','Banana'];
let currentState = vendingDFA.startState;
let numOfToppings = 0;
let totalMoney = 0;

function getNextState(state, input){
    let formerState = currentState;
    let error = 'Rejected, Max Money is 50000';
    currentState =  vendingDFA[state][input];
    if(currentState == "Reject"){
        currentState = formerState;
        alert(error);
        return;
    }
    if(input === 5000 || input === 10000 || input === 20000){
        totalMoney+=input;
        // if limit reached cannot input more money
    }
    
    // Show Output in Screen if Valid
    if(nextStateCheck(currentState,formerState)){
        if(input == toppings[0]){
            showBoughtToppings(0)
            numOfToppings++;
            totalMoney -= 5000;
        }
        for(index = 1 ; index<=toppings.length ; index++){
            if(input == toppings[index]){
                showBoughtToppings(index)
                numOfToppings++;
                totalMoney -= 10000;
            }
        }

    }
    console.log(currentState);
    console.log(totalMoney);
}

function nextStateCheck(currentState,formerState){
    let isNextState= false;
    if(currentState!=formerState){
        isNextState = true;
    }
    return isNextState;
}

function handleInput(amount){
    let input = amount;
    getNextState(currentState,input)
    removeCurrentMoney();
    showCurrentMoney();

}

function showBoughtToppings(index){
    let container = document.getElementById('output-container');
    let innerContainer = document.createElement('div');
    innerContainer.className = 'container';
    innerContainer.id = "outputs"
    let output = document.createElement('p');
    output.className = 'text-bold text-white'
    output.innerHTML = toppings[index];
    container.appendChild(innerContainer);
    innerContainer.appendChild(output);
}

function showCurrentMoney(){
    let container = document.getElementById('current-money');
    let currentMoney = document.createElement('p');
    currentMoney.className = 'text-white';
    currentMoney.id = 'money';
    currentMoney.innerHTML = totalMoney;
    container.appendChild(currentMoney);
}
function removeCurrentMoney(){
    let toDelete = document.getElementById('money');
    toDelete.remove();
}

function takeOutToppings(){
    while(numOfToppings>0){
        let currentOutput = document.getElementById('outputs');
        currentOutput.remove();
        numOfToppings--;
    }
}
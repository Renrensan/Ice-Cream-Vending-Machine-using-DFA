const vendingDFA = {
    q0:{
        5000 : "q1",
        10000 : "q2",
        Vanilla : 'q0',
        Strawberry:'q0'
    },
    q1:{
        5000 : "q2",
        10000 : "q3",
        Vanilla : 'q0',
        Strawberry:'q1'
    },
    q2:{
        5000 : "q3",
        10000 : "q4",
        Vanilla : 'q1',
        Strawberry : 'q0'
    },
    q3:{
        5000 : "q4",
        10000 : "q5",
        Vanilla : 'q2',
        Strawberry : 'q1'
    },
    q4:{
        5000 : "q5",
        10000 : "q6",
        Vanilla : 'q3',
        Strawberry : 'q2'

    },
    q5:{
        5000 : "q6",
        10000 : "q6",
        Vanilla : 'q4',
        Strawberry : 'q3'
    },
    q6:{
        5000 : "q6",
        10000 : "q6",
        Vanilla : 'q5',
        Strawberry : 'q4'
    },
    startState : 'q0'
}
const toppings = ['Vanilla', 'Strawberry'];
currentState = vendingDFA.startState;
let numOfToppings = 0;
const maxMoneyLimit =  30000;
let totalMoney = 0;

function getNextState(state, input){
    let formerState = currentState;
    currentState =  vendingDFA[state][input];

    // Show Output in Screen if Valid
    if(nextStateCheck(currentState,formerState)){
        if(input == toppings[0]){
            showBoughtToppings(0)
            numOfToppings++;
            totalMoney -= 5000;
        }else if(input == toppings[1]){
            showBoughtToppings(1)
            numOfToppings++;
            totalMoney -= 10000;
        }
    };
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
    let error = 'Rejected, Max Money Limit Reached'
    if(input === 5000 || input === 10000 && totalMoney<maxMoneyLimit){
        totalMoney+=amount;
        // if limit reached cannot input more money
        if(totalMoney>maxMoneyLimit){
            totalMoney -= amount;
            console.log(error);
            return;
        }
    }
    getNextState(currentState,input)
    removeCurrentMoney();
    showCurrentMoney();
    console.log(currentState);
    console.log(totalMoney);
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
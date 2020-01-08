const readline = require("readline");
let rl = readline.createInterface(process.stdin, process.stdout);

function getComputerNumber(){
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let result = "";
    for(let i = 0; i < 4; i++){
        let rndNum = randomInteger(nums.length);
        result += nums[rndNum];
        nums.splice(rndNum, 1);
    }
    return result;
}

function randomInteger(top){
    return Math.floor(Math.random() * top);
}

function compareNumbers(computer, user, attempt) {
    let cows = 0, bulls = 0;
    for(i in computer){
        if(computer[i] == user[i]){
            bulls++;
        }else if(computer.indexOf(user[i]) != -1){
            cows++;
        }
    }

    if(bulls == 4){
        console.log("Це число правильне! Спроб: " + attempt);
        return true;
    }else{
        console.log(`Бики: ${bulls}; Корови: ${cows}`);
        return false;
    }
}

async function getUserNumber() {
    let num = await new Promise(resolve => rl.question("Введіть число: ", answ => resolve(answ)))

    if(num.length != 4){
        console.log("Ваше число не є чотиризначним! Введіть ще раз.")
        return false;
    }
    for(let i = 0; i < num.length - 1; i++){
        for(let j = i + 1; j < num.length; j++){
            if(num[i] == num[j]){
                console.log("У вашому числі є однакові цифри! Введіть ще раз.")
                return false;
            }
        }
    }
    return num;
}

async function play() {
    let attempts = 0;
    let computerNum = getComputerNumber();
    // console.log("Число комп'ютера: " + computerNum);
    let userNum;
    while(true){
        userNum = await getUserNumber();
        if(userNum){
            attempts++;
            if(compareNumbers(computerNum, userNum, attempts)){
                break;
            }
        }
    }
}

play();

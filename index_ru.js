
let test = intToString(indexnumber=44);
let previousImage = "";
let field = document.getElementsByTagName("input")[0].focus();
const space = " ";
var synth = window.speechSynthesis;
var voices = [];
var title = document.querySelector("h1");
var img = document.querySelector(".img-fluid");
var questionLavel = document.querySelector(".text-monospace");
var input = document.querySelector('[name="userinput"]');
var scoreBoard = document.querySelector('[name="score"]');
var topScoreBoard = document.querySelector('[name="topScore"]');
var wrongBoard = document.querySelector('[name="wrong"]');
var filename = "0";
var score = 0;
var topScore = 0;
var typeNo = 0;
var typeStr = "";
var lastInputValue = "";
var questionsArray = [
    "стул",
    "море",
    "кофе",
    "работай",
    "завтрак",
    "привет",
    "музыка",
    "море",
    "семя",
    "смотрете",
    "говорить",
    "море",
    "я",
    "вы",
    "мы",
    "ТВ",
    "есть",
    "солнце",
    "имя",
    "апельсни",
    "виноград",
    "хлеб",
    "молоко",
    "море",
    "одиннадцать",
    "октябрь",
    "апркль",
    "ясно",
    "дождь",
    "математика",
    "идти",
    "жаркий",
    "холодно",
    "книга",
    "прощай",
    "стол",
    "стул",
    "Т34 был основным советским танком в ww2.",
    "Этот русский фильм о войне захватывающий.",
    "Это удобное кресло.",
    "Как вы?",
    "У меня все хорошо.",
    "Какую музыку ты слушаешь?",
    "Я учился в университете.",
    "Я путешествовал по России однажды."

];

//it should be loaded from Json file
const first14Letters = [
    "1 !",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9(",
    "0)",
    "-",
    "+ =",
    ""
];

const second12letters = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "{[",
    "}]"
];

const third12letters = [
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    ";:",
    "\"",
    ""
];

const forth11letters = [
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "<,",
    ">.",
    "?/",
    "-"
];

var modeButtons = document.querySelectorAll(".mode");
input.focus();

var currentStr = questionsArray[Math.floor(Math.random() * questionsArray.length)];
questionLavel.innerHTML = currentStr;

var utterThis3  = new SpeechSynthesisUtterance(currentStr);
    utterThis3.voice = voices[62];
    utterThis3.lang = "ru-RU";

    //utter the word
    synth.speak(utterThis3);

getImage();

wrongBoard.style.visibility = 'hidden';

const shakeButton = document.getElementById("shake");
shakeButton.style.borderColor="#0000ff";

const tShakeButton = document.getElementById("topShake");
tShakeButton.style.backgroundColor="#008000";
tShakeButton.style.borderColor="#008000";

const wrongButton = document.getElementById("wrong");

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

           

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }



function timeToShake(){
    
    shakeButton.style.backgroundColor="#ee82ee";
    shakeButton.style.borderColor="#ee82ee";
    shakeButton.style.animation="moveY  0.3s 1";
    shakeButton.style.animationTimingFunction="linear";



    // Usage!
    sleep(500).then(() => {
        shakeButton.removeAttribute('style');
        shakeButton.style.backgroundColor="#0000ff";
        shakeButton.style.borderColor="#0000ff";
    });
}

function timeToTopShake(){
    
    tShakeButton.style.animation="shake 0.5s 1"
    tShakeButton.style.backgroundColor="#aaff00";
    tShakeButton.style.borderColor="#aaff00";

    // Usage!
    sleep(500).then(() => {
        tShakeButton.removeAttribute('style');
        tShakeButton.style.backgroundColor="#008000";
        tShakeButton.style.borderColor="#008000";
    });
}

function wrongAlert(){
    
    wrongButton.style.animation="scaleUP 0.3s 1";

    // Usage!
    sleep(500).then(() => {
        wrongButton.removeAttribute('style');
        wrongBoard.style.visibility = 'hidden';
    });
}


function myFunction() {
    wrongBoard.style.visibility = 'hidden';
    
    if (input.value.length == currentStr.length ) {
        if (input.value == currentStr) {
            score += 1;
            scoreBoard.innerHTML = "Счет: " + score;
            timeToShake();
            

            if (score >= topScore) {
                topScore = score;
                topScoreBoard.innerHTML = "СВЗ: " + topScore;
                timeToTopShake();
            }

   
          
           

            var utterThis2 = new SpeechSynthesisUtterance("хорошо");
            utterThis2.voice = voices[62];
            utterThis2.lang = voices[62].lang;
            //utter the word
            synth.speak(utterThis2);
            next();

        }else{
            score = 0;
            scoreBoard.innerHTML = "Счет: " + score;
            wrongBoard.style.visibility = 'visible';
            wrongAlert();
            reset();
        }
    } else if (lastInputValue != currentStr[typeNo]){
            
            wrongBoard.style.visibility = 'visible';
            wrongAlert();
            
        
    } else {
        typeNo += 1;
        
        getImage();
        
    }

    


}

function lastInput(event){
     let x = event.which || event.keyCode;
     lastInputValue = String.fromCharCode(x)
}

function reset(){
    typeNo = 0;

    questionLavel.innerHTML = currentStr;
    input.value="";
    lastInputValue = "";
    getImage();
}

function next(){
    typeNo = 0;
    currentStr = questionsArray[Math.floor(Math.random() * questionsArray.length)];
    questionLavel.innerHTML = currentStr;
    input.value="";
    lastInputValue = "";
    getImage();

    var utterThis = new SpeechSynthesisUtterance(currentStr);
    utterThis.voice = voices[62];
    utterThis.lang = voices[62].lang;
    console.log(utterThis.voice);
    console.log(utterThis.lang);
    //utter the word
    synth.speak(utterThis);
    
    sleep(5000);
}

function getImage(){

    filename = currentStr[typeNo];

    //uppercase
    filename = filename.toUpperCase();
    console.log("uppercase", filename);

    if (previousImage.length>0){
        const clearhistory = document.getElementById(previousImage);
        clearhistory.style.backgroundColor = "transparent";
    }
    

    let val;



    // val = document.querySelector('span');
    val = document.getElementsByClassName('ru');
    console.log(val);


    let output = '';
    for (let index = 0; index < val.length; index++) {
        const targetStr = val[index].textContent;
        if (targetStr.includes(filename) ) {
            output = intToString(indexnumber=index);
        }
    }

    if (output.length>0) {
        console.log("output",output);
        const hit = document.getElementById(output);
        hit.style.backgroundColor="#5d8bbd";
        previousImage = output;
    }
    




}


function intToString (indexnumber = -1){
    let str = String(indexnumber);
    let output = str.replace(/0/g,'zero');
    output = output.replace(/1/g,'one');
    output = output.replace(/2/g,'two');
    output = output.replace(/3/g,'three');
    output = output.replace(/4/g,'four');
    output = output.replace(/5/g,'five');
    output = output.replace(/6/g,'six');
    output = output.replace(/7/g,'seven');
    output = output.replace(/8/g,'eight');
    output = output.replace(/9/g,'nine');

    return output;


}


//
function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }
    voices = speechSynthesis.getVoices();
}
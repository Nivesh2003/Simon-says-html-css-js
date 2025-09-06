let gameSeq = [];
let userSeq = [];
let btns = ['red','yellow','green','purple'];
let started = false;
let level = 0;

document.addEventListener("keypress",function (){
    if(started==false){
        console.log("Game started");
        started=true;

        levelUp();
    }
})

function btnFlash(btn){
btn.classList.add('flash');
setTimeout(()=>{
    btn.classList.remove('flash');
},200);
}
function seqFlash() {
    let i = 0;

    let interval = setInterval(() => {
        let color = gameSeq[i];
        let btn = document.querySelector(`.${color}`); // pick the button
        btnFlash(btn); // flash it

        i++;
        if (i >= gameSeq.length) {
            clearInterval(interval); // stop after finishing sequence
        }
    }, 300); // delay between flashes (adjust if you want slower/faster)
}

function levelUp(){
    userSeq = [];
    level++;
    document.querySelector('h2').innerText=`Level ${level}`;

    //random
    let no = Math.floor(Math.random()*3);
    let randCol = btns[no];

    gameSeq.push(randCol);

    // btnFlash(randBtn);
    seqFlash();
} 

function checkSeq(index){
    let i = level-1;
    if(userSeq[index]===gameSeq[index]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        } 
    } else {
        document.querySelector('h2').innerText='Game over! Press any key to continue';
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(()=>{
            document.querySelector('body').style.backgroundColor='white';
        },170);
        reset();
    }
} 

function btnPress(){
let btn = this;
btnFlash(btn);

userColor = btn.getAttribute('id');
userSeq.push(userColor);

checkSeq(userSeq.length-1);
} 
let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click',btnPress)
} 

//To reset 
function reset(){
    userSeq=[];
    gameSeq=[];
    started=false;
    level=0;
}
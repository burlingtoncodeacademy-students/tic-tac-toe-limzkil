/*----------Comments-----------
Didn't make it through all the stories again. Pursued one line of thinking
with regard to how to achieve functionality but ended up having to refactor the entire thing
too late to start working on the win condition. I do think the new code is much better looking
and more functional so I am happy about the refactoring even if it meant I didn't finish.
I left in the old code for posterity, it is indicated where it begins.
*/




//assigning element IDs to usable variables
let playButt = document.getElementById("play");
let restartButt = document.getElementById("restart");
let replayButt = document.getElementById("replay");
let playStatus = document.getElementById("play-status");
let gameBlocks = document.getElementsByClassName("block");


//when the user clicks play button
playButt.addEventListener("click", (evnt) => {
    //disable play button
    playButt.style.filter = "blur(2px)";
    playButt.style.cursor = "not-allowed";
    //update h2 from single/multiplayer to player turn status
    playStatus.innerText = "Juniper's Turn";
    //enable restart and replay button
    restartButt.style.filter = "blur(0px)";
    restartButt.style.cursor = "pointer";

    replayButt.style.filter = "blur(0px)";
    replayButt.style.cursor = "pointer";

    //turning gameBlocks into an array so the forEach method can be called on it
    //setting gameBlocks back to being able to be clicked since play was pushed
    Array.from(gameBlocks).forEach(
        (element) => (element.style.pointerEvents = "auto")
    );
});

//create player one object
let p1 = {
    name: "Juniper",
    img: "url('/img/juniperberry.png')",
    moves: [],
};

//create player two object
let p2 = {
    name: "Bearberry",
    img: "url('/img/bearberry.png')",
    moves: [],
};

//assign object to variable for dynamic functionality
let player = p1;

//switch the definition of player between the two player objects
function playSwitch() {
    if (player === p1) player = p2;
    else {
        player = p1;
    }
}

//callback function passed into the event listener
function boardClick(event) {
    //calling the function to switch players
    playSwitch();
    //changing image to match current player
    this.style.backgroundImage = player.img;
    //preventing block from being clicked again
    this.style.pointerEvents = "none";
    //pushing id of block to array in player object
    player.moves.push(this.id.slice(6));
    //changing the status to the current player's name
    playStatus.innerText = `${player.name}'s turn!`;
    console.log(player);
    event.stopPropagation();
    event.preventDefault();
}

//creating an array from the gameBlocks HTML collection, and calling a for Each
//on each element to add a "click" event listener
Array.from(gameBlocks).forEach((element) =>
    element.addEventListener("click", boardClick)
);

//---*start of old code that was ugly and buggy and had to be refactored*---//

// let currentPlay = "juniper";

// //function containing the if/else loop pertaining to turn
// function playerTurnSwitch() {
//     switch (currentPlay) {
//         //iterating over gameBlock HTML collection
//         case "juniper":
//             for (let block of gameBlocks) {
//                 //adding click event
//                 block.addEventListener("click", (evnt) => {
//                     //changing the image to correspond with turn
//                     block.style.backgroundImage = "url('/img/juniperberry.png')";
//                     //preventing block from being clicked again, preventing cheating
//                     block.style.pointerEvents = "none";
//                     //changing play status to next player's turn
//                     playStatus.innerText = "Bearberry's Turn";
//                     //changing the currentPlay variable to the next person's turn
//                     currentPlay = "bearberry";
//                     console.log(currentPlay);

//                     this.removeEventListener("click", (evnt));
//                     playerTurnSwitch();
//                 });
//             }
//             break;
//         case "bearberry":
//             for (let block of gameBlocks) {
//                 block.addEventListener("click", (evnt) => {
//                     block.style.backgroundImage = "url('/img/bearberry.png')";
//                     block.style.pointerEvents = "none";
//                     playStatus.innerText = "Juniper's Turn";
//                     currentPlay = "juniper";
//                     console.log(currentPlay);
//                     this.removeEventListener("click", (evnt));
//                     playerTurnSwitch();
//                 });
//             }
//     }
// }

// playerTurnSwitch();
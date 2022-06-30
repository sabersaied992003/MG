// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {

  // Prompt Window To Ask For Name
  let yourName = prompt("Whats Your Name?");

  // If Name Is Empty
  if (yourName == null || yourName == "") {

    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = 'Unknown';

  // Name Is Not Empty
  } else {

    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;

  }

  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();

  document.querySelector(".control-buttons-blocks span p").innerHTML = yourName;

//Timer
  let du = 1;
let durations = document.querySelector(".time span");

const myInterval = setInterval(myTimer, duration);

function myTimer() {
  durations.innerHTML = parseInt(durations.innerHTML) - du;
  if (parseInt(durations.innerHTML) === 11) {
    document.querySelector("audio.count-down").play();
  }
  if (parseInt(durations.innerHTML) === 0) {
    myStop();
    document.querySelector(".control-buttons-blocks").classList.add("mu");
    setTimeout(() => {
    document.querySelector("audio.end-wrong").play();
    },1000)
}
}

function myStop() {
  clearInterval(myInterval);
  }

};



// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());



// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener('click', function () {

    // Trigger The Flip Block Function
    flipBlock(block);

  });

});

// Flip Block Function
function flipBlock(selectedBlock) {

  // Add Class is-flipped
  selectedBlock.classList.add('is-flipped');

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {

    // console.log('Two Flipped Blocks Selected');

    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

  }


}


// Stop Clicking Function
function stopClicking() {

  // Add Class No Clicking on Main Container
  blocksContainer.classList.add('no-clicking');

  // Wait Duration
  setTimeout(() => {

    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove('no-clicking');

  }, duration);

}
    let sum = 20;
// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

  let triesElement = document.querySelector('.tries span');

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');

    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

    document.querySelector("audio.right").play();

    let match = document.querySelector(".has-match");

    let triesEnd = document.querySelector('.control-buttons-blocks p > span');

    if (match.className.length === 20) {
      sum = sum + 20;
      if (sum === 220) {
        document.querySelector(".control-buttons-blocks").classList.add("mu");
        if (triesElement.innerHTML > 15) {
          document.querySelector("audio.end-wrong").play();
        }else{
          document.querySelector("audio.end").play();
      }
      }
    }
  } else {

    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        document.querySelector("audio.wrong").play();

    setTimeout(() => {

      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');

    }, duration);

  }

}


// Shuffle Function
function shuffle(array) {

  // Settings Vars
  let current = array.length,
      temp,
      random;

  while (current > 0) {

    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;

  }
  return array;
}


document.querySelector(".control-buttons-blocks > span").onclick = function () {

  // Remove Splash Screen
  document.querySelector(".control-buttons-blocks").remove();

  //Refresh
  window.location.reload();

  document.querySelector(".control-buttons-blocks").classList.remove("mu");

  document.querySelector("audio").pause()

};


// Current Array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]
/*
  [1] Save Current Element in Stash
  [2] Current Element = Random Element
  [3] Random Element = Get Element From Stash
*/
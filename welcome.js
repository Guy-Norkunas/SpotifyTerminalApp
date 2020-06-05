const readline = require("readline-sync");
const chalk = require("chalk");
const fetch = require("node-fetch");

console.log(chalk.greenBright.bold("WELCOME To BARGIN BIN"));
console.log(chalk.green("///////////////////////////////////"));
console.log(chalk.bgGreen.bold.black("The place where you can search for"));
console.log(chalk.bgGreen.bold.black("the lowest rated music on Spotify!"));
console.log(chalk.green("///////////////////////////////////"));

console.log("Please tell us your name so we can personalize your visit");
const name = readline.question(chalk.green("...> "));
console.log(`Well hello there ${name}`);

// Basic menu
const menu = [
  "lowest artist",
  "random lowest artist",
  "surprise me",
  "Song Lyrics",
];

// Gets the user to enter a menu number
const index = readline.keyInSelect(menu, "Pick a menu item");

if (index === 3) {
  const getArtistSongs = require("./lyrics");
  getArtistSongs;
}

if (index === -1) {
  console.log("Ok, bye!");
  process.exit();
} else {
  console.log(`Dang! You are awesome.`);
}

// To show a random
// console.log("Crappy Artist of the Day");
// let random = Math.round(Math.random() * 10);
// console.log(chalk.red(random));

// console.log("Pick a random number from 1 to 200");
// const number = readline.question(">");
// console.log(`You have picked ${number}`);

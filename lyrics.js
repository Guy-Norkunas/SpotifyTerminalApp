const readline = require("readline-sync");
const chalk = require("chalk");
const fetch = require("node-fetch");

// Pick an artist
console.log(chalk.green.bold("ADD AN ARTIST"));
const bandName = readline.question("> ");
console.log(`You chose ${bandName}`);

// To pick a song
console.log(chalk.green.bold("PICK A SONG"));
const songName = readline.question("> ");
console.log(`You chose ${songName}`);

// api with lyrics.ovh
// https://lyricsovh.docs.apiary.io/
const getArtist = async () => {
  const response = await fetch(
    `https://api.lyrics.ovh/v1/${bandName}/${songName}`
  );
  const data = await response.json();
  console.log(data);
};

getArtist();

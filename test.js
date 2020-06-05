const request = require('request'); // "Request" library
const readline = require("readline-sync");
const fetch = require("node-fetch");

const client_id = '5352be5b021042188d2c62155df50f5d'; // Your client id
const client_secret = '2d83ee2f9cc84e60b54e0aeb5f0e1f3d'; // Your secret

// your application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

const spotifyAPICall = (url, cb) =>  request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API


    var token = body.access_token;
    var options = {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    }

    request.get(options, function(error, response, body) {
      cb(body);
    });
  }
});


const getPlaylists = (username) => {
  return new Promise((resolve, reject) => {
    spotifyAPICall('https://api.spotify.com/v1/users/' + username + '/playlists', (body) => {
      resolve(body)
    });
  })
}

const viewTracks = (playlistID, offset = 0, limit = 10) => {
  return new Promise((resolve, reject) => {
    spotifyAPICall('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks?offset=' + offset + '&limit=' + limit, (body) => {
      resolve(body)
    });
  })
}

const ViewSong = (songID) => {
  return new Promise((resolve, reject) => {
    spotifyAPICall('https://api.spotify.com/v1/tracks/' + songID, (body) => {
      resolve(body)
    });
  })
}

const showPlaylists = async (username) => {
  try {
    const body = await getPlaylists(username);

    console.log("select a playlist");

    for(let i = 0; i < body["items"].length; i++){
      console.log((i+1) + ". " + body["items"][i]["name"]);
    };

    let input = readline.question("> ") - 1;
    showTracks(body["items"][input]["id"]);

  } 
  catch(err) {
    console.log(err)
  }
}

const showTracks = async (playlistID, offset = 0) => {
  try {
    const body = await viewTracks(playlistID, offset);

    console.log(`Viewing from ${body["offset"] + 1} to ${body["offset"] + body["limit"]}`)

    for(let i = 0; i < body["items"].length; i++){
      let track = body["items"][i]["track"]
      console.log("");
      console.log(i + 1 + offset);
      console.log("name: " + track["name"]);
      for(let j = 0; j < track["artists"].length; j++){
        console.log("artist: " + track["artists"][j]["name"]);
      }
      console.log("album: " + track["album"]["name"]);
    }

    if(body["offset"] + body["limit"] < body["total"]){
      goNext =  true;
    }
    else {
      goNext = false;
    }
    if(body["offset"] - body["limit"] >= 0){
      goPrev = true;
    }
    else {
      goPrev = false;
    }

    console.log("Type next or prev to navigate the playlist. Or select a track by it's number");
    let input = readline.question("> ")
    if(input === "next" && goNext){
      showTracks(playlistID, body["offset"] + body["limit"])
    }
    else if(input === "prev" && goPrev) {
      showTracks(playlistID, body["offset"] - body["limit"])
    }
    else if(body["items"][input - body["offset"] - 1]){
      input = input - body["offset"] - 1;
      showSong(body["items"][input]["track"]["id"]);
    }
    else {
      startProgram();
    }
  }
  catch(err) {
    console.log(err)
  }
}

const showSong = async (songID) => {
  try {
    const body = await ViewSong(songID);
    console.log("");
    console.log("name: " + body["name"]);
    for(let i = 0; i < body["artists"].length; i++){
      console.log("artist: " + body["artists"][i]["name"]);
    }
    
    console.log("from the album: " + body["album"]["name"]);
    console.log("release date: " + body["album"]["release_date"]);
  }
  catch(err) {
    console.log(err);
  }
  finally {
    startProgram();
  }
}

const startProgram = () => {
  let username = readline.question("enter username: ");
  let test = showPlaylists(username);
}

startProgram();
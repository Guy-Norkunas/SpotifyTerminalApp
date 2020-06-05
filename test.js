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

const viewTracks = (playlistID) => {
  return new Promise((resolve, reject) => {
    spotifyAPICall('https://api.spotify.com/v1/playlists/' + playlistID, (body) => {
      resolve(body)
    });
  })
}

console.log("Enter a spotify username?");

getPlaylists(readline.question("> ")).then((body) => {
  console.log("select a playlist");
  for(let i = 0; i < body.items.length; i++){
    console.log((i+1) + ". " + body.items[i].name);
  };

  viewTracks(body.items[readline.question("> ") - 1].id).then((body => {
    for(i = 0; i < body["tracks"]["items"].length; i++){
      let track = body["tracks"]["items"][i]["track"]
      console.log(i+1);
      console.log("name: " + track["name"]);
      for(let j = 0; j < track["artists"].length; j++){
        console.log("artist: " + track["artists"][j]["name"]);
      }
      console.log("album: " + track["album"]["name"]);
    }
  }));

});
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var request = require('request');
const songRoute = require('./routes/song.js');


const adminRoute = require('./routes/admin.js');
const reviewRoute = require('./routes/review.js');
const quizRoute = require('./routes/quiz.js')
const leaderboard = require('./routes/leaderboard');
const userRoute = require('./routes/users.js');
const artistRoute = require('./routes/artist.js');
const favoritesRoute = require('./routes/favorites.js');

const genreRoute = require('./routes/genre.js');

const app = express();
dotenv.config();

const uri = process.env.URI;
const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'https://tunehub-server.onrender.com/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'https://tune-hub.netlify.app/';

//json parser, limit set to 30 MB for image transfer
app.use(express.json({
  limit: "30mb", extended: true
}));

app.use(express.urlencoded({
  limit: "30mb", extended: true
}));

app.use(cors());
app.use(cookieParser());

// connecting to the database
async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  }
  catch (err) {
    console.error(err);
  }
}

connect();
// const connection = mongoose.connection;
// module.exports = connection;

// specify /test for specific routes
//app.use('/', userRoute);
app.use('/', adminRoute);
app.use('/review', reviewRoute);
app.use('/trivia', quizRoute)
app.use('/leaderboard', leaderboard);
app.use('/artist', artistRoute);
app.use('/users', userRoute);
app.use('/trivia', quizRoute);
app.use('/favorites', favoritesRoute);
app.use('/song', songRoute);
app.use('/genre', genreRoute);
//Server PORT number


// SPOTIFY WEB API AUTHORIZATION CODE FLOW
//Reference
// https://developer.spotify.com/documentation/general/guides/authorization-guide/
// https://github.com/spotify/web-api-auth-examples

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.get('/spotify/login', function (req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    }));
});

app.get('/spotify/callback', function (req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
          'base64',
        )}`,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `${FRONTEND_URI}/#${querystring.stringify({
            access_token,
            refresh_token,
          })}`,
        );
      } else {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
      }
    });
  }
});

app.get('/spotify/refresh_token', function (req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
        'base64',
      )}`,
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token });
    }
  });
});

app.listen(PORT, () => {
  console.log("Listening on PORT: " + PORT);
})
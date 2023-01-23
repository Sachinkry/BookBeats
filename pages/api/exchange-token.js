import axios from 'axios'
// in order to use env var, we write this code
require('dotenv').config();

const handleExchangeToken = async (req, res) => {
    // get the authorization code from the request body
    const code = req.body.code;
    // this is where we will be redirected 
    const redirect_uri = "http://localhost:3000/callback/";

    // make a POST request to the spotify API to exchange the code for an access token
    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // extract the access token from the response
        console.log("RESPONSE___________________", response.data)
        const accessToken = response.data.access_token;

        // send the response data to client

        // send the data containing the access token to the client
        res.status(200).json(response.data)

        // res.status(200).json({ access_token: accessToken})

        // here how we can access this data in client
        // 

        // res.send({ access_token: accessToken })
        // console.log("accessTOken:", accessToken)

        // save the access token to a cookie or store it in the client's session
        // res.cookie('access_token', accessToken, { maxAge: 1000 * 60 * 60 * 24 * 7});

        

        // res.redirect('/');

    } catch (err) {
        console.error("ERRRRORORORORORORORORORO:....", err);
        res.send('An error occurred while exchanging the code for an access token')
    }
}

export default handleExchangeToken;
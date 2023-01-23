import axios from 'axios'
require('dotenv').config();

const refreshedTokenHandler = async (req, res) => {
    const {refresh_token } = req.body;
    // this is where we will be redirected 
    const redirect_uri = "http://localhost:3000/callback/";

    try {       
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            params: {
                grant_type: 'authorization_code',
                redirect_uri: redirect_uri,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET
            },
            data: `grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`  ,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        // extract the access token from the response
        console.log("respnnse..............::::::XXX>>> " , response.data);
        const responseData = response.data;
        res.status(200).json(responseData)
    } catch (error) {
        console.error('ERRORROROROROROROROOR_refresh_token: ', error)
    }
    
}

export default refreshedTokenHandler;

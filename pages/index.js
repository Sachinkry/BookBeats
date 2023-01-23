import React, { useState, useEffect } from 'react';
import SearchBar from '../components/search-bar';
import Navbar from '../components/Navbar';
import CreatePlaylist from '../components/playlist';
import ShowPlaylist from '../components/Spotify-songs'

export default function Home() {
  const [playlist, setPlaylist] = useState([]);

  const updatePlaylist = () => {
    setPlaylist(playlist)
    console.log("palyedfdfdjsfjdsfjdsjfdksj")
  }

  // useEffect(() => {
  //   console.log("playlist: hoome",playlist)
  // }, [playlist])
  // disable cursor in tailwind classname is curs

  return (
    <div className=" min-h-screen max-w-2xl mx-auto">
      <Navbar  />      
      <SearchBar updatePlaylist={updatePlaylist}/>
      {/* <CreatePlaylist playlist={playlist} /> */}
      <ShowPlaylist playlist={playlist} />
    </div>        
  )
  
}


//  Here's what I'm trying to do:
// => Navbar: it has logoname and a sign in button
// 1. user click the sign in button, then 
// it will redirect to spotify authorization page if the user has not authorized the app
// when the button clicked function
const handleSignIn = () => {
  
}

// 2. if the user authorizes, it will redirect to the home page
// we would make a function that that code params from url and send it to backend to exchange the code for access token and refresh token and other data; we would store the data in local storage
// 3. if the user has already authorized the app, get the access token from local storage and check if its expired ; we will have a function to check that
// 4. if the access token is expired, we will use the refresh token to get a new access token
// 5. 

// => SearchBar: it has a search bar and a button
// => createPlaylist: it shows the playlist that is recommend by gpt3 and the use can add songs to their spotify playlist by clicking the button

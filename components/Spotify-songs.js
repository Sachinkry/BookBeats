import { useState, useEffect} from 'react'
import axios from 'axios'

const ShowPlaylist = (props) => {
    // const playlist = props.playlist;
    const [currentSong, setCurrentSong] = useState("");
    const [songList, setSongList] = useState([]);

    const handlePlay = song => {
        setCurrentSong(song);
    };
    
    useEffect(() => {
        const songsArray = localStorage.getItem('songsArray')
        const playlist = JSON.parse(songsArray);
        
        setSongList(playlist)
        console.log("spotify-s:", songList)
        
    }, [])
    
    const getUserCurrentlyPlaying = async () => {
        try {
           const accessToken = localStorage.getItem('access_token')

            const response = await axios.get(`https://api.spotify.com/v1/me/player/currrently-playing`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            // once we get the response, we can parse it and get the song uri play it on our web app using audio tag
            const dataSong = response.data.item;
            const songUri = response.data.item.uri

            console.log("dataSong: ", dataSong)
            console.log("song_uri: ", songUri)
        } catch (error) {
            console.error("No songs from spotify;error",error)
        }

    } 

    return (
    //     <div className="relative bg-black flex flex-col md:flex-row justify-between p-4">
    // <div className="relative w-full md:w-1/2">
    //     <div className="absolute inset-1 blur-xl bg-red-900 rounded-lg"></div>
    //     <div className="relative bg-red-800 flex flex-col items-center w-full text-white mx-auto justify-between rounded-lg">
    //         <div className="p-5">
    //             <p className="text-lg font-medium">{currentSong.name}</p>
    //             <p className="text-sm font-medium">{currentSong.artist}</p>
    //         </div>
    //         <div className="p-5">
    //             <audio controls>
    //                 <source src={currentSong.url} type="audio/mpeg" />
    //             </audio>
    //         </div>
    //     </div>
    // </div>
    // <div className="relative w-full md:w-1/2">
    //     <div className="absolute inset-1 blur-xl bg-red-900 rounded-lg"></div>
    //     <div className="relative bg-red-800 flex flex-col items-center w-full text-white mx-auto justify-between rounded-lg">
    //         <div className="p-5">
    //             <p className="text-lg font-medium">Song List</p>
    //         </div>
    //         <div className=" h-full scrollbar-thin">
    //             <ul className="list-none ">
    //                 {songList.map((song, index) => (
    //                     <li key={index} className="p-5 cursor-pointer hover:bg-red-600 " onClick={() => handlePlay(song)}>
    //                         <p className="text-lg font-medium">{song.name}</p>
    //                         <p className="text-sm font-medium">{song.artist}</p>
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     </div>
    // </div>
    //     </div>

        <div className='text-white'>
            {songList.length > 0 && songList.map((song, index) => (
                <div key={index} >{index+1}. {song.song} by {song.artist} </div>
            ))}
        </div>

);
}

export default ShowPlaylist;
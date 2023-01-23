import axios from "axios";
import { useState, useEffect } from "react";

// const google_apikey = 'AIzaSyCUMM4Yv51gbRUVdKmRXY2nfKufiHFs0Do'
// const google_apikey = 'AIzaSyBuTMDcN_cioe0kaM01VO1BdUB0tGBSsJQ'

const CreatePlaylist = (props) => {
    const [videoIds, setVideoIds] = useState([])
    const [isOpen , setIsOpen] = useState(false)
    const playlist = props.playlist;
    
    const getVideoIds = async (songName, artist) => {
        
        console.log(`searching...`, songName, artist)
        const url = `https://www.googleapis.com/youtube/v3/search?part=id&q=${songName} by ${artist}&key=${google_apikey}`
        try {
            const response = await axios.get(url);
            // console.log(url)
            setVideoIds(prevState => [...prevState, response.data.items[0].id.videoId]);
                        
        } catch (err) {
            console.error("err", err);
        }
    }     

    useEffect(() => {
        console.log("playlist-comp", playlist)
        if ( playlist && playlist.length != videoIds.length) {
            playlist.map((song) => {
                getVideoIds(song.song, song.artist)
            })    
            console.log("vidIDs:::", videoIds);   
        }
    }, [playlist]);

    return (
        <div className=" flex flex-col items-center w-lg text-white mx-auto justify-between px-4">
            {videoIds.length > 0 && videoIds.map((videoId, index) => {
                console.log(playlist[index.son])
                return (
                    <div index={index} className="relative w-full">
                        <div className="absolute inset-1 blur-xl bg-red-200 rounded-lg "></div>
                        <div className="relative bg-red-900 flex flex-col items-center w-lg text-white mx-auto justify-between  rounded-md">
                            <div className='flex flex-row justify-between p-3 w-full '>
                                <p>{index} </p>
                                <svg 
                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
                                   fill="currentColor" 
                                   class="w-5 h-5 hover:-translate-y-0.5 transform transition duration-300 ease-in-out cursor-pointer"
                                   onClick={() => {
                                      setIsOpen(!isOpen) 
                                   }}
                                >
                                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </div>
                            <iframe
                                
                                width='300'
                                height='168.5'
                                src={`https://www.youtube.com/embed/${videoId}?playsinline=1&controls=1&showinfo=0`}
                                className={`mx-auto mb-5 rounded-lg $ ${isOpen ? 'block': 'hidden'} `}
                                /> 
                        </div>
            </div>
                )
            })}
           
            
        </div>
        
    )
}

export default CreatePlaylist;
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
 
const GOOGLE_BOOKS_API_KEY = 'AIzaSyC0EUOyZwitvnM76kphcIA6dC2_lrbbHD0'

const SearchBar = (props) => {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isInputActive, setIsInputActive] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false);
  const [songsInfo, setSongsInfo] = useState([])
 
  // useEffect is a hook that runs a function when a state variable changes
  useEffect(() => {
    if(isInputActive) suggestBookName(query);
  }, [query, isInputActive])

  // useEffect(() => {
  //   if (!isInputActive) setSearchResults([])
  // }, [isInputActive])

  const handleSearch = async (query) => {
    console.log("hello dumplings...", query)
    console.log("Calling API...")
    
    try {
      setIsGenerating(true)
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      // get the res and convert to json
      const res = await response.json()
      const songs_text = res.basePromptOutput;
      console.log(typeof songs_text)
      setIsGenerating(false)
      
      refactoredSongsInfo(songs_text)
    } catch (err) {
      console.error(err);
    }
  }

  const refactoredSongsInfo = (songs_text) => {
    
    console.log("actual", songs_text)
    const startIndex = songs_text.indexOf('[');
    const endIndex = songs_text.indexOf(']');
    const jsonStr1 = songs_text.slice(startIndex, endIndex + 1);
    // this will remove anything outside the [] right?
    // no 

    const jsonStr = songs_text.slice(startIndex);
    const actualArray = JSON.parse(jsonStr1);

    console.log("actual", actualArray)
    // store the array in local storage
    localStorage.setItem('songsArray', JSON.stringify(actualArray))
    setSongsInfo(actualArray)
    props.updatePlaylist(actualArray)
  }

  const suggestBookName = async (value) => {
    
    try {
        if (value.length > 5) {

            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${GOOGLE_BOOKS_API_KEY}`)
            
            setSearchResults(response.data.items);
            
        }
        // if (value.length === 0) {
        //     setSearchResults([])
        // }
        
    } catch (err) {
        console.error(err)
    }
  }

  return (
    <div className=' flex flex-col items-center p-4  '>
        {/* Header */}

        <h1 className='text-3xl font-bold text-center mb-2.5 text-red-400'>Songs that vibe with books</h1>
        <h2 className="text-1.8xl text-center text-red-300/40">
                Experience the beauty and depth of literature through our curated playlists 
        </h2>
        
        <div  className="mx-auto  mt-4 w-full mx-3">
            <div className='relative'>
                <div className='absolute inset-1 bg-red-400 rounded-md blur-2xl text- white'>
                </div>
                <input 
                    className='relative py-3 px-4 w-full  bg-black rounded-md leading-none flex border-none items-center text-red-200/70 text-sm focus:outline-none placeholder-red-200/40'
                    type='text'
                    placeholder='A Little Life By Hanya Yanagihara'
                    value ={query}
                    onChange={e => {
                      // if(e.target.value.length === 0) {
                        //     setSearchResults([])
                        // }
                        // suggestBookName(e.target.value);
                        setQuery(e.target.value);
                        
                      }}
                    onFocus={() => setIsInputActive(true)}
                    // onBlur={() => setIsInputActive(false)}
                /> 
            </div>
        
            {searchResults && searchResults.length > 0 && (
              <div className={`scrollbar-thin ${isInputActive ? 'block': 'hidden'} z:index z-200` }id='search-result'>
                {searchResults.map((result, index) => (
                  index < 5 && (
                    <div 
                       key={index} 
                       className='w-full border border-red-300 p-2 rounded-md border-collapse truncate text-overflow-ellipsis cursor-pointer bg-red-200 hover:bg-red-500'
                       onClick={() => {                         
                          setQuery(`${result.volumeInfo.title} By ${result.volumeInfo.authors}`);
                          console.log(query)

                          setIsInputActive(false)
                          }
                       }
                    >
                       <div className='relative'>
                            <p className='absolute inset-1 bg-red100 rounded-md blur-xl text-white'></p>
                            <p className='truncate text-overflow-ellipsis text-red-900 '>{result.volumeInfo.title} By {result.volumeInfo.authors}</p>
                       </div>
                    </div>
                )))}
                </div>
            )}
            {searchResults &&  (   
                <button 
                    type="submit" 
                    className={`z:index bg-red-300 float-right hover:bg-red-900 hover:text-red-200 hover:-translate-y-0.5 transform transition duration-300 ease-in-out text-red-900 font-medium py-1.5  px-4 rounded-md my-3 border-blue-500 -z-5 ${(query.length > 5 || !isGenerating) ? 'cursor-pointer': 'cursor-not-allowed'}`}
                    disabled={query.length < 5 || isGenerating}
                    onClick={() => handleSearch(query)}
                >
                  Generate Songs
                </button>
            )}
        
        </div>

        {/* <div className='mx-auto flex max-w-lg flex-col items-center bg-blue  p-4 mt-4'>
          {songsInfo.map((song, index) => {
            return (
              <div key={index} className='flex flex-col text-red bg-white'>
                <p>Song: {song.song}</p>
                <p>Artist: {song.artist}</p>
                <br />
              </div>
              
            )
          })}
        </div> */}
      
    </div>
  )
}

export default SearchBar


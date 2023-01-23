import Link from 'next/link'

import { useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { StrictMode } from 'react'
// by default, strict mode is enabled which renders the component twice
// it is enabled to prevent bugs like using state in useEffect
// to disable it, add {strict: false} to config ojbect in 

const Navbar = () => {
    

    const isLoadingRef = useRef(false)
    const isUserLoggedRef = useRef(false)
    // using useRef is better for is good
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const clientId ='589ee81285934b5392d23fb5fd2a9b63'
    // this is where the user 
    const redirectUri = "http://localhost:3000/callback/";
    const encodedRedirectUri = encodeURIComponent(redirectUri)
    const scope = "user-library-read playlist-modify-public user-read-currently-playing";
    const router = useRouter();

    const handleLogin = async () => {
        
        if(!isUserLoggedIn) {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodedRedirectUri}&scope=${scope}&response_type=code`;
            
        } else {
            localStorage.removeItem('access_token')
            setIsUserLoggedIn(false)
            
            router.push('/')
        } 
        
    }
    
    
    const getRefreshedToken = async (refresh_token) => {
            try {           
                    console.log("refreshing token....")
            
                    const response = await axios.post('/api/refreshed-token', { refresh_token});
            
                    // parse the response
                    const respData = response.data;
            
                    // update the local storage           
            
                    localStorage.setItem('expires_in', respData.expires_in)
                    // setAccessToken(respData.access_token);
                    localStorage.setItem('access_token', respData.access_token)            
            
                } catch(err) {
                        console.error("refreshed_token_error:", err)
                    }                
                }
                
                // check if token is expired and get a new one if expired
                const checkTokenExpired = async () => {
                    const expires_in = localStorage.getItem('expires_in')
                    const refresh_token = localStorage.getItem('refresh_token')
                    const tokenExpired = Date.now() > (expires_in + 60 * 60 * 1000)
                    
                    if (tokenExpired && refresh_token) {
                        // setIsTokenExpired(tokenExpired)
                        setIsUserLoggedIn(false)
                        // getRefreshedToken(refresh_token)
                        
                        console.log("it is expired")  
                    } else if (refresh_token && !tokenExpired) {
                        // setIsTokenExpired(false)  
                        setIsUserLoggedIn(true)         
                    } 
                }
                
                useEffect(() => {
                    checkTokenExpired();        
                }, [])
                
                
                
                return (
                    <nav className=" p-4 flex justify-between items-center max-w-800 ">
            <div className='relative '>
            <div className='absolute inset-1 bg-red-400 rounded-sm blur-xl'></div>
            <div className="relative flex items-center ">
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-900">
            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
                
            <Link href="/">
            <h1 className="ml-1 font-semibold font-sans-serif text-red-800">readingmood</h1>
            </Link>
                </div>
                </div>
                
                <div className='relative'>
                <div className='absolute inset-1 bg-red-400 rounded-sm blur-xl text- white'>
                </div>
                
                <button 
                type="submit" 
                className={`relative float-right hover:bg-red-900 hover:text-red-200 hover:-translate-y-0.5 transform transition duration-300 ease-in-out font-medium py-1  px-2 rounded-md  border-blue-500 -z-5 ${isUserLoggedIn ? 'text-red-200 underline hover:bg-none': 'bg-red-300 text-red-900'} `}
                //    disabled={isUserLoggedIn}
                onClick={handleLogin}
                >
                {isUserLoggedIn ? `Sign Out`: 'Sign In'}
                </button>
                </div>
                </nav>
                )
}
export default Navbar;



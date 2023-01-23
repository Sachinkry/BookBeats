import { useEffect, useState, useRef} from 'react';
import axios from 'axios';

import Router, { useRouter } from 'next/router';

const Callback = () => {
    const isLoadingRef = useRef(false)
    const router = useRouter();
    // use useRef for loading state


    const getRefreshedToken = async (refresh_token) => {
        try {
            setIsLoading(true)
            const response = await axios.post('/api/refreshed-token', { refresh_token});
            
            // parse the response
            const respData = response.data;
            
            // update the local storage
            localStorage.setItem('refresh_token', respData.refresh_token)
            localStorage.setItem('access_data', respData)
            localStorage.setItem('expires_in', respData.expires_in)
            // setAccessToken(respData.access_token);
            localStorage.setItem('access_token', respData.access_token) 

            setIsLoading(false);

        } catch(err) {
            console.error("refreshed_token_error:", err)
        }
        
    }

    const handleExchangeToken = async (code) => {
        try {
            axios.post('/api/exchange-token', { code })
            .then(res => {

                const respData = res.data;
                console.log("ACCESSSS_TOKENENEN:", respData)

                // setAccessData(respData);
                console.log("setting local storage......")
                localStorage.setItem('refresh_token', respData.refresh_token)
                // localStorage.setItem('access_data', respData)
                console.log(localStorage.getItem('refresh_token'))
                localStorage.setItem('expires_in', respData.expires_in)

                // setAccessToken(respData.access_token);
                localStorage.setItem('access_token', respData.access_token)

                console.log("local storage donnee....");               
                
                
            })
            .catch(error => console.error(error));

            router.push('/')
        } catch(error) {
            console.error("exchange_token_error:", error)
        }
    }

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

       if (code && !isLoadingRef.current) {
           console.log("called you bitch....")
           handleExchangeToken(code);
           
           isLoadingRef.current = true;
       }


    }, []);



    return (
        <div className='bg-white text-red-400'> Lol welcome back my love</div>
    )
}

export default Callback;
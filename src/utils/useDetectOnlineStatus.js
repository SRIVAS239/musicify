import {useState, useEffect} from "react";

const useDetectOnlineStatus = () =>{

    const[isOnline, setIsOnline] = useState(true);

    //add window event listeners, attach it only once
    useEffect(()=>{
        window.addEventListener("offline", (event) => { 
            setIsOnline(false);
        })
        window.addEventListener("online", (event) => { 
            setIsOnline(true);
        });

        //cleanup function
        return ()=>{
            window.removeEventListener("offline", ()=>{});
            window.removeEventListener("online", ()=>{});
        }
    }, [])

    // useEffect(()=>{
    //     console.log("online",navigator.onLine)
    //     if(navigator.onLine===true){
    //         console.log("online")
    //     }
        
    // })

    return isOnline;
}

export default useDetectOnlineStatus;
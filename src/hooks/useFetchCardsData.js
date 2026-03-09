import {useEffect, useState} from 'react';
import {REST_MENU_LIST} from "../utils/constants"

const useFetchCardsData = (resId) => {
    //return value in state
    const [resData, setResData] = useState(null);

    resId = 123456;
    //called once
    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async() => {
        const data = await fetch(MENU_URL + "/" + resId);
        const jsonData = await data.json();
        setResData(jsonData);
    };

    return resData;
};

export default useFetchCardsData;
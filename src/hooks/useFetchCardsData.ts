// import { useEffect, useState } from 'react';
// import { REST_MENU_LIST } from "../utils/constants";

// const useFetchCardsData = (_resId: number): any | null => {
//   // Return value in state
//   const [resData, setResData] = useState<any | null>(null);

//   const finalResId = 123456;

//   // Called once
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const data = await fetch(`${REST_MENU_LIST}/${finalResId}`);
//       const jsonData = await data.json();
//       setResData(jsonData);
//     } catch (error) {
//       console.error("Error fetching cards data:", error);
//     }
//   };

//   return resData;
// };

// export default useFetchCardsData;

'use client';
import React, { useEffect, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Price({ngnToUsdRate}:any) {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOpenPopup = () => {
      setPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setPopupOpen(false);
    };
  
    const price = Math.floor(Math.random() * 1000);
   const formattedPrice = price.toString() + '.00';

//    useEffect(() => {
//     const res = fetch("https://api.fastforex.io/fetch-all?api_key=86daf051df-ebc58089df-s9m54c")
//     console.log(res)
//    },[])
  
    return (
      <div>
        <button
          className="text-white bg-green-500 hover:bg-red-600 rounded py-1 px-3 mt-5 client"
          onClick={handleOpenPopup}
        >
          N{ngnToUsdRate}
        </button>
  
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 absolute inset-0"></div>
            <div className="bg-white rounded-lg p-4 z-10">
            <p>Conversion Rate (NGN to USD): ${ngnToUsdRate}</p>
              <button
                className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
  )
}
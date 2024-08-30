import React, {createContext, useEffect, useState} from 'react'
import { Head } from './components/head'
import GoogleMap from './components/googlemap';


export const AppContext = createContext()

function app() {

  const [cord, setCord] = useState({lat: 0, lng: 0});

  useEffect(() => {
   
  },[cord])
  
  return (
    
      <AppContext.Provider value={{cord, setCord}}>
        <Head />
        <GoogleMap />
      </AppContext.Provider>
    
    
  )
}


export default app
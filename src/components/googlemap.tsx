import React, {useEffect,  useContext} from 'react';
import "./component.css"


import {
  APIProvider,
  Map,
  
  MapCameraChangedEvent,
  
} from '@vis.gl/react-google-maps';
import { AppContext } from '../app';



function GoogleMap()   {

  const {cord} = useContext<any>(AppContext) ;

 useEffect(() => {

 }, [cord])
  
  
  const hasValidCoordinates = cord?.lat !== 0 && cord?.lng !== 0;

 

  return (
    <>
    <div className='Googlemap h-screen relative z-0' >
      <APIProvider apiKey={'AIzaSyAvCWXTSCd4-z_jmWNPmWsBUVq0-syYsYI'} onLoad={() => console.log('Maps API has loaded.')}>
        {hasValidCoordinates ? 
        (<Map
        defaultZoom={13}
        
        center={{ lat: cord.lat, lng: cord.lng}}
        onCameraChanged={ (ev: MapCameraChangedEvent) =>
          console.log('camera changed:')
        }
        mapId='da37f3254c6a6d1c'
        >
        
        </Map> ) : ( <div>Loading Map...</div>)
        }
      </APIProvider>
    </div>
    </>
  )
}


export default GoogleMap


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../app';

export const Head = () => {
  const API_KEY = '205c47cd0db6be9dcc40b06728a3436b5537df3f86bed6d5cfef338d';

  // Set explicit type for search
  const [search, setSearch] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
 

  const { setCord } = useContext<any>(AppContext);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await axios.get('https://api.ipify.org?format=json');
        const userIP = res.data.ip; // This is the user's IP address
        console.log(userIP);
        setSearch(userIP)
      } catch (error) {
        console.log('Error fetching IP address:', error);
      }
    };
  
    fetchIP();
  }, []);
  

  useEffect(() => {
    if (lat !== null && lng !== null) {
      setCord({ lat, lng });
    }
  }, [lat, lng, setCord]);

  const isIPAddress = (input: string): boolean => {
    const ipPattern = /^\d{1,3}(\.\d{1,3}){3}$/;
    return ipPattern.test(input);
  };



  const fetchApi = async () => {
    try {
      if (isIPAddress(search)) {
        console.log('IP Address:', search);
        
        const res = await axios.get(`https://api.ipdata.co/${search}?api-key=${API_KEY}`);
        setResponse(res.data);
        setLat(res.data.latitude);
        setLng(res.data.longitude);
      } else {
        console.log('Domain Name:', search);
        
        const resIP = await axios.get(`http://ip-api.com/json/${search}`);
        const res = await axios.get(`https://api.ipdata.co/${resIP.data.query}?api-key=${API_KEY}`);
        setResponse(res.data);
        setLat(res.data.latitude);
        setLng(res.data.longitude);
      }
    } catch (error) {
      console.log('This is IP address error:', error);
    }
  };


  useEffect(() => {
    fetchApi()
  },[])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApi();
  };


  return (
    <div className='HEad relative z-10 pt-6  flex items-center flex-col bg-sky-800  h-72'>

      <div className=' text-white md:text-[32px] lg:text-[40px] text-[24px]'>IP Address Tracker</div>
      
     
      <form className="relative w-[80%] md:w-[50%] lg:w-[30%] md:mt-8 mt-6" onSubmit={handleSubmit}>
        <input
          placeholder="Search IP Address or Domain..."
          className="input shadow-lg pl-4 border-gray-300  md:py-4 py-3 rounded-xl w-[100%] transition-all  outline-none"
          name="search"
          type="text"
          onChange={(e) => setSearch(e.target.value)} 
        />
          <svg
            className="size-6 absolute top-3  right-3 text-gray-500"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
      </form>

     

      <div className='Results gap-6 py-6 flex md:justify-around md:py-12 flex-col md:flex-row rounded-xl bg-white w-[80%] md:mt-10 mt-6 '>
        <div className='flex items-center flex-col  '>
          <div className='text-sm font-bold text-slate-400'>IP ADDRESS</div>
          <div className='text-2xl lg:text-3xl font-bold'> {response?.ip}</div>
        </div>

        <div  className='flex items-center flex-col '>
          <div className='text-sm font-bold text-slate-400'>LOCATION</div>
          <div className='text-2xl lg:text-3xl font-bold'>{response?.region == null ? response?.country_name : response?.region}</div>
        </div>

        <div  className='flex items-center flex-col '>
          <div className='text-sm font-bold text-slate-400'>TIME ZONE </div>
          <div className='text-2xl lg:text-3xl font-bold'>{response?.time_zone?.abbr}</div>
        </div>

        <div  className='flex items-center flex-col '>
          <div className='text-sm font-bold text-slate-400'>ISP </div>
          <div className='text-2xl lg:text-3xl font-bold'>{response?.asn?.name}</div>
        </div>
      </div>
      
    </div>
  );
};

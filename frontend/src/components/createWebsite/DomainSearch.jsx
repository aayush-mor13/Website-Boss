import React,{useState,useEffect} from 'react';
import axios from 'axios';
const server = process.env.REACT_APP_SERVER;


function DomainSearch({ setSelectedDomain }) {
    const [domainList,setDomainList] = useState([]);
    const [domainSearch,setDomainSearch] = useState('');
    const [error,setError] = useState('');

    useEffect(()=>{
        const fetchDomain = async ()=>{
            try{
                const res = await axios.get(`${server}`+'/api/domain');
                const domains = res.data;
                if(!domains){
                    setError("No Domains found !");
                    return;
                }
                setDomainList(domains);
            }
            catch(err){
                console.error(err);
                setError('Error occured while fetching Domains !');
            }
        }
        fetchDomain();
    },[]);

    const handleDomainSubmit = () =>{
        if(!domainSearch){
            setError('Please Select Domain !');
            return;
        }
        setSelectedDomain(domainSearch);
    }

  return (
    <div>
      <h1 className='mt-12 text-center text-amber-700 text-3xl font-bold'>Select Domain</h1>
      <div className='max-w-xl bg-neutral-100 mt-6 p-8 flex flex-col justify-center items-center mx-auto rounded-3xl shadow-lg'>
        <div className='flex flex-row gap-16'>
            <select
              id="domains" 
              className="h-10 w-56 pl-3 bg-white border-gray-200 border-2 text-gray-900 rounded-lg focus:ring-amber-700 focus:border-black block"
              value={domainSearch}
              onChange={(e)=>setDomainSearch(e.target.value)}
            >
              <option hidden>Choose a domain</option>
              {domainList.map((data=> <option value={data.domain}>{data.domain}</option> ))}
            </select>
            <button
              className='border-2 rounded-md p-2 pl-6 pr-6 bg-amber-700 text-white font-bold hover:bg-white hover:text-amber-700 hover:border-amber-700 transition-colors'
              onClick={handleDomainSubmit}
            >
              Select
            </button>
        </div>
        {error.length>0 && (
          <div className='mt-8 font-bold text-red-500'>
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default DomainSearch
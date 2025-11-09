"use client";
import { useEffect, useState } from "react"
import { fetchAuth } from '../components/fetch';

export default  function Dashboard(){
  const url = process.env.NEXT_PUBLIC_API_URL
  const [username, updateUsername] = useState("")

  useEffect(()=>{
    const fetch_data = async () =>{

    try {

     const response = await fetchAuth(`${url}/dashboard`, {
        method: 'GET',
        
        headers : {'Content-Type': 'application/json'}
       })
       const data = await response.json()
       console.log(data)

        }catch(error){
            console.log(error)
        }
    };

   fetch_data();

  }, []);



  return (
    <div className="row">
         <div className="col-md-6">
              <div className="rectangle">

              </div>
         </div>
          <div className="col-md-6 rectangle">
              <div className="rectangle">
                
              </div>            
            
         </div>
     
    </div>
  )
}
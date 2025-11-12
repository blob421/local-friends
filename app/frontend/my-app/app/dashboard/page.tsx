"use client";
import { useEffect, useState } from "react"
import { fetchAuth } from '../components/fetch';
import Image from 'next/image'
export default  function Dashboard(){
  const url = process.env.NEXT_PUBLIC_API_URL
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [team, setTeam] = useState("")
  const [email , setEmail] = useState("")
  const [region , setRegion] = useState("")
  


  useEffect(()=>{
    const fetch_data = async () =>{

    try {

     const response = await fetchAuth(`${url}/dashboard`, {
        method: 'GET',
        
        headers : {'Content-Type': 'application/json'}
       })
       const data = await response.json()
       console.log(data)
       setFirstName(data.user.firstName)
       setLastName(data.user.lastName)
       setTeam(data.user.TeamId)
       setEmail(data.user.email)
       setUsername(data.user.username)
       const region_string = `${data.user.Region.city} ${data.user.Region.country}`
       setRegion(region_string)

       

        }catch(error){
            console.log(error)
        }
    };

   fetch_data();

  }, []);



  return (
<div className="container-fluid dash_cont">
      <div className="row">
           <div className="col-md-1 d-flex flex-row flex-md-column gap-3 
           align-items-center pt-2 pb-2 pt-md-4 pb-md-0 menu_options">
              <Image src="/person.jpg" alt="person_icon" 
              width={40} height={40}>
              </Image>
              <Image src="/stats.jpg" alt="stats_icon" 
              width={40} height={40}>
              </Image>
              <Image src="/gear_icon.png" alt="gear_icon" 
              width={40} height={40}>
              </Image>
              


           </div>
            <div className="col-md-11">

                <div className="row justify-content-center">
                     <div className="col-12 top_bar_dashboard">
                       Welcome {firstName}
                     </div>
                </div>
                <div className="row justify-content-center">
                  
                    <div className="col-md-5">
                          <div className="rectangle">
                                <div className="team_upper">
                                   {team}
                                   {!team && 'Pick your team'}

                                </div>
                                <div className="teams_grid">

                                  <Image src={"/home.jpg"} width={50} height={50} 
                                    alt="" className="team_ico">
                                  </Image>
                                  <Image src={"/home.jpg"} width={50} height={50} 
                                    alt="" className="team_ico">
                                  </Image>
                                  <Image src={"/home.jpg"} width={50} height={50} 
                                    alt="" className="team_ico">
                                  </Image>
                                  <Image src={"/home.jpg"} width={50} height={50} 
                                    alt="" className="team_ico">
                                  </Image>
                                
                                 
                                </div>
                          </div>
                    </div>
                      <div className="col-md-5">
                          <div className="rectangle">
                              <div className="badges_title">
                                Badges
                              </div>
                            
                          </div>            
                        
                    </div>
                
                </div>
                <div className="row d-flex justify-content-center">
                  
                    <div className="col-md-5">
                          <div className="rectangle">
                            <Image src={"/pen.png"} alt="Edit" height={30} 
                            width={30} className="edit_icon_dash">

                            </Image>
                              <div className="account_top">
                                  Account
                              </div>
                              <div className="account_bot">
                                  <ul>
                                    <li>Username: {username}</li>
                                    <li>Name: {firstName}{lastName}</li>
                                    <li>Email: {email}</li>
                                    <li>Region: {region}</li>
                                  </ul>
                              </div>

                          </div>
                    </div>
                      <div className="col-md-5">
                          <div className="rectangle">
                               <div className="stats_top">
                                 Stats
                               </div>
                                <div className="stats_bot">

                               </div>
                            
                          </div>            
                        
                    </div>
                
                </div>
            </div>
     </div>
</div>
  )
}
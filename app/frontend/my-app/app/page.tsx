import Image from "next/image";
import { cookies } from 'next/headers';

export default async function Home(){
  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')
  const hasJwt = !!jwt;
    return(
        <div className="container-fluid">
              <div className="row">

                    <div className="col-12 top_bar_home">
                         <div className="login_btn_cont">
                            <a className="dashboard_btn_home" href="/dashboard"
                            hidden={!hasJwt}>Dashboard
                             
                            </a>
                            <a className="login_btn_home" href="/login"
                            hidden={hasJwt}>
                              Login
                            </a>
                            <a className="reg_btn_home" href="/registration"
                             hidden={hasJwt}>
                              Register
                            </a>

                          </div>
                    </div>
              </div>
              <div className="row">

                   <div className="col-12">
                    Report animal sighting and connect with animal lovers
                   </div>
                  
              </div>
               <div className="row">

                   <div className="img-fluid object-fit-cover w-100">
                    
                   </div>
                  
              </div>
        </div>
    )
}
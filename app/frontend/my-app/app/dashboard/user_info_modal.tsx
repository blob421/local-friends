
import { useState } from "react";
import $ from 'jquery'
import {useEffect} from 'react'
import AsyncSelect from 'react-select/async';
import debounce from "lodash.debounce";

type UserInfoModalProps = {
  url?: string;        // might be undefined
  username: string;
  firstName: string
  lastName: string
  email?: string;
  pictureUrl?: string;
};

const loadOptions = debounce((inputValue, callback) => {
  if (inputValue.length < 2) {
    callback([]);
    return;
  }

  fetch(`/api/regions?search=${inputValue}`)
    .then((res) => res.json())
    .then((data) =>
      callback(
        data.map((region: any) => ({
          value: region.id,
          label: region.name,
        }))
      )
    );
}, 400); // 400ms debounce



export default function User_info_modal({url, username, email, firstName, lastName,
    pictureUrl}: UserInfoModalProps){
    const [newPassword, setNewPass] = useState("");
    const [passConf, setPassConf] = useState("");
    const params = new URLSearchParams(window.location.search)
    const usernameExists = params.get('username')
  
   

  return(
    
    <div id="profile_modal_bg">
     <div className="profile_modal">
        <button className="x_btn_modal_edit_dash"
        onClick={()=> $('#profile_modal_bg').hide()}>X</button>

         <form className="image_form" encType="multipart/form-data" 
          action={`${url}/profile/edit`} method="POST">

            <div className="top_picture_flex">
             
                {pictureUrl && <img src={url + '/uploads' + pictureUrl} className="pic_edit"></img>}
        
                {!pictureUrl && <img src={'/avatar.png'} className="pic_edit"
                alt="profile picture">
                </img>}
           
                <label htmlFor="avatarUpload" className="custom_upload">
                <img src="/pen.png" alt="Upload avatar" />
                </label>
             
                <div id="region_dropdown">
                      <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptions}
                          defaultOptions
                          onChange={(selected) => onSelect(selected?.value)}
                          placeholder="Search for your region..."
                        />
                </div>
            </div>

            <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            name="image"
            style={{ display: "none" }}
            onChange={(e) => e.target.form?.submit()}
            />
         </form>
        
         <form action={`${url}/profile/edit`} method="POST" 
          encType="multipart/form-data" className="form_profile_user">
               <div>
                   <div>First name:</div>
                    
                    <input type="text" name="firstName" placeholder={firstName}>
                    </input>
              </div>
                             <div>
                    <div>Last name:</div>
                    <input type="text" name="lastName" placeholder={lastName}>
                    </input>
              </div>
              <div>
                    <div>Username:</div>
                    <input type="text" name="username" placeholder={username} autoComplete="new-username">
                    </input>
                    
              </div>
              <div>
                     <div>Email:</div>
                    <input type="text" name="email" placeholder={email} autoComplete="new-email">
                    </input>
              </div>

              <div>

                     <div>Password:</div>
                    <input type="password" name="password" autoComplete="new-password"
                    onChange={(e)=>setNewPass(e.target.value)}
                    placeholder="New password"></input>
              </div>
              <div>
                   <div>Confirm:</div>
                  <input type="password" name="password_2"
              onChange={(e)=> setPassConf(e.target.value)}
              placeholder="Confirm" autoComplete="new-password"></input>
              </div>
                
            {passConf == newPassword &&  
                        <div className="errors_cont_dash_edit">
         
                        {usernameExists && <div className="error_username_dash">
                        Username unavailable</div>}
                        </div>}
      
              
            
              {passConf !== newPassword &&  
              <div className="errors_cont_dash_edit">
              <div className="error_passwords_profile">
               Passwords don't match
               </div>
               {usernameExists && <div className="error_username_dash">
                        Username unavailable</div>}
              
              </div>}
            
            {passConf == newPassword && 
             <div className="submit_cont_dash_edit">
            <input type="submit"
              className="submit_btn_edit_profile">
                </input>
                </div>}
             

           
              {passConf !== newPassword && 
              <div className="submit_cont_dash_edit">
              <input type="submit" className="submit_btn_edit_profile" disabled>
              </input>
              </div>}
              
         </form>
     </div>
</div>

  )
}
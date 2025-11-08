
"use client";
import Image from "next/image";
import { useState } from 'react'
import { useRouter } from "next/navigation";


export default function Home() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const url = process.env.NEXT_PUBLIC_API_URL as string;;
const router = useRouter();

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }else{
        router.push('/dashboard')
      }
      
      const data = await response.json();
      console.log("Login success:", data);
    } catch (err) {
      console.error("Error logging in:", err);
    }
  }

  return (
    <div className="login_outer">
      
          <form method="POST" className="login_cont" onSubmit={login}>

      
              <input type="text" className="username_input" 
              placeholder="username" value={username} autoComplete="username"
              required name="username"
              onChange={(e) => setUsername(e.target.value)}></input>

              <input type="password" className="password_input" 
              placeholder="password" value={password} autoComplete="current-password"
              required name="password"
              onChange={(e)=> setPassword(e.target.value)}></input>

              <button type="submit" className='submit_login'>
                Login
              </button>
          </form>
       
    </div>
  );
}

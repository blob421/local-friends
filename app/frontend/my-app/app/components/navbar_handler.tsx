'use client';
import Navbar from "./navbar"
import { usePathname } from 'next/navigation';

export default function Nav(){
  const path = usePathname();
  const unallowed = ['/'];
  if (!unallowed.includes(path)){
    return <Navbar />
  }
}
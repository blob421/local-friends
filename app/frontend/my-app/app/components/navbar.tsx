import Link from 'next/link';

export default function Navbar(){
    return (
        <nav className='nav_main'>
               <Link href={'/dashboard'}></Link>
        </nav>
    )
}
import React from 'react'
import { FileText, Home, Map, MapPin, UserRound } from 'lucide-react';
import Link from 'next/link';

function TabNavigateBar() {
  return (
    <div className='p-1 inline-flex w-full items-center justify-between text-center relative'>
        <Link href={"/"}>
            <Home className='w-24 text-center'/>
            <h5>홈</h5>
        </Link>
        <Link href={"/map"}>
            <MapPin className='w-24 text-center'/>
            <h5>주변 대피소</h5>
        </Link>
        <Link href={"/community-shelter"}>
            <FileText className='w-24 text-center'/>
            <h5>커뮤니티</h5>
        </Link>
        <Link href={"/profile"}>
            <UserRound className='w-24 text-center'/>
            <h5>마이</h5>
        </Link>
        </div>
  )
}

export default TabNavigateBar
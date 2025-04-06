import React from 'react'
import { FileText, Home, MapPin, UserRound } from 'lucide-react';
import Link from 'next/link';
import PATH from '../constants/PATH';

function TabNavigateBar() {
  return (
    <div className='p-1 inline-flex w-full items-center justify-between text-center relative'>
        <Link href={PATH.HOME}>
            <Home className='w-24 text-center'/>
            <h5>홈</h5>
        </Link>
        <Link href={PATH.MAP}>
            <MapPin className='w-24 text-center'/>
            <h5>주변 대피소</h5>
        </Link>
        <Link href={PATH.COMMUNITYSHELTER}>
            <FileText className='w-24 text-center'/>
            <h5>커뮤니티</h5>
        </Link>
        <Link href={PATH.PROFILE}>
            <UserRound className='w-24 text-center'/>
            <h5>마이</h5>
        </Link>
        </div>
  )
}

export default TabNavigateBar
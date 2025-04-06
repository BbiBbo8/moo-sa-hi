import React from 'react'
import { FileText, Home, Map, MapPin, UserRound } from 'lucide-react';

function TabNavigateBar() {
  return (
    <div className='p-1 inline-flex w-full items-center justify-between text-center relative'>
        <div>
            <Home className='w-24 text-center'/>
            <h5>홈</h5>
        </div>
        <div>
            <MapPin className='w-24 text-center'/>
            <h5>주변 대피소</h5>
        </div>
        <div>
            <FileText className='w-24 text-center'/>
            <h5>커뮤니티</h5>
        </div>
        <div>
            <UserRound className='w-24 text-center'/>
            <h5>마이</h5>
        </div>
        </div>
  )
}

export default TabNavigateBar
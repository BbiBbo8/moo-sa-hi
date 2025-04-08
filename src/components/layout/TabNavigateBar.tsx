import React from 'react'
import { FileText, Home, MapPin, UserRound } from 'lucide-react';
import Link from 'next/link';
import PATH from '@/constants/PATH';

function TabNavigateBar() {
  return (
    <div className="bg-accent fixed bottom-0 z-50 inline-flex w-full items-center justify-evenly p-1 text-center">
      <Link href={PATH.HOME}>
        {/* 랜딩 페이지(홈)으로 이동 */}
        <Home className="w-12 text-center" />
        <h5 className="text-xs">홈</h5>
      </Link>
      <Link href={PATH.MAP}>
        {/* 지도 페이지로 이동 */}
        <MapPin className="ml-2 w-12 text-center" />
        <h5 className="text-xs">대피소 지도</h5>
      </Link>
      <Link href={PATH.COMMUNITYSHELTER}>
        {/* 커뮤니티 (기본은 대피소 커뮤니티)로 이동 */}
        <FileText className="w-12 text-center" />
        <h5 className="text-xs">커뮤니티</h5>
      </Link>
      <Link href={PATH.PROFILE}>
        {/* 마이페이지로 이동 */}
        <UserRound className="w-12 text-center" />
        <h5 className="text-xs">마이</h5>
      </Link>
    </div>
  );
}

export default TabNavigateBar;

import React from "react";

// 스타일 시간 자세하게 나오면 완벽 구현예정
function PostCreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-4">
        {/* 여기에 사이드바 같은 거 넣을 수 있어 */}
        <p>Dashboard Sidebar</p>
      </aside>

      <main className="flex-1 p-4">
        {/* 여기가 실제 페이지 내용이 들어가는 자리 */}
        {children}
      </main>
    </div>
  );
}

export default PostCreateLayout;

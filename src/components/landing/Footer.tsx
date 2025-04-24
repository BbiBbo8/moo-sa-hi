const Footer = () => {
    return (
      <footer className="py-8 text-center text-[#777] text-[12px]">
        <div className="max-w-screen-md mx-auto px-4">
          <div className="mb-6">
            <span className="mr-4 text-[#666666]">이용 약관</span>
            <span className="mr-4 text-[#666666]">|</span>
            <span className="mr-4 text-[#666666]">개인정보처리방침</span>
            <span className="mr-4 text-[#666666]">|</span>
            <span>프로젝트 소개</span>
          </div>
          <p className="">
            <span className="text-[#999999] mr-1">e-mail</span>
            <span className="text-[#666666]">musahi@safe.kr</span>
          </p>
          <p className="mb-4">
            <span className="text-[#999999] mr-1">Github</span>
            <span className="text-[#666666]">github.com/BbiBbo8/moo-sa-hi</span>
          </p>
          <p className="mb-1 text-[#999999]">무사히는 실시간 대피소 정보를 제공하는 재난 대응 플랫폼입니다.</p>
          <p className="text-[#999999]">© 2025 MUSASHI. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
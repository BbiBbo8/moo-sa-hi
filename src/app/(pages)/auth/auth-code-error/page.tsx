const AuthCodeErrorPage = () => {
  return (
    <div className="flex h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-headlineM mb-2 font-bold">
          인증 중 오류가 발생했습니다
        </h1>
        <p className="text-gray-500">
          다시 로그인하거나 문제가 계속되면 관리자에게 문의해주세요.
        </p>
      </div>
    </div>
  );
};

export default AuthCodeErrorPage;

// PATH 객체 타입 정의
interface Path {
  HOME: string;
  SIGNIN: string;
  PROFILE: string;
  COMMUNITYSHELTER: string;
  COMMUNITYDAILY: string;
  MAP: string;
  CREATE: string;
}

// pathparameter를 상수화 
const PATH: Path = {
  HOME: "/",
  SIGNIN: "/sign-in",
  PROFILE: "/profile",
  COMMUNITYSHELTER: "/community-shelter",
  COMMUNITYDAILY: "/community-daily",
  MAP: "/map",
  CREATE: "/post-create",
};

export default PATH;

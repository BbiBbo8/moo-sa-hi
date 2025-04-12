// pathparameter를 상수화
const PATH = {
  HOME: "/",
  SIGNIN: "/sign-in",
  PROFILE: "/profile",
  COMMUNITYSHELTER: "/community-shelter",
  COMMUNITYDAILY: "/community-daily",
  MAP: "/map",
  CREATE: "/post-create",
} as const;

export default PATH;

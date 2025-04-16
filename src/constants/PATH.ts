// pathparameter를 상수화
const PATH = {
  HOME: "/",
  SIGNIN: "/sign-in",
  PROFILE: "/profile",
  COMMUNITYSHELTER: "/community-shelter",
  COMMUNITYDAILY: "/community-daily",
  MAP: "/map",
  CREATE: "/post-create",
  NICKNAME: "/auth/nickname",
  AUTHERROR: "/auth/auth-code-error",
} as const;

export default PATH;

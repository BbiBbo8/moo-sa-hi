"use client";

// QueryClientProvider는 내부적으로 useContext를 사용하기 때문에, 파일 맨 위에 'use client'를 작성해야 함
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR을 사용할 경우, 클라이언트에서 즉시 다시 요청되는 것을 막기 위해 기본 staleTime을 0보다 크게 설정하는 것이 일반적
        staleTime: 60 * 1000,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    // 서버에서는 항상 새로운 QueryClient 인스턴스를 생성함
    return makeQueryClient();
  } else {
    // 브라우저에서는 QueryClient가 아직 없을 경우에만 새로 생성
    // 이유 : 초기 렌더링 도중 React가 suspend되더라도 QueryClient가 다시 생성되지 않도록 하기 위해서다 (만약 QueryClient 생성 아래에 Suspense 경계가 있다면 이 로직은 필요 없을 수도 있음)
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const QueryProviders = ({ children }: { children: React.ReactNode }) => {
  // 주의: Suspense 경계가 없는데 이 컴포넌트보다 아래에서 suspend될 가능성이 있다면, query client 초기화 시 useState 사용 피하기 (초기 렌더링 도중 suspend가 발생하면 React가 만든 client 인스턴스를 버릴 수 있기 때문)
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProviders;

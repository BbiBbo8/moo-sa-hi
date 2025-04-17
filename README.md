<div align="center">
  <img alt="" src="" />
</div>


<br>
<br>

## 💬 프로젝트 소개
### 무사히
> 무사히 당신이 돌아갈 곳으로, 돌아갈 수 있도록. 무사히 잘 돌아와.

<br>

프로젝트 **무사히** 는 어떠한 재난 상황에서도 당신의 안전을 최우선으로 생각합니다.

#### 무사히의 핵심 기능

- **대피소 정보 제공**: 사용자는 재난 발생 시 인근 대피소의 위치와 정보를 실시간으로 확인할 수 있습니다.

- **커뮤니티 기능**: 사용자 간의 정보 공유와 소통을 위한 게시판 및 댓글 기능을 제공합니다.

- **위치 기반 서비스**: 사용자의 현재 위치를 기반으로 가장 가까운 대피소를 안내합니다.


#### 무사히의 장점

- **누구나** 로그인하지 않아도 **모든 정보**를 확인할 수 있습니다.
  
- 안전 문자로는 확인하기 어려운 **대피소 현황을 실시간**으로 확인할 수 있습니다.
  
- 재난 상황이 아니어도 **안전 관련 정보**를 확인할 수 있습니다.

<br/> 

 ### [지금 바로 확인하세요!](https://moo-sa-hi.vercel.app/)

<br />


## 👩‍👩‍👧‍👧 프로젝트 멤버 소개
<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/Sumin-Lee12">
        <img src="https://avatars.githubusercontent.com/u/189125496" width="80" alt="이수민"/>
        <br />
        <sub><b>Sumin-Lee12</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/Yuuuuu-kko">
        <img src="https://avatars.githubusercontent.com/u/192576701" width="80" alt="유경민"/>
        <br />
        <sub><b>Yuuuuu-kko</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/pnh135">
        <img src="https://avatars.githubusercontent.com/u/192573266" width="80" alt="박나현"/>
        <br />
        <sub><b>pnh135</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/33hyun">
        <img src="https://avatars.githubusercontent.com/u/192601063" width="80" alt="장현빈"/>
        <br />
        <sub><b>33hyun</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/dlfhrrl12">
        <img src="https://avatars.githubusercontent.com/u/166004807" width="80" alt="이록기"/>
        <br />
        <sub><b>lfhrrl12</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="mailto:jeongminyu70@gmail.com">
        <img src="https://ca.slack-edge.com/T06B9PCLY1E-U07RB1S8VQQ-274dad93bea9-512" width="80" alt="유정민"/>
        <br />
        <sub><b>designer</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td width="300px" align="center">
        프로젝트 총괄
        <br>커뮤니티 게시글 관리
      </td>
      <td width="300px" align="center">
        프로젝트 부총괄
        <br>게시글 작성 관리
      </td>
       <td width="300px" align="center">
        프로젝트 총괄
        <br>사용자 프로필 관리
      </td>
       <td width="300px" align="center">
        프로젝트 총괄
        <br>랜딩 페이지 관리
      </td>
       <td width="300px" align="center">
        프로젝트 총괄
        <br>지도 페이지 관리
      </td>
       <td width="300px" align="center">
        디자인 총괄
        <br>에셋 관리, 디자인
      </td>
    </tr>
  </tbody>
</table>

<br />

## ⚙ 프로젝트 기능 소개
- **Next.JS 기반 모바일 웹 애플리케이션**입니다.
- **TanStack Query**를 사용하여 비동기 데이터 요청 및 캐싱 기능으로 서버 데이터를 효율적으로 관리합니다.
- **Zustand**를 사용하여 모든 페이지에서 대피소 지도를 빠르게 처리합니다.
- 지도 사용 시 **GPS 기능**과 **검색 기능**을 제공합니다.
- **회원 정보 유효성 검사**를 통해 정확한 데이터가 저장되도록 합니다.
- **Tailwind CSS**를 사용하여 반응형 디자인을 적용하고, **앱 라우팅**을 이용해 페이지 간 네비게이션을 처리합니다.
- 로그인이 필요한 서비스의 경우 **ProtectedRoute**를 적용하여 비인가 사용자의 접근을 제한합니다.

<br />

📌 주요 기능 구현

**💬 커뮤니티 페이지 디자인 & 로직 (by 수민)**

- 일반/대피소 커뮤니티 UI 디자인

- 게시글 상세 페이지 디자인

- Supabase 데이터 fetch 및 연동

- 대피소 상세 페이지 디자인 (디자인 시안 반영)

- "유용해요" 버튼 로직 및 컴포넌트화

- 탭 네비게이션 (특정 페이지 진입 시 숨김)

- 커뮤니티 페이지 내 검색 기능 (제목 기준 필터링)

**📝 글 작성 페이지 (by 경민)**

- 탭 전환 UI: "대피소 글쓰기" / "일상 글쓰기" 탭 구현

- 폼 유효성 검사: react-hook-form + zod 기반, 제목/본문 글자 수 제한 및 실시간 글자 수 카운팅

- 혼잡도 / 청결도 선택 UI: 버튼형 UI, 선택 시 강조 처리

- 대피소 자동완성 검색:

  Supabase에서 대피소 리스트 불러와 필터링

  검색어 입력 시 자동완성 드롭다운 노출

  항목 클릭 시 form에 자동 입력 (form.setValue)

  너무 긴 리스트는 max-height 제한

- 이미지 업로드 (Drag & Drop):

- react-dropzone으로 드래그 & 클릭 업로드 지원

- 미리보기 제공, 현재 1장 → 최대 5장 업로드로 확장 예정

- Storage 업로드 → public URL 반환 → DB 저장 및 이미지 미리보기 처리

- Supabase images 테이블과 연동

- 위치 기반 기능 (초기 구현):

  브라우저 geolocation API로 현재 위치 수신

  Haversine 공식을 활용한 대피소와 거리 계산 로직 설계 중
  
  추후 거리순 정렬 및 가까운 대피소 추천에 활용 예정


**👤 마이페이지 & 커뮤니티 활동 (by 나현)**

- 유저 정보 조회: 로그인한 사용자의 정보 표시

- 커뮤니티 활동 조회: 내가 쓴 글 / 댓글 조회 가능

- 탭 네비게이션:

  페이지 간 이동 가능

  특정 페이지 진입 시 탭 숨김 처리

- 댓글 기능:

  각 게시글에 댓글 작성

  내가 작성한 댓글만 삭제 가능


**🧩 공통 기능 & API 관리 (by 현빈)**

- 공공 API 데이터 가공 및 통합 관리

- 소셜 로그인 (OAuth) 구현

- 랜딩페이지 전체 구성 및 디자인

- 공통 Header 컴포넌트 구현

- 대피소 상세 페이지 구현 및 외부 지도 연결

- 닉네임 수정 폼

- 글 공유 기능 (페이지 외부 공유 기능 구현)


**🗺️ 지도 페이지 (by 록기)**

- 민방위 대피소 마커 표시:

- 공공 API를 통해 대피소 데이터 수신

- Kakao Map에 마커 렌더링

- 현재 위치 기반 기능:

  사용자 현재 위치 탐지 및 지도 중심 설정

  대피소와 거리(km) 계산 후 표시

- Shelter 리스트 연동 (Drawer):

  하단 Drawer 형태의 리스트 구현

  마커 클릭 시 리스트에서 자동 스크롤 및 강조

  리스트 항목 클릭 시 지도 중심 이동

- 정렬 기능:

  거리순 / 이름순 정렬 가능

  Zustand 상태 업데이트를 통한 리스트 재정렬

- 검색 기능 (InputSearch):

  대피소 이름/주소 기반 실시간 필터링

  검색 결과 클릭 시 해당 위치로 이동

- 마커 클릭 이벤트:

  리스트 강조 및 scrollIntoView 적용

- 지도 UI 커스터마이징:

  Kakao Map 기본 컨트롤 위치 스타일 수정

<br>

## 🔗 협업 프로세스
- ### 페이지 단위 작업 관리
  - [깃헙 프로젝트](https://github.com/orgs/BbiBbo8/projects/1/views/1) 생성
  - 페이지별 feature 브랜치 운영 (`feat/#이슈번호-이슈명`, `style/#이슈번호-이슈명`)
- ### [Pull Request 템플릿을 활용한 코드 리뷰](여기에 pull request 주소 입력하기)

<br><br>

## 🚀 트러블 슈팅
- #### [Supabase OAuth 인증 트러블슈팅](https://velog.io/@33hyun/Supabase-OAuth-%EC%9D%B8%EC%A6%9D-%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85)
- #### [버튼 클릭에 따른 데이터 추가와 삭제?](https://velog.io/@suminlee0409/%EB%B2%84%ED%8A%BC-%ED%81%B4%EB%A6%AD-%EC%8B%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%B6%94%EA%B0%80%EC%99%80-%EC%B7%A8%EC%86%8C-%ED%81%B4%EB%A6%AD-%EC%8B%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%82%AD%EC%A0%9C-%EC%89%BD%EC%A7%80-%EB%9D%BC%EA%B3%A0-%EB%A7%90%ED%95%98%EB%8A%94-%EA%B3%BC%EA%B1%B0%EC%9D%98-%EB%82%98)



<br />

## 📁 프로젝트 구조
```markdown
📁
moo-sa-hi/
├── public/                 # 정적 이미지 파일
│   └── ...
├── src/                    # 소스 코드 루트
│   ├── app/                # Next.js App Router 구조
│   │   ├── layout.tsx      # 공통 레이아웃
│   │   ├── page.tsx        # 홈 페이지
│   │   └── (기타 경로)/    # 라우팅되는 각 페이지 폴더
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │   └── ...
│   ├── constants/          # 상수 정의
│   │   └── ...
│   ├── fonts/              # 사용하는 폰트
│   │   └── ...
│   ├── hooks/              # 커스텀 훅
│   │   └── ...
│   ├── libs/               # 외부 라이브러리 래퍼나 유틸 함수
│   │   └── ...
│   ├── providers/          # 전역 상태 provider 정의
│   │   └── ...
│   ├── store/              # zustand 스토어 
│   │   └── ...
│   ├── supabase/           # supabse api 정의 
│   │   └── ...
│   ├── types/              # 공통 타입 정의
│   │   └── ...
│   └── utils/              # 유틸리티 함수
│       └── ...

```

<br />

## 🧶 기술 스택
<div align="left">

### Design
<img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"/>

### Environment
<img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=https://upload.wikimedia.org/wikipedia/commons/a/a7/Visual_Studio_Code_1.35_icon.svg&logoColor=white" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
<br>

### Database
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"/>

### Development
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220" />
<img src="https://img.shields.io/badge/Tanstackquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/Zustand-82612C?style=for-the-badge&logo=&logoColor=white"/>      
<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white"/>
<img src="https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white"/>
<img src="https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge"/>
<img src="https://img.shields.io/badge/axios.js-854195?style=for-the-badge&logo=axios&logoColor=5A29E4"/>

</div>

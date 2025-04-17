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

> - **작업 기간** : 
> - **배포 주소** :

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
        <a href="https://github.com/dlfhrrl12">
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

## 💡 구현한 주요 기능
#### 1. 글 작성 페이지 전체 개발
- 대피소 글쓰기 / 일상 글쓰기 탭 전환 UI
- react-hook-form + zod 기반 유효성 검사
- 제목, 본문에 글자 수 제한 및 실시간 카운팅
- 혼잡도 / 청결도 버튼형 선택 UI (선택 강조 처리)
#### 2. 대피소 자동완성 검색 기능
- Supabase에서 대피소 리스트 불러와서 필터링
- 검색어 입력 시 자동완성 드롭다운 표시
- 리스트 클릭 시 선택된 대피소 자동입력 (form.setValue)
- 너무 긴 리스트는 max-height 제한
#### 3. 이미지 드래그 앤 드랍 업로드
- react-dropzone으로 드래그 & 클릭 업로드 모두 지원
- 업로드한 이미지 현재 1장 + 미리보기 제공  차후 5장 제한 처리
- Storage에 업로드 → public URL 반환 → 미리보기 및 DB 저장
- 이미지 URL을 images 테이블에 저장하며 글과 연동 예정
#### 4. 위치 기반 기능 (초기 구현)
- 브라우저 geolocation API를 통해 현재 위치 받아오기
- 대피소와 거리 계산을 위한 Haversine 공식 함수 작성 예정
- 이후 거리순 정렬 / 가까운 대피소 추천에 활용 예정


<br>

## 🔗 협업 프로세스
- ### 페이지 단위 작업 관리
  - [깃헙 프로젝트](https://github.com/orgs/BbiBbo8/projects/1/views/1) 생성
  - 페이지별 feature 브랜치 운영 (`feat/#이슈번호-이슈명`, `style/#이슈번호-이슈명`)
- ### [Pull Request 템플릿을 활용한 코드 리뷰](여기에 pull request 주소 입력하기)

<br><br>

## 🚀 트러블 슈팅
- #### [Read me 에 보여질 제목을 여기에 입력](트러블 슈팅 작성한 주소 여기에 입력)



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

</div>

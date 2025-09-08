# 디룩 (Delook)

> 성장하는 개발자를 위한 오픈소스 기반 지식 공유 플랫폼

<p align="center">
  <img width="600" src="public/images/og-image.png" alt="Delook OG Image Preview" />
</p>
<p align="center">
  <a href="https://www.delook.co.kr" target="_blank">
    <strong>Delook 바로가기</strong>
  </a>
</p>

디룩(Delook)은 브라우저 새 탭에서 프로그래밍 지식을 학습할 수 있도록 돕는 플랫폼입니다.

프로젝트가 마음에 드셨다면 `⭐️ star`로 응원해주세요!

## 기능 소개

- 접속할 때마다 랜덤한 프로그래밍 개념을 학습할 수 있습니다.
- 카테고리나 제목으로 원하는 개념을 쉽게 찾을 수 있습니다.
- 전체 아카이브 또는 북마크를 통해 관심 있는 개념만 모아볼 수 있습니다.
- 개념 설명과 함께 예시를 확인할 수 있어 이해를 도와줍니다.

## 기술 스택

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Platform**: Chrome Extension, Web
- **Infra / Deployment**: AWS S3, CloudFront
- **Version Manager** : volta

## 개발 환경 설정

이 프로젝트는 **volta**와 **yarn**을 사용합니다.

volta를 통해 Node.js와 Yarn 버전을 고정하여, 모든 개발자가 동일한 환경에서 작업할 수 있도록 합니다.

1. volta 가 설치되지 않았다면 설치해주세요. ([참고](https://docs.volta.sh/guide/getting-started))

2. 패키지 설치

   ```bash
   yarn install
   ```

3. 개발 서버 실행

   ```bash
   yarn dev
   ```

## 배포 플로우

- `main` 브랜치에 병합 후 `production` 브랜치를 통해 배포가 진행됩니다.
- 웹사이트와 크롬 스토어 배포가 동시에 이루어지며, 크롬 스토어의 경우 심사 기간(약 2일)으로 인해 배포 시점에 차이가 있을 수 있습니다.

---

기능 제안이나 UI 개선은 [Issues](https://github.com/delook-dev/delook/issues) 또는 [Discussions](https://github.com/delook-dev/delook/discussions)을 통해 남겨주시면 관리자가 검토 후 작업하도록 하겠습니다.

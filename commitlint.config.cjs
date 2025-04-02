module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 빌드 시스템 또는 외부 종속성 변경
        'chore', // 코드 변경 없이 설정 수정, 스크립트 업데이트 등 유지보수 작업
        'ci', // CI/CD 설정 변경
        'docs', // 문서 변경 (기여시 해당 메세지 작성)
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'enhancement', //기존 기능 개선
        'perf', // 성능 개선
        'refactor', // 코드 리팩토링 (기능 변경 없이 코드 구조 개선)
        'revert', // 이전 커밋 되돌리기 (git revert 실행 후 커밋)
        'style', // 스타일 변경
        'test', // 테스트 코드 추가 또는 수정
        'add', // 파일 추가
      ],
    ],
  },
};

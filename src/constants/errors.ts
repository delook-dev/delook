const ERROR_MSG = {
  NOT_FOUND: {
    HEADING: '요청하신 페이지를 찾을 수 없습니다.',
    BODY: '페이지가 존재하지 않거나 삭제되었습니다.',
    BUTTON: '홈으로 이동',
  },
  INTERNAL_SERVER_ERROR: {
    HEADING: '페이지를 불러오는 중 문제가 발생했습니다.',
    BODY: '잠시 후 다시 시도해주세요.',
    BUTTON: '재시도',
  },
  BAD_REQUEST: {
    HEADING: '요청이 올바르지 않습니다.',
    BODY: '입력한 내용을 확인한 후 다시 시도해주세요.',
    BUTTON: '홈으로 이동',
  },
} as const;

export { ERROR_MSG };

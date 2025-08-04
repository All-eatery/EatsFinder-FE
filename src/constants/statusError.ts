export type StatusErrorType = {
  [key: number]: {
    status: number;
    numbering: number[];
    msg: {
      title: string;
      description: string[];
    };
  };
};

export const statusError: StatusErrorType = {
  403: {
    status: 403,
    numbering: [4, 3],
    msg: {
      title: '권한이 없는 페이지에요',
      description: [
        '권한이 없거나, 사용할 수 없는 페이지에요.',
        '로그인 정보를 다시 한번 확인해주세요.',
      ],
    },
  },
  404: {
    status: 404,
    numbering: [4, 4],
    msg: {
      title: '찾으시는 페이지가 없어요',
      description: [
        '잘못된 접근이거나 요청하신 페이지를 찾을 수 없어요.',
        '입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.',
      ],
    },
  },
  500: {
    status: 500,
    numbering: [5, 0],
    msg: {
      title: '서비스에 접속할 수 없어요',
      description: [
        '기술적인 문제로 일시적으로 서비스에 접속할 수 없어요',
        '잠시 후 다시 시도해주세요.',
      ],
    },
  },
};

import { Active } from '@/types/authType';

export const activeDummyData: Active[] = [
  {
    data: [
      {
        type: 'postLike',
        postLike: {
          postId: 1,
          createdBy: {
            postUserNickname: 'john_doe',
            postImageUrl: 'https://picsum.photos/id/1011/200/200',
          },
          postContent: 'Loved this restaurant, highly recommend!',
        },
        createdAt: '2024-09-01',
      },
    ],
  },
  {
    data: [
      {
        type: 'commentLike',
        commentLike: {
          postId: 2,
          commentId: 12,
          createdBy: {
            commentUserNickname: 'jane_smith',
            commentUserImageUrl: 'https://picsum.photos/id/1025/200/200',
          },
          commentContent: 'Great review, I agree with you!',
        },
        createdAt: '2024-09-02',
      },
    ],
  },
  {
    data: [
      {
        type: 'comment',
        comment: {
          id: 3,
          postId: 13,
          postDeletedAt: 0,
          createdBy: {
            postUserNickname: 'alice_lee',
            postImageUrl: 'https://picsum.photos/id/1035/200/200',
          },
          content: 'The service here was fantastic, will come again!',
        },
        createdAt: '2024-09-03',
      },
    ],
  },
  {
    data: [
      {
        type: 'postLike',
        postLike: {
          postId: 4,
          createdBy: {
            postUserNickname: 'mark_taylor',
            postImageUrl: 'https://picsum.photos/id/1045/200/200',
          },
          postContent: 'The atmosphere was cozy and welcoming.',
        },
        createdAt: '2024-09-04',
      },
    ],
  },
  {
    data: [
      {
        type: 'commentLike',
        commentLike: {
          postId: 5,
          commentId: 32,
          createdBy: {
            commentUserNickname: 'emma_wilson',
            commentUserImageUrl: 'https://picsum.photos/id/1055/200/200',
          },
          commentContent: 'Totally agree! This place is a hidden gem.',
        },
        createdAt: '2024-09-05',
      },
    ],
  },
  {
    data: [
      {
        type: 'comment',
        comment: {
          id: 6,
          postId: 21,
          postDeletedAt: 0,
          createdBy: {
            postUserNickname: 'lucas_jones',
            postImageUrl: 'https://picsum.photos/id/1065/200/200',
          },
          content: 'Had the best dessert here, highly recommend!',
        },
        createdAt: '2024-09-06',
      },
    ],
  },
  {
    data: [
      {
        type: 'postLike',
        postLike: {
          postId: 7,
          createdBy: {
            postUserNickname: 'sophia_brown',
            postImageUrl: 'https://picsum.photos/id/1075/200/200',
          },
          postContent: 'The pasta was out of this world!',
        },
        createdAt: '2024-09-07',
      },
    ],
  },
  {
    data: [
      {
        type: 'commentLike',
        commentLike: {
          postId: 8,
          commentId: 45,
          createdBy: {
            commentUserNickname: 'liam_white',
            commentUserImageUrl: 'https://picsum.photos/id/1085/200/200',
          },
          commentContent: 'Definitely worth a visit, great food!',
        },
        createdAt: '2024-09-08',
      },
    ],
  },
  {
    data: [
      {
        type: 'comment',
        comment: {
          id: 9,
          postId: 11,
          postDeletedAt: 0,
          createdBy: {
            postUserNickname: 'olivia_thompson',
            postImageUrl: 'https://picsum.photos/id/1095/200/200',
          },
          content: 'Best brunch spot in town, hands down.',
        },
        createdAt: '2024-09-09',
      },
    ],
  },
  {
    data: [
      {
        type: 'postLike',
        postLike: {
          postId: 10,
          createdBy: {
            postUserNickname: 'noah_martin',
            postImageUrl: 'https://picsum.photos/id/1105/200/200',
          },
          postContent: 'The ambiance here was perfect for a date night.',
        },
        createdAt: '2024-09-10',
      },
    ],
  },
  {
    data: [
      {
        type: 'commentLike',
        commentLike: {
          postId: 11,
          commentId: 67,
          createdBy: {
            commentUserNickname: 'mia_clark',
            commentUserImageUrl: 'https://picsum.photos/id/1115/200/200',
          },
          commentContent: 'Such a detailed and helpful review!',
        },
        createdAt: '2024-09-11',
      },
    ],
  },
  {
    data: [
      {
        type: 'comment',
        comment: {
          id: 12,
          postId: 23,
          postDeletedAt: 0,
          createdBy: {
            postUserNickname: 'jackson_bell',
            postImageUrl: 'https://picsum.photos/id/1125/200/200',
          },
          content: "The flavors were incredible, can't wait to return!",
        },
        createdAt: '2024-09-12',
      },
    ],
  },
  {
    data: [
      {
        type: 'postLike',
        postLike: {
          postId: 13,
          createdBy: {
            postUserNickname: 'ava_davis',
            postImageUrl: 'https://picsum.photos/id/1135/200/200',
          },
          postContent: "Absolutely delicious, best meal I've had in a while.",
        },
        createdAt: '2024-09-13',
      },
    ],
  },
  {
    data: [
      {
        type: 'commentLike',
        commentLike: {
          postId: 14,
          commentId: 89,
          createdBy: {
            commentUserNickname: 'william_hall',
            commentUserImageUrl: 'https://picsum.photos/id/1145/200/200',
          },
          commentContent:
            "Great insights! I'll definitely check this place out.",
        },
        createdAt: '2024-09-14',
      },
    ],
  },
  {
    data: [
      {
        type: 'comment',
        comment: {
          id: 15,
          postId: 32,
          postDeletedAt: 0,
          createdBy: {
            postUserNickname: 'amelia_johnson',
            postImageUrl: 'https://picsum.photos/id/1155/200/200',
          },
          content: 'This place has the best coffee in the city!',
        },
        createdAt: '2024-09-15',
      },
    ],
  },
  {
    data: [
      {
        type: 'postLike',
        postLike: {
          postId: 16,
          createdBy: {
            postUserNickname: 'lucas_moore',
            postImageUrl: 'https://picsum.photos/id/1165/200/200',
          },
          postContent: "Fantastic food and service, can't wait to come back.",
        },
        createdAt: '2024-09-16',
      },
    ],
  },
  {
    data: [
      {
        type: 'commentLike',
        commentLike: {
          postId: 17,
          commentId: 54,
          createdBy: {
            commentUserNickname: 'sophia_miller',
            commentUserImageUrl: 'https://picsum.photos/id/1175/200/200',
          },
          commentContent: 'Really helpful review, thanks for sharing!',
        },
        createdAt: '2024-09-17',
      },
    ],
  },
  {
    data: [
      {
        type: 'comment',
        comment: {
          id: 18,
          postId: 45,
          postDeletedAt: 0,
          createdBy: {
            postUserNickname: 'ethan_williams',
            postImageUrl: 'https://picsum.photos/id/1185/200/200',
          },
          content: 'The food was incredible, and the service was top-notch.',
        },
        createdAt: '2024-09-18',
      },
    ],
  },
  {
    data: [
      {
        type: 'postLike',
        postLike: {
          postId: 19,
          createdBy: {
            postUserNickname: 'isabella_martinez',
            postImageUrl: 'https://picsum.photos/id/1195/200/200',
          },
          postContent: 'Highly recommend for a family dinner!',
        },
        createdAt: '2024-09-19',
      },
    ],
  },
  {
    data: [
      {
        type: 'commentLike',
        commentLike: {
          postId: 20,
          commentId: 78,
          createdBy: {
            commentUserNickname: 'mason_anderson',
            commentUserImageUrl: 'https://picsum.photos/id/1205/200/200',
          },
          commentContent: 'Really detailed, thanks for the recommendation!',
        },
        createdAt: '2024-09-20',
      },
    ],
  },
  {
    data: [
      {
        type: 'comment',
        comment: {
          id: 21,
          postId: 65,
          postDeletedAt: 0,
          createdBy: {
            postUserNickname: 'mia_thomas',
            postImageUrl: 'https://picsum.photos/id/1215/200/200',
          },
          content: 'The portions were generous, will come back soon!',
        },
        createdAt: '2024-09-21',
      },
    ],
  },
  {
    data: [
      {
        type: 'postLike',
        postLike: {
          postId: 22,
          createdBy: {
            postUserNickname: 'james_hernandez',
            postImageUrl: 'https://picsum.photos/id/1225/200/200',
          },
          postContent: "Amazing flavors, can't wait to visit again!",
        },
        createdAt: '2024-09-22',
      },
    ],
  },
  {
    data: [
      {
        type: 'commentLike',
        commentLike: {
          postId: 23,
          commentId: 98,
          createdBy: {
            commentUserNickname: 'charlotte_rodriguez',
            commentUserImageUrl: 'https://picsum.photos/id/1235/200/200',
          },
          commentContent: 'The ambiance sounds fantastic, thanks for sharing!',
        },
        createdAt: '2024-09-23',
      },
    ],
  },
  {
    data: [
      {
        type: 'comment',
        comment: {
          id: 24,
          postId: 76,
          postDeletedAt: 0,
          createdBy: {
            postUserNickname: 'oliver_lee',
            postImageUrl: 'https://picsum.photos/id/1245/200/200',
          },
          content: 'Best vegetarian options in the area, highly recommend!',
        },
        createdAt: '2024-09-24',
      },
    ],
  },
  {
    data: [
      {
        type: 'postLike',
        postLike: {
          postId: 25,
          createdBy: {
            postUserNickname: 'harper_walker',
            postImageUrl: 'https://picsum.photos/id/1255/200/200',
          },
          postContent: 'A must-try for seafood lovers!',
        },
        createdAt: '2024-09-25',
      },
    ],
  },
  {
    data: [
      {
        type: 'commentLike',
        commentLike: {
          postId: 26,
          commentId: 110,
          createdBy: {
            commentUserNickname: 'liam_scott',
            commentUserImageUrl: 'https://picsum.photos/id/1265/200/200',
          },
          commentContent: 'Appreciate the recommendation, will visit soon!',
        },
        createdAt: '2024-09-26',
      },
    ],
  },
  {
    data: [
      {
        type: 'comment',
        comment: {
          id: 27,
          postId: 82,
          postDeletedAt: 0,
          createdBy: {
            postUserNickname: 'ella_green',
            postImageUrl: 'https://picsum.photos/id/1275/200/200',
          },
          content: 'The desserts were to die for, amazing experience!',
        },
        createdAt: '2024-09-27',
      },
    ],
  },
  {
    data: [
      {
        type: 'postLike',
        postLike: {
          postId: 28,
          createdBy: {
            postUserNickname: 'jackson_king',
            postImageUrl: 'https://picsum.photos/id/1285/200/200',
          },
          postContent: 'Perfect place for a quiet, romantic dinner.',
        },
        createdAt: '2024-09-28',
      },
    ],
  },
  {
    data: [
      {
        type: 'commentLike',
        commentLike: {
          postId: 29,
          commentId: 145,
          createdBy: {
            commentUserNickname: 'logan_wright',
            commentUserImageUrl: 'https://picsum.photos/id/1295/200/200',
          },
          commentContent: 'Sounds like an amazing experience, thanks!',
        },
        createdAt: '2024-09-29',
      },
    ],
  },
  {
    data: [
      {
        type: 'comment',
        comment: {
          id: 30,
          postId: 92,
          postDeletedAt: 0,
          createdBy: {
            postUserNickname: 'ava_harris',
            postImageUrl: 'https://picsum.photos/id/1305/200/200',
          },
          content: 'Had a wonderful time, the service was impeccable!',
        },
        createdAt: '2024-09-30',
      },
    ],
  },
];

export type UserDatatype = {
  id: number;
  nickname: string;
  email: string;
  phoneNumber?: string;
  profileImage: string;
  followingCount: number;
  followerCount: number;
  postCount: number;
  userType?: string;
};
export type UserProfile = {
  userData: UserDatatype;
};
export type ProfileProps = {
  loggedInUserId?: number;
  isOwnProfile: boolean;
  userId: number;
};

export type ProfilePageProps = {
  loggedInUserId?: number;
  userData: UserDatatype;
  isOwnProfile: boolean;
};
export type LoginFormType = {
  email: string;
  password: string;
};
export type SignupFormType = {
  name: string;
  phoneNumber: string;
  email: string;
  code: string;
  codeValidation: boolean;
  password: string;
  passwordCheck: string;
  nickname: string;
  nicknameDuplicated: boolean;
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
};
export type ProfileEditType = {
  nickname: string;
  phoneNumber: string;
  profileImage: string;
  // profileImage: File | Blob;
};
export type ChagePasswordType = {
  password: string;
  passwordCheck: string;
};
export type SignupType = Omit<
  SignupFormType,
  | 'passwordCheck'
  | 'code'
  | 'acceptTerms'
  | 'acceptPrivacyPolicy'
  | 'codeValidation'
  | 'nicknameDuplicated'
>;
export type EmailConfirmType = {
  email: string;
  code: string;
};
export type DeleteAccountType = {
  deleteReason: string[];
  email: string;
  code: string;
  codeValidation: boolean;
  agreed: boolean;
  etcReason?: string;
};
export type searchParams = {
  params?: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
export interface CookieOptions {
  domain?: string | undefined;
  expires?: number | Date | undefined;
  httpOnly?: boolean | undefined;
  maxAge?: number | undefined;
  name?: string | undefined;
  partitioned?: boolean | undefined;
  path?: string | undefined;
  priority?: 'medium' | 'low' | 'high' | undefined;
  sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean | undefined;
  value?: string | undefined;
}
export enum ReasonForAccountDeletion {
  Unavailability = '원하는 맛집을 못찾았어요.',
  Infrequent = '자주 이용하지 않아요.',
  Privacy = '개인 정보 문제가 걱정돼요.',
  Inconvenience = '서비스 사용성이 불편해요.',
  Switching = '다른 서비스를 이용하고 있어요.',
}
export type FeedDataType = {
  postId: number;
  thumbnailUrl: string;
  placeName: string;
  content: string;
  createdAt: string;
};
export type PaginationType = {
  totalItems: number;
  itemsPerPage: number;
  totalPage: number;
  currentPage: number;
  isLastPage: boolean;
};

export type PaginationFeedType = {
  data: FeedDataType[];
  pagination: PaginationType;
};
export type PaginationActiveType = {
  data: ActiveDataType[];
  pagination: PaginationType;
};
export type ActiveType =
  | 'POST_LIKES'
  | 'COMMENT_LIKES'
  | 'COMMENT'
  | 'REPLY'
  | 'REPLY_LIKES';

export type ActiveDataType = {
  type: ActiveType;
  comment: ActiveCommentType | null;
  commentLike: ActiveCommentLikeType | null;
  postLike: ActivePostLikeType | null;
  createdAt: string;
  reply: ActiveReplyType | null;
  replyLike: ActiveReplyLikeType | null;
};
export type ActiveDataItemType = {
  type: ActiveType;
  comment: ActiveCommentType | null;
  commentLike: ActiveCommentLikeType | null;
  postLike: ActivePostLikeType | null;
  createdAt: string;
  reply: ActiveReplyType | null;
  replyLike: ActiveReplyLikeType | null;
};
export type ActivePostLikeType = {
  postId: number; //좋아요 누른 포스트 id
  createdBy: {
    // 포스트 작성자
    postUserNickname: string;
    postImageUrl: string;
  };
  postContent: string; //좋아요 누른 포스트 id
};
export type ActiveCommentLikeType = {
  postId: number; //댓글이 달린 게시글 id
  commentId: number; //댓글 id
  createdBy: {
    //댓글 작성자 id
    commentUserNickname: string;
    commentUserImageUrl: string;
  };
  commentContent: string; //댓글 내용
};
export type ActiveCommentType = {
  id: number; //댓글 고유 id
  postId: number; //댓글 단 게시글 id
  postDeletedAt: string | null;
  createdBy: {
    //누구 게시글인지
    postUserNickname: string;
    postImageUrl: string;
  };
  content: string; //댓글 내용
};
export type ActiveReplyType = {
  id: number; //답글 고유 id
  commentId: number; //댓글 id
  commentDeletedAt: string | null;
  createdBy: {
    //누구 댓글인지
    replyUserNickname: string;
    replyImageUrl: string;
  };
  content: string; //남긴 댓글
};
export type ActiveReplyLikeType = {
  replyId: number; //대댓좋아요 고유 아이디
  createdBy: {
    //누구 대댓인지
    replyUserNickname: string;
    replyImageUrl: string;
  };
  replyContent: string; //좋아요누른 답글
};

export type SimplifiedData = {
  type: string;
  id: number;
  postId: number;
  postUserNickname: string;
  postImageUrl: string;
  typeMessage: string;
  content?: string;
  createdAt: string;
};
export type FollowingDataType = {
  followingUserId: string;
  followingUserNickname: string;
  imageUrl: string;
};

export type FollowerDataType = {
  followerUserId: string;
  followerUserNickname: string;
  imageUrl: string;
};

export type FollowDataType = FollowingDataType | FollowerDataType;
export type FollowStatusType = {
  followUserId: number;
  followUserNickname: string;
  imageUrl: string;
  isFollowed: boolean;
};
export type FollowAPIType = {
  profileId: number;
  myId: number;
  follow: 'following' | 'follower';
};
export type FollowType = {
  id: number;
  type: 'follow' | 'unfollow';
};
export type SocialActionsType = {
  id: number;
  type: 'reply' | 'post' | 'comment' | 'follow';
  method: 'connect' | 'disconnect';
};

export type MyfeedCardProps = {
  data: FeedDataType;
  isOwnProfile: boolean;
};

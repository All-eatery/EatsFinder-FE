export interface CommentType {
  id: number;
  nickname: string;
  profileImage: string | null;
  content: string;
  likeCount: number;
  isMyComment: boolean;
  createdAt: string;
}

export interface CommentLikeType {
  id: number;
  postPlaceName: string;
  postedUser: string;
  commentedUser: string;
  commentContent: string;
  commentLikesCount: number;
}

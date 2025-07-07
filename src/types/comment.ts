export interface CommentType {
  id: number;
  nickname: string;
  profileImage: string | null;
  content: string;
  likeCount: number;
  isMyComment: boolean;
  likeStatus: boolean;
  authorStatus: boolean;
  createdAt: string;
  isUpdated: boolean;
  totalReplyCount?: number;
  replies?: Omit<CommentType, 'replies' | 'totalReplyCount'>[];
}

export interface CommentLikeType {
  id: number;
  postPlaceName: string;
  postedUser: string;
  commentedUser: string;
  commentContent: string;
  commentLikesCount: number;
}

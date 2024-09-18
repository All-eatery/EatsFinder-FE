export interface CommentType {
  id: number;
  nickname: string;
  profileImage: string | null;
  content: string;
  likeCount: number;
  isMyComment: boolean;
  createdAt: string;
}

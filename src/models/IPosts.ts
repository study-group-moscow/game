export interface IPost extends IPostRequest {
  id: number;
}

export interface IPostRequest {
  content: string;
  idPost?: number;
  likes: Array<number>;
  user_id: number;
  username: string;
  isLike: boolean;
}

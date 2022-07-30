export interface IPost extends IPostRequest {
  id: number;
  post_id: number;
  name: string;
}

export interface IPostItem extends IPostRequest {
  id: string;
  post_id: number;
  name: string;
}

export interface IPostRequest {
  content: string;
  likes: Array<number>;
  islike: boolean;
  user_id: number;
}

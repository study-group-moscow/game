export interface IPost extends IPostRequest {
  id: number;
  first_name: string;
}

export interface IPostRequest {
  content: string;
  likes: Array<number>;
  user_id: number;
}

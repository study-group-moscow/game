export interface IPost extends IPostRequest {
  post_id: number;
  name: string;
}
// { id: 15, content: 'asdsa', likes: [], islike: false, user_id: 16162 }
// { id: 16, content: 'asdsad', likes: [], islike: false, user_id: 16162 }

export interface IPostRequest {
  id: number;
  content: string;
  likes: Array<number>;
  islike: boolean;
  user_id: number;
}

export interface IPostRequest2 {
  id: number;
  content: string;
  likes: Array<number>;
  islike: boolean;
  userId: number;
}

import { IEditUserProfileForumParams } from './IUser';

export interface IPost extends IPostDefault {
  id: number;
}

export interface IPostDefault {
  content: string;
  likes: Array<number>;
  user: IEditUserProfileForumParams,
  user_id: number;
}
export interface IPostRequest {
  content: string;
  likes: Array<number>;
  user_id: number;
}

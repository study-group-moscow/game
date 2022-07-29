import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IPost } from '../../models/IPosts';

interface IPostsProps {
  posts: IPost[];
}

const initialState: IPostsProps = {
  posts: []
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts = [...state.posts, action.payload];
    },
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    }
  }
})

export const { addPost, setPosts } = postsSlice.actions;

export default postsSlice.reducer

export const selectCurrentStatePosts = (state: RootState) => state.postsReducer;


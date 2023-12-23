import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BLOG_URL = "/blog";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (blogData) => ({
        url: `${BLOG_URL}`,
        method: "POST",
        data: blogData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    getAllBlogs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BLOG_URL}`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    getSingleBlog: build.query({
      query: (id: string) => ({
        url: `${BLOG_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    likeBlog: build.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/like/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    removeLikeBlog: build.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/remove-like/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    commentOnBlog: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.id}/comment`,
        method: "POST",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    replayOnComment: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.blogId}/comment/${data.commentId}/replay`,
        method: "POST",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    deleteComment: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.blogId}/comment/${data.commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    deleteReply: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.blogId}/comment/${data.commentId}/replay/${data.replayId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    updateComment: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.blogId}/comment/${data.commentId}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    updateReply: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.blogId}/comment/${data.commentId}/replay/${data.replayId}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useLikeBlogMutation,
  useRemoveLikeBlogMutation,
  useCommentOnBlogMutation,
  useReplayOnCommentMutation,
  useDeleteCommentMutation,
  useDeleteReplyMutation,
  useUpdateCommentMutation,
  useUpdateReplyMutation,
} = blogApi;

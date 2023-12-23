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
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useLikeBlogMutation,
  useRemoveLikeBlogMutation,
} = blogApi;

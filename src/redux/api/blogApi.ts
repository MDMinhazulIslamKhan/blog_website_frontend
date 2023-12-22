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
  }),
});

export const { useCreateBlogMutation, useGetAllBlogsQuery } = blogApi;

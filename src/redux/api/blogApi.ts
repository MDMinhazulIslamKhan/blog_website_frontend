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
  }),
});

export const { useCreateBlogMutation } = blogApi;

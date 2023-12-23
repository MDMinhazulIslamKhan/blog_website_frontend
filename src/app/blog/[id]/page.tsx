"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import LikeOutline from "@/components/Icon/LikeOutline";
import LikeSolid from "@/components/Icon/LikeSolid";
import Loading from "@/components/Loading/Loading";
import {
  useCommentOnBlogMutation,
  useGetSingleBlogQuery,
  useLikeBlogMutation,
  useRemoveLikeBlogMutation,
  useReplayOnCommentMutation,
} from "@/redux/api/blogApi";
import { useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BlogDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data, isLoading } = useGetSingleBlogQuery(params.id);
  if (data?.statusCode == 500) {
    window.alert(data.message);
    router.push("/");
  }
  const checkLike = data?.data?.likes?.find((l: string) => {
    return l == getUserInfo()?.id;
  });
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const [likeBlog] = useLikeBlogMutation(undefined);
  const [removeLikeBlog] = useRemoveLikeBlogMutation(undefined);
  const [commentOnBlog] = useCommentOnBlogMutation(undefined);
  const [replayOnComment] = useReplayOnCommentMutation(undefined);
  const likePost = async () => {
    if (isLogin) {
      await likeBlog(data?.data?._id);
    } else {
      window.alert("Please login...");
      router.push("/login");
    }
  };
  const removeLikePost = async () => {
    if (isLogin) {
      await removeLikeBlog(data?.data?._id);
    } else {
      window.alert("Please login...");
      router.push("/login");
    }
  };
  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const textValue = form.elements.namedItem("text") as HTMLInputElement;

    if (isLogin) {
      const res: any = await commentOnBlog({
        data: { text: textValue.value },
        id: data?.data?._id,
      });
      window.alert(res?.data?.message);
      textValue.value = "";
    } else {
      window.alert("Please login...");
      router.push("/login");
    }
  };
  const submitReplay = async (
    e: React.FormEvent<HTMLFormElement>,
    commentId: string
  ) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const textValue = form.elements.namedItem("text") as HTMLInputElement;

    if (isLogin) {
      const res: any = await replayOnComment({
        data: { text: textValue.value },
        blogId: data?.data?._id,
        commentId: commentId,
      });
      window.alert(res?.data?.message);
      textValue.value = "";
    } else {
      window.alert("Please login...");
      router.push("/login");
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center pt-20">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:m-8 m-3">
            <div className="flex flex-col justify-center items-center">
              <Image
                src={data?.data?.imgUrl}
                width={1200}
                height={1200}
                alt={data?.data?.name}
                className="rounded-2xl sm:h-96 h-80 mt-3"
              />

              <div className="flex justify-between items-center px-5 w-full">
                <small className="font-semibold block">
                  # {data?.data?.creatorId?.name}
                </small>
                <div className="text-primary cursor-pointer">
                  {checkLike ? (
                    <div
                      className="inline hover:text-green-500"
                      onClick={() => removeLikePost()}
                    >
                      <LikeSolid /> {"  "}
                      <small className="inline-block">
                        Likes {data?.data?.likes?.length}
                      </small>
                    </div>
                  ) : (
                    <div
                      className="inline hover:text-green-500"
                      onClick={() => likePost()}
                    >
                      <LikeOutline />
                      {"  "}
                      <small className="inline-block">
                        Likes {data?.data?.likes?.length}
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-2 sm:ml-5 mt-5">
              <h2 className="font-bold text-2xl text-primary text-center mb-4">
                {data?.data?.title}
              </h2>
              <div
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: data?.data?.description }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:m-8 m-3">
            <div className=""></div>
            <div className="col-span-2 sm:ml-5 mt-5 min-h-20">
              <h2 className="font-bold text-lg underline text-primary mb-2">
                Comment
              </h2>
              <form onSubmit={(e) => submitComment(e)} className="flex">
                <div className="w-full max-w-xs h-8 mb-1">
                  <input
                    type="text"
                    name="text"
                    required
                    className="bg-gray-50 border pl-2 border-primary rounded-lg block w-full"
                  />
                </div>
                <div className="ml-2">
                  <button
                    type="submit"
                    className="text-white hover:bg-secondary hover:text-primary bg-primary font-medium rounded-lg block px-1"
                  >
                    Comment
                  </button>
                </div>
              </form>
              <div className="">
                {data?.data?.comments?.map((comment: any, index: number) => (
                  <>
                    <p key={index} className="text-md">
                      {comment?.user?.name} :
                      <span className="text-primary"> {comment.text} </span>
                    </p>
                    <form
                      onSubmit={(e) => submitReplay(e, comment._id)}
                      className="flex ml-8 mt-2"
                    >
                      <div className="w-48 h-8 mb-0">
                        <input
                          type="text"
                          name="text"
                          required
                          className="bg-gray-50 border pl-2 border-primary rounded-lg block w-full"
                        />
                      </div>
                      <div className="ml-2 mb-0">
                        <button
                          type="submit"
                          className="text-white hover:bg-secondary hover:text-primary bg-primary font-medium rounded-lg block px-1"
                        >
                          Reply
                        </button>
                      </div>
                    </form>
                    <div className="ml-8">
                      {comment?.replies?.map((reply: any, index: number) => (
                        <p key={index} className="text-sm mb-2">
                          {reply?.user?.name} :
                          <span className="text-primary"> {reply.text} </span>
                        </p>
                      ))}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetails;

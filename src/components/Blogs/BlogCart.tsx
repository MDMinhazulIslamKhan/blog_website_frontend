import Image from "next/image";
import Link from "next/link";
import LikeSolid from "../Icon/LikeSolid";
import { getUserInfo } from "@/services/auth.service";
import LikeOutline from "../Icon/LikeOutline";
import {
  useLikeBlogMutation,
  useRemoveLikeBlogMutation,
} from "@/redux/api/blogApi";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const BlogCart = ({ blog }: { blog: any }) => {
  const router = useRouter();
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const [likeBlog] = useLikeBlogMutation(undefined);
  const [removeLikeBlog] = useRemoveLikeBlogMutation(undefined);
  const likePost = async () => {
    if (isLogin) {
      await likeBlog(blog?._id);
    } else {
      window.alert("Please login...");
      router.push("/login");
    }
  };
  const removeLikePost = async () => {
    if (isLogin) {
      await removeLikeBlog(blog?._id);
    } else {
      window.alert("Please login...");
      router.push("/login");
    }
  };
  const checkLike = blog?.likes?.find((l: string) => {
    return l == getUserInfo()?.id;
  });
  return (
    <div className="w-full bg-green-50 shadow-xl rounded-xl hover:scale-105 duration-700">
      <figure className="px-4 h-72 flex justify-center">
        <Image
          alt={blog?.title}
          width={500}
          height={500}
          src={blog?.imgUrl}
          className="rounded-xl h-64 mt-5"
        />
      </figure>
      <div className="flex justify-between px-5">
        <small className="text-start block"># {blog?.creatorId?.name}</small>
        <div className="text-primary hover:text-green-500">
          {checkLike ? (
            <div className="inline" onClick={() => removeLikePost()}>
              <LikeSolid />
            </div>
          ) : (
            <div className="inline" onClick={() => likePost()}>
              <LikeOutline />
            </div>
          )}
          {"  "}
          <small className="inline-block">{blog?.likes?.length} </small>
        </div>
      </div>
      <h2 className="font-bold text-xl my-5 text-center text-primary">
        {blog?.title}
      </h2>
      <div className="w-full px-4">
        <Link
          href={`/blog/${blog?._id}`}
          className="text-white hover:bg-secondary hover:text-primary bg-primary font-bold rounded-lg block w-full p-2 mb-5 text-center"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default BlogCart;

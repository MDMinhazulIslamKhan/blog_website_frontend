"use client";
import Loading from "@/components/Loading/Loading";
import { useGetSingleBlogQuery } from "@/redux/api/blogApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BlogDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data, isLoading } = useGetSingleBlogQuery(params.id);
  if (data?.statusCode == 500) {
    window.alert(data.message);
    router.push("/");
  }
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
              <small className="font-semibold pl-5 block">
                @{data?.data?.creatorId?.name}
              </small>
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
          <div>
            <h2 className="font-bold text-2xl text-primary text-center mb-4">
              {data?.data?.title}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetails;

import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCart = ({ blog }: { blog: any }) => {
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
      <small className="text-start pl-5 block"># {blog?.creatorId?.name}</small>
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

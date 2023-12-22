"use client";
import BlogCart from "@/components/Blogs/BlogCart";
import Loading from "@/components/Loading/Loading";
import { useGetAllBlogsQuery } from "@/redux/api/blogApi";
import { useDebounced } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

const Home = () => {
  const query: Record<string, any> = {};
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = pageNo;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllBlogsQuery({
    ...query,
  });
  useEffect(() => {
    if (data) {
      const calculatedTotalPage = Math.ceil(
        data?.meta?.count / data?.meta?.limit
      );
      setTotalPage(calculatedTotalPage);
    }
  }, [data]);

  const renderPageButtons = () => {
    const buttons = [];
    const numButtons = Math.max(totalPage, 1);
    for (let page = 1; page <= numButtons; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => setPageNo(page)}
          className={`
          ${"px-2 mt-1 py-1 border border-primary mx-1 font-bold rounded-lg"} 
          ${
            pageNo === page
              ? "bg-primary text-white"
              : "text-primary bg-secondary hover:bg-primary hover:text-white"
          }
        `}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };
  return (
    <div>
      <div className="bg-white items-center p-10">
        <h1 className="text-primary mt-2 mb-5 font-bold text-3xl font-serif text-center">
          All Blogs
          {isLoading && (
            <span className="ml-5 inline-block">
              <Loading />
            </span>
          )}
        </h1>
        <div className="w-full flex sm:flex-row flex-col items-center justify-end mb-2">
          <select
            className="border border-primary rounded-lg px-2 ml-3 w-30 w-40 mb-2 text-primary font-semibold"
            onChange={(e) => {
              setSortBy("createdAt");
              setSortOrder(e.target.value);
            }}
          >
            <option disabled selected>
              Sort By
            </option>
            <option value="desc">Latest Blog</option>
            <option value="asc">Old Blog</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="border border-primary rounded-lg px-2 mt-1 ml-3 w-30 w-40 mb-2 text-primary font-semibold"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 mb-5 gap-x-3 lg:gap-x-5 gap-y-8">
          {data?.data?.map((blog: any) => (
            <BlogCart key={blog?._id} blog={blog} />
          ))}
        </div>
      </div>
      {data?.data?.length != 0 && (
        <div className="mt-10 w-full flex flex-col sm:flex-row justify-center items-center mb-10">
          <div>
            <span className="text-primary font-semibold">Page No: </span>
            <div className="inline-block">{renderPageButtons()}</div>
          </div>
          <div className="ml-5">
            <select
              className="border border-primary rounded-lg px-2 sm:mt-1 mt-5 ml-3 w-30"
              onChange={(e) => {
                setSize(+e.target.value);
                setPageNo(1);
              }}
            >
              <option value="5 ">5</option>
              <option selected value="10">
                10
              </option>
              <option value="15">15</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

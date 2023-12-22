"use client";
import Form from "@/components/Forms/Form";
import FormImageInput from "@/components/Forms/FormImageInput";
import FormInput from "@/components/Forms/FormInput";
import { RouterProtector } from "@/helpers/routerProtectorWithRole";
import { imageUploader } from "@/helpers/uplode/uploadImage";
import { useCreateBlogMutation } from "@/redux/api/blogApi";
import { createBlogSchema } from "@/schemas/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);
type FormValues = {
  title: string;
  imgUrl: string;
};

const CreateBlog = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [createBlog] = useCreateBlogMutation(undefined);

  const onSubmit: SubmitHandler<FormValues> = async (formData: any) => {
    setIsClicked(true);
    const ans = window.confirm("Are you sure to create this blog?");
    if (ans) {
      const image = formData.imgUrl[0];
      let imageData = null;
      if (image) {
        imageData = await imageUploader(image);
      }
      if (imageData?.success === "false") {
        window.alert("Image upload failed!");
        setIsClicked(false);
        return;
      }
      formData.imgUrl = imageData?.data?.display_url;
      formData.description = value;
      try {
        const res = await createBlog(formData).unwrap();
        window.alert(res?.message);
        setIsClicked(false);
        router.push("/");
        if (res?.data?.statusCode == 200) {
          setIsClicked(false);
          router.push("/");
        }
      } catch (error) {
        window.alert("Something went wrong, please try again later...");
        setIsClicked(false);
      }
    } else return;
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-full mx-3">
        <h1 className="text-primary mt-2 mb-5 font-bold text-3xl font-serif text-center pt-20">
          Create Blog
        </h1>
        <Form submitHandler={onSubmit} resolver={yupResolver(createBlogSchema)}>
          <div className="w-full my-1 px-8">
            <FormInput
              name="title"
              type="text"
              label="Blog Title"
              size="md"
              required
            />
          </div>
          <div className="w-full my-1 px-8">
            <FormImageInput name="imgUrl" label="Image" size="md" required />
          </div>
          <div className="w-full mt-1 md:mb-16 sm:mb-20 mb-36 px-8">
            <ReactQuill
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  [{ color: [] }, { background: [] }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "color",
                "background",
                "link",
                "image",
              ]}
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder={"Write Something..."}
              className="h-64"
              style={{ maxHeight: "400px" }}
            />
          </div>
          <div className="w-full px-8">
            <button
              type="submit"
              disabled={isClicked}
              className="text-white hover:bg-secondary disabled:bg-secondary hover:text-primary disabled:text-primary bg-primary font-bold rounded-lg w-full p-2"
            >
              Post
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const UpdatePasswordWithProtector = () => (
  <RouterProtector allowedRoles={["user"]}>
    <CreateBlog />
  </RouterProtector>
);

export default UpdatePasswordWithProtector;

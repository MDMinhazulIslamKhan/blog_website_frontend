export const imageUploader = async (image: string) => {
  const imageHostKey = process.env.NEXT_PUBLIC_UPLOAD_KEY;
  const formData = new FormData();
  formData.append("image", image);
  const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data;
};

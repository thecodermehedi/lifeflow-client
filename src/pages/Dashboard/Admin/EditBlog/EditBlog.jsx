import {useForm, Controller} from "react-hook-form";
import JoditEditor from "jodit-react";
import dayjs from "dayjs";
import {uploadPhoto} from "../../../../api/utils";
import toast from "react-hot-toast";
import useBlog from "../../../../hooks/useBlog";
import {useState} from "react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import Spinner from "../../../../components/Spinner";
const EditBlog = () => {
  const {id} = useParams();
  const {blogs, updateBlogFn} = useBlog();
  const {register, handleSubmit, reset, control} = useForm();
  const [blog, setBlog] = useState();
  useEffect(() => {
    if (blogs.length > 0) {
      const result = blogs.find((blog) => blog._id === id);
      setBlog(result);
    }
  }, [blogs, id]);

  const config = {
    readonly: false,
    placeholder: "Enter blog post content here",
  };

  const handleUpdateBlog = async (data) => {
    const toastId = toast.loading(" Updating blog post...");

    const {title, image, content} = data;
    const date = dayjs().format("DD-MM-YYYY");
    const time = dayjs().format("h:mm A");
    const photo = image[0];

    try {
      let newBlogInfo = {
        ...blog,
        ...data,
        date,
        time,
      };
  
      if (title !== blog.title) {
        newBlogInfo.title = title;
      }
  
      if (content !== blog.description) {
        newBlogInfo.description = content;
      }
  
      if (photo && image.length > 0) {
        const photoData = await uploadPhoto(photo);
        if (photoData?.data?.display_url !== blog.cover) {
          newBlogInfo.cover = photoData?.data?.display_url;
        }
      }
  
      await updateBlogFn({id, newBlogInfo});
      reset();
      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
        Update your blog post
      </h1>
      <form onSubmit={handleSubmit(handleUpdateBlog)}>
        <div className="my-6">
          <label htmlFor="title" className="text-gray-900 text-sm">
            Update Title
          </label>
          <input
            type="text"
            id="title"
            defaultValue={blog?.title}
            {...register("title", {required: true})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-primary block w-full p-2.5"
            required
          />
        </div>

        <div className="flex flex-col justify-center w-full mb-5">
          <label
            htmlFor="file_input"
            className="text-left text-gray-900 text-sm mb-2 cursor-pointer"
          >
            Update Cover (SVG, PNG, JPG, JPEG) 
            (<Link className="text-blue-500" to={blog?.cover} target="_blank">View Current</Link>)
          </label>

          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer file:border-0 file:py-2 file:bg-primary file:px-4 file:font-bold file:text-white bg-gray-200 file:mr-3"
            id="file_input"
            type="file"
            {...register("image")}
            name="image"
            accept=".svg, .png, .jpg, .jpeg"
          />
        </div>
        {blog ? (
          <div className="space-y-2">
            <label className="text-sm">Blog Content</label>
            <Controller
              name="content"
              control={control}
              defaultValue={blog.description}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <JoditEditor
                  value={value}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => onChange(newContent)}
                />
              )}
            />
          </div>
        ) : (
          <Spinner />
        )}

        <div className="mt-6 w-full">
          <button type="submit" className=" px-4 py-2  w-full btn">
            <span> Update Blog</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditBlog;

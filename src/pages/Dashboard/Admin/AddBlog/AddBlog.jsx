import {useForm, Controller} from "react-hook-form";
import JoditEditor from "jodit-react";
import dayjs from "dayjs";
import {uploadPhoto} from "../../../../api/utils";
import toast from "react-hot-toast";
import useBlog from "../../../../hooks/useBlog";

const AddBlog = () => {
  const {addBlogFn} = useBlog();
  const {register, handleSubmit, reset, control} = useForm();

  const config = {
    readonly: false,
    placeholder: "Enter blog post content here",
  };

  const handleAddBlog = async (data) => {
    const toastId = toast.loading(" Adding blog post...");

    const {title, image, content} = data;

    const date = dayjs().format("DD-MM-YYYY");
    const time = dayjs().format("h:mm A");
    const photo = image[0];

    try {
      const photoData = await uploadPhoto(photo);
      const newBlog = {
        title,
        description: content,
        cover: photoData?.secure_url,
        status: "draft",
        date,
        time,
      };
      await addBlogFn(newBlog);
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
        Create New Blog
      </h1>
      <form onSubmit={handleSubmit(handleAddBlog)}>
        <div className="my-6">
          <label htmlFor="title" className="text-gray-900 text-sm">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter blog title here"
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
            Upload Blog Cover (SVG, PNG, JPG, JPEG)
          </label>

          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer file:border-0 file:py-2 file:bg-primary file:px-4 file:font-bold file:text-white bg-gray-200 file:mr-3"
            id="file_input"
            type="file"
            {...register("image", {required: true})}
            required
            name="image"
            accept=".svg, .png, .jpg, .jpeg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Blog Content</label>
          <Controller
            name="content"
            control={control}
            defaultValue=""
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

        <div className="mt-6 w-full">
          <button type="submit" className=" px-4 py-2  w-full btn">
            <span> Create Blog</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddBlog;

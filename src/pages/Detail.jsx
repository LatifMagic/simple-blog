import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { FaRegEdit } from "react-icons/fa";
import Tags from "../ui/Tags";
import MostPopular from "../ui/MostPopular";

const Detail = ({ user }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const userId = user?.uid;

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog({ ...blogDetail.data(), id });
  };

  console.log(blog?.tags);
  return (
    <div className="mb-12 mt-0">
      <div
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
        className="grid w-full h-[80vh] bg-cover bg-fixed relative place-items-center "
      >
        <div className="absolute w-full h-[80vh]  bg-yellow-950/10 top-0 z-0"></div>
        <div className="absolute bottom-8  ">
          <span className=" text-base text-white/60">
            {blog?.Timestamp.toDate().toDateString()}
          </span>
          <h2 className=" text-5xl md:text-7xl text-white">{blog?.title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 w-11/12 m-auto mt-8 gap-4">
        <div className="col-span-3 sm:col-span-2 mt-2 text-start text-xl">
          <div className="flex justify-between mb-4 border-b-2 border-black/40">
            <div>
              By <span className="font-bold">{blog?.author} - </span>
              {blog?.Timestamp.toDate().toDateString()}
            </div>
            {userId === blog?.userId && (
              <div className="flex gap-1">
                <Link to={`/update/${blog?.id}`}>
                  <FaRegEdit className="text-green-500 cursor-pointer" />
                </Link>
              </div>
            )}
          </div>
          <div>
            <p>&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; {blog?.description}</p>
          </div>
        </div>
        <div className="col-span-3 sm:col-span-1">
          <Tags tags={blog?.tags} />
          <MostPopular />
        </div>
      </div>
    </div>
  );
};

export default Detail;

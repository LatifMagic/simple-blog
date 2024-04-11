import { excerpt } from "../utility";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function BlogSection({ blogs, user, handleDelete }) {
  // const [showModal, setShowModal] = useState(false);
  const userId = user?.uid;
  // function handleShowModal() {
  //   setShowModal(!showModal);
  // }
  // function handleDeleteConfirm(id) {
  //   setShowModal(!showModal);
  //   handleDelete(id);
  // }

  // const deleteTitle = "Delete Blog";
  return (
    <div className="mb-8">
      <h2 className="text-start mb-4 border-b-2 border-black/30 text-3xl">
        Daily Blogs
      </h2>
      <div className="flex flex-col gap-8">
        {blogs?.map((item) => (
          <div
            key={item.id}
            className="grid md:grid-cols-2 gap-4 grid-rows-2 sm:grid-rows-1"
          >
            <div>
              <img src={item.imgUrl} alt={item.title} className="w-full h-72" />
            </div>
            <div className="text-start h-60 md:h-72 flex flex-col sm:justify-between">
              <div>
                <h6 className="bg-teal-500 text-slate-50 rounded-sm w-fit px-2 text-base mb-2">
                  {item.category}
                </h6>
                <span className="text-3xl md:text-2xl lg:text-3xl">
                  {excerpt(item.title, 60)}
                </span>
                <span className="flex gap-1 text-lg">
                  <p className="font-semibold">{item.author} - </p>
                  {item.Timestamp.toDate().toDateString()}
                </span>
              </div>
              <div className="text-lg mt-2 break-all ">
                {excerpt(item.description, 80)}
              </div>
              <div className="flex justify-between mt-8">
                <Link to={`/detail/${item.id}`}>
                  <button className="bg-[#2a2a2a]  hover:bg-[#2a2a2a]/80  text-slate-100 px-4 text-xl">
                    Read More
                  </button>
                </Link>
                {userId === item.userId && (
                  <div className="flex gap-1">
                    <span>
                      <IoTrashOutline
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      />
                      {/* <Modal
                        showModal={showModal}
                        onShowModal={handleShowModal}
                        modalTitle={deleteTitle}
                        item={item}
                        onAction={handleDeleteConfirm}
                        handleDel={handleDel}
                      >
                        Are you sure you want to delete this blog ?
                      </Modal> */}
                    </span>

                    <Link to={`/update/${item.id}`}>
                      <FaRegEdit className="text-green-500 cursor-pointer" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogSection;

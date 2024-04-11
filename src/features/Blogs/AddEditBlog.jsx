import { useEffect, useState } from "react";
import { db, storage } from "../../services/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { TagsInput } from "react-tag-input-component";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOptions = ["Fashion", "Technology", "Food", "Sports", "Business"];

function AddEditBlog({ user }) {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const { title, tags, trending, category, description } = form || "";

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is runing");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast("Image uploaded successfully", {
              icon: "👏",
              style: {
                borderRadius: "10px",
                background: "#2a2a2a",
                color: "#fff",
              },
            });
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]); //file

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists) {
      setForm({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            Timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (err) {
          console.log(err);
        } finally {
          navigate("/");
        }
      } else if (id) {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            Timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
        } finally {
          navigate("/");
        }
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    }
  };

  return (
    <div className="mt-24 ">
      <h1 className="text-5xl ">{id ? "Update Blog" : "Create Blog"}</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-10/12 md:w-7/12 m-auto justify-center mt-4"
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title || ""}
          onChange={handleChange}
          className="px-2 py-1"
        />

        <div className="">
          <TagsInput
            value={tags || []}
            onChange={handleTags}
            name="tags"
            placeHolder="Tags"
          />
        </div>
        <div className="flex justify-between">
          <p className="">Is it trending blog? </p>
          <div className="flex gap-1 items-center">
            <input
              type="radio"
              placeholder="Title"
              name="radioOption"
              value="yes"
              checked={trending === "yes"}
              onChange={handleTrending}
              className="px-2 py-1"
            />
            <label htmlFor="radioOption">Yes&nbsp;</label>
            <input
              type="radio"
              placeholder="Title"
              name="radioOption"
              value="no"
              checked={trending === "no"}
              onChange={handleTrending}
              className="px-2 py-1"
            />
            <label htmlFor="radioOption">No&nbsp;</label>
          </div>
        </div>
        <div>
          <select
            value={category || ""}
            onChange={onCategoryChange}
            className="p-1 w-full"
          >
            <option className="">Please select category</option>
            {categoryOptions?.map((option, index) => (
              <option value={option || ""} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description || ""}
            name="description"
            onChange={handleChange}
            className="w-full px-2 py-1 h-32"
          />
        </div>
        <div className="w-full bg-white   items-start flex">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div>
          <button
            type="submit"
            className={` px-12 py-1 w-full ${
              progress !== null && progress < 100
                ? "bg-slate-400/40 text-slate-500/60"
                : id
                ? "bg-green-400 hover:bg-green-500"
                : "bg-yellow-400  hover:bg-yellow-500"
            }  `}
            disabled={progress !== null && progress < 100}
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditBlog;

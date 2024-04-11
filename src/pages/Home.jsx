import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../services/firebase";
import BlogSection from "../ui/BlogSection";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import Tags from "../ui/Tags";
import MostPopular from "../ui/MostPopular";
import Trending from "../ui/Trending";

function Home({ user }) {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    setLoading(true);
    getTrendingBlogs();
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-24">
      <div className="grid grid-cols-3 gap-4 w-11/12 m-auto">
        <div className="col-span-3 mb-6">
          <Trending blogs={trendBlogs} />
        </div>
        <div className="col-span-3 sm:col-span-2 ">
          <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
        </div>
        <div className="col-span-3 sm:col-span-1">
          <Tags tags={tags} />
          <MostPopular blogs={blogs} />
        </div>
      </div>
    </div>
  );
}

export default Home;

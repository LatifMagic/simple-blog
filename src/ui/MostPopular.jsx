import { useNavigate } from "react-router-dom";

function MostPopular({ blogs }) {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h2 className="text-start mb-4 border-b-2 border-black/30 text-3xl">
          Most Popular
        </h2>
      </div>
      {blogs?.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer flex sm:flex-col  md:flex-row gap-2 items-start mb-4"
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <div className="max-w-36 max-h-20 mb-2">
            <img src={item.imgUrl} alt={item.title} />
          </div>
          <div className="text-left">
            <div className="text-xl">{item.title}</div>
            <div className="text-base">
              {item?.Timestamp.toDate().toDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MostPopular;

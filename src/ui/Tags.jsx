function Tags({ tags }) {
  return (
    <div className="mb-8">
      <div>
        <h2 className="text-start mb-4 border-b-2 border-black/30 text-3xl">
          Tags
        </h2>
      </div>
      <div className="flex gap-4 flex-wrap px-4 text-xl">
        {tags?.map((tag, index) => (
          <p key={index}>
            <span
              className="bg-gray-300 px-4 py-1 rounded cursor-pointer hover:bg-[#2a2a2a] 
                hover:text-white  ease-linear duration-200"
            >
              {tag}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Tags;

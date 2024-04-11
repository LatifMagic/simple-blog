import { Link } from "react-router-dom";
import { Pagination, A11y, EffectCoverflow } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

function Trending({ blogs }) {
  return (
    <>
      <div>
        <h2 className="text-start mb-4 border-b-2 border-black/30 text-3xl">
          Trending
        </h2>
      </div>
      <Swiper
        modules={[EffectCoverflow, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={2}
        effect={"coverflow"}
        loop={true}
        centeredSlides={true}
        pagination={{ el: "", clickable: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
      >
        {blogs?.map((item) => (
          <SwiperSlide key={item.id}>
            <div key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <div>
                  <div className="relative text-center">
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      className="h-72 w-full"
                    />
                  </div>
                  <div className="absolute bg-black opacity-5 w-full h-full bottom-0"></div>
                  <div className="absolute bottom-4 text-white w-full items-center">
                    <span className="text-xl font-thin text-slate-50">
                      {item.title}
                    </span>
                    <div className="text-sm text-gray-200 ">
                      {item?.author} - {item?.Timestamp.toDate().toDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Trending;

function Modal({
  showModal,
  onShowModal,
  modalTitle,
  children,
  item,
  onAction,
}) {
  console.log(item.title);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-3/4 md:w-2/4 lg:w-1/4 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#2a2a2a] text-slate-100 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold tracking-wide">
                    {modalTitle}
                  </h3>
                  <button
                    className=" text-4xl  font-semibold "
                    onClick={onShowModal}
                  >
                    <span className="bg-transparent text-yellow-400 ">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-xl leading-relaxed">
                    {children}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b ">
                  <button
                    className="text-slate-100  background-transparent tracking-widest font-bold uppercase px-3 py-2  text-base outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onShowModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-red-500 text-white tracking-widest hover:bg-red-600 active:bg-red-600 font-bold uppercase text-base px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onAction(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;

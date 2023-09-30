import { BsStarFill } from "react-icons/bs";
function ReviewSlide() {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex gap-2 items-center">
        <img
          className="w-16 h-16 mx-2 rounded-full object-cover object-center shadow-md shadow-secondary/30"
          src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
          alt="avatar"
        />
        <div className="flex-col flex gap-1">
          <p className="font-semibold text-lg ">Jacqui</p>
          <span className="text-[16px]">Hong Kong, China</span>
        </div>
      </div>
      <p className="my-4 text-sm px-2 min-h-[96px]">
        So happy with my hair and make up and the hair lasted until the next day
        photos also.
      </p>
      <div className="flex items-center ml-2 gap-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <BsStarFill className="text-yellow-300" key={i} />
          ))}
      </div>
    </div>
  );
}

export default ReviewSlide;

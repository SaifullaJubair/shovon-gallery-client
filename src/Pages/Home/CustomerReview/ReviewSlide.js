import { BsStarFill } from "react-icons/bs";
function ReviewSlide({ img, text, client, corporation }) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex gap-2 items-center">
        <img
          className="w-16 h-16 mx-2 rounded-full object-cover object-center shadow-md shadow-secondary/30"
          src={img}
          alt="avatar"
        />
        <div className="flex-col flex gap-1">
          <p className="font-semibold text-lg ">{client}</p>
          <span className="text-[16px]">{corporation}</span>
        </div>
      </div>
      <p className="my-4 text-sm px-2 min-h-[96px]">{text}</p>
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

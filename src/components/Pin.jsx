import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlFor, client } from "../client";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline, MdDelete } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUser";
const Pin = ({ pin }) => {
  const navigate = useNavigate();
  const userInfo = fetchUser();
  const [hover, setHovered] = useState(false);
  let alreadySaved = !!pin?.save?.filter(
    (item) => item.postedBy._id === userInfo.sub
  )?.lenght;
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userID: userInfo.sub,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload()
    })
  }


  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(pin.image).width(250).url()}
          alt=""
          className="rounded-lg w-full"
        />
        {hover && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${pin?.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="outline-none bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md transition-all duration-150"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-green-500 opacity-70 hover:opacity-100 text-white  px-2 py-1 text-sm rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(pin?._id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white  px-2 py-1 text-sm rounded-3xl hover:shadow-md outline-none"
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between gap-2 w-full ">
              {pin?.destination && (
                <a
                  href={pin?.destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black text-sm font-semibold py-1 px-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill/> 
                  {pin?.destination.length > 20 ? pin?.destination.slice(8,20) : pin?.destination.slice(8)}
                </a>
              )}
              {pin?.postedBy._id === userInfo.sub && (
                <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePin(pin?._id);
                }}
                type="button"
                className="bg-white opacity-70 hover:opacity-100 p-2 text-dark text-sm rounded-3xl hover:shadow-md outline-none"
              >
                <MdDelete/>
              </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`user-profile/${userInfo.sub}`} className='flex gap-2 mt-2 items-center'>
        <img src={pin?.postedBy?.image} alt="user-profile" className="w-6 h-6 object-cover rounded-full" />
        <p className="font-semibold text-sm capitalize">{pin?.postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;

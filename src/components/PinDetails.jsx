import React from "react";
import { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailQuery, pinDetailMorePinQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetails = ({ user }) => {
  const [pin, setPin] = useState(null);
  const [pinDetail, setPindetail] = useState(false);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();
  const fetchPinDetail = () => {
    const query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPindetail(data[0]);

        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPin(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetail();
  }, [pinId]);

  // console.log(comment);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetail();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) return <Spinner message="Loading pin..." />;

  return (
    <div className="flex xl-flex-row flex-col m-auto bg-white max-w-[1500px] rounded-[32px]">
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pinDetail?.image?.asset?.url}
          alt="user-post"
          className="rounded-t-3xl rounded-b-lg "
        />
      </div>
      <div className="w-full p-5 flex xl:min-w-620">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            <a
              href={`${pinDetail?.image?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="outline-none bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md transition-all duration-150"
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetail?.destination} target="_blank" rel="noreferrer">
            {pinDetail.destination}
          </a>
        </div>
      </div>
      <div className="px-5 ">
        <h1 className="pb-5 mt-3 text-3xl font-semibold break-worfds">
          {pinDetail.title}
        </h1>
        <p className="mt-3">{pinDetail.about}</p>
        <Link
          to={`/user-profile/${user._id}`}
          className="flex gap-2 mt-2 items-center py-5"
        >
          <img
            src={pinDetail?.postedBy?.image}
            alt="user-profile"
            className="w-6 h-6 object-cover rounded-full"
          />
          <p className="font-semibold text-sm capitalize">
            {pinDetail?.postedBy?.userName}
          </p>
        </Link>
        <h2 className="mt-5 text-2xl">Comment</h2>
        <div className="max-h-370 overflow-y-auto ">
          {pinDetail?.comments?.map((item) => (
            <div
              key={item.comment}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg"
            >
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={item.postedBy?.image}
                alt="user-profile"
              />
              <div className="flex flex-col ">
                <p className="font-semibold">{item.postedBy?.userName}</p>
                <p>{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mt-6 gap-3 pb-5">
          <Link
            to={`user-profile/${user._id}`}
            className="flex gap-2 items-center"
          >
            <img
              src={pinDetail?.postedBy?.image}
              alt="user-profile"
              className="w-6 h-6 object-cover rounded-full"
            />
          </Link>
          <input
            type="text"
            className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-xl focus:border-gray-400"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="button"
            className="bg-violet-400 text-white rounded-full px-6 py-2 font-semibold text-base outline-none hover:bg-violet-800 transition-all duration-150"
            onClick={addComment}
          >
            {addingComment ? "Posting the comment..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinDetails;

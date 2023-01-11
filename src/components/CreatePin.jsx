import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [assetImage, setAssetImage] = useState(false);
  const [wrongImage, setWrongImage] = useState(false);

  const navigate = useNavigate();
  console.log(wrongImage);
  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    console.log(type);
    if (
      type === "image/jpg" ||
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImage(false);
      setLoading(true);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setAssetImage(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Image upload error", error);
        });
    } else {
      setWrongImage(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in the fields
        </p>
      )}
      <div className="flex flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full ">
          <div className="flex justify-center items-center border-2 border-dotted border-gray-300 w-full h-420">
            {loading && <Spinner />}
            {wrongImage && <p>Wrong Image Type</p>}
            {!assetImage ? (
              <label>
                <div className="flex flex-col item-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-log">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, SVG, PNG, GIF or TIFF
                  </p>
                </div>
                <input
                  type="file"
                  name="upload"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={assetImage?.url}
                  alt="upload-pic"
                  className="h-full w-full "
                />
                <button
                  onClick={() => setAssetImage(null)}
                  type="button"
                  className="absolute bottom-3 p-3 right-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-sm transition-all duration-150 ease-in-out"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pe-5 mt-5 w-full ">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title here"
            className="outline-none text-xl sm:text-base font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img src={user.image} alt="user-profife" className="w-10 h-10 rounded-full" />
              <p className="font-semibold">{user.userName}</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default CreatePin;

/* eslint-disable react-hooks/exhaustive-deps */
import { userContext } from "../../Contexts/userContext";
import { db, storage } from "../../backend/firebaseConfig";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";
const Profile = () => {
  const contextData = useContext(userContext);
  const [file, setFile] = useState();
  const copyLinkHandler = (link) => {
    navigator.clipboard.writeText(link);
    toast.dismiss();
    toast.success("Link Copied");
  };
  const updateValueHandler = async (e) => {
    e.preventDefault();
    toast.loading("Updating Profile!");
    try {
      const updateRef = doc(db, "Link Forests", contextData.data.userInfo.id);
      await updateDoc(updateRef, {
        name: contextData?.data?.userInfo?.name
          ? contextData?.data?.userInfo?.name
          : "",
        image: contextData.data.userInfo.image
          ? contextData.data.userInfo.image
          : "https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd",
        description: contextData?.data?.userInfo?.description
          ? contextData?.data?.userInfo?.description
          : "",
        updatedTime: serverTimestamp(),
      });
      toast.dismiss();
      toast.success("Profile Updated!");
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Something Went Wrong!");
    }
  };

  const updatePhotoHandler = async (image) => {
    toast.loading("Updating Photo!");
    try {
      const updateRef = doc(db, "Link Forests", contextData.data.userInfo.id);
      await updateDoc(updateRef, {
        image,
        updatedTime: serverTimestamp(),
      });
      toast.dismiss();
      toast.success("Profile Updated!");
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Something Went Wrong!");
    }
  };

  useEffect(() => {
    const uploadFileToStorage = async (file) => {
      toast.loading("Uploading Photo!");
      const storageRef = ref(
        storage,
        `Link Forests Profiles/${contextData.data.userInfo.id}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          toast.dismiss();
          toast.error("Something Went Wrong!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss();
            setFile();
            toast.success("Profile Updated!");
            contextData.setData({
              ...contextData.data,
              userInfo: {
                ...contextData.data.userInfo,
                image: downloadURL,
              },
            });
            updatePhotoHandler(downloadURL);
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [file]);

  const removeProfileHandler = async () => {
    toast.loading("Removing Profile!");
    const desertRef = ref(
      storage,
      `Link Forests Profiles/${contextData.data.userInfo.id}`
    );
    const updateRef = doc(db, "Link Forests", contextData.data.userInfo.id);
    deleteObject(desertRef)
      .then(async () => {
        await updateDoc(updateRef, {
          image:
            "https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd",
          updatedTime: serverTimestamp(),
        });
        toast.dismiss();
        toast.success("Profile Removed!");
        contextData.setData({
          ...contextData.data,
          userInfo: {
            ...contextData.data.userInfo,
            image:
              "https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd",
          },
        });
      })
      .catch((error) => {
        toast.dismiss();
        console.error(error);
        toast.error("Something Went Wrong!");
      });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-center md:justify-evenly items-center w-full flex-col md:flex-row">
        <div className="flex justify-center items-center flex-col mb-6 md:mb-0">
          <img
            src={
              contextData.data?.userInfo?.image === undefined
                ? "https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd"
                : contextData.data?.userInfo?.image
            }
            alt="Profile"
            className="rounded-full object-cover h-[80px] w-[80px]"
          />
          {contextData.data?.userInfo?.image?.includes("noImage.png") && (
            <>
              <label
                className="mt-4 font-Montserrat font-medium border-[1.4px] border-emerald-600 text-emerald-700 text-sm p-[2px] rounded-md w-full hover:bg-emerald-50 ease-linear transition-all duration-200 hover:ease-linear hover:transition-all hover:duration-200 text-center cursor-pointer"
                htmlFor="uploadProfile"
              >
                Upload
              </label>
              <input
                type="file"
                id="uploadProfile"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}
          {!contextData.data?.userInfo?.image?.includes("noImage.png") && (
            <button
              className="mt-4 font-Montserrat font-medium border-[1.4px] border-red-600 text-red-700 text-sm p-[2px] rounded-md w-full hover:bg-red-50 ease-linear transition-all duration-200 hover:ease-linear hover:transition-all hover:duration-200"
              onClick={removeProfileHandler}
            >
              Remove
            </button>
          )}
        </div>
        <form
          className="flex justify-center items-start flex-col w-full md:w-[70%]"
          onSubmit={updateValueHandler}
        >
          <input
            type="text"
            placeholder="Display Name"
            className="w-full outline-none font-Montserrat border-[1.3px] border-slate-600 rounded-md py-[6px] px-3 mb-2 text-sm font-medium"
            value={contextData.data.userInfo?.name}
            onChange={(e) =>
              contextData.setData({
                ...contextData.data,
                userInfo: {
                  ...contextData.data.userInfo,
                  name: e.target.value,
                },
              })
            }
          />
          <textarea
            name=""
            id=""
            cols="40"
            rows="3"
            placeholder="Short Description"
            className="resize-none outline-none font-Montserrat w-full border-[1.3px] border-slate-600 rounded-md py-[6px] px-3 text-sm font-medium"
            value={contextData.data.userInfo?.description}
            onChange={(e) =>
              contextData.setData({
                ...contextData.data,
                userInfo: {
                  ...contextData.data.userInfo,
                  description: e.target.value,
                },
              })
            }
          ></textarea>
        </form>
      </div>
      <button
        className="text-slate-950 font-Montserrat px-2 md:px-3 py-2 text-sm md:text-base font-semibold  my-4 ease-linear hover:ease-linear transition-all hover:transition-all duration-300 hover:duration-300 hover:shadow-lg hover:shadow-emerald-600/50 bg-emerald-400 shadow-md shadow-emerald-400/50 rounded-md"
        onClick={updateValueHandler}
      >
        Update Profile
      </button>
      <div className="p-3 flex justify-center items-center flex-col w-full">
        <p className="mb-5 font-Montserrat text-xl font-semibold text-centerinline-block mx-auto">
          Your Link Forest
        </p>
        <div className="mb-4 font-Montserrat w-full font-medium tracking-wide border-l-4 border-slate-950 pl-2 hover:border-emerald-500 cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 flex justify-between items-center text-base">
          <p
            onClick={() =>
              window.open(
                `https://linkforest.vercel.app/${contextData.data.userInfo?.username}`
              )
            }
          >
            linkforest.vercel.app/{contextData.data.userInfo?.username}
          </p>
          <MdContentCopy
            className="text-lg"
            onClick={() =>
              copyLinkHandler(
                `https://linkforest.vercel.app/${contextData.data.userInfo?.username}`
              )
            }
          />
        </div>
        <div className="mb-4 font-Montserrat w-full font-medium tracking-wide border-l-4 border-slate-950 pl-2 hover:border-emerald-500 cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 flex justify-between items-center text-base">
          <p
            onClick={() =>
              window.open(
                `https://linkfo.vercel.app/${contextData.data.userInfo?.username}`
              )
            }
          >
            linkfo.vercel.app/{contextData.data.userInfo?.username}
          </p>
          <MdContentCopy
            className="text-lg"
            onClick={() =>
              copyLinkHandler(
                `https://linkfo.vercel.app/${contextData.data.userInfo?.username}`
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

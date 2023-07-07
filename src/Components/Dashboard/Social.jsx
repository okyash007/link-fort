import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { userContext } from "../../Contexts/userContext";
import { db } from "../../backend/firebaseConfig";
const Social = () => {
  const contextData = useContext(userContext);
  const updateValueHandler = async () => {
    toast.loading("Updating Links");
    try {
      const updateRef = doc(db, "Link Forests", contextData.data.userInfo.id);
      await updateDoc(updateRef, {
        socialLinks: contextData.data.socialLinks,
        updatedTime: serverTimestamp(),
      });
      toast.dismiss();
      toast.success("Social Links Updated!");
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Something Went Wrong!");
    }
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-center items-center w-full flex-col">
        <div className="flex justify-center items-center w-full md:w-[80%] border-[1.4px] border-slate-400 p-1 rounded mb-4">
          <FaInstagram className="md:mx-2 mx-1 p-[2px] text-[20px] md:text-[24px] text-slate-800" />
          <input
            placeholder="https://www.instagram.com/username"
            type="link"
            className="w-full outline-none px-2 placeholder-slate-500 placeholder:text-[13px] md:placeholder:text-sm font-Montserrat text-[13px] md:text-sm py-[3px] font-medium"
            value={contextData.data.socialLinks?.instagram}
            onChange={(e) =>
              contextData.setData({
                ...contextData.data,
                socialLinks: {
                  ...contextData.data.socialLinks,
                  instagram: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="flex justify-center items-center w-full md:w-[80%] border-[1.4px] border-slate-400 p-1 rounded mb-4">
          <FaLinkedinIn className="md:mx-2 mx-1 p-[2px] text-[20px] md:text-[24px] text-slate-800" />
          <input
            placeholder="https://www.linkedin.com/username"
            type="link"
            className="w-full outline-none px-2 placeholder-slate-500 placeholder:text-[13px] md:placeholder:text-sm font-Montserrat text-[13px] md:text-sm py-[3px] font-medium"
            value={contextData.data.socialLinks?.linkedin}
            onChange={(e) =>
              contextData.setData({
                ...contextData.data,
                socialLinks: {
                  ...contextData.data.socialLinks,
                  linkedin: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="flex justify-center items-center w-full md:w-[80%] border-[1.4px] border-slate-400 p-1 rounded mb-4">
          <FaGithub className="md:mx-2 mx-1 p-[2px] text-[20px] md:text-[24px] text-slate-800" />
          <input
            placeholder="https://www.github.com/username"
            type="link"
            className="w-full outline-none px-2 placeholder-slate-500 placeholder:text-[13px] md:placeholder:text-sm font-Montserrat text-[13px] md:text-sm py-[3px] font-medium"
            value={contextData.data.socialLinks?.github}
            onChange={(e) =>
              contextData.setData({
                ...contextData.data,
                socialLinks: {
                  ...contextData.data.socialLinks,
                  github: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="flex justify-center items-center w-full md:w-[80%] border-[1.4px] border-slate-400 p-1 rounded mb-4">
          <FaTwitter className="md:mx-2 mx-1 p-[2px] text-[20px] md:text-[24px] text-slate-800" />
          <input
            placeholder="https://www.twitter.com/username"
            type="link"
            className="w-full outline-none px-2 placeholder-slate-500 placeholder:text-[13px] md:placeholder:text-sm font-Montserrat text-[13px] md:text-sm py-[3px] font-medium"
            value={contextData.data.socialLinks?.twitter}
            onChange={(e) =>
              contextData.setData({
                ...contextData.data,
                socialLinks: {
                  ...contextData.data.socialLinks,
                  twitter: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="flex justify-center items-center w-full md:w-[80%] border-[1.4px] border-slate-400 p-1 rounded mb-4">
          <FaFacebookF className="md:mx-2 mx-1 p-[2px] text-[20px] md:text-[24px] text-slate-800" />
          <input
            placeholder="https://www.facebook.com/username"
            type="link"
            className="w-full outline-none px-2 placeholder-slate-500 placeholder:text-[13px] md:placeholder:text-sm font-Montserrat text-[13px] md:text-sm py-[3px] font-medium"
            value={contextData.data.socialLinks?.facebook}
            onChange={(e) =>
              contextData.setData({
                ...contextData.data,
                socialLinks: {
                  ...contextData.data.socialLinks,
                  facebook: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="flex justify-center items-center w-full md:w-[80%] border-[1.4px] border-slate-400 p-1 rounded mb-4">
          <HiMail className="md:mx-2 mx-1 p-[2px] text-[20px] md:text-[24px] text-slate-800" />
          <input
            placeholder="linkforest@abc.com"
            type="link"
            className="w-full outline-none px-2 placeholder-slate-500 placeholder:text-[13px] md:placeholder:text-sm font-Montserrat text-[13px] md:text-sm py-[3px] font-medium"
            value={contextData.data.socialLinks?.email}
            onChange={(e) =>
              contextData.setData({
                ...contextData.data,
                socialLinks: {
                  ...contextData.data.socialLinks,
                  email: e.target.value,
                },
              })
            }
          />
        </div>
        <button
          className="text-slate-950 font-Montserrat px-2 md:px-3 py-2 text-sm md:text-base font-semibold ease-linear hover:ease-linear transition-all hover:transition-all duration-300 hover:duration-300 hover:shadow-lg hover:shadow-emerald-600/50 bg-emerald-400 to-emerald-300 shadow-md shadow-emerald-400/50 rounded-md"
          onClick={updateValueHandler}
        >
          Update Social Links
        </button>
      </div>
    </div>
  );
};

export default Social;

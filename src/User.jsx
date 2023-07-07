/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { collection, getDocs, query, where } from "firebase/firestore";
import { HashLoader } from "react-spinners";
import { db } from "./backend/firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
const UserLink = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const slug = router.pathname.replace("/", "");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    slug && getDataFromServer();
  }, [slug]);

  const getDataFromServer = async () => {
    setLoading(true);
    const q = query(
      collection(db, "Link Forests"),
      where("username", "==", slug)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setLoading(false);
    } else {
      querySnapshot.forEach((doc) => {
        setData(doc.data());
        if (doc.data().name !== undefined) {
          document.title = doc.data().name + " - Link Forest";
        } else {
          document.title = "Link Forest";
        }
      });
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-start items-center flex-col h-[100vh] pb-10"
      style={{
        backgroundColor: `${data?.customTheme?.background.toString(16)}`,
      }}
    >
      <svg
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 cursor-pointer transition-all duration-300 ease-linear hover:ease-linear hover:scale-110 hover:duration-300 hover:transition-all"
        width="38"
        height="38"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="500"
          height="500"
          rx="43.3054"
          fill={data?.customTheme?.textColor.toString(16)}
        ></rect>
        <path
          d="M217.087 351.889C209.764 338.018 191.21 326.302 191.21 215.04V213.616L203.363 221.71C213.021 228.134 220.939 236.848 226.412 247.073C231.885 257.3 234.743 268.723 234.73 280.322H256.491C256.506 265.143 252.766 250.194 245.603 236.812C238.44 223.428 228.078 212.025 215.44 203.617L199.946 193.281H216.593C233.067 193.312 249.092 198.654 262.289 208.513L282.603 223.744L295.659 206.337L275.345 191.105C258.374 178.434 237.772 171.567 216.593 171.521H203.363C217.575 157.644 236.627 149.84 256.491 149.76H278.251V128H256.491C241.873 128.054 227.452 131.368 214.277 137.699C201.101 144.031 189.504 153.221 180.329 164.601C171.154 153.221 159.557 144.031 146.382 137.699C133.207 131.368 118.786 128.054 104.169 128H82.4082V149.76H104.169C124.031 149.84 143.084 157.644 157.296 171.521H144.066C122.886 171.567 102.285 178.434 85.3132 191.105L65 206.337L78.0562 223.744L98.3693 208.513C111.567 198.654 127.592 193.312 144.066 193.281H160.712L145.23 203.617C132.589 212.023 122.225 223.426 115.061 236.81C107.896 250.194 104.154 265.141 104.169 280.322H125.929C125.916 268.723 128.773 257.3 134.246 247.073C139.719 236.848 147.638 228.134 157.296 221.71L169.449 213.626V215.04C169.449 312.353 181.357 347.04 191.682 371.358H196.549H248.322H295.659V351.889H217.087Z"
          fill={data?.customTheme?.background.toString(16)}
        ></path>
        <path
          d="M435.43 149.403V179.189H340.945V244.848H414.611V274.633H340.945V372H304.433V149.403H435.43Z"
          fill={data?.customTheme?.background.toString(16)}
        ></path>
      </svg>
      {!loading && Object.keys(data).length === 0 && (
        <div className="flex justify-center items-center flex-col h-[100vh]">
          <svg
            onClick={() => navigate("/")}
            className="absolute top-5 left-5 cursor-pointer transition-all duration-300 ease-linear hover:ease-linear hover:scale-110 hover:duration-300 hover:transition-all"
            width="38"
            height="38"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="500" height="500" rx="43.3054" fill="#000"></rect>
            <path
              d="M217.087 351.889C209.764 338.018 191.21 326.302 191.21 215.04V213.616L203.363 221.71C213.021 228.134 220.939 236.848 226.412 247.073C231.885 257.3 234.743 268.723 234.73 280.322H256.491C256.506 265.143 252.766 250.194 245.603 236.812C238.44 223.428 228.078 212.025 215.44 203.617L199.946 193.281H216.593C233.067 193.312 249.092 198.654 262.289 208.513L282.603 223.744L295.659 206.337L275.345 191.105C258.374 178.434 237.772 171.567 216.593 171.521H203.363C217.575 157.644 236.627 149.84 256.491 149.76H278.251V128H256.491C241.873 128.054 227.452 131.368 214.277 137.699C201.101 144.031 189.504 153.221 180.329 164.601C171.154 153.221 159.557 144.031 146.382 137.699C133.207 131.368 118.786 128.054 104.169 128H82.4082V149.76H104.169C124.031 149.84 143.084 157.644 157.296 171.521H144.066C122.886 171.567 102.285 178.434 85.3132 191.105L65 206.337L78.0562 223.744L98.3693 208.513C111.567 198.654 127.592 193.312 144.066 193.281H160.712L145.23 203.617C132.589 212.023 122.225 223.426 115.061 236.81C107.896 250.194 104.154 265.141 104.169 280.322H125.929C125.916 268.723 128.773 257.3 134.246 247.073C139.719 236.848 147.638 228.134 157.296 221.71L169.449 213.626V215.04C169.449 312.353 181.357 347.04 191.682 371.358H196.549H248.322H295.659V351.889H217.087Z"
              fill="#fff"
            ></path>
            <path
              d="M435.43 149.403V179.189H340.945V244.848H414.611V274.633H340.945V372H304.433V149.403H435.43Z"
              fill="#fff"
            ></path>
          </svg>
          <p className="text-2xl font-bold font-Montserrat">
            Claim <span className="text-emerald-500">@{slug}</span> Link Forest
            Now
          </p>
          <button
            className="bg-slate-950 px-4 py-2 rounded-md mt-4 text-slate-50 font-Montserrat font-medium"
            onClick={() => navigate("/")}
          >
            Claim This Link Forest
          </button>
        </div>
      )}
      {!loading && Object.keys(data)?.length !== 0 && (
        <>
          <img
            src={data.image}
            alt=""
            className="rounded-full shadow-2xl object-cover mt-16 h-[100px] w-[100px]"
          />
          <p
            className="font-Montserrat text-2xl font-semibold mt-6 text-center w-[85%] md:w-[50%]"
            style={{
              color: `${data?.customTheme?.textColor.toString(16)}`,
            }}
          >
            {data.name ? data?.name : `@${data.username}`}
          </p>
          <p
            className="font-Montserrat text-base font-medium text-center mt-2 w-[85%] md:w-[50%]"
            style={{
              color: `${data?.customTheme?.textColor.toString(16)}`,
            }}
          >
            {data?.description}
          </p>
          <div className="flex justify-evenly items-center gap-4 mt-5">
            {data?.socialLinks?.facebook && (
              <a
                rel="noreferrer"
                style={{
                  color: `${data?.customTheme?.textColor?.toString(16)}`,
                }}
                target="_blank"
                href={data?.socialLinks?.facebook}
                className="text-lg transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all"
              >
                <FaFacebookF />
              </a>
            )}
            {data?.socialLinks?.twitter && (
              <a
                rel="noreferrer"
                style={{
                  color: `${data?.customTheme?.textColor?.toString(16)}`,
                }}
                target="_blank"
                href={data?.socialLinks?.twitter}
                className="text-lg transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all"
              >
                <FaTwitter />
              </a>
            )}
            {data?.socialLinks?.instagram && (
              <a
                rel="noreferrer"
                style={{
                  color: `${data?.customTheme?.textColor?.toString(16)}`,
                }}
                target="_blank"
                href={data?.socialLinks?.instagram}
                className="text-lg transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all"
              >
                <FaInstagram />
              </a>
            )}
            {data?.socialLinks?.linkedin && (
              <a
                rel="noreferrer"
                style={{
                  color: `${data?.customTheme?.textColor?.toString(16)}`,
                }}
                target="_blank"
                href={data?.socialLinks?.linkedin}
                className="text-lg transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all"
              >
                <FaLinkedinIn />
              </a>
            )}
            {data?.socialLinks?.github && (
              <a
                rel="noreferrer"
                style={{
                  color: `${data?.customTheme?.textColor?.toString(16)}`,
                }}
                target="_blank"
                href={data?.socialLinks?.github}
                className="text-lg transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all"
              >
                <FaGithub />
              </a>
            )}
            {data?.socialLinks?.email && (
              <a
                rel="noreferrer"
                style={{
                  color: `${data?.customTheme?.textColor?.toString(16)}`,
                }}
                target="_blank"
                href={`mailto:${data?.socialLinks?.email}`}
                className="text-lg transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all"
              >
                <HiMail />
              </a>
            )}
          </div>
          <ul className="flex justify-center items-center flex-col gap-4 mt-6 pb-4 w-[85%] md:w-[30%]">
            {data.websites &&
              Object.keys(data?.websites).map((website, index) => (
                <li
                  style={{
                    border: `1.4px solid ${
                      data?.themeType !== "custom" &&
                      data?.customTheme?.stroke?.toString(16)
                    }`,
                    color: `${data?.customTheme?.linkColor?.toString(16)}`,
                    backgroundColor: `${data?.customTheme?.linkBackground?.toString(
                      16
                    )}`,
                  }}
                  onClick={() => window.open(data?.websites[website]?.link)}
                  key={index}
                  className="bg-slate-200 p-2 w-full text-center rounded-md font-Montserrat transition-all duration-300 ease-linear hover:ease-linear hover:scale-105 hover:duration-300 hover:transition-all cursor-pointer"
                >
                  {data.websites[website].title}
                </li>
              ))}
          </ul>
        </>
      )}
      {loading && (
        <div className="flex justify-center items-center h-[100vh]">
          <HashLoader color="#34d399" />
        </div>
      )}
    </div>
  );
};

export default UserLink;

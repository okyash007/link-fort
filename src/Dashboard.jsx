/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { HashLoader } from "react-spinners";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { userContext } from "./Contexts/userContext";
import { auth, db } from "./backend/firebaseConfig";
import Profile from "./Components/Dashboard/Profile";
import Social from "./Components/Dashboard/Social";
import Themes from "./Components/Dashboard/Themes";
import Other from "./Components/Dashboard/Other";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [menu, setMenu] = useState("profile");
  const [loading, setLoading] = useState(true);
  const contextData = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else {
        contextData.setData({
          ...contextData.data,
          userInfo: {
            ...contextData.data.userInfo,
            id: user.uid,
          },
        });
        getDataFromServer(user.uid);
      }
    });
    const getDataFromServer = async (id) => {
      const docRef = doc(db, "Link Forests", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        contextData.setData({
          ...contextData.data,
          userInfo: {
            description: docSnap.data().description,
            image: docSnap.data().image
              ? docSnap.data().image
              : "https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd",
            username: docSnap.data().username,
            name: docSnap.data().name,
            id: docSnap.id,
          },
          socialLinks: {
            ...docSnap.data().socialLinks,
          },
          customTheme: {
            ...(docSnap.data().customTheme
              ? docSnap.data().customTheme
              : {
                  background: "#ffffff",
                  textColor: "#000",
                  linkBackground: "#e2e8f0",
                  linkColor: "#000",
                }),
          },
          websites: {
            ...docSnap.data().websites,
          },
          themeType: docSnap.data().themeType
            ? docSnap.data().themeType
            : "default",
          theme: docSnap.data().theme ? docSnap.data().theme : "Default",
        });
        if (!docSnap.data().themeType || !docSnap.data().customTheme) {
          const updateRef = doc(db, "Link Forests", docSnap.id);
          await updateDoc(updateRef, {
            customTheme: {
              background: "#ffffff",
              textColor: "#000",
              linkBackground: "#e2e8f0",
              linkColor: "#000",
            },
            theme: "Default",
            themeType: "default",
            updatedTime: serverTimestamp(),
          });
        }
      } else {
        navigate("/username", { state: { type: "new" } });
      }
      setLoading(false);
    };
  }, []);

  return (
    <div className="h-[100vh] w-full bg-slate-100">
      {loading && (
        <div className="flex justify-center items-center h-[100vh]">
          <HashLoader color="#34d399" />
        </div>
      )}
      {!loading && contextData.data && (
        <div className="bg-slate-50 flex justify-center md:justify-evenly items-center pt-24 w-full flex-col md:flex-row">
          {/* Preview Section */}
          <div
            className={`rounded-xl shadow-md h-[70vh] md:h-[76vh] w-[75%] md:w-[22%] flex justify-start items-center flex-col px-6 overflow-scroll pb-4 mb-8 md:mb-0`}
            style={{
              backgroundColor: `${contextData.data?.customTheme?.background?.toString(
                16
              )}`,
            }}
          >
            <img
              src={
                contextData.data?.userInfo?.image === undefined
                  ? "https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd"
                  : contextData.data?.userInfo?.image
              }
              className="shadow rounded-full h-[80px] w-[80px] align-middle border-none object-cover mt-6"
              alt=""
            />
            <p
              className="mt-2 font-Montserrat font-semibold text-lg"
              style={{
                color: `${contextData.data?.customTheme?.textColor?.toString(
                  16
                )}`,
              }}
            >
              {contextData.data?.userInfo?.name}
            </p>
            <p
              className="mt-2 font-Montserrat font-medium text-xs text-center"
              style={{
                color: `${contextData.data?.customTheme?.textColor?.toString(
                  16
                )}`,
              }}
            >
              {contextData.data.userInfo?.description}
            </p>
            {contextData.data?.socialLinks && (
              <div className="flex justify-center items-center w-[70%] mt-4">
                {contextData.data?.socialLinks?.facebook && (
                  <a
                    target="_blank"
                    href={contextData?.data?.socialLinks?.facebook}
                    className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
                    style={{
                      color: `${contextData.data?.customTheme?.textColor?.toString(
                        16
                      )}`,
                    }}
                    rel="noreferrer"
                  >
                    <FaFacebookF />
                  </a>
                )}
                {contextData?.data?.socialLinks?.twitter && (
                  <a
                    target="_blank"
                    href={contextData?.data?.socialLinks?.twitter}
                    className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
                    style={{
                      color: `${contextData.data?.customTheme?.textColor?.toString(
                        16
                      )}`,
                    }}
                    rel="noreferrer"
                  >
                    <FaTwitter />
                  </a>
                )}
                {contextData?.data?.socialLinks?.instagram && (
                  <a
                    target="_blank"
                    href={contextData?.data?.socialLinks?.instagram}
                    className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
                    style={{
                      color: `${contextData.data?.customTheme?.textColor?.toString(
                        16
                      )}`,
                    }}
                    rel="noreferrer"
                  >
                    <FaInstagram />
                  </a>
                )}
                {contextData?.data?.socialLinks?.linkedin && (
                  <a
                    target="_blank"
                    href={contextData?.data?.socialLinks?.linkedin}
                    className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
                    style={{
                      color: `${contextData.data?.customTheme?.textColor?.toString(
                        16
                      )}`,
                    }}
                    rel="noreferrer"
                  >
                    <FaLinkedinIn />
                  </a>
                )}
                {contextData?.data?.socialLinks?.github && (
                  <a
                    target="_blank"
                    href={contextData?.data?.socialLinks?.github}
                    className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
                    style={{
                      color: `${contextData.data?.customTheme?.textColor?.toString(
                        16
                      )}`,
                    }}
                    rel="noreferrer"
                  >
                    <FaGithub />
                  </a>
                )}
                {contextData?.data?.socialLinks?.email && (
                  <a
                    target="_blank"
                    href={`mailto:${contextData?.data?.socialLinks?.email}`}
                    className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
                    style={{
                      color: `${contextData.data?.customTheme?.textColor?.toString(
                        16
                      )}`,
                    }}
                    rel="noreferrer"
                  >
                    <HiMail />
                  </a>
                )}
              </div>
            )}
            <ul
              className={`flex justify-center font-medium items-center flex-col w-[95%] gap-4 mt-5`}
            >
              {contextData?.data?.websites &&
                Object.keys(contextData?.data?.websites).map(
                  (website, index) => (
                    <li
                      style={{
                        borderColor: `${
                          contextData?.data?.themeType === "default" &&
                          contextData?.data?.customTheme?.stroke &&
                          contextData?.data?.customTheme?.stroke?.toString(16)
                        }`,
                        backgroundColor: `${contextData.data?.customTheme?.linkBackground?.toString(
                          16
                        )}`,
                        color: `${contextData.data?.customTheme?.linkColor?.toString(
                          16
                        )}`,
                      }}
                      onClick={() =>
                        window.open(contextData?.data?.websites[website].link)
                      }
                      key={index}
                      className={`bg-slate-200 px-2 py-[6px] md:py-[8px] text-xs md:text-sm w-full text-center rounded-md font-Montserrat transition-all duration-300 ease-linear hover:ease-linear hover:scale-105 hover:duration-300 hover:transition-all cursor-pointer ${
                        contextData?.data?.customTheme?.stroke &&
                        `border-[1.4px]`
                      }`}
                    >
                      {contextData?.data?.websites[website].title}
                    </li>
                  )
                )}
            </ul>
          </div>
          {/* Main Dashboard Section */}
          <div className="rounded-xl shadow-md md:h-[77vh] w-full md:w-[56%] flex justify-start items-center flex-col px-4 md:px-6 bg-white pb-4">
            <ul className="flex justify-evenly items-center my-4 w-full font-Montserrat font-medium text-base">
              <li
                onClick={() => setMenu("profile")}
                className={`${
                  menu === "profile"
                    ? "bg-slate-950 text-slate-50 shadow-lg shadow-slate-400/50"
                    : "text-slate-950 hover:bg-slate-200 ease-linear duration-100 transition-all hover:ease-linear hover:duration-100 hover:transition-all select-none"
                } px-2 py-1 md:py-[6px] rounded-lg text-[14px] md:text-sm w-full text-center mx-2 md:mx-5 cursor-pointer`}
              >
                Profile
              </li>
              <li
                onClick={() => setMenu("social")}
                className={`${
                  menu === "social"
                    ? "bg-slate-950 text-slate-50 shadow-lg shadow-slate-400/50"
                    : "text-slate-950 hover:bg-slate-200 ease-linear duration-100 transition-all hover:ease-linear hover:duration-100 hover:transition-all select-none"
                } px-2 py-1 md:py-[6px] rounded-lg text-[14px] md:text-sm w-full text-center mx-2 md:mx-5 cursor-pointer`}
              >
                Socials
              </li>
              <li
                onClick={() => setMenu("other")}
                className={`${
                  menu === "other"
                    ? "bg-slate-950 text-slate-50 shadow-lg shadow-slate-400/50"
                    : "text-slate-950 hover:bg-slate-200 ease-linear duration-100 transition-all hover:ease-linear hover:duration-100 hover:transition-all select-none"
                } px-2 py-1 md:py-[6px] rounded-lg text-[14px] md:text-sm w-full text-center mx-2 md:mx-5 cursor-pointer`}
              >
                Websites
              </li>
              <li
                onClick={() => setMenu("themes")}
                className={`${
                  menu === "themes"
                    ? "bg-slate-950 text-slate-50 shadow-lg shadow-slate-400/50"
                    : "text-slate-950 hover:bg-slate-200 ease-linear duration-100 transition-all hover:ease-linear hover:duration-100 hover:transition-all select-none"
                } px-2 py-1 md:py-[6px] rounded-lg text-[14px] md:text-sm w-full text-center mx-2 md:mx-5 cursor-pointer`}
              >
                Themes
              </li>
            </ul>
            <div className="w-full overflow-y-scroll p-2 md:p-4">
              {menu === "profile" && <Profile />}
              {menu === "other" && <Other />}
              {menu === "social" && <Social />}
              {menu === "themes" && <Themes />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

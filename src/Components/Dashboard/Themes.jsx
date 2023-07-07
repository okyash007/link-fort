import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { SwatchesPicker } from "react-color";
import { toast } from "react-hot-toast";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { userContext } from "../../Contexts/userContext";
import { db } from "../../backend/firebaseConfig";

const Themes = () => {
  const [colorPicker, setColorPicker] = useState(false);
  const contextData = useContext(userContext);
  const [type, setType] = useState();

  const colorChangeHandler = (color) => {
    let update = {};
    contextData.setData({
      ...contextData.data,
      themeType: "custom",
      customTheme: {
        ...contextData.data.customTheme,
        [type]: color.hex,
      },
    });
    update = {
      themeType: "custom",
      customTheme: {
        ...contextData.data.customTheme,
        [type]: color.hex,
      },
    };
    updateValueHandler(update);
  };
  const updateValueHandler = async (update) => {
    setColorPicker(false);
    toast.loading("Updating Theme");
    try {
      const updateRef = doc(db, "Link Forests", contextData.data.userInfo.id);
      await updateDoc(updateRef, {
        ...update,
        updatedTime: serverTimestamp(),
      });
      toast.dismiss();
      toast.success("Social Links Updated!");
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Something Went Wrong!");
    }
    setType();
  };

  const defaultThemeSelectHandler = (type) => {
    let update = {};
    if (type === "default") {
      contextData.setData({
        ...contextData.data,
        themeType: "default",
        theme: "Default",
        customTheme: {
          background: "#ffffff",
          textColor: "#000",
          linkBackground: "#e2e8f0",
          linkColor: "#000",
        },
      });
      update = {
        themeType: "default",
        theme: "Default",
        customTheme: {
          background: "#ffffff",
          textColor: "#000",
          linkBackground: "#e2e8f0",
          linkColor: "#000",
        },
      };
    } else if (type === "dark") {
      contextData.setData({
        ...contextData.data,
        themeType: "default",
        theme: "Dark",
        customTheme: {
          background: "#181818",
          textColor: "#ffffff",
          linkBackground: "#e7e7e7",
          linkColor: "#181818",
        },
      });
      update = {
        themeType: "default",
        theme: "Dark",
        customTheme: {
          background: "#181818",
          textColor: "#ffffff",
          linkBackground: "#e7e7e7",
          linkColor: "#181818",
        },
      };
    } else if (type === "minimal") {
      contextData.setData({
        ...contextData.data,
        themeType: "default",
        theme: "Minimal",
        customTheme: {
          background: "#fff",
          textColor: "#000",
          linkBackground: "#fff",
          linkColor: "#000",
          stroke: "#000",
        },
      });
      update = {
        themeType: "default",
        theme: "Minimal",
        customTheme: {
          background: "#fff",
          textColor: "#000",
          linkBackground: "#fff",
          linkColor: "#000",
          stroke: "#000",
        },
      };
    } else if (type === "linkforest") {
      contextData.setData({
        ...contextData.data,
        themeType: "default",
        theme: "Link Forest",
        customTheme: {
          background: "#d1fae5",
          textColor: "#000",
          linkBackground: "#34d399",
          linkColor: "#000",
        },
      });
      update = {
        themeType: "default",
        theme: "Link Forest",
        customTheme: {
          background: "#d1fae5",
          textColor: "#000",
          linkBackground: "#34d399",
          linkColor: "#000",
        },
      };
    } else if (type === "sky blue") {
      contextData.setData({
        ...contextData.data,
        themeType: "default",
        theme: "Sky Blue",
        customTheme: {
          background: "#fff",
          textColor: "#000",
          linkBackground: "#38bdf8",
          linkColor: "#000",
        },
      });
      update = {
        themeType: "default",
        theme: "Sky Blue",
        customTheme: {
          background: "#fff",
          textColor: "#000",
          linkBackground: "#38bdf8",
          linkColor: "#000",
        },
      };
    } else if (type === "shades of sky") {
      contextData.setData({
        ...contextData.data,
        themeType: "default",
        theme: "Shades Of Sky",
        customTheme: {
          background: "#fff",
          textColor: "#000",
          linkBackground: "#bae6fd",
          linkColor: "#0c4a6e",
          stroke: "#0c4a6e",
        },
      });
      update = {
        themeType: "default",
        theme: "Shades Of Sky",
        customTheme: {
          background: "#fff",
          textColor: "#000",
          linkBackground: "#bae6fd",
          linkColor: "#0c4a6e",
          stroke: "#0c4a6e",
        },
      };
    }
    updateValueHandler(update);
  };

  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div className="w-full">
        <p className="border-l-4 border-emerald-500 font-Montserrat font-semibold pl-2 text-lg my-4">
          Predefined Themes
        </p>
        <div className="my-4 flex md:justify-evenly items-center flex-wrap gap-4">
          <img
            src={require("../../assets/themes/Default.png")}
            className={`rounded-md cursor-pointer ${
              contextData.data.themeType === "default" &&
              contextData.data.theme === "Default" &&
              "border-2 border-slate-950"
            }`}
            onClick={() => defaultThemeSelectHandler("default")}
            alt=""
            width={90}
            height={90}
          />
          <img
            src={require("../../assets/themes/Dark.png")}
            className={`rounded-md cursor-pointer ${
              contextData.data.themeType === "default" &&
              contextData.data.theme === "Dark" &&
              "border-2 border-slate-950"
            }`}
            onClick={() => defaultThemeSelectHandler("dark")}
            alt=""
            width={90}
            height={90}
          />
          <img
            src={require("../../assets/themes/Link Forest.png")}
            className={`rounded-md cursor-pointer ${
              contextData.data.themeType === "default" &&
              contextData.data.theme === "Link Forest" &&
              "border-2 border-slate-950"
            }`}
            onClick={() => defaultThemeSelectHandler("linkforest")}
            alt=""
            width={90}
            height={90}
          />
          <img
            src={require("../../assets/themes/Minimal.png")}
            className={`rounded-md cursor-pointer ${
              contextData.data.themeType === "default" &&
              contextData.data.theme === "Minimal" &&
              "border-2 border-slate-950"
            }`}
            onClick={() => defaultThemeSelectHandler("minimal")}
            alt=""
            width={90}
            height={90}
          />{" "}
          <img
            src={require("../../assets/themes/Sky Blue.png")}
            className={`rounded-md cursor-pointer ${
              contextData.data.themeType === "default" &&
              contextData.data.theme === "Sky Blue" &&
              "border-2 border-slate-950"
            }`}
            onClick={() => defaultThemeSelectHandler("sky blue")}
            alt=""
            width={90}
            height={90}
          />{" "}
          <img
            src={require("../../assets/themes/Shaded Of Sky.png")}
            className={`rounded-md cursor-pointer ${
              contextData.data.themeType === "default" &&
              contextData.data.theme === "Shades Of Sky" &&
              "border-2 border-slate-950"
            }`}
            onClick={() => defaultThemeSelectHandler("shades of sky")}
            alt=""
            width={90}
            height={90}
          />
        </div>
      </div>
      <span className="w-full bg-slate-300 py-[0.6px] rounded my-4"></span>
      <div className="w-full">
        <p className="border-l-4 border-emerald-500 font-Montserrat font-semibold pl-2 text-lg my-4 select-none">
          Customized Themes
        </p>
        <div className="flex justify-between items-start flex-col-reverse md:flex-row">
          <ul className="mt-2">
            <li
              className={`flex items-center font-Montserrat mb-2 select-none font-medium  ${
                type === "background" && "font-semibold"
              }`}
            >
              Background Color:
              <span
                className={`ml-4 cursor-pointer ${
                  type === "background" && "text-emerald-500"
                }`}
                onClick={() => {
                  setType("background");
                  setColorPicker(true);
                }}
              >
                <HiOutlineColorSwatch fontSize={22} />
              </span>
              <span
                onClick={() => {
                  setType("background");
                  setColorPicker(true);
                }}
                className="h-4 w-4 rounded-full ml-2 border-2 border-black cursor-pointer"
                style={{
                  backgroundColor: `${contextData.data?.customTheme?.background?.toString(
                    16
                  )}`,
                }}
              ></span>
            </li>
            <li
              className={`flex items-center font-Montserrat mb-2 select-none font-medium  ${
                type === "textColor" && "font-semibold"
              }`}
            >
              Text Color:
              <span
                className={`ml-4 cursor-pointer ${
                  type === "textColor" && "text-emerald-500"
                }`}
                onClick={() => {
                  setType("textColor");
                  setColorPicker(true);
                }}
              >
                <HiOutlineColorSwatch fontSize={22} />
              </span>
              <span
                onClick={() => {
                  setType("textColor");
                  setColorPicker(true);
                }}
                className="h-4 w-4 rounded-full ml-2 border-2 border-black cursor-pointer"
                style={{
                  backgroundColor: `${contextData.data?.customTheme?.textColor?.toString(
                    16
                  )}`,
                }}
              ></span>
            </li>
            <li
              className={`flex items-center font-Montserrat mb-2 select-none font-medium  ${
                type === "linkBackground" && "font-semibold"
              }`}
            >
              Link Background Color:
              <span
                className={`ml-4 cursor-pointer ${
                  type === "linkBackground" && "text-emerald-500"
                }`}
                onClick={() => {
                  setType("linkBackground");
                  setColorPicker(true);
                }}
              >
                <HiOutlineColorSwatch fontSize={22} />
              </span>
              <span
                onClick={() => {
                  setType("linkBackground");
                  setColorPicker(true);
                }}
                className="h-4 w-4 rounded-full ml-2 border-2 border-black cursor-pointer"
                style={{
                  backgroundColor: `${contextData.data?.customTheme?.linkBackground?.toString(
                    16
                  )}`,
                }}
              ></span>
            </li>
            <li
              className={`flex items-center font-Montserrat mb-2 select-none font-medium  ${
                type === "linkColor" && "font-semibold"
              }`}
            >
              Link Text Color:
              <span
                className={`ml-4 cursor-pointer ${
                  type === "linkColor" && "text-emerald-500"
                }`}
                onClick={() => {
                  setType("linkColor");
                  setColorPicker(true);
                }}
              >
                <HiOutlineColorSwatch fontSize={22} />
              </span>
              <span
                onClick={() => {
                  setType("linkColor");
                  setColorPicker(true);
                }}
                className="h-4 w-4 rounded-full ml-2 border-2 border-black cursor-pointer"
                style={{
                  backgroundColor: `${contextData.data?.customTheme?.linkColor?.toString(
                    16
                  )}`,
                }}
              ></span>
            </li>
            {/* <li className={`flex items-center font-Montserrat mb-2 select-none font-medium  ${
                  type === "background" && "text-emerald-500"
                }s`}>
              Stroke Color:
              <span
                className={`ml-4 cursor-pointer ${
                  type === "stroke" && "text-emerald-500"
                }`}
                onClick={() => {setType("stroke"); setColorPicker(true)}}
              >
                <HiOutlineColorSwatch fontSize={22} />
              </span>
              <span
                onClick={() => {setType("stroke"); setColorPicker(true)}}
                className="h-4 w-4 rounded-full ml-2 border-2 border-black cursor-pointer"
                style={{
                  backgroundColor: `${contextData.data?.customTheme?.stroke?.toString(
                    16
                  )}`,
                }}
              ></span>
            </li> */}
          </ul>
          {colorPicker && (
            <div className="mb-4 md:mb-0">
              <SwatchesPicker triangle="hide" onChange={colorChangeHandler} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Themes;

// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { AiOutlineMenu } from "react-icons/ai";
import { auth } from "../backend/firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [login, setLogin] = useState(false);
  const [path, setPath] = useState();
  const [menu, setMenu] = useState(false);
  const provider = new GoogleAuthProvider();
  const router = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    });
    setPath(router.pathname);
  }, [router.pathname]);

  const googleLoginEventHandler = () => {
    toast.loading("Logging In");
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.dismiss();
        toast.success("Login Successfull");
        setLogin(true);
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
        toast.error("Login Failed");
      });
  };

  const logoutButtonHandler = () => {
    setLogin(false);
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfull");
      })
      .catch((error) => {
        toast.error("Logout Failed");
      });
  };

  const menuHandler = (type) => {
    if (type === "Home") navigate("/");
    if (type === "Dashboard") navigate("/dashboard");
    if (type === "Developer") window.open("https://okyash007.vercel.app");
    if (type === "Logout") logoutButtonHandler();
    if (type === "Login With Google") googleLoginEventHandler();
    setMenu(!menu);
  };
  return (
    <div className="bg-white w-full shadow-md px-6 py-3 flex justify-between items-center absolute top-0 z-20">
      <div
        onClick={() => navigate("/")}
        className="flex justify-center items-center"
      >
        <svg
          className="cursor-pointer hover:scale-105 transition-all ease-linear duration-300 hover:transition-all hover:ease-linear hover:duration-300 shadow"
          width="36"
          height="36"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="500" height="500" rx="43.3054" fill="#10b981" />
          <path
            d="M213.537 361.977C205.483 346.717 185.072 333.829 185.072 211.438V209.872L198.441 218.775C209.065 225.842 217.775 235.427 223.796 246.676C229.817 257.926 232.96 270.491 232.946 283.251H256.883C256.9 266.553 252.785 250.108 244.906 235.388C237.027 220.665 225.628 208.121 211.726 198.872L194.682 187.502H212.994C231.116 187.536 248.744 193.412 263.262 204.258L285.607 221.013L299.969 201.864L277.624 185.108C258.955 171.171 236.293 163.616 212.994 163.565H198.441C214.074 148.3 235.033 139.716 256.883 139.628H280.82V115.691H256.883C240.803 115.751 224.939 119.396 210.446 126.361C195.953 133.326 183.196 143.435 173.103 155.953C163.011 143.435 150.253 133.326 135.76 126.361C121.267 119.396 105.403 115.751 89.3239 115.691H65.3869V139.628H89.3239C111.174 139.716 132.132 148.3 147.766 163.565H133.212C109.914 163.616 87.2519 171.171 68.5825 185.108L46.2373 201.864L60.5995 221.013L82.9445 204.258C97.4626 193.412 115.09 187.536 133.212 187.502H151.524L134.493 198.872C120.588 208.119 109.187 220.663 101.306 235.385C93.4243 250.108 89.3082 266.55 89.3239 283.251H113.261C113.247 270.491 116.39 257.926 122.411 246.676C128.431 235.427 137.142 225.842 147.766 218.775L161.135 209.882V211.438C161.135 318.486 174.234 356.642 185.592 383.393H190.946H247.898H299.969V361.977H213.537Z"
            fill="black"
          />
          <path
            d="M453.722 139.235V172.001H349.786V244.228H430.821V276.993H349.786V384.099H309.621V139.235H453.722Z"
            fill="black"
          />
        </svg>
        <p className="font-semibold text-xl ml-4 font-Montserrat cursor-pointer">
          Link Forest
        </p>
      </div>
      <div className="flex justify-center items-center">
        {/* {!login && (
          <button
            className="font-medium font-Montserrat mx-4 cursor-pointer uppercase text-sm tracking-wider flex justify-center items-center px-3 py-[6px] rounded-md border-[1.4px] border-slate-950 hover:bg-slate-950 hover:text-slate-50 ease-linear duration-300 hover:transition-all hover:ease-linear hover:duration-300"
            onClick={googleLoginEventHandler}
          >
            Login With
            <span className="ml-2 text-lg">
              <FcGoogle />
            </span>
          </button>
        )} */}
        <div className="relative">
          <button className="text-2xl mx-4" onClick={() => setMenu(!menu)}>
            <AiOutlineMenu />
          </button>
          {menu && (
            <ul className="absolute right-2 top-10 bg-slate-200 px-4 py-2 w-[180px] rounded-md shadow-md">
              {login && (
                <>
                  {path !== "/" && (
                    <li
                      className="font-Montserrat font-medium my-2 text-sm tracking-wide cursor-pointer"
                      onClick={() => menuHandler("Home")}
                    >
                      Home
                    </li>
                  )}
                  {(path !== "/dashboard" || path === "/username") && (
                    <li
                      className="font-Montserrat font-medium my-2 text-sm tracking-wide cursor-pointer"
                      onClick={() => menuHandler("Dashboard")}
                    >
                      Dashboard
                    </li>
                  )}
                </>
              )}
              {!login && (
                <li
                  className="font-Montserrat font-medium my-2 text-sm tracking-wide cursor-pointer"
                  onClick={() => menuHandler("Login With Google")}
                >
                  Login With Google
                </li>
              )}
              <li
                className="font-Montserrat font-medium my-2 text-sm tracking-wide cursor-pointer"
                onClick={() => menuHandler("Developer")}
              >
                Developer
              </li>
              {login && (
                <li
                  className="font-Montserrat font-medium my-2 text-sm tracking-wide cursor-pointer"
                  onClick={() => menuHandler("Logout")}
                >
                  Logout
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

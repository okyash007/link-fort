import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { auth } from "./backend/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Index = () => {
  const provider = new GoogleAuthProvider();
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    });
  }, []);

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

  return (
    <div className="h-[100vh] w-full">
      <div className="mt-28 flex justify-center items-center flex-col w-full">
        <motion.p
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-6xl md:text-8xl font-Montserrat uppercase text-center font-bold tracking-wide text-slate-950 w-[80%]"
        >
          Link <span className="text-emerald-500">Forest</span>
        </motion.p>
        <motion.p
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-8 font-Montserrat font-semibold text-center text-xl md:text-3xl w-[80%]"
        >
          <span className="text-emerald-500 mx-1 text-xl md:text-3xl">
            &quot;
          </span>
          Simplify your{" "}
          <span className="border-b-2 border-emerald-500">online presence</span>{" "}
          with Link Forest
          <span className="text-emerald-500 mx-1 text-2xl md:text-4xl">
            &quot;
          </span>
        </motion.p>
        <div className="w-[80%] mt-16 flex justify-center md:justify-evenly items-center flex-col md:flex-row">
          
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
          >
            {!login && (
              <button
                className="text-slate-950 flex junpstify-center items-center font-Montserrat px-6 py-3 rounded mx-auto tracking-wide text-[18px] ease-linear hover:ease-linear transition-all hover:transition-all duration-300 hover:duration-300 hover:shadow-lg hover:shadow-emerald-600/50 bg-gradient-to-tr from-emerald-600 to-emerald-400 shadow-md shadow-emerald-400/50 font-semibold"
                onClick={googleLoginEventHandler}
              >
                Create Yours Now!
              </button>
            )}
            {login && (
              <button
                className="text-slate-50 bg-slate-950 flex junpstify-center items-center font-Montserrat px-6 py-3 rounded mx-auto tracking-wide text-[18px] ease-linear hover:ease-linear transition-all hover:transition-all duration-300 hover:duration-300 hover:shadow-lg hover:shadow-slate-800/50 shadow-md shadow-slate-700/50 font-semibold"
                onClick={() => navigate("/dashboard")}
              >
                Go To Dashboard
              </button>
            )}
            <p className="font-Montserrat font-medium text-xl mt-5 text-center">
              Unify your online presence with Link Forest
            </p>
            
          </motion.div>
        </div>
        {/* <div className="flex flex-col justify-center items-center w-full">
          <p className="text-3xl md:text-5xl font-semibold font-Montserrat my-10">
            Create Your In <span className="text-emerald-500">5 Steps</span>
          </p>
          <div className="flex justify-evenly items-start w-full">
            <ul>
              <li className="px-4 py-2 bg-slate-200 mb-3 rounded cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 hover:scale-105 font-Montserrat">
                Create Account And Username
              </li>
              <li className="px-4 py-2 bg-slate-200 mb-3 rounded cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 hover:scale-105 font-Montserrat">
                Enter Name And Description
              </li>
              <li className="px-4 py-2 bg-slate-200 mb-3 rounded cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 hover:scale-105 font-Montserrat">
                Add Links
              </li>
              <li className="px-4 py-2 bg-slate-200 mb-3 rounded cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 hover:scale-105 font-Montserrat">
                Select Theme
              </li>
              <li className="px-4 py-2 bg-slate-200 mb-3 rounded cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 hover:scale-105 font-Montserrat">
                You Are Ready 🚀
              </li>
            </ul>
          </div>
        </div> */}
        <div
          className="mt-10 w-full cursor-pointer"
          onClick={() => window.open("https://okyash007.vercel.app/")}
        >
          <p className="font-Montserrat font-semibold py-3 text-center">
            Developed With ❤️ By Yash Verma
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

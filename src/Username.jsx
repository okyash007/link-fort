import {
  Timestamp,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { auth, db } from "./backend/firebaseConfig";
import { userContext } from "./Contexts/userContext";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { HashLoader } from "react-spinners";
const Username = () => {
  const navigate = useNavigate();
  const router = useLocation();
  const contextData = useContext(userContext);
  const [usernameTemp, setUsernameTemp] = useState("");
  const [allUsernames, setAllUsernames] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else {
        if (router.state) {
          getAllUserNames();
        } else {
          navigate("/");
        }
      }
    });
  }, [navigate]);

  const getAllUserNames = async () => {
    setLoading(false);
    const querySnapshot = await getDocs(collection(db, "Link Forests"));
    querySnapshot.forEach((doc) => {
      setAllUsernames((allUsernames) => [...allUsernames, doc.data().username]);
    });
  };

  const setUsernameHandler = async (e) => {
    e.preventDefault();
    if (usernameTemp.length > 5) {
      toast.loading("Checking Username!");
      if (allUsernames.includes(usernameTemp.replace(" ", ""))) {
        toast.dismiss();
        toast.error("Username Already Exists!");
      } else {
        toast.dismiss();
        toast.success("Username Set Successfully!");
        contextData.setData({
          ...contextData.data,
          userInfo: {
            ...contextData.data.userInfo,
            username: usernameTemp.replace(" ", ""),
          },
        });
        const docData = {
          username: usernameTemp.toLowerCase().replace(" ", ""),
          updatedTime: Timestamp.now(),
        };
        await setDoc(
          doc(db, "Link Forests", contextData.data.userInfo.id),
          docData
        );
        navigate("/dashboard");
      }
    } else {
      toast.error("Username Too Small!");
    }
  };

  return (
    <div className="h-[100vh] w-full bg-slate-100 flex justify-center items-center">
      {loading && (
        <div className="flex justify-center items-center h-[100vh]">
          <HashLoader color="#34d399" />
        </div>
      )}
      {!loading && (
        <form
          className="bg-white shadow-lg p-5 rounded-md w-[90%] md:w-[35%] flex flex-col justify-center items-center"
          onSubmit={setUsernameHandler}
        >
          <p className="font-semibold font-Montserrat text-2xl text-center w-full">
            Enter Username
          </p>
          <input
            type="text"
            value={usernameTemp}
            className="outline-emerald-600 px-4 py-2 w-[70%] border-[1.4px] font-Montserrat font-medium border-slate-500 rounded-md my-4"
            onChange={(e) => setUsernameTemp(e.target.value)}
          />
          <button
            className="bg-emerald-500 mb-5 text-slate-950 px-4 py-2 font-Montserrat rounded-sm font-semibold"
            onClick={setUsernameHandler}
            type="submit"
          >
            Set Username
          </button>
        </form>
      )}
    </div>
  );
};

export default Username;

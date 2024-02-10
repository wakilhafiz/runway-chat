import Lottie from "lottie-react";
import regAnime from "../../../public/animation-json/Animation - 1699873431295.json";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();

  // input value state start
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // input value state end

  // error message handling start

  const [fullNameError, setFullNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  // error message handling end

  // show password state start
  const [showPassword, setShowPassword] = useState(false);

  // show password state end

  // input value handling start
  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  // input value handling end

  // regex start

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );

  // regex end

  // form submit start

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fullName == "") {
      setFullNameError("Please enter your name");
    } else if (email == "") {
      setEmailError("Please enter your email");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
    } else if (password == "") {
      setPasswordError("Please enter your password");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one lowercase letter, one uppercase letter, and either a digit or meet the minimum length of 6 characters"
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL:
              "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
          })
            // Signed up
            .then(() => {
              toast.success("Registration Successfull", {
                position: toast.POSITION.TOP_CENTER,
              });
              navigate("/");
              set(ref(db, "users/" + auth.currentUser.uid), {
                username: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
              });
            });
        })

        .catch((error) => {
          console.log(error);
          // ..
        });
    }
  };

  // form submit end

  return (
    <div id="registration">
      <div className="main">
        <div className="left">
          <Lottie animationData={regAnime}></Lottie>
        </div>
        <div className="right">
          <h1 className="main-heading">Runway Chat</h1>
          <p className="pera text-lg">Get started with easily register</p>

          <div className="mt-5 md:mt-[50px]">
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleFullName}
                type="text"
                placeholder="Enter Your Name"
              />
              <p className="error_text text-left mb-2">{fullNameError}</p>
              <input
                onChange={handleEmail}
                type="email"
                placeholder="Enter Your Email"
              />
              <p className="error_text text-left mb-2">{emailError}</p>

              <div className="relative">
                <input
                  onChange={handlePassword}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                />
                {showPassword ? (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-3 cursor-pointer text-primary text-lg"
                  ></FaEye>
                ) : (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-3 cursor-pointer text-primary text-lg"
                  ></FaEyeSlash>
                )}
              </div>

              <p className="error_text text-left mb-2">{passwordError}</p>
              <button className="button_v_1">Registration </button>
            </form>
            <p className="pera text-base mt-5">
              Already have an account? Please{" "}
              <Link to={"/"} className="text-primary cursor-pointer font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

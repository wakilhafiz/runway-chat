import Lottie from "lottie-react";
import loginAnime from "../../../../public/animation-json/Animation - 1700040011951.json";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../../slices/userSlice";

const Login = () => {
  const auth = getAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // input value state start

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // input value state end

  // error message handling start

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  // error message handling end

  // show password state start
  const [showPassword, setShowPassword] = useState(false);

  // show password state end

  // input value handling start

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

  // regex end

  // form submit start

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email == "") {
      setEmailError("Please enter your email");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
    } else if (password == "") {
      setPasswordError("Please enter your password");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Login Successfull", {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(userLoginInfo(user));
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
        });
    }
  };

  // form submit end

  return (
    <div id="registration">
      <div className="main">
        <div className="left">
          <Lottie animationData={loginAnime}></Lottie>
        </div>
        <div className="right">
          <h1 className="main-heading">Runway Chat</h1>
          <p className="pera text-lg">Login to your account</p>

          <div className="mt-5 md:mt-[50px]">
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleEmail}
                type="text"
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
              <button className="button_v_1">Login </button>
            </form>
            <p className="pera text-base mt-5">
              Don't have an account ? Please
              <Link
                to={"/registration"}
                className="text-primary cursor-pointer font-bold ml-1"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

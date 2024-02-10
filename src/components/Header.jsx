import { FaCloudUploadAlt } from "react-icons/fa";
import { SlHome } from "react-icons/sl";
import {
  IoChatbubbleEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";

import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { createRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { userLoginInfo } from "../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storage = getStorage();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [modal, setModal] = useState(false);

  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(userLoginInfo(null));
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleProfileUpload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    // console.log(files);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage, auth.currentUser.uid);

      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        // console.log('Uploaded a data_url string!');
        getDownloadURL(storageRef).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, { photoURL: downloadURL });
          dispatch(
            userLoginInfo({
              ...data,
              photoURL: downloadURL,
            })
          );
          localStorage.setItem("user", JSON.stringify(auth.currentUser));
          setModal(false);
        });
      });
    }
  };

  return (
    <div id="header">
      <div className="main">
        <div className="left">
          <ul>
            <li>
              {" "}
              <Link to="/home">
                <SlHome></SlHome>
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/chat">
                <IoChatbubbleEllipsesOutline></IoChatbubbleEllipsesOutline>
              </Link>{" "}
            </li>

            <li>
              {" "}
              <IoSettingsOutline></IoSettingsOutline>{" "}
            </li>
            <li>
              {" "}
              <VscSignOut onClick={handleLogOut}></VscSignOut>{" "}
            </li>
          </ul>
        </div>

        <div className="right">
          <div>
            <h2 className="main-heading !text-2xl !text-third mr-2">
              {data?.displayName}
            </h2>
          </div>
          <div className="img">
            <img src={data?.photoURL} alt="" />
            <div className="upload_icon" onClick={() => setModal(!modal)}>
              <FaCloudUploadAlt></FaCloudUploadAlt>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="profilePictureUploadmodal">
          <div className="modal">
            <h1 className="main-heading text-3xl mb-5">Upload Photo</h1>

            <div className="my-3">
              <input onChange={handleProfileUpload} type="file" />
            </div>

            {image ? (
              <div className="img-preview"> </div>
            ) : (
              <div className="profileImage">
                <img src={data?.photoURL} alt="" />
              </div>
            )}

            {image && (
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            )}

            <div className="flex gap-2 mt-5">
              {image && (
                <button onClick={getCropData} className="button_v_2 py-3">
                  Upload
                </button>
              )}
              <button
                onClick={() => {
                  setModal(!modal), setCropData(""), setImage("");
                }}
                className="button_v_3 py-3"
              >
                Cancel{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

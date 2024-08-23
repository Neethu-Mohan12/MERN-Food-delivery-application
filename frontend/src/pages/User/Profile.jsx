import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai"; // Importing the edit icon
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editField, setEditField] = useState(""); // New state to track which field is being edited

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const handleSave = async (field) => {
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username: field === "username" ? username : userInfo.username,
        email: field === "email" ? email : userInfo.email,
        password: field === "password" ? password : "",
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
      setEditField(""); // Reset the edit field state
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="relative bg-cover bg-center bg-no-repeat min-h-screen md:h-auto flex items-center h-full w-full object-cover" style={{ backgroundImage: `url('./images/bg2.jpg')` }}>
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4 ">
        <div className="md:w-1/3 bg-white p-5 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Name</label>
            {editField === "username" ? (
              <>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-input p-4 rounded-sm w-full"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <button
                  onClick={() => handleSave("username")}
                  className="bg-orange-500 text-gray-400 py-2 px-4 rounded hover:bg-orange-600 mt-2"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span>{username}</span>
                <AiFillEdit
                  onClick={() => setEditField("username")}
                  className="text-xl cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Email Address</label>
            {editField === "email" ? (
              <>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-input p-4 rounded-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={() => handleSave("email")}
                  className="bg-orange-500 text-gray-400 py-2 px-4 rounded hover:bg-orange-600 mt-2"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span>{email}</span>
                <AiFillEdit
                  onClick={() => setEditField("email")}
                  className="text-xl cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Password</label>
            {editField === "password" ? (
              <>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-input p-4 rounded-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="form-input p-4 rounded-sm w-full mt-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  onClick={() => handleSave("password")}
                  className="bg-orange-500 text-gray-400 py-2 px-4 rounded hover:bg-orange-600 mt-2"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span>********</span>
                <AiFillEdit
                  onClick={() => setEditField("password")}
                  className="text-xl cursor-pointer"
                />
              </div>
            )}
          </div>

        
          {loadingUpdateProfile && <Loader />}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;

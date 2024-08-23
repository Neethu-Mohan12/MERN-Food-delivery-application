import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import Navigation from "../Auth/Navigation";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserType, setEditableUserType] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, userType) => {
    setEditableUserId(id);
    setEditableUserType(userType);
  };

  const updateHandler = async (id) => {
    try {
      const data = {
        userId: id,
        userType: editableUserType,
      };

      console.log("Sending user data to backend:", data);

      await updateUser(data);
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
    <Navigation/>
    <div className="p-4 mt-5">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <div className="hidden md:block">
            <table className="w-full mx-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">NAME</th>
                  <th className="px-4 py-2 text-left">EMAIL</th>
                  <th className="px-4 py-2 text-left">USER TYPE</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <select
                            value={editableUserType}
                            onChange={(e) => setEditableUserType(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="user">User</option>
                            <option value="restaurant">Restaurant</option>
                          </select>
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.isAdmin ? (
                            <p>Admin</p>
                          ) : (
                            <p>{user.userType}</p>
                          )}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.userType)
                            }
                          >
                            {!user.isAdmin && <FaEdit className="ml-[1rem]" />}
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden space-y-4">
            {users.map((user) => (
              <div key={user._id} className="border p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <div>
                    <strong>ID:</strong> {user._id}
                  </div>
                  <div>
                    <strong>NAME:</strong> {user.username}
                  </div>
                  <div>
                    <strong>EMAIL:</strong> <a href={`mailto:${user.email}`}>{user.email}</a>
                  </div>
                  <div>
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <select
                          value={editableUserType}
                          onChange={(e) => setEditableUserType(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="user">User</option>
                          <option value="restaurant">Restaurant</option>
                        </select>
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.isAdmin ? (
                          <p>Admin</p>
                        ) : (
                          <p>{user.userType}</p>
                        )}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.userType)
                          }
                        >
                          {!user.isAdmin && <FaEdit className="ml-[1rem]" />}
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    {!user.isAdmin && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default UserList;



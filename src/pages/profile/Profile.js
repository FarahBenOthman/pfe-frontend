import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import PageMenu from "../../components/pageMenu/PageMenu";
import { shortenText } from "../../utils";

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);

  // Initial state for the profile
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    address: {
      address: user?.address?.address || "",
    },
  };

  const [profile, setProfile] = useState(initialState);

  // Fetch user if not available
  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  // Update profile state when the user changes
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
        address: {
          address: user.address?.address || "",
        },
      });
    }
  }, [user]);

  // Handle input changes, including nested address fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "address") {
      setProfile((prevProfile) => ({
        ...prevProfile,
        address: {
          ...prevProfile.address,
          address: value, // Update the address field
        },
      }));
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  // Save profile data
  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: profile.name,
        phone: profile.phone,
        address: {
          address: profile.address?.address || "",
        },
      };

      dispatch(updateUser(userData));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {!isLoading && user && (
                <>
                  <form onSubmit={saveProfile}>
                    <p>
                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.name}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={profile?.email}
                        
                      />
                    </p>
                    <p>
                      <label>Phone:</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Address:</label>
                      <input
                        type="text"
                        name="address"
                        value={profile?.address?.address || ""}
                        onChange={handleInputChange}
                      />
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                      Update Profile
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export const UserName = () => {
  const user = useSelector((state) => state.auth.user);

  const username = user?.name || "...";

  return (
    <span style={{ color: "#ff7722" }}>Hi, {shortenText(username, 9)} |</span>
  );
};

export default Profile;

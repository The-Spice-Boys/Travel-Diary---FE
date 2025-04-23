import { useState, useEffect, useContext } from "react";
import { FaUpload } from "react-icons/fa";
import { themeToggle } from "../utils/utils";
import { ThemeContext, UserContext } from "../context/User";
import {updateUser} from "../api.js";
import {LoginPage} from "./LoginPage.jsx";
// import {LoginPage} from "./LoginPage.jsx";
// import { updateUser, updateUserPassword } from "../loginNSetting.js";

export const UserSettingsPage = () => {
  // const emailCheckRegex =/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/
  const [userName, setUserName] = useState("");
  const [biography, setBiography] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { setTheme } = useContext(ThemeContext);
  const { loggedInUser, isLoggedIn } = useContext(UserContext);

  const myPassword = loggedInUser.password || "";
  const [publicDetailsUpdateStatus, setPublicDetailsUpdateStatus] = useState(false);
  const [publicDetailsUpdateError, setPublicDetailsUpdateError] = useState(false);
  const [privateDetailsUpdateStatus, setPrivateDetailsUpdateStatus] = useState(false);
  const [privateDetailsUpdateError, setPrivateDetailsUpdateError] = useState(false);
  const [passwordUpdateStatus, setPasswordUpdateStatus] = useState(false);

  useEffect(() => {
    setUserName(loggedInUser.username || "");
    setBiography(loggedInUser.bio || "");
    setFirstName(loggedInUser.firstName || "");
    setLastName(loggedInUser.lastName || "");
    setNewEmail(loggedInUser.email || "");
    setPrivacy(loggedInUser.isPrivate);
    /*setPasswordMatch(newPassword === confirmNewPassword && newPassword !== "");*/
  }, [newPassword, confirmNewPassword, currentTheme, loggedInUser]);

  const handlePublicInfoSubmit = (event) => {
    event.preventDefault();
    if(userName !== "" && biography !== "")
    {
      const user = {
        username: userName,
        bio: biography,
      };
      updateUser(loggedInUser.userId,user).then(() => {});
      setUserName("");
      setBiography("");
      setPublicDetailsUpdateStatus(true);
      setPublicDetailsUpdateError(false);
    }
    else
    {
      setPublicDetailsUpdateStatus(false);
      setPublicDetailsUpdateError(true);
    }
  };

  const handlePrivateInfoSubmit = (event) => {
    event.preventDefault();
    if(firstName !== "" && lastName !== "" && newEmail !== "")
    {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: newEmail,
      };
      updateUser(loggedInUser.userId,user).then((res) => {
        console.log(res.status);
      });
      setFirstName("");
      setLastName("");
      setNewEmail("");
      setPrivateDetailsUpdateStatus(true);
      setPrivateDetailsUpdateError(false);
    }else{
      setPrivateDetailsUpdateStatus(false);
      setPrivateDetailsUpdateError(true);
    }

  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (newPassword === confirmNewPassword && newPassword !== "" && currentPassword === myPassword && currentPassword !== "") {
      const passwordMap = {
        password: newPassword,
      };
      updateUser(loggedInUser.userId,passwordMap)
        .then(() => {})
        .catch((err) => {
          console.log("Password update failed: ", err.response.data.message);
        });
      setPasswordUpdateStatus(true);
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handlerChangePrivacy = (event) => {
    const checked = event.target.checked;
    setPrivacy(checked);
    const user = {
      private: checked,
    };
    updateUser(loggedInUser.userId,user).then(() => {});
  };

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="container my-3">
      <h1 className="h3 my-3">Settings</h1>
      <div className="row">
        <div className="col-md-5 col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title my-1">Profile Settings</h5>
            </div>
            <div className="list-group list-group-flush" role="tablist">
              <a
                className="list-group-item list-group-item-action active"
                data-bs-toggle="list"
                href="#account"
                role="tab"
              >
                Account
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-bs-toggle="list"
                href="#password"
                role="tab"
              >
                Password
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-bs-toggle="list"
                href="#privacy"
                role="tab"
              >
                Privacy and safety
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-bs-toggle="list"
                href="#theme"
                role="tab"
              >
                Theme
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-7 col-xl-8">
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="account"
              role="tabpanel"
            >
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title my-1">Public info</h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="inputUsername" className="mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputUsername"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="inputUsername" className="mb-2">
                            Biography
                          </label>
                          <textarea
                            rows="2"
                            className="form-control"
                            id="inputBio"
                            placeholder="Write something about yourself"
                            value={biography}
                            onChange={(e) => setBiography(e.target.value)}
                          required></textarea>
                        </div>
                      </div>
                      <div className="col-md-4 my-1">
                        <div className="text-center">
                          <img
                            alt="Andrew Jones"
                            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                            className="rounded-circle img-responsive mt-2"
                            width="128"
                            height="128"
                          />
                          <div className="mt-2">
                            <span>
                              <label htmlFor="formFile" className="form-label">
                                <FaUpload
                                  className="upload-button"
                                  type="file"
                                  size={20}
                                />
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                hidden
                              />
                            </span>
                          </div>

                          <small>
                            For best results, use an image at least 128px by
                            128px in .jpg format
                          </small>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handlePublicInfoSubmit}
                    >
                      Save changes
                    </button>
                  </form>
                  <div className={`d-flex justify-content-between align-items-center mt-3 text-danger-emphasis ${publicDetailsUpdateError ? "":"d-none"}`}>Please do not leave username or bio blank!</div>
                  <div className={`d-flex justify-content-between align-items-center mt-3 text-success-emphasis ${publicDetailsUpdateStatus ? "":"d-none"}`}>Your details have been updated successfully!</div>
                </div>
              </div>

              <div className="card my-4">
                <div className="card-header">
                  <h5 className="card-title my-1">Private info</h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-row mt-3">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputFirstName" className="mb-2">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputFirstName"
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-md-6 mt-3">
                        <label htmlFor="inputLastName" className="mb-2">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputLastName"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="inputEmail4" className="mb-2">
                        Change email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mt-5"
                      onClick={handlePrivateInfoSubmit}
                    >
                      Save changes
                    </button>
                  </form>
                  <div className={`d-flex justify-content-between align-items-center mt-3 text-danger-emphasis ${privateDetailsUpdateError ? "":"d-none"}`}>Please fill all necessary fields!</div>
                  <div className={`d-flex justify-content-between align-items-center mt-3 text-success-emphasis ${privateDetailsUpdateStatus ? "":"d-none"}`}>Your details have been updated successfully!</div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="password" role="tabpanel">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Password</h5>
                  <form>
                    <div className="form-group mt-3">
                      <label htmlFor="inputPasswordCurrent" className="mb-2">
                        Current password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPasswordCurrent"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      {currentPassword && currentPassword !== myPassword ? (
                        <small style={{ color: "red" }}>
                          Password is incorrect, please try again
                        </small>
                      ) : null}
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="inputPasswordNew" className="mb-2">
                        New password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPasswordNew"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="inputPasswordNew2" className="mb-2">
                        Confirm new password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPasswordNew2"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                      {newPassword &&
                      confirmNewPassword &&
                      newPassword !== confirmNewPassword ? (
                        <small style={{ color: "red" }}>
                          Passwords do not match
                        </small>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mt-5"
                      onClick={handleChangePassword}
                      disabled={
                        newPassword !== confirmNewPassword ||
                        !currentPassword ||
                        !newPassword ||
                        !confirmNewPassword
                      }
                    >
                      Save changes
                    </button>
                  </form>
                  <div className={`d-flex justify-content-between align-items-center mt-3 text-success-emphasis ${passwordUpdateStatus ? "":"d-none"}`}>Your details have been updated successfully!</div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="privacy" role="tabpanel">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Privacy</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-muted mb-0">
                      This will keep your photos and notes private only your
                      itineraries will remain public.
                    </p>
                    <div className="form-switch m-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        checked={privacy}
                        onChange={handlerChangePrivacy}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="theme" role="tabpanel">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Choose your theme</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-muted mb-0">Enable dark mode</p>
                    <div className="form-check form-switch m-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        checked={currentTheme}
                        onChange={(e) => {
                          setCurrentTheme(e.target.checked);
                          themeToggle(currentTheme);
                          setTheme("#212529");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

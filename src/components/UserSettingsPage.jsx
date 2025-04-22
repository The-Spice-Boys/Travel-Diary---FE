import {useState, useEffect, useContext} from "react";
import { FaUpload } from "react-icons/fa";
import { themeToggle } from "../utils/utils";
import { ThemeContext } from "../context/User";

export const UserSettingsPage = () => {
  // const emailCheckRegex =/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/
  const [userName, setUserName] = useState("")
  const [biography, setBiography] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [city, setCity] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [privacy, setPrivacy]=useState(false)
  const [currentTheme, setCurrentTheme]=useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const {setTheme} = useContext(ThemeContext)

  const myPassword = "password123"
  

  useEffect(() => {
    console.log("privacy settings>>", privacy)
    setPasswordMatch(newPassword === confirmNewPassword && newPassword !== "");
  }, [newPassword, confirmNewPassword, privacy, currentTheme]);


  const handlePublicInfoSubmit = (event) => {
    event.preventDefault()
    console.log(userName)
    console.log(biography)
    setUserName("")
    setBiography("")
  }

  const handlePrivateInfoSubmit = (event) => {
    event.preventDefault()
    console.log(firstName)
    console.log(lastName)
    console.log(newEmail)
    console.log(city)
    setFirstName("")
    setLastName("")
    setNewEmail("")
    setCity("")
  }
 
  const handleChangePassword = (event) => {
    event.preventDefault();
    console.log("New password >>", newPassword)

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }

  return (
    <div className="container p-0">
    <h1 className="h3 my-3">Settings</h1>
    <div className="row">
        <div className="col-md-5 col-xl-4">

            <div className="card">
                <div className="card-header">
                    <h5 className="card-title my-1">Profile Settings</h5>
                </div>

                <div className="list-group list-group-flush" role="tablist">
                    <a className="list-group-item list-group-item-action active" data-bs-toggle="list" href="#account" role="tab">
                      Account
                    </a>
                    <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#password" role="tab">
                      Password
                    </a>
                    <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#privacy" role="tab">
                      Privacy and safety
                    </a>
                    <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#theme" role="tab">
                      Theme
                    </a>
                    
                </div>
            </div>
        </div>

        <div className="col-md-7 col-xl-8">
            <div className="tab-content">
                <div className="tab-pane fade show active" id="account" role="tabpanel">

                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title my-1">Public info</h5>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="inputUsername" className="mb-2">Username</label>
                                            <input type="text" className="form-control" id="inputUsername" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="inputUsername" className="mb-2">Biography</label>
                                            <textarea rows="2" className="form-control" id="inputBio" placeholder="Write something about yourself" value={biography} onChange={(e) => setBiography(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-4 my-1">
                                        <div className="text-center">
                                            <img alt="Andrew Jones" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" class="rounded-circle img-responsive mt-2" width="128" height="128"/>
                                            <div className="mt-2">
                            
                                                <span>
                                                  <label htmlFor="formFile" className="form-label">
                                                  <FaUpload className="upload-button" type="file" size={20}/>
                                                      </label>
                                                      <input className="form-control" type="file" id="formFile" hidden/>
                                                    </span>
                                                </div>
                                            
                                            <small>For best results, use an image at least 128px by 128px in .jpg format</small>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary" onClick={handlePublicInfoSubmit}>Save changes</button>
                            </form>

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
                                        <label htmlFor="inputFirstName" className="mb-2">First name</label>
                                        <input type="text" className="form-control" id="inputFirstName" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                    </div>
                                    <div className="form-group col-md-6 mt-3">
                                        <label htmlFor="inputLastName" className="mb-2">Last name</label>
                                        <input type="text" className="form-control" id="inputLastName" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="inputEmail4" className="mb-2">Change email</label>
                                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                                </div>
                                <div className="form-row mt-3">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity" className="mb-2">City</label>
                                        <input type="text" class="form-control" id="inputCity" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)}/>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mt-5" onClick={handlePrivateInfoSubmit}>Save changes</button>
                            </form>

                        </div>
                    </div>
                </div>


              <div className="tab-pane fade" id="password" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Password</h5>
                    <form>
                      <div className="form-group mt-3">
                        <label htmlFor="inputPasswordCurrent" className="mb-2">Current password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPasswordCurrent"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        {currentPassword && currentPassword !== myPassword ? (
                            <small style={{ color: "red" }}>Password is incorrect, please try again</small>)
                          : null}
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="inputPasswordNew" className="mb-2">New password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPasswordNew"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="inputPasswordNew2" className="mb-2">Confirm new password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPasswordNew2"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        {newPassword && confirmNewPassword && newPassword !== confirmNewPassword ? (
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
                          currentPassword !== myPassword ||
                          newPassword !== confirmNewPassword ||
                          !currentPassword || !newPassword || !confirmNewPassword
                        }
                      >
                        Save changes
                      </button>
                      </form>
                    </div>
                  </div>
                </div>


                <div className="tab-pane fade" id="privacy" role="tabpanel">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Privacy</h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-muted mb-0">This will keep your photos and notes private only your itineraries will  remain public.</p>
                          <div className="form-switch m-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                              checked={privacy}
                            onChange={(e) => setPrivacy(e.target.checked)}
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
                                    onChange={(e) => {setCurrentTheme(e.target.checked)
                                      themeToggle(currentTheme)
                                      setTheme("#212529")
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

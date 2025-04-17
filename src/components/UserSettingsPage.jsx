import {useState, useEffect} from "react";
import { FaUpload } from "react-icons/fa";

export const UserSettingsPage = () => {
  // const emailCheckRegex =/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/
  const [userName, setUserName] = useState("")
  const [biography, setBiography] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [city, setCity] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [privacy, setPrivacy]=useState(false)
  const [theme, setTheme]=useState(false)
  
  useEffect(()=>{
    console.log(privacy,"this is the privacy")
    console.log(theme,"this is the theme")

  },[privacy, theme])


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
  }

  const handleChangePassword = (event) => {
    event.preventDefault()
    console.log(firstName)
  }

  const handlePrivacyChange =(event)=>{
    event.preventDefault();
    console.log(privacy)
    
  }

  const handleThemeChange =(event)=>{
    event.preventDefault();
    console.log(theme)
    
  }

  return (
    <div class="container p-0">
    <h1 class="h3 my-3">Settings</h1>
    <div class="row">
        <div class="col-md-5 col-xl-4">

            <div class="card">
                <div class="card-header">
                    <h5 class="card-title my-1">Profile Settings</h5>
                </div>

                <div class="list-group list-group-flush" role="tablist">
                    <a class="list-group-item list-group-item-action active" data-bs-toggle="list" href="#account" role="tab">
                      Account
                    </a>
                    <a class="list-group-item list-group-item-action" data-bs-toggle="list" href="#password" role="tab">
                      Password
                    </a>
                    <a class="list-group-item list-group-item-action" data-bs-toggle="list" href="#privacy" role="tab">
                      Privacy and safety
                    </a>
                    <a class="list-group-item list-group-item-action" data-bs-toggle="list" href="#theme" role="tab">
                      Theme
                    </a>
                    
                </div>
            </div>
        </div>

        <div class="col-md-7 col-xl-8">
            <div class="tab-content">
                <div class="tab-pane fade show active" id="account" role="tabpanel">

                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title my-1">Public info</h5>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label htmlFor="inputUsername" className="mb-2">Username</label>
                                            <input type="text" class="form-control" id="inputUsername" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label htmlFor="inputUsername" className="mb-2">Biography</label>
                                            <textarea rows="2" class="form-control" id="inputBio" placeholder="Write something about yourself" value={biography} onChange={(e) => setBiography(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-4 my-1">
                                        <div class="text-center">
                                            <img alt="Andrew Jones" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" class="rounded-circle img-responsive mt-2" width="128" height="128"/>
                                            <div class="mt-2">
                                                {/* <input class="form-control" type="file" id="formFileMultiple" multiple/>
                                                <span class="btn btn-primary"><FaUpload /></span> */}
                                                <span className="btn btn-primary" >
                                                  <FaUpload />
                                                    </span>
                                                </div>
                                            
                                            <small>For best results, use an image at least 128px by 128px in .jpg format</small>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary" onClick={handlePublicInfoSubmit}>Save changes</button>
                            </form>

                        </div>
                    </div>

                    <div class="card my-4">
                        <div class="card-header">
                            <h5 class="card-title my-1">Private info</h5>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-row mt-3">
                                    <div class="form-group col-md-6">
                                        <label htmlFor="inputFirstName" className="mb-2">First name</label>
                                        <input type="text" class="form-control" id="inputFirstName" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                    </div>
                                    <div class="form-group col-md-6 mt-3">
                                        <label htmlFor="inputLastName" className="mb-2">Last name</label>
                                        <input type="text" class="form-control" id="inputLastName" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="form-group mt-3">
                                    <label htmlFor="inputEmail4" className="mb-2">Change email</label>
                                    <input type="email" class="form-control" id="inputEmail4" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                                </div>
                                <div class="form-row mt-3">
                                    <div class="form-group col-md-6">
                                        <label htmlFor="inputCity" className="mb-2">City</label>
                                        <input type="text" class="form-control" id="inputCity" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)}/>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary mt-5" onClick={handlePrivateInfoSubmit}>Save changes</button>
                            </form>

                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="password" role="tabpanel">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Password</h5>
                            <form>
                                <div class="form-group mt-3">
                                    <label htmlFor="inputPasswordCurrent" className="mb-2">Current password</label>
                                    <input type="password" class="form-control" id="inputPasswordCurrent"/>
                                </div>
                                <div class="form-group mt-3">
                                    <label htmlFor="inputPasswordNew" className="mb-2">New password</label>
                                    <input type="password" class="form-control" id="inputPasswordNew" />
                                </div>
                                <div class="form-group mt-3">
                                    <label htmlFor="inputPasswordNew2" className="mb-2">Confirm new password</label>
                                    <input type="password" class="form-control" id="inputPasswordNew2" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                                </div>
                                <button type="submit" class="btn btn-primary mt-5" onClick={handleChangePassword}>Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>


                <div class="tab-pane fade" id="privacy" role="tabpanel">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Privacy</h5>
                      <div class="d-flex justify-content-between align-items-center">
                        <p class="text-muted mb-0">This will keep your photos and notes private only your itineraries will  remain public.</p>
                          <div class="form-switch m-0">
                            <input
                              class="form-check-input"
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

                <div class="tab-pane fade" id="theme" role="tabpanel">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Choose your theme</h5>
                            <div class="d-flex justify-content-between align-items-center">
                              <p class="text-muted mb-0">Enable dark mode</p>
                                <div class="form-check form-switch m-0">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckChecked"
                                    checked={theme}
                                    onChange={(e) => setTheme(e.target.checked)}
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

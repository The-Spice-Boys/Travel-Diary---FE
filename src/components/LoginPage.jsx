import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";
import {userLogin,loginStatus} from "../loginNSetting.js";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isValidate, setIsValidate] = useState(true);

  const { setLoggedInUser,setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(username, password).then((data) => {
      setLoggedInUser(data);
      setIsLoggedIn(true);
      console.log(data);
      navigate('/');
    }).catch((err) => {
      if(err.response.status === 401){
        setIsValidate(false);
      }
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     [INSERT POST CALL]
//       .then((data) => {
//             setLoggedInUser(data.[something])
//             navigate("/")
//         }).catch((err) => {
//             setErrorMsg("Invalid username or password");
//             console.error(err);
//         });
// };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Log In</h2>
        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username::
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={`mb-3 form-check text-danger-emphasis ${isValidate ? "d-none" : null}`}>Invalid Username Or Password</div>
          <button type="submit" className="btn btn-primary w-100">
            Log in!
          </button>
        </form>
      </div>
    </div>
  );
};

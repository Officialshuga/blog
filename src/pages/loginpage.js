import { auth, provider, db } from "../firebaseconfig/firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import {doc, setDoc} from "firebase/firestore";



const LoginPage = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerwithemailandpassword = async (event) => {
    try {
      event.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      const User = auth.currentUser;
      console.log(User)
      alert("REGISTERATION SUCCESSFUL PLS LOGIN TO CONTINUE")
      toast.success("REGISTERATION SUCCESSFUL PLS LOGIN TO CONTINUE", {
        position: "top-center",
      });
      if(User){
        await setDoc(doc(db, "users", User.uid),{
          email: User.email,
          firstname: firstName,
          lastname: lastName,
        });
      }
      
    } catch (error) {
      console.log(error.message)
      toast.error(error, {
        position: "top-center",
      });    }
  };

   const signInWithGoogle = async (event) => {
    try {
      event.preventDefault();
      await signInWithPopup(auth, provider);
      localStorage.setItem("isAuth", true);
      toast.success("REGISTERATION SUCCESSFUL PLS LOGIN TO CONTINUE", {
        position: "top-center",
      });
      setIsAuth(true);
      navigate("/home");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      console.log(errorCode, errorMessage, email);
    }
  };

   const logout = async (event) => {
    try {
      event.preventDefault();
      await signOut(auth);
      navigate("/");
      toast.success("logout successful", {
        position: "bottom-center"
      });
    } catch (err) {
      toast.error(err, {
        position: "top-right"
      });
    }
  };

  const [signinEmail, setSignInEmail] = useState("");
  const [signinPassword, setSignInPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const signinwithemailandpassword = async (event) => {
    try {
      event.preventDefault();
      await signInWithEmailAndPassword(auth, signinEmail, signinPassword);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/home");
      alert("successful");
    } catch (error) {
      console.log(error);
    }
  };

  //copied from chat gpt
  const [type, setType] = useState("card");
  //ending of what was copied
  return (
    <div>
      {/* <button onClick={logout}> Logout </button> */}

      {/* tailwind chatgpt */}
      <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        {/* <div className="text-center mb-6">
          <div className="mb-4 h-20 p-6 text-white">
            {type === "card" ? (
              <CreditCardIcon className="h-10 w-10 text-gray-500" />
            ) : (
              <img
                alt="paypal"
                className="w-14 mx-auto"
                src="https://docs.material-tailwind.com/icons/paypall.png"
              />
            )}
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Material Tailwind PRO
          </h2>
        </div> */}
        <div>
          <div className="flex justify-center mb-6">
            <button
              type="button"
              className={`py-2 px-4 ${
                type === "card" ? "bg-gray-300" : "bg-gray-100"
              } rounded-l-md`}
              onClick={() => setType("card")}
            >
              REGISTER
            </button>
            <button
              type="button"
              className={`py-2 px-4 ${
                type === "paypal" ? "bg-gray-300" : "bg-gray-100"
              } rounded-r-md`}
              onClick={() => setType("paypal")}
            >
              SIGNIN
            </button>
          </div>
          {type === "card" ? (
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  type="text"
                  placeholder="JOHN"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LASTNAME
                </label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  required
                  placeholder="DOE"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  maxLength={29}
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  maxLength={19}
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**** **** **** ****"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />
                {/* <div className="flex gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expires</label>
                  <input
                    maxLength={5}
                    value={formatExpires(cardExpires)}
                    onChange={(event) => setCardExpires(event.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input
                    maxLength={4}
                    placeholder="CVC"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div> */}
              </div>
              {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holder Name</label>
              <input
                placeholder="Card Holder's Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div> */}
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md"
                onClick={registerwithemailandpassword}
              >
                Register
              </button>
              <button
                type="submit"
                className="bg-gray-200"
                onClick={signInWithGoogle}
              >
                REGISTER WITH GOOGLE
              </button>
              {/* <div className="flex items-center justify-center mt-2 text-gray-500">
                <LockClosedIcon className="h-4 w-4 mr-1" />
                Payments are secure and encrypted
              </div> */}
            </form>
          ) : (
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  onChange={(e) => setSignInEmail(e.target.value)}
                  type="email"
                  placeholder="name@mail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />
              </div>
              
              {/* <div className="my-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              >
                {countries.map(({ name, flags }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PASSWORD
                </label>
                <input
                  onChange={(e) => setSignInPassword(e.target.value)}
                  type="password"
                  placeholder="**** **** **** ****"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md"
                onClick={signinwithemailandpassword}
              >
                LOGIN
              </button>
              <button
                type="submit"
                className="bg-gray-200"
                onClick={signInWithGoogle}
              >
                LOGIN WITH GOOGLE
              </button>
              {/* <div className="flex items-center justify-center mt-2 text-gray-500">
                <LockClosedIcon className="h-4 w-4 mr-1" />
                Payments are secure and encrypted
              </div> */}
            </form>
            
          )}
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};
export default LoginPage;

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate("/");
  const { email, password, firstName, lastName, confirmPassword } = state;
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      // eslint-disable-next-line no-unused-vars
      const { user } = await signInWithEmailAndPassword(auth, email, password);
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password don't match");
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    }
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-4 mt-48 ">
      <h1 className="text-4xl">
        {!signUp ? "Welcome Back" : "Create An Account"}
      </h1>
      <form
        onSubmit={handleAuth}
        className="flex flex-col gap-4 w-80 sm:w-96 m-auto justify-center "
      >
        {signUp && (
          <>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className="px-2 py-1"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              className="px-2 py-1"
            />
          </>
        )}
        <input
          type="email"
          placeholder={!signUp ? "Testing email: a@a.com" : "Email"}
          name="email"
          value={email}
          onChange={handleChange}
          className="px-2 py-1"
        />

        {!signUp ? (
          <input
            placeholder={!signUp ? "Testing password: useruser" : "Password"}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="px-2 py-1"
          />
        ) : (
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="px-2 py-1"
          />
        )}
        {signUp && (
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            className="px-2 py-1"
          />
        )}
        <button
          type="submit"
          className="uppercase ease-in-out duration-150 px-2 py-1 bg-yellow-400  hover:bg-yellow-500 cursor-pointer"
        >
          {!signUp ? "Sign In" : "Sign Up"}
        </button>
        <div>
          {!signUp ? (
            <>
              <p className="text-lg">
                <span>Don&#39;t have an account? </span>
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => setSignUp(true)}
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <p className="text-lg">
              <span>Already have an account ? </span>
              <span
                className="underline text-blue-500 cursor-pointer"
                onClick={() => setSignUp(false)}
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Auth;

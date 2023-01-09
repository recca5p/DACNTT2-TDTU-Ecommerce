import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
	fullname: "",
	email   : "",
	phone   : ""
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //handle sign in
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div className="w-full md:max-w-[440px] mx-auto text-center">
      <div className="font-bold text-5xl mb-4">Create an account</div>
      <div className="text-lg">
	    Already a member ?{" "}
        <Link className="text-blue-500 underline" to={"/auth/sign-in"}>
          Sign in
        </Link>
      </div>

      <form
        autoComplete="off"
        className="w-full md:max-w-[360px] mx-auto mt-[48px] mb-[24px]"
        onSubmit={handleSignIn}
      >
		{/* fullname input */}
        <FormControl className="my-[12px]" variant="outlined" fullWidth>
          <InputLabel>Your name</InputLabel>
          <OutlinedInput
            label="Your name"
            name="fullname"
            value={form.fullname}
            onChange={handleChangeForm}
          />
        </FormControl>
        {/* username input */}
        <FormControl className="my-[12px]" variant="outlined" fullWidth>
          <InputLabel>Username</InputLabel>
          <OutlinedInput
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChangeForm}
          />
        </FormControl>
        {/* password input  */}
        <FormControl className="my-[12px]" variant="outlined" fullWidth>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChangeForm}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
		{/* email input */}
        <FormControl className="my-[12px]" variant="outlined" fullWidth>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChangeForm}
          />
        </FormControl>
		{/* phone input */}
        <FormControl className="my-[12px]" variant="outlined" fullWidth>
          <InputLabel>Phone number</InputLabel>
          <OutlinedInput
            label="Phone number"
            name="phone"
            value={form.phone}
            onChange={handleChangeForm}
          />
        </FormControl>
        {/* sign in button  */}
        <Button
          type="submit"
          className="bg-indigo-700 font-bold text-lg normal-case text-white my-[12px] py-3 rounded-full disabled:bg-slate-300"
          fullWidth
          disabled={!(form.username && form.password && form.fullname)}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;

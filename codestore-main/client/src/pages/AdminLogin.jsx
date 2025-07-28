// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import { setUserLogin } from "@/redux/slices/authSlice";
// import axios from "axios";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const { toast } = useToast();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const username = e.target.username.value.trim();
//     const password = e.target.password.value.trim();

//     if (!username || !password) {
//       return toast({
//         title: "Please enter username and password",
//       });
//     }

//     try {
//       const res = await axios.post(
//         import.meta.env.VITE_API_URL + "/admin-login",
//         { username, password }
//       );
//       const data = await res.data;
//       dispatch(setUserLogin(data));
//       toast({
//         title: data.message,
//       });
//       navigate("/admin/dashboard");
//     } catch (error) {
//       console.log(error)
//       return toast({
//         title: error.response.data.message,
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3">
//       <h1 className="text-2xl font-bold">Login into your account</h1>
//       <form className="grid gap-3" onSubmit={handleLogin}>
//         <Input placeholder="Username Here..." type="text" name="username" />
//         <Input placeholder="Password Here..." type="password" name="password" />
//         <Button>Log In</Button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;









import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setUserLogin } from "@/redux/slices/authSlice";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if (!username || !password) {
      return toast({
        title: "Please enter username and password",
      });
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/admin-login",
        { username, password }
      );
      const data = res.data;
      dispatch(setUserLogin(data));
      toast({
        title: data.message,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      return toast({
        title: error?.response?.data?.message || "Login failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <form className="grid gap-3" onSubmit={handleLogin}>
        <Input placeholder="Username Here..." type="text" name="username" />
        <Input placeholder="Password Here..." type="password" name="password" />
        <Button>Log In</Button>
      </form>
      <div className="text-sm mt-2">
        Don't have an account?{" "}
        <Link to="/admin/signup" className="text-blue-600 underline">
          Sign up as Admin
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;

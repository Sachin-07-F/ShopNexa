import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminSignup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if (!username || !password) {
      return toast({
        title: "Please enter username and password",
        variant: "destructive",
      });
    }

    try {
      const res = await axios.post(
  import.meta.env.VITE_API_URL + "/admin-signup",
        { username, password }
      );

      const data = res.data;

      toast({
        title: data.message,
      });

      navigate("/admin/login");
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Signup failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3">
            <h1 className="text-2xl font-bold">Admin Signup</h1>     {" "}
      <form className="grid gap-3" onSubmit={handleSignup}>
                <Input placeholder="Username" type="text" name="username" />
                <Input placeholder="Password" type="password" name="password" />
                <Button>Sign Up</Button>     {" "}
      </form>
           {" "}
      <div className="text-sm mt-2">
                Already have an account?        {" "}
        <Link to="/admin/login" className="text-blue-600 underline">
                    Login here        {" "}
        </Link>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default AdminSignup;

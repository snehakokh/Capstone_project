import React from "react";
import NavBar from "./Navbar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import Line from "./Line/Line";
import Copyright from "./Copyright/Copyright";
import Login from "./LoginPage/Login";
import SignUp from "./SignUp/SignUp";
import Blogs from "./Blogs/Blogs";
import AboutUs from "./AboutUs/AboutUs";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Therapist from "./Therapist/Therapist";
import Quiz from "./Quiz/Quiz";
import Ai from "./Ai/Ai";
import Readmore from "./Readmore/Readmore";
import Createablog from "./CreateaBlogs/Createablogs";
import Userview from "./UserView/Userview";
import Userprofile from "./UsreProfile/Userprofile";
import ProfilePage from "./ProfilePage/Profilepage";
import ForgotPassword from "./LoginPage/ForgotPassword";
import SignUpOption from "./SignUp/SignUpOption";
import TherapistSignUp from "./SignUp/TherapistSignUp";
import QuizStart from "./Quiz/QuizStart";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <div className="font-primary">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/therapist" element={<Therapist />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz1" element={<QuizStart />} />

        <Route path="/ai" element={<Ai />} />
        <Route path="/readmore/:id" element={<Readmore />} />
        <Route path="/createablog" element={<Createablog />} />
        <Route path="/userview/:id" element={<Userview />} />
        <Route path="/userprofile/:id" element={<Userprofile />} />
        <Route path="/profilepage/:id" element={<ProfilePage />} />
        <Route path="/forgotPw" element={<ForgotPassword />} />
        <Route path="/signup1" element={<SignUpOption />} />
        <Route path="/signup2" element={<TherapistSignUp />} />
      </Routes>
      <Footer />
      <Copyright />
    </div>
  );
}

export default App;

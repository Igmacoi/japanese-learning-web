import React from "react";
import '../App.css';
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";


function Home() {
  return (
      <div className="h-screen w-full bg-gradient-to-b from-[#DED1C6] via-[#A77693] via-[#174871] to-[#0F2D4D] flex items-center justify-center">
      <Header />
      </div>
  );
}
export default Home;
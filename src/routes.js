import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./index.scss";
import Headers from "./Component/Header";
import JobPostForm from "./Pages/JobPost";

export default function Router() {
  return (
    <div className="App">
      <BrowserRouter>
        <Headers />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postjob" element={<JobPostForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSellers from "../components/BestSellers";
import Policy from "../components/Policy";
import NewsLetter from "../components/NewsLetter";
import Sample from "./sample";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSellers />
      <Sample />
      <Policy />
      <NewsLetter />
    </div>
  );
};

export default Home;

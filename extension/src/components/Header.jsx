import React from "react";
import reactLogo from "./../assets/react.svg";
import openAiLogo from "./../assets/openai.svg";
import strapiLogo from "./../assets/strapi.svg";
import viteLogo from "/vite.svg";

export default function Header() {
  return (
    <div>
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://strapi.io" target="_blank">
          <img src={strapiLogo} className="logo" alt="Strapi logo" />
        </a>
        <a href="https://openai.com" target="_blank">
          <img src={openAiLogo} className="logo" alt="Open Ai logo" />
        </a>
      </div>
      <h1 className="text-violet-400 text-lg">
        Vite <span className="text-white">+</span> React{" "}
        <span className="text-white">+</span> Strapi{" "}
        <span className="text-white">+</span> Open AI
      </h1>
    </div>
  );
}

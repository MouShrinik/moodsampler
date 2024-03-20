"use client";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { emotionConfig } from "./config";
import Image from "next/image";
import { KeyboardEvent } from "react";
import Footer from "./components/Footer";
import Logo from "./components/Logo";

export default function Home() {
  // state variables
  const defaultbgColor = "pink";
  const defaultBorderColor = "gray";
  const defaultTextColor = "black";
  const [rows, serRows] = useState(4);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<[]>();
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(defaultbgColor);
  const [borderColors, setBorderColor] = useState(defaultBorderColor); // State for border color
  const [textColor, setTextColor] = useState(defaultTextColor);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    handleColorChange();
    console.log("output:", output);
    setCardVisible(true);
  }, [output]);

  function handleColorChange() {
    if (output && output.length > 0) {
      const colorKey = (output as any[])[0].label;
      console.log("colorKey:", colorKey);

      const colorData = (emotionConfig as any)[colorKey];

      // Extract color information from `emotionConfig` based on `colorKey`
      const backgroundColor = colorData?.colorHex || defaultbgColor;
      const borderColors = colorData?.borderHex || defaultBorderColor;
      const textColor = colorData?.textHex || defaultTextColor;

      // Update states with extracted colors
      setColor(backgroundColor);
      setBorderColor(borderColors);
      setTextColor(textColor);

      console.log("color:", color);
      console.log("backgroundColor:", backgroundColor);
      console.log("borderColor:", borderColors);
    }
  }

  async function runPredictions() {
    if (input) {
      setLoading(true);
      setCardVisible(false);
      // send api call
      const res = await axios.post("api/mood", { input: input });
      setOutput(res.data.filteredResponse);
      console.log(res);
      setLoading(false);
      setCardVisible(true);
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLTextAreaElement> & KeyboardEvent<HTMLTextAreaElement>
  ) {
    setInput(event.target.value);
  }

  return (
    <>
      <main
        className="flex flex-col min-h-screen
    bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-800 via-zinc-900 to-gray-800"
      >
        <div className="">
          <Logo />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center my-20">
          <div>
            <h1
              className="mb-4 text-3xl font-extrabold text-gray-900
          md:text-5xl lg:text-6xl tracking-tight m-5 text-transparent
          bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
            >
              Mood Sampler with AI
            </h1>
          </div>

          <div className="bg-slate-800 rounded-lg boder p-2.5 m-8 w-3/4">
            <textarea
              rows={rows}
              onChange={handleInputChange}
              placeholder="how are you feeling today?..."
              className="w-full h-full resize-none block p-2.5 text-sm text-gray-300
          bg-gray-800 rounded-lg border border-gray-700
          focus:rounded-lg focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="">
            <button
              type="button"
              onClick={runPredictions}
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200
        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
        focus:ring-red-400 font-semibold rounded-lg text-sm
        px-5 py-2.5 text-center me-2 mb-2"
            >
              Check your mood
            </button>
          </div>

          <>
            {loading && loadingSvg()}
            <div className="flex justify-center items-center flex-wrap gap-4 my-8">
              {output?.map(({ label, score }) => {
                return (
                  <div
                    key={label}
                    style={{
                      backgroundColor: color,
                      borderColor: borderColors,
                      color: textColor,
                      opacity: cardVisible ? 1 : 0,
                    }}
                    className="relative flex flex-col justify-between my-4 w-72 h-80 shadow-md rounded-lg bg-red-500 bg-opacity-25 text-white
                  cursor-pointer border transition-all ease-in-out"
                  >
                    <div className="w-full h-full relative bg-no-repeat object-cover rounded-lg shadow-md mx-auto bg-cover">
                      <Image
                        width={400}
                        height={400}
                        className="object-cover w-full h-full rounded-lg shadow-md mx-auto transform transition duration-500 ease-in-out hover:-translate-y-8 hover:scale-105"
                        src={(emotionConfig as any)[label].emoji}
                        alt="img"
                      />
                    </div>

                    <div className="flex justify-center p-3">
                      <button
                        style={{ color: textColor }}
                        className="bg-[#050708eb] focus:ring-4
                      focus:outline-none focus:ring-[#050708]/50 font-semibold rounded-lg text-sm
                      px-5 py-2.5 text-center
                      inline-flex items-center me-2 mb-1"
                      >
                        {label}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        </div>
      </main>
      <Footer />
    </>
  );

  function loadingSvg() {
    return (
      <div className="flex justify-center items-center pb-8 m-5">
        <svg
          height={80}
          width={80}
          fill="#000000"
          viewBox="0 0 64 64"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: "1.5",
          }}
          version="1.1"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns-Serif="http://www.serif.com/"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g transform="matrix(1,0,0,1,-84,0)">
              <g id="Naruto" transform="matrix(1,0,0,1,-188.333,0)">
                <rect
                  height="24"
                  style={{ fill: "none" }}
                  width="44"
                  x="272.333"
                  y="0"
                ></rect>
                <g transform="matrix(1,0,0,1,180.333,0)">
                  <path
                    className="animate-[move_45s_ease_] stroke-red-300"
                    d="M121.475,5.673C121.904,4.659 122.899,4 124,4C125.101,4 126.096,4.659 126.525,5.673L128.37,10.03L131.742,6.711C132.526,5.938 133.697,5.71 134.715,6.131C135.733,6.553 136.399,7.542 136.408,8.644L136.445,13.375L140.83,11.598C141.851,11.185 143.02,11.422 143.799,12.201C144.578,12.98 144.815,14.149 144.402,15.17L142.625,19.555L147.356,19.592C148.458,19.601 149.447,20.267 149.869,21.285C150.29,22.303 150.062,23.474 149.289,24.258L145.97,27.63L150.327,29.475C151.341,29.904 152,30.899 152,32C152,33.101 151.341,34.096 150.327,34.525L145.97,36.37L149.289,39.742C150.062,40.526 150.29,41.697 149.869,42.715C149.447,43.733 148.458,44.399 147.356,44.408L142.625,44.445L144.402,48.83C144.815,49.851 144.578,51.02 143.799,51.799C143.02,52.578 141.851,52.815 140.83,52.402L136.445,50.625L136.408,55.356C136.399,56.458 135.733,57.447 134.715,57.869C133.697,58.29 132.526,58.062 131.742,57.289L128.37,53.97L126.525,58.327C126.096,59.341 125.101,60 124,60C122.899,60 121.904,59.341 121.475,58.327L119.63,53.97L116.258,57.289C115.474,58.062 114.303,58.29 113.285,57.869C112.267,57.447 111.601,56.458 111.592,55.356L111.555,50.625L107.17,52.402C106.149,52.815 104.98,52.578 104.201,51.799C103.422,51.02 103.185,49.851 103.598,48.83L105.375,44.445L100.644,44.408C99.542,44.399 98.553,43.733 98.131,42.715C97.71,41.697 97.938,40.526 98.711,39.742L102.03,36.37L97.673,34.525C96.659,34.096 96,33.101 96,32C96,30.899 96.659,29.904 97.673,29.475L102.03,27.63L98.711,24.258C97.938,23.474 97.71,22.303 98.131,21.285C98.553,20.267 99.542,19.601 100.644,19.592L105.375,19.555L103.598,15.17C103.185,14.149 103.422,12.98 104.201,12.201C104.98,11.422 106.149,11.185 107.17,11.598L111.555,13.375L111.592,8.644C111.601,7.542 112.267,6.553 113.285,6.131C114.303,5.71 115.474,5.938 116.258,6.711L119.63,10.03L121.475,5.673Z"
                    style={{ fill: "white", strokeWidth: "2px" }}
                  ></path>{" "}
                </g>{" "}
                <g transform="matrix(1.01035,0,0,1.05877,185.386,2.13651)">
                  {" "}
                  <path
                    className="animate-[move_45s_ease_]"
                    d="M116,31C116,31 114.349,24.48 122,25C129.651,25.52 126.254,32.473 123,35C119.746,37.527 107.184,38.659 109,28C110.816,17.341 120,20 120,20"
                    style={{
                      fill: "none",
                      stroke: "#cd5a46",
                      strokeWidth: "1.93px",
                    }}
                  ></path>
                </g>
              </g>
            </g>{" "}
          </g>
        </svg>
      </div>
    );
  }
}

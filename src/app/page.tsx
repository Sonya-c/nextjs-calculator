"use client";

import { useState } from "react";
import { FlapDisplay, Presets } from "react-split-flap-effect";
import {
  addToArray,
  deleteLastItem,
  getCleanArray,
  getSolution,
} from "~/utils/functions";

export default function HomePage() {
  const [inputArray, setInputArray] = useState<string[]>([]);
  const [result, setResult] = useState("");

  const buttonClass =
    "w-20 border border-black/50 text-xl h-12 text-lg bg-white/20 text-black rounded-lg font-bold";

  function handleClearEverything() {
    setInputArray(getCleanArray(inputArray));
    setResult("");
  }

  function addCharacter(character: string) {
    setInputArray(addToArray(inputArray, character));
  }

  function deleteChar() {
    setInputArray(deleteLastItem(inputArray));
  }

  function requestResult() {
    setResult(getSolution(inputArray));
    setInputArray(getCleanArray(inputArray));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 text-white">
      <div className="container flex w-96 flex-col items-center justify-center rounded-xl bg-white/10 px-1 py-16 shadow-lg">
        <FlapDisplay
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          chars={Presets.ALPHANUM + "./*-+"}
          length={10}
          value={inputArray.join("")}
          hinge={true}
          className="text-4xl leading-3"
        />

        <FlapDisplay
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          chars={Presets.ALPHANUM}
          length={6}
          value={result}
          hinge={true}
          className="text-6xl"
        />

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button className={buttonClass} onClick={() => requestResult()}>
            =
          </button>
          <button className={buttonClass} onClick={() => deleteChar()}>
            «
          </button>
          <button
            className={buttonClass}
            onClick={() => handleClearEverything()}
          >
            CE
          </button>
          <button className={buttonClass} onClick={() => addCharacter("+")}>
            +
          </button>
          <button className={buttonClass} onClick={() => addCharacter("7")}>
            7
          </button>
          <button className={buttonClass} onClick={() => addCharacter("8")}>
            8
          </button>
          <button className={buttonClass} onClick={() => addCharacter("9")}>
            9
          </button>
          <button className={buttonClass} onClick={() => addCharacter("-")}>
            -
          </button>
          <button className={buttonClass} onClick={() => addCharacter("4")}>
            4
          </button>
          <button className={buttonClass} onClick={() => addCharacter("5")}>
            5
          </button>
          <button className={buttonClass} onClick={() => addCharacter("6")}>
            6
          </button>
          <button className={buttonClass} onClick={() => addCharacter("/")}>
            /
          </button>
          <button className={buttonClass} onClick={() => addCharacter("1")}>
            1
          </button>
          <button className={buttonClass} onClick={() => addCharacter("2")}>
            2
          </button>
          <button className={buttonClass} onClick={() => addCharacter("3")}>
            3
          </button>
          <button className={buttonClass} onClick={() => addCharacter("*")}>
            *
          </button>
        </div>
      </div>
    </main>
  );
}

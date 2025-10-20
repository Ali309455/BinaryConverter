"use client";
import { useState, useEffect } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from "primereact/button";
import { Code, Github, Linkedin, Menu, X } from "lucide-react"; // added Menu, X

export default function Home() {
  const [inputValue, setInputValue] = useState("0");
  const [OthertodecinputValue, setOthertodecInputValue] = useState("0");
  const [copiedText, setCopiedText] = useState("");
  const [ingredient, setIngredient] = useState("BINARY");
  const [othertodecingredient, setothertodecingredient] = useState("BINARY");
  const [fromOthertodecisActive, setfromOthertodecisActive] = useState(false);
  const [convertedvalues, setConvertedvalues] = useState({
    binary: "none",
    octal: "none",
    hexadecimal: "none",
  });
  const [Othertodecconvertedvalues, setOthertodecconvertedvalues] = useState("0000");
  const [isOpen, setIsOpen] = useState(false); // sidebar state

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
  };
  const handleTabs = () => {
    setfromOthertodecisActive(!fromOthertodecisActive);
    console.log(fromOthertodecisActive);
  };
  // dec to Other functions 
  let elementary_octal = {
    0: "000",
    1: "001",
    2: "010",
    3: "011",
    4: "100",
    5: "101",
    6: "110",
    7: "111",
  };
  function integerpart_octal(int) {
    let int_octal = [];
    for (let i = 0; true; i++) {
      let d = int % 8;
      // int_octal.push(elementary_octal[d]);
      int_octal.push(d);
      if (int % 8 != 0) {
        int = int - d;
      }
      int = int / 8;
      if (int < 8) {
        // int_octal.push(elementary_octal[int]);
        int_octal.push(int);
        break;
      }
    }
    return int_octal;
  }
  function fractionalpart_octal(frac) {
    let frac_binary = [];
    for (let i = 0; i < 2; i++) {
      frac = frac * 8;
      let d = Math.floor(frac);
      if (frac >= 1) {
        frac = frac - Math.floor(frac);
      }
      // frac_binary.push(elementary_octal[d]);
      frac_binary.push(d);
    }
    return frac_binary;
  }
  const decimal_to_octal = (num) => {
    if (`${num}`.includes(".")) {
      let no_to_array = `${num}`.split(".");
      let int_to_octal = integerpart_octal(Number(no_to_array[0]));
      let frac_to_octal = fractionalpart_octal(Number(`0.${no_to_array[1]}`));
      let final_ans =
        int_to_octal.reverse().join("") + "." + frac_to_octal.join("");
      setConvertedvalues({
        ...convertedvalues,
        octal: final_ans,
      });
    } else {
      let int_to_octal = integerpart_octal(num);
      let final_ans = int_to_octal.reverse().join("");
      setConvertedvalues({
        ...convertedvalues,
        octal: final_ans,
      });
    }
  };
  const decimal_to_hex = (decimal_num) => {
    if (`${decimal_num}`.includes(".")) {
      let no_to_array = `${decimal_num}`.split(".");
      let int_to_hex = integerpart_hex(Number(no_to_array[0]));
      let frac_to_hex = fractionalpart_hex(Number(`0.${no_to_array[1]}`));
      let final_ans =
        int_to_hex.reverse().join("") + "." + frac_to_hex.join("");
      setConvertedvalues({
        ...convertedvalues,
        hexadecimal: final_ans,
      });
    } else {
      let int_to_hex = integerpart_hex(decimal_num);
      let final_ans = int_to_hex.reverse().join("");
      setConvertedvalues({
        ...convertedvalues,
        hexadecimal: final_ans,
      });
    }
  };
  let elementary_hex = {
    0: "000",
    1: "001",
    2: "010",
    3: "011",
    4: "100",
    5: "101",
    6: "110",
    7: "111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };
  let alph_hex = { 10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F" };
  function integerpart_hex(int) {
    let int_hex = [];
    for (let i = 0; true; i++) {
      let d = int % 16;
      if (d > 9) {
        int_hex.push(alph_hex[d]);
        console.log("here1");
      } else {
        if (int > 9) {
          int_hex.push(d);
        }
        int_hex.push(d);
      }
      if (int % 16 != 0) {
        int = int - d;
      }
      int = int / 16;
      if (int < 16) {
        // int_octal.push(elementary_hex[int]);
        if (int > 9) {
          int_hex.push(alph_hex[int]);
          console.log("here2");
        } else {
          int_hex.push(int);
        }
        break;
      }
    }
    return int_hex;
  }
  function fractionalpart_hex(frac) {
    let frac_hex = [];
    for (let i = 0; i < 2; i++) {
      frac = frac * 16;
      let d = Math.floor(frac);
      if (frac >= 1) {
        frac = frac - Math.floor(frac);
      }
      // frac_hex.push(elementary_octal[d]);
      if (d > 9) {
        frac_hex.push(alph_hex[d]);
      } else {
        frac_hex.push(d);
      }
    }
    return frac_hex;
  }
  function integerpart_binary(int) {
    let int_binary = [];
    if (int == 0) {
      int_binary = [0];
      return int_binary;
    }
    for (let i = 0; true; i++) {
      let d = int % 2;
      int_binary.push(d);
      if (int % 2 != 0) {
        int = int - d;
      }
      int = int / 2;
      if (int == 1) {
        int_binary.push(1);
        break;
      }
    }
    return int_binary;
  }
  function fractionalpart_binary(frac) {
    let frac_binary = [];
    for (let i = 0; i < 4; i++) {
      frac = frac * 2;
      let d = Math.floor(frac);
      frac_binary.push(d);
      if (frac >= 1) {
        frac = frac - 1;
      }
    }
    return frac_binary;
  }
  const decimal_to_binary = (num) => {
    if (`${num}`.includes(".")) {
      let no_to_array = `${num}`.split(".");
      let int_to_binary = integerpart_binary(Number(no_to_array[0]));
      let frac_to_binary = fractionalpart_binary(Number(`0.${no_to_array[1]}`));
      let final_ans =
        int_to_binary.reverse().join("") + "." + frac_to_binary.join("");
      setConvertedvalues({
        ...convertedvalues,
        binary: final_ans,
      });
    } else {
      let int_to_binary = integerpart_binary(num);
      let final_ans = int_to_binary.reverse().join("");
      setConvertedvalues({
        ...convertedvalues,
        binary: final_ans,
      });
    }
  };

// Other to dec functions
function binary_to_decimal(binary_num) {
  let decimal = 0;
  for (let i = 0; i < binary_num.length; i++) {
      decimal = decimal + binary_num.split('').reverse()[i] * Math.pow(2, i);
}
return decimal;
}
function octal_to_decimal(octal_num) {
    let binary = [];
  if (`${octal_num}`.includes(".")) {
    let no_to_array = `${octal_num}`.split(".");
    let int_part = no_to_array[0];
    `${int_part}`.split("").forEach(e => {
      binary.push(elementary_octal[e]);
    });
    binary.push(".");
    let frac_part = no_to_array[1];
    `${frac_part}`.split("").forEach(e => {
      binary.push(elementary_octal[e]);
    });
    return(binary_to_decimal(binary.join("")));
  }
  else{
    let int_part = octal_num;
    `${int_part}`.split("").forEach(e => {
      binary.push(elementary_octal[e]);
    });
    return(binary_to_decimal(binary.join("")));
  }
}
function hex_to_decimal(hex_num) {
    let binary = [];
  if (hex_num.includes(".")) {
    let no_to_array = hex_num.split(".");
    let int_part = no_to_array[0];
    `${int_part}`.split("").forEach(e => {
      binary.push(elementary_hex[e]);
    });
    binary.push(".");
    let frac_part = no_to_array[1];
    `${frac_part}`.split("").forEach(e => {
      binary.push(elementary_hex[e]);
    });
    return(binary_to_decimal(binary.join("")));
  }
  else{
    let int_part = hex_num;
    `${int_part}`.split("").forEach(e => {
      binary.push(elementary_hex[e]);
    });
    return(binary_to_decimal(binary.join("")));
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow-md px-8 py-4 sticky top-0 max-[400px]:px-4">
        <h1 className="text-2xl font-bold tracking-wide max-[600px]:text-[18px] max-[400px]:text-[14px]">
          BINARY CONVERTER
        </h1>

        {/* Desktop Buttons */}
        <div className="hidden max-[550px]:hidden md:flex gap-4">
          <a
            href="https://github.com/Ali309455"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/thealiirshad/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-500 transition"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href="https://github.com/Ali309455/BinaryConverter/blob/master/app/page.js"
            target="_blank"
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-500 transition"
          >
            <Code size={18} /> Code
          </a>
        </div>

        {/* Hamburger (shown below 550px) */}
        <button
          className="md:hidden max-[550px]:flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-6">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>

            {/* Links inside sidebar */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-500 transition"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-500 transition"
            >
              <Code size={18} /> Code
            </a>
          </div>
        </div>
      )}

      <main className="max-w-3xl mx-auto p-8 max-[400px]:p-4">
        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-6 text-center max-[600px]:text-[24px]">
          DECIMAL NUMBER CONVERTER{" "}
        </h2>

        {/* Card Section */}
        <div className="">
          <div className="bg-white shadow-md rounded-2xl h-[40px] max-[440px]:text-[12px] mb-4 space-y-6 max-[600px]:p-3 w-[100%] flex items-center justify-around  relative overflow-hidden ">
            {fromOthertodecisActive && (
              <div
                className="bg-gray-200 max-[440px]:text-[12px] h-[100%] w-[49.8%] m-0 flex items-center justify-center absolute left-0 cursor-pointer"
                onClick={handleTabs}
              >
                {" "}
                From Decimal to other
              </div>
            )}
            {fromOthertodecisActive == false && (
              <div
                className="bg-white  h-[100%] w-[49.8%] m-0 flex items-center justify-center max-[440px]:text-[12px] absolute left-0 cursor-pointer"
                onClick={handleTabs}
              >
                {" "}
                From Decimal to other
              </div>
            )}
            {fromOthertodecisActive && (
              <div
                className="bg-white max-[440px]:text-[12px]  h-[100%] w-[49.8%] m-0 flex items-center justify-center absolute right-0 cursor-pointer max-[440px]:text-[12px]"
                onClick={handleTabs}
              >
                {" "}
                From Other to Decimal
              </div>
            )}
            {fromOthertodecisActive == false && (
              <div
                className="bg-gray-200  h-[100%] w-[49.8%] m-0 flex items-center justify-center absolute right-0 cursor-pointer  max-[440px]:text-[12px]"
                onClick={handleTabs}
              >
                {" "}
                From Other to Decimal
              </div>
            )}
          </div>
          {fromOthertodecisActive &&(
          <div className="">
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-6 max-[600px]:p-3">
              {/* Radio options */}
              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center max-[600px]:text-[12px]  ">
                  <RadioButton
                    inputId="ingredient1"
                    name="conversion"
                    value="BINARY"
                    onChange={(e) => setothertodecingredient(e.value)}
                    checked={othertodecingredient === "BINARY"}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    BINARY
                  </label>
                </div>
                <div className="flex align-items-center max-[600px]:text-[12px]  ">
                  <RadioButton
                    inputId="ingredient2"
                    name="conversion"
                    value="OCTAL"
                    onChange={(e) => setothertodecingredient(e.value)}
                    checked={othertodecingredient === "OCTAL"}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    OCTAL
                  </label>
                </div>
                <div className="flex align-items-center max-[600px]:text-[12px]  ">
                  <RadioButton
                    inputId="ingredient3"
                    name="conversion"
                    value="HEXADECIMAL"
                    onChange={(e) => setothertodecingredient(e.value)}
                    checked={othertodecingredient === "HEXADECIMAL"}
                  />
                  <label htmlFor="ingredient3" className="ml-2">
                    HEXADECIMAL
                  </label>
                </div>
              </div>

              {/* Input + Submit */}
              <div className="flex items-center ">
                <FloatLabel className="w-[60%]">
                  <InputText
                    id={`${othertodecingredient.toLowerCase()} Number`}
                    className="w-[90%]"
                    value={OthertodecinputValue}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      // Allow only numbers
                      if (othertodecingredient == "BINARY") {
                        if (/^[01]*$/.test(newValue)) {
                          setOthertodecInputValue(newValue);
                        }
                      } else if (othertodecingredient == "OCTAL") {
                        if (/^[0-7]*$/.test(newValue)) {
                          setOthertodecInputValue(newValue);
                        }
                      } else {
                        if (/^[0-9a-fA-F]*$/.test(newValue)) {
                          setOthertodecInputValue(newValue.toUpperCase());
                        }
                      }
                    }}
                  />
                  <label htmlFor="username" className="max-[600px]:text-[14px]">
                    {`${othertodecingredient.toLowerCase()}`} Number
                  </label>
                </FloatLabel>
                <Button
                  label="Convert"
                  icon="pi pi-check"
                  onClick={() => {
                    // conversion(inputValue);
                    if (othertodecingredient == "BINARY") setOthertodecconvertedvalues(binary_to_decimal(OthertodecinputValue));
                    else if (othertodecingredient == "OCTAL")
                      setOthertodecconvertedvalues(octal_to_decimal(OthertodecinputValue));
                    else if (othertodecingredient == "HEXADECIMAL")
                      setOthertodecconvertedvalues(hex_to_decimal(OthertodecinputValue));

                    // console.log(ingredient);
                  }}
                />
              </div>
            </div>

            {/* Fields with Copy buttons */}
            <div className="mt-10 space-y-4">
              {["Decimal"].map((field, i) => {
                const value = Othertodecconvertedvalues; // dynamic property
                return (
                  value !== "none" && (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white shadow-sm rounded-xl px-4 py-3 hover:shadow-md transition"
                    >
                      <span>{`${field} Value : ${value}`}</span>
                      <button
                        onClick={() => handleCopy(value)}
                        className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-500 transition"
                      >
                        Copy
                      </button>
                    </div>
                  )
                );
              })}
            </div>
          </div>)}
          {fromOthertodecisActive == false &&(
          <div className="">
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-6 max-[600px]:p-3">
              {/* Radio options */}
              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center max-[600px]:text-[12px]  ">
                  <RadioButton
                    inputId="ingredient1"
                    name="conversion"
                    value="BINARY"
                    onChange={(e) => setIngredient(e.value)}
                    checked={ingredient === "BINARY"}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    BINARY
                  </label>
                </div>
                <div className="flex align-items-center max-[600px]:text-[12px]  ">
                  <RadioButton
                    inputId="ingredient2"
                    name="conversion"
                    value="OCTAL"
                    onChange={(e) => setIngredient(e.value)}
                    checked={ingredient === "OCTAL"}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    OCTAL
                  </label>
                </div>
                <div className="flex align-items-center max-[600px]:text-[12px]  ">
                  <RadioButton
                    inputId="ingredient3"
                    name="conversion"
                    value="HEXADECIMAL"
                    onChange={(e) => setIngredient(e.value)}
                    checked={ingredient === "HEXADECIMAL"}
                  />
                  <label htmlFor="ingredient3" className="ml-2">
                    HEXADECIMAL
                  </label>
                </div>
              </div>

              {/* Input + Submit */}
              <div className="flex items-center ">
                <FloatLabel className="w-[60%]">
                  <InputText
                    id="Decimal Number"
                    className="w-[90%]"
                    value={inputValue}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      // Allow only numbers
                      if (/^\d*\.?\d*$/.test(newValue)) {
                        setInputValue(newValue);
                      }
                    }}
                  />
                  <label htmlFor="username" className="max-[600px]:text-[14px]">
                    Decimal Number
                  </label>
                </FloatLabel>
                <Button
                  label="Convert"
                  icon="pi pi-check"
                  onClick={() => {
                    // conversion(inputValue);
                    if (ingredient == "BINARY") decimal_to_binary(inputValue);
                    else if (ingredient == "OCTAL")
                      decimal_to_octal(inputValue);
                    else if (ingredient == "HEXADECIMAL")
                      decimal_to_hex(inputValue);

                    // console.log(ingredient);
                  }}
                />
              </div>
            </div>

            {/* Fields with Copy buttons */}
            <div className="mt-10 space-y-4">
              {["Binary", "Octal", "Hexadecimal"].map((field, i) => {
                const value = convertedvalues[field.toLowerCase()]; // dynamic property
                return (
                  value !== "none" && (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white shadow-sm rounded-xl px-4 py-3 hover:shadow-md transition"
                    >
                      <span>{`${field} Value : ${value}`}</span>
                      <button
                        onClick={() => handleCopy(value)}
                        className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-500 transition"
                      >
                        Copy
                      </button>
                    </div>
                  )
                );
              })}
            </div>
          </div>)}

          {/* Copy confirmation */}
          {copiedText && (
            <p className="mt-6 text-green-700 text-center font-medium">
              Copied: <span className="font-semibold">{copiedText}</span>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

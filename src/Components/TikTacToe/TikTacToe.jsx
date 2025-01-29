"use client";
import "./TikTacToe.css";
import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";
import { useRef, useState } from "react";
import { motion, AnimatePresence, stagger} from "motion/react";

let data = ["", "", "", "", "", "", "", "", ""];

const TikTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  const toggle = (e, num) => {
    console.log(data);
    if (lock) {
      return 0;
    }
    if (data[num] !== "") {
      return 0;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' alt="cross" />`;
      data[num] = "x";
      setCount(++count);
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' alt="circle" />`;
      data[num] = "o";
      setCount(++count);
    }
    checkWinner();
  };
  const checkWinner = () => {
    // Check rows
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    // Check columns
    else if (data[0] === data[3] && data[3] === data[6] && data[0] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[1] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[2] !== "") {
      won(data[8]);
    }
    // Check diagonals
    else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
  };

  const won = (winner) => {
    setLock(true);
    const text = "The winner is: ";
    const icon =
      winner === "x"
        ? `<img src='${cross_icon}' alt="cross"/>`
        : `<img src='${circle_icon}' alt="circle"/>`;
  
    // Clear the title and prepare for animation
    titleRef.current.innerHTML = ""; // Clear the content first
  
    // Create spans for the text characters
    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0"; // Initially hidden
      span.style.display = "inline-block"; // Required for animations
      span.style.transition = "opacity 0.1s, transform 0.1s"; // Smooth animation
      span.style.transform = "translateY(-10px)"; // Initial position
      titleRef.current.appendChild(span);
  
      // Animate each character with a delay
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)"; // Reset position
      }, index * 100); // Delay increases for each character
    });
  
    // Add the winner's icon after the text
    const iconContainer = document.createElement("span");
    iconContainer.innerHTML = icon;
    iconContainer.style.opacity = "0"; // Initially hidden
    iconContainer.style.transition = "opacity 0.2s, transform 0.2s";
    iconContainer.style.transform = "translateY(-10px)";
    titleRef.current.appendChild(iconContainer);
  
    // Animate the icon after the text animation completes
    setTimeout(() => {
      iconContainer.style.opacity = "1";
      iconContainer.style.transform = "translateY(0)";
    }, text.length * 100); // Start icon animation after the text finishes
  };

  const reset = () => {
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = "Tic tac toe game by<span>UmbraAether</span>";
    let boxes = document.getElementsByClassName("boxes");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = "";
    }
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic tac toe game by<span>UmbraAether</span>
      </h1>
      <div className="board">
        <div className="row1">
          <motion.div
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 1 }}
            initial={{ y: -50, x: -50, duration: 0.5 }}
            whileInView={{ y: 0, x: 0, delay: 0.5 }}
            className="boxes"
            onClick={(e) => toggle(e, 0)}
          ></motion.div>
          <motion.div
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 1 }}
            initial={{ x: -50, duration: 0.5 }}
            whileInView={{ x: 0, delay: 0.5 }}
            className="boxes"
            onClick={(e) => toggle(e, 1)}
          ></motion.div>
          <motion.div
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 1 }}
            initial={{ y: 50, x: -50, duration: 0.5 }}
            whileInView={{ y: 0, x: 0, delay: 0.5 }}
            className="boxes"
            onClick={(e) => toggle(e, 2)}
          ></motion.div>
        </div>
        <div className="row2">
          <motion.div
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 1 }}
            initial={{ y: -50, duration: 0.5 }}
            whileInView={{ y: 0, delay: 0.5 }}
            className="boxes"
            onClick={(e) => toggle(e, 3)}
          ></motion.div>
          <motion.div
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 1 }}
            className="boxes"
            onClick={(e) => toggle(e, 4)}
          ></motion.div>
          <motion.div
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 1 }}
            initial={{ y: 50, duration: 0.5 }}
            whileInView={{ y: 0, delay: 0.5 }}
            className="boxes"
            onClick={(e) => toggle(e, 5)}
          ></motion.div>
        </div>
        <div className="row3">
          <motion.div
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 1 }}
            initial={{ y: -50, x: 50, duration: 0.5 }}
            whileInView={{ y: 0, x: 0, delay: 0.5 }}
            className="boxes"
            onClick={(e) => toggle(e, 6)}
          ></motion.div>
          <motion.div
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 1 }}
            initial={{ x: 50, duration: 0.5 }}
            whileInView={{ x: 0, delay: 0.5 }}
            className="boxes"
            onClick={(e) => toggle(e, 7)}
          ></motion.div>
          <motion.div
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 1 }}
            initial={{ y: 50, x: 50, duration: 0.5 }}
            whileInView={{ y: 0, x: 0, delay: 0.5 }}
            className="boxes"
            onClick={(e) => toggle(e, 8)}
          ></motion.div>
        </div>
      </div>
      <AnimatePresence>
        {lock && (
          <motion.button
            key="reset"
            className="reset"
            onClick={() => reset()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            Reset
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TikTacToe;

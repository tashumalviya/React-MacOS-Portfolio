import React, { useState, useEffect } from "react";
import MacWindow from "./MacWindow";

const Cli = ({ windowName, setWindowsState }) => {
  const welcomeMessage = `
╔════════════════════════════════════════╗
║     Welcome to My Portfolio CLI!       ║
╚════════════════════════════════════════╝

Hello! 👋 Welcome to my interactive portfolio.

Type 'help' to see all commands.
`;

  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");

  // show welcome message once
  useEffect(() => {
    setHistory(welcomeMessage.split("\n"));
  }, []);

  const commands = {
    help: () => `
about, skills, projects, experience, contact, github, resume, social, clear
`,

    about: () =>
      "I am Tashu Malviya, a full-stack web developer passionate about building modern web applications with React, Node.js, and cloud technologies.",

    skills: () => `Frontend: React.js, DOM, TailWind CSS, HTML, CSS, JavaScript
Backend: Node.js, Express
Databases: MySQL
Tools: Git, GitHub, VSCode`,

    projects: () => `1. Portfolio Website - React + Vite
2. EMI Calulator
3. Task Management App 
4. Women Safety App`,

    experience: () => `1. ROLE AS INTERN | YHills Edutech Pvt. Ltd. (Java Programming Intern) Oct 2024 – Nov 2024
 Developed programming solutions using Core Java, OOPs, and Data Structures, strengthening coding and logical
reasoning skills.
 Solved multiple coding assignments and debugging challenges by applying structured problem-solving
approaches.
 Improved code efficiency and understanding of software development fundamentals through hands-on practice
and project-based learning.

                      2. ROLE AS INTERN | InternPe (Web Development Intern) Nov 2025 – Dec 2025
 Built responsive web pages using HTML, CSS, and JavaScript, ensuring compatibility across different screen sizes
and devices.
 Implemented interactive UI features and resolved frontend design challenges to enhance user experience and
usability.
 Delivered web development tasks following industry-standard coding practices, improving website functionality
and maintainability.
`,

    contact: () => `Email: malviyatashu@gmail.com
Phone: +91 8827136854
Location: Bhopal, Madhya Pradesh, India`,

    github: () => {
      window.open("https://github.com/tashumalviya", "_blank");
      return "Opening GitHub...";
    },

    resume: () => "Resume download started...",

    social: () => `LinkedIn: https://www.linkedin.com/in/tashu-malviya/
Leetcode: https://leetcode.com/u/tashumalviya/`,

    clear: () => {
      setHistory([]);
      return "";
    },

    echo: (args) => args.join(" "),
  };

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const fullInput = input.trim();
      const [cmd, ...args] = fullInput.split(" ");

      let output;

      if (commands[cmd]) {
        output = commands[cmd](args);
      } else {
        output = "Command not found";
      }

      setHistory((prev) => [
        ...prev,
        `tashu@portfolio:~$ ${fullInput}`,
        output,
      ]);

      setInput("");
    }
  };

  return (
    <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
      <div
        style={{
          background: "black",
          color: "#00ff00",
          height: "100%",
          padding: "10px",
          fontFamily: "monospace",
          overflowY: "auto",
        }}
      >
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}

        <div>
          <span>tashu@portfolio:~$ </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            style={{
              background: "transparent",
              border: "none",
              color: "#00ff00",
              outline: "none",
              width: "80%",
            }}
          />
        </div>
      </div>
    </MacWindow>
  );
};

export default Cli;
"use client";

import { useEffect, useRef, useState } from "react";
import { resume } from "../data/resume";

const commands = [
  "help",
  "about",
  "whoami",
  "education",
  "skills",
  "experience",
  "projects",
  "project 1",
  "project 2",
  "project 3",
  "project 4",
  "research",
  "certifications",
  "contact",
  "resume",
  "github",
  "linkedin",
  "ls",
  "pwd",
  "neofetch",
  "sudo hire harsh",
  "clear",
];

export default function Home() {
  const [input, setInput] = useState("");

  const [output, setOutput] = useState<string[]>([
    "Welcome to Harshwardhan Paygude's terminal portfolio.",
    "Type 'help' to see available commands.",
    "",
  ]);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically scroll to newest output
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Keep input focused
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addOutput = (text: string | string[]) => {
    if (Array.isArray(text)) {
      setOutput((prev) => [...prev, ...text]);
    } else {
      setOutput((prev) => [...prev, text]);
    }
  };

  const formatProject = (index: number) => {
    const project = resume.projects[index];

    if (!project) {
      return ["", "Project not found.", ""];
    }

    return [
      "",
      `┌─ ${project.name}`,
      "│",
      `│ Date: ${project.date}`,
      `│ Technologies: ${project.technologies.join(", ")}`,
      "│",
      ...project.description.map((item) => `│ ${item}`),
      "│",
      "└────────────────────────────────────────",
      "",
    ];
  };

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();

    if (!cmd) return;

    setHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);

    addOutput(`$ ${command}`);

    // HELP
    if (cmd === "help") {
      addOutput([
        "",
        "Available commands:",
        "",
        "  about / whoami       → About me",
        "  education            → Education",
        "  skills               → Technical skills",
        "  experience           → Work experience",
        "  projects             → View all projects",
        "  project 1            → MNIST Digit Classifier",
        "  project 2            → Car Sales Dashboard",
        "  project 3            → Vastu Interior Advisor",
        "  project 4            → Gear Defect Detection",
        "  research             → Research publication",
        "  certifications       → Certifications",
        "  contact              → Contact information",
        "  resume               → Open resume PDF",
        "  github               → GitHub profile",
        "  linkedin             → LinkedIn profile",
        "  ls                   → List available sections",
        "  pwd                  → Show current directory",
        "  neofetch             → System information",
        "  sudo hire harsh      → ???",
        "  clear                → Clear terminal",
        "",
      ]);

      return;
    }

    // ABOUT
    if (cmd === "about" || cmd === "whoami") {
      addOutput([
        "",
        `Name: ${resume.name}`,
        "Role: Computer Science (AI&DS) Student",
        "",
        "I am a Computer Science student focused on",
        "Artificial Intelligence, Machine Learning,",
        "Generative AI and Computer Vision.",
        "",
      ]);

      return;
    }

    // EDUCATION
    if (cmd === "education") {
      addOutput([
        "",
        "EDUCATION",
        "─────────",
        "",
        ...resume.education.flatMap((edu) => [
          `${edu.year} | ${edu.degree}`,
          `${edu.institute}`,
          `Score: ${edu.score}`,
          "",
        ]),
      ]);

      return;
    }

    // SKILLS
    if (cmd === "skills") {
      addOutput([
        "",
        "TECHNICAL SKILLS",
        "────────────────",
        "",
        `Languages:       ${resume.skills.languages.join(", ")}`,
        `Frameworks:      ${resume.skills.frameworks.join(", ")}`,
        `Databases:       ${resume.skills.databases.join(", ")}`,
        `Tools:           ${resume.skills.tools.join(", ")}`,
        `Generative AI:   ${resume.skills.generativeAI.join(", ")}`,
        "",
      ]);

      return;
    }

    // EXPERIENCE
    if (cmd === "experience") {
      addOutput([
        "",
        "WORK EXPERIENCE",
        "───────────────",
        "",
        ...resume.experience.flatMap((exp) => [
          `${exp.role}`,
          `${exp.company} | ${exp.date}`,
          "",
          ...exp.description.map((item) => `• ${item}`),
          "",
        ]),
      ]);

      return;
    }

    // PROJECTS
    if (cmd === "projects") {
      addOutput([
        "",
        "PROJECTS",
        "────────",
        "",
        ...resume.projects.flatMap((project, index) => [
          `[${index + 1}] ${project.name}`,
          `    ${project.date}`,
          `    ${project.technologies.join(", ")}`,
          "",
        ]),
        "Use 'project 1', 'project 2', etc. for details.",
        "",
      ]);

      return;
    }

    // PROJECT 1
    if (cmd === "project 1") {
      addOutput(formatProject(0));
      return;
    }

    // PROJECT 2
    if (cmd === "project 2") {
      addOutput(formatProject(1));
      return;
    }

    // PROJECT 3
    if (cmd === "project 3") {
      addOutput(formatProject(2));
      return;
    }

    // PROJECT 4
    if (cmd === "project 4") {
      addOutput(formatProject(3));
      return;
    }

    // RESEARCH
    if (cmd === "research") {
      addOutput([
        "",
        "RESEARCH",
        "────────",
        "",
        resume.research.title,
        "",
        `Conference: ${resume.research.conference}`,
        `Date: ${resume.research.date}`,
        `Result: ${resume.research.result}`,
        "",
        resume.research.detail,
        "",
        `Technologies: ${resume.research.technologies.join(", ")}`,
        "",
      ]);

      return;
    }

    // CERTIFICATIONS
    if (cmd === "certifications") {
      addOutput([
        "",
        "CERTIFICATIONS",
        "──────────────",
        "",
        ...resume.certifications.map(
          (cert, index) => `${index + 1}. ${cert}`
        ),
        "",
      ]);

      return;
    }

    // CONTACT
    if (cmd === "contact") {
      addOutput([
        "",
        "CONTACT",
        "───────",
        "",
        `Email:    ${resume.contact.email}`,
        `Phone:    ${resume.contact.phone}`,
        `LinkedIn: ${resume.contact.linkedin}`,
        "",
      ]);

      return;
    }

    // RESUME
    if (cmd === "resume") {
      window.open("/resume.pdf", "_blank");

      addOutput([
        "",
        "Opening resume...",
        "",
      ]);

      return;
    }

    // GITHUB
    if (cmd === "github") {
      addOutput([
        "",
        "GitHub profile:",
        "https://github.com/harshpaygude/harsh-terminal-resume",
        "",
      ]);

      window.open(
        "https://github.com/harshpaygude/harsh-terminal-resume",
        "_blank"
      );

      return;
    }

    // LINKEDIN
    if (cmd === "linkedin") {
      window.open(resume.contact.linkedin, "_blank");

      addOutput([
        "",
        "Opening LinkedIn profile...",
        "",
      ]);

      return;
    }

    // LS
    if (cmd === "ls") {
      addOutput([
        "",
        "about/",
        "education/",
        "skills/",
        "experience/",
        "projects/",
        "research/",
        "certifications/",
        "contact/",
        "resume.pdf",
        "",
      ]);

      return;
    }

    // PWD
    if (cmd === "pwd") {
      addOutput([
        "",
        "/home/harshwardhan/portfolio",
        "",
      ]);

      return;
    }

    // NEOFETCH
    if (cmd === "neofetch") {
      addOutput([
        "",
        "        ╭─────────────────────────────╮",
        "        │     HARSHWARDHAN PAYGUDE     │",
        "        ╰─────────────────────────────╯",
        "",
        "        OS:       HarshOS",
        "        Shell:    portfolio-terminal",
        "        Role:     AI & ML Developer",
        "        Location: Pune, India",
        "        Status:   Open to opportunities",
        "",
      ]);

      return;
    }

    // SUDO HIRE HARSH
    if (cmd === "sudo hire harsh") {
      addOutput([
        "",
        "[sudo] password for recruiter:",
        "",
        "Nice try 😄",
        "",
        "Access granted.",
        "Candidate available for hire.",
        "",
        "→ AI / ML",
        "→ Generative AI",
        "→ Computer Vision",
        "→ Python",
        "→ TensorFlow / PyTorch",
        "",
      ]);

      return;
    }

    // CLEAR
    if (cmd === "clear") {
      setOutput([]);
      return;
    }

    // UNKNOWN COMMAND
    addOutput([
      "",
      `Command not found: ${command}`,
      "Type 'help' to see available commands.",
      "",
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    executeCommand(input);
    setInput("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // UP ARROW
    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (history.length === 0) return;

      const newIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(historyIndex - 1, 0);

      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    }

    // DOWN ARROW
    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (history.length === 0) return;

      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;

      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    }

    // TAB AUTOCOMPLETE
    if (e.key === "Tab") {
      e.preventDefault();

      const matches = commands.filter((command) =>
        command.startsWith(input.toLowerCase())
      );

      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono">
      {/* TERMINAL HEADER */}
      <header className="border-b border-green-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-500">●</span>
          <span className="text-green-500">●</span>
          <span className="text-green-500">●</span>

          <span className="ml-3 text-green-300">
            harsh@portfolio:~
          </span>
        </div>

        <div className="text-xs text-green-700 hidden sm:block">
          TERMINAL PORTFOLIO
        </div>
      </header>

      {/* TERMINAL */}
      <div
        ref={terminalRef}
        onClick={() => inputRef.current?.focus()}
        className="h-[calc(100vh-90px)] overflow-y-auto px-4 py-5 sm:px-8 cursor-text"
      >
        {/* OUTPUT */}
        <div className="whitespace-pre-wrap break-words leading-7">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>

        {/* COMMAND INPUT */}
        <form
          onSubmit={handleSubmit}
          className="flex items-start mt-1"
        >
          <span className="mr-2 text-green-500 shrink-0">
            harsh@portfolio:~$
          </span>

          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-transparent outline-none text-green-400 caret-transparent"
            />

            {/* BLINKING CURSOR */}
            <span className="absolute left-0 top-0 pointer-events-none">
              {input}
              <span className="inline-block w-2 h-5 ml-[1px] bg-green-400 animate-pulse align-middle" />
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}

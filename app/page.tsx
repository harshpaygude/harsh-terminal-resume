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
    "Welcome to Harshwardhan Paygude's portfolio.",
    "Type 'help' to explore.",
    "",
  ]);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }
  }, [output]);

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
      `│ DATE          ${project.date}`,
      `│ STACK         ${project.technologies.join(", ")}`,
      "│",
      ...project.description.map((item) => `│ ${item}`),
      "│",
      "└────────────────────────────────────────────",
      "",
    ];
  };

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();

    if (!cmd) return;

    setHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);

    addOutput(`visitor@portfolio:~$ ${command}`);

    if (cmd === "help") {
      addOutput([
        "",
        "┌─ AVAILABLE COMMANDS ───────────────────────┐",
        "│                                             │",
        "│  about          About me                   │",
        "│  education      Education                   │",
        "│  skills         Technical skills            │",
        "│  experience     Work experience             │",
        "│  projects       All projects                │",
        "│  project 1-4    Project details             │",
        "│  research       Research publication         │",
        "│  certifications Certifications               │",
        "│  contact        Contact information          │",
        "│  resume         Open resume                  │",
        "│  github         GitHub profile               │",
        "│  linkedin       LinkedIn profile             │",
        "│  neofetch       System information           │",
        "│  ls             List directories             │",
        "│  pwd            Current directory            │",
        "│  clear          Clear terminal               │",
        "│                                             │",
        "└─────────────────────────────────────────────┘",
        "",
      ]);
      return;
    }

    if (cmd === "about" || cmd === "whoami") {
      addOutput([
        "",
        "╭─ ABOUT ─────────────────────────────────────╮",
        "│                                             │",
        `│  ${resume.name}`,
        "│                                             │",
        "│  Computer Science (AI & Data Science)",
        "│                                             │",
        "│  Focused on Artificial Intelligence,",
        "│  Machine Learning, Generative AI,",
        "│  Computer Vision and intelligent systems.",
        "│                                             │",
        "╰─────────────────────────────────────────────╯",
        "",
      ]);
      return;
    }

    if (cmd === "education") {
      addOutput([
        "",
        "╭─ EDUCATION ─────────────────────────────────╮",
        "│                                             │",
        ...resume.education.flatMap((edu) => [
          `│  ${edu.year}  ${edu.degree}`,
          `│  ${edu.institute}`,
          `│  Score: ${edu.score}`,
          "│",
        ]),
        "╰─────────────────────────────────────────────╯",
        "",
      ]);
      return;
    }

    if (cmd === "skills") {
      addOutput([
        "",
        "╭─ TECHNICAL SKILLS ──────────────────────────╮",
        "│                                             │",
        `│  LANGUAGES     ${resume.skills.languages.join(", ")}`,
        "│",
        `│  FRAMEWORKS    ${resume.skills.frameworks.join(", ")}`,
        "│",
        `│  DATABASES     ${resume.skills.databases.join(", ")}`,
        "│",
        `│  TOOLS         ${resume.skills.tools.join(", ")}`,
        "│",
        `│  GEN AI        ${resume.skills.generativeAI.join(", ")}`,
        "│",
        "╰─────────────────────────────────────────────╯",
        "",
      ]);
      return;
    }

    if (cmd === "experience") {
      addOutput([
        "",
        "╭─ EXPERIENCE ─────────────────────────────────╮",
        "│                                             │",
        ...resume.experience.flatMap((exp) => [
          `│  ${exp.role}`,
          `│  ${exp.company}  •  ${exp.date}`,
          "│",
          ...exp.description.map((item) => `│  • ${item}`),
          "│",
        ]),
        "╰─────────────────────────────────────────────╯",
        "",
      ]);
      return;
    }

    if (cmd === "projects") {
      addOutput([
        "",
        "╭─ PROJECT INDEX ──────────────────────────────╮",
        "│                                             │",
        ...resume.projects.flatMap((project, index) => [
          `│  [0${index + 1}]  ${project.name}`,
          `│       ${project.date}`,
          `│       ${project.technologies.join(" • ")}`,
          "│",
        ]),
        "│  Type 'project 1' through 'project 4'       │",
        "│  to inspect a project.                      │",
        "│                                             │",
        "╰─────────────────────────────────────────────╯",
        "",
      ]);
      return;
    }

    if (cmd === "project 1") {
      addOutput(formatProject(0));
      return;
    }

    if (cmd === "project 2") {
      addOutput(formatProject(1));
      return;
    }

    if (cmd === "project 3") {
      addOutput(formatProject(2));
      return;
    }

    if (cmd === "project 4") {
      addOutput(formatProject(3));
      return;
    }

    if (cmd === "research") {
      addOutput([
        "",
        "╭─ RESEARCH ───────────────────────────────────╮",
        "│                                             │",
        `│  ${resume.research.title}`,
        "│",
        `│  Conference: ${resume.research.conference}`,
        `│  Date:       ${resume.research.date}`,
        `│  Result:     ${resume.research.result}`,
        "│",
        `│  ${resume.research.detail}`,
        "│",
        `│  Stack: ${resume.research.technologies.join(", ")}`,
        "│",
        "╰─────────────────────────────────────────────╯",
        "",
      ]);
      return;
    }

    if (cmd === "certifications") {
      addOutput([
        "",
        "╭─ CERTIFICATIONS ─────────────────────────────╮",
        "│                                             │",
        ...resume.certifications.map(
          (cert, index) => `│  [${index + 1}] ${cert}`
        ),
        "│                                             │",
        "╰─────────────────────────────────────────────╯",
        "",
      ]);
      return;
    }

    if (cmd === "contact") {
      addOutput([
        "",
        "╭─ CONTACT ────────────────────────────────────╮",
        "│                                             │",
        `│  EMAIL     ${resume.contact.email}`,
        `│  PHONE     ${resume.contact.phone}`,
        "│  LINKEDIN  Open with 'linkedin'",
        "│  GITHUB    Open with 'github'",
        "│                                             │",
        "╰─────────────────────────────────────────────╯",
        "",
      ]);
      return;
    }

    if (cmd === "resume") {
      window.open("/resume.pdf", "_blank");

      addOutput([
        "",
        "→ Opening resume.pdf...",
        "",
      ]);
      return;
    }

    if (cmd === "github") {
      window.open(
        "https://github.com/harshpaygude/harsh-terminal-resume",
        "_blank"
      );

      addOutput([
        "",
        "→ Opening GitHub...",
        "",
      ]);
      return;
    }

    if (cmd === "linkedin") {
      window.open(resume.contact.linkedin, "_blank");

      addOutput([
        "",
        "→ Opening LinkedIn...",
        "",
      ]);
      return;
    }

    if (cmd === "ls") {
      addOutput([
        "",
        "drwxr-xr-x  about/",
        "drwxr-xr-x  education/",
        "drwxr-xr-x  skills/",
        "drwxr-xr-x  experience/",
        "drwxr-xr-x  projects/",
        "drwxr-xr-x  research/",
        "drwxr-xr-x  certifications/",
        "drwxr-xr-x  contact/",
        "-rw-r--r--  resume.pdf",
        "",
      ]);
      return;
    }

    if (cmd === "pwd") {
      addOutput([
        "",
        "/home/harshwardhan/portfolio",
        "",
      ]);
      return;
    }

    if (cmd === "neofetch") {
      addOutput([
        "",
        "        ██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗",
        "        ██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║",
        "        ███████║███████║██████╔╝███████╗███████║",
        "        ██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║",
        "        ██║  ██║██║  ██║██║  ██║███████║██║  ██║",
        "        ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝",
        "",
        "        USER       Harshwardhan Paygude",
        "        ROLE       AI / ML Developer",
        "        DEGREE     B.Tech CSE (AI & DS)",
        "        LOCATION   Pune, India",
        "        SHELL      portfolio-terminal",
        "        STATUS     Available",
        "",
      ]);
      return;
    }

    if (cmd === "sudo hire harsh") {
      addOutput([
        "",
        "[sudo] password for recruiter:",
        "",
        "ACCESS GRANTED.",
        "",
        "Candidate profile unlocked.",
        "",
        "  ✓ Artificial Intelligence",
        "  ✓ Machine Learning",
        "  ✓ Generative AI",
        "  ✓ Computer Vision",
        "  ✓ Python / C++",
        "  ✓ TensorFlow / PyTorch",
        "",
      ]);
      return;
    }

    if (cmd === "clear") {
      setOutput([]);
      return;
    }

    addOutput([
      "",
      `command not found: ${command}`,
      "Type 'help' for available commands.",
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
    <main className="portfolio-shell">
      <div className="background-grid" />

      <div className="portfolio-layout">

        {/* LEFT IDENTITY PANEL */}
        <aside className="identity-panel">

          <div className="identity-card">

            <div className="card-top">
              <span className="access-label">
                ACCESS GRANTED
              </span>

              <span className="status-dot" />
            </div>

            {/* PHOTO-FREE ID AREA */}
            <div className="identity-symbol">
              <div className="monogram">
                HP
              </div>

              <div className="symbol-ring" />
            </div>

            <div className="identity-name">
              {resume.name}
            </div>

            <div className="identity-role">
              AI &amp; ML / GENERATIVE AI
            </div>

            <div className="identity-degree">
              B.TECH • COMPUTER SCIENCE
              <br />
              AI &amp; DATA SCIENCE
            </div>

            <div className="card-divider" />

            <div className="identity-meta">
              <div>
                <span>STATUS</span>
                <strong>AVAILABLE</strong>
              </div>

              <div>
                <span>LOCATION</span>
                <strong>PUNE, INDIA</strong>
              </div>
            </div>

            <div className="barcode">
              {Array.from({ length: 42 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    height: `${12 + ((i * 7) % 18)}px`,
                  }}
                />
              ))}
            </div>

            <div className="barcode-label">
              HP / AI-DS / 2026
            </div>

          </div>

          {/* SOCIAL LINKS */}
          <div className="social-links">

            <button
              onClick={() =>
                window.open(
                  "https://github.com/harshpaygude/harsh-terminal-resume",
                  "_blank"
                )
              }
            >
              GITHUB
            </button>

            <button
              onClick={() =>
                window.open(
                  resume.contact.linkedin,
                  "_blank"
                )
              }
            >
              LINKEDIN
            </button>

            <button
              onClick={() =>
                (window.location.href =
                  `mailto:${resume.contact.email}`)
              }
            >
              EMAIL
            </button>

          </div>

          <div className="identity-hint">
            <span>TIP</span>
            Type <b>help</b> in the terminal
          </div>

        </aside>

        {/* RIGHT TERMINAL */}
        <section className="terminal-window">

          {/* TERMINAL TITLE BAR */}
          <div className="terminal-titlebar">

            <div className="window-controls">
              <span className="control red" />
              <span className="control yellow" />
              <span className="control green" />
            </div>

            <div className="terminal-title">
              harshwardhan@portfolio — zsh
            </div>

            <div className="terminal-size">
              80×24
            </div>

          </div>

          {/* TERMINAL CONTENT */}
          <div
            ref={terminalRef}
            className="terminal-content"
            onClick={() => inputRef.current?.focus()}
          >

            <div className="login-line">
              Last login: Today on portfolio-terminal
            </div>

            <div className="welcome-line">
              Welcome. Type <span>'help'</span> for available commands.
            </div>

            <div className="terminal-separator">
              ─────────────────────────────────────────────
            </div>

            <div className="terminal-output">

              {output.map((line, index) => (
                <div
                  key={index}
                  className={
                    line.startsWith("visitor@portfolio")
                      ? "command-line"
                      : ""
                  }
                >
                  {line}
                </div>
              ))}

            </div>

            {/* INPUT */}
            <form
              onSubmit={handleSubmit}
              className="command-form"
            >

              <span className="prompt">
                visitor@portfolio:~$
              </span>

              <div className="input-wrapper">

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command"
                />

                <span className="terminal-cursor" />

              </div>

            </form>

          </div>

          {/* TERMINAL FOOTER */}
          <div className="terminal-footer">
            <span>UTF-8</span>
            <span>TERMINAL</span>
            <span>READY</span>
          </div>

        </section>

      </div>

      {/* MOBILE FOOTER */}
      <div className="mobile-command-hint">
        <span>visitor@portfolio:~$</span>
        <span>Type "help" to begin</span>
      </div>

    </main>
  );
}

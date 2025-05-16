"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

interface ProjectProps {
  title: string;
  link: string;
  logo: string;
  description: string;
  preview?: string;
}

const ProjectItem: React.FC<ProjectProps> = ({
  title,
  link,
  logo,
  description,
  preview = "/default.png",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-start">
        <div className="w-8 h-6 mr-4 flex-shrink-0">
          <img
            src={logo}
            alt={`${title} logo`}
            className="w-full h-full rounded-full   object-cover border border-[var(--border)]"
          />
        </div>

        <div>
          <span className="relative inline-block">
            <a
              href={link}
              className="text-base text-[var(--foreground)] decoration-[1px] underline underline-offset-3 decoration-[var(--muted-foreground)] cursor-pointer group flex items-center"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {title}
              <svg
                className="w-4 h-4 ml-0.5 inline-block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>

            {isHovered && (
              <div className="absolute z-10 left-full ml-4 top-0 w-72 p-2 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]">
                <div className="w-full h-40 overflow-hidden rounded mb-2">
                  {preview.endsWith(".mp4") ||
                  preview.endsWith(".webm") ||
                  preview.endsWith(".mov") ? (
                    <video
                      src={preview}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt={`${title} preview`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <p className="text-xs">{description}</p>
                <div className="absolute top-3 -left-2 w-4 h-4 bg-[var(--tooltip)] border-l border-b border-[var(--tooltip-border)] transform rotate-45"></div>
              </div>
            )}
          </span>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const projects = [
  {
    title: "Placebooking",
    link: "https://place-booking.vercel.app/",
    logo: "/projects/favicon.ico ",
    description:
      "A place where you can rent your Idle property on rent for short period.",
    preview: "/projects/Placebooking.gif",
  },
  {
    title: "CloudWise",
    link: "https://github.com/SomPalkar/CloudWise",
    logo: "/projects/favicon.ico ",
    description: "CloudWise Help you to Reduce your cloud spend.",
    preview: "/projects/CloudWise.gif",
  },
  {
    title: "TinyContract",
    link: "https://github.com/Sompalkar/TinyContract",
    logo: "/projects/favicon.ico ",
    description:
      "Contract for every small things - stops cheating and gives legal support.",
    preview: "/projects/TinyContracts.gif",
  },
  {
    title: "MediTrack",
    link: "https://meditrack-ten.vercel.app/",
    logo: "/projects/favicon.ico  ",
    description: "Place where medicines are available at your fingertips",
    preview: "/projects/meditrack.gif",
  },
];

const preloadMedia = (preview: string) => {
  const img = new Image();
  img.src = preview;

  if (
    preview.endsWith(".mp4") ||
    preview.endsWith(".webm") ||
    preview.endsWith(".mov")
  ) {
    const video = document.createElement("video");
    video.src = preview;
  }
};

const Projects: React.FC = () => {
  useEffect(() => {
    projects.forEach(({ preview }) => preloadMedia(preview));
  }, []);

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        projects
      </h1>
      <div className="max-w-2xl">
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            title={project.title}
            link={project.link}
            logo={project.logo}
            description={project.description}
            preview={project.preview}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;

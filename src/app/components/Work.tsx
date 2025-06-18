"use client"; 
import React, { useState } from "react";

interface WorkExperienceProps {
  company: string;
  position: string;
  description: React.ReactNode[];
  logo?: string;
  website?: string;
}

interface LinkWithTooltipProps {
  href: string;
  text: string;
  description?: string;
}

interface CompanyLogoProps {
  src: string;
  alt: string;
  href: string;
  zIndex: number;
}

// Reusable link component with tooltip
const LinkWithTooltip: React.FC<LinkWithTooltipProps> = ({
  href,
  text,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="relative inline-block">
      <a
        href={href}
        className="text-[var(--muted-foreground)] text-sm underline decoration-[1px] underline-offset-3 decoration-[var(--muted-foreground)] cursor-pointer group inline-flex items-center"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
        <svg
          className="w-3 h-3 ml-0.5 inline-block"
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

      {description && isHovered && (
        <div className="absolute z-10 left-0 -bottom-24 w-64 p-3 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]">
          {description}
          <div className="absolute -top-2 left-3 w-4 h-4 bg-[var(--tooltip)] border-t border-l border-[var(--tooltip-border)] transform rotate-45"></div>
        </div>
      )}
    </span>
  );
};

// Company logo component with website link and hover effect
const CompanyLogo: React.FC<CompanyLogoProps> = ({
  src,
  alt,
  href,
  zIndex,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative w-12 h-12 rounded-full border-2 border-[var(--background)] overflow-hidden ${
        zIndex < 40 ? "-ml-4" : ""
      } hover:z-50 transition-all duration-200 ${
        isHovered ? "scale-110 z-50" : `z-${zIndex}`
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: isHovered ? 50 : zIndex }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img src={src} alt={alt} className="w-full h-full object-contain" />
      {isHovered && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap px-2 py-1 text-xs bg-[var(--tooltip)] text-[var(--tooltip-foreground)] rounded shadow-lg">
          {alt.replace(" logo", "")}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--tooltip)] transform rotate-45"></div>
        </div>
      )}
    </a>
  );
};

// Work experience Component
const WorkExperienceItem: React.FC<WorkExperienceProps> = ({
  company,
  position,
  description,
  logo,
  website,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-start">
        {logo && (
          <div className="w-10 h-10 mr-4 flex-shrink-0">
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                   {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                  src={logo}
                  alt={`${company} logo`}
                  className="w-full h-full rounded-full object-cover border border-[var(--border)]"
                />
              </a>
            ) : (
                                 
              <img
                src={logo}
                alt={`${company} logo`}
                className="w-full h-full rounded-full object-cover border border-[var(--border)]"
              />
            )}
          </div>
        )}

        <div>
          <h3 className="text-base font-medium text-[var(--foreground)]">
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {company}
              </a>
            ) : (
              company
            )}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            {position}
          </p>
          <ul className="text-sm text-[var(--foreground)] list-disc pl-4 marker:text-[var(--muted-foreground)]">
            {description.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};



//logos component


const CollaborationLogos: React.FC = () => {

  // Company data structured in an array for better maintainability
  const companies = [
    {
      name: "Accenture",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Accenture-Emblem-700x394.png",
      website: "https://Accenture.com/",
      zIndex: 40,
    },
     
  ];




  return (
    <div className="mb-8">
      <p className="text-xs text-[var(--muted-foreground)] mb-3">
        also worked with folks at
      </p>
      <div className="flex items-center">
        <div className="relative flex ">
          {companies.map((company) => (
            <CompanyLogo
              key={company.name}
              src={company.logo}
              alt={`${company.name} logo`}
              href={company.website}
              zIndex={company.zIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Work: React.FC = () => {


  // Work experience data structured in an array


  const workExperiences = [  
    {
      company: "Accenture",
      position: "Software Engineer",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Accenture-Emblem-700x394.png",
      website: "https://www.accenture.com/",
      description: [
        <>
          Developed high-performance microservices using Node.js, TypeScript, and PostgreSQL, {" "}
          <LinkWithTooltip
            href="https://github.com/sompalkar/"
            text="MicroServices"
          />
           {" "} boosting backend throughput by 35%.
        </>,
        <>
           Built fast, responsive UIs using React, Next.js, TypeScript, Recoil, Redux, and TailwindCSS,{"  "}{" "}  
          <LinkWithTooltip
            href="https://github.com/sompalkar/CloudWise"
            text="UI/UX"
          />
          {" "}  improving UX across multiple platforms.
          
        </>,
        <>
          Reduced release cycle time by 40% by automating CI/CD with Docker, multi-stage builds,{" "}{" "}
          <LinkWithTooltip
            href="https://github.com/sompalkar/"
            text="CI/CD"
          />
          {" "} and Jenkins pipelines.
        </>,
        <>
          Deployed caching and real-time data delivery using Redis (Pub/Sub + caching),{" "}
          <LinkWithTooltip
            href="https://github.com/sompalkar/accenture-cloud/"
            text="Chaching"
          />
          {" "} cutting load times for key features by up to 30%.
        </>,
        <>
          Automated infrastructure using Ansible and Kubernetes, {" "}
          <LinkWithTooltip
            href="https://github.com/sompalkar/"
            text=" infra PR "
          />
          {" "} while managing on-premise servers via vCenter, resulting in 25% cost optimization.
        </>,
      ],
    },
    
  ];

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">work</h1>
      <div className="max-w-2xl">
        {workExperiences.map((work, index) => (
          <WorkExperienceItem
            key={index}
            company={work.company}
            position={work.position}
            logo={work.logo}
            website={work.website}
            description={work.description}
          />
        ))}
        <CollaborationLogos />
      </div>
    </div>
  );
};

export default Work;

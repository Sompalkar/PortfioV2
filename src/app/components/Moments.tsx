"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface PolaroidProps {
  image: string;
  description: string;
  alt: string;
}

const Polaroid: React.FC<PolaroidProps> = ({ image, description, alt }) => {
  return (
    <div className="polaroid-card min-w-[200px] sm:min-w-80 bg-white p-2 sm:p-4 pb-4 sm:pb-6 shadow-xl m-2 sm:m-4 transition-transform duration-300 hover:-rotate-2 hover:scale-105 relative before:absolute before:inset-0 before:shadow-md before:content-[''] before:z-[-1]">
      <div className="mb-2 sm:mb-4 h-48 sm:h-80 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="polaroid-text text-xs sm:text-sm text-black p-1 sm:p-2 text-center">
        {description}
      </div>
    </div>
  );
};

const Moments: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use intersection observer to only animate when in view

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Combine both refs
  
  const setRefs = (node: HTMLDivElement | null) => {
    scrollRef.current = node;
    if (typeof inViewRef === "function") {
      inViewRef(node);
    }
  };

  const polaroids = [
    {
      image: "/moments/Devfest.jpeg",
      description: "DevFest Pune 2024",
      alt: "Devfest Event",
    },
    {
      image: "/moments/ID-Card.jpeg",
      description: "Games at Event ",
      alt: "Games at Event",
    },
    {
      image: "/moments/Devfest-Conf.jpeg",
      description: "Conf Event",
      alt: "Conference",
    },
    
     
    {
      image: "/moments/Accenture.jpeg",
      description: "Accenture",
      alt: "Accenture",
    },
    {
      image: "/moments/@mumbai1.jpeg",
      description: "Mumbai ❤️",
      alt: "Accenture",
    },
    {
      image: "/moments/@Mumbai2.jpeg",
      description: "Mumbai Momments ❤️",
      alt: "Accenture",
    },
    {
      image: "/moments/marineDrive1.jpeg",
      description: "MarineDrive",
      alt: "Accenture",
    },
    {
      image: "/moments/beach.jpeg",
      description: "Somewhere In Mumbai ❤️",
      alt: "Accenture",
    },
    {
      image: "/moments/Pune.jpeg",
      description: "Pune ❤️",
      alt: "Accenture",
    },
     
  ];

  // Continuous auto-scrolling effect will not stop on hover

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let lastTimestamp: number = 0;
    let scrollPos = 0;
    const scrollSpeed = 0.5; // scroll speed

    // Calculate max scroll position once

    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const scroll = (timestamp: number) => {
      if (!scrollContainer || !inView) return;

      // Throttle animation to reduce CPU usage

      if (timestamp - lastTimestamp > 16) {
        // 60fps max
        lastTimestamp = timestamp;

        scrollPos += scrollSpeed;

        // Reset when we reach the end - jump back to start  

        if (scrollPos >= maxScroll) {
          scrollPos = 0;
        }

        scrollContainer.scrollLeft = scrollPos;
      }

      animationId = requestAnimationFrame(scroll);
    };

    // Only start animation if component is in view

    if (inView) {
      animationId = requestAnimationFrame(scroll);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [inView]);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)] px-4">
        moments
      </h1>
      <div className="max-w-2xl px-4">
        <p className="mb-6 text-base text-[var(--foreground)]">
          Tbh I&apos;m still figuring it out. Here&apos;s a small glimpse of my
          journey so far.
        </p>
      </div>

      <div className="relative w-full overflow-x-hidden overflow-y-visible">
        <div
          ref={setRefs}
          className="flex carousel overflow-x-auto scrollbar-hide !overflow-y-visible py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >

          {/* Added polaroids with repeated items at the end for seamless looping */}

          {polaroids.concat(polaroids.slice(0, 5)).map((polaroid, index) => (
            <Polaroid
              key={index}
              image={polaroid.image}
              description={polaroid.description}
              alt={polaroid.alt}
            />
          ))}
        </div>
      </div>

      {/* Add this style to hide scrollbar */}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Moments;

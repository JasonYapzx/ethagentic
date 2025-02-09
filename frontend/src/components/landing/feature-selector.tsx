"use client";

import { FileIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface FeatureOption {
  id: number;
  title: string;
  description: string;
  code: string;
  filePath?: string;
  link: string;
}

interface FeatureSelectorProps {
  features: FeatureOption[];
}

export const FeatureSelector: React.FC<FeatureSelectorProps> = ({
  features,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 relative">
      <div className="md:col-span-2 border-b md:border-b-0 bg-background md:border-r border-border sticky top-[var(--header-height)]">
        <div className="flex md:flex-col feature-btn-container overflow-x-auto p-4 pb-2">
          {features.map((option, index) => (
            <button
              key={option.id}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 hover:cursor-pointer w-64 md:w-full text-left p-4 mb-2 mr-2 last:mr-0 md:mr-0 rounded-none border border-border ${selectedIndex === index ? "bg-accent/70" : "hover:bg-muted/50"
                }`}
            >
              <h3 className="font-medium tracking-tight">{option.title}</h3>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-1 md:col-span-3 p-4">
        <Link 
          href={features[selectedIndex].link} 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline flex items-center bg-accent p-2 text-sm text-foreground hover:cursor-pointer"
        >
          <FileIcon className="mr-2 h-4 w-4" />
          {features[selectedIndex].filePath}
        </Link>
        <div
          className="bg-background font-mono text-sm [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:break-all md:max-h-[45vh] overflow-scroll"
          dangerouslySetInnerHTML={{ __html: features[selectedIndex].code }}
        />
      </div>
    </div>
  );
};

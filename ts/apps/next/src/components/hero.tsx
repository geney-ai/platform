"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  return (
    <section className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6 gradient-text">
              Generative Biochemistry,
              <br />
              Automated
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Accelerate your research with AI-powered workflows and intelligent
              agent assistance. Geney transforms how biochemistry research gets
              done.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href={
                  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8000"
                }
                className="inline-flex items-center px-8 py-3 bg-accent text-accent-foreground rounded-full text-base font-medium hover:bg-accent/90 transition-all transform hover:scale-105 shadow-lg"
              >
                Beta
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="text-center">
            <Image
              src="/icon.svg"
              alt="generic"
              width={500}
              height={500}
              className="mx-auto w-full dark:invert dark:brightness-90"
              style={{
                maxWidth: "500px",
                height: "500px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
"use strict";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import AccordionInstructionToast from "../guide7/components/accordionInstruction";
import Functions from "./components/Functions";
import { House } from "lucide-react";

const page = () => {
  return (
    <>
      <AccordionInstructionToast />
      <div className="flex flex-col mt-4 items-center justify-center">
        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
        <Card className="w-[850px] relative">
          <div className="absolute top-5 right-5 hover:bg-gray-600 rounded-full p-1.5 transition-all">
            <Link href="/">
              <House />
            </Link>
          </div>
          <CardHeader>
            <div className="mb-2">
              <CardTitle>Guide 10 - Functions</CardTitle>
            </div>
            <div>
              <CardDescription>
                Understand what functions are, parameters, return values and
                related concepts.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Demonstration of functions
                  </AccordionTrigger>
                  <AccordionContent>
                    <Functions />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <Link href="/guide9">
                <Button variant="outline">Back</Button>
              </Link>
            </div>
            <div>
              <Link href="/">
                <Button>Home</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default page;

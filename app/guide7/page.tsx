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
import Variables from "./components/variables";
import Arithmetic from "./components/arithmetic";
import AccordionInstructionToast from "./components/accordionInstruction";
import StringConcatenations from "./components/stringConCat";
import TruthyFalsy from "./components/truthsyFalsy";
import ArrayOperations from "./components/arrayOperations";
import ObjectOperations from "./components/objectOperations";
import MathMethods from "./components/mathMethods";
import DateOperations from "./components/dateOperations";
import { House } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggler";

const page = () => {
  return (
    <>
      <AccordionInstructionToast />
      <div className="flex flex-col mt-4 items-center justify-center hide-scrollbar">
        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
        <Card className="w-[850px] relative">
          <div className="absolute right-16 top-5">
            <ModeToggle />
          </div>
          <div className="absolute top-5 right-5">
            <Button variant="ghost" size="icon">
              <Link href="/">
                <House />
              </Link>
            </Button>
          </div>
          <CardHeader>
            <div className="mb-2">
              <CardTitle>Guide 7 - Fundamentals & Data types</CardTitle>
            </div>
            <div>
              <CardDescription>
                Follow these steps to try out different things connected to
                TypeScript:
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Demonstrate variables assignments
                  </AccordionTrigger>
                  <AccordionContent>
                    <Variables />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Output the result of arithmetic operations
                  </AccordionTrigger>
                  <AccordionContent>
                    <Arithmetic />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Output the result of string concatenations
                  </AccordionTrigger>
                  <AccordionContent>
                    <StringConcatenations />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Demonstrate the usage of if statements to check for truthy
                    or falsy values
                  </AccordionTrigger>
                  <AccordionContent>
                    <TruthyFalsy />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Create array with multiple values
                  </AccordionTrigger>
                  <AccordionContent>
                    <ArrayOperations />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Demonstrate how to create an object
                  </AccordionTrigger>
                  <AccordionContent>
                    <ObjectOperations />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>
                    Demonstrate at least one Math() method
                  </AccordionTrigger>
                  <AccordionContent>
                    <MathMethods />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>
                    Output the date and time of opening of the file using Date()
                  </AccordionTrigger>
                  <AccordionContent>
                    <DateOperations />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/">
              <Button variant="outline">Back</Button>
            </Link>
            <Link href="/guide8">
              <Button>Next guide</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default page;

"use client";

import SignatureCard from "./SignatureCard";

const SignatureContainer = () => {
  return (
    <div className="grid grid-cols-6 gap-x-8">
      <SignatureCard name="Employee 1" />
      <SignatureCard name="Employee 2" />
      <SignatureCard name="Employee 3" />
      <SignatureCard name="Employee 4" />
      <SignatureCard name="Employee 5" />
      <SignatureCard name="Employee 6" />
    </div>
  );
};

export default SignatureContainer;

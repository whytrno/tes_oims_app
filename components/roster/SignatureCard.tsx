const SignatureCard: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="space-y-2">
      <div className="w-full h-32 bg-gray-300 rounded-lg" />
      <p className="border-b text-center border-gray-600">{name}</p>
    </div>
  );
};

export default SignatureCard;

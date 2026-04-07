const Loader = ({ py }: { py?: string }) => {
  return (
    <div className={`flex items-center justify-center ${py || "py-10"}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
    </div>
  );
};

export default Loader;

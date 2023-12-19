export default function LoadingState() {
  return (
    <div className="flex space-x-2 justify-center items-center bg-transparent h-[300px] mt-10">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-[#c6c5c5] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-[#c6c5c5] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-[#c6c5c5] rounded-full animate-bounce"></div>
    </div>
  );
}

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-52 px-12 text-white absolute bg-gradient-to-r from-black">
      <h1 className="text-4xl font-bold p-2">{title}</h1>
      <p className="w-4/12 text-md p-2">{overview}</p>
      <div className="space-x-2 pl-2 pt-4 font-semibold opacity-80">
        <button className="bg-white text-black text-lg rounded-lg px-12 py-1 hover:opacity-75 transition">▶️ Play</button>
        <button className="bg-gray-700  text-lg rounded-lg px-12 py-1">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;

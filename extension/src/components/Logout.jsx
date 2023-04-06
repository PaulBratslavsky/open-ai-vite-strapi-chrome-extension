
export default function Logout({ onClick }) {
  return (
    <div className="container px-4 mx-auto my-4">
      <div className="max-w-sm mx-auto">
        <button className="text-violet-400 underline" onClick={onClick}>
          Logout
        </button>
      </div>
    </div>
  );
}
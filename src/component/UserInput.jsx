export const Message = ({ label, placeholder, data, setData }) => {
  return (
    <div className="text-sm w-full my-4">
      <label className="text-border font-semibold">{label}</label>
      <textarea
        className="w-full h-40 mt-2 p-6 bg-gray-300 border border-border rounded"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder={placeholder}></textarea>
    </div>
  );
};

export const Select = ({ label, options, setData }) => {
  return (
    <>
      <label className="text-black font-semibold">{label}</label>
      <select
        className="w-full mt-2 px-6 py-4 text-black bg-gray-300 border border-border rounded cursor-pointer"
        onChange={(e) => setData(e.target.value)}>
        {options.map((o, i) => (
          <option key={i} value={o.value}>
            {o.title}
          </option>
        ))}
      </select>
    </>
  );
};

export const Input = ({ label, placeholder, type, bg, data, setData }) => {
  return (
    <div className="text-md my-2 w-full">
      <label className="text-border mb-2 font-semibold">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        value={data}
        className={`w-full text-sm mt-2 p-3 border border-border rounded text-black ${
          bg ? "bg-gray-100" : "bg-main"
        }`}
        onChange={(e) => setData(e.target.value)}
      />
    </div>
  );
};

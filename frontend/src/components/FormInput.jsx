const FormInput = ({ type, name, value, onChange, placeholder, required }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border border-gray-800"
    placeholder={placeholder}
    required={required}
  />
);

export default FormInput;

const FormNotification = ({ message, type }) => (
  <div
    className={`mt-4 p-3 rounded-md text-center ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    <p className="text-white">{message}</p>
  </div>
);

export default FormNotification;

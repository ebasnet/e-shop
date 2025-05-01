const FormToggle = ({ currentState, setCurrentState }) => (
  <div className="w-full flex justify-between text-sm mt-[-8px]">
    <p className="cursor-pointer">Forgot your password?</p>
    {currentState === "Login" ? (
      <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer">
        Create Account
      </p>
    ) : (
      <p onClick={() => setCurrentState("Login")} className="cursor-pointer">
        Login Here
      </p>
    )}
  </div>
);

export default FormToggle;

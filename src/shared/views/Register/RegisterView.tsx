import RegisterForm from "./components/RegisterForm";

const RegisterView = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7FBFF] px-4">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 w-full md:w-[35rem] h-auto flex justify-center items-center">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterView;

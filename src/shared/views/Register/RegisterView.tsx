import RegisterForm from "./components/RegisterForm";

const RegisterView = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7FBFF] px-4">
      <div className="bg-white shadow-lg rounded px-8 py-10 w-full md:w-[35rem] h-[40rem] flex justify-center items-center">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterView;

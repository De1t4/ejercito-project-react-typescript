import Navbar from "../components/Navbar";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className=" w-full h-full bg-white-color">
        <div className="lg:pt-8 md:pt-12 max-md:pt-14 max-w-[1440px] mx-4 lg:mx-auto pt-40 lg:pb-12 pb-6 font-poppins  py-28 bg-white-color  flex flex-col gap-y-10 max-md:gap-y-10">{children}</div>
      </main>
    </>

  )
}
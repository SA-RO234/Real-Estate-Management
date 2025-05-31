import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2 className="pb-2 text-3xl  font-semibold tracking-tight transition-colors ">
        Dashboard
      </h2>
      <div className="flex flex-col gap-4 md:gap-6">
        <SectionCards />
        <div className="flex gap-x-5">
          <ChartAreaInteractive />
          <Messages />
        </div>
      </div>
    </div>
  );
}

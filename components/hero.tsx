import Image from "next/image";

export default function Header() {
  return (
    <div className="h-full flex flex-col gap-16 items-center justify-center">
      <h1 className="sr-only">Vex, a cow monitor</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center mt-16">
        Optimiza y controla tu rebaño en tiempo real con {" "}
        <span className="text-black font-black">Vex</span>{" "}
      </p>
      <Image
        src="/images/cow_logo_2.jpg"
        alt="Cow Image"
        width={300}
        height={400}
        className="rounded-full"
      />
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}

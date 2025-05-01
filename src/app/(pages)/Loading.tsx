import Image from "next/image";

const Loading = () => {
  return (
    <div className="mt-80 flex h-full w-full flex-col text-center sm:mt-100">
      <figure className="flex justify-center">
        <Image src="/Spinner.gif" alt="loading..." width={40} height={40} />
      </figure>

      <h5 className="text-base text-[#999999]">잠시만 기다려주세요.</h5>
    </div>
  );
};

export default Loading;

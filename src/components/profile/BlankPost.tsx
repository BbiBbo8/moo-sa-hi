import Image from "next/image";

const BlankPost = () => {
  return (
    <section className="flex flex-col gap-3 text-center">
      <div className="mt-[20%] flex justify-center">
        <Image src="/icons/pen-solid.svg" alt="pensil" width={48} height={48} />
      </div>
      <p className="font-[16px] text-[#999999]">아직 게시글이 없어요</p>
    </section>
  );
};

export default BlankPost;

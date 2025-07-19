import Link from 'next/link'
import Image from 'next/image'
const HomeHeader = () => {
  return (
    <div className="max-w-[1568px] m-auto  rounded-3xl border-1 shadow-lg  bg-white/20    backdrop-blur-md    backdrop-saturate-150 border-white flex pt-5  pb-5 pl-10  pr-10 items-center justify-between" >
        <div className={"text-white b text-xl"}>
            <Image
                src="/text-logo.svg"
                alt={'11'}
                width={126}
                height={20}
            />
        </div>
        <div className={"flex gap-13 font-bold"}>
          <span className="cursor-pointer bg-gradient-to-r text-white bg-clip-textbg-gradient-to-r bg-clip-text b">Product</span>
          <span className="cursor-pointer bg-gradient-to-r text-white bg-clip-textbg-gradient-to-r bg-clip-text b">Marketplace</span>
          <span className="cursor-pointer bg-gradient-to-r text-white bg-clip-textbg-gradient-to-r bg-clip-text b"> <Link href="/agent">Agent</Link></span>
          <span className="cursor-pointer bg-gradient-to-r text-white bg-clip-textbg-gradient-to-r bg-clip-text b">Docs</span>
          <span className="cursor-pointer bg-gradient-to-r text-white bg-clip-textbg-gradient-to-r bg-clip-text b">Biog</span>
        </div>
        <div  className={"text-white b text-xl"}>
            <button>waitlist</button>
        </div>
    </div>
  )
}

export default HomeHeader

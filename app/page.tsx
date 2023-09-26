import { Nothing_You_Could_Do } from "next/font/google"
import { getLatest } from "./mongodb/getLatest";
import Image from "next/image";
import { formatDate } from "./lib/formatDate";

const NYCD = Nothing_You_Could_Do({weight:"400",subsets:['latin']});

const Home = async() => {

  const latestImage = await getLatest();

  return (
    <main
      className={`
        gap-y-4
        flex flex-col 
        items-center justify-center 
        my-[20vh]`}>


      <section className="
        rounded-md border-black 
        border border-dashed p-10">

        <h1 className="underline font-light decoration-1">Latest Showcase</h1>
        <figure>
          <figcaption className={`text-center ${NYCD.className}`}>{latestImage.title}</figcaption>
          <Image
            height={384}
            width={384}
            src={latestImage.url}
            className="w-full h-96 my-4 aspect-[9/20]"
            alt="Something very cool" />
          <figcaption className={`text-end ${NYCD.className}`}>{formatDate(latestImage.created_at)}</figcaption>
        </figure>

      </section>

    </main>
  )
}

export default Home;
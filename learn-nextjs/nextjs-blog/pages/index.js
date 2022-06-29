import Link from "next/link"
import Head from "next/head"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Head>
        <title>NextJs Blog</title>
      </Head>

      <h1 className="title">
        Read{" "}
        <Link href="/posts/first-post">
          <a className="underline">this page!</a>
        </Link>
        <img className="h-20" src="/images/profile.jpg" alt="Your Name" />
        <Image
          src="/images/profile.jpg"
          height={256}
          width={256}
          alt="Your Name"
        />
      </h1>
    </>
  )
}

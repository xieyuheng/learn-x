import Link from "next/link"

export default function Home() {
  return (
    <h1 className="title">
      Read{" "}
      <Link href="/posts/first-post">
        <a className="underline">this page!</a>
      </Link>
    </h1>
  )
}

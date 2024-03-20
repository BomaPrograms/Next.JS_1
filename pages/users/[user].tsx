import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return <p>User ID: {router.query.user}</p>;
}
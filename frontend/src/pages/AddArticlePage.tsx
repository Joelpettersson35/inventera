import { useSearchParams, Link } from "react-router";
import CreateArticleForm from "../components/CreateArticleForm";

export default function AddArticlePage() {
  const [searchParams] = useSearchParams();
  const boxId = searchParams.get("boxId");
  return (
    <div className=" flex flex-wrap w-full px-4 py-6">
      <Link
        to={`/box/${boxId}`}
        className="text-lg font-semibold text-[#001C89] hover:underline"
      >
        <span className="text-2xl">←</span> Tillbaka
      </Link>
      <CreateArticleForm boxId={boxId} />
    </div>
  );
}

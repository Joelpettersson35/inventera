import { useSearchParams } from "react-router";
import CreateArticleForm from "../components/CreateArticleForm";

export default function AddArticlePage() {
  const [searchParams] = useSearchParams();
  const boxId = searchParams.get("boxId");
  return (
    <div className="w-full">
      <CreateArticleForm boxId={boxId} />
    </div>
  );
}

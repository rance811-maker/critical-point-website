import HomePage from "../../HomePage";
import { StructuredData } from "../../seo";

export default function Page() {
  return (
    <>
      <StructuredData lang="zh-Hans" />
      <HomePage lang="zh-Hans" />
    </>
  );
}

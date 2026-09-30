import HomePage from "../HomePage";
import { StructuredData } from "../seo";

export default function Page() {
  return (
    <>
      <StructuredData lang="en" />
      <HomePage lang="en" />
    </>
  );
}

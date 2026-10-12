import ServicesPage from "../../../ServicesPage";
import { buildServicesMetadata } from "../../../servicesSeo";

export const metadata = buildServicesMetadata("zh-Hant");

export default function Page() {
  return <ServicesPage lang="zh-Hant" />;
}

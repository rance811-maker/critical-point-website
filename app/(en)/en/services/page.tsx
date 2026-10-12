import ServicesPage from "../../../ServicesPage";
import { buildServicesMetadata } from "../../../servicesSeo";

export const metadata = buildServicesMetadata("en");

export default function Page() {
  return <ServicesPage lang="en" />;
}

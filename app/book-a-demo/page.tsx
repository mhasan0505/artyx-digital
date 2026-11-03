import { permanentRedirect } from "next/navigation";

export default function BookADemoLegacyRedirectPage() {
  permanentRedirect("/request-demo/");
}


import dynamic from "next/dynamic";

const App = dynamic(() => import("@/components/wrappers/AppShell"), {
  ssr: false,
});

export default function Page() {
  return <App />;
}

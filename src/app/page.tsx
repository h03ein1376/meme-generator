import { Mobilebar } from "@/components/mobilebar/mobilebar";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { PageProps } from "../../.next/types/app/page";
import { Editor } from "@/components/editor/editor";

export default async function Home({ searchParams }: PageProps) {
  const { section } = await searchParams;

  return (
    <main className="flex flex-col min-h-full overflow-hidden">
      <Header />
      <section className="flex flex-1 w-full z-20 sm:pr-4 sm:pl-4 lg:pl-0 sm:gap-4">
        <Sidebar section={section} />
        <Editor />
      </section>
      <Mobilebar section={section} />
    </main>
  );
}

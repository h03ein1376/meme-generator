import { Mobilebar } from "@/components/mobilebar/mobilebar";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { PageProps } from "../../.next/types/app/page";
import { Editor } from "@/components/editor/editor";
import { TemplateProvider } from "@/contaxts/template-provider";

export default async function Home({ searchParams }: PageProps) {
  const { section } = await searchParams;

  return (
    <main className="flex flex-col min-h-full overflow-hidden">
      <Header />
      <TemplateProvider>
        <section className="flex flex-1 w-full z-20 pr-4 gap-4">
          <Sidebar section={section} />
          <Editor />
        </section>
        <Mobilebar section={section} />
      </TemplateProvider>
    </main>
  );
}

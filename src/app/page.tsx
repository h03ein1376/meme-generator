import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar/sidebar";
type HomeProps = {
  searchParams: { section?: string };
};
export default async function Home({ searchParams }: HomeProps) {
  const { section } = await searchParams;

  return (
    <main className="flex flex-col min-h-full overflow-hidden">
      <Header />
      <section className="flex flex-1 w-full z-20">
        <Sidebar section={section} />
        <div className="flex-1 flex flex-col px-6 pb-5">
          <menu className="min-h-14 bg-base-200 dark:bg-base-300 rounded-b-lg"></menu>
        </div>
      </section>
    </main>
  );
}

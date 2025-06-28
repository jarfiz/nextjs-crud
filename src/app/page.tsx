import Card from "@/components/card";

export default async function Home() {
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold mt-40">All Notes</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 mt-10">
        <Card />
      </div>
    </div>
  );
}

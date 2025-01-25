import SearchInput from "@/components/SearchInput";


export default function Home() {
  console.log(process.env.API_KEY)
  return (
    <div className="flex align-middle justify-center items-center h-auto  max-w-prose">
        <SearchInput/>
    </div>
  );
}

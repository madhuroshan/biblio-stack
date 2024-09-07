"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchBooks } from "@/lib/actions/books.actions";
import React, { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import Image from "next/image";

export default function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>(null);

  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (debouncedSearch) {
      const handleSearch = async () => {
        console.log(debouncedSearch);
        const data = await searchBooks(debouncedSearch);
        setData(data);
        console.log(data);
      };
      handleSearch();
    }
  }, [debouncedSearch]);

  return (
    <div>
      <h1>Search for books</h1>
      <p>Enter the name of the book you want to search for</p>
      <form action="" className="flex w-fit">
        <Input
          placeholder="Enter book name"
          value={search}
          onChange={(e) => {
            setSearch(e?.target?.value);
          }}
        />
        <Button type="submit">Search</Button>
      </form>

      <p>Search term : {debouncedSearch}</p>

      <div>
        {data?.items?.map((book: any) => (
          <div key={book.id}>
            <Image
              src={book?.volumeInfo?.imageLinks?.thumbnail}
              alt={book.title}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

"use server";

export const searchBooks = async (name: string) => {
  try {
    let books = {};
    const searchTerm = name.replace(" ", "+");
    // Call the API to search for books
    books = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.API_KEY}`
    ).then((res) => res.json());

    return books;
  } catch (error) {
    console.log(error);
  }
};

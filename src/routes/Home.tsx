import { Input, Button, List } from "antd";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../redux/book.api";

const Home = () => {
  const navigate = useNavigate();
  const { data: books } = useGetBooksQuery();
  const [bookId, setBookId] = useState("");

  const handleSearch = () => {
    if (bookId) navigate(`/book/${bookId}`);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">
        Search Project Gutenberg Books
      </h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="w-64"
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {books && (
        <List
          header={<b>Recent Searches</b>}
          bordered
          dataSource={books.response}
          renderItem={(item) => (
            <List.Item
              onClick={() => navigate(`/book/${item.id}`)}
              className="cursor-pointer hover:bg-gray-100 p-2"
            >
              {item.id} - {item.title}
            </List.Item>
          )}
          className="w-80"
        />
      )}
    </div>
  );
};

export default Home;

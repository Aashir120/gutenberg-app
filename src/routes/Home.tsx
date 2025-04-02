import { Input, Button, List, Card, Spin } from "antd";
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
    <div className="flex flex-col items-center p-10 bg-gradient-to-r from-blue-100 via-indigo-200 to-blue-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Search Project Gutenberg Books
      </h1>
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="w-80 rounded-lg shadow-lg transition duration-300 ease-in-out focus:ring-4 focus:ring-indigo-500"
        />
        <Button
          type="primary"
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Search
        </Button>
      </div>
      {books ? (
        <List
          header={
            <h2 className="text-lg font-semibold text-gray-700">
              Recent Searches
            </h2>
          }
          bordered
          dataSource={books.response}
          renderItem={(item) => (
            <List.Item
              onClick={() => navigate(`/book/${item.id}`)}
              className="cursor-pointer hover:bg-indigo-100 transition-all duration-300 ease-in-out p-3 rounded-lg shadow-sm"
            >
              <Card className="w-full p-4 hover:shadow-lg transition-all duration-300 ease-in-out">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-800">
                    Book ID: {item.book_id}
                  </span>
                  <span className="text-sm text-gray-500">{`ID: ${item.id}`}</span>
                </div>
              </Card>
            </List.Item>
          )}
          className="w-full max-w-3xl"
        />
      ) : (
        <div className="pt-32">
          <Spin size="large" tip="data is loading, please wait..." />
        </div>
      )}
    </div>
  );
};

export default Home;

import { Button, Tabs, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  useGetAnalyzeMutation,
  useLazyGetBookDetailQuery,
} from "../redux/book.api";
import { useNavigate } from "react-router-dom";

const BookDetails = ({ bookId }: { bookId: number }) => {
  const [fetchBook, { data: book }] = useLazyGetBookDetailQuery();

  const [analyzeBook, { data: summary, isLoading }] = useGetAnalyzeMutation();
  const navigate = useNavigate();
  const [showAnalyze, setShowAnalyze] = useState(true);

  useEffect(() => {
    if (bookId) fetchBook({ book_id: bookId });
  }, [bookId, fetchBook]);

  return (
    <div className="p-6">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Content" key="1">
          <pre className="whitespace-pre-wrap">{book?.response?.content}</pre>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Metadata" key="2">
          <p>Title: {book?.response?.title}</p>
          <p>Author: {book?.response?.author}</p>
          {book?.response?.meta_data}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Analyze" key="3">
          {showAnalyze ? (
            <Button
              type="primary"
              onClick={() => {
                analyzeBook({ book_id: bookId });
                setShowAnalyze(false);
              }}
            >
              Analyze
            </Button>
          ) : (
            <>
              <Spin
                size="large"
                tip="AI is generating questions, please wait..."
                spinning={isLoading}
              >
                {summary?.response}
                <Button
                  type="primary"
                  onClick={() => analyzeBook({ book_id: bookId })}
                  className="mt-2"
                >
                  Reanalyze
                </Button>
              </Spin>
            </>
          )}
        </Tabs.TabPane>
      </Tabs>
      <Button className="mt-4" onClick={() => navigate("/")}>
        Back to Search
      </Button>
    </div>
  );
};

export default BookDetails;

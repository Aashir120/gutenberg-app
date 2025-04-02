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

  // Helper function to render rich content as HTML
  const renderHtmlContent = (htmlContent: string) => (
    <div
      className="whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );

  return (
    <div className="p-6">
      <Tabs defaultActiveKey="1" className="w-full">
        <Tabs.TabPane tab="Content" key="1">
          <div className="overflow-auto max-h-96">
            {/* Rendering the content as HTML */}
            {book?.response?.content ? (
              renderHtmlContent(book.response.content)
            ) : (
              <p>Loading content...</p>
            )}
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Metadata" key="2">
          <div className="space-y-2">
            <p>
              <b>Title:</b> {book?.response?.title}
            </p>
            <p>
              <b>Author:</b> {book?.response?.author}
            </p>
            {/* Render the metadata as HTML */}
            {book?.response?.meta_data ? (
              renderHtmlContent(book.response.meta_data)
            ) : (
              <p>Loading metadata...</p>
            )}
          </div>
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
                tip="AI is analyzing content, please wait..."
                spinning={isLoading}
              >
                <div className="mt-4">{summary?.response}</div>
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

      {/* Back to Search Button */}
      <div className="flex justify-center items-center pt-4">
        <Button type="primary" className="mt-4" onClick={() => navigate("/")}>
          Back to Search
        </Button>
      </div>
    </div>
  );
};

export default BookDetails;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InjectNumberParams from "./util/inject-number-params";
import BookDetails from "./routes/BookDetails";
import Home from "./routes/Home";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/book/:bookId"
        element={
          <InjectNumberParams params={["bookId"]} onFailRedirectTo={"/"}>
            {({ bookId }) => <BookDetails bookId={bookId} />}
          </InjectNumberParams>
        }
      />
    </Routes>
  </Router>
);

export default App;

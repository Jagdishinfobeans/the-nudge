import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./components/game/StartPage";
import GameGrid from "./components/game/GameGrid";
import QuestionView from "./components/question/QuestionView";
import AddQuestion from "./components/question/AddQuestion";
import NotFound from "./components/404/NotFound";
import QuestionList from "./components/question/QuestionList";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GameGrid />} />
        <Route path="/view" element={<QuestionView />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/question-list" element={<QuestionList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

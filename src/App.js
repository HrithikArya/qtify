import './App.css';
import { useState } from "react";
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';
import FeedbackModal from "./components/FeedbackModal/FeedbackModal";

function App() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <div>
      <Navbar onFeedbackClick={() => setIsFeedbackOpen(true)} />
      <Hero />
      <Section
        title="Top Albums"
        api="https://qtify-backend.labs.crio.do/albums/top"
      />

      <Section
        title="New Albums"
        api="https://qtify-backend.labs.crio.do/albums/new"
      />
      <Section
        title="Songs"
        api="https://qtify-backend.labs.crio.do/songs"
        isSongsSection
      />
      <FeedbackModal
        open={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
}

export default App;

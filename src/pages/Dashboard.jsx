import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/layout/Sidebar.jsx';
import TopBar from '../components/layout/TopBar.jsx';
import MobileNav from '../components/layout/MobileNav.jsx';
import { examPapers } from '../data/inputs.js';
import Sem1 from './Sem1.jsx';
import Sem2 from './Sem2.jsx';

export default function Dashboard() {
  const [activePaperId, setActivePaperId] = useState('sem1');
  const paper = useMemo(() => examPapers.find((item) => item.id === activePaperId), [activePaperId]);
  const [activeQuestionId, setActiveQuestionId] = useState(paper.questions[0].questionId);
  const [activePart, setActivePart] = useState(paper.questions[0].parts[0].part);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [explanationOpen, setExplanationOpen] = useState(false);

  useEffect(() => {
    setActiveQuestionId(paper.questions[0].questionId);
    setActivePart(paper.questions[0].parts[0].part);
  }, [paper]);

  const question = paper.questions.find((item) => item.questionId === activeQuestionId) || paper.questions[0];
  const part = question.parts.find((item) => item.part === activePart) || question.parts[0];
  const Page = paper.id === 'sem1' ? Sem1 : Sem2;

  function handleQuestionSelect(questionId) {
    const nextQuestion = paper.questions.find((item) => item.questionId === questionId) || paper.questions[0];
    setActiveQuestionId(nextQuestion.questionId);
    setActivePart(nextQuestion.parts[0].part);
  }

  function handlePaperSelect(paperId) {
    setActivePaperId(paperId);
  }

  return (
    <main className="app-shell">
      <MobileNav
        open={mobileNavOpen}
        papers={examPapers}
        activePaperId={activePaperId}
        activeQuestionId={question.questionId}
        activePart={part.part}
        onClose={() => setMobileNavOpen(false)}
        onSelectPaper={handlePaperSelect}
        onSelectQuestion={handleQuestionSelect}
        onSelectPart={setActivePart}
      />
      <Sidebar
        papers={examPapers}
        activePaperId={activePaperId}
        activeQuestionId={question.questionId}
        activePart={part.part}
        onSelectPaper={handlePaperSelect}
        onSelectQuestion={handleQuestionSelect}
        onSelectPart={setActivePart}
      />
      <section className="main-shell">
        <TopBar
          paper={paper}
          question={question}
          part={part}
          onOpenNav={() => setMobileNavOpen(true)}
          onOpenExplanation={() => setExplanationOpen(true)}
        />
        <div className="hero-strip">
          <div>
            <p className="eyebrow">Structured Exam Question Answer Visualiser</p>
            <h2>{paper.subtitle}</h2>
          </div>
          <div className="hero-metric">
            <strong>{paper.questions.length}</strong>
            <span>exam questions</span>
          </div>
        </div>
        <Page
          question={question}
          part={part}
          onSelectPart={setActivePart}
          explanationOpen={explanationOpen}
          onCloseExplanation={() => setExplanationOpen(false)}
        />
      </section>
    </main>
  );
}

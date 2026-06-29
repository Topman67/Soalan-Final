import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/layout/Sidebar.jsx';
import TopBar from '../components/layout/TopBar.jsx';
import { examPapers } from '../data/inputs.js';
import Sem1 from './Sem1.jsx';
import Sem2 from './Sem2.jsx';

export default function Dashboard() {
  const [activePaperId, setActivePaperId] = useState('sem1');
  const paper = useMemo(() => examPapers.find((item) => item.id === activePaperId), [activePaperId]);
  const [activeQuestionId, setActiveQuestionId] = useState(paper.questions[0].id);

  useEffect(() => {
    setActiveQuestionId(paper.questions[0].id);
  }, [paper]);

  const question = paper.questions.find((item) => item.id === activeQuestionId) || paper.questions[0];
  const Page = paper.id === 'sem1' ? Sem1 : Sem2;

  return (
    <main className="app-shell">
      <Sidebar
        papers={examPapers}
        activePaperId={activePaperId}
        activeQuestionId={question.id}
        onSelectPaper={setActivePaperId}
        onSelectQuestion={setActiveQuestionId}
      />
      <section className="main-shell">
        <TopBar paper={paper} question={question} />
        <div className="hero-strip">
          <div>
            <p className="eyebrow">Premium Algorithm Visualisation & Exam Simulation Platform</p>
            <h2>{paper.subtitle}</h2>
          </div>
          <div className="hero-metric">
            <strong>{paper.questions.length}</strong>
            <span>exam questions</span>
          </div>
        </div>
        <Page question={question} />
      </section>
    </main>
  );
}

import { BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ papers, activePaperId, activeQuestionId, onSelectPaper, onSelectQuestion }) {
  return (
    <aside className="sidebar-shell">
      <div className="brand-lockup">
        <div className="brand-mark"><GraduationCap size={22} /></div>
        <div>
          <p className="eyebrow">Soalan-Final</p>
          <h1>Algorithm Studio</h1>
        </div>
      </div>

      <div className="paper-switcher">
        {papers.map((paper) => (
          <button
            key={paper.id}
            className={activePaperId === paper.id ? 'paper-tab active' : 'paper-tab'}
            onClick={() => onSelectPaper(paper.id)}
          >
            {paper.label}
          </button>
        ))}
      </div>

      <nav className="question-nav">
        {papers.find((paper) => paper.id === activePaperId)?.questions.map((question) => (
          <button
            key={question.id}
            className={activeQuestionId === question.id ? 'question-link active' : 'question-link'}
            onClick={() => onSelectQuestion(question.id)}
          >
            {activeQuestionId === question.id && <motion.span layoutId="activeQuestion" className="active-pill" />}
            <span className="question-code">{question.short}</span>
            <span>{question.title}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <BookOpen size={18} />
        <span>Study mode reveals answers. Exam mode hides them until you are ready.</span>
      </div>
    </aside>
  );
}

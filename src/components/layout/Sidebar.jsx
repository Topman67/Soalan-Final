import { BookOpen, ChevronDown, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ papers, activePaperId, activeQuestionId, activePart, onSelectPaper, onSelectQuestion, onSelectPart }) {
  const activePaper = papers.find((paper) => paper.id === activePaperId);

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
        {activePaper?.questions.map((question) => (
          <div key={question.questionId} className="question-group">
            <button
              className={activeQuestionId === question.questionId ? 'question-link active' : 'question-link'}
              onClick={() => onSelectQuestion(question.questionId)}
            >
              {activeQuestionId === question.questionId && <motion.span layoutId="activeQuestion" className="active-pill" />}
              <span className="question-code">{question.questionId}</span>
              <span>{question.title}</span>
              <ChevronDown size={16} className="question-chevron" />
            </button>
            {activeQuestionId === question.questionId && (
              <div className="part-list">
                {question.parts.map((part) => (
                  <button
                    key={part.part}
                    className={activePart === part.part ? 'part-link active' : 'part-link'}
                    onClick={() => onSelectPart(part.part)}
                  >
                    <span>({part.part})</span>
                    <small>{part.visualizationType}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <BookOpen size={18} />
        <span>Study mode reveals answers. Exam mode hides them until you are ready.</span>
      </div>
    </aside>
  );
}

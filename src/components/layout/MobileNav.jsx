import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function MobileNav({
  open,
  papers,
  activePaperId,
  activeQuestionId,
  activePart,
  onClose,
  onSelectPaper,
  onSelectQuestion,
  onSelectPart,
}) {
  const activePaper = papers.find((paper) => paper.id === activePaperId);

  function chooseQuestion(questionId) {
    onSelectQuestion(questionId);
  }

  function choosePart(part) {
    onSelectPart(part);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            className="mobile-scrim"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="mobile-nav-drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            <div className="mobile-drawer-head">
              <div>
                <p className="eyebrow">Navigation</p>
                <h2>Questions</h2>
              </div>
              <button className="icon-button" onClick={onClose} aria-label="Close menu">
                <X size={18} />
              </button>
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

            <div className="mobile-question-list">
              {activePaper?.questions.map((question) => (
                <section key={question.questionId} className="mobile-question-card">
                  <button
                    className={activeQuestionId === question.questionId ? 'mobile-question-title active' : 'mobile-question-title'}
                    onClick={() => chooseQuestion(question.questionId)}
                  >
                    <strong>{question.questionId}</strong>
                    <span>{question.title}</span>
                  </button>
                  <div className="mobile-part-row">
                    {question.parts.map((part) => (
                      <button
                        key={part.part}
                        className={activeQuestionId === question.questionId && activePart === part.part ? 'active' : ''}
                        onClick={() => {
                          chooseQuestion(question.questionId);
                          choosePart(part.part);
                        }}
                      >
                        ({part.part})
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

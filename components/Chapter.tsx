import styles from '../styles/Main.module.css'
import { Card } from '../components/Card'
import { Header } from '../components/Header'
import { useEffect, useState } from 'react';
import type { Chapter as _Chapter } from '../types';
import { Button } from './Button';

interface ChapterProps {
  courseId: string;
  chapterIdx: number;
  title: string;
  onBack: () => void;
}


export const Chapter = ({
  courseId,
  title,
  onBack,
  chapterIdx,
}: ChapterProps) => {
  const [chapter, updateChapter] = useState<_Chapter>();
  const [questionCount, setQuestionCount] = useState(1);
  const [questionIdx, updateQuestionIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    import(`../courses/${courseId}.json`)
      .then((c) => {
        const chapter = c.default[chapterIdx];
        updateChapter(c.default[chapterIdx]);
        setQuestionCount(chapter.questions.length);
      });
  }, [courseId, chapterIdx]);

  const changeQuestionHandler = (offset: number) => {
    let newQuestionIdx = questionIdx + offset;
    if (newQuestionIdx < 0) {
      newQuestionIdx = 0;
    }
    if (newQuestionIdx >= questionCount) {
      newQuestionIdx = questionCount - 1;
    }
    updateQuestionIdx(newQuestionIdx);
    setShowAnswer(false);
  }

  return (
    <>
      <Header
        title={title}
        subtitle={chapter?.name ?? '...'}
        onBack={onBack}
        progress={(questionIdx + 1) / questionCount}
      />
      {!chapter ? (
        <p>Chargement...</p>
      ) : (
        <>
          <div className={[styles.row, styles.spaceBetween, styles.alignCenter].join(' ')}>
            <Button
              onClick={() => changeQuestionHandler(-1)}
              variant="light"
              disabled={questionIdx === 0}>
              {"⟵ Précédent"}
            </Button>
            <div className={[styles.row, styles.alignEnd].join(' ')}>
              <h1>{questionIdx + 1}</h1>
              <div className={styles.spacer__sm} />
              <h3>{`/${chapter?.questions.length ?? 1}`}</h3>
            </div>
            <Button
              onClick={() => changeQuestionHandler(1)}
              variant="light"
              disabled={questionIdx === questionCount - 1}>
              {"Suivant ⟶"}
            </Button>
          </div>
          <Card>
            <div className={styles.question}>
              <div className={styles.questionSection}>
                <h2>Question</h2>
                <p>{chapter.questions[questionIdx].question}</p>
              </div>
              <div className={styles.questionSection}>
                <h2>Réponse</h2>
                  <div className={!showAnswer ? styles.hiddenAnswer : ''}>
                    <p>{chapter.questions[questionIdx].answer}</p>
                  </div>
                  {showAnswer ? null : (
                    <div className={styles.answerButton}>
                      <Button onClick={() => setShowAnswer(true)} variant="dark">
                        {"Afficher la réponse"}
                      </Button>
                    </div>
                  )}
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  )
}

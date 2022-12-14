import styles from '../styles/Main.module.css'
import { Card } from '../components/Card'
import { Header } from '../components/Header'
import { useEffect, useState } from 'react';
import { Chapter } from '../types';

interface CourseProps {
  courseId: string;
  title: string;
  onBack: () => void;
  onChapterChange: (idx: number | null) => void;
}


export const Course = ({
  courseId,
  title,
  onBack,
  onChapterChange,
}: CourseProps) => {
  const [chapters, updateChapters] = useState<Chapter[]>();
  useEffect(() => {
    import(`../courses/${courseId}.json`)
      .then((c) => {
        setTimeout(() => {
          updateChapters(c.default)
        }, 300);
      });
  }, [courseId]);
  return (
    <>
      <Header
        title={title}
        subtitle={chapters?.length !== undefined ? `${chapters.length} chapitres` : '...'}
        onBack={onBack}
      />
      {!chapters ? (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner} />
        </div>
      ) : (
        <div className={styles.cards}>
          {chapters.map((chapter, idx) => (
            <Card
              key={chapter.name}
              onClick={() => onChapterChange(idx)}
              title={chapter.name}
              subtitle={`${chapter.questions.length} questions`}
            />
          ))}
        </div>
      )}
    </>
  )
}

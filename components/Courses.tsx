import styles from '../styles/Main.module.css'
import { Card } from '../components/Card'
import { Header } from '../components/Header'
import courses from '../courses/index.json';

interface CoursesProps {
  onCourseChange: (courseId: string | null) => void;
}

export const Courses = ({onCourseChange}: CoursesProps) => {
  return (
    <>
      <Header
        title="Cours disponibles"
        subtitle="Université Laval"
      />
      <div className={styles.cards}>
        {courses.map((course) => {
          return (
            <Card
              onClick={() => onCourseChange(course.id)}
              title={course.name}
              subtitle={course.id.toUpperCase()}
              subsubtitle={`${course.chapters_count} chapitres`}
            />
          )
        })}
      </div>
    </>
  )
}

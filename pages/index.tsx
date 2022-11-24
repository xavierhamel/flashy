import Head from 'next/head'
import Image from 'next/image'
import { Courses } from '../components/Courses'
import { Course } from '../components/Course';
import styles from '../styles/Main.module.css'
import { useEffect, useState } from 'react';
import { Chapter } from '../components/Chapter';
import courses from '../courses/index.json';

export default function Home() {
  const [courseId, updateCourseId] = useState<string | null>(null);
  const [courseName, updateCourseName] = useState<string | null>(null);
  const [chapterIdx, updateChapterIdx] = useState<number | null>(null)

  useEffect(() => {
    updateCourseName(courses.filter(c => c.id === courseId)[0]?.name ?? '');
  }, [courseId]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Flashy</title>
        <meta name="description" content="Flashy par Xavier Hamel" />
        <meta property="og:title" content="Flashy" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Étudier efficacement à l'aide de flash cards" />
        <meta property="og:image" content="https://flashy.xavierhamel.ca/card.png" />
        <meta property="og:url" content="https://flashy.xavierhamel.ca" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" type="image/png" href="./favicon.png" />
      </Head>

      <main className={styles.container}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="logo" width={84} height={28} />
        </div>
        {courseId === null && (
          <Courses
            onCourseChange={updateCourseId}
          />
        )}
        {courseId !== null && chapterIdx === null && (
          <Course
            courseId={courseId}
            title={courseName ?? ''}
            onBack={() => updateCourseId(null)}
            onChapterChange={updateChapterIdx}
          />
        )}
        {courseId !== null && chapterIdx !== null && (
          <Chapter
            courseId={courseId}
            title={courseName ?? ''}
            chapterIdx={chapterIdx}
            onBack={() => updateChapterIdx(null)}
          />
        )}
        <div className={styles.footer}>
          <h3>Flashy par Xavier Hamel</h3>
        </div>
      </main>
    </div>
  )
}

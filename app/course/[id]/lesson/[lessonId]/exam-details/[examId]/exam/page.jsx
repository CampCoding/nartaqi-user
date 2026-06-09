import Content from './_Content';

export function generateStaticParams() {
  return [{ id: '1', lessonId: '1', examId: '1' }];
}

export default function Page() {
  return <Content />;
}

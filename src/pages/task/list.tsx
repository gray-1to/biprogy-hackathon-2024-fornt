import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Task } from '../api/todo/list';

// export const getServerSideProps = (async () => {
export const getStaticProps = async () => {
  // TODO: set backend url
    // const API_URL = 'http://localhost:3000/api/todo/list';
  const API_URL = 'http://127.0.0.1:3001/todo/get';
  const res = await fetch(API_URL);
  const repo = await res.json();
  console.log(repo);

  return { props: { repo } };
};

type HomeProps = {
  repo: Task[] | any;
};

export default function Home({ repo }: HomeProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>作業者</th>
          <th>作業内容</th>
          <th>想定時間</th>
        </tr>
      </thead>
      <tbody>
        {/* {Array.isArray(repo) &&
          repo.map((task: Task) => { */}
        {repo.records.map((task: Task) => {
            return (
              <tr>
                <th>{task.worker.value}</th>
                <th>{task.task.value}</th>
                <th>{task.time.value}</th>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

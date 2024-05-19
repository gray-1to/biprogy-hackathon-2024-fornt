import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Task } from '../api/todo/list';

const API_BASE_URL = 'http://127.0.0.1:3001';

export const getStaticProps = async () => {
  // TODO: set backend url
  // const API_URL = 'http://localhost:3000/api/todo/list';
  const API_URL = API_BASE_URL + '/todo/get';
  const res = await fetch(API_URL);
  const task_list = await res.json();

  return { props: { task_list: task_list } };
};

type HomeProps = {
  task_list: Task[];
};

export default function Home({ task_list }: HomeProps) {
  const isMine = true;

  const handleFinish = async (id: number) => {
    try {
      // TODO: confirm endpoint & method
      const response = await fetch(API_BASE_URL + '/todo/put/finish', {
        method: 'PUT',
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('お疲れ様でした');
    } catch (error) {
      console.error('Error:', error);
      toast.error('エラーが発生しました');
    }
  };

  const handleStart = async (id: number) => {
    try {
      // TODO: confirm endpoint & method
      const response = await fetch(API_BASE_URL + '/todo/put/start', {
        method: 'PUT',
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('タスクが開始されました');
    } catch (error) {
      console.error('Error:', error);
      toast.error('エラーが発生しました');
    }
  };

  const handleFeedback = () => {
    // TODO: confirm endpoint & method
    // toast.success("フィードバックを送りました");
  };

  return (
    <>
      <Head>
        <title>TODO一覧ページ</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <h1 className="text-3xl font-bold text-center mb-8">TODO一覧ページ</h1>
          <div className="flex justify-end mb-4">
            <Link
              href="/task/new"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              新規作成
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-4 text-gray-500 font-bold uppercase border-b border-gray-200">
                    作業者
                  </th>
                  <th className="py-2 px-4 text-gray-500 font-bold uppercase border-b border-gray-200">
                    作業内容
                  </th>
                  <th className="py-2 px-4 text-gray-500 font-bold uppercase border-b border-gray-200">
                    想定時間
                  </th>
                  <th className="py-2 px-4 text-gray-500 font-bold uppercase border-b border-gray-200">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(task_list) &&
                  task_list.map((task: Task, index: number) => {
                    const metter = task.trouble_level * 4;
                    const started = metter !== 0;
                    const progressBarColor = task.trouble_level > 5 ? 'bg-red-500' : 'bg-blue-500';

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 px-6 border-b border-gray-200 text-center">
                          {task.worker}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 text-center">
                          {task.task}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 text-center">
                          {task.time}
                          <div className="m-auto w-40 bg-gray-200 mt-2">
                            <div className="hidden w-4 w-8 w-12 w-16 w-20 w-24 w-28 w-32 w-36 w-40">
                              hidden
                            </div>
                            <div className={` h-2 ${progressBarColor} w-${metter}`}></div>
                          </div>
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 flex justify-center">
                          {isMine &&
                            (started ? (
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                onClick={() => handleFinish(task.$id)}
                              >
                                終了
                              </button>
                            ) : (
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                onClick={() => handleStart(task.$id)}
                              >
                                開始
                              </button>
                            ))}

                          {!isMine && (
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                              onClick={() => handleFeedback()}
                            >
                              フィードバック
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

import { Task } from '@/pages/api/todo/list';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:3001';

export const getServerSideProps = async () => {
  // const API_URL = 'http://localhost:3000/api/todo/list';
  const API_URL = API_BASE_URL + '/todo/get';
  const res = await fetch(API_URL);
  const taskList = await res.json();

  return { props: { taskList: taskList || [] } };
};

type HomeProps = {
  taskList: Task[];
};

export default function Home({ taskList: taskListProp }: HomeProps) {
  const [taskList, setTaskList] = useState<Task[]>(taskListProp);
  const isMine = true;

  const updateTask = (id: number) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) => (task.id === id ? { ...task, trouble_level: 1 } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTaskList((prevTaskList) => prevTaskList.filter((task) => task.id !== id));
  };

  const handleStart = async (id: number) => {
    try {
      const response = await fetch(API_BASE_URL + `/todo/put/start?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      updateTask(id);
      toast.success('タスクが開始されました');
    } catch (error) {
      console.error('Error:', error);
      toast.error('エラーが発生しました');
    }
  };

  const handleFinish = async (id: number) => {
    try {
      const response = await fetch(API_BASE_URL + `/todo/put/end?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      deleteTask(id);
      toast.success('お疲れ様でした');
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
            <Link
              href="/notification"
              className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              通知LINE bot
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
                {Array.isArray(taskList) &&
                  taskList.map((task: Task, index: number) => {
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
                            <div className="hidden w-0 w-4 w-8 w-12 w-16 w-20 w-24 w-28 w-32 w-36 w-40">
                              hidden
                            </div>
                            <div className={` h-2 ${progressBarColor} w-${metter}`}></div>
                          </div>
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 flex justify-center">
                          {isMine &&
                            (started ? (
                              <>
                                <button
                                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mx-1"
                                  onClick={() => handleFinish(task.id)}
                                >
                                  終了
                                </button>
                                <Link
                                  href={'/qa_archive/new'}
                                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded  mx-1"
                                >
                                  フィードバック
                                </Link>
                              </>
                            ) : (
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                onClick={() => handleStart(task.id)}
                              >
                                開始
                              </button>
                            ))}
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

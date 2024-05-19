import Head from 'next/head';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';

const API_BASE_URL = 'http://127.0.0.1:3001';

type TodoCreateParams = {
  worker: string;
  task: string;
  time: number;
};

const TodoNewPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoCreateParams>();
  const [taskInput, setTaskInput] = useState("")
  const [timeInput, setTimeInput] = useState(15)

  const onSubmit: SubmitHandler<TodoCreateParams> = async (data) => {
    try {
      const send_data = { ...data, startTime: '-1' };
      const response = await fetch(API_BASE_URL + '/todo/post', {
        method: 'POST',
        body: JSON.stringify(send_data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setTaskInput("");
      setTimeInput(15);
      toast.success('タスクを作成しました');
    } catch (error) {
      console.error('Error:', error);
      toast.error('エラーが発生しました');
    }
  };

  return (
    <>
      <Head>
        <title>TODO作成ページ</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">TODO作成ページ</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="worker" className="block font-semibold text-base mb-2">
                担当者
              </label>
              <input
                id="worker"
                {...register('worker', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.worker && (
                <span className="text-red-500 text-sm">{errors.worker.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="task" className="block font-semibold text-base mb-2">
                やること
              </label>
              <textarea
                id="task"
                {...register('task', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
              {errors.task && <span className="text-red-500 text-sm">{errors.task.message}</span>}
            </div>
            <div>
              <label htmlFor="time" className="block font-semibold text-base mb-2">
                所要時間
              </label>
              <input
                id="time"
                type="number"
                {...register('time', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
              />
              {errors.time && <span className="text-red-500 text-sm">{errors.time.message}</span>}
            </div>
            <button
              type="submit"
              className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
            >
              送信
            </button>
            <Link
              href="/task/list"
              className="block w-full bg-white text-blue-500 border border-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center"
            >
              タスク一覧へ
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default TodoNewPage;

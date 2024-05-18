import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import FlashMessage from '@/hock/FlashMessage';

type TodoCreateParams = {
  worker: string;
  task: string;
  time: number;
};

const TodoNewPage = () => {
  const [flashMessage, setFlashMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoCreateParams>();

  const onSubmit: SubmitHandler<TodoCreateParams> = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/todo/post', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      setFlashMessage({ message: '編集内容の保存に成功しました', type: 'success' });
    } catch (error) {
      console.error('Error:', error);
      setFlashMessage({ message: '保存中にエラーが発生しました', type: 'error' });
    }
  };

  return (
    <>
      <Head>
        <title>TODO作成ページ</title>
      </Head>

      {flashMessage && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          onClose={() => setFlashMessage(null)}
        />
      )}
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
              />
              {errors.time && <span className="text-red-500 text-sm">{errors.time.message}</span>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              送信
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TodoNewPage;

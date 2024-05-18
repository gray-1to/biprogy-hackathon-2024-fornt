import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import FlashMessage from '@/hock/FlashMessage';

type QAArchiveCreateParams = {
  questionier: string,
  answerer: string,
  question: string,
  evaluation: number
};

const QAArchiveNewPage = () => {
  const [flashMessage, setFlashMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QAArchiveCreateParams>();

  const onSubmit: SubmitHandler<QAArchiveCreateParams> = async (data) => {
    try {
      console.log(JSON.stringify(data))
      const response = await fetch('http://127.0.0.1:3001/qa_archive/post', {
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
        <title>QAアーカイブ作成ページ</title>
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
              <label htmlFor="questionier" className="block font-semibold text-base mb-2">
                質問者名
              </label>
              <input
                id="questionier"
                {...register('questionier', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.questionier && (
                <span className="text-red-500 text-sm">{errors.questionier.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="answerer" className="block font-semibold text-base mb-2">
                回答者名
              </label>
              <input
                id="answerer"
                {...register('answerer', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.answerer && (
                <span className="text-red-500 text-sm">{errors.answerer.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="question" className="block font-semibold text-base mb-2">
                質問内容
              </label>
              <textarea
                id="question"
                {...register('question', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.question && <span className="text-red-500 text-sm">{errors.question.message}</span>}
            </div>
            <div>
              <label htmlFor="evaluation" className="block font-semibold text-base mb-2">
                質問評価(5段階評価　最良5)
              </label>
              <input
                id="evaluation"
                type="number"
                {...register('evaluation', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.evaluation && <span className="text-red-500 text-sm">{errors.evaluation.message}</span>}
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

export default QAArchiveNewPage;

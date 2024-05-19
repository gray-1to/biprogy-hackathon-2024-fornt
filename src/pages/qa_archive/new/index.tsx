import Head from 'next/head';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://127.0.0.1:3001';

type QAArchiveCreateParams = {
  questioner: string;
  respondent: string;
  question: string;
  answer: string;
  evaluation: number;
  comment: string;
};

const QAArchiveNewPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QAArchiveCreateParams>();

const onSubmit: SubmitHandler<QAArchiveCreateParams> = async (data) => {
    try {
      // const send_data = { ...data, startTime: '-1' };
      const response = await fetch(API_BASE_URL + '/qa/post', {
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
      toast.success('タスクを作成しました');
    } catch (error) {
      console.error('Error:', error);
      toast.error('エラーが発生しました');
    }
  };

  return (
    <>
      <Head>
        <title>QAアーカイブ作成ページ</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">QAアーカイブ作成ページ</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="questioner" className="block font-semibold text-base mb-2">
                質問者
              </label>
              <input
                id="questioner"
                {...register('questioner', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.questioner && (
                <span className="text-red-500 text-sm">{errors.questioner.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="respondent" className="block font-semibold text-base mb-2">
                回答者
              </label>
              <input
                id="respondent"
                {...register('respondent', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.respondent && (
                <span className="text-red-500 text-sm">{errors.respondent.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="question" className="block font-semibold text-base mb-2">
                質問
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
              <label htmlFor="answer" className="block font-semibold text-base mb-2">
                回答
              </label>
              <textarea
                id="answer"
                {...register('answer', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.answer && <span className="text-red-500 text-sm">{errors.answer.message}</span>}
            </div>
            <div>
              <label htmlFor="evaluation" className="block font-semibold text-base mb-2">
                質問の評価
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
            <div>
              <label htmlFor="comment" className="block font-semibold text-base mb-2">
                コメント
              </label>
              <textarea
                id="comment"
                {...register('comment', {
                  required: '入力してください',
                })}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.comment && <span className="text-red-500 text-sm">{errors.comment.message}</span>}
            </div>
            <button
              type="submit"
              className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
            >
              送信
            </button>
            <Link
              href="/qa_archive/list"
              className="block w-full bg-white text-blue-500 border border-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center"
            >
              QAアーカイブ一覧へ
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default QAArchiveNewPage;

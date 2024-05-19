import { QAArchive } from '@/pages/api/qa_archive/get';
import Head from 'next/head';
import Link from 'next/link';

const API_BASE_URL = 'http://localhost:3001';

export const getServerSideProps = async () => {
  // const API_URL = 'http://localhost:3000/api/qa_archive/get';
  const API_URL = API_BASE_URL + '/qa/get';
  const res = await fetch(API_URL);
  const repo = await res.json();

  return { props: { qAArchiveList: repo.records || [] } };
};

type QAArchiveListProps = {
  qAArchiveList: QAArchive[];
};

export default function QAArchiveList({ qAArchiveList }: QAArchiveListProps) {
  return (
    <>
      <Head>
        <title>QAアーカイブ一覧ページ</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <h1 className="text-3xl font-bold text-center mb-8">QAアーカイブ一覧ページ</h1>
          <div className="flex justify-end mb-4">
            <Link
              href="/qa_archive/new"
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
                    質問者
                  </th>
                  <th className="py-2 px-4 text-gray-500 font-bold uppercase border-b border-gray-200">
                    回答者
                  </th>
                  <th className="py-2 px-4 text-gray-500 font-bold uppercase border-b border-gray-200">
                    質問
                  </th>
                  <th className="py-2 px-4 text-gray-500 font-bold uppercase border-b border-gray-200">
                    回答
                  </th>
                  <th className="py-2 px-4 text-gray-500 font-bold uppercase border-b border-gray-200">
                    コメント
                  </th>
                  <th className="py-2 px-4 text-gray-500 font-bold uppercase border-b border-gray-200">
                    質問評価
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {qAArchiveList.map((qAArchive: QAArchive, index: number) => {
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 px-6 border-b border-gray-200 text-center">
                        {qAArchive.questioner.value}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200 text-center">
                        {qAArchive.respondent.value}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200 text-center">
                        {qAArchive.question.value}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200 text-center">
                        {qAArchive.answer.value}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200 text-center">
                        {qAArchive.comment.value}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200 text-center">
                        {qAArchive.evaluation.value}
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

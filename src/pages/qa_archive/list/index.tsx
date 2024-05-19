import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const getServerSideProps = (async () => {
    // TODO: set backend url
    // const API_URL = 'http://localhost:3000/api/qa_archive/get'
    const API_URL = 'http://localhost:3001/qa/get'
    const res = await fetch(API_URL)
    const repo = await res.json()
    console.log(repo)
    
    return { props: { repo } }
  })


export default function Home({repo}) {
    
    return (
        // <>
        //     <Head>
        //         <title>QAアーカイブページ</title>
        //     </Head>

        //     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        //         <div className="py-12">
        //         <h1 className="text-3xl font-bold text-center mb-8">QAアーカイブページ</h1>
        //         <div className="flex justify-end mb-4">
        //             <Link
        //             href="/qa_archive/new"
        //             className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        //             >
        //             新規作成
        //             </Link>
        // </>
        <table>
            <thead>
                <tr>
                    <th>質問者</th>
                    <th>回答者</th>
                    <th>質問</th>
                    <th>回答</th>
                    <th>コメント</th>
                    <th>質問評価</th>
                </tr>
            </thead>
            <tbody>
                {repo.records.map((data) => {
                    return (
                        <tr>
                            <th>{data.questioner.value}</th>
                            <th>{data.respondent.value}</th>
                            <th>{data.question.value}</th>
                            <th>{data.answer.value}</th>
                            <th>{data.comment.value}</th>
                            <th>{data.evaluation.value}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}
  
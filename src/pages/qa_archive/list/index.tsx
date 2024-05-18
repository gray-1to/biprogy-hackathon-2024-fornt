import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const getServerSideProps = (async () => {
    // TODO: set backend url
    const API_URL = 'http://localhost:3000/api/qa_archive/get'
    // const API_URL = 'http://127.0.0.1:3001/todo/get'
    const res = await fetch(API_URL)
    const repo = await res.json()
    console.log(repo)
    
    return { props: { repo } }
  })


export default function Home({repo}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>質問者</th>
                    <th>回答者</th>
                    <th>質問内容</th>
                    <th>質問評価</th>
                </tr>
            </thead>
            <tbody>
                {repo.records.map((data) => {
                    return (
                        <tr>
                            <th>{data.questionier.value}</th>
                            <th>{data.answerer.value}</th>
                            <th>{data.question.value}</th>
                            <th>{data.evaluation.value}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}
  
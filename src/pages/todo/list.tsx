import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

// export const getServerSideProps = (async () => {
export const getStaticProps = (async () => {
    // TODO: set backend url
    // const API_URL = 'http://localhost:3000/api/todo/list'
    const API_URL = 'http://127.0.0.1:3001/todo/get'
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
                    <th>作業者</th>
                    <th>作業内容</th>
                    <th>想定時間</th>
                </tr>
            </thead>
            <tbody>
                    {/* {repo.map((data) => {
                        return (
                            <tr>
                                <th>{data.worker}</th>
                                <th>{data.task}</th>
                                <th>{data.time}</th>
                            </tr>
                        )
                    })} */}
                    {repo.records.map((data) => {
                        return (
                            <tr>
                                <th>{data.worker.value}</th>
                                <th>{data.task.value}</th>
                                <th>{data.time.value}</th>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    );
}
  
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const getStaticProps = (async () => {
    // Fetch data from external API
    const res = await fetch('http://localhost:3000/api/todo/list')
    const repo = await res.json()
    console.log(repo)
    // Pass data to the page via props
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
                    {repo.map((data) => {
                        return (
                            <tr>
                                <th>{data.worker}</th>
                                <th>{data.task}</th>
                                <th>{data.time}</th>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    );
}
  
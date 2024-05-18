import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';

type TodoCreateParams = {
  worker: string;
  task: string;
  time: number;
};

const TodoNewPage = () => {
  const { register, handleSubmit } = useForm<TodoCreateParams>();

  const onSubmit: SubmitHandler<TodoCreateParams> = (data) => {
    console.log(data);
    fetch('http://localhost:3001//todo/post', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));

    console.log('OK');
  };

  return (
    <>
      <Head>
        <title>TODO作成ページ</title>
      </Head>
      <div>
        <h2>TODO作成ページ</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="content" className="font-semibold text-base mb-2">
              担当者
            </label>
            <input id="worker" {...register('worker')} className="border" />
          </div>
          <div>
            <label htmlFor="content" className="font-semibold text-base mb-2">
              やること
            </label>
            <textarea id="task" {...register('task')} className="border" />
          </div>
          <div>
            <label htmlFor="content" className="font-semibold text-base mb-2">
              所要時間
            </label>
            <input id="time" {...register('time')} className="border" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default TodoNewPage;

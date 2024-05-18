import Head from 'next/head';

const AboutPage = () => {
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="LAWBO X-Legal協会・00AI社共同開発 AIを活用した弁護士コミュニティサイト"
        />
        <meta
          property="og:description"
          content='AIを活用した弁護士コミュニティサイト 弁護士で作り上げる"弁護士の、弁護士による、弁護士のための"コミュニティ。'
        />
        {/* <meta name="robots" content="noindex,follow" /> */}
        <title>LAWBO X-Legal協会・00AI社共同開発 AIを活用した弁護士コミュニティサイト</title>
        <meta
          name="description"
          content='AIを活用した弁護士コミュニティサイト 弁護士で作り上げる"弁護士の、弁護士による、弁護士のための"コミュニティ。'
        />
      </Head>
      <p>Avout</p>
    </>
  );
};

export default AboutPage;

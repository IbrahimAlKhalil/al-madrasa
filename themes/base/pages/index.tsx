import type { GetStaticProps, NextPage } from 'next';

const Home: NextPage = () => {
  return <div>Hey There!</div>;
};

export const getServerSideProps: GetStaticProps = async () => {
  return { props: {} };
};

export default Home;

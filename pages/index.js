import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    Hi, I am Anik. I am a software developer. I have work with{" "}
                    <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
                        Node
                    </a>
                    ,{" "}
                    <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        React
                    </a>
                    ,
                    <a href="https://mongodb.com" target="_blank" rel="noopener noreferrer">
                        MongoDB
                    </a>
                    ,{" "}
                    <a href="https://redux.js.org" target="_blank" rel="noopener noreferrer">
                        Redux
                    </a>
                    .
                </p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{" "}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData?.map(({ id, title, date }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return { props: { allPostsData } };
}

// export async function getServerSideProps(context) {
//     console.log({ ...context });
//     return { props: {} };
// }

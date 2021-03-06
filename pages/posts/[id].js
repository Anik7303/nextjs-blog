import Head from "next/head";

import utilStyles from "../../styles/utils.module.css";

import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";

export default function Post({ postData }) {
    const { id, title, date, contentHtml } = postData;
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    // Returns a list of possible values for 'id'
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return { props: { postData } };
}

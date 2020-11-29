import fs from "fs";
import path from "path";

import matter from "gray-matter";
import remark from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return { id, ...matterResult.data };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
    const filenames = fs.readdirSync(postsDirectory);

    // Returns an array that looks like this
    // [
    //     {
    //         params: { id: "pre-rendering" },
    //     },
    //     {
    //         params: { id: "ssg-ssr" },
    //     },
    // ];
    return filenames.map((filename) => ({ params: { id: filename.replace(/\.md$/, "") } }));
}

export async function getPostData(id) {
    const fullpath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullpath, "utf8");

    // Use gray-mater to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into html string
    const processedContent = await remark().use(remarkHtml).process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine data with id and contentHtml
    return { id, contentHtml, ...matterResult.data };
}

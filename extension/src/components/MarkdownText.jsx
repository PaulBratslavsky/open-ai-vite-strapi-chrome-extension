import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownText({ markdown }) {
  return (
    <section className="rich-text py-6 text-left bg-gray-900 dark:text-gray-100 ">
      <Markdown children={markdown} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
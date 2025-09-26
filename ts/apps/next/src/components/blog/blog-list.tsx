import Link from "next/link";
import { formatAuthorString, formatPublishDate } from "@/lib/blog";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  slug: string;
  publishDate: string | null;
  authors: {
    name: string;
    avatarUrl?: string | null;
  }[];
  tags: {
    name: string;
  }[];
}

interface BlogListProps {
  blogs: Blog[];
}

export function BlogList({ blogs }: BlogListProps) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>No blog posts available yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.slug}`}
          className="group flex flex-col md:flex-row w-full gap-3 md:gap-6 px-3 py-4 md:px-4 md:py-5 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
        >
          <div className="flex-1 md:flex-[5] flex flex-col gap-2">
            <h3 className="text-gray-900 dark:text-gray-100 font-medium text-base md:text-lg leading-tight group-hover:text-accent transition-colors duration-200">
              {blog.title}
            </h3>
            <div className="flex items-center gap-4 md:hidden text-sm text-gray-600">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {blog.tags[0]?.name || "General"}
              </span>
              <span className="dark:text-gray-400">
                {formatPublishDate(blog.publishDate)}
              </span>
              {blog.authors[0]?.avatarUrl && (
                <Image
                  src={blog.authors[0].avatarUrl}
                  alt={
                    formatAuthorString(
                      blog.authors.map((author) => ({
                        name: author.name ?? "",
                      })),
                    ) || "Author"
                  }
                  width={24}
                  height={24}
                  className="w-6 h-6 object-cover rounded-full"
                />
              )}
            </div>
          </div>
          <div className="hidden md:flex md:flex-[2] items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {blog.tags[0]?.name || "General"}
            </span>
          </div>
          <div className="hidden md:flex md:flex-[2] items-center text-sm text-gray-600 dark:text-gray-400">
            {formatPublishDate(blog.publishDate)}
          </div>
          {/* TODO (amiller68): need to include the avatar url */}
        </Link>
      ))}
    </div>
  );
}

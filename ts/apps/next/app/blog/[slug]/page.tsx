import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { Blog } from "@quotientjs/react";

import {
  SectionTitleContainer,
  SectionHeading,
  SectionTitle,
} from "@/components/typography/section-title";

import { formatAuthorString, formatPublishDate } from "@/lib/blog";
import { quotientClient } from "@/services";

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  try {
    const result = await quotientClient.blog.list({
      page: 1,
      limit: 100,
      statuses: ["ACTIVE"],
    });

    return (result.blogs || []).map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error fetching blogs for static params:", error);
    // Return empty array if API fails - allows build to continue
    return [];
  }
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { blog } = await quotientClient.blog.get({ slug });

  if (!blog) {
    return {
      title: "Blog Not Found | Geney",
      description: "The requested blog post could not be found.",
    };
  }

  const authors = formatAuthorString(
    blog.authors.map((author: any) => ({
      name: author.name ?? "",
    })),
  );
  const tags = blog.tags.map((tag: any) => tag.name).join(", ");

  const metadata: Metadata = {
    title: `${blog.title} | Geney Blog`,
    description:
      blog.metaDescription ||
      `Read ${blog.title} on Geney's blog. Learn about biochemistry research, AI-powered discovery, and scientific automation.`,
    openGraph: {
      title: blog.title,
      description:
        blog.metaDescription || `Read ${blog.title} on Geney's blog.`,
      type: "article",
      url: `${process.env.BASE_URL}/blog/${slug}`,
      images: blog.dominantImageUrl
        ? [
            {
              url: blog.dominantImageUrl,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description:
        blog.metaDescription || `Read ${blog.title} on Geney's blog.`,
      images: blog.dominantImageUrl ? [blog.dominantImageUrl] : undefined,
    },
    other: {
      "article:author": authors,
      "article:tag": tags,
    },
  };

  if (blog.publishDate) {
    metadata.other!["article:published_time"] = blog.publishDate;
  }

  return metadata;
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const { blog } = await quotientClient.blog.get({ slug });

  if (!blog) {
    return notFound();
  }

  const category = blog.tags[0]?.name;

  return (
    <div className="w-full overflow-x-hidden">
      <div className="relative pt-24 md:pt-32 px-4 sm:px-8 mb-16 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-6 w-full">
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <SectionTitleContainer className="flex flex-col items-center text-center gap-2 w-full">
                  <SectionHeading className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mb-2">
                    {category}
                  </SectionHeading>
                  <SectionTitle className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                    {blog.title}
                  </SectionTitle>
                </SectionTitleContainer>

                {/* Meta Description */}
                {blog.metaDescription && (
                  <p className="text-center text-gray-600 dark:text-gray-400 text-xl max-w-3xl leading-relaxed">
                    {blog.metaDescription}
                  </p>
                )}

                {/* Author, Date, and Read Time */}
                <div className="w-full flex flex-row flex-wrap items-center justify-center gap-3 text-base text-gray-600 dark:text-gray-400">
                  {blog.authors && blog.authors.length > 0 && (
                    <>
                      <div className="flex items-center gap-2">
                        {/* TODO (amiller68): need to include the avatar url */}
                        {/* {blog.authors[0].avatarUrl && (
                          <Image
                            src={blog.authors[0].avatarUrl}
                            alt={blog.authors[0].name || "Author"}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        )} */}
                        <span className="font-medium">
                          {formatAuthorString(
                            blog.authors.map((author) => ({
                              name: author.name ?? "",
                            })),
                          )}
                        </span>
                      </div>
                      <span className="text-gray-400">•</span>
                    </>
                  )}
                  {blog.publishDate && (
                    <span>{formatPublishDate(blog.publishDate)}</span>
                  )}
                </div>
              </div>

              {blog.dominantImageUrl && (
                <div className="w-full rounded-2xl overflow-hidden flex justify-center my-8">
                  <Image
                    className="w-full max-h-[600px] object-cover rounded-2xl"
                    src={blog.dominantImageUrl}
                    alt={blog.title}
                    width={1200}
                    height={500}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}

              {/* Blog Content */}
              <div className="w-full max-w-5xl mx-auto">
                <Blog
                  content={blog.content}
                  className="prose prose-lg dark:prose-invert max-w-none"
                  elementClassName={{
                    strong: "font-bold text-gray-900 dark:text-gray-100",
                    em: "italic text-gray-800 dark:text-gray-200",
                    code: "px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-gray-800 dark:text-gray-200",
                    a: "text-accent hover:text-accent/80 underline underline-offset-2 transition-colors",
                    h1: "text-4xl font-bold mb-6 mt-8 leading-tight tracking-tight text-gray-900 dark:text-gray-100",
                    h2: "text-3xl font-semibold mb-5 mt-7 leading-tight tracking-tight text-gray-900 dark:text-gray-100",
                    h3: "text-2xl font-medium mb-4 mt-6 leading-tight tracking-tight text-gray-900 dark:text-gray-100",
                    h4: "text-xl font-medium mb-3 mt-5 leading-tight tracking-tight text-gray-900 dark:text-gray-100",
                    h5: "text-lg font-medium mb-2 mt-4 leading-tight tracking-tight text-gray-900 dark:text-gray-100",
                    h6: "text-base font-medium mb-2 mt-3 leading-tight tracking-tight text-gray-900 dark:text-gray-100",
                    p: "mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg",
                    ul: "list-disc pl-6 mb-6 space-y-3 text-gray-700 dark:text-gray-300",
                    ol: "list-decimal pl-6 mb-6 space-y-3 text-gray-700 dark:text-gray-300",
                    li: "mb-1 leading-relaxed pl-2",
                    blockquote:
                      "border-l-4 border-gray-300 dark:border-gray-600 pl-6 italic mb-6 text-gray-600 dark:text-gray-400",
                    codeBlock:
                      "bg-gray-900 dark:bg-gray-950 text-gray-100 p-6 rounded-lg mb-6 overflow-x-auto font-mono text-sm",
                    image: "rounded-2xl shadow-lg my-8 w-full",
                    asset: "my-6",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

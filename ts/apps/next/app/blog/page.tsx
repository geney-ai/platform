import { Metadata } from "next";
import {
  SectionTitle,
  LightTitleSpan,
  SectionHeading,
  SectionTitleContainer,
} from "@/components/typography/section-title";
import { BlogList } from "@/components/blog/blog-list";
import { quotientClient } from "@/services";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Geney | Blog",
  description:
    "Discover the latest insights in biochemistry research, AI-powered discovery, and scientific automation.",
  openGraph: {
    title: "Geney | Blog",
    description:
      "Discover the latest insights in biochemistry research, AI-powered discovery, and scientific automation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geney | Blog",
    description:
      "Discover the latest insights in biochemistry research, AI-powered discovery, and scientific automation.",
  },
};

export default async function BlogPage() {
  // For static export, we can't use searchParams, so we'll just show all blogs
  // Fetch blogs from Quotient CMS
  let blogs: any[] = [];
  let error: Error | null = null;

  try {
    const result = await quotientClient.blog.list({
      page: 1,
      limit: 50, // Show more blogs since we can't paginate
      statuses: ["ACTIVE"],
    });
    blogs = result.blogs || [];
  } catch (err) {
    error = err as Error;
  }

  return (
    <div className="overflow-x-hidden w-full">
      <div className="relative mt-[12.5dvh] md:mt-[17.5dvh] pt-4 md:pt-0 px-8 max-w-7xl mx-auto mb-16 w-full flex flex-col z-10 space-y-12 md:space-y-24">
        <SectionTitleContainer className="flex flex-col items-center text-center gap-3">
          <SectionHeading className="text-sm font-medium tracking-wider text-gray-600 dark:text-gray-400 uppercase">
            Blog
          </SectionHeading>
          <SectionTitle className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Research Insights <br />
            <LightTitleSpan>& Discovery Updates</LightTitleSpan>
          </SectionTitle>
        </SectionTitleContainer>

        <div className="w-full">
          {error ? (
            <div className="text-center text-red-500 py-12">
              <p>Error loading blogs. Please try again later.</p>
              <p className="text-sm mt-2">{error.message}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground mb-6">
                  We&apos;re working on exciting content about biochemistry
                  research, AI-powered discovery, and scientific automation.
                </p>
                <p className="text-sm text-muted-foreground">
                  Subscribe below to be notified when we publish our first
                  articles.
                </p>
              </div>
            </div>
          ) : (
            <BlogList blogs={blogs} />
          )}
        </div>
      </div>
    </div>
  );
}

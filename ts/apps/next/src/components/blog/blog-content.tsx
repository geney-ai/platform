interface BlogContentProps {
  content: any; // Changed to any to handle different content types
  className?: string;
}

export function BlogContent({ content, className = "" }: BlogContentProps) {
  // Handle different content types
  let htmlContent = "";

  if (typeof content === "string") {
    htmlContent = content;
  } else if (content && typeof content === "object") {
    // If it's an object, try to extract HTML or convert to string
    if (content.html) {
      htmlContent = content.html;
    } else if (content.rawHtml) {
      htmlContent = content.rawHtml;
    } else if (content.markdown) {
      // For markdown content, we'd need a markdown parser
      // For now, just display as plain text
      htmlContent = `<pre>${content.markdown}</pre>`;
    } else {
      // Last resort - stringify the object for debugging
      htmlContent = `<pre>Content structure: ${JSON.stringify(content, null, 2)}</pre>`;
    }
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

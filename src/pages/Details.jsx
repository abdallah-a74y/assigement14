import { Link, useParams } from "react-router-dom";

import {
  posts,
  getTitle,
  getCategory,
  getImage,
  getReadTime,
  getAuthor,
  formatDate,
  getSlug,
} from "../data/data";

export default function Details() {

  const { slug } = useParams();


  const post = posts.find(
    (p) => String(getSlug(p)) === String(slug)
  );


  if (!post) {
    return null;
  }

  const author = getAuthor(post);


  const rawContent =
    post.content ||
    post.text ||
    post.excerpt ||
    post.description ||
    "";


  const contentBlocks = Array.isArray(rawContent)
    ? rawContent
    : String(rawContent)
        .split(/\n\s*\n/)
        .map((text) => text.trim())
        .filter(Boolean);

  return (
    <main className="details-page">
      <div className="container">
        <div className="details-wrap">


          <span className="section-label">
            {getCategory(post)}
          </span>


          <h1>{getTitle(post)}</h1>


          <div className="article-meta">
            <span>
              <i className="bi bi-person"></i>
              {author.name} - {author.role}
            </span>

            <span>
              <i className="bi bi-clock"></i>
              {getReadTime(post)}
            </span>

            <span>
              {formatDate(post.date)}
            </span>
          </div>

          <img
            src={getImage(post)}
            alt={getTitle(post)}
            loading="lazy"
          />


          <div className="details-body">
            {contentBlocks.map((block, index) => {

              if (block.startsWith("##")) {
                return (
                  <h2
                    className="details-heading"
                    key={index}
                  >
                    {block.replace(/^##\s*/, "")}
                  </h2>
                );
              }

              return (
                <p
                  className="details-text"
                  key={index}
                >
                  {block}
                </p>
              );
            })}
          </div>


          <Link to="/blog" className="btn-main">
            العودة إلى المدونة
            <i className="bi bi-arrow-left"></i>
          </Link>

        </div>
      </div>
    </main>
  );
}
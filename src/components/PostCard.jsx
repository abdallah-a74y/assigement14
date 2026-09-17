import { Link } from "react-router-dom";

import {
  getTitle,
  getCategory,
  getImage,
  getReadTime,
  getExcerpt,
  getSlug,
  getAuthor,
  formatDate,
} from "../data/data";

export default function PostCard({ post }) {
  const title = getTitle(post);
  const author = getAuthor(post);
  const avatar = author.avatar || getImage(post);

  return (
    <div className="col-lg-4 col-md-6">
      <article className="article-card">
        <Link
          to={`/blog/${encodeURIComponent(getSlug(post))}`}
        >
          <div className="article-image">
            <img
              src={getImage(post)}
              alt={title}
              loading="lazy"
            />

            <span>{getCategory(post)}</span>
          </div>

          <div className="article-content">
            <div className="article-meta">
              <span>
                <i className="bi bi-clock" />
                {getReadTime(post)}
              </span>

              <span>{formatDate(post.date)}</span>
            </div>

            <h3>{title}</h3>

            <p>{getExcerpt(post)}</p>

            <div className="author">
              <img
                src={avatar}
                alt={author.name}
              />

              <div>
                <strong>{author.name}</strong>
                <small>{author.role}</small>
              </div>

              <i className="bi bi-arrow-left-circle" />
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}
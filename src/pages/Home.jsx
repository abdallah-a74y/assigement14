import { Link } from "react-router-dom";

import {
  posts,
  getTitle,
  getCategory,
  getImage,
  getReadTime,
  getExcerpt,
  getAuthor,
  formatDate,
  getSlug,
} from "../data/data";

import PostCard from "../components/PostCard";

export default function Home() {
  const featured = posts
    .filter((p) => p.featured)
    .slice(0, 3);

  const latest = [...posts]
    .sort(
      (a, b) =>
        new Date(b.date || 0) - new Date(a.date || 0)
    )
    .slice(0, 3);

  const cats = [
    ["إضاءة", "bi-brightness-high"],
    ["بورتريه", "bi-person"],
    ["مناظر طبيعية", "bi-image"],
    ["تقنيات", "bi-sliders"],
    ["معدات", "bi-camera"],
  ];

  return (
    <main className="page-section">
      <section className="hero-section">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

        <div className="container">
          <div className="w-100 text-center mx-auto">
            <span className="section-label">
              <i className="bi bi-camera" />
              مرحباً بك في عدسة
            </span>

            <h1 className="hero-title">
              اكتشف <span>فن</span>
              <br />
              التصوير الفوتوغرافي
            </h1>

            <p className="hero-text">
              انغمس في أسرار المحترفين ونصائح عملية لتطوير
              مهاراتك في التصوير.
            </p>

            <div className="hero-buttons">
              <Link to="/blog" className="btn-main">
                استكشف المقالات
                <i className="bi bi-arrow-left" />
              </Link>

              <Link to="/about" className="btn-outline">
                اعرف المزيد
              </Link>
            </div>

            <section className="stats-section">
              <div className="stats-grid">
                <div className="stat-card">
                  <i className="fa-solid fa-newspaper stat-icon" />
                  <p className="stat-number">+50</p>
                  <p className="stat-label">مقالة</p>
                </div>

                <div className="stat-card">
                  <i className="fa-solid fa-users stat-icon" />
                  <p className="stat-number">+10ألف</p>
                  <p className="stat-label">قارئ</p>
                </div>

                <div className="stat-card">
                  <i className="fa-solid fa-folder-open stat-icon" />
                  <p className="stat-number">4</p>
                  <p className="stat-label">تصنيفات</p>
                </div>

                <div className="stat-card">
                  <i className="fa-solid fa-pen-nib stat-icon" />
                  <p className="stat-number">6</p>
                  <p className="stat-label">كاتب</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">
                مختاراتنا
              </span>

              <h2>
                مقالات <span>مميزة</span>
              </h2>
            </div>

            <Link to="/blog" className="more-link">
              عرض جميع المقالات
              <i className="bi bi-arrow-left" />
            </Link>
          </div>

          <div className="row g-4">
            {featured.map((p) => (
              <PostCard
                key={p.id}
                post={p}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="section-heading text-center">
            <div className="w-100">
              <span className="section-label">
                استكشف
              </span>

              <h2>
                تصنيفات <span>التصوير</span>
              </h2>
            </div>
          </div>

          <div className="row g-3">
            {cats.map(([name, icon]) => (
              <div
                className="col-lg col-md-4 col-6"
                key={name}
              >
                <Link
                  to={`/blog?category=${encodeURIComponent(
                    name
                  )}`}
                >
                  <div className="category-card">
                    <i className={`bi ${icon}`} />

                    <h4>{name}</h4>

                    <p>مقالات</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  posts,
  categories,
  getTitle,
  getCategory,
  getExcerpt,
  getAuthor,
  getSlug,
} from "../data/data";

import PostCard from "../components/PostCard";

export default function Blog() {

  const [params, setParams] = useSearchParams();

  const initialCategory = params.get("category") || "الكل";

  const [category, setCategory] = useState(
    categories.some((c) => c.name === initialCategory)
      ? initialCategory
      : "الكل"
  );

  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  const postsPerPage = 6;

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const postCategory = getCategory(post);
      const author = getAuthor(post);
      const query = search.trim().toLowerCase();

      const categoryMatches =
        category === "الكل" || postCategory === category;

      const searchableText = [
        getTitle(post),
        getExcerpt(post),
        postCategory,
        author.name,
        ...(post.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      const searchMatches =
        !query || searchableText.includes(query);

      return categoryMatches && searchMatches;
    });
  }, [category, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / postsPerPage)
  );

  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = currentPage * postsPerPage;

  const displayedPosts = filteredPosts.slice(
    startIndex,
    endIndex
  );

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);

    if (newCategory === "الكل") {
      params.delete("category");
    } else {
      params.set("category", newCategory);
    }

    setParams(params);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <main className="page-section">

      <div className="blog-header">
        <div className="container text-center">
          <span className="section-label">
            <i className="bi bi-journal-text"></i>
            مدونتنا
          </span>

          <h1>
            استكشف <span>مقالاتنا</span>
          </h1>

          <p>
            اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
          </p>
        </div>
      </div>


      <div className="blog-filters">
        <div className="container">
          <div className="row align-items-center g-3">


            <div className="col-lg-4">
              <div className="search-box">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="ابحث في المقالات..."
                />

                <i className="bi bi-search"></i>
              </div>
            </div>


            <div className="col-lg-8">
              <div className="filter-buttons">

                <button
                  className={`filter-btn ${
                    category === "الكل" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("الكل")}
                >
                  جميع المقالات
                </button>

                {categories.map((categoryItem) => (
                  <button
                    key={categoryItem.name}
                    className={`filter-btn ${
                      category === categoryItem.name
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleCategoryChange(categoryItem.name)
                    }
                  >
                    {categoryItem.name}
                  </button>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>


      <div className="container blog-content">


        <div className="d-flex justify-content-between align-items-center mb-4">

          <p className="result-count">
            عرض <strong>{filteredPosts.length}</strong> مقالات
          </p>

          <div className="view-buttons">

            <button
              className={view === "grid" ? "active" : ""}
              onClick={() => handleViewChange("grid")}
            >
              <i className="bi bi-grid"></i>
            </button>

            <button
              className={view === "list" ? "active" : ""}
              onClick={() => handleViewChange("list")}
            >
              <i className="bi bi-list"></i>
            </button>

          </div>
        </div>


        <div
          className={`row g-4 ${
            view === "list" ? "list-view" : ""
          }`}
        >
          {displayedPosts.map((post) => (
            <PostCard
              key={post.id || getSlug(post)}
              post={post}
            />
          ))}


          {displayedPosts.length === 0 && (
            <div
              className="col-12 text-center"
              style={{
                padding: "60px",
                color: "#777",
              }}
            >
              لا توجد مقالات مطابقة.
            </div>
          )}
        </div>

        <div className="pagination-custom">


          <button
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            <i className="bi bi-chevron-right"></i>
          </button>


          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              className={
                pageNumber === currentPage ? "active" : ""
              }
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

        </div>

        <p className="text-center page-number">
          صفحة {currentPage} من {totalPages}
        </p>

      </div>
    </main>
  );
}

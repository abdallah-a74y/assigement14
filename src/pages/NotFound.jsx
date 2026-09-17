import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <main className="not-found">
        <div className="container">
          <h1>404</h1>

          <h2>الصفحة غير موجودة</h2>

          <p style={{ color: "#888" }}>
            عذراً، الصفحة التي تبحث عنها غير موجودة.
          </p>

          <Link to="/" className="btn-main">
            العودة للرئيسية
          </Link>
        </div>
      </main>
    </>
  );
}
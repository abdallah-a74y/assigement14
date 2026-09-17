import { Link, NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <div
            className="rounded-3 overflow-hidden position-relative"
            style={{ width: 48, height: 48 }}
          >
            <img
              src="/images/logo.png"
              alt="عدسة"
              className="object-fit-cover w-100 h-100"
            />
          </div>

          <span>عدسة</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>
            الرئيسية
          </NavLink>

          <NavLink to="/blog">
            المدونة
          </NavLink>

          <NavLink to="/about">
            من نحن
          </NavLink>
        </nav>

        <Link to="/blog" className="nav-button">
          استكشف المقالات
        </Link>
      </div>
    </header>
  );
}

function SubscribeForm({
  className = "newsletter-form",
  buttonText = "اشترك الآن",
}) {
  return (
    <form
      className={className}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="أدخل بريدك الإلكتروني"
        required
      />

      <button type="submit" className="btn-main">
        {buttonText}
      </button>
    </form>
  );
}

export function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <div>
            <span className="section-label">
              ابقَ على اطلاع
            </span>

            <h2>
              اشترك في نشرتنا <span>الإخبارية</span>
            </h2>

            <p>
              احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة
              في بريدك الإلكتروني.
            </p>
          </div>

          <SubscribeForm />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="footer-logo">
              <div className="logo-box">
                <span>ع</span>
              </div>

              <strong>عدسة</strong>
            </div>

            <p>
              مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم
              أسرار المحترفين ونصائح عملية لتطوير مهاراتكم.
            </p>

            <div className="social-links">
              <a href="#">
                <i className="bi bi-twitter-x" />
              </a>

              <a href="#">
                <i className="bi bi-github" />
              </a>

              <a href="#">
                <i className="bi bi-linkedin" />
              </a>

              <a href="#">
                <i className="bi bi-youtube" />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <h4>استكشف</h4>

            <ul>
              <li>
                <Link to="/">الرئيسية</Link>
              </li>

              <li>
                <Link to="/blog">المدونة</Link>
              </li>

              <li>
                <Link to="/about">من نحن</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4">
            <h4>التصنيفات</h4>

            <ul>
              {[
                "إضاءة",
                "بورتريه",
                "مناظر طبيعية",
                "تقنيات",
              ].map((c) => (
                <li key={c}>
                  <Link
                    to={`/blog?category=${encodeURIComponent(c)}`}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-4">
            <h4>ابقَ على اطلاع</h4>

            <p>
              اشترك للحصول على أحدث المقالات والتحديثات.
            </p>

            <SubscribeForm
              className="footer-form"
              buttonText="اشترك"
            />
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 عدسة. صنع بكل{" "}
            <i className="bi bi-heart-fill" /> جميع الحقوق
            محفوظة.
          </p>

          <div>
            <a href="#">سياسة الخصوصية</a>
            <a href="#">شروط الخدمة</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageLayout({
  children,
  newsletter = false,
}) {
  return (
    <>
      <Header />

      {children}

      {newsletter && <Newsletter />}

      <Footer />
    </>
  );
}
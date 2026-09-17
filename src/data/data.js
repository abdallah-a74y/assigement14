import data from "./posts.json";

export const posts = Array.isArray(data) ? data : (data.posts || []);
export const categories = Array.isArray(data) ? [] : (data.categories || []);
export const siteInfo = Array.isArray(data) ? {} : (data.siteInfo || {});

export function getTitle(post) { return post.title || post.name || "مقال بدون عنوان"; }
export function getCategory(post) { return post.category || post.category_name || "عام"; }
export function getImage(post) { return post.image || post.thumbnail || post.cover || "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=900"; }
export function getReadTime(post) { return post.readTime || post.minutes || post.read || "5 دقائق للقراءة"; }
export function getExcerpt(post) { return post.excerpt || post.description || post.text || ""; }
export function getSlug(post) { return post.slug || post.id || ""; }
export function getAuthor(post) {
  if (post.author && typeof post.author === "object") return { name: post.author.name || "عدسة", avatar: post.author.avatar || "", role: post.author.role || "كاتب" };
  return { name: post.author || "عدسة", avatar: post.authorAvatar || "", role: post.role || "كاتب" };
}
export function formatDate(date) {
  if (!date) return "";
  const d = new Date(String(date).includes("T") ? date : `${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return String(date);
  return new Intl.DateTimeFormat("ar-EG", { year: "numeric", month: "long", day: "numeric" }).format(d);
}

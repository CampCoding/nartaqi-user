// utils/buildFiltersQuery.js

export function buildFiltersQuery(filters) {
  const params = {};

  // 🔍 Search → name OR description
  if (filters.search && filters.search.trim() !== "") {
    params.name = filters.search;
  }

  // 📂 Category = course_category_id
  if (filters.category) {
    params.category_part_id = filters.category;
  }

  // ⭐ Rating → (مش موجود في API) = تم تجاهله

  // 🆓 Type → free
  if (filters.type) {
    if (filters.type === "free") params.free = "1";
    else if (filters.type === "paid") params.free = "0";
  }

  // 🚻 Gender
  if (filters.gender) {
    params.gender = filters.gender;
  }

  // 🎚️ Level
  if (filters.level) {
    params.for = filters.level;
  }

  // 🔢 Sort
  if (filters.sort) {
    switch (filters.sort) {
      case "latest":
        params.sort_by = "created_at";
        params.sort_order = "desc";
        break;

      case "popular":
        params.sort_by = "popularity"; // لو API بترجّع popularity
        params.sort_order = "desc";
        break;

      case "price_asc":
        params.sort_by = "price";
        params.sort_order = "asc";
        break;

      case "price_desc":
        params.sort_by = "price";
        params.sort_order = "desc";
        break;
    }
  }

  return params;
}

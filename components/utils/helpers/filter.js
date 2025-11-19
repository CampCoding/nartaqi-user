// utils/buildFiltersQuery.js

export function buildFiltersQuery(filters) {
  const params = {};

  // 🔍 Search → name
  if (filters.search && filters.search.trim() !== "") {
    params.name = filters.search;
  }

  // 📂 Category = course_category_id
  if (filters.category) {
    params.course_category_id = filters.category.split("_")[1];
  }

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

  // ⭐ Rating (highest / lowest)
  if (filters.rating) {
    if (filters.rating === "highest") {
      params.rating_sort = "highest";
    } else if (filters.rating === "lowest") {
      params.rating_sort = "lowest";
    }
  }

  // =============================
  // 🔥 SORT → convert to API format
  // =============================
  params.sort_most_common = false;
  params.sort_date_latest = false;

  // clear previous price sort
  delete params.sort_price;

  switch (filters.sort) {
    case "latest":
      params.sort_date_latest = true;
      break;

    case "popular":
      params.sort_most_common = true;
      break;

    case "price_asc":
      params.sort_price = "low_to_high";
      break;

    case "price_desc":
      params.sort_price = "high_to_low";
      break;
  }

  return params;
}

// normalize filters before sending to buildFiltersQuery
export function normalizeFilters(rawFilters) {
  const f = { ...rawFilters };

  // CATEGORY (cat_5 → 5)
  if (f.category) {
    f.category = f.category.replace("cat_", "");
  }

  // SORT (sort_latest → latest)
  if (f.sort) {
    f.sort = f.sort.replace("sort_", "");
  }

  // TYPE (type_free → free)
  if (f.type) {
    f.type = f.type.replace("type_", "");
  }

  // RATING (rating_highest → highest)
  if (f.rating) {
    f.rating = f.rating.replace("rating_", "");
  }

  return f;
}

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export function getPagination(query) {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(query.limit, 10) || DEFAULT_LIMIT));
  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
  };
}

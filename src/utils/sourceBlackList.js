// ...existing code...
/**
 * Lista negra de fontes e utilitários para filtragem.
 * Exporte DEFAULT_BLACKLIST para edição manual conforme necessário.
 */

const DEFAULT_BLACKLIST = [
  'EDIVALDOBRITO',
  'Sapo',
  "PYPI",
  "Expresso",
  "SLICKDEALS",
  "OBSERVADOR"
];

// Normaliza nome da fonte: lower, remove subdomínios e terminação de domínio
const normalizeSource = (name = '') => {
  return String(name)
    .toLowerCase()
    .replace(/^www\./, '')
    .replace(/\.(com|br|com\.br|org|net|co|info)$/g, '')
    .trim();
};

const isBlacklisted = (sourceName, blacklist = DEFAULT_BLACKLIST) => {
  if (!sourceName) return false; // sem fonte => não bloquear por fonte (ajuste se quiser)
  const normalized = normalizeSource(sourceName);
  return blacklist.some(blocked => normalized.includes(blocked.toLowerCase()));
};

// Recebe array de articles (cada article.source.name) e retorna somente os permitidos
const filterArticlesBySource = (articles = [], blacklist = DEFAULT_BLACKLIST) => {
  if (!Array.isArray(articles)) return [];
  return articles.filter(article => {
    const src = article && article.source && (article.source.name || article.source);
    // Se não houver source, mantemos o artigo; mudar para false se quiser excluir
    if (!src) return true;
    return !isBlacklisted(src, blacklist);
  });
};

module.exports = { DEFAULT_BLACKLIST, normalizeSource, isBlacklisted, filterArticlesBySource };
// ...existing code...
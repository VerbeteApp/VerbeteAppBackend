// Lista concisa de palavras restritas (blacklist) focada em filtrar 
// conteúdo negativo, polêmico ou sensível, priorizando notícias neutras/positivas.

const restrictedWords = [

    // 1. Mídias Sociais, Plataformas e Ferramentas
    // (Geralmente usadas para fofoca, virais ou conteúdo de baixa qualidade)
    "whatsapp", "telegram", "instagram", "tiktok", "facebook", "twitter",
    "youtuber", "dicas", "google", "gemini", 

    // 2. Política, Eleições e Governança
    "presidente", "vice-presidente", "governador", "governadora", "prefeito", "prefeita",
    "vereador", "vereadora", "deputado", "deputada", "senador", "ministro", "ministra",
    "bolsonaro", "lula", "eleições", "eleicoes", "política", "politica", "governo",
    "congresso", "senado", "parlamento", "stf", "tse", "câmara", "assembleia", "tribunal",
    "partido", "oposição", "candidato", "projeto de lei", "reforma", "emenda",
    "impeachment", "votação", "judicialização", "autoridade", "regime", "ditadura",
    "orçamento", "gabinete", "secretário", "secretária", "bancada", "ideologia", "Trump",

    // 3. Crime, Violência e Segurança
    "assassinato", "roubo", "furto", "sequestro", "tráfico", "drogas", "abuso", "estupro",
    "corrupção", "fraude", "prisão", "cadeia", "detento", "julgamento", "policial",
    "guerra", "conflito", "terrorismo", "bomba", "milícia", "facção", "latrocínio",
    "homicídio", "armas", "tiro", "suspeito", "réu", "denúncia", "inquérito", "investigação",
    "violência", "agressão", "assaltante", "bandido", "marginal", "crime", "criminoso",
    "pedofilia", "pena de morte", "ladrão", "sequestrador", "canibalismo", "Israel", "fuzil",
    "fuzis",

    // 4. Desastres, Acidentes e Tragédias
    "chuva", "tempestade", "furacão", "ciclone", "tornado", "deslizamento", "enchente",
    "incêndio", "seca", "erupção", "terremoto", "desmoronamento", "colapso", "tragédia",
    "desastre", "acidente", "fatalidade", "feridos", "vítimas", "mortos", "destruição",
    "dano", "vazamento", "naufrágio", "queda", "batida", "poluição", "contaminação",
    "ambiental", "desperdício", "fatal", "vítima",

    // 5. Saúde, Doenças e Condições Negativas
    "pandemia", "epidemia", "vírus", "câncer", "doença", "morte", "internação", "uti",
    "hospitalização", "cirurgia", "remédio", "vacina", "deficiência", "dependência",
    "sintomas", "óbito", "depressão", "ansiedade", "vício", "suicídio",

    // 6. Economia e Finanças Negativas
    "crise", "recessão", "dívida", "inflação", "desemprego", "falência", "quebra",
    "prejuízo", "rombo", "calote", "pobreza", "miséria", "fome", "imposto", "custo",
    "desvio", "desigualdade", "corte", "redução", "deficit", "déficit",

    // 7. Temas Polêmicos, Sensíveis e Preconceito
    "racismo", "racista", "discriminação", "discriminacao", "aborto", "eutanásia",
    "sexualidade", "gênero", "lgbtqia+", "maioridade penal", "cotas", "religião",
    "assédio", "preconceito", "homofobia", "transfobia", "machismo", "feminicídio",
    "intolerância", "minorias", "ética", "moral", "tabu", "disputa", "xenofobia",
    "xenofóbico", "xenofóbica",

    // 8. Famosos, Celebridades, Fofoca e Entretenimento de Massa
    "virginia", "witzi", "whindersson", "nunes", "carlinhos", "maia",
    "influenciador", "influenciadora", "influencer",
    "fazenda", "a fazenda", "bbb", "big brother", "celebridade", "fofoca", "famoso",
    "divórcio", "traição", "separação", "escândalo", "polemica", "briga", "processo",
    "exposição", "cancelamento", "humilhação", "tretas", "desabafo", "barraco",
    "intimidade", "vazou", "vazamento", "paparazzi", "amante", "tiktoker", "Jade Picon", "Bruna Marquezine",
    "Neymar Jr",
    

    // 9. Conteúdo Explícito e Sensacionalista
    "sexo", "adulto", "vigarista", "farsa", "charlatão", "sensacionalismo",

    // 10. Termos de Negação e Depreciação
    "não", "nunca", "jamais", "nenhum", "nada", "pior", "péssimo", "ruim", "falha",
    "fracasso", "defeito", "lamentável", "impossível", "inaceitável", "ilegal",
    "errado", "negativo", "prejudicial", "danoso", "irregular", "culpa", "erro",
    "alegação", "acusação", "mentira", "falso", "enganoso", "rejeição", "impasse",

    // 11. Eventos de Lazer Típicos de Manchetes (e Esportes de Aposta/Risco)
    "carnaval", "festival", "show", "concertos", "balada", "brasileirão", "enem",
    "horoscopo", "signo", "signos", "horóscopo",

    //12. Palavras aleatórias
    "promoção", 

];

// Exporta a lista em minúsculas
module.exports = restrictedWords.map(word => word.toLowerCase());
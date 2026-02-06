# DevOps Arcade — Template Studies

![Eleventy](https://img.shields.io/badge/Eleventy-SSG-222222?style=for-the-badge&logo=eleventy&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-Styling-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

Este repositório serve como **Template Base** para a criação de trilhas educacionais no ecossistema **DevOps Arcade**. Ele fornece toda a estrutura de UI, navegação, rastreamento de progresso e geração de certificados, permitindo que você foque apenas na criação do conteúdo.

## 🚀 Primeiros Passos

1. **Crie seu repositório:** Clique no botão **"Use this template"** no GitHub para criar um novo repositório.
2. **Clone o projeto:** Baixe o repositório para sua máquina.
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Rode o projeto:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:8080` no seu navegador.

---

## 🎨 Design System (Samples)

O template inclui uma documentação visual completa dos componentes disponíveis (Alertas, Botões, Code Blocks, etc.). Use essa página como referência para copiar e colar os códigos dos componentes enquanto cria suas aulas.

👉 **Acesse a página de Samples:** `http://localhost:8080/samples/`

> **Nota:** No template publicado [Demo](https://carlapvicente.github.io/template-studies), o botão "Samples" permanece visível na barra lateral para que novos criadores de conteúdo possam conhecer o Design System facilmente. Ao criar sua própria trilha, você provavelmente vai querer ocultá-lo.

---

## ⚙️ Checklist de Personalização

Para transformar este template no seu curso (ex: *Docker Studies*), você deve editar os seguintes arquivos para remover as referências a "Template Studies":

### 1. Configurações do Projeto

- [ ] **`package.json`**: Altere o `"name"` para o nome técnico do seu projeto (ex: `docker-studies`).
- [ ] **`.github/workflows/deploy.yml`**:
    - Altere `ELEVENTY_BASE_URL` para `/<nome-do-repositorio>`. Isso garante que o site funcione no GitHub Pages.
- [ ] **`src/_data/site.json`**:
    - Atualize `"url"`, `"name"` e `"description"` com os dados reais do seu curso.

### 2. Textos e Identidade Visual

- [ ] **`src/index.njk`**:
    - Atualize o `pageTitle` no topo do arquivo.
    - Altere o título `<h1>` e o subtítulo de boas-vindas.
- [ ] **`src/_includes/partials/header-home.njk`**:
    - Altere o título e ícone que aparecem no cabeçalho da página inicial.
- [ ] **`src/_includes/partials/head.njk`**:
    - Ajuste o `<title>` padrão e a descrição para SEO.

### 3. Funcionalidades

- [ ] **`src/js/progress-tracker.js`**:
    - **Essencial:** Altere `this.storageKey` para um valor único (ex: `'docker-studies-progress'`). Isso evita conflito de dados com outros cursos.
- [ ] **`src/js/certificate.js`**:
    - Personalize o objeto `certificateConfig` com o nome do curso e rodapé desejados para o certificado PDF.

### 4. Ocultar Botão "Samples" (Opcional)

Para remover o botão de acesso ao Design System da barra lateral na sua versão final:

- [ ] **`src/_includes/partials/aside-home.njk`**:
    - Remova ou comente o bloco `if` que contém o botão "Samples".

---

## 📝 Criando Conteúdo (Novos Módulos)

A estrutura de aulas fica na pasta `src/modules/`.

1. **Duplique** a pasta `src/modules/level-01-exemplo`.
2. **Renomeie** a pasta para o novo tópico (ex: `level-02-containers`).
3. **Edite** o arquivo `index.njk` dentro da nova pasta:
   - Atualize o **Front Matter** (título, `moduleId`, checklist).
   - Escreva o conteúdo.
4. **Adicione o Card na Home:**
   - Abra `src/index.njk` e adicione um novo `{{ ui.moduleCard(...) }}` na lista de módulos.

---

## 📂 Estrutura de Pastas

Entenda como o projeto está organizado:

```
├── .github
│   └── workflows        # Automação de deploy para o GitHub Pages (CI/CD)
├── src                  # Código-fonte do site
│   ├── _data            # Dados globais acessíveis em todo o site (ex: `glossary.json`, `site.json`)
│   ├── _includes        # Arquivos reutilizáveis
│   │   ├── layouts      # Estruturas base das páginas (ex: `base.njk`, `module.njk`)
│   │   ├── macros       # Componentes de UI (botões, alertas) para uso nos templates
│   │   └── partials     # Fragmentos de layout (cabeçalho, rodapé, barra lateral)
│   ├── docs             # Páginas de apoio ao aluno (Pré-requisitos, Glossário)
│   ├── js               # Scripts JavaScript (lógica de progresso, validações, interatividade)
│   ├── modules          # Área principal de conteúdo: Cada pasta aqui é uma aula/módulo do curso
│   ├── samples          # Documentação do Design System e templates de exemplo para criadores
│   ├── scss             # Estilos do projeto (Sass) modularizados em componentes e páginas
│   ├── index.njk        # Página inicial (Home) que lista os módulos
│   ├── robots.txt.njk   # Arquivo para SEO gerados automaticamente
│   └── sitemap.njk      # Arquivo para SEO gerados automaticamente
├── .eleventy.js         # Configuração do gerador de site estático (Eleventy)
├── .stylelintrc.json    # Regras para manter a qualidade e padrão do código CSS/Sass
└── package.json         # Dependências do projeto e scripts de execução (`dev`, `build`, `lint`)

```

---

## 🤝 Contribuindo

O **DevOps Arcade** é uma iniciativa para compartilhar conhecimento gratuitamente.

Este repositório é a **base estrutural** (Template) utilizada por todas as trilhas de estudo.

- **Melhorias no Template:** Se você encontrou um bug no layout, melhorou um script ou criou um novo componente de UI, abra um Pull Request neste repositório. Sua contribuição ajudará todos os cursos que utilizam esta base.
- **Novos Cursos:** Se você quer criar um curso novo (ex: Kubernetes, AWS), não precisa contribuir aqui. Basta usar este template (clique no botão "**Use this template**") para criar seu próprio repositório.

Juntos construímos uma comunidade de aprendizado prático e acessível. 🚀

---

*DevOps Arcade — Learn by doing.*
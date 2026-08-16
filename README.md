# 📊 Analisador de CSAT

Site para análise de CSAT com IA (Claude). Qualquer pessoa acessa a URL e faz upload de uma planilha Excel para receber dashboard + análise automatizada.

---

## Como funciona

- O usuário sobe um `.xlsx`, `.xls` ou `.csv`
- O sistema detecta automaticamente as colunas de nota, data e agrupamento
- Gera gráficos de distribuição, tendência e breakdown por grupo
- Botão "Gerar análise com IA" chama o Claude via backend (a chave API fica segura no servidor)

---

## Deploy no Railway (recomendado — grátis)

### 1. Suba o projeto no GitHub

```bash
git init
git add .
git commit -m "first commit"
gh repo create csat-analyzer --public --push
```

### 2. Acesse railway.app

1. Entre em **railway.app** e faça login com GitHub
2. Clique em **"New Project"** → **"Deploy from GitHub repo"**
3. Selecione o repositório `csat-analyzer`
4. Railway detecta Node.js automaticamente e faz o deploy

### 3. Configure a variável de ambiente

1. No painel do projeto, clique em **"Variables"**
2. Adicione:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (sua chave da Anthropic)
3. Clique em **"Add"** e aguarde o redeploy automático

### 4. Gere a URL pública

1. Vá em **"Settings"** → **"Domains"**
2. Clique em **"Generate Domain"**
3. Sua URL será algo como `csat-analyzer.railway.app`

**Pronto!** Qualquer pessoa com o link acessa e usa.

---

## Deploy no Render (alternativa grátis)

1. Entre em **render.com** → **"New Web Service"**
2. Conecte o repositório GitHub
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
4. Em **"Environment Variables"**, adicione `ANTHROPIC_API_KEY`
5. Clique em **"Create Web Service"**

> ⚠️ No plano gratuito do Render, o serviço "dorme" após 15 min sem uso e pode demorar ~30s para acordar na primeira requisição.

---

## Rodar localmente (para testes)

```bash
# 1. Instale as dependências
npm install

# 2. Crie o arquivo .env
cp .env.example .env
# Edite .env e coloque sua ANTHROPIC_API_KEY

# 3. Suba o servidor
npm start

# Acesse: http://localhost:3000
```

---

## Estrutura do projeto

```
csat-analyzer/
├── server.js          ← Backend Express (proxy da API do Claude)
├── package.json
├── .env.example       ← Template para as variáveis de ambiente
├── public/
│   └── index.html     ← Frontend completo (React + XLSX + Recharts)
└── README.md
```

---

## Escalas suportadas

| Escala | Critério de satisfação |
|--------|----------------------|
| 1–5    | Notas 4 e 5          |
| 1–10   | Notas 9 e 10         |
| 0–10   | Notas 9 e 10         |
| 0–100  | Nota ≥ 80            |

A escala é detectada automaticamente pelo valor máximo encontrado na coluna.

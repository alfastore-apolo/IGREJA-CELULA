# Célula.App

Aplicativo PWA de gestão de células da Igreja de Vencedores.

## Tecnologias
- HTML/CSS/JS (single file)
- Firebase Realtime Database
- Firebase Hosting
- PWA (installable)

## Deploy automático
Qualquer `git push` na branch `main` faz deploy automático no Firebase via GitHub Actions.

## Configuração

### 1. Firebase
Edite `index.html` e substitua as variáveis em `FB_CONFIG` com os dados do seu projeto Firebase.

Edite `.firebaserc` e `deploy.yml` substituindo `SEU_PROJETO_ID` pelo ID real do projeto.

### 2. GitHub Secret
Adicione o secret `FIREBASE_SERVICE_ACCOUNT` em:
**Settings → Secrets and variables → Actions**

Gere a chave em: Firebase Console → Configurações do projeto → Contas de serviço → Gerar nova chave privada

### 3. Ícones
Substitua os arquivos em `/icons/` pelos ícones reais do app:
- `icon-192.png` — 192×192px
- `icon-512.png` — 512×512px

Use o gerador em: https://www.pwabuilder.com/imageGenerator

### 4. PWABuilder
Após o deploy, acesse https://www.pwabuilder.com, cole a URL do seu Firebase e gere os pacotes para Android, Windows e iOS.

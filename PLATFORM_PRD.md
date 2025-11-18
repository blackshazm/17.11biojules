# Documento de Requisitos de Produto (PRD): BIO CLUB
**Produto**: Plataforma de Assinatura e Marketing de Indicação "BIO CLUB"
**Versão**: 2.0 (Escopo Detalhado)
**Data**: 17 de Novembro de 2025

---

## Parte 1: Visão e Estratégia do Produto

### 1.1. Visão Geral e Objetivo
**Visão**: Tornar-se a principal comunidade de bem-estar por assinatura do Brasil, onde membros não apenas consomem produtos de alta qualidade, mas também são recompensados por construir a comunidade através de um modelo de indicação transparente e gamificado.

**Objetivo**: Desenvolver uma plataforma SaaS robusta e segura que gerencia um clube de assinatura de produtos encapsulados. O sistema deve automatizar a cobrança recorrente, a complexa lógica de comissões por indicação, a jornada de engajamento do usuário e a entrega de conteúdo digital, garantindo total conformidade com as regulamentações brasileiras (LGPD, Receita Federal).

### 1.2. Problema a ser Resolvido
Indivíduos buscam fontes de renda extra e comunidades com propósito, mas os programas de afiliados tradicionais são muitas vezes complexos, pouco transparentes e não incentivam o engajamento a longo prazo. O BIO CLUB resolve isso ao oferecer uma proposta clara: um produto de qualidade, uma comissão justa atrelada ao sucesso do indicado e uma jornada gamificada que recompensa o esforço de construção da comunidade, tudo em uma plataforma automatizada e confiável.

### 1.3. Personas
- **Super Administrador (Alex):** Gerencia a plataforma, a logística dos produtos iniciais, o conteúdo do catálogo e audita as comissões.
- **Assinante / Comissionário (Beatriz):** Participa do clube, indica novos membros para gerar renda recorrente e avança na "Jornada 10 Passos" para aumentar seus ganhos.
- **Indicado (Carlos):** Novo membro que entra no clube através de um link de indicação, buscando os benefícios do produto e a oportunidade de também se tornar um comissionário.

### 1.4. Requisitos Funcionais Detalhados
| ID | Requisito | Status |
| :-- | :--- | :--- |
| **FR-01** | **Módulo Core (Usuários e Segurança)** | [ ] |
| | - Cadastro único com E-mail, Senha e CPF obrigatório. | [ ] |
| | - Validação de CPF via API externa (ex: Receita Federal) para garantir usuários reais. | [ ] |
| | - Requisito de idade mínima de 18 anos. | [ ] |
| | - Aceite obrigatório dos Termos de Uso e Política de Privacidade no cadastro. | [ ] |
| | - Sistema de autenticação (Login) e recuperação de senha. | [ ] |
| | - Desbloqueio de funcionalidades plenas do app somente via código único enviado fisicamente. | [ ] |
| **FR-02**| **Módulo de Assinaturas e Pagamentos** | [ ] |
| | - Assinatura mensal recorrente de R$ 100,00, exclusivamente via cartão de crédito. | [ ] |
| | - Integração com gateway de pagamento (Stripe ou Mercado Pago). | [ ] |
| | - O dia do primeiro pagamento define o dia do vencimento mensal (30 dias corridos). | [ ] |
| | - Emissão de recibo ou Nota Fiscal para o assinante a cada pagamento. | [ ] |
| | - Lógica de bloqueio: conta bloqueada após 3 atrasos consecutivos ou atraso superior a 30 dias. | [ ] |
| | - Lógica de reativação: usuário bloqueado deve pagar o dobro para reativar. | [ ] |
| **FR-03**| **Módulo de Indicações e Comissões** | [ ] |
| | - Geração de link de indicação pessoal e único para cada assinante. | [ ] |
| | - Comissão padrão de 30% sobre o valor da mensalidade (R$ 30,00). | [ ] |
| | - **Regra Crítica de Pagamento:** Comissão é paga somente 30 dias após o *segundo* pagamento do indicado. | [ ] |
| | - **Penalidade por Atraso:** Se o comissionário atrasar sua própria mensalidade, sua taxa de comissão sobre todos os indicados cai para 10%. | [ ] |
| | - Recuperação da comissão normal só ocorre após o segundo pagamento em dia consecutivo. | [ ] |
| | - **Carência por Alteração:** Alterar o cartão de crédito impõe uma nova carência de 30 dias para o recebimento de comissões, com notificação de alerta. | [ ] |
| | - Dashboard de indicados anônimo, exibindo apenas o status (`espera`, `ativo`, `atraso`, `cancelado`). | [ ] |
| **FR-04**| **Módulo de Jornada de Incentivo (10 Passos)** | [ ] |
| | - Novo assinante começa com taxa de comissão de 20%. | [ ] |
| | - A "Jornada 10 Passos" define tarefas de engajamento (ex: "Aprenda a convidar", "Compartilhe seu link"). | [ ] |
| | - Cada passo concluído aumenta a taxa de comissão em 1%, até o teto de 30%. | [ ] |
| | - O progresso na jornada é permanente, não regride, exceto pelas penalidades por atraso. | [ ] |
| **FR-05**| **Módulo de Conteúdo e Produto** | [ ] |
| | - Envio de um produto físico inicial contendo um código de ativação único. | [ ] |
| | - Entrega mensal de um catálogo digital (infoproduto) por e-mail após a confirmação do pagamento. | [ ] |
| | - (Opcional) Área administrativa para gestão do envio do produto físico. | [ ] |

### 1.5. Requisitos Não-Funcionais (NFRs)
- **Desempenho:** A API deve responder a 95% das requisições em menos de 300ms. O painel do usuário deve carregar em menos de 3 segundos.
- **Segurança:** Conformidade total com a LGPD. Dados sensíveis (CPF, dados de pagamento) devem ser criptografados em repouso e em trânsito. Prevenção contra ataques comuns (OWASP Top 10).
- **Confiabilidade:** Uptime de 99.8%. Backups diários do banco de dados.
- **Escalabilidade:** A plataforma deve suportar o crescimento para 10.000 assinantes no primeiro ano sem necessidade de refatoração da arquitetura core.

---

## Parte 2: Design da Experiência e Interface (UI/UX)

### 2.1. Filosofia de Design
Clareza, confiança e motivação. A interface deve ser intuitiva, transmitindo segurança nas transações financeiras e motivando o usuário a engajar na jornada de indicações através de um feedback visual claro e recompensador.

### 2.2. Guia de Estilo
- **Cores**: Paleta inspirada em produtos naturais (tons de verde, terrosos) com cores de destaque vibrantes para ações e alertas (ex: laranja para sucesso, vermelho para atraso).
- **Componentes**: Baseado em Shadcn/UI para consistência e acessibilidade.
- **Iconografia**: Biblioteca Lucide Icons para clareza e modernidade.

### 2.3. Telas e Fluxos Principais
- **Páginas Públicas:** Homepage atraente, Sobre Nós, Planos e Preços transparentes.
- **Fluxo de Cadastro:** Processo simples, com validação de CPF e aceite dos termos em etapas claras.
- **Painel do Assinante:** Visão geral da assinatura, histórico de pagamentos, link de indicação em destaque, progresso na "Jornada 10 Passos" e a lista anônima de indicados.
- **Alertas e Notificações:** Modais e toasts claros para informar sobre carências, penalidades e sucesso nas ações.

### 2.4. Design Responsivo
A plataforma será desenvolvida com a estratégia Mobile-First, garantindo uma experiência de uso perfeita em smartphones, que é o principal dispositivo de acesso para o público-alvo. O painel de Super Admin será otimizado para Desktop.

---

## Parte 3: Arquitetura Técnica

### 3.1. Stack Tecnológico
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Zustand (para estado global).
- **Backend:** NestJS, TypeScript.
- **Banco de Dados:** PostgreSQL com Prisma ORM.
- **Infraestrutura:** Vercel (Frontend), Railway (Backend/DB).
- **Gateways e APIs Externas:** Stripe/Mercado Pago, API de validação de CPF.

### 3.2. Arquitetura do Banco de Dados
- **Estratégia:** Banco de dados único com separação lógica por `tenant_id` (se aplicável no futuro, para B2B). Para o modelo atual, um schema único bem estruturado.
- **Tabelas Chave:** `users`, `subscriptions`, `payments`, `referrals`, `commissions`, `journey_progress`.

### 3.3. Contratos de API (Exemplos)
- `POST /auth/register`: Cria um novo usuário com CPF.
- `POST /subscriptions`: Inicia uma nova assinatura via gateway de pagamento.
- `GET /referrals/status`: Retorna a lista anônima de indicados do usuário autenticado.
- `POST /journey/complete-step`: Marca um passo da jornada como concluído.

---

## Parte 4: Lançamento e Pós-Lançamento

### 4.1. Plano de Testes
- **Testes Unitários (Jest):** Cobrir toda a lógica de negócio crítica (cálculo de comissão, aplicação de penalidades, lógica da jornada).
- **Testes de Integração:** Validar a comunicação entre o backend, o banco de dados e as APIs externas (gateway, validador de CPF).
- **Testes de Ponta-a-Ponta (Cypress):** Simular os fluxos completos do usuário: cadastro, pagamento, indicação e recebimento de comissão.

### 4.2. Plano de Lançamento
- **Fase 1 (MVP - 12 semanas):** Implementação dos módulos Core (Usuários), Assinaturas, e a lógica principal de Comissões e Jornada. Lançamento para um grupo beta fechado de 50 usuários.
- **Fase 2 (Pós-MVP - 8 semanas):** Refinamento da UI/UX com base no feedback, otimizações de performance e implementação de dashboards de analytics para o Super Admin. Abertura para o público geral.

### 4.3. Suporte e Operações
- **Suporte:** Canais via e-mail e chat na plataforma, com um SLA claro para resolução de problemas.
- **Monitoramento:** Dashboards em tempo real para acompanhar a saúde da aplicação (erros, latência) e métricas de negócio (novas assinaturas, pagamentos, churn).

### 4.4. Documentos Legais
- **Termos de Uso:** Detalhar todas as regras do clube, incluindo a política de comissões, penalidades e bloqueio.
- **Política de Privacidade:** Descrever de forma transparente como os dados dos usuários (especialmente o CPF) são coletados, usados e protegidos, em conformidade com a LGPD.
- **Contrato de Assinatura:** Definir os termos da cobrança recorrente, cancelamento e renovação.

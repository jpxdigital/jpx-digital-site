import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'containers-kubernetes'

const faqs = [
  {
    question: 'Minha empresa realmente precisa de Kubernetes?',
    answer: 'Depende do contexto. Kubernetes é ideal quando você tem múltiplos serviços que precisam de orquestração, escala automática e alta disponibilidade. Para uma aplicação simples com tráfego estável, Docker Compose ou um único servidor pode ser suficiente. Kubernetes adiciona complexidade operacional significativa — justificada quando os benefícios superam esse custo.',
  },
  {
    question: 'Qual é a diferença entre Docker e Kubernetes?',
    answer: 'Docker é a tecnologia de containerização: empacota a aplicação e suas dependências em uma unidade portátil. Kubernetes é o orquestrador: gerencia onde e como esses containers rodam, garante que a quantidade certa de réplicas está ativa, faz rollout de novas versões sem downtime e redistribui carga automaticamente.',
  },
  {
    question: 'Kubernetes on-prem ou gerenciado (AKS, EKS, OKE)?',
    answer: 'Kubernetes gerenciado (Azure AKS, AWS EKS, Oracle OKE) elimina a responsabilidade de gerenciar o plano de controle do K8s — updates, patches e disponibilidade ficam com o provedor. On-prem com K3s ou RKE faz sentido quando há restrições de conectividade, data residency obrigatória ou latência crítica. Para a maioria das empresas, gerenciado é a melhor escolha.',
  },
  {
    question: 'Como fazer rollback rápido em Kubernetes?',
    answer: 'Kubernetes tem rollback nativo: `kubectl rollout undo deployment/<nome>` reverte para a versão anterior em segundos. Com GitOps (ArgoCD, Flux), o rollback é um git revert — a versão anterior é restaurada automaticamente a partir do estado desejado no repositório.',
  },
  {
    question: 'A JPX Digital faz CI/CD integrado ao Kubernetes?',
    answer: 'Sim. Implementamos pipelines completos de CI/CD integrados a clusters K8s: GitHub Actions ou Azure DevOps para CI, ArgoCD ou Flux para GitOps/CD, Helm para gerenciamento de releases e políticas de rollout (canary, blue-green). O objetivo é que o deploy de nova versão seja um commit no repositório.',
  },
]

export const metadata: Metadata = {
  title: 'Docker e Kubernetes — Containerização para Produção',
  description: 'Consultoria em Docker e Kubernetes para ambientes corporativos. Containerização, orquestração, CI/CD e GitOps. On-prem, AKS, EKS e OKE.',
  keywords: ['docker consultoria', 'kubernetes brasil', 'containers kubernetes empresas', 'AKS consultoria', 'kubernetes on-prem'],
  openGraph: { title: 'Docker e Kubernetes | JPX Digital', description: 'Containerização, orquestração e CI/CD com Docker e Kubernetes.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content: ServicePageContent = {
  slug,
  category: 'Infraestrutura',
  heroHeadline: 'Docker e Kubernetes — Containerização e Orquestração para Ambientes de Produção Reais.',
  heroSub: 'Containers não são só para desenvolvimento. Implementamos Kubernetes em produção com segurança, observabilidade e CI/CD integrado.',
  ctaLabel: 'Solicitar Container Readiness Assessment',

  problem: {
    headline: 'Containers resolvem o "funciona na minha máquina". Kubernetes resolve como orquestrar isso em produção — mas com complexidade operacional que precisa ser gerenciada.',
    body: [
      'Docker eliminou a inconsistência entre ambientes. Mas colocar containers em produção com disponibilidade, escala automática e deploy sem downtime exige uma camada de orquestração — e Kubernetes é a resposta. Só que K8s é complexo.',
      'O erro mais comum é tratar Kubernetes como um produto a ser instalado, não como uma plataforma a ser operada. Cluster mal configurado, sem RBAC adequado, sem Network Policies, sem backup do etcd, sem observabilidade — o ambiente vai falhar de formas inesperadas em produção.',
      'A JPX Digital implementa Kubernetes em produção de verdade: HA, GitOps, observabilidade e segurança configurados desde o início. E quando K8s não faz sentido para o seu contexto, dizemos isso também.',
    ],
  },

  assessment: {
    name: 'Container Readiness Assessment',
    body: 'Avaliamos quais aplicações são candidatas à containerização, identificamos dependências e riscos de migração, e determinamos a arquitetura de orquestração correta — K8s gerenciado, on-prem ou Docker Compose para casos mais simples. Você recebe um plano realista antes de qualquer implantação.',
    checklist: [
      'Avaliação de viabilidade por aplicação (candidata x não candidata)',
      'Mapeamento de dependências e riscos de containerização',
      'Análise de arquitetura: K8s gerenciado vs on-prem vs Docker Compose',
      'Estimativa de esforço e benefício esperado',
      'Plano de containerização por fases',
    ],
  },

  process: {
    title: 'Nossa abordagem de containerização',
    steps: [
      { title: 'Assessment de viabilidade', desc: 'Avaliamos quais aplicações são candidatas à containerização, quais têm dependências que dificultam o processo e qual o benefício esperado. Nem tudo precisa de K8s — e dizemos isso quando é o caso.' },
      { title: 'Containerização das aplicações', desc: 'Dockerfiles otimizados com multi-stage builds, registro privado de imagens (Harbor, ECR, ACR, OCIR), políticas de versionamento e scanning de vulnerabilidades em imagens.' },
      { title: 'Setup do cluster Kubernetes', desc: 'RBAC granular, Network Policies, Ingress Controller, cert-manager para TLS automático, Horizontal Pod Autoscaler, PodDisruptionBudgets para zero-downtime e backup do etcd.' },
      { title: 'CI/CD e observabilidade', desc: 'GitOps com ArgoCD ou Flux, pipelines de CI/CD integrados ao cluster, Prometheus + Grafana + Loki. Você vê o que acontece no cluster em tempo real.' },
    ],
  },

  benefits: [
    { title: 'Deploy sem downtime', desc: 'Rolling updates, canary releases e rollback em segundos. Nova versão sem interrupção de serviço.' },
    { title: 'Escala automática', desc: 'HPA ajusta o número de pods conforme a demanda. Sem superdimensionamento permanente.' },
    { title: 'GitOps: infraestrutura como código', desc: 'Todo estado do cluster está no Git. Deploy é um commit. Rollback é um git revert.' },
    { title: 'Observabilidade nativa', desc: 'Métricas, logs e alertas configurados desde o início — não depois do primeiro incidente em produção.' },
  ],

  deliverables: [
    'Relatório de Container Readiness Assessment',
    'Dockerfiles e docker-compose por aplicação',
    'Configuração completa do cluster Kubernetes',
    'Políticas de RBAC e Network Policy documentadas',
    'Pipelines de CI/CD configurados',
    'Stack de observabilidade (Prometheus, Grafana, Loki)',
    'Runbook de operação do cluster',
    'Documentação de arquitetura containerizada',
  ],

  differentials: [
    { title: 'Kubernetes em produção, não em demo', desc: 'HA, backup do etcd, Network Policies, PodSecurityAdmission e DR do cluster configurados — não como opcional, como padrão.' },
    { title: 'GitOps como prática padrão', desc: 'Todo estado do cluster é código versionado no Git. Deploy é um pull request. Rollback é um git revert. Auditoria completa.' },
    { title: 'Observabilidade desde o início', desc: 'Prometheus, Grafana e Loki configurados antes de qualquer workload em produção. Você não descobre problemas pelo usuário reclamando.' },
    { title: 'Flexibilidade de ambiente', desc: 'K3s para edge/on-prem com restrições, AKS/EKS/OKE para cloud gerenciado, ou híbrido. A solução que faz sentido para o seu contexto.' },
  ],

  faqs,
  schemas: [
    serviceSchema('Docker e Kubernetes', 'Containerização e orquestração com Docker e Kubernetes para ambientes corporativos de produção.', 'IT Infrastructure Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Docker & Kubernetes', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}

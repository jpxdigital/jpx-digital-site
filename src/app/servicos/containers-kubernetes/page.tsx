import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
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
    answer: 'Kubernetes tem rollback nativo: `kubectl rollout undo deployment/<nome>` reverte para a versão anterior em segundos. Com GitOps (ArgoCD, Flux), o rollback é um git revert — a versão anterior é restaurada automaticamente a partir do estado desejado no repositório. Isso é um dos grandes benefícios de K8s em relação a deploys tradicionais.',
  },
  {
    question: 'A JPX Digital faz CI/CD integrado ao Kubernetes?',
    answer: 'Sim. Implementamos pipelines completos de CI/CD integrados a clusters K8s: GitHub Actions ou Azure DevOps para CI, ArgoCD ou Flux para GitOps/CD, Helm para gerenciamento de releases e políticas de rollout (canary, blue-green). O objetivo é que o deploy de nova versão seja um commit no repositório.',
  },
]

export const metadata: Metadata = {
  title: 'Docker e Kubernetes — Containerização para Produção',
  description:
    'Consultoria em Docker e Kubernetes para ambientes corporativos. Containerização, orquestração, CI/CD e GitOps. On-prem, AKS, EKS e OKE. Assessment gratuito.',
  keywords: ['docker consultoria', 'kubernetes brasil', 'containers kubernetes empresas', 'AKS consultoria', 'kubernetes on-prem'],
  openGraph: { title: 'Docker e Kubernetes | JPX Digital', description: 'Containerização, orquestração e CI/CD com Docker e Kubernetes.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Infraestrutura',
  heroHeadline: 'Docker e Kubernetes — Containerização e Orquestração para Ambientes de Produção Reais.',
  heroSub: 'Containers não são só para desenvolvimento. Implementamos Kubernetes em produção com segurança, observabilidade e CI/CD integrado.',
  intro: [
    'Containers revolucionaram como aplicações são empacotadas, distribuídas e executadas. Docker eliminou o "funciona na minha máquina". Kubernetes resolveu "como orquestrar centenas de containers em produção".',
    'A JPX Digital implementa ambientes containerizados do zero: containerização de aplicações existentes, setup de clusters Kubernetes (on-prem com K3s/RKE ou gerenciado com AKS, EKS e Oracle OKE), pipelines de CI/CD com GitOps e observabilidade com Prometheus e Grafana.',
    'Não colocamos Kubernetes onde ele não faz sentido. Nossa análise começa pela necessidade real do cliente — e só recomendamos K8s quando os benefícios justificam a complexidade operacional.',
  ],
  howTitle: 'Nossa abordagem de containerização',
  howSteps: [
    { title: 'Assessment de viabilidade', desc: 'Avaliamos quais aplicações são candidatas à containerização, quais têm dependências que dificultam o processo e qual o benefício esperado em cada caso. Nem tudo precisa de K8s.' },
    { title: 'Containerização das aplicações', desc: 'Criamos Dockerfiles otimizados, configuramos registro privado de imagens (Harbor, ECR, ACR, OCIR), implementamos multi-stage builds para imagens mínimas e definimos políticas de versionamento.' },
    { title: 'Setup do cluster Kubernetes', desc: 'Configuramos cluster K8s com separação de namespaces, RBAC granular, Network Policies, Ingress Controller, cert-manager para TLS automático, Horizontal Pod Autoscaler e PodDisruptionBudgets para zero-downtime deploys.' },
    { title: 'CI/CD e observabilidade', desc: 'Implementamos pipelines de CI/CD integrados ao cluster, GitOps com ArgoCD ou Flux, stack de observabilidade com Prometheus, Grafana e alertas. Você vê o que acontece no cluster em tempo real.' },
  ],
  differentials: [
    { title: 'Kubernetes em produção, não em demo', desc: 'Implementamos K8s com as configurações necessárias para produção: HA, backup do etcd, Network Policies, PodSecurityAdmission, storage persistente e disaster recovery do cluster.' },
    { title: 'GitOps como prática padrão', desc: 'Todo estado do cluster é código versionado no Git. Deploy de nova versão é um pull request. Rollback é um git revert. Auditoria completa de quem mudou o quê.' },
    { title: 'Observabilidade desde o início', desc: 'Prometheus, Grafana, Loki para logs e alertas configurados antes de qualquer workload em produção. Você não descobre problemas pelo usuário reclamando.' },
    { title: 'Flexibilidade de ambiente', desc: 'On-prem com K3s para edge e ambientes restritos, clusters gerenciados (AKS, EKS, OKE) para cloud, ou híbrido. A solução que faz sentido para o seu contexto.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Docker e Kubernetes', 'Containerização e orquestração com Docker e Kubernetes para ambientes corporativos de produção.', 'IT Infrastructure Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Docker & Kubernetes', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

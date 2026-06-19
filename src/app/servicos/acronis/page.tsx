import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'acronis'

const faqs = [
  {
    question: 'Acronis é mais seguro que outras soluções de backup?',
    answer: 'Acronis se diferencia por combinar backup com proteção ativa contra ransomware (Acronis Active Protection) — detecta e bloqueia tentativas de criptografar arquivos em tempo real. A maioria das soluções de backup protege dados após o ataque; o Acronis atua durante o ataque. Além disso, os backups são armazenados criptografados com AES-256.',
  },
  {
    question: 'Acronis faz backup de endpoints (notebooks e desktops) também?',
    answer: 'Sim. O Acronis Cyber Protect Home Office e o Acronis Cyber Protect Cloud cobrem endpoints — Windows, macOS e Linux. Para empresas, o Acronis Cyber Protect Cloud permite gerenciar backup de servidores e endpoints em um único painel, com políticas centralizadas.',
  },
  {
    question: 'Qual é o RTO típico com Acronis?',
    answer: 'Depende da modalidade de restauração. Para restauração de arquivo individual: minutos. Para restauração completa de servidor em hardware ou VM similar: 30 minutos a 2 horas dependendo do tamanho e velocidade do link. Para Instant Restore (boot do backup como VM): 1-5 minutos — o servidor está operando diretamente do backup enquanto a restauração completa acontece em segundo plano.',
  },
  {
    question: 'O que é o Acronis Instant Restore?',
    answer: 'Instant Restore (ou Instant VM Recovery) permite inicializar o backup diretamente como uma máquina virtual no hypervisor local (VMware, Hyper-V) em minutos — sem esperar a restauração completa do disco. O sistema está operacional enquanto a restauração acontece em segundo plano. É um dos melhores recursos para minimizar downtime em incidentes.',
  },
  {
    question: 'Acronis substitui outros controles de segurança?',
    answer: 'Não. Acronis complementa — não substitui — antivírus, EDR e outras ferramentas de segurança. O Acronis Cyber Protect inclui funcionalidades de segurança integradas (proteção anti-ransomware, avaliação de vulnerabilidades, patch management), mas a arquitetura de segurança da empresa deve ter defesa em profundidade com múltiplas camadas.',
  },
]

export const metadata: Metadata = {
  title: 'Backup com Acronis Cyber Protect — Implementação e Suporte',
  description:
    'Implementação e gestão de backup corporativo com Acronis Cyber Protect. Proteção anti-ransomware, Instant Restore e backup para cloud. Assessment gratuito.',
  keywords: ['acronis cyber protect', 'acronis backup corporativo', 'acronis implementação', 'backup acronis brasil', 'acronis instant restore'],
  openGraph: { title: 'Backup com Acronis | JPX Digital', description: 'Acronis Cyber Protect: backup, proteção anti-ransomware e recuperação instantânea.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Continuidade & Segurança',
  heroHeadline: 'Acronis Cyber Protect — Backup que Também Protege contra Ransomware em Tempo Real.',
  heroSub: 'Enquanto outras soluções protegem seus dados após o ataque, o Acronis detecta e bloqueia o ransomware durante a execução.',
  intro: [
    'Backup corporativo evoluiu. A ameaça de ransomware — que criptografa arquivos em minutos e torna o backup anterior ineficaz se não estiver protegido — exige uma solução que integre backup e proteção ativa em uma única plataforma.',
    'O Acronis Cyber Protect combina backup de imagem completa (bare-metal restore), proteção anti-ransomware com IA (Acronis Active Protection), avaliação de vulnerabilidades, patch management e Instant Restore em um único agente gerenciado centralmente.',
    'A JPX Digital é parceira Acronis e implementa, configura e gerencia ambientes Acronis para empresas de todos os portes — de PMEs com dezenas de máquinas a ambientes corporativos com centenas de endpoints e servidores.',
  ],
  howTitle: 'Nossa implementação Acronis',
  howSteps: [
    { title: 'Assessment do ambiente de backup', desc: 'Mapeamos o que precisa ser protegido: servidores, VMs, endpoints, dados críticos. Definimos RPO e RTO para cada workload e calculamos o armazenamento necessário (local + cloud).' },
    { title: 'Instalação e configuração central', desc: 'Instalamos o Acronis Cyber Infrastructure (self-hosted) ou configuramos acesso ao Acronis Cloud. Implantamos agentes em todos os sistemas e configuramos políticas de backup por grupo (frequência, retenção, destino, criptografia).' },
    { title: 'Testes de restauração documentados', desc: 'Realizamos testes de restauração completa (bare-metal, Instant Restore e granular) antes de qualquer go-live. Um backup que nunca foi testado é um backup que pode não funcionar quando for necessário.' },
    { title: 'Gestão e alertas contínuos', desc: 'Monitoramos jobs de backup diariamente, investigamos falhas antes que se tornem problemas, gerenciamos capacidade de armazenamento e realizamos testes de restauração periódicos com relatório documentado.' },
  ],
  differentials: [
    { title: 'Proteção anti-ransomware ativa', desc: 'O Acronis Active Protection detecta comportamentos de ransomware (criptografia em massa de arquivos) e os bloqueia em tempo real, restaurando automaticamente os arquivos afetados do cache local.' },
    { title: 'Instant Restore — RTO de minutos', desc: 'Em caso de falha de servidor, inicializamos o sistema diretamente do backup como VM em 1-5 minutos, enquanto a restauração completa acontece em segundo plano. Downtime de minutos, não horas.' },
    { title: 'Gestão unificada servidor e endpoint', desc: 'Um único console para gerenciar backup de servidores, VMs e notebooks da empresa. Políticas centralizadas, relatórios unificados e inventário completo do que está protegido.' },
    { title: 'Parceiro Acronis com suporte técnico', desc: 'Como parceiros Acronis, abrimos casos diretamente com o suporte técnico do fabricante quando necessário — sem depender apenas de documentação ou fórum.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Backup com Acronis Cyber Protect', 'Implementação e gestão de backup corporativo com Acronis Cyber Protect. Proteção anti-ransomware e Instant Restore.', 'IT Security Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Acronis Backup', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'hospitais-clinicas'

const faqs = [
  {
    question: 'O que a LGPD exige especificamente de hospitais e clínicas em TI?',
    answer: 'A LGPD classifica dados de saúde como dados sensíveis, com exigências reforçadas: consentimento específico do paciente para tratamento dos dados, controles de acesso rigorosos (apenas quem precisa acessa), criptografia em trânsito e repouso, registros de auditoria de acesso e, em caso de incidente, notificação à ANPD e aos titulares afetados. A ANPD tem aplicado multas crescentes ao setor de saúde.',
  },
  {
    question: 'Quanto tempo mínimo os prontuários eletrônicos devem ser retidos?',
    answer: 'O CFM (Conselho Federal de Medicina) exige retenção mínima de 20 anos para prontuários eletrônicos. Isso significa que o backup precisa garantir integridade e recuperabilidade por ao menos 20 anos — com testes periódicos de restauração. A perda ou corrupção de prontuários é uma responsabilidade civil e regulatória grave.',
  },
  {
    question: 'Como garantir que o sistema do hospital não fique fora do ar durante cirurgias?',
    answer: 'Alta disponibilidade para ambientes hospitalares exige: links de internet redundantes (dois provedores distintos) com failover automático, servidores em cluster (failover em minutos), storage redundante, nobreaks e gerador para continuidade de energia, e testes periódicos de failover simulando falhas reais. Para sistemas críticos de sala cirúrgica, avaliamos soluções com SLA de 99,99%.',
  },
  {
    question: 'O que é necessário para atender às exigências de auditoria de acesso a dados de saúde?',
    answer: 'Auditoria de acesso exige: log completo de quem acessou quais dados, quando e de onde; autenticação individual por usuário (sem logins compartilhados); controle de acesso baseado em papel (médico vê apenas seus pacientes, recepção vê dados administrativos); e retenção dos logs de auditoria por período compatível com as obrigações legais. A JPX Digital implementa esses controles integrados ao sistema de TI existente.',
  },
  {
    question: 'Como funciona o Disaster Recovery para hospitais com dados críticos?',
    answer: 'Para hospitais, o DR precisa cobrir o cenário de ransomware (o mais comum no setor de saúde) além de falhas técnicas. Isso exige: backups off-site imutáveis (que ransomware não consegue criptografar), RTO e RPO definidos para cada sistema (HIS, PACS, faturamento), plano de contingência manual para operar sem TI por horas e testes de recuperação completa ao menos semestral.',
  },
]

export const metadata: Metadata = {
  title: 'TI para Hospitais e Clínicas — LGPD, Backup e Alta Disponibilidade',
  description:
    'Infraestrutura de TI especializada para hospitais e clínicas: LGPD na saúde, backup de prontuários, alta disponibilidade e Disaster Recovery. Consultoria especializada.',
  keywords: ['TI para hospitais', 'LGPD saúde', 'backup prontuário eletrônico', 'disaster recovery hospital', 'segurança de dados médicos'],
  openGraph: { title: 'TI para Hospitais e Clínicas | JPX Digital', description: 'LGPD, backup de prontuários e alta disponibilidade para saúde.', url: `${BASE}/segmentos/${slug}` },
  alternates: { canonical: `${BASE}/segmentos/${slug}` },
}

const content = {
  slug,
  category: 'Segmento de Saúde',
  baseSection: { name: 'Segmentos', href: '/segmentos' },
  heroHeadline: 'TI para Hospitais e Clínicas — Infraestrutura que não Para, Dados que não Vazam.',
  heroSub: 'Ambientes de saúde exigem o mais alto nível de disponibilidade, segurança de dados e conformidade regulatória. Um sistema fora do ar pode custar vidas. Um dado vazado, multas e processos.',
  intro: [
    'O setor de saúde é o mais visado por ransomware no Brasil. Prontuários, imagens e dados de faturamento são alvos de alto valor. Uma paralisação vai muito além do prejuízo financeiro.',
    'A LGPD trata dados de saúde como sensíveis: acesso granular, criptografia obrigatória e notificação à ANPD. O CFM exige retenção de prontuários por 20 anos. Não endereçar essas obrigações cria risco regulatório grave.',
    'A JPX Digital atua com backup imutável off-site, alta disponibilidade e planos de DR testados — desenhados para o cenário de ransomware hospitalar, o mais provável no setor.',
  ],
  howTitle: 'Como atuamos no setor de saúde',
  howSteps: [
    { title: 'Assessment de conformidade e risco', desc: 'Avaliamos o ambiente contra as exigências da LGPD para dados sensíveis, requisitos do CFM para prontuários, riscos de segurança críticos (controle de acesso, criptografia, vulnerabilidades) e nível de disponibilidade da infraestrutura atual.' },
    { title: 'Proteção de dados e controle de acesso', desc: 'Implementamos criptografia de dados em trânsito e repouso, controle de acesso baseado em papel (RBAC) com autenticação individual, logs de auditoria de acesso e segmentação de rede para isolar equipamentos médicos da rede corporativa.' },
    { title: 'Backup e retenção de longo prazo', desc: 'Configuramos backup de prontuários e imagens PACS com retenção de 20+ anos, backups imutáveis off-site (à prova de ransomware), testes de restauração documentados periodicamente e procedimento de recuperação para o sistema de prontuário eletrônico.' },
    { title: 'Alta disponibilidade e DR', desc: 'Implementamos redundância de links, cluster de servidores, failover de storage e plano de Disaster Recovery testado. Definimos RTO e RPO para cada sistema crítico e treinamos a equipe para operar em modo degradado enquanto a TI é restaurada.' },
  ],
  differentials: [
    { title: 'Conhecimento da regulação do setor', desc: 'LGPD para dados sensíveis de saúde, CFM para prontuários eletrônicos, requisitos de auditoria de acesso. Nossa equipe conhece o que é exigido do setor — não apenas o que é bom em TI genérica.' },
    { title: 'Foco em ransomware como ameaça principal', desc: 'O setor de saúde é o mais atacado por ransomware no Brasil. Nossa abordagem de backup e segurança é desenhada especificamente para esse cenário — backups imutáveis, segmentação e resposta a incidentes.' },
    { title: 'Alta disponibilidade para sistemas de vida', desc: 'Sistemas de prescrição, sala cirúrgica e UTI não podem parar. Projetamos disponibilidade compatível com o nível de criticidade de cada sistema — com testes reais de failover.' },
    { title: 'Retenção de 20 anos com recuperabilidade garantida', desc: 'Backup de prontuário que não pode ser restaurado em 15 anos não serve. Implementamos verificação periódica de integridade e procedimento de restauração documentado para retenção de longo prazo.' },
  ],
  faqs,
  schemas: [
    serviceSchema('TI para Hospitais e Clínicas', 'Infraestrutura de TI especializada para saúde: LGPD, backup de prontuários, alta disponibilidade e Disaster Recovery.', 'Healthcare IT Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Segmentos', item: `${BASE}/segmentos` }, { name: 'Hospitais e Clínicas', item: `${BASE}/segmentos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

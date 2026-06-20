import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'autoridades-certificadoras'

const faqs = [
  {
    question: 'O que é necessário para uma AC obter credenciamento ITI?',
    answer: 'O credenciamento junto ao ITI exige cumprimento das Declarações de Práticas de Certificação (DPC), Política de Certificação (PC) e dos requisitos da DOC-ICP-05 e documentos relacionados. Na parte técnica: HSM certificado FIPS 140-2 Level 3 ou superior, sala cofre com controle de acesso físico rigoroso, plano de DR documentado, controles de segurança da informação auditáveis e registros de auditoria. A JPX Digital conhece esses requisitos e estrutura a infraestrutura para atendê-los.',
  },
  {
    question: 'Por que usar OpenShift/OKD em uma AC?',
    answer: 'Ambientes de AC exigem alta disponibilidade, controle rigoroso de versões de software e auditabilidade de todas as operações. OpenShift/OKD oferece um ambiente Kubernetes enterprise com namespaces isolados para produção e homologação, rollout controlado de atualizações, integração com políticas de segurança e conformidade, e operação em ambientes air-gapped quando necessário para o ambiente de CA raiz.',
  },
  {
    question: 'Qual o nível de sala cofre exigido para operar uma AC ICP-Brasil?',
    answer: 'O ITI exige proteção física compatível com o nível de risco da AC. Para ACs que operam HSMs com chaves raiz, o padrão recomendado é sala cofre EN 1047-2 com resistência a fogo, explosão e acesso não autorizado, com controle biométrico e câmeras de CFTV com retenção de auditoria. A JPX Digital projeta e implementa salas cofre desde o leiaute físico até os sistemas de controle de acesso.',
  },
  {
    question: 'HSM em cluster é obrigatório para operação de AC?',
    answer: 'Não é formalmente obrigatório pela norma, mas é indispensável para operação contínua sem risco de perda de chaves. HSM em cluster ativo-passivo garante failover automático sem perda de acesso às chaves privadas da AC — fundamental para manter o SLA de emissão de certificados. A perda das chaves da AC invalida todos os certificados emitidos, o que é um cenário catastrófico para qualquer AC.',
  },
  {
    question: 'A JPX Digital oferece suporte pós-credenciamento?',
    answer: 'Sim. Prestamos suporte gerenciado de infraestrutura para ACs já credenciadas: manutenção de clusters VMware e OpenShift, monitoramento 24/7 dos sistemas, gestão de backups de configuração dos HSMs, suporte a auditorias ITI e atualização de infraestrutura conforme evolução dos requisitos ICP-Brasil.',
  },
]

export const metadata: Metadata = {
  title: 'TI para Autoridades Certificadoras — Sala Cofre N4, HSM, OpenShift e VMware',
  description:
    'Infraestrutura especializada para Autoridades Certificadoras ICP-Brasil: sala cofre Nível 4, clusters HSM, VMware vSphere, OpenShift/OKD e suporte ao credenciamento ITI.',
  keywords: ['autoridade certificadora ICP-Brasil', 'infraestrutura para AC', 'sala cofre nível 4', 'HSM cluster', 'OpenShift AC', 'credenciamento ITI'],
  openGraph: { title: 'TI para Autoridades Certificadoras | JPX Digital', description: 'Sala cofre N4, HSM, VMware e OpenShift para ACs ICP-Brasil.', url: `${BASE}/segmentos/${slug}` },
  alternates: { canonical: `${BASE}/segmentos/${slug}` },
}

const content = {
  slug,
  category: 'Segmento Regulado',
  baseSection: { name: 'Segmentos', href: '/segmentos' },
  heroHeadline: 'TI para Autoridades Certificadoras — Infraestrutura que Suporta o Credenciamento ITI.',
  heroSub: 'Sala cofre Nível 4, clusters HSM, VMware vSphere e OpenShift/OKD — a stack técnica que uma AC ICP-Brasil precisa para operar com segurança, disponibilidade e conformidade.',
  intro: [
    'Autoridades Certificadoras operam a infraestrutura mais crítica da identidade digital brasileira. Qualquer falha — física, lógica ou de disponibilidade — compromete a cadeia de confiança ICP-Brasil.',
    'O ITI exige controles técnicos rigorosos: HSMs certificados FIPS 140-2 Level 3+, sala cofre com proteção física comprovada, sistemas auditáveis e planos de DR documentados. A JPX Digital conhece esses requisitos e projeta infraestrutura para atendê-los.',
    'Atendemos ACs em credenciamento inicial e ACs já credenciadas que precisam modernizar ou expandir sua infraestrutura técnica — com suporte a auditorias ITI e às exigências das Declarações de Práticas de Certificação.',
  ],
  howTitle: 'Como estruturamos a infraestrutura de uma AC',
  howSteps: [
    { title: 'Assessment de conformidade técnica', desc: 'Mapeamos os requisitos técnicos das normas ICP-Brasil aplicáveis (DOC-ICP-05, DPC da AC, Política de Segurança) e avaliamos a infraestrutura existente. Entregamos um gap analysis com os controles a implementar antes da auditoria ITI.' },
    { title: 'Sala cofre e segurança física', desc: 'Projetamos e implementamos a sala cofre com proteção compatível com o nível de risco da AC: resistência ao fogo EN 1047-2, controle de acesso biométrico com dupla custódia para o HSM, CFTV com retenção conforme requisito de auditoria e sistemas de supressão de incêndio sem danos aos equipamentos.' },
    { title: 'Cluster HSM e alta disponibilidade', desc: 'Implantamos o HSM em configuração de cluster ativo-passivo (Thales Luna, Entrust nShield ou similar), com failover automático em caso de falha de hardware. Configuramos as partições do HSM, políticas de acesso e procedimentos de cerimônia de chaves documentados.' },
    { title: 'Plataforma de aplicação e DR', desc: 'OpenShift/OKD para o portal de Autoridade de Registro (RA) e sistemas de gestão de certificados — com ambientes de produção e homologação isolados, pipelines de atualização controlados e namespaces de segurança. VMware vSphere para a camada de virtualização do ambiente de CA. Plano de DR com RTO e RPO compatíveis com os requisitos ICP-Brasil.' },
  ],
  differentials: [
    { title: 'Conhecimento do ambiente ICP-Brasil', desc: 'Entendemos a hierarquia de confiança ICP-Brasil: AC Raiz, ACs de primeiro e segundo nível, ACs Subordinadas e Autoridades de Registro. Projetamos a infraestrutura considerando as especificidades de cada papel na cadeia.' },
    { title: 'Sala cofre Nível 4 e segurança física', desc: 'Projeto, implantação, manutenção periódica e auditoria: sala cofre EN 1047-2 com controle biométrico, CFTV auditável e supressão sem danos ao HSM. Laudos técnicos para auditorias ITI.' },
    { title: 'OpenShift/OKD para ambientes regulados', desc: 'Plataforma Kubernetes enterprise com capacidade de operar em ambiente air-gapped, controle granular de políticas de segurança, namespaces isolados entre produção e homologação e suporte a auditoria de operações.' },
    { title: 'VMware vSphere para infraestrutura core', desc: 'Cluster VMware vSphere com HA e DRS para a camada de virtualização da AC — maturidade comprovada, compatibilidade com workloads críticos e integração com ferramentas de backup e DR corporativas.' },
  ],
  faqs,
  schemas: [
    serviceSchema('TI para Autoridades Certificadoras', 'Infraestrutura técnica para ACs ICP-Brasil: sala cofre N4, clusters HSM, VMware e OpenShift. Suporte ao credenciamento ITI.', 'IT Infrastructure Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Segmentos', item: `${BASE}/segmentos` }, { name: 'Autoridades Certificadoras', item: `${BASE}/segmentos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

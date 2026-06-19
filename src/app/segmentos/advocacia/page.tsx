import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'advocacia'

const faqs = [
  {
    question: 'Quais são os riscos específicos de um vazamento de dados em escritório de advocacia?',
    answer: 'As consequências são graves em múltiplas frentes: violação do sigilo profissional (obrigação ética e legal do advogado), responsabilidade civil perante clientes afetados, sanções da LGPD pela ANPD (multas de até 2% do faturamento, limitadas a R$ 50M por infração), possível processo disciplinar na OAB e dano reputacional irreversível. Dados jurídicos têm alto valor comercial — contratos, estratégias de litígio, informações corporativas confidenciais.',
  },
  {
    question: 'O escritório de advocacia precisa de DPO (Encarregado de Dados)?',
    answer: 'A LGPD torna o DPO obrigatório para organizações que tratam dados pessoais sensíveis em larga escala ou dados de crianças. Escritórios de advocacia que processam dados pessoais de muitos clientes devem avaliar a necessidade. Independente da obrigatoriedade formal, um DPO (interno ou externo) ajuda a estruturar os processos de privacidade e responder a incidentes com menor risco regulatório.',
  },
  {
    question: 'Como proteger documentos e e-mails confidenciais de acesso não autorizado?',
    answer: 'A proteção começa pela base: MFA obrigatório em todos os acessos, criptografia de dispositivos (BitLocker no Windows, FileVault no macOS), controle de acesso por pasta/projeto (advogado acessa apenas os casos em que atua), DLP (Data Loss Prevention) para evitar exfiltração de documentos, e registro de auditoria de quem acessou quais documentos. Para e-mails, criptografia S/MIME ou solução de e-mail seguro.',
  },
  {
    question: 'O que acontece com os dados dos clientes se o escritório sofrer um ataque ransomware?',
    answer: 'Sem backup adequado: perda de todos os documentos, impossibilidade de atender clientes com processos em andamento e potencial violação de prazos processuais. Com backup correto: recuperação dos dados a partir do último backup (horas ou dias antes do ataque), com impacto controlado. O backup de escritório de advocacia precisa incluir documentos, e-mails, banco de dados do sistema jurídico e configurações.',
  },
  {
    question: 'Assinatura digital e certificado digital precisam de infraestrutura específica?',
    answer: 'Certificados digitais (ICP-Brasil) A1 (arquivo no computador) ou A3 (token/cartão) requerem configuração correta dos dispositivos, backup seguro dos certificados A1 e gestão do ciclo de vida (renovação antes do vencimento). Escritórios com muitos sócios e certificados precisam de controle centralizado para não perder certificados vencidos em momentos críticos.',
  },
]

export const metadata: Metadata = {
  title: 'TI para Escritórios de Advocacia — Sigilo, LGPD e Backup Jurídico',
  description:
    'Infraestrutura de TI especializada para escritórios de advocacia: proteção do sigilo profissional, LGPD, backup de documentos jurídicos e certificados digitais. Consultoria especializada.',
  keywords: ['TI para advocacia', 'segurança dados escritório advocacia', 'LGPD escritório de advocacia', 'backup jurídico', 'proteção sigilo profissional TI'],
  openGraph: { title: 'TI para Escritórios de Advocacia | JPX Digital', description: 'Sigilo, LGPD e backup jurídico para escritórios de advocacia.', url: `${BASE}/segmentos/${slug}` },
  alternates: { canonical: `${BASE}/segmentos/${slug}` },
}

const content = {
  slug,
  category: 'Segmento Jurídico',
  baseSection: { name: 'Segmentos', href: '/segmentos' },
  heroHeadline: 'TI para Escritórios de Advocacia — Sigilo Profissional Protegido por Infraestrutura que Leva Segurança a Sério.',
  heroSub: 'Dados dos seus clientes são sigilosos por obrigação ética e legal. Um vazamento não é só um incidente de TI — é uma violação de confiança com consequências profissionais graves.',
  intro: [
    'Escritórios de advocacia guardam alguns dos dados mais sensíveis do mundo corporativo: estratégias de litígio, contratos confidenciais, comunicações sigilosas advogado-cliente e informações financeiras de empresas e pessoas físicas. São ativos de altíssimo valor para concorrentes, para a parte adversária em processos e para criminosos.',
    'A LGPD se aplica integralmente a escritórios de advocacia. Dados de clientes pessoa física são dados pessoais. Dados de processos envolvendo saúde, origem racial ou outras categorias sensíveis têm proteção reforçada. O sigilo profissional previsto no Código de Ética da OAB tem implicações que vão além da regulação de TI.',
    'A JPX Digital estrutura a TI de escritórios de advocacia com foco no que o setor exige: controle de acesso granular por caso e cliente, criptografia em todos os pontos de dado, backup imutável à prova de ransomware, gestão de certificados digitais e rastreabilidade de acesso para auditorias.',
  ],
  howTitle: 'Como estruturamos a TI do escritório',
  howSteps: [
    { title: 'Assessment de risco e conformidade', desc: 'Avaliamos o ambiente contra as obrigações da LGPD para dados de clientes, os requisitos de sigilo profissional e os riscos de segurança mais comuns em escritórios de advocacia (phishing, ransomware, acesso não autorizado). Entregamos diagnóstico com riscos priorizados.' },
    { title: 'Controle de acesso e rastreabilidade', desc: 'Implementamos acesso por pasta e processo (cada advogado acessa apenas os casos em que atua), MFA em todos os sistemas, registro de auditoria de acesso a documentos e criptografia de dispositivos. Rastreabilidade completa de quem acessou o quê e quando.' },
    { title: 'Backup jurídico e certificados', desc: 'Backup de documentos, e-mails, banco de dados do sistema jurídico e certificados digitais A1. Backups imutáveis off-site (à prova de ransomware), retenção compatível com as obrigações legais e testes de restauração periódicos. Gestão de vencimento de certificados para evitar surpresas.' },
    { title: 'E-mail seguro e comunicação protegida', desc: 'Microsoft 365 com proteção avançada de e-mail, DLP (prevenção de exfiltração de documentos por e-mail), e-mail criptografado para comunicação com clientes que exigem e gestão centralizada de certificados S/MIME quando aplicável.' },
  ],
  differentials: [
    { title: 'Consciência do sigilo profissional', desc: 'Não tratamos a TI do escritório de advocacia como um escritório genérico. Entendemos que sigilo não é opcional — é obrigação ética com consequências disciplinares — e projetamos a infraestrutura com isso em mente.' },
    { title: 'Controle de acesso por caso e cliente', desc: 'Cada advogado acessa apenas os documentos dos casos em que atua. Colaborador administrativo tem acesso restrito aos documentos necessários para sua função. Controle granular, não apenas login único para toda a rede.' },
    { title: 'Backup à prova de ransomware', desc: 'O setor jurídico é alvo frequente de ransomware justamente pelo valor dos dados. Backups imutáveis off-site garantem recuperação mesmo que o atacante tente destruir os backups locais.' },
    { title: 'Gestão de certificados digitais', desc: 'Certificado vencido no dia de uma petição de prazo fatal é uma crise real. Gerenciamos o ciclo de vida dos certificados do escritório e enviamos alertas antecipados de vencimento.' },
  ],
  faqs,
  schemas: [
    serviceSchema('TI para Escritórios de Advocacia', 'Infraestrutura de TI especializada para advocacia: sigilo profissional, LGPD e backup jurídico.', 'Legal IT Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Segmentos', item: `${BASE}/segmentos` }, { name: 'Advocacia', item: `${BASE}/segmentos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

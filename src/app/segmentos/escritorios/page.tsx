import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'escritorios'

const faqs = [
  {
    question: 'Qual é o custo mensal típico de TI para um escritório de 20-50 pessoas?',
    answer: 'Varia muito por nível de serviço e infraestrutura. Um escritório de 20-50 pessoas com suporte gerenciado básico (monitoramento, helpdesk, backup e segurança de endpoint) pode esperar investir entre R$ 3.000 e R$ 8.000 por mês, dependendo do nível de SLA e dos sistemas utilizados. Um assessment identifica onde está o desperdício atual e o custo-benefício de cada alternativa.',
  },
  {
    question: 'Microsoft 365 ou Google Workspace — qual é melhor para escritórios?',
    answer: 'Microsoft 365 é a escolha predominante em escritórios que usam Word, Excel e PowerPoint intensivamente, precisam de integração com Active Directory, ou têm clientes que exigem compatibilidade de formato. Google Workspace tem vantagem em colaboração em tempo real e custo em ambientes cloud-first. Para a maioria dos escritórios brasileiros, M365 é a escolha mais natural — mas o backup do M365 é responsabilidade do cliente, não da Microsoft.',
  },
  {
    question: 'Como proteger o home office dos colaboradores sem comprometer segurança?',
    answer: 'A abordagem moderna usa uma combinação de: VPN ou ZTNA para acesso à rede corporativa, MDM (Mobile Device Management) para gerenciar dispositivos remotos, MFA obrigatório em todos os acessos, EDR nos endpoints e políticas de acesso condicional (acesso de dispositivo não gerenciado tem permissões limitadas). Tudo isso pode ser implementado sem comprometer a experiência do usuário remoto.',
  },
  {
    question: 'O escritório precisa de servidor físico local ou pode ser tudo na nuvem?',
    answer: 'Depende dos sistemas utilizados. Escritórios que usam apenas SaaS (M365, CRM cloud, ERP cloud) podem operar sem servidor local. Escritórios com software de gestão on-premise, arquivo compartilhado de grande volume ou sistemas que exigem baixa latência ainda precisam de servidor local ou co-location. Avaliamos caso a caso — não existe resposta única.',
  },
  {
    question: 'Como garantir que o backup dos notebooks dos colaboradores é feito corretamente?',
    answer: 'Backup de endpoint é frequentemente negligenciado — e é onde ficam os documentos mais críticos. Soluções como Acronis Cyber Protect ou Veeam Agent para Windows fazem backup automático dos notebooks para storage centralizado (servidor local ou cloud), com política definida de retenção e relatório de status. Você sabe quais máquinas estão com backup em dia.',
  },
]

export const metadata: Metadata = {
  title: 'TI para Escritórios — Microsoft 365, Backup e Suporte Gerenciado',
  description:
    'Infraestrutura de TI para escritórios: Microsoft 365, backup de endpoints, home office seguro e suporte gerenciado. TI estável e previsível para escritórios de todos os portes.',
  keywords: ['TI para escritórios', 'microsoft 365 para empresas', 'suporte TI escritório', 'backup notebook empresa', 'home office seguro corporativo'],
  openGraph: { title: 'TI para Escritórios | JPX Digital', description: 'Microsoft 365, backup e suporte gerenciado para escritórios produtivos.', url: `${BASE}/segmentos/${slug}` },
  alternates: { canonical: `${BASE}/segmentos/${slug}` },
}

const content = {
  slug,
  category: 'Segmento Corporativo',
  baseSection: { name: 'Segmentos', href: '/segmentos' },
  heroHeadline: 'TI para Escritórios — Produtividade, Colaboração e Segurança para Equipes de Qualquer Tamanho.',
  heroSub: 'TI que não trava reunião, não perde arquivo e não deixa colaborador remoto sem acesso. Suporte que resolve antes de você precisar ligar.',
  intro: [
    'Escritórios modernos dependem de TI para quase tudo: e-mail, documentos compartilhados, videoconferência, acesso ao ERP e ao CRM, impressão, Wi-Fi. Quando a TI falha, a operação para. Quando é mal configurada, dados ficam em risco. Quando não é gerenciada, os problemas acumulam em silêncio até virar crise.',
    'A JPX Digital oferece infraestrutura e suporte de TI para escritórios de 10 a 500 colaboradores: Microsoft 365 (licenciamento, configuração, segurança e backup), gestão de dispositivos (Windows, macOS), home office seguro, backup de endpoints e suporte proativo com SLA.',
    'Nossa abordagem começa pelo assessment: entendemos o que existe, o que funciona bem, o que está em risco e o que pode ser simplificado. Muitos escritórios pagam por soluções redundantes ou têm lacunas críticas de segurança sem saber.',
  ],
  howTitle: 'Como estruturamos a TI do seu escritório',
  howSteps: [
    { title: 'Assessment do ambiente atual', desc: 'Inventariamos todos os dispositivos, serviços e licenças. Identificamos gaps de segurança (sem MFA, backup incompleto, endpoints desprotegidos), desperdício (licenças não utilizadas, serviços duplicados) e riscos de disponibilidade.' },
    { title: 'Microsoft 365 como plataforma', desc: 'Configuramos M365 corretamente: Exchange Online com proteção anti-spam e anti-phishing, SharePoint e OneDrive para colaboração, Intune para gerenciamento de dispositivos, MFA obrigatório e políticas de acesso condicional. E backup externo do M365 — porque a Microsoft não garante recuperação de dados deletados.' },
    { title: 'Segurança de endpoint e home office', desc: 'EDR nos endpoints Windows e macOS, VPN ou ZTNA para acesso remoto, políticas de senha e MFA em todos os serviços, e gestão centralizada de dispositivos (incluindo dispositivos remotos). O colaborador em home office tem o mesmo nível de proteção do escritório.' },
    { title: 'Suporte proativo e previsível', desc: 'Monitoramento dos sistemas críticos, gestão de patches, backup verificado diariamente e helpdesk com SLA definido. Relatório mensal com status do ambiente. Você sabe o que está acontecendo na sua TI sem precisar perguntar.' },
  ],
  differentials: [
    { title: 'M365 configurado, não apenas instalado', desc: 'Microsoft 365 com configurações de segurança padrão tem lacunas conhecidas. Configuramos MFA, acesso condicional, proteção avançada de e-mail e políticas de dispositivo — o pacote completo, não apenas as licenças.' },
    { title: 'Backup do M365 incluso', desc: 'A Microsoft não garante recuperação de e-mails e arquivos deletados além de períodos curtos. Incluímos backup externo de Exchange, SharePoint e OneDrive em todos os projetos de M365.' },
    { title: 'Home office sem comprometer segurança', desc: 'Colaborador remoto com acesso ao mesmo nível de segurança do escritório: dispositivo gerenciado, MFA, VPN ou ZTNA e EDR. Produtividade e segurança não são opostos.' },
    { title: 'Suporte com SLA e relatório mensal', desc: 'Tempo de resposta por criticidade em contrato, monitoramento proativo e relatório mensal com disponibilidade e incidentes. Você tem clareza do valor que está recebendo.' },
  ],
  faqs,
  schemas: [
    serviceSchema('TI para Escritórios', 'Infraestrutura e suporte gerenciado de TI para escritórios: Microsoft 365, backup e home office seguro.', 'IT Support Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Segmentos', item: `${BASE}/segmentos` }, { name: 'Escritórios', item: `${BASE}/segmentos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'resiliencia-cibernetica'

const faqs = [
  {
    question: 'Qual é a diferença entre resiliência cibernética e segurança da informação?',
    answer: 'Segurança da informação foca em prevenir incidentes. Resiliência cibernética vai além: assume que ataques vão acontecer e garante que a organização consiga detectar, responder e recuperar rapidamente. Uma empresa resiliente não apenas tenta não ser atacada — ela está preparada para operar mesmo sob ataque.',
  },
  {
    question: 'O que é hardening de servidores e por que é importante?',
    answer: 'Hardening é o processo de fortalecer a configuração de servidores, redes e sistemas para reduzir a superfície de ataque. Inclui desabilitar serviços desnecessários, aplicar configurações seguras (CIS Benchmarks), gerenciar acessos privilegiados e configurar auditoria de eventos. Um servidor não-hardened tem dezenas de vetores de ataque evitáveis.',
  },
  {
    question: 'Minha empresa é pequena demais para precisar de monitoramento contínuo?',
    answer: 'Não existe empresa pequena demais para ser atacada — existe empresa pequena com poucos recursos para se recuperar. Empresas menores frequentemente têm menos controles de segurança e são alvos mais fáceis para ransomware e engenharia social. O custo de um incidente tende a ser proporcionalmente maior do que o custo da prevenção.',
  },
  {
    question: 'O que é a abordagem Zero Trust?',
    answer: 'Zero Trust é o princípio de que nenhum usuário, dispositivo ou rede é confiável por padrão — mesmo dentro da rede corporativa. Toda solicitação de acesso é verificada, autenticada e autorizada com base em identidade, dispositivo, localização e contexto. É o modelo oposto ao "confie em quem está dentro do firewall".',
  },
  {
    question: 'O que fazer se já sofremos um ataque cibernético?',
    answer: 'O primeiro passo é isolar os sistemas comprometidos para conter o dano. Depois: identificar o escopo do incidente, ativar o plano de resposta a incidentes (se houver) e iniciar a recuperação a partir de um ponto limpo. A JPX Digital oferece suporte em resposta a incidentes — entre em contato imediatamente. Quanto mais rápido a contenção, menor o dano.',
  },
]

export const metadata: Metadata = {
  title: 'Resiliência Cibernética para Empresas',
  description:
    'Hardening, monitoramento contínuo e resposta a incidentes para ambientes corporativos críticos. Arquitetura Zero Trust baseada em CIS Controls e NIST.',
  keywords: ['resiliência cibernética', 'segurança da informação empresas', 'hardening de servidores', 'zero trust', 'SIEM empresarial', 'resposta a incidentes'],
  openGraph: {
    title: 'Resiliência Cibernética para Empresas | JPX Digital',
    description: 'Hardening, monitoramento e resposta a incidentes para ambientes críticos. Arquitetura Zero Trust.',
    url: `${BASE}/servicos/${slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Segurança',
  heroHeadline: 'Resiliência Cibernética — Prevenir, Detectar e Recuperar Antes que o Ataque Comprometa o Negócio.',
  heroSub:
    'Segurança não é um produto. É uma arquitetura de defesa em profundidade que precisa ser construída, testada e continuamente evoluída.',
  intro: [
    'Cibersegurança não é uma caixa de antivírus. É uma arquitetura de defesa em profundidade que combina prevenção técnica, monitoramento contínuo, resposta estruturada e capacidade de recuperação rápida.',
    'A JPX Digital constrói e sustenta essa arquitetura para empresas que não podem aprender com um incidente real. Trabalhamos com frameworks internacionais — CIS Controls, NIST CSF — adaptados para a realidade de ambientes corporativos brasileiros.',
    'Nossa abordagem é Zero Trust por princípio: nenhum usuário, dispositivo ou conexão é confiável por padrão, mesmo dentro da rede corporativa. Cada acesso é verificado, cada evento é registrado, cada anomalia é investigada.',
  ],
  howTitle: 'Nossa arquitetura de resiliência cibernética',
  howSteps: [
    {
      title: 'Security Assessment e mapeamento de riscos',
      desc: 'Avaliamos a superfície de ataque atual: configurações de rede, exposição de serviços, gestão de identidades, controles de acesso privilegiado e higiene de patches. Entregamos relatório de riscos priorizado por impacto.',
    },
    {
      title: 'Hardening e remediação',
      desc: 'Aplicamos configurações baseadas em CIS Benchmarks para Windows Server, Linux, redes e endpoints. Desabilitamos serviços desnecessários, endurecemos políticas de senha, implementamos MFA e gerenciamos acessos privilegiados (PAM).',
    },
    {
      title: 'Implantação de monitoramento e alertas',
      desc: 'Configuramos coleta centralizada de logs, correlação de eventos (SIEM), alertas para comportamentos anômalos e dashboard de visibilidade. Você sabe o que acontece na sua infraestrutura 24/7.',
    },
    {
      title: 'Plano de resposta a incidentes e simulações',
      desc: 'Documentamos o plano de resposta — quem faz o quê, em qual sequência, com quais ferramentas — e realizamos simulações de ataque (tabletop exercises e, opcionalmente, pentest) para validar a capacidade de resposta.',
    },
  ],
  differentials: [
    {
      title: 'Baseado em CIS Controls e NIST CSF',
      desc: 'Não inventamos frameworks. Aplicamos os padrões internacionais mais amplamente reconhecidos, adaptados para a realidade da sua empresa — sem cerimônia desnecessária.',
    },
    {
      title: 'Abordagem Zero Trust de ponta a ponta',
      desc: 'Identidade, dispositivo, rede, aplicação. Cada camada é verificada. Não existe "dentro do escritório = confiável" no nosso modelo.',
    },
    {
      title: 'Monitoramento 24/7 com correlação de eventos',
      desc: 'Logs centralizados, correlação automática e alertas de comportamento anômalo. Você é avisado de um ataque em andamento — não depois que o dano já está feito.',
    },
    {
      title: 'Resposta a incidentes documentada e testada',
      desc: 'Plano de resposta com runbooks detalhados, contatos de escalação e fluxos de decisão. Testado em simulações — não descoberto durante um incidente real.',
    },
  ],
  faqs,
  schemas: [
    serviceSchema(
      'Resiliência Cibernética',
      'Hardening, monitoramento contínuo, resposta a incidentes e arquitetura Zero Trust para ambientes corporativos críticos.',
      'Cybersecurity Service'
    ),
    breadcrumbSchema([
      { name: 'Home', item: BASE },
      { name: 'Serviços', item: `${BASE}/servicos` },
      { name: 'Resiliência Cibernética', item: `${BASE}/servicos/${slug}` },
    ]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}

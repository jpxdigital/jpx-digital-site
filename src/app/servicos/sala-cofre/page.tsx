import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'sala-cofre'

const faqs = [
  {
    question: 'O que é uma sala cofre e qual a diferença entre os níveis?',
    answer: 'Sala cofre é um ambiente físico blindado para proteção de equipamentos críticos — servidores, HSMs, storage e racks — contra fogo, explosão, acesso não autorizado e ataques físicos. Os níveis seguem a norma EN 1047-2: Nível 1 (proteção básica contra fogo) até Nível 4 (máxima resistência a fogo, explosão, ferramentas e ataque físico prolongado). O Nível 4 é exigido por Autoridades Certificadoras ICP-Brasil e ambientes de missão crítica com regulações severas.',
  },
  {
    question: 'Quais ambientes ou regulações exigem sala cofre?',
    answer: 'Autoridades Certificadoras ICP-Brasil (requisito técnico do ITI), instituições financeiras sob regulação do Banco Central (BACEN), operadoras de telecomunicações, órgãos governamentais com dados sigilosos e ambientes que precisam de certificação PCI-DSS, ISO 27001 ou SOC 2. Mesmo sem obrigação regulatória, qualquer organização com HSMs, chaves criptográficas ou equipamentos insubstituíveis se beneficia de uma sala cofre.',
  },
  {
    question: 'O que inclui a manutenção periódica de sala cofre?',
    answer: 'A manutenção preventiva cobre: inspeção dos sistemas de controle de acesso (biometria, leitor de crachá, fechaduras eletromagnéticas), teste de integridade das vedações contra fogo e fumaça, verificação do sistema de supressão de incêndio (agente limpo, sem danos aos equipamentos), revisão do CFTV e retenção das gravações, teste dos sensores ambientais (temperatura, umidade, fumaça) e atualização do relatório de conformidade. A periodicidade recomendada é semestral ou conforme exigência regulatória.',
  },
  {
    question: 'Como é feita a auditoria física de um ambiente existente?',
    answer: 'A auditoria avalia o ambiente contra a norma de referência (EN 1047-2, ABNT NBR, requisitos específicos do regulador). Verificamos: integridade estrutural da sala, estado dos sistemas de controle de acesso, funcionamento do CFTV e retenção de logs, cobertura do sistema de supressão, condições ambientais e registro de quem acessou o ambiente. Ao final, entregamos um laudo técnico com conformidades, não conformidades e plano de adequação com prazo.',
  },
  {
    question: 'A JPX Digital executa a obra da sala cofre ou apenas projeta?',
    answer: 'Executamos o ciclo completo: projeto (levantamento de requisitos, especificação técnica, planta do ambiente), coordenação da implantação (fornecedores de painéis blindados, sistemas de controle de acesso, supressão e CFTV), comissionamento (teste de todos os sistemas antes da entrega) e manutenção contínua. Para projetos em andamento, também atuamos apenas na fase de manutenção e auditoria de salas já implantadas por terceiros.',
  },
  {
    question: 'Qual a diferença entre sala cofre e data center?',
    answer: 'Data center é focado em densidade de TI, refrigeração e disponibilidade elétrica — mas não oferece, necessariamente, proteção física de nível cofre. Sala cofre prioriza resistência a ameaças físicas ativas: fogo prolongado, explosão, acesso forçado. Em ambientes regulados (como ACs ICP-Brasil), a sala cofre fica dentro do data center para proteger especificamente os HSMs e a infraestrutura de PKI. As duas proteções são complementares, não substitutos.',
  },
]

export const metadata: Metadata = {
  title: 'Sala Cofre Nível 4 — Manutenção e Auditoria',
  description:
    'Sala cofre EN 1047-2 Nível 4 para ambientes regulados: manutenção preventiva e corretiva, auditorias e laudos técnicos para ITI, PCI-DSS e ISO 27001.',
  keywords: ['sala cofre nível 4', 'sala cofre EN 1047-2', 'sala cofre ICP-Brasil', 'manutenção sala cofre', 'auditoria sala cofre', 'sala cofre data center'],
  openGraph: { title: 'Sala Cofre Nível 4 | JPX Digital', description: 'Projeto, implantação, manutenção e auditoria de sala cofre EN 1047-2.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Infraestrutura Física',
  heroHeadline: 'Sala Cofre Nível 4 — Manutenção e Auditoria.',
  heroSub: 'Da especificação técnica à manutenção periódica: ambientes físicos de missão crítica para Autoridades Certificadoras, instituições financeiras e qualquer operação que não pode ser comprometida.',
  intro: [
    'Sala cofre não é um armário reforçado. É um ambiente projetado para resistir a fogo prolongado, explosão e acesso físico forçado — mantendo os equipamentos internos intactos e operacionais.',
    'Regulações como ICP-Brasil (ITI), PCI-DSS e ISO 27001 exigem controles físicos comprovados. Uma sala cofre EN 1047-2 Nível 4 é a resposta para HSMs, servidores de PKI e qualquer equipamento cuja falha física seria irreversível.',
    'A JPX Digital atua em todo o ciclo: projeto com especificação técnica precisa, coordenação da implantação, comissionamento completo dos sistemas e manutenção preventiva e corretiva contínua — com laudos técnicos para suportar auditorias regulatórias.',
  ],
  howTitle: 'Como atuamos em sala cofre',
  howSteps: [
    {
      title: 'Projeto e especificação técnica',
      desc: 'Levantamos os requisitos regulatórios e operacionais, dimensionamos o espaço e especificamos: painéis blindados (nível de resistência adequado), sistema de controle de acesso com dupla custódia, CFTV com retenção conforme exigência de auditoria, sistema de supressão a agente limpo (sem danos a equipamentos eletrônicos) e sensores ambientais. Entregamos planta técnica e memorial descritivo.',
    },
    {
      title: 'Coordenação da implantação',
      desc: 'Coordenamos os fornecedores especializados (painéis EN 1047-2, biometria, supressão, CFTV) e a integração dos sistemas. Realizamos o comissionamento completo antes da entrega: teste de cada sistema de controle de acesso, verificação das vedações, acionamento do sistema de supressão (simulação), validação dos logs de auditoria e registro fotográfico para documentação.',
    },
    {
      title: 'Manutenção preventiva periódica',
      desc: 'Realizamos inspeções periódicas (semestrais ou conforme exigência regulatória) cobrindo: estado dos sistemas de acesso, integridade das vedações contra fogo e fumaça, teste do agente supressor, funcionamento do CFTV e retenção de gravações, sensores ambientais e registro de acessos. Emitimos relatório técnico após cada visita para compor o histórico de manutenção exigido em auditorias.',
    },
    {
      title: 'Manutenção corretiva e auditoria',
      desc: 'Atendemos falhas em qualquer componente da sala cofre — desde leitores biométricos e fechaduras eletromagnéticas até sensores e câmeras — com SLA definido conforme a criticidade. Para salas existentes implantadas por terceiros, executamos auditoria de conformidade com laudo técnico, identificação de não conformidades e plano de adequação.',
    },
  ],
  differentials: [
    {
      title: 'Conhecimento dos requisitos regulatórios',
      desc: 'Entendemos o que o ITI (ICP-Brasil), BACEN e auditores PCI-DSS realmente verificam numa inspeção física. Projetamos e mantemos ambientes que passam em auditorias regulatórias — não apenas ambientes que parecem seguros.',
    },
    {
      title: 'Ciclo completo: projeto a manutenção',
      desc: 'Não apenas projetamos e sumimos. Acompanhamos o ambiente desde a especificação até a manutenção contínua, com histórico documentado de todas as intervenções — fundamental para auditorias que exigem rastreabilidade.',
    },
    {
      title: 'Laudos técnicos para auditoria',
      desc: 'Cada visita de manutenção gera relatório técnico assinado. Cada auditoria gera laudo com mapa de conformidades, não conformidades e prazos de adequação. Documentação que suporta auditorias do ITI, do BACEN e de certificadoras ISO.',
    },
    {
      title: 'Integração com infraestrutura de TI',
      desc: 'Atuamos também na infraestrutura de TI dentro da sala cofre — HSMs, servidores, redes. Não fragmentamos a responsabilidade entre fornecedor físico e fornecedor de TI: entregamos o ambiente completo.',
    },
  ],
  faqs,
  schemas: [
    serviceSchema('Sala Cofre Nível 4', 'Projeto, implantação, manutenção e auditoria de sala cofre EN 1047-2 para ambientes regulados.', 'IT Infrastructure Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Sala Cofre Nível 4', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

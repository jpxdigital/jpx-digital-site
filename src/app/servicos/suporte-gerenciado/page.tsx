import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'suporte-gerenciado'

const faqs = [
  {
    question: 'O que é MSP (Managed Service Provider)?',
    answer: 'MSP é um provedor de serviços gerenciados: assume a responsabilidade pela operação e saúde da infraestrutura de TI do cliente de forma proativa e contínua. Ao contrário do suporte reativo (quebrou, chamou, consertou), o MSP monitora, previne, gerencia patches e responde a incidentes como parte de um contrato mensal com SLAs definidos.',
  },
  {
    question: 'Qual é o tempo de resposta do suporte gerenciado da JPX Digital?',
    answer: 'Os SLAs de resposta variam por criticidade: incidentes críticos (ambiente produtivo fora do ar) têm resposta em até 1 hora e início de trabalho em até 2 horas, em dias úteis e horário comercial. Incidentes de alta prioridade têm resposta em 4 horas. Para clientes com suporte 24x7, os SLAs são mantidos fora do horário comercial.',
  },
  {
    question: 'O suporte gerenciado substitui uma equipe interna de TI?',
    answer: 'Depende do contexto. Para empresas sem equipe interna de TI, o suporte gerenciado pode ser o substituto completo. Para empresas com equipe interna pequena, funciona como extensão — JPX Digital assume monitoramento, patching, backup e incidentes de nível 2/3, liberando a equipe interna para projetos estratégicos.',
  },
  {
    question: 'O que está incluído no suporte gerenciado?',
    answer: 'Pacote padrão inclui: monitoramento proativo 8x5 (infraestrutura, serviços e alertas), gestão de patches (SO e aplicações), gestão de backup (monitoramento de jobs, testes periódicos), resposta a incidentes dentro do SLA, relatório mensal de disponibilidade e reunião mensal de alinhamento. Atendimento 24x7 e outros serviços são adicionados conforme necessidade.',
  },
  {
    question: 'Como é feita a transição para o suporte gerenciado?',
    answer: 'Realizamos um onboarding estruturado de 30-60 dias: inventário completo do ambiente, documentação do que não está documentado, instalação de agentes de monitoramento, revisão de configurações de backup e definição das políticas de escalonamento. Só assumimos SLA de suporte após ter visibilidade completa do que estamos gerenciando.',
  },
]

export const metadata: Metadata = {
  title: 'Suporte Gerenciado de TI — MSP para Empresas',
  description:
    'Suporte gerenciado de TI (MSP) com monitoramento proativo, gestão de patches, backup e SLA definido. TI estável e previsível sem contratar equipe interna. Assessment gratuito.',
  keywords: ['suporte gerenciado TI', 'MSP brasil', 'managed service provider', 'suporte ti mensal', 'terceirização de ti'],
  openGraph: { title: 'Suporte Gerenciado de TI | JPX Digital', description: 'MSP com monitoramento, patches, backup e SLA para sua infraestrutura.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Gestão & Consultoria',
  heroHeadline: 'Suporte Gerenciado de TI — Infraestrutura Estável com SLA, Monitoramento e Custo Previsível.',
  heroSub: 'TI proativa, não reativa. Monitoramos, prevenimos e resolvemos antes que o problema impacte sua operação.',
  intro: [
    'Suporte reativo — quebrou, ligou, esperou, consertou — é caro, imprevisível e prejudica a operação. O modelo de suporte gerenciado inverte essa lógica: monitoramento contínuo, prevenção proativa e SLAs que garantem tempo de resposta independente de quem está de férias.',
    'A JPX Digital oferece Managed Services (MSP) para empresas que precisam de infraestrutura de TI estável e gerenciada sem a complexidade de manter uma equipe interna completa. Assumimos a operação do dia a dia — monitoramento, patches, backup, incidentes — enquanto você foca no negócio.',
    'Cada contrato de suporte gerenciado começa com um onboarding completo do ambiente: documentamos o que não está documentado, instalamos monitoramento e só assumimos SLA depois de ter visibilidade total do que gerenciamos.',
  ],
  howTitle: 'Como funciona o suporte gerenciado',
  howSteps: [
    { title: 'Onboarding e inventário', desc: 'Mapeamos todo o ambiente: hardware, software, configurações, topologia de rede, credenciais (registradas em cofre seguro), processos de backup e runbooks de incidentes. Documentamos o que não está documentado.' },
    { title: 'Monitoramento e baseline', desc: 'Instalamos agentes de monitoramento em todos os sistemas, configuramos alertas baseados no comportamento normal do ambiente (não em thresholds genéricos) e estabelecemos o baseline de saúde da infraestrutura.' },
    { title: 'Operação diária', desc: 'Verificamos o ambiente diariamente: jobs de backup, alertas de monitoramento, consumo de recursos e atualizações de segurança pendentes. Resolução proativa antes do impacto operacional.' },
    { title: 'Relatório mensal e planejamento', desc: 'Entregamos relatório mensal com disponibilidade por serviço, incidentes do mês, patches aplicados e recomendações. Reunião mensal de alinhamento para discutir melhorias e planejamento de capacidade.' },
  ],
  differentials: [
    { title: 'SLA de resposta documentado', desc: 'Tempo de resposta por criticidade registrado em contrato. Crítico: até 1 hora. Alta: até 4 horas. Normal: até 8 horas em dias úteis. Você sabe o que esperar antes de assinar.' },
    { title: 'Monitoramento proativo, não reativo', desc: 'Alertas configurados para detectar problemas antes do impacto: disco se enchendo, memória alta por longos períodos, serviços com comportamento anômalo, backups com falha.' },
    { title: 'Onboarding com inventário completo', desc: 'Não assumimos gerenciamento de ambientes que não documentamos. O onboarding inclui inventário completo — é quando descobrimos o que estava sendo ignorado há anos.' },
    { title: 'Relatórios que fazem sentido para o negócio', desc: 'O relatório mensal mostra disponibilidade por serviço crítico, não apenas métricas técnicas. Você apresenta para a diretoria com evidência de que a TI está funcionando.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Suporte Gerenciado de TI', 'Managed Services (MSP) com monitoramento proativo, gestão de patches, backup e SLA para empresas.', 'IT Management Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Suporte Gerenciado', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

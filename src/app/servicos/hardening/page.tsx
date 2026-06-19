import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'hardening'

const faqs = [
  {
    question: 'O que exatamente é hardening de servidor?',
    answer: 'Hardening é o processo de reduzir a superfície de ataque de um sistema: desabilitar serviços desnecessários, fechar portas não utilizadas, aplicar configurações seguras de SO e serviços, implementar autenticação forte, configurar logs de auditoria e garantir que o sistema está conforme um benchmark de segurança (CIS Benchmarks, STIG, NIST).',
  },
  {
    question: 'Hardening afeta a performance dos sistemas?',
    answer: 'Quando bem executado, o impacto em performance é mínimo — geralmente imperceptível. Em alguns casos, desabilitar serviços desnecessários pode até melhorar performance e uso de memória. As configurações de segurança que têm impacto real de performance são equilibradas com a necessidade operacional de cada sistema.',
  },
  {
    question: 'Com que frequência o hardening precisa ser refeito?',
    answer: 'Hardening não é um evento único. Sistemas derivam da configuração segura ao longo do tempo: patches adicionam componentes, mudanças operacionais habilitam serviços, erros humanos alteram configurações. Recomendamos verificação automática de conformidade mensal com ferramentas como OpenSCAP ou Lynis, e revisão completa semestral.',
  },
  {
    question: 'O hardening ajuda a passar em auditorias de segurança e compliance?',
    answer: 'Diretamente. Hardening baseado em CIS Benchmarks é um requisito ou recomendação em frameworks como ISO 27001, SOC 2, PCI-DSS e LGPD (para sistemas que processam dados pessoais sensíveis). Entregamos relatório de conformidade com evidências que podem ser usadas diretamente em auditorias.',
  },
  {
    question: 'Hardening cobre apenas Linux ou também Windows?',
    answer: 'Ambos. A JPX Digital aplica hardening em Linux (CIS Benchmarks para Red Hat, Ubuntu, Debian) e Windows Server (CIS Benchmarks + Microsoft Security Baselines). Para dispositivos de rede, aplicamos hardening em switches e roteadores conforme os guias do fabricante e CIS Cisco/Fortinet Benchmarks.',
  },
]

export const metadata: Metadata = {
  title: 'Hardening de Servidores — Linux, Windows e Dispositivos de Rede',
  description:
    'Hardening baseado em CIS Benchmarks para Linux, Windows Server e dispositivos de rede. Reduza a superfície de ataque e passe em auditorias de segurança. Assessment gratuito.',
  keywords: ['hardening de servidores', 'cis benchmarks', 'hardening linux windows', 'segurança de servidor', 'hardening para compliance'],
  openGraph: { title: 'Hardening de Servidores | JPX Digital', description: 'CIS Benchmarks para Linux, Windows e redes. Superfície de ataque mínima.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Segurança',
  heroHeadline: 'Hardening de Servidores — Superfície de Ataque Mínima com CIS Benchmarks.',
  heroSub: 'Cada serviço desnecessário rodando, cada porta aberta sem uso e cada configuração padrão não alterada é uma oportunidade para um atacante.',
  intro: [
    'Sistemas recém-instalados vêm com configurações padrão que priorizam facilidade de uso, não segurança. Portas abertas, serviços rodando sem uso, senhas padrão e permissões excessivas são a norma em instalações sem hardening — e o ponto de entrada preferido de ataques.',
    'Hardening é o processo sistemático de configurar sistemas conforme benchmarks de segurança reconhecidos internacionalmente (CIS — Center for Internet Security) para reduzir ao máximo a superfície de ataque sem comprometer a funcionalidade operacional.',
    'A JPX Digital aplica hardening em servidores Linux e Windows, bancos de dados, serviços de aplicação e dispositivos de rede, com verificação automática de conformidade e relatório de auditoria para cada sistema.',
  ],
  howTitle: 'Nossa metodologia de hardening',
  howSteps: [
    { title: 'Assessment de configuração atual', desc: 'Executamos scanners de conformidade (OpenSCAP, Lynis, CIS-CAT) em cada sistema e geramos relatório baseline: quais controles passam, quais falham e qual o nível de risco associado a cada falha.' },
    { title: 'Aplicação de controles CIS', desc: 'Aplicamos os controles do CIS Benchmark correspondente a cada sistema, priorizando os de alto risco. Cada mudança é documentada e testada para garantir que a funcionalidade operacional é mantida.' },
    { title: 'Verificação e relatório de conformidade', desc: 'Após a aplicação, reexecutamos os scanners e geramos relatório de conformidade com antes/depois. O relatório inclui evidências documentadas para uso em auditorias externas.' },
    { title: 'Conformidade contínua', desc: 'Configuramos verificação automática periódica para detectar desvios da configuração segura — mudanças não autorizadas, atualizações que alteram configurações, erros operacionais. Alertas quando a conformidade cai abaixo do threshold definido.' },
  ],
  differentials: [
    { title: 'Baseado em CIS Benchmarks', desc: 'CIS Benchmarks é a referência internacional mais usada para hardening, aceita por ISO 27001, PCI-DSS, SOC 2 e outras normas. Entregamos evidências prontas para auditorias.' },
    { title: 'Hardening sem quebrar operação', desc: 'Cada controle é validado no contexto do cliente antes de ser aplicado. Controles que quebrariam funcionalidades críticas são documentados como exceções formais com compensating controls.' },
    { title: 'Cobertura Linux, Windows e rede', desc: 'Red Hat, Ubuntu, Debian, Windows Server, SQL Server, switches e firewalls — aplicamos hardening em toda a pilha, não apenas no SO.' },
    { title: 'Relatório de auditoria pronto', desc: 'Entregamos relatório formatado para uso em auditorias externas: evidência de cada controle aplicado, antes/depois e status de conformidade por categoria.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Hardening de Servidores', 'Hardening baseado em CIS Benchmarks para Linux, Windows e dispositivos de rede. Conformidade e auditoria de segurança.', 'Cybersecurity Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Hardening', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'industrias'

const faqs = [
  {
    question: 'Como integrar o ERP da fábrica com os sistemas de TI corporativos?',
    answer: 'A integração ERP industrial geralmente envolve APIs REST ou middleware de integração (ex: Azure Integration Services, MuleSoft, ou integrações nativas do SAP). O ponto crítico é a qualidade dos dados: dados duplicados, inconsistentes ou com latência elevada geram decisões erradas na produção. Mapeamos os fluxos de dados antes de qualquer integração e validamos com os usuários de negócio.',
  },
  {
    question: 'O que é rede OT e por que ela precisa de proteção diferente da rede corporativa?',
    answer: 'Redes OT (Operational Technology) conectam CLPs, supervisórios, sensores e equipamentos de automação industrial. Esses equipamentos frequentemente rodam software desatualizado, não suportam patches e não podem ser reiniciados sem parar a produção. Por isso, a proteção OT é diferente: segmentação rigorosa entre OT e IT, monitoramento passivo (sem injetar tráfego nos equipamentos), e controle de acesso à rede OT.',
  },
  {
    question: 'Qual é o impacto financeiro de uma parada não planejada na produção?',
    answer: 'Varia por setor, mas é sempre alto. Em indústrias de processo (químico, alimentos, farmacêutico), uma parada de 4 horas pode custar dezenas de milhares de reais em produto em processo, além do custo de reinicialização. Por isso, sistemas de TI que controlam ou impactam a produção precisam de nível de disponibilidade proporcional a esse risco — o que raramente é calculado explicitamente.',
  },
  {
    question: 'Como proteger sistemas industriais de ransomware?',
    answer: 'Segmentação de rede é o controle mais importante: a rede OT não deve ter comunicação direta com a internet ou com a rede corporativa sem controle rigoroso. Backup de configurações de CLPs e supervisórios (muitas vezes negligenciado), controle de acesso a equipamentos e monitoramento de comportamento anômalo na rede OT completam a estratégia.',
  },
  {
    question: 'A JPX Digital tem experiência com ambientes industriais?',
    answer: 'Sim. Temos experiência em infraestrutura de TI para ambientes industriais, incluindo integração com sistemas SCADA/MES, segmentação IT/OT e backup de sistemas de controle. Nossa abordagem reconhece as limitações dos ambientes OT — não aplicamos práticas de TI corporativa diretamente em ambientes de chão de fábrica.',
  },
]

export const metadata: Metadata = {
  title: 'TI para Indústrias — Integração ERP, Segurança OT e Alta Disponibilidade',
  description:
    'Infraestrutura de TI para indústrias: integração ERP, segurança de redes OT, backup de sistemas de controle e alta disponibilidade para produção. Consultoria especializada.',
  keywords: ['TI para indústrias', 'segurança rede OT', 'integração ERP industrial', 'backup SCADA', 'TI industrial brasil'],
  openGraph: { title: 'TI para Indústrias | JPX Digital', description: 'Integração ERP, segurança OT e alta disponibilidade para ambientes industriais.', url: `${BASE}/segmentos/${slug}` },
  alternates: { canonical: `${BASE}/segmentos/${slug}` },
}

const content = {
  slug,
  category: 'Segmento Industrial',
  baseSection: { name: 'Segmentos', href: '/segmentos' },
  heroHeadline: 'TI para Indústrias — Produção Contínua com Infraestrutura que Acompanha o Ritmo da Fábrica.',
  heroSub: 'Parada não planejada na produção custa caro. Infraestrutura de TI que suporta ERP, automação e integração de dados com a confiabilidade que a operação industrial exige.',
  intro: [
    'A transformação digital trouxe conectividade ao chão de fábrica — e com ela, novos riscos. CLPs, SCADA e MES estão cada vez mais ligados às redes corporativas e à internet.',
    'ERP, BI e sistemas de qualidade dependem de dados em tempo real da produção. Integração mal feita gera relatórios incorretos e decisões erradas — sem que ninguém perceba.',
    'A JPX Digital conhece as particularidades industriais: equipamentos que não reiniciam durante a produção, sistemas legados sem suporte a patches modernos e a necessidade de segmentação rigorosa entre redes IT e OT.',
  ],
  howTitle: 'Como atuamos em ambientes industriais',
  howSteps: [
    { title: 'Mapeamento do ambiente IT e OT', desc: 'Inventariamos a infraestrutura de TI corporativa e os ativos de OT (CLPs, IHMs, supervisórios, redes de automação), mapeamos os pontos de integração existentes e identificamos riscos de segurança e disponibilidade em cada camada.' },
    { title: 'Segmentação IT/OT', desc: 'Implementamos segmentação de rede entre redes corporativas e redes de automação industrial com firewall industrial, DMZ de produção e controle rigoroso dos fluxos de dados permitidos. A rede OT não tem acesso direto à internet.' },
    { title: 'Integração e confiabilidade dos dados', desc: 'Projetamos e implementamos integrações entre sistemas de automação (SCADA, MES) e sistemas corporativos (ERP, BI) com qualidade de dados validada, latência adequada e monitoramento de falhas de integração.' },
    { title: 'Backup de sistemas de controle', desc: 'Configuramos backup de configurações de CLPs, programas de CLP, bancos de dados de supervisório e documentação técnica de automação — frequentemente negligenciados e impossíveis de recriar em caso de falha sem documentação.' },
  ],
  differentials: [
    { title: 'Consciência das limitações OT', desc: 'Não aplicamos práticas de TI corporativa em equipamentos de automação industrial. Entendemos que um CLP não pode receber um patch sem janela de manutenção planejada — e projetamos segurança em torno dessa realidade.' },
    { title: 'Custo de parada como métrica de disponibilidade', desc: 'Calculamos o custo real de parada não planejada para dimensionar o nível certo de disponibilidade. Alta disponibilidade custa mais — mas sempre menos que uma parada de produção.' },
    { title: 'Backup do que realmente importa', desc: 'Configurações de CLP, programas de automação e documentação técnica de planta são ativos críticos que raramente são incluídos no backup corporativo. Cobrimos essa lacuna.' },
    { title: 'Integração com dados de qualidade', desc: 'Dados de produção integrados ao ERP só têm valor se forem corretos e pontuais. Validamos a qualidade dos dados antes de qualquer integração entrar em produção.' },
  ],
  faqs,
  schemas: [
    serviceSchema('TI para Indústrias', 'Infraestrutura de TI para ambientes industriais: integração ERP, segurança OT e alta disponibilidade para produção.', 'Industrial IT Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Segmentos', item: `${BASE}/segmentos` }, { name: 'Indústrias', item: `${BASE}/segmentos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

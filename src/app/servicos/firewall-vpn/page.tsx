import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'firewall-vpn'

const faqs = [
  {
    question: 'Qual é o firewall certo para minha empresa?',
    answer: 'Depende do porte, criticidade e budget. Para pequenas e médias empresas, pfSense/OPNsense ou Fortinet FortiGate entry-level são boas opções. Para ambientes maiores, Palo Alto, Fortinet, Check Point e Cisco Firepower são as referências. A JPX Digital recomenda baseado na sua realidade — não no que tem maior margem.',
  },
  {
    question: 'VPN site-to-site vs VPN de acesso remoto — qual a diferença?',
    answer: 'VPN site-to-site conecta redes inteiras entre locais (ex: matriz e filial, on-prem e cloud). VPN de acesso remoto permite que usuários individuais se conectem à rede corporativa de qualquer lugar. Para acesso remoto moderno, avaliamos também soluções Zero Trust Network Access (ZTNA) que são mais seguras que VPN tradicional.',
  },
  {
    question: 'VPN ou Zero Trust — o que é mais seguro?',
    answer: 'Zero Trust é mais seguro por princípio: verifica identidade, dispositivo, localização e contexto a cada acesso. VPN continua sendo a solução mais prática para acesso a sistemas legados. Para novas implementações de acesso remoto, ZTNA é a recomendação.',
  },
  {
    question: 'Como proteger filiais e usuários remotos sem data center próprio?',
    answer: 'SD-WAN com firewall gerenciado na nuvem (SASE) é a arquitetura moderna para esse cenário. Combina segurança de rede e SD-WAN como serviço cloud, eliminando a necessidade de appliance caro em cada filial.',
  },
  {
    question: 'Com que frequência as regras de firewall devem ser revisadas?',
    answer: 'Recomendamos revisão semestral com remoção de regras não utilizadas há mais de 90 dias. Regras de firewall tendem a se acumular ao longo dos anos — cada regra desnecessária é uma superfície de ataque potencial.',
  },
]

export const metadata: Metadata = {
  title: 'Firewall e VPN Corporativa para Empresas',
  description: 'Firewall corporativo e VPN para empresas: perímetro seguro, acesso remoto controlado e proteção de rede. pfSense, Fortinet, Palo Alto. Assessment gratuito.',
  keywords: ['firewall corporativo', 'vpn empresarial', 'firewall e vpn para empresas', 'zero trust network', 'segurança de rede'],
  openGraph: { title: 'Firewall e VPN Corporativa | JPX Digital', description: 'Perímetro seguro e acesso remoto controlado para empresas.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content: ServicePageContent = {
  slug,
  category: 'Segurança',
  heroHeadline: 'Firewall e VPN Corporativa — Perímetro Seguro e Acesso Remoto que Você Controla.',
  heroSub: 'Regras bem definidas, tráfego monitorado e acesso remoto com identidade verificada. Segurança de rede sem abrir mão de usabilidade.',
  ctaLabel: 'Solicitar Network Security Assessment',

  problem: {
    headline: 'Firewall não é produto. É política. E política precisa ser mantida, revisada e testada — não instalada uma vez e esquecida.',
    body: [
      'Firewall mal configurado é quase tão perigoso quanto não ter firewall. Regras acumuladas ao longo de anos sem revisão, portas abertas por conveniência e acessos remotos sem autenticação forte são os vetores de entrada mais comuns em incidentes de segurança corporativa.',
      'O problema mais comum não é o fabricante escolhido ou o hardware usado. É a gestão: nenhum processo de aprovação para novas regras, nenhuma revisão periódica, nenhuma auditoria de acessos remotos ativos.',
      'A JPX Digital projeta, implanta e mantém arquiteturas de rede seguras: NGFW bem configurado, VPN com autenticação forte e, para ambientes modernos, Zero Trust Network Access para acesso remoto mais seguro e simples.',
    ],
  },

  assessment: {
    name: 'Network Security Assessment',
    body: 'Mapeamos a topologia de rede, revisamos todas as regras de firewall ativas, identificamos portas desnecessariamente expostas e acessos remotos sem controle adequado. Entregamos relatório de risco priorizado com plano de remediação.',
    checklist: [
      'Mapeamento da topologia de rede e segmentação atual',
      'Auditoria de regras de firewall (regras ativas x necessárias)',
      'Revisão de exposição de serviços para internet',
      'Análise de acessos remotos (VPN, RDP, SSH)',
      'Relatório de risco e plano de remediação priorizado',
    ],
  },

  process: {
    title: 'Como estruturamos a segurança de rede',
    steps: [
      { title: 'Auditoria do ambiente atual', desc: 'Mapeamos a topologia de rede, revisamos todas as regras de firewall ativas, identificamos portas expostas e acessos remotos sem controle. Entregamos relatório de risco priorizado.' },
      { title: 'Arquitetura e segmentação', desc: 'Definimos segmentação de rede (VLANs, DMZ, segmento de gestão), política de firewall com princípio de menor privilégio e arquitetura de acesso remoto (VPN, ZTNA ou híbrido).' },
      { title: 'Implantação e migração de regras', desc: 'Implementamos o novo ambiente com migração controlada das regras existentes, validação de conectividade para cada fluxo crítico antes de desativar o ambiente anterior.' },
      { title: 'Gestão contínua e revisão de regras', desc: 'Monitoramento de logs, alertas para tráfego anômalo, revisão semestral de regras e processo formal de aprovação para novas liberações.' },
    ],
  },

  benefits: [
    { title: 'Perímetro definido', desc: 'Apenas tráfego necessário passa. Todo o resto é bloqueado por padrão — não permitido por padrão.' },
    { title: 'Acesso remoto seguro', desc: 'VPN com MFA ou ZTNA. Zero acesso remoto sem identidade verificada.' },
    { title: 'Visibilidade do tráfego', desc: 'Logs integrados ao SIEM. Você vê o que está sendo bloqueado e identifica tentativas de ataque.' },
    { title: 'Regras auditáveis', desc: 'Processo formal de aprovação. Sua política de firewall fica organizada e rastreável.' },
  ],

  deliverables: [
    'Relatório de Network Security Assessment',
    'Documento de arquitetura de rede',
    'Política de segmentação de rede',
    'Política de acesso remoto',
    'Relatório de regras de firewall (ativas e removidas)',
    'Runbook de operação e gestão de regras',
    'Processo de aprovação de novas regras',
  ],

  differentials: [
    { title: 'Agnósticos de fabricante', desc: 'Recomendamos pfSense, Fortinet, Palo Alto ou Check Point com base no seu perfil — não por parceria de revenda.' },
    { title: 'Acesso remoto moderno', desc: 'VPN tradicional, ZTNA ou híbrido. Para novos projetos, avaliamos Zero Trust que é mais seguro e mais fácil de gerenciar que VPN.' },
    { title: 'Processo de revisão de regras', desc: 'Processo formal de aprovação para novas regras e revisão periódica. Sua política de firewall fica organizada e auditável.' },
    { title: 'Integração com monitoramento', desc: 'Logs de firewall integrados ao SIEM ou Grafana/Loki. Evidência para auditorias e visibilidade de tentativas de ataque.' },
  ],

  faqs,
  schemas: [
    serviceSchema('Firewall e VPN Corporativa', 'Segurança de rede com firewall NGFW, VPN site-to-site, acesso remoto e Zero Trust para ambientes corporativos.', 'Cybersecurity Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Firewall & VPN', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}

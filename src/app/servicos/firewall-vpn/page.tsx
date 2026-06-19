import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'firewall-vpn'

const faqs = [
  {
    question: 'Qual é o firewall certo para minha empresa?',
    answer: 'Depende do porte, criticidade e budget. Para pequenas e médias empresas, pfSense/OPNsense (open-source com suporte comercial) ou Fortinet FortiGate entry-level são boas opções. Para ambientes maiores e mais críticos, Palo Alto, Fortinet, Check Point e Cisco Firepower são as referências. A JPX Digital recomenda baseado na sua realidade — não no que tem maior margem.',
  },
  {
    question: 'VPN site-to-site vs VPN de acesso remoto — qual a diferença?',
    answer: 'VPN site-to-site conecta redes inteiras entre locais (ex: matriz e filial, on-prem e cloud). VPN de acesso remoto permite que usuários individuais se conectem à rede corporativa de qualquer lugar. Para acesso remoto moderno, avaliamos também soluções Zero Trust Network Access (ZTNA) como Cloudflare Access, que são mais seguras que VPN tradicional.',
  },
  {
    question: 'VPN ou Zero Trust — o que é mais seguro?',
    answer: 'Zero Trust é mais seguro por princípio: verifica identidade, dispositivo, localização e contexto a cada acesso — em vez de assumir que "quem está na VPN está dentro do perímetro seguro". VPN continua sendo a solução mais prática para acesso a sistemas legados e redes completas. Para novas implementações de acesso remoto, ZTNA é a recomendação.',
  },
  {
    question: 'Como proteger filiais e usuários remotos sem um data center próprio?',
    answer: 'SD-WAN com firewall gerenciado na nuvem (SASE — Secure Access Service Edge) é a arquitetura moderna para esse cenário. Combina segurança de rede e SD-WAN como um serviço cloud, eliminando a necessidade de appliance de firewall caro em cada filial. Soluções como Fortinet Secure SD-WAN ou Cloudflare One atendem bem esse perfil.',
  },
  {
    question: 'Com que frequência as regras de firewall devem ser revisadas?',
    answer: 'Recomendamos revisão semestral das regras ativas, com remoção de regras não utilizadas há mais de 90 dias. Regras de firewall tendem a se acumular ao longo dos anos sem revisão — cada regra desnecessária é uma superfície de ataque potencial. Implementamos processo de revisão e aprovação de novas regras para evitar acúmulo.',
  },
]

export const metadata: Metadata = {
  title: 'Firewall e VPN Corporativa para Empresas',
  description:
    'Firewall corporativo e VPN para empresas: perímetro seguro, acesso remoto controlado e proteção de rede. pfSense, Fortinet, Palo Alto. Assessment gratuito.',
  keywords: ['firewall corporativo', 'vpn empresarial', 'firewall e vpn para empresas', 'zero trust network', 'sd-wan empresarial'],
  openGraph: { title: 'Firewall e VPN Corporativa | JPX Digital', description: 'Perímetro seguro e acesso remoto controlado para empresas.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Segurança',
  heroHeadline: 'Firewall e VPN Corporativa — Perímetro Seguro e Acesso Remoto que Você Controla.',
  heroSub: 'Regras bem definidas, tráfego monitorado e acesso remoto com identidade verificada. Segurança de rede sem abrir mão de usabilidade.',
  intro: [
    'Firewall mal configurado é quase tão perigoso quanto não ter firewall. Regras acumuladas ao longo de anos sem revisão, portas abertas por conveniência e acessos remotos sem autenticação forte são os vetores de entrada mais comuns em incidentes de segurança corporativa.',
    'A JPX Digital projeta, implanta e mantém arquiteturas de rede seguras com firewall NGFW (Next-Generation Firewall), VPN site-to-site, VPN de acesso remoto e, para ambientes mais modernos, soluções Zero Trust Network Access (ZTNA).',
    'Cada projeto começa por entender o fluxo real de tráfego da empresa — quem precisa acessar o quê, de onde — e define regras de firewall que permitem o necessário e bloqueiam todo o restante.',
  ],
  howTitle: 'Como estruturamos a segurança de rede',
  howSteps: [
    { title: 'Auditoria do ambiente atual', desc: 'Mapeamos a topologia de rede, revisamos todas as regras de firewall ativas, identificamos portas desnecessariamente expostas e acessos remotos sem controle adequado. Entregamos relatório de risco priorizado.' },
    { title: 'Arquitetura e segmentação', desc: 'Definimos segmentação de rede (VLANs, DMZ, segmento de gestão), política de firewall com princípio de menor privilégio e arquitetura de acesso remoto (VPN, ZTNA ou híbrido).' },
    { title: 'Implantação e migração de regras', desc: 'Implementamos o novo ambiente com migração controlada das regras existentes, validação de conectividade para cada fluxo crítico antes de desativar o ambiente anterior.' },
    { title: 'Gestão contínua e revisão de regras', desc: 'Monitoramento de logs, alertas para tráfego anômalo, revisão semestral de regras e processo formal de aprovação para novas liberações. Sem acumulação silenciosa de regras desnecessárias.' },
  ],
  differentials: [
    { title: 'Agnósticos de fabricante', desc: 'Recomendamos pfSense, Fortinet, Palo Alto ou Check Point com base no seu perfil — não por parceria de revenda. Às vezes a melhor solução é open-source com suporte comercial.' },
    { title: 'Acesso remoto moderno', desc: 'VPN tradicional, ZTNA ou híbrido. Para novos projetos de acesso remoto, avaliamos soluções Zero Trust que são mais seguras e mais fáceis de gerenciar que VPN.' },
    { title: 'Processo de revisão de regras', desc: 'Implementamos processo formal de aprovação para novas regras e revisão periódica de regras existentes. Sua política de firewall fica organizada e auditável.' },
    { title: 'Integração com monitoramento', desc: 'Logs de firewall integrados ao SIEM ou Grafana/Loki. Você vê o que está sendo bloqueado, identifica tentativas de ataque e tem evidência para auditorias.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Firewall e VPN Corporativa', 'Segurança de rede com firewall NGFW, VPN site-to-site, acesso remoto e Zero Trust para ambientes corporativos.', 'Cybersecurity Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Firewall & VPN', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

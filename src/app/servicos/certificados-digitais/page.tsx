import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'certificados-digitais'

const faqs = [
  {
    question: 'Qual a diferença entre certificado A1 e A3?',
    answer: 'A1 é um arquivo de software instalado no computador — mais fácil de usar, sem token, mas com validade de 1 ano e vinculado ao dispositivo. A3 fica gravado em um token USB, cartão inteligente ou HSM — tem validade de 1 a 3 anos, a chave privada nunca sai do hardware e é mais seguro. Para assinaturas com maior valor jurídico ou ambientes que precisam de mobilidade, A3 é o padrão recomendado.',
  },
  {
    question: 'A JPX Digital é uma Autoridade de Registro (AR)?',
    answer: 'Sim. A JPX Digital atua como revendedora autorizada e integrada à cadeia ICP-Brasil, realizando o processo de validação presencial ou por videoconferência conforme os requisitos da ICP-Brasil. O certificado é emitido por uma AC credenciada pelo ITI, com toda a cadeia de confiança ICP-Brasil válida.',
  },
  {
    question: 'Quais certificados posso emitir pela JPX Digital?',
    answer: 'e-CPF A1 e A3 (pessoas físicas), e-CNPJ A1 e A3 (pessoas jurídicas), certificados para NF-e, NFC-e, CT-e e demais documentos fiscais eletrônicos, certificados para servidores e aplicações (SSL/TLS), e certificados para assinatura eletrônica avançada. Entre em contato para confirmar disponibilidade do tipo específico que você precisa.',
  },
  {
    question: 'O que é necessário para emitir um certificado e-CNPJ?',
    answer: 'Para e-CNPJ, é necessário: contrato social e alterações, cartão CNPJ, documentos de identidade e CPF do responsável legal, comprovante de endereço da empresa e comparecimento pessoal do titular (ou videoconferência). Para certificado em token A3, o token USB deve ser adquirido previamente. Orientamos todo o processo de documentação antes da validação.',
  },
  {
    question: 'Como a JPX Digital gerencia a renovação dos meus certificados?',
    answer: 'Mantemos um cadastro dos certificados emitidos e seus prazos de validade. Enviamos avisos de vencimento com 90, 60 e 30 dias de antecedência para que você planeje a renovação. O processo de renovação é iniciado antes do vencimento para evitar interrupção na assinatura de documentos ou emissão de notas fiscais.',
  },
  {
    question: 'Certificado digital é obrigatório para emitir nota fiscal?',
    answer: 'Sim. A emissão de NF-e (Nota Fiscal Eletrônica), NFC-e (Nota Fiscal de Consumidor Eletrônica), CT-e (Conhecimento de Transporte Eletrônico) e outros documentos fiscais eletrônicos exige certificado digital ICP-Brasil, seja da empresa (e-CNPJ) ou do sistema emissor (certificado de aplicação). Sem o certificado, a empresa não consegue assinar as notas fiscais.',
  },
]

export const metadata: Metadata = {
  title: 'Certificados Digitais ICP-Brasil — Revenda e-CPF, e-CNPJ, NF-e',
  description:
    'A JPX Digital é revendedora autorizada de certificados digitais ICP-Brasil. e-CPF A1/A3, e-CNPJ A1/A3, certificados NF-e e SSL/TLS. Validação presencial ou por videoconferência.',
  keywords: ['certificado digital', 'e-CPF', 'e-CNPJ', 'certificado ICP-Brasil', 'NF-e certificado', 'token digital', 'certificado A3'],
  openGraph: { title: 'Certificados Digitais ICP-Brasil | JPX Digital', description: 'Revenda autorizada de e-CPF, e-CNPJ, NF-e e SSL. Gestão de renovação inclusa.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Certificados & PKI',
  heroHeadline: 'Certificados Digitais ICP-Brasil — Emissão, Gestão e Renovação para sua Empresa.',
  heroSub: 'A JPX Digital é revendedora autorizada de certificados ICP-Brasil. e-CPF, e-CNPJ, NF-e, SSL/TLS — com suporte técnico para instalação e alerta proativo de vencimento.',
  intro: [
    'Certificado digital não é só burocracia fiscal. É a identidade digital da sua empresa para assinar documentos, emitir notas fiscais, autenticar sistemas e acessar portais governamentais com validade jurídica plena.',
    'A JPX Digital é revendedora autorizada de certificados ICP-Brasil (e-CPF A1/A3, e-CNPJ A1/A3 e certificados de aplicação), com equipe técnica para orientar a escolha certa, suportar a instalação e gerenciar prazos de vencimento.',
    'Empresas que gerenciam múltiplos certificados — para filiais, colaboradores e sistemas — precisam de controle centralizado. Certificado vencido no dia da nota fiscal é uma crise real. Nós gerenciamos isso antes de virar problema.',
  ],
  howTitle: 'Como funciona o processo de emissão',
  howSteps: [
    { title: 'Escolha e pedido', desc: 'Orientamos sobre o tipo correto (e-CPF, e-CNPJ, aplicação, SSL) e a mídia mais adequada (A1 software ou A3 token/HSM). O pedido é feito online com nosso suporte e a documentação é organizada antes da validação.' },
    { title: 'Validação de identidade', desc: 'Conforme norma ICP-Brasil, a emissão exige validação presencial com documento de identidade original ou videoconferência com agente credenciado. Orientamos todo o processo e os documentos necessários antecipadamente para evitar retrabalho.' },
    { title: 'Emissão e instalação', desc: 'Após a validação, o certificado é emitido e instalado no dispositivo (software A1, token A3 ou cartão inteligente). Para sistemas e servidores, auxiliamos na instalação e configuração nos ambientes de produção.' },
    { title: 'Gestão de vencimento', desc: 'Registramos todos os certificados emitidos com seus prazos de validade. Você recebe alertas com 90, 60 e 30 dias de antecedência. Nenhum certificado vence sem aviso, sem afetar suas operações.' },
  ],
  differentials: [
    { title: 'Revendedor autorizado ICP-Brasil', desc: 'Cadeia de confiança completa — certificados emitidos por Autoridade Certificadora credenciada pelo ITI, com validade jurídica plena em todo território nacional e em sistemas que exigem ICP-Brasil.' },
    { title: 'Suporte técnico incluso', desc: 'Não entregamos um token e somimos. Nossa equipe instala o certificado, configura o ambiente e resolve problemas de compatibilidade com sistemas de NF-e, portais governamentais e assinadores de documentos.' },
    { title: 'Gestão proativa de renovação', desc: 'Mantemos controle dos vencimentos e avisamos antes que o problema aconteça. Para empresas com múltiplos certificados, isso é a diferença entre uma operação sem interrupções e uma crise no momento errado.' },
    { title: 'Certificados para todos os casos de uso', desc: 'Pessoa física (e-CPF), pessoa jurídica (e-CNPJ), nota fiscal eletrônica, sistemas e servidores (SSL/TLS), HSMs para Autoridades Certificadoras. Atendemos da PME à infraestrutura de PKI corporativa.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Certificados Digitais ICP-Brasil', 'Revenda autorizada de certificados digitais ICP-Brasil: e-CPF, e-CNPJ, NF-e, SSL/TLS com gestão de renovação.', 'IT Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Certificados Digitais', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }

import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da JPX Digital / JPX Digital Tecnologia LTDA. Como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD.',
  alternates: { canonical: 'https://jpxdigital.com.br/privacidade' },
  robots: { index: false },
}

const UPDATED = '18 de junho de 2026'

export default function PrivacidadePage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-10">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">LGPD — Lei 13.709/2018</p>
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Política de Privacidade</h1>
            <p className="text-sm text-gray-500">Última atualização: {UPDATED}</p>
          </div>

          <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-8">

            <section>
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">1. Controlador dos Dados</h2>
              <p className="text-gray-700">
                <strong>JPX Digital Tecnologia LTDA</strong>, inscrita no CNPJ 57.454.973/0001-18, com sede no Brasil, doravante denominada <strong>JPX Digital</strong>, é a controladora dos dados pessoais tratados neste site.
              </p>
              <p className="text-gray-700 mt-3">
                Para exercer seus direitos ou entrar em contato sobre privacidade: <a href="mailto:privacidade@jpxdigital.com.br" className="text-blue-600 hover:underline">privacidade@jpxdigital.com.br</a>
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">2. Dados que Coletamos</h2>
              <p className="text-gray-700 mb-3">Coletamos apenas os dados necessários para a finalidade informada:</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-900">Dado</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-900">Finalidade</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-900">Base Legal (LGPD)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Nome, e-mail, telefone, empresa', 'Responder solicitações de contato e assessment', 'Legítimo interesse (Art. 7º, IX)'],
                    ['Interesse de serviço selecionado', 'Direcionar atendimento ao especialista correto', 'Legítimo interesse (Art. 7º, IX)'],
                    ['IP e dados de sessão (logs Nginx)', 'Segurança, prevenção de abuso e diagnóstico técnico', 'Legítimo interesse (Art. 7º, IX)'],
                    ['Cookies de análise (opt-in)', 'Melhoria de desempenho do site', 'Consentimento (Art. 7º, I)'],
                  ].map(([dado, finalidade, base]) => (
                    <tr key={dado} className="border-b border-gray-100">
                      <td className="p-3 border border-gray-200 text-gray-700">{dado}</td>
                      <td className="p-3 border border-gray-200 text-gray-700">{finalidade}</td>
                      <td className="p-3 border border-gray-200 text-gray-700">{base}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">3. Como Usamos seus Dados</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Retornar sua solicitação de contato ou assessment (finalidade principal)</li>
                <li>Enviar informações relevantes sobre serviços da JPX Digital quando solicitado</li>
                <li>Melhorar a experiência do site e identificar problemas técnicos</li>
                <li>Cumprir obrigações legais e regulatórias aplicáveis</li>
              </ul>
              <p className="text-gray-700 mt-3">Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins comerciais.</p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">4. Compartilhamento de Dados</h2>
              <p className="text-gray-700 mb-2">Seus dados podem ser compartilhados apenas com:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>HubSpot CRM</strong> — gestão do relacionamento e acompanhamento do lead (dados tratados nos EUA, com cláusulas contratuais padrão)</li>
                <li><strong>n8n</strong> (servidor próprio na OCI) — automação de e-mail de boas-vindas e notificações internas</li>
                <li><strong>Cloudflare</strong> — CDN, DDoS e WAF (não armazena conteúdo de formulários)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">5. Retenção de Dados</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Dados de formulário de contato:</strong> mantidos por até 5 anos após o último contato, salvo obrigação legal diferente</li>
                <li><strong>Logs de acesso (IP):</strong> 90 dias para fins de segurança</li>
                <li><strong>Cookies de análise:</strong> conforme configuração no banner de consentimento</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">6. Seus Direitos (LGPD — Art. 18)</h2>
              <p className="text-gray-700 mb-3">Você tem os seguintes direitos sobre seus dados pessoais:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Confirmação e acesso:</strong> saber se tratamos seus dados e obter uma cópia</li>
                <li><strong>Correção:</strong> corrigir dados incompletos, inexatos ou desatualizados</li>
                <li><strong>Exclusão:</strong> solicitar a eliminação de dados desnecessários ou tratados em desconformidade</li>
                <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado</li>
                <li><strong>Revogação de consentimento:</strong> retirar o consentimento dado anteriormente</li>
                <li><strong>Oposição:</strong> se opor ao tratamento realizado com base em legítimo interesse</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Envie sua solicitação para <a href="mailto:privacidade@jpxdigital.com.br" className="text-blue-600 hover:underline">privacidade@jpxdigital.com.br</a>. Respondemos em até 15 dias úteis.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">7. Cookies</h2>
              <p className="text-gray-700 mb-2">Utilizamos cookies de duas categorias:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Cookies necessários:</strong> funcionamento básico do site. Não requerem consentimento.</li>
                <li><strong>Cookies de análise:</strong> métricas de uso anônimas. Requerem seu consentimento, coletado via banner no primeiro acesso.</li>
              </ul>
              <p className="text-gray-700 mt-2">
                Você pode gerenciar ou revogar seu consentimento de cookies a qualquer momento via <Link href="/cookies" className="text-blue-600 hover:underline">Política de Cookies</Link>.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">8. Segurança</h2>
              <p className="text-gray-700">
                Adotamos medidas técnicas e organizacionais compatíveis com o estado da arte para proteger seus dados: criptografia em trânsito (TLS 1.2+), criptografia em repouso, controle de acesso com princípio do menor privilégio, monitoramento contínuo de segurança e procedimento formal de resposta a incidentes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">9. Contato e Reclamações</h2>
              <p className="text-gray-700">
                Para dúvidas sobre esta política ou sobre o tratamento dos seus dados: <a href="mailto:privacidade@jpxdigital.com.br" className="text-blue-600 hover:underline">privacidade@jpxdigital.com.br</a>
              </p>
              <p className="text-gray-700 mt-2">
                Se considerar que seus direitos não foram atendidos, você pode registrar reclamação na <strong>ANPD — Autoridade Nacional de Proteção de Dados</strong> em <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">gov.br/anpd</a>.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

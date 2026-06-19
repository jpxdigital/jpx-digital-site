import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'backup-corporativo'

const faqs = [
  {
    question: 'Qual é a diferença entre backup e disaster recovery?',
    answer: 'Backup é a cópia dos dados. Disaster Recovery é o processo completo de retomar as operações após um incidente — inclui backup, mas também infraestrutura alternativa, procedimentos de failover e testes periódicos. Um sem o outro é incompleto para ambientes críticos.',
  },
  {
    question: 'Com que frequência o backup é testado?',
    answer: 'Realizamos testes de restore mensais em todos os ambientes que gerenciamos. Um backup não testado é apenas esperança. Entregamos relatório mensal com o resultado de cada restore, incluindo tempo de recuperação medido.',
  },
  {
    question: 'Onde os dados do backup ficam armazenados?',
    answer: 'Implementamos estratégia 3-2-1: 3 cópias, em 2 mídias diferentes, sendo 1 cópia offsite. Normalmente usamos armazenamento local (NAS) + Object Storage em nuvem (OCI, AWS S3, Backblaze B2). Todos os dados são criptografados com AES-256 antes da transmissão.',
  },
  {
    question: 'O backup cobre sistemas em cloud também?',
    answer: 'Sim. Gerenciamos backup de servidores on-premise, VMs em OCI, Azure e AWS, bancos de dados Oracle, SQL Server, MySQL e PostgreSQL, e sistemas de arquivo. O agente é leve e funciona sem impacto perceptível em produção.',
  },
  {
    question: 'Quanto tempo leva para restaurar dados em caso de incidente?',
    answer: 'Depende do RPO e RTO definidos no projeto. Em ambientes que gerenciamos, trabalhamos com RTO de 1 a 4 horas para restauração completa de servidores críticos. Restauração de arquivos individuais leva minutos.',
  },
]

export const metadata: Metadata = {
  title: 'Backup Corporativo com RPO e RTO Garantidos',
  description:
    'Backup corporativo com RPO e RTO definidos em contrato e testados mensalmente. Criptografia AES-256, múltiplos destinos S3. Assessment gratuito.',
  keywords: ['backup corporativo', 'backup para empresas', 'backup empresarial', 'backup de dados', 'backup com RTO RTO'],
  openGraph: {
    title: 'Backup Corporativo com RPO e RTO Garantidos | JPX Digital',
    description: 'Backup corporativo com garantias documentadas em contrato. Testado mensalmente. Criptografia AES-256.',
    url: `${BASE}/servicos/${slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Continuidade & Segurança',
  heroHeadline: 'Backup Corporativo — RPO e RTO Definidos, Testados e Garantidos em Contrato.',
  heroSub:
    'A maioria das empresas descobre que o backup não funciona no pior momento possível: durante uma recuperação de emergência. Nós testamos antes.',
  intro: [
    'Backup não é uma commodity. É uma responsabilidade. Ter um processo de backup configurado é muito diferente de ter dados realmente recuperáveis quando você precisa.',
    'A JPX Digital projeta, implanta e valida backups corporativos com métricas claras: RPO (Recovery Point Objective — qual é a janela máxima de perda de dados aceitável) e RTO (Recovery Time Objective — em quanto tempo o sistema precisa estar operacional). Esses números são definidos com você, documentados em contrato e testados mensalmente.',
    'Utilizamos arquitetura 3-2-1 com criptografia AES-256 ponta a ponta, múltiplos destinos de armazenamento (local + cloud) e agente baseado em restic — leve, incremental e verificado por hash em cada execução.',
  ],
  howTitle: 'Como implementamos o backup corporativo',
  howSteps: [
    {
      title: 'Mapeamento de ativos e definição de SLA',
      desc: 'Identificamos todos os sistemas críticos — servidores, bancos de dados, compartilhamentos de rede — e definimos RPO e RTO específicos para cada um. Nem tudo tem a mesma prioridade de recuperação.',
    },
    {
      title: 'Implantação com agente leve',
      desc: 'Configuramos o agente (restic ou Acronis) com políticas de retenção, janelas de backup, criptografia e múltiplos destinos. Impacto mínimo em produção — backups incrementais com deduplicação.',
    },
    {
      title: 'Validação com restore real',
      desc: 'Diferente de simplesmente verificar a integridade do backup, fazemos restauração real em ambiente isolado. Você recebe o tempo de restore medido e confirmação de que os dados estão íntegros e utilizáveis.',
    },
    {
      title: 'Monitoramento e relatório mensal',
      desc: 'Monitoramos cada execução de backup, alertamos imediatamente em caso de falha e entregamos relatório mensal com status, testes de restore realizados e métricas de RPO/RTO atingidas.',
    },
  ],
  differentials: [
    {
      title: 'RPO e RTO documentados em contrato',
      desc: 'Não em promessa verbal. Você tem um contrato com os tempos de recuperação que a JPX Digital se compromete a entregar e testar periodicamente.',
    },
    {
      title: 'Restore mensal comprovado',
      desc: 'Testamos a restauração real todos os meses e entregamos relatório. Você sabe que o backup funciona antes de precisar dele.',
    },
    {
      title: 'Estratégia 3-2-1 com criptografia',
      desc: '3 cópias, 2 mídias diferentes, 1 offsite. Todos os dados criptografados com AES-256 antes da transmissão. Seus dados não são acessíveis nem pelo provedor de storage.',
    },
    {
      title: 'Cobertura completa: on-premise + cloud',
      desc: 'Protegemos servidores físicos, VMs em qualquer cloud (OCI, Azure, AWS), bancos de dados Oracle, SQL Server e PostgreSQL, e compartilhamentos de rede.',
    },
  ],
  faqs,
  schemas: [
    serviceSchema(
      'Backup Corporativo',
      'Backup corporativo com RPO e RTO definidos em contrato, testados mensalmente. Criptografia AES-256 e múltiplos destinos S3.',
      'Data Backup Service'
    ),
    breadcrumbSchema([
      { name: 'Home', item: BASE },
      { name: 'Serviços', item: `${BASE}/servicos` },
      { name: 'Backup Corporativo', item: `${BASE}/servicos/${slug}` },
    ]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}

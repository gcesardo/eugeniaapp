import { Deck, Card, WeeklyReport } from '../types';

// ATENÇÃO: Mudança de chave para nova identidade PPMG
const STORAGE_KEY = 'eugenia_ppmg_data_v1'; 
const REPORTS_KEY = 'eugenia_ppmg_reports_v1';

// ============================================================================
// 👑 ÁREA DO GESTOR DE CONTEÚDO
// ============================================================================

const INITIAL_DECKS: Deck[] = [
  {
    id: 'deck_direito_adm_completo',
    name: 'Direito Administrativo',
    description: 'Lei 8.112/90, Lei 14.133/21, Atos Administrativos, Poderes e Responsabilidade Civil.',
    createdAt: Date.now(),
    cards: [
      {
        id: 'da_1',
        front: 'A quem se aplica a Lei 14.133/2021?',
        back: '**Administração direta, autárquica e fundacional, inclusive fundações públicas de direito privado**\n\n⚖️ A Lei 14.133/2021 aplica-se à administração direta, autárquica e fundacional, abrangendo inclusive fundações públicas de direito privado, além de órgãos dos poderes Executivo, Legislativo e Judiciário no exercício de função administrativa.\n\n⚠️ Pegadinha comum: não se restringe a entidades de direito público.\n⭐ Tema recorrente em provas.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_2',
        front: 'A quem se aplica a Lei 8.112/1990?',
        back: '**União, autarquias e fundações públicas federais**\n\n⚖️A Lei 8.112/1990 é o Regime Jurídico Único dos servidores civis da União, autarquias e fundações públicas federais. Não se aplica a estados, municípios, empresas públicas ou sociedades de economia mista, que têm regimes próprios ou CLT.\n\nArt. 1º, Lei 8.112/1990.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_3',
        front: 'A recusa de nomeação por crise econômica é válida?',
        back: '**Não, salvo comprovação de situação excepcional**\n\n⚖️ Alegações genéricas, como crise econômica ou pandemia, não afastam o direito à nomeação; é preciso comprovar situação excepcional, grave e imprevisível.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_4',
        front: 'Advertência é aplicada em quais casos?',
        back: '**Violação de proibições específicas ou dever funcional leve**\n\n⚖️A advertência é aplicada por escrito nos casos de infrações menos graves, como violação de proibições dos incisos I a VIII e XIX do art. 117, ou inobservância de dever funcional que não justifique penalidade mais grave.\n\nArt. 129.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_5',
        front: 'Afastamento para estudo no exterior pode exceder quantos anos?',
        back: '**Quatro anos**\n\n⚖️O afastamento para estudo ou missão no exterior não pode exceder quatro anos, devendo o servidor retornar por igual período antes de novo afastamento.\n\nLei 8.112/1990, art. 95.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_6',
        front: 'Afastamento para servir em outro órgão pode ter ônus para quem?',
        back: '**Órgão cessionário, entidade cessionária ou União, conforme o caso**\n\n⚖️O ônus da remuneração do servidor cedido depende do órgão de destino: órgão cessionário, entidade cessionária ou União, conforme a situação.\n\nLei 8.112/1990, art. 93.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_7',
        front: 'Ajuda de custo é devida em qual situação?',
        back: '**Mudança de sede permanente no interesse do serviço**\n\n⚖️A ajuda de custo compensa despesas de instalação do servidor transferido de forma permanente para outra localidade, por interesse da Administração. Não é devida em remoção a pedido.\n\nLei 8.112/1990, arts. 53-57.\nExemplo: servidor transferido de São Paulo para Brasília.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_8',
        front: 'Aproveitamento ocorre em qual situação?',
        back: '**Retorno do servidor em disponibilidade**\n\n⚖️Aproveitamento é o retorno obrigatório do servidor em disponibilidade a cargo compatível, se houver vaga, sob pena de cassação da disponibilidade.\n\nArt. 30.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_9',
        front: 'Assistência à saúde do servidor pode ser prestada de quais formas?',
        back: '**SUS, diretamente, convênio ou ressarcimento**\n\n⚖️A assistência à saúde do servidor pode ser prestada pelo SUS, diretamente pelo órgão, por convênios, contratos ou ressarcimento parcial de gastos com planos privados.\n\nLei 8.112/1990.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_10',
        front: 'Auxílio-moradia é devido a servidor efetivo em razão de nomeação?',
        back: '**Não, apenas em cargos em comissão/função de confiança**\n\n⚖️O auxílio-moradia é destinado a servidores nomeados para cargos em comissão ou função de confiança, mediante requisitos legais, não sendo devido a servidores efetivos por nomeação em cargo efetivo.\n\nLei 8.112/1990, arts. 60-A a 60-E.\n⚠️Questão recorrente em provas.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_11',
        front: 'Cargo público é criado por qual instrumento?',
        back: '**Lei**\n\n⚖️O cargo público só pode ser criado por lei, com denominação própria, atribuições e remuneração pelos cofres públicos.\n\nArt. 3º, Lei 8.112/1990.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_12',
        front: 'Cassação de aposentadoria ocorre em quais hipóteses?',
        back: '**Quando o servidor comete falta que resultaria em demissão**\n\n⚖️A cassação de aposentadoria ou disponibilidade é aplicada se o servidor comete infração que levaria à demissão se estivesse em atividade.\n\nArt. 127.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_13',
        front: 'Contratação sem concurso público é válida pelo decurso do tempo?',
        back: '**Não, é sempre nula**\n\n⚖️ A contratação sem concurso público é nula de pleno direito, não sendo convalidada pelo simples decurso do tempo, conforme CF, art. 37, II.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_14',
        front: 'Diárias são devidas em deslocamento permanente do cargo?',
        back: '**Não, apenas para afastamentos eventuais ou transitórios**\n\n⚖️Diárias não são devidas quando o deslocamento é exigência permanente do cargo, apenas em situações eventuais e transitórias.\n\nLei 8.112/1990, art. 58, §2º.\n⚠️Atenção para não confundir deslocamento eventual com permanente.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_15',
        front: 'Empregado público é regido por qual regime?',
        back: '**Regime celetista (CLT)**\n\n⚖️ Empregados públicos possuem vínculo celetista e atuam em entidades da Administração Indireta, como empresas públicas e sociedades de economia mista, sendo regidos pela CLT.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_16',
        front: 'Férias podem ser interrompidas em quais situações?',
        back: '**Calamidade, comoção interna, júri, serviço militar/eleitoral, necessidade do serviço**\n\n⚖️As férias podem ser interrompidas em situações excepcionais, como calamidade pública, convocação para júri ou necessidade do serviço, devendo o restante ser gozado de uma só vez.\n\nLei 8.112/1990, art. 80.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_17',
        front: 'Férias podem ser parceladas em até quantas etapas?',
        back: '**Três etapas**\n\n⚖️A férias podem ser parceladas em até três etapas, a critério da administração, facilitando a gestão do serviço e o interesse do servidor.\n\nLei 8.112/1990, art. 77, §1º.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_18',
        front: 'Função de confiança é destinada a quem?',
        back: '**Apenas a servidores efetivos**\n\n⚖️ Funções de confiança são conjuntos de atribuições destinados exclusivamente a servidores efetivos, não constituindo cargo público.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_20',
        front: 'Inassiduidade habitual se caracteriza por faltas injustificadas em quantos dias?',
        back: '**60 dias interpolados em 12 meses**\n\n⚖️A inassiduidade habitual ocorre quando o servidor falta, sem justificativa, por 60 dias interpolados em 12 meses, ensejando demissão.\n\nArt. 139.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_21',
        front: 'Indenização de transporte é concedida em qual situação?',
        back: '**Uso de meio próprio para serviço externo inerente ao cargo**\n\n⚖️O servidor que utiliza veículo próprio para realizar serviços externos inerentes ao cargo faz jus à indenização de transporte, ressarcindo despesas com deslocamento.\n\nLei 8.112/1990, art. 60.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_22',
        front: 'Indenizações incorporam-se ao vencimento do servidor?',
        back: '**Não, não se incorporam ao vencimento ou provento**\n\n⚖️Indenizações têm caráter eventual e visam ressarcir despesas do servidor no exercício do cargo. Por isso, não são incorporadas ao vencimento ou provento, nem servem de base para outros cálculos.\n\nLei 8.112/1990, art. 49, §1º.\n⚠️Atenção para não confundir com gratificações e adicionais.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_23',
        front: 'Julgue: A ação popular pode ser proposta por qualquer cidadão.',
        back: '**Correto**\n\n⚖️Qualquer cidadão pode propor ação popular para anular atos lesivos ao patrimônio público, moralidade, meio ambiente e patrimônio histórico.\n\nArt. 5º, LXXIII CF.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_25',
        front: 'Julgue: A administração é obrigada a contratar toda a quantidade registrada na ata do SRP.',
        back: '**Errado**\n\n⚖️A administração não é obrigada a contratar a totalidade da quantidade registrada na ata de preços, podendo adquirir conforme sua necessidade.\n\nLei 14.133/2021.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_26',
        front: 'Julgue: A Administração pode alterar unilateralmente contratos administrativos.',
        back: '**Correto**\n\n⚖️A Administração, com base na supremacia do interesse público, pode alterar unilateralmente contratos administrativos para adequá-los ao interesse coletivo, respeitando limites legais.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_28',
        front: 'Julgue: A autotutela permite à Administração rever seus próprios atos.',
        back: '**Correto**\n\n⚖️O princípio da autotutela autoriza a Administração a anular atos ilegais e revogar atos inconvenientes, de ofício ou por provocação, sem necessidade de decisão judicial.\n\nSúmulas 346 e 473 STF.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_31',
        front: 'Julgue: A culpa concorrente da vítima exclui a responsabilidade objetiva do Estado.',
        back: '**Errado**\n\n⚖️A culpa concorrente da vítima não exclui, mas atenua a responsabilidade objetiva do Estado, reduzindo o valor da indenização proporcionalmente à contribuição da vítima para o dano.\n\nDoutrina e jurisprudência.\n⚠️Atenua, não exclui!',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_33',
        front: 'Julgue: A desconcentração distribui competências dentro da mesma pessoa jurídica.',
        back: '**Correto**\n\n⚖️ Desconcentração é a técnica de distribuir competências internamente, criando órgãos dentro da mesma pessoa jurídica, com hierarquia entre eles.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_36',
        front: 'Julgue: A imperatividade está presente em todos os atos administrativos.',
        back: '**Errado**\n\n⚖️Nem todos os atos administrativos são imperativos; atos negociais, por exemplo, não impõem obrigações a terceiros.\n\nExemplo: concessão de licença para construção.\n⚠️Pegadinha frequente.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_37',
        front: 'Julgue: A impessoalidade veda promoção pessoal de agentes públicos.',
        back: '**Correto**\n\n⚖️O princípio da impessoalidade veda a promoção pessoal de agentes públicos, exigindo que os atos sejam praticados em nome do Estado e para o interesse coletivo.\n\nArt. 37, §1º, CF/88.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_39',
        front: 'Julgue: A investidura em cargo público ocorre na posse.',
        back: '**Correto**\n\n⚖️A investidura em cargo público ocorre com a posse, momento em que o nomeado se torna servidor.\n\nArt. 7º, Lei 8.112/1990.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_42',
        front: 'Julgue: A licitação dispensada é decisão vinculada.',
        back: '**Correto**\n\n⚖️Nos casos de licitação dispensada, a administração é obrigada a não licitar, por determinação legal expressa. Trata-se de decisão vinculada, não havendo margem de escolha para o gestor.\n\nArt. 76 da Lei 14.133/2021.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_45',
        front: 'Julgue: A presunção de legitimidade é absoluta nos atos administrativos.',
        back: '**Errado**\n\n⚖️A presunção de legitimidade é relativa (iuris tantum), admitindo prova em contrário pelo interessado.\n\nAtributo presente em todos os atos.\n⚠️Não confunda com presunção absoluta.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_46',
        front: 'Julgue: A publicidade das propostas é absoluta em todas as fases.',
        back: '**Errado**\n\n⚖️ A publicidade das propostas é diferida até a data de abertura, não sendo absoluta em todas as fases do certame. ⚠️ Pegadinha comum sobre publicidade irrestrita.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_49',
        front: 'Julgue: A responsabilidade do Estado por má conservação de rodovias é objetiva.',
        back: '**Correto**\n\n⚖️Tanto o Estado quanto concessionárias respondem objetivamente por danos causados por má conservação de rodovias sob sua responsabilidade, conforme teoria do risco administrativo.\n\nDoutrina e jurisprudência.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_50',
        front: 'Julgue: A sanção de polícia é sempre administrativa.',
        back: '**Correto**\n\n⚖️As sanções de polícia são administrativas, aplicadas pela Administração quando ocorre infração a normas de polícia, como multas, interdições e apreensões.\n\nNão se confundem com sanções penais.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_52',
        front: 'Julgue: Absolvição criminal por inexistência do fato afasta responsabilidade administrativa.',
        back: '**Correto**\n\n⚖️Se a absolvição criminal negar a existência do fato ou a autoria, afasta-se a responsabilidade administrativa do servidor.\n\nArt. 126, Lei 8.112/1990.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_53',
        front: 'Julgue: Ação disciplinar prescreve em 5 anos para demissão.',
        back: '**Correto**\n\n⚖️O prazo prescricional para aplicação de penalidade de demissão, cassação ou destituição é de 5 anos, contados do conhecimento do fato pela autoridade competente.\n\nArt. 142.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_54',
        front: 'Julgue: Acumulação ilegal de cargos é punida com demissão.',
        back: '**Correto**\n\n⚖️A acumulação ilegal de cargos, empregos ou funções públicas é considerada infração gravíssima, punida com demissão.\n\nArt. 132, XII.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_59',
        front: 'Julgue: Atos discricionários admitem juízo de conveniência e oportunidade.',
        back: '**Correto**\n\n⚖️Nos atos discricionários, o agente público pode valorar motivos e escolher o objeto, dentro dos limites legais, segundo conveniência e oportunidade.\n\nMérito administrativo.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_63',
        front: 'Julgue: Autarquias podem exercer todas as fases do ciclo do poder de polícia.',
        back: '**Correto**\n\n⚖️Autarquias e fundações públicas podem exercer todas as fases do ciclo do poder de polícia, exceto edição de normas primárias, desde que haja previsão legal.\n\nJurisprudência STF.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_65',
        front: 'Julgue: Autorização é ato discricionário e precário.',
        back: '**Correto**\n\n⚖️Autorização é ato discricionário e precário, concedido por juízo de conveniência, podendo ser revogado a qualquer tempo.\n\nEx: autorização de uso de bem público.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_66',
        front: 'Julgue: Auxílio-funeral equivale a um mês de remuneração do servidor falecido.',
        back: '**Correto**\n\n⚖️O auxílio-funeral é devido à família do servidor falecido, ativo ou aposentado, no valor de um mês de remuneração ou provento.\n\nArt. 226.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_68',
        front: 'Julgue: Contratação direta é exceção à regra da licitação.',
        back: '**Correto**\n\n⚖️A regra geral é a realização de licitação para contratações públicas. A contratação direta, por dispensa ou inexigibilidade, é exceção prevista em lei para situações específicas.\n\nLei 14.133/2021.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_70',
        front: 'Julgue: Convalidação gera efeitos retroativos.',
        back: '**Correto**\n\n⚖️Convalidação é a correção de vício sanável (forma ou competência), mantendo o ato e seus efeitos retroativos (ex tunc). Não se aplica a vícios de motivo e finalidade.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_74',
        front: 'Julgue: Desvio de poder ocorre quando o agente atua com finalidade diversa da prevista em lei.',
        back: '**Correto**\n\n⚖️O desvio de poder (ou de finalidade) ocorre quando o agente pratica ato visando interesse diverso do público, contrariando a finalidade legal.\n\nExemplo: remoção para prejudicar servidor.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_75',
        front: 'Julgue: É proibido praticar usura sob qualquer forma.',
        back: '**Correto**\n\n⚖️Praticar usura, ou seja, cobrar juros abusivos ou agir como agiota, é expressamente proibido ao servidor público.\n\nArt. 117, XIV.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_78',
        front: 'Julgue: Em emergência, a contratação direta pode ser prorrogada além de um ano.',
        back: '**Errado**\n\n⚖️Contratações diretas por emergência ou calamidade pública devem ser concluídas em até um ano, vedada a prorrogação e a recontratação da mesma empresa pelo mesmo motivo.\n\nLei 14.133/2021.\n⚠️Atenção à vedação expressa de prorrogação.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_79',
        front: 'Julgue: Empregados de empresas públicas federais são regidos pela Lei 8.112/1990.',
        back: '**Errado**\n\n⚖️ Empregados de empresas públicas e sociedades de economia mista são regidos pela CLT, não pela Lei 8.112/1990.\n\n⚠️ Questão recorrente em provas.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_81',
        front: 'Julgue: Empresas estatais não podem exercer atividades típicas de Estado.',
        back: '**Correto**\n\n⚖️Empresas públicas e sociedades de economia mista não podem exercer atividades típicas de Estado, reservadas a pessoas jurídicas de direito público.\n\nArt. 173, §1º, CF.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_87',
        front: 'Julgue: Empresas públicas exploradoras de atividade econômica respondem objetivamente pelos danos causados.',
        back: '**Errado**\n\n⚖️Empresas públicas e sociedades de economia mista que exploram atividade econômica respondem subjetivamente, conforme regras do direito civil, não se aplicando a responsabilidade objetiva do art. 37, § 6º, CF.\n\nArt. 173, § 1º, II, CF.\n⚠️Pegadinha comum!',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_89',
        front: 'Julgue: Estágio probatório dura três anos.',
        back: '**Correto**\n\n⚖️O estágio probatório é o período de três anos em que o servidor efetivo é avaliado em critérios como assiduidade, disciplina, produtividade, responsabilidade e iniciativa.\n\nArt. 20.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_90',
        front: 'Julgue: Exame psicotécnico só pode ser exigido por lei.',
        back: '**Correto**\n\n⚖️Só por lei se pode exigir exame psicotécnico para cargo público, vedada restrição por ato administrativo.\n\nSúmula Vinculante 44 do STF.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_91',
        front: 'Julgue: Excludentes de ilicitude penal afastam a responsabilidade civil do Estado.',
        back: '**Errado**\n\n⚖️Excludentes de ilicitude penal, como legítima defesa, não afastam a responsabilidade civil do Estado, que pode decorrer de atos lícitos ou ilícitos praticados por seus agentes.\n\nDoutrina e jurisprudência.\n⚠️Cuidado com a diferença entre penal e civil.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_92',
        front: 'Julgue: Faltas injustificadas podem ser descontadas do período de férias.',
        back: '**Errado. Não podem ser descontadas do período de férias**\n\n⚖️Faltas injustificadas não reduzem o período de férias, mas geram desconto na remuneração.\n\nLei 8.112/1990, art. 77, §2º.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_93',
        front: 'Julgue: Filhos inválidos têm direito à pensão vitalícia.',
        back: '**Correto**\n\n⚖️Filhos inválidos, ou com deficiência grave, intelectual ou mental, têm direito à pensão vitalícia como dependentes do servidor.\n\nLei 8.112/1990.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_98',
        front: 'Julgue: Licença para acompanhar cônjuge deslocado é remunerada.',
        back: '**Errado. É sem remuneração**\n\n⚖️A licença para acompanhar cônjuge ou companheiro deslocado é concedida sem remuneração e por prazo indeterminado.\n\nLei 8.112/1990, art. 84.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_99',
        front: 'Julgue: Licença para capacitação é direito do servidor e sempre obrigatória.',
        back: '**Errado. É discricionária e depende do interesse da Administração**\n\n⚖️A licença para capacitação é concedida a critério da Administração, não sendo direito subjetivo do servidor.\n\nLei 8.112/1990, art. 87.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_106',
        front: 'Julgue: Nem todo ato de polícia é discricionário.',
        back: '**Correto**\n\n⚖️Há atos de polícia vinculados, como a concessão de licença quando preenchidos todos os requisitos legais, sem margem de escolha para o agente.\n\nExemplo: licença para construir.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_107',
        front: 'Julgue: Nepotismo veda nomeação de parentes até o terceiro grau para cargo em comissão.',
        back: '**Correto**\n\n⚖️ A Súmula Vinculante 13 do STF proíbe a nomeação de cônjuge, companheiro ou parente até o terceiro grau para cargos em comissão, confiança ou função gratificada na administração pública.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_108',
        front: 'Julgue: No poder discricionário, há margem para juízo de conveniência e oportunidade.',
        back: '**Correto**\n\n⚖️O poder discricionário permite ao agente público escolher, dentro dos limites legais, a melhor solução para o interesse público, avaliando conveniência e oportunidade.\n\nExemplo: escolha de local para instalação de serviço público.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_110',
        front: 'Julgue: O adicional de férias é de 1/3 da remuneração do período.',
        back: '**Correto**\n\n⚖️O adicional de férias corresponde a 1/3 da remuneração do período de férias, pago independentemente de solicitação.\n\nLei 8.112/1990, art. 76.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_111',
        front: 'Julgue: O adicional de insalubridade pode ser acumulado com o de periculosidade.',
        back: '**Errado. O servidor deve optar por um deles**\n\n⚖️É vedada a acumulação dos adicionais de insalubridade e periculosidade. O servidor deve escolher qual receber.\n\nLei 8.112/1990, art. 68, §1º.\n⚠️Pegadinha clássica em concursos.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_115',
        front: 'Julgue: O controle interno é exercido pela própria entidade ou órgão.',
        back: '**Correto**\n\n⚖️O controle interno ocorre dentro do próprio órgão ou entidade responsável pela atividade controlada, visando avaliar legalidade, metas e resultados da gestão.\n\nArt. 74 CF. ⭐ Muito cobrado.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_116',
        front: 'Julgue: O controle judicial dos atos administrativos limita-se à análise da legalidade.',
        back: '**Correto**\n\n⚖️O controle judicial dos atos administrativos restringe-se à legalidade, não podendo o Judiciário analisar o mérito (conveniência e oportunidade) dos atos.\n\nArt. 5º, XXXV, CF.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_118',
        front: 'Julgue: O credenciamento é hipótese de inexigibilidade de licitação.',
        back: '**Correto**\n\n⚖️O credenciamento configura hipótese de inexigibilidade de licitação, pois há inviabilidade de competição. Todos os interessados que atendam aos requisitos podem ser contratados.\n\nLei 14.133/2021.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_124',
        front: 'Julgue: O Estado responde civilmente por atos legislativos legítimos que causem dano.',
        back: '**Errado**\n\n⚖️Em regra, o Estado não responde civilmente por atos legislativos legítimos, ainda que causem dano. Só há responsabilidade em casos de lei inconstitucional, leis de efeitos concretos ou omissão legislativa específica.\n\nDoutrina e jurisprudência.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_125',
        front: 'Julgue: O Estado responde objetivamente por atos de empresas privadas que prestam serviço público por delegação.',
        back: '**Correto**\n\n⚖️Quando empresas privadas prestam serviços públicos por delegação (concessão, permissão ou autorização), a responsabilidade civil do Estado é objetiva, nos termos do art. 37, § 6º, CF. Isso ocorre porque essas empresas agem como extensão do poder público.\n\n⭐ Importante para concursos.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_126',
        front: 'Julgue: O Estado responde objetivamente por danos causados por atos lícitos e ilícitos.',
        back: '**Correto**\n\n⚖️A responsabilidade objetiva do Estado abrange tanto atos lícitos quanto ilícitos, desde que presentes dano, conduta estatal e nexo causal, conforme teoria do risco administrativo.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_131',
        front: 'Julgue: O modo fechado pode ser usado isoladamente no critério menor preço.',
        back: '**Errado**\n\n⚖️É vedado o uso isolado do modo fechado de disputa quando o critério de julgamento for menor preço ou maior desconto. O modo aberto deve ser utilizado.\n\nLei 14.133/2021.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_133',
        front: 'Julgue: O poder de polícia limita direitos individuais em prol do interesse coletivo.',
        back: '**Correto**\n\n⚖️O poder de polícia permite à Administração limitar ou condicionar direitos, interesses e liberdades para proteger o interesse público, como saúde, segurança e ordem.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_134',
        front: 'Julgue: O poder disciplinar depende de vínculo jurídico específico com a Administração.',
        back: '**Correto**\n\n⚖️O poder disciplinar só pode ser exercido sobre servidores e particulares que possuam vínculo jurídico específico com a Administração, como contratados ou alunos de escola pública.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_135',
        front: 'Julgue: O poder disciplinar permite punir apenas servidores públicos.',
        back: '**Errado**\n\n⚖️O poder disciplinar alcança servidores e também particulares com vínculo jurídico específico com a Administração, como contratados e alunos de escola pública.\n\nExemplo: punição de empresa contratada por descumprir contrato.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_136',
        front: 'Julgue: O Poder Judiciário pode anular atos discricionários ilegais.',
        back: '**Correto**\n\n⚖️O Judiciário pode anular atos discricionários se forem ilegais, ilegítimos, desarrazoados ou desproporcionais, mas não pode revogá-los.\n\nArt. 5º, XXXV CF.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_137',
        front: 'Julgue: O princípio da continuidade impede a interrupção absoluta dos serviços públicos.',
        back: '**Errado**\n\n⚖️O princípio da continuidade exige a prestação contínua dos serviços públicos, mas admite interrupções em situações excepcionais, como emergência ou inadimplência do usuário.\n\nArt. 6º, §3º, Lei 8.987/95.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_143',
        front: 'Julgue: O regime jurídico administrativo se baseia na supremacia e indisponibilidade do interesse público.',
        back: '**Correto**\n\n⚖️Os dois pilares do regime jurídico administrativo são a supremacia do interesse público (prerrogativas) e a indisponibilidade do interesse público (sujeições), orientando toda a atuação estatal.\n\n⭐ Muito cobrado em concursos.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_146',
        front: 'Julgue: O rol de hipóteses de dispensa de licitação é exemplificativo.',
        back: '**Errado**\n\n⚖️O rol de hipóteses de dispensa de licitação é taxativo, ou seja, somente pode ser aplicado nos casos expressamente previstos em lei.\n\nArt. 75 da Lei 14.133/2021.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_147',
        front: 'Julgue: O rol de hipóteses de inexigibilidade é taxativo.',
        back: '**Errado**\n\n⚖️O rol de hipóteses de inexigibilidade é exemplificativo, ou seja, não se limita aos casos expressos na lei. Sempre que houver inviabilidade de competição, pode-se reconhecer a inexigibilidade.\n\nArt. 74 da Lei 14.133/2021.\n⚠️Pegadinha comum!',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_148',
        front: 'Julgue: O servidor deve restituir diárias recebidas sem afastamento da sede.',
        back: '**Correto. Restituição integral em até 5 dias**\n\n⚖️Caso o servidor receba diárias sem efetivo afastamento da sede, deve restituir o valor integral em até 5 dias, sob pena de responsabilidade administrativa.\n\nLei 8.112/1990, art. 59.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_149',
        front: 'Julgue: O servidor pode prestar serviços gratuitos ao Poder Público.',
        back: '**Errado. É proibido, salvo exceções legais**\n\n⚖️A prestação de serviços gratuitos por servidor público é vedada, exceto quando houver previsão legal específica. Isso garante a remuneração obrigatória pelo serviço prestado, protegendo o servidor.\n\nLei 8.112/1990, art. 4º.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_150',
        front: 'Julgue: O Sistema de Registro de Preços pode ser utilizado em contratação direta.',
        back: '**Correto**\n\n⚖️O Sistema de Registro de Preços (SRP) pode ser utilizado tanto em licitações quanto em contratações diretas, inclusive por inexigibilidade ou dispensa, para aquisição por múltiplos órgãos.\n\nLei 14.133/2021.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_157',
        front: 'Julgue: O valor exato do limite permite a dispensa de licitação.',
        back: '**Errado**\n\n⚖️A lei utiliza a expressão "valores inferiores", ou seja, o valor exato do limite não permite a dispensa de licitação. Apenas valores abaixo do limite.\n\nLei 14.133/2021.\n⚠️Atenção à literalidade da lei.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_163',
        front: 'Julgue: Os princípios expressos da Administração Pública estão no art. 37 da CF/88.',
        back: '**Correto**\n\n⚖️Os princípios expressos da Administração Pública – legalidade, impessoalidade, moralidade, publicidade e eficiência – estão previstos no art. 37, caput, da Constituição Federal.\n\nMnemônico LIMPE. ⭐ Decore para provas!',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_164',
        front: 'Julgue: PAD é obrigatório para aplicação de demissão.',
        back: '**Correto**\n\n⚖️O Processo Administrativo Disciplinar (PAD) é indispensável para aplicação de penalidades graves como demissão, cassação e destituição.\n\nArt. 143, 154.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_166',
        front: 'Julgue: Prazo para posse é de 30 dias, improrrogáveis.',
        back: '**Correto**\n\n⚖️O prazo para tomar posse é de 30 dias, improrrogáveis, contados da publicação do ato de nomeação, salvo impedimento legal.\n\nArt. 13.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_168',
        front: 'Julgue: Prisão preventiva legal e posterior absolvição gera direito à indenização por erro judiciário.',
        back: '**Errado**\n\n⚖️A absolvição após prisão preventiva legal não gera, por si só, direito à indenização por erro judiciário. Só há indenização em caso de ilegalidade ou erro no procedimento.\n\nNovo CPC, jurisprudência.\n⚠️Atenção ao requisito de ilegalidade.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_177',
        front: 'Julgue: Revogação atinge atos ilegais.',
        back: '**Errado**\n\n⚖️A revogação só alcança atos válidos, por motivo de conveniência e oportunidade; atos ilegais devem ser anulados. Não se revogam atos vinculados ou ilegais.\n\n⚠️Confusão comum em provas.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_178',
        front: 'Julgue: Servidor temporário ocupa cargo público.',
        back: '**Errado. Ocupa função pública, não cargo**\n\n⚖️ Servidores temporários não ocupam cargo público, mas sim função pública, com vínculo especial e transitório, não sendo regidos pelo regime estatutário nem celetista.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_179',
        front: 'Julgue: Sobrepreço é preço superior ao estimado; superfaturamento é dano na execução.',
        back: '**Correto**\n\n⚖️Sobrepreço é o valor acima do estimado; superfaturamento é o dano à administração na execução do contrato, ambos vedados pela Lei 14.133/2021.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_181',
        front: 'Julgue: Suspensão pode ser convertida em multa.',
        back: '**Correto**\n\n⚖️A suspensão pode ser convertida em multa de 50% por dia de vencimento, se houver conveniência para o serviço. O servidor continua trabalhando normalmente.\n\nArt. 130, §2º.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_182',
        front: 'Julgue: Todo ato administrativo deve ter por fim o interesse público.',
        back: '**Correto**\n\n⚖️A finalidade é elemento essencial do ato administrativo; sua ausência configura desvio de finalidade, tornando-o nulo.\n\n⚠️Desvio de finalidade é vício insanável. ⭐ Tema recorrente.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_183',
        front: 'Julgue: Tomada de preços e convite são modalidades previstas na Lei 14.133/2021.',
        back: '**Errado**\n\n⚖️ Tomada de preços e convite não são modalidades previstas na Lei 14.133/2021, tendo sido extintas pela nova lei.\n\n⚠️ Atenção à extinção dessas modalidades.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_185',
        front: 'Julgue: Vantagens pecuniárias podem ser acumuladas para outros acréscimos sob o mesmo título.',
        back: '**Errado. Não podem ser acumuladas**\n\n⚖️As vantagens pecuniárias não podem ser computadas nem acumuladas para concessão de outros acréscimos sob o mesmo título, evitando duplicidade de pagamentos.\n\nLei 8.112/1990, art. 50.\n⚠️Pegadinha comum em provas.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_186',
        front: 'Julgue: Vício de finalidade é sanável por convalidação.',
        back: '**Errado**\n\n⚖️Vícios nos elementos finalidade e motivo são considerados insanáveis, não admitindo convalidação.\n\nTeoria dualista das nulidades. ⚠️Atenção à diferença entre vícios sanáveis e insanáveis.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_189',
        front: 'Licença para atividade política é remunerada em qual período?',
        back: '**Do registro da candidatura até 10º dia após eleição (máx. 3 meses)**\n\n⚖️A licença para atividade política só é remunerada do registro da candidatura até o décimo dia após a eleição, limitada a três meses.\n\nLei 8.112/1990, art. 86.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_190',
        front: 'Licença para tratar de interesses particulares pode ser interrompida pela Administração?',
        back: '**Sim, a qualquer tempo, no interesse do serviço**\n\n⚖️A licença para tratar de interesses particulares é discricionária e pode ser interrompida unilateralmente pela Administração, mesmo sem consentimento do servidor.\n\nLei 8.112/1990, art. 91, parágrafo único.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_193',
        front: 'O adicional noturno é devido em qual horário?',
        back: '**Das 22h às 5h do dia seguinte**\n\n⚖️O adicional noturno é pago ao servidor que trabalha entre 22h e 5h, com acréscimo de 25% no valor-hora.\n\nLei 8.112/1990, art. 75.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_194',
        front: 'O Judiciário pode revisar notas de provas de concurso?',
        back: '**Não, só verifica compatibilidade com o edital**\n\n⚖️ O Poder Judiciário não pode substituir a banca examinadora para avaliar respostas e notas, apenas verificar se as questões estão de acordo com o edital.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_195',
        front: 'O que caracteriza o poder vinculado na Administração Pública?',
        back: '**Ausência de liberdade; conduta determinada integralmente pela lei**\n\n⚖️No poder vinculado, a lei define exatamente como o agente deve agir, sem margem para escolhas pessoais. O administrador apenas executa o que está previsto.\n\n⭐ Muito cobrado em provas.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_196',
        front: 'O que diferencia direito público de direito privado?',
        back: '**Público: verticalidade; Privado: horizontalidade/autonomia da vontade**\n\n⚖️Direito público regula relações entre Estado e particulares, com supremacia do interesse público e verticalidade. Direito privado regula relações entre particulares, com igualdade e autonomia da vontade.\n\n⭐ Diferença fundamental para provas.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_197',
        front: 'O que diferencia entidade de órgão na Administração Pública?',
        back: '**Entidade tem personalidade jurídica; órgão não tem**\n\n⚖️Entidades são pessoas jurídicas (como União, autarquias) com capacidade de adquirir direitos e obrigações em nome próprio. Órgãos são centros de decisão sem personalidade jurídica, atuando em nome da entidade a que pertencem.\n\nExemplo: Ministério (órgão) da União (entidade). ⭐ Diferença básica e recorrente.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_198',
        front: 'O que distingue legalidade de legitimidade no controle administrativo?',
        back: '**Legalidade é conformidade à lei; legitimidade inclui princípios e valores administrativos**\n\n⚖️Legalidade exige que o ato administrativo esteja de acordo com a lei, enquanto legitimidade exige também aderência a princípios como moralidade, impessoalidade e finalidade pública.\n\n⚠️Não confundir legalidade (lei) com legitimidade (princípios).',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_199',
        front: 'O que é ato administrativo?',
        back: '**Manifestação unilateral da Administração para produzir efeitos jurídicos**\n\n⚖️O ato administrativo é uma declaração unilateral da Administração Pública, sob regime de direito público, destinada a criar, modificar, extinguir ou declarar direitos, sempre visando ao interesse público.\n\n⭐ Conceito fundamental em provas.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_200',
        front: 'O que é o regime jurídico administrativo?',
        back: '**Conjunto de normas e princípios que conferem prerrogativas e sujeições**\n\n⚖️O regime jurídico administrativo é o conjunto de regras e princípios que estruturam a atuação da Administração Pública, conferindo-lhe poderes especiais (prerrogativas) e impondo restrições (sujeições), sempre visando ao interesse público.\n\n⭐ Conceito fundamental em provas.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_201',
        front: 'O que é vencimento segundo a Lei 8.112/1990?',
        back: '**Retribuição pecuniária pelo exercício de cargo público, fixada em lei**\n\n⚖️O vencimento é a base da remuneração do servidor público federal, sendo o valor fixo estabelecido em lei para cada cargo. Ele não inclui vantagens, adicionais ou gratificações.\n\nLei 8.112/1990, art. 40.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_204',
        front: 'Pensão por morte pode ser acumulada de mais de um cônjuge?',
        back: '**Não, é vedada a acumulação**\n\n⚖️A legislação proíbe a percepção cumulativa de pensão deixada por mais de um cônjuge ou companheiro(a), salvo direito de opção.\n\nLei 8.112/1990.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_206',
        front: 'Prazo para conclusão do PAD é de quantos dias?',
        back: '**60 dias, prorrogável uma vez**\n\n⚖️O PAD deve ser concluído em 60 dias, prorrogáveis uma vez por igual período. O julgamento ocorre em até 20 dias após o recebimento.\n\nArt. 152, 167, 169.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_210',
        front: 'Qual a idade mínima para posse em cargo público federal?',
        back: '**18 anos**\n\n⚖️A idade mínima para posse em cargo público federal é dezoito anos, comprovada no ato da posse.\n\nArt. 5º, V.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_211',
        front: 'Qual é a natureza da responsabilidade do Estado por danos ambientais?',
        back: '**Objetiva, risco integral**\n\n⚖️A responsabilidade civil por danos ambientais é objetiva e fundamentada na teoria do risco integral, não admitindo excludentes. Aplica-se tanto a entes públicos quanto privados.\n\nLei 6.938/1981.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_212',
        front: 'Qual é a natureza jurídica das empresas públicas e sociedades de economia mista?',
        back: '**Direito privado**\n\n⚖️Empresas públicas e sociedades de economia mista possuem personalidade jurídica de direito privado, mesmo integrando a administração indireta. \n\nArt. 173, CF; Lei 13.303/2016. ⭐ Tema frequente.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_215',
        front: 'Qual é o limite atualizado para contratos verbais pela Lei 14.133/2021?',
        back: '**R$ 11.981,20 (Decreto 11.871/2023)**\n\n⚖️O limite para contratos verbais previsto originalmente na Lei 14.133/2021 era de R$ 10.000,00, mas esse valor é atualizado anualmente por decreto.\n\n⚠️Atenção à atualização anual dos valores.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_216',
        front: 'Qual é o prazo prescricional para ação de indenização contra o Estado?',
        back: '**Cinco anos**\n\n⚖️O prazo prescricional para o terceiro lesado ingressar com ação de indenização contra o Estado é de cinco anos, conforme Decreto 20.910/1932 e Art. 1º-C da Lei 9.494/1997.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_218',
        front: 'Qual teoria fundamenta a responsabilidade civil objetiva do Estado no Brasil?',
        back: '**Teoria do risco administrativo**\n\n⚖️A responsabilidade civil objetiva do Estado no Brasil é fundamentada na teoria do risco administrativo. Não é necessário comprovar dolo ou culpa do agente público.\n\nArt. 37, § 6º, CF. ⚠️Não confunda com risco integral. ⭐ Muito cobrado.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_219',
        front: 'Quando a responsabilidade do Estado por omissão será objetiva?',
        back: '**Quando descumpre dever legal específico de agir**\n\n⚖️A responsabilidade do Estado por omissão é objetiva quando há descumprimento de dever legal específico de agir, como proteger pessoas sob sua guarda (ex: presos, alunos).\n\nExemplo: fuga de preso sob custódia.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      },
      {
        id: 'da_220',
        front: 'Quando cessa o direito ao adicional de insalubridade?',
        back: '**Com a eliminação das condições ou riscos que o causaram**\n\n⚖️O direito ao adicional de insalubridade termina quando são eliminadas as condições insalubres ou perigosas do ambiente de trabalho, conforme laudo técnico.\n\nLei 8.112/1990, art. 68, §2º.',
        dueDate: Date.now(), interval: 0, ease: 2.5, repetition: 0, state: 'new', reviewHistory: []
      }
    ]
  }
];

// ============================================================================
// FIM DA ÁREA DO GESTOR
// ============================================================================

export const loadDecks = (): Deck[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      saveDecks(INITIAL_DECKS);
      return INITIAL_DECKS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to load decks", e);
    return [];
  }
};

export const saveDecks = (decks: Deck[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  } catch (e) {
    console.error("Failed to save decks", e);
  }
};

export const loadReports = (): WeeklyReport[] => {
    try {
        const data = localStorage.getItem(REPORTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
};

export const saveReports = (reports: WeeklyReport[]) => {
    try {
        localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
    } catch (e) {
        console.error("Failed to save reports", e);
    }
};
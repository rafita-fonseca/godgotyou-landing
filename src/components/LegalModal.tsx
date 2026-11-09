import React, { useState, useEffect } from 'react';
import { Shield, FileText, X, RefreshCw, Mail, Sparkles, Lock, BookOpen } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
  initialTab?: 'privacy' | 'terms' | 'refunds';
}

const LEGAL_TEXTS = {
  headerTitle: {
    es: 'God Got You · Marco Legal & Transparencia',
    en: 'God Got You · Legal & Transparency Framework',
    pt: 'God Got You · Marco Legal & Transparência',
    fr: 'God Got You · Cadre Légal & Transparence',
  },
  headerSubtitle: {
    es: 'Privacidad y Términos del Servicio',
    en: 'Privacy & Terms of Service',
    pt: 'Privacidade e Termos de Serviço',
    fr: 'Confidentialité et Conditions d’Utilisation',
  },
  tabPrivacy: { 
    es: 'Privacidad & Datos', 
    en: 'Privacy & Data', 
    pt: 'Privacidade & Dados', 
    fr: 'Confidentialité & Données' 
  },
  tabTerms: { 
    es: 'Términos de Servicio', 
    en: 'Terms of Service', 
    pt: 'Termos de Serviço', 
    fr: 'Conditions d’Utilisation' 
  },
  tabRefunds: { 
    es: 'Garantía & Reembolsos', 
    en: 'Refund Policy (14 Days)', 
    pt: 'Garantia & Reembolsos', 
    fr: 'Garantie & Remboursements' 
  },
  privacyBanner: {
    es: 'Privacidad absoluta por diseño. Tus reflexiones y notas residen exclusivamente en tu dispositivo; jamás vendemos, comercializamos ni entrenamos modelos públicos de IA con tu información.',
    en: 'Absolute privacy by design. Your private notes and reflections reside solely on your device; we never sell, monetize, or train public AI models on your personal data.',
    pt: 'Privacidade absoluta por princípio. Suas anotações e reflexões residem exclusivamente no seu aparelho; nunca vendemos, comercializamos nem treinamos modelos públicos de IA com seus dados.',
    fr: 'Confidentialité absolue par conception. Vos réflexions personnelles restent exclusivement sur votre appareil ; nous ne vendons ni n’entraînons jamais d’IA publique avec vos données.',
  },
  privacyH1: { 
    es: '1. Arquitectura Local y Cuotas de Uso', 
    en: '1. Local Architecture & Usage Quotas', 
    pt: '1. Arquitetura Local e Cotas de Uso', 
    fr: '1. Architecture Locale & Quotas d’Usage' 
  },
  privacyP1: {
    es: 'Operamos bajo una arquitectura local-first. Gestionamos cuotas de uso mediante un identificador técnico local en tu navegador para garantizar el acceso gratuito de 3 consultas bíblicas semanales. No requerimos registro obligatorio de cuenta ni contraseñas para interactuar con la plataforma.',
    en: 'We operate on a local-first software architecture. Anonymous usage quotas are tracked via a local technical identifier in your browser to deliver the complimentary tier of 3 biblical queries per week. Mandatory account registration is not required to explore the platform.',
    pt: 'Operamos sob uma arquitetura local-first. Gerenciamos cotas de uso por meio de um identificador técnico local no navegador para assegurar o acesso gratuito de 3 consultas bíblicas semanais. Não exigimos cadastro obrigatório de conta ou senhas.',
    fr: 'Nous fonctionnons selon une architecture locale (local-first). Les quotas d’usage sont gérés via un identifiant technique local dans votre navigateur pour assurer l’accès gratuit de 3 requêtes bibliques par semaine. Aucun compte nominatif n’est requis.',
  },
  privacyH2: { 
    es: '2. Procesamiento Efímero y Tarjetas de Estudio', 
    en: '2. Ephemeral Processing & Scripture Cards', 
    pt: '2. Processamento Efêmero & Cartões de Estudo', 
    fr: '2. Traitement Éphémère & Cartes d’Étude' 
  },
  privacyP2: {
    es: 'Las consultas temáticas son transmitidas bajo cifrado seguro HTTPS y procesadas de forma estrictamente efímera para relacionar pasajes y promesas bíblicas relevantes. No se almacenan en bases de datos externas. Al exportar tarjetas gráficas 9:16 para compartir, el sistema plasma únicamente textos y principios bíblicos universales.',
    en: 'Thematic text inquiries are transmitted via secure HTTPS encryption and processed ephemerally solely to retrieve and format contextual scripture promises. Inquiries are never permanently stored on remote servers. When generating 9:16 export cards, only timeless biblical texts and citations are displayed.',
    pt: 'Consultas temáticas são transmitidas via HTTPS criptografado e processadas de forma estritamente efêmera para associar passagens bíblicas relevantes. Não são armazenadas em servidores. Ao exportar cartões 9:16, são exibidos apenas princípios e textos bíblicos universais.',
    fr: 'Les requêtes thématiques sont transmises de manière sécurisée via HTTPS et traitées de façon éphémère pour associer des passages bibliques pertinents. Elles ne sont jamais stockées sur des serveurs distants. Lors de l’export de cartes 9:16, seuls des textes et citations bibliques sont affichés.',
  },
  privacyH3: { 
    es: '3. Soberanía de Almacenamiento Local', 
    en: '3. Local Storage Sovereign Control', 
    pt: '3. Soberania do Armazenamento Local', 
    fr: '3. Souveraineté du Stockage Local' 
  },
  privacyP3: {
    es: 'Las anclas de versículos guardadas residen de forma soberana y aislada en el almacenamiento local de tu navegador (localStorage). Tienes potestad total para gestionarlas, organizarlas o borrarlas definitivamente en cualquier momento desde los ajustes de tu dispositivo.',
    en: 'Your saved scripture anchors reside solely within your browser local storage (localStorage). You maintain complete sovereign authority to review, organize, or purge your records at any time directly on your device.',
    pt: 'As passagens bíblicas salvas residem de maneira autônoma no armazenamento local do seu navegador (localStorage). Você mantém controle total para organizar ou excluir seus registros a qualquer momento.',
    fr: 'Vos passages bibliques enregistrés sont conservés exclusivement dans la mémoire locale de votre navigateur (localStorage). Vous conservez le contrôle total pour les consulter, les organiser ou les effacer à tout moment.',
  },
  termsDisclaimerTitle: {
    es: 'Naturaleza del Software y Alcance Espiritual',
    en: 'Software Scope & Educational Faith-Based Notice',
    pt: 'Escopo do Software e Aviso Devocional',
    fr: 'Nature du Logiciel et Cadre Spirituel',
  },
  termsDisclaimerText: {
    es: 'God Got You es una herramienta de software digital orientada a la lectura devocional, la meditación de las Sagradas Escrituras y la reflexión personal basada en la fe (2 Corintios 10:5). NO presta servicios médicos, psicológicos, psiquiátricos ni clínicos de ninguna índole, ni constituye asesoría profesional regulada. Ante cualquier inquietud relacionada con la salud o el bienestar general, se recomienda siempre acudir a profesionales debidamente certificados.',
    en: 'God Got You is a digital software utility designed for scripture meditation, devotional reading, and personal faith-based study (2 Corinthians 10:5). It DOES NOT provide medical, psychological, psychiatric, or clinical services of any kind, nor does it constitute regulated professional counsel. For any personal health or medical considerations, users should always consult certified healthcare professionals.',
    pt: 'God Got You é uma ferramenta digital voltada à leitura devocional, meditação bíblica e estudo pessoal baseado na fé (2 Coríntios 10:5). NÃO fornece serviços médicos, psicológicos, psiquiátricos ou clínicos de qualquer natureza, nem substitui orientação profissional. Para questões de saúde física ou emocional, consulte sempre profissionais especializados.',
    fr: 'God Got You est un outil logiciel numérique destiné à la lecture méditative, à l’étude personnelle et aux textes bibliques (2 Corinthiens 10:5). Il NE FOURNIT AUCUN service médical, psychiatrique, psychologique ou clinique, et ne constitue pas un conseil professionnel réglementé. Pour toute question de santé, consultez toujours un professionnel qualifié.',
  },
  termsH1: { 
    es: '1. Licencias de Software y Nivel Pro', 
    en: '1. Software Licenses & Pro Tier Access', 
    pt: '1. Licenças de Software e Nível Pro', 
    fr: '1. Licences Logicielles et Niveau Pro' 
  },
  termsP1: {
    es: 'El Nivel Básico concede 3 consultas temáticas semanales y acceso permanente al pasaje del día. El Pase Pro y las licencias comerciales representan la adquisición de derechos de uso de software digital que sustentan el mantenimiento, infraestructura y desarrollo de la plataforma, desbloqueando consultas ilimitadas y hasta 70 espacios de guardado local.',
    en: 'Our Complimentary Tier provides 3 weekly scripture inquiries and unrestricted daily passages. The Pro Pass and related licenses represent a commercial software access purchase covering digital maintenance, cloud infrastructure, and product evolution, granting unlimited queries and up to 70 local memory slots.',
    pt: 'O nível gratuito disponibiliza 3 consultas bíblicas semanais e o versículo diário. O Passe Pro representa a aquisição comercial de licença de software que viabiliza a infraestrutura digital, desbloqueando consultas ilimitadas e até 70 posições de histórico local.',
    fr: 'L’accès gratuit comprend 3 requêtes hebdomadaires et le passage du jour. Le Pass Pro représente un achat de licence logicielle commerciale soutenant l’infrastructure technique, débloquant des requêtes illimitées et jusqu’à 70 emplacements de mémoire locale.',
  },
  termsH2: {
    es: '2. Pases de Regalo y Patrocinio Comunitario',
    en: '2. Gift Passes & Community Sponsorship',
    pt: '2. Passes de Presente e Apoio Comunitário',
    fr: '2. Cartes Cadeaux & Parrainage Communautaire',
  },
  termsP2: {
    es: 'La adquisición de "Pases de Regalo" (Gift Passes) o el patrocinio de accesos para el Fondo de Gracia (Grace Pool) constituye una compra mercantil de licencias digitales de software transferibles a terceros. Estas compras NO califican como donaciones filantrópicas ni generan deducciones tributarias de carácter caritativo.',
    en: 'The purchase of "Gift Passes" or the sponsorship of access for the Community Grace Pool constitutes a commercial transaction for transferable digital software licenses. These transactions are commercial purchases and do NOT qualify as tax-deductible charitable contributions under financial or tax regulations.',
    pt: 'A aquisição de "Passes de Presente" (Gift Passes) ou o apoio a acessos para o Fundo de Graça Comunitário representa uma transação mercantil de licenças de software transferíveis. NÃO qualifica como doação filantrópica nem gera deduções fiscais beneficentes.',
    fr: 'L’achat de « Cartes Cadeaux » (Gift Passes) ou le parrainage d’accès pour le Fonds de Grâce Communautaire constitue une transaction commerciale standard de licences logicielles transférables. Ces achats ne constituent EN AUCUN CAS des dons déductibles d’impôt au sens fiscal.',
  },
  termsH3: { 
    es: '3. Fuentes Bíblicas y Contenido', 
    en: '3. Scriptural Sources & Content', 
    pt: '3. Fontes Bíblicas e Conteúdo', 
    fr: '3. Sources Bibliques et Contenu' 
  },
  termsP3: {
    es: 'El catálogo de referencias y promesas se alimenta de traducciones bíblicas reconocidas internacionalmente (RVR1960, NVI, NIV, ESV, LSG) con propósitos de edificación personal y estudio devocional.',
    en: 'Biblical references and thematic promises draw from established, standard historical translations (NIV, ESV, RVR1960, NVI, LSG) intended strictly for educational and personal devotional reflection.',
    pt: 'As referências bíblicas utilizam traduções reconhecidas internacionalmente (NVI, RVR1960, NIV, LSG) destinadas estritamente à reflexão devocional e ao estudo pessoal.',
    fr: 'Les textes et citations s’appuient sur des traductions bibliques reconnues (NIV, ESV, LSG, RVR1960) à des fins de lecture personnelle et d’étude spirituelle.',
  },
  refundBanner: {
    es: 'Garantía Incondicional de 14 Días: Si por cualquier motivo la plataforma no cumple con tus expectativas de uso, te reembolsamos el 100% de tu dinero de manera ágil y sin complicaciones.',
    en: '14-Day Full Satisfaction Guarantee: If for any reason our software utility does not meet your expectations, we will refund 100% of your purchase promptly with zero friction.',
    pt: 'Garantia Incondicional de 14 Dias: Caso a plataforma não atenda às suas expectativas, reembolsamos 100% do seu pagamento com total agilidade.',
    fr: 'Garantie de Satisfaction 14 Jours : Si notre outil ne répond pas pleinement à vos attentes, nous vous remboursons l’intégralité de votre paiement sans aucune difficulté.',
  },
  refundH1: { 
    es: '1. Proceso Directo de Reembolso', 
    en: '1. Transparent Refund Claim', 
    pt: '1. Processo Direto de Reembolso', 
    fr: '1. Procédure Simple de Remboursement' 
  },
  refundP1: {
    es: 'Para tramitar tu reembolso dentro de los primeros 14 días calendario posteriores a tu compra, escribe a contacto@godgotyou.app indicando el correo utilizado en la pasarela de pago. La devolución se procesa a través de nuestro Merchant of Record en un plazo máximo de 48 horas hábiles.',
    en: 'To request a refund within 14 calendar days of your purchase, send an email to contacto@godgotyou.app with the email address used during payment checkout. Refunds are issued directly through our Merchant of Record within 48 business hours.',
    pt: 'Para solicitar seu estorno nos primeiros 14 dias após a compra, envie um e-mail para contacto@godgotyou.app indicando o e-mail cadastrado no checkout. O estorno é efetuado pelo Merchant of Record em até 48 horas úteis.',
    fr: 'Pour demander votre remboursement dans les 14 jours suivant l’achat, écrivez à contacto@godgotyou.app en précisant l’adresse utilisée lors du paiement. Le remboursement est émis via notre Merchant of Record sous 48 heures ouvrées.',
  },
  refundH2: { 
    es: '2. Gestión y Cancelación de Suscripciones', 
    en: '2. Subscription Self-Management', 
    pt: '2. Gerenciamento e Cancelamento', 
    fr: '2. Gestion et Résiliation' 
  },
  refundP2: {
    es: 'En membresías periódicas, puedes pausar o cancelar la renovación en cualquier momento con un solo clic desde el portal de autogestión de clientes disponible en el recibo digital emitido por nuestro Merchant of Record. Mantendrás acceso a las funciones Pro hasta la conclusión del ciclo facturado.',
    en: 'For recurring memberships, you may cancel renewal at any moment via the one-click customer portal link included in your digital receipt sent by our Merchant of Record. Pro privileges remain fully active until the conclusion of the paid billing cycle.',
    pt: 'Para planos com renovação automática, você pode cancelar quando quiser com um clique no portal do cliente disponível no recibo digital emitido pelo Merchant of Record. Seus benefícios Pro continuam ativos até o término do ciclo faturado.',
    fr: 'Pour les abonnements avec renouvellement automatique, vous pouvez résilier à tout moment en un clic via le lien de gestion client présent sur votre reçu numérique émis par notre Merchant of Record. Votre accès Pro reste actif jusqu’au terme de la période payée.',
  },
  btnClose: { 
    es: 'Entendido y Cerrar', 
    en: 'Understood & Close', 
    pt: 'Entendido e Fechar', 
    fr: 'Compris et Fermer' 
  },
};

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  language = 'es',
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refunds'>(initialTab);
  const langKey = (language === 'en' || language === 'pt' || language === 'fr') ? language : 'es';

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Contenedor del Modal */}
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8E2D7] overflow-hidden z-10 flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado con navegación contextual */}
        <div className="relative px-6 pt-6 pb-2 bg-gradient-to-b from-[#FAF7F2] to-white border-b border-[#EAE5DC]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#718096] hover:text-[#1A1A1A] hover:bg-[#EAE5DC]/60 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-3 text-left">
            <div className="p-2 rounded-xl bg-[#5E7153]/10 text-[#5E7153] shrink-0">
              {activeTab === 'privacy' ? (
                <Shield className="w-5 h-5" />
              ) : activeTab === 'terms' ? (
                <FileText className="w-5 h-5" />
              ) : (
                <RefreshCw className="w-5 h-5" />
              )}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D4F] font-serif-display block">
                {LEGAL_TEXTS.headerTitle[langKey]}
              </span>
              <span className="text-[11px] text-[#718096]">
                {LEGAL_TEXTS.headerSubtitle[langKey]}
              </span>
            </div>
          </div>

          {/* Pestañas de navegación legal */}
          <div className="flex gap-2 border-b border-[#EAE5DC] overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'privacy'
                  ? 'border-[#5E7153] text-[#5E7153]'
                  : 'border-transparent text-[#718096] hover:text-[#1A1A1A]'
              }`}
            >
              {LEGAL_TEXTS.tabPrivacy[langKey]}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'terms'
                  ? 'border-[#5E7153] text-[#5E7153]'
                  : 'border-transparent text-[#718096] hover:text-[#1A1A1A]'
              }`}
            >
              {LEGAL_TEXTS.tabTerms[langKey]}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('refunds')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'refunds'
                  ? 'border-[#5E7153] text-[#5E7153]'
                  : 'border-transparent text-[#718096] hover:text-[#1A1A1A]'
              }`}
            >
              {LEGAL_TEXTS.tabRefunds[langKey]}
            </button>
          </div>
        </div>

        {/* Cuerpo de lectura con scroll */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 text-xs sm:text-[13px] text-[#4A5568] leading-relaxed text-left">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#F5F8F4] border border-[#D5E2D0] flex items-start gap-2.5 shadow-sm">
                <Lock className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                <p className="font-medium text-[#2D3B2A]">{LEGAL_TEXTS.privacyBanner[langKey]}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">{LEGAL_TEXTS.privacyH1[langKey]}</h4>
                <p>{LEGAL_TEXTS.privacyP1[langKey]}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">{LEGAL_TEXTS.privacyH2[langKey]}</h4>
                <p>{LEGAL_TEXTS.privacyP2[langKey]}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">{LEGAL_TEXTS.privacyH3[langKey]}</h4>
                <p>{LEGAL_TEXTS.privacyP3[langKey]}</p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#ECD9C6] text-[#8C6D4F] space-y-1 shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#8C6D4F]">
                  <BookOpen className="w-4 h-4 text-[#8C6D4F] shrink-0" />
                  <span>{LEGAL_TEXTS.termsDisclaimerTitle[langKey]}</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-[#5C452D]">{LEGAL_TEXTS.termsDisclaimerText[langKey]}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">{LEGAL_TEXTS.termsH1[langKey]}</h4>
                <p>{LEGAL_TEXTS.termsP1[langKey]}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#ECD9C6] space-y-1.5">
                <h4 className="font-bold text-xs text-[#1A1A1A]">{LEGAL_TEXTS.termsH2[langKey]}</h4>
                <p className="text-[11px] text-[#5A6472] leading-relaxed">{LEGAL_TEXTS.termsP2[langKey]}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">{LEGAL_TEXTS.termsH3[langKey]}</h4>
                <p>{LEGAL_TEXTS.termsP3[langKey]}</p>
              </div>
            </div>
          )}

          {activeTab === 'refunds' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#F0F5F2] border border-[#CADBD0] flex items-start gap-2.5 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#2E4A3B] shrink-0 mt-0.5" />
                <p className="font-medium text-[#2E4A3B]">{LEGAL_TEXTS.refundBanner[langKey]}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">{LEGAL_TEXTS.refundH1[langKey]}</h4>
                <p>{LEGAL_TEXTS.refundP1[langKey]}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-1">{LEGAL_TEXTS.refundH2[langKey]}</h4>
                <p>{LEGAL_TEXTS.refundP2[langKey]}</p>
              </div>
            </div>
          )}
        </div>

        {/* Pie del Modal con soporte directo */}
        <div className="px-6 py-3.5 border-t border-[#EAE5DC] bg-[#FAF9F6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#718096]">
            <Mail className="w-3.5 h-3.5 text-[#5E7153]" />
            <a href="mailto:contacto@godgotyou.app" className="hover:text-[#1A1A1A] transition-colors underline font-medium">
              contacto@godgotyou.app
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#2E4A3B] hover:bg-[#23392D] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            {LEGAL_TEXTS.btnClose[langKey]}
          </button>
        </div>
      </div>
    </div>
  );
};
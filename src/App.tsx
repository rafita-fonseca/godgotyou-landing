import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  ShieldCheck, 
  Moon, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown,
  ExternalLink,
  Music2,
  Mail,
  Award,
  Scroll,
  Share2,
  Send,
  HelpCircle,
  Users,
  Compass
} from 'lucide-react';
import { useTranslation } from './context/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { AudioPlayer } from './components/AudioPlayer';
import { LegalModal } from './components/LegalModal';
import { SeoHead } from './components/SeoHead';

interface FaqItem {
  q: string;
  verse: string;
  a: string;
}

const PATHS_HEADER_COPY = {
  es: {
    title: 'Caminos de gracia para encontrar refugio en Su verdad',
    subtitle: 'Para llevar cautivos tus pensamientos, vencer batallas ocultas, interceder por quienes amas y sanar en paz el hogar.',
  },
  en: {
    title: 'Paths of grace to find refuge in His truth',
    subtitle: 'To take every thought captive, overcome hidden battles, intercede for loved ones, and restore peace at home.',
  },
  pt: {
    title: 'Caminhos de graça para encontrar refúgio na Sua verdade',
    subtitle: 'Para levar cativo todo pensamento, vencer batalhas ocultas, interceder por quem você ama e restaurar a paz no lar.',
  },
  fr: {
    title: 'Chemins de grâce pour trouver refuge dans Sa vérité',
    subtitle: 'Pour amener toute pensée captive, vaincre les combats cachés, intercéder pour vos proches et apaiser le foyer.',
  },
};

const PILLARS_SPIRITUAL_COPY = {
  es: {
    alma: {
      tab: 'Para mi alma',
      cap: '/assets/drop-caps/cap-L.png',
      capAlt: 'L',
      titleAfterCap: 'a quietud que tu alma necesita',
      scriptureBadge: '2 Corintios 10:5 · «Llevando cautivo todo pensamiento a la obediencia a Cristo»',
      desc: 'Cuando la mente no se detiene a las 2:00 AM y el temor intenta gobernar tu pecho, vacía aquí lo que te pesa con total honestidad. La Palabra de Dios responde a la raíz de tu pensamiento para desarmar la mentira y devolverle descanso a tu espíritu.',
      f1Title: 'Palabra al corazón:',
      f1Desc: 'Un mensaje pastoral anclado en 2 Corintios 10:5 que desmonta la culpa y te recuerda que no cargas el mundo solo.',
      f2Title: 'La Promesa Viva:',
      f2Desc: 'Versículos bíblicos exactos (Mateo 11:28, Filipenses 4:7) para reemplazar la hipervigilancia por Su paz.',
      f3Title: 'Oración de reposo y Piedras de Memoria:',
      f3Desc: 'Plegaria en primera persona para dormir en paz y guardar cada respuesta de Dios en tu sendero de fidelidad.',
    },
    libertad: {
      tab: 'Pacto de Libertad',
      cap: '/assets/drop-caps/cap-P.png',
      capAlt: 'P',
      titleAfterCap: 'acto de Libertad para batallas ocultas',
      scriptureBadge: '1 Corintios 10:13 · Proverbios 4:23 — «Sobre toda cosa guardada, guarda tu corazón»',
      desc: 'Dios siempre abre una salida en medio de la tentación. Un santuario silencioso, discreto y libre de condenación (Romanos 8:1) para vencer las luchas de las que casi nadie habla en voz alta: pornografía, tentación de infidelidad emocional o digital, ruido compulsivo, insomnio e ira en casa.',
      f1Title: '5 rutas de integridad real:',
      f1Desc: 'Pureza Visual, Lealtad del Corazón (infidelidad), Ruido Digital, Calma Nocturna y Mansedumbre antes de la Ira.',
      f2Title: 'Protocolo bíblico inmediato:',
      f2Desc: '3 pasos silenciosos para cortar el impulso en el momento exacto y caminar un recorrido guiado de 7 días sin culpa.',
      f3Title: 'Aliado de pacto 1 a 1 (Gálatas 6:2):',
      f3Desc: 'Camina respaldado por un amigo o mentor mediante un alias anónimo y avisos silenciosos de oración, sin espionaje de pantalla.',
      cardHeader: 'PACTO DE LIBERTAD · 02:14 AM',
      cardAlias: 'Alias Anónimo: Faro-418 · 93% Consistencia',
      cardQuote: '«Sobre toda cosa guardada, guarda tu corazón. Deja el teléfono fuera de la habitación 10 minutos y envía un aviso silencioso de oración sin dar explicaciones.»',
      cardBtn: 'Pedir oración silenciosa a mi aliado',
    },
    intercesion: {
      tab: 'Interceder por alguien',
      cap: '/assets/drop-caps/cap-P.png',
      capAlt: 'P',
      titleAfterCap: 'onerse en la brecha por quienes amas',
      scriptureBadge: 'Gálatas 6:2 · Santiago 5:16 — «Sobrellevad los unos las cargas de los otros»',
      desc: 'Cuando un familiar o amigo atraviesa enfermedad, duelo o incertidumbre y no sabes qué palabras decirle, presenta su nombre ante el Padre. El santuario prepara una carta pastoral llena de ternura y promesas bíblicas lista para abrazar su corazón.',
      c1Title: 'Carta pastoral personalizada:',
      c1Desc: 'Redactada directamente en segunda persona para el corazón de quien sufre, con oración de cobertura incluida.',
      c2Title: 'Lista para enviar por WhatsApp o Historias:',
      c2Desc: 'Comparte un recordatorio sereno de que no está solo y de que alguien está intercediendo por su vida hoy.',
    },
    pacto: {
      tab: 'Pacto de paz',
      cap: '/assets/drop-caps/cap-A.png',
      capAlt: 'A',
      titleAfterCap: 'cuerdo sagrado de paz y perdón',
      scriptureBadge: 'Mateo 5:9 · Mateo 18:19 — «Bienaventurados los pacificadores»',
      desc: 'Cuando el cansancio o una discusión levantan un muro en el matrimonio, la familia o una amistad, detengan los mensajes apresurados. Ambos comparten un mismo teléfono, se escuchan sin interrupciones y permiten que la Escritura traiga entendimiento y reconciliación.',
      f1Title: 'Escucha sin interrupciones:',
      f1Desc: 'Cada persona expresa su sentir con honestidad y respeto antes de buscar tener la razón.',
      f2Title: 'Luz bíblica para ambos corazones:',
      f2Desc: 'Versículos que desarman el orgullo (Efesios 4:26, Colosenses 3:13) y orientan un acuerdo práctico de paz.',
      f3Title: 'Oración de unidad:',
      f3Desc: 'Una plegaria compartida para cerrar la herida antes de que se ponga el sol y volver a caminar juntos.',
    },
  },
  en: {
    alma: {
      tab: 'For My Soul',
      cap: '/assets/drop-caps/cap-T.png',
      capAlt: 'T',
      titleAfterCap: 'he stillness your soul longs for',
      scriptureBadge: '2 Corinthians 10:5 · “Taking every thought captive to make it obedient to Christ”',
      desc: 'When your mind refuses to quiet down at 2:00 AM and fear weighs heavy on your chest, lay down every anxious thought honestly. God’s Word speaks directly to the root of your burden to disarm worry and restore rest to your spirit.',
      f1Title: 'A Word to Your Heart:',
      f1Desc: 'Pastoral encouragement anchored in 2 Corinthians 10:5 that lifts shame and reminds you that you never carry the world alone.',
      f2Title: 'The Living Promise:',
      f2Desc: 'Exact Scripture verses (Matthew 11:28, Philippians 4:7) to replace hypervigilance with His peace.',
      f3Title: 'Prayer of Rest & Memorial Stones:',
      f3Desc: 'A first-person prayer for peaceful sleep and a sacred record of God’s faithfulness along your journey.',
    },
    libertad: {
      tab: 'Freedom Pact',
      cap: '/assets/drop-caps/cap-P.png',
      capAlt: 'F',
      titleAfterCap: 'reedom Pact for hidden battles',
      scriptureBadge: '1 Corinthians 10:13 · Proverbs 4:23 — “Above all else, guard your heart”',
      desc: 'God always provides a way out in the hour of temptation. A quiet, discreet, condemnation-free sanctuary (Romans 8:1) for the hidden struggles rarely spoken aloud: pornography, emotional or digital infidelity temptation, digital noise, insomnia, and anger at home.',
      f1Title: '5 paths of real integrity:',
      f1Desc: 'Visual Purity, Heart Loyalty (infidelity), Digital Noise, Night Calm, and Meekness Before Anger.',
      f2Title: 'Immediate biblical protocol:',
      f2Desc: '3 quiet steps to break the urge in the moment of temptation, paired with a 7-day grace-filled path.',
      f3Title: '1-on-1 Pact Ally (Galatians 6:2):',
      f3Desc: 'Walk backed by a trusted friend or mentor via an anonymous alias and silent prayer alerts—zero screen spying.',
      cardHeader: 'FREEDOM PACT · 02:14 AM',
      cardAlias: 'Anonymous Alias: Beacon-418 · 93% Consistency',
      cardQuote: '“Above all else, guard your heart. Set your phone outside the bedroom for 10 minutes and send a silent prayer notice—no awkward explanations needed.”',
      cardBtn: 'Send silent prayer notice to ally',
    },
    intercesion: {
      tab: 'Intercede for Someone',
      cap: '/assets/drop-caps/cap-S.png',
      capAlt: 'S',
      titleAfterCap: 'tanding in the gap for those you love',
      scriptureBadge: 'Galatians 6:2 · James 5:16 — “Carry each other’s burdens”',
      desc: 'When a loved one faces illness, grief, or deep uncertainty and you don’t know what to say, lift their name before the Father. The sanctuary crafts a tender pastoral letter rooted in Scripture to comfort their heart.',
      c1Title: 'Personal pastoral letter:',
      c1Desc: 'Written directly to the heart of the person hurting, complete with comforting verses and prayer.',
      c2Title: 'Ready to share on WhatsApp or Stories:',
      c2Desc: 'Send a quiet reminder that they are not forgotten and that someone is interceding for them today.',
    },
    pacto: {
      tab: 'Peace Pact',
      cap: '/assets/drop-caps/cap-A.png',
      capAlt: 'A',
      titleAfterCap: 'sacred covenant of peace and forgiveness',
      scriptureBadge: 'Matthew 5:9 · Matthew 18:19 — “Blessed are the peacemakers”',
      desc: 'When fatigue or conflict builds a wall in marriage, family, or friendship, pause hasty messages. Both share one phone, listen without interruption, and let Scripture illuminate both hearts toward reconciliation.',
      f1Title: 'Uninterrupted listening:',
      f1Desc: 'Each person expresses their heart honestly and gently before trying to win an argument.',
      f2Title: 'Scripture light for both hearts:',
      f2Desc: 'Verses that disarm pride (Ephesians 4:26, Colossians 3:13) and guide a practical mutual agreement.',
      f3Title: 'Prayer of unity:',
      f3Desc: 'A shared prayer to heal the rift before the sun goes down and walk forward together.',
    },
  },
  pt: {
    alma: {
      tab: 'Para Minha Alma',
      cap: '/assets/drop-caps/cap-A.png',
      capAlt: 'A',
      titleAfterCap: 'quietude que a sua alma precisa',
      scriptureBadge: '2 Coríntios 10:5 · «Levando cativo todo pensamento à obediência de Cristo»',
      desc: 'Quando a mente não desacelera às 2h da manhã e o medo aperta o peito, entregue aqui o que pesa com total sinceridade. A Palavra de Deus responde à raiz do seu pensamento para desarmar a ansiedade e devolver descanso ao seu espírito.',
      f1Title: 'Palavra ao coração:',
      f1Desc: 'Uma reflexão pastoral ancorada em 2 Coríntios 10:5 que remove a culpa e lembra que você não carrega o mundo sozinho.',
      f2Title: 'A Promessa Viva:',
      f2Desc: 'Versículos bíblicos exatos (Mateus 11:28, Filipenses 4:7) para substituir a hipervigilância pela Sua paz.',
      f3Title: 'Oração de descanso e Pedras de Memória:',
      f3Desc: 'Oração em primeira pessoa para dormir em paz e registrar cada livramento de Deus no seu caminho.',
    },
    libertad: {
      tab: 'Pacto de Liberdade',
      cap: '/assets/drop-caps/cap-P.png',
      capAlt: 'P',
      titleAfterCap: 'acto de Liberdade para batalhas ocultas',
      scriptureBadge: '1 Coríntios 10:13 · Provérbios 4:23 — «Sobre tudo o que se deve guardar, guarda o teu coração»',
      desc: 'Deus sempre prepara um escape na hora da tentação. Um santuário silencioso, discreto e livre de condenação (Romanos 8:1) para vencer lutas íntimas de que quase ninguém fala: pornografia, tentação de infidelidade emocional ou digital, ruído digital, insônia e raiva em casa.',
      f1Title: '5 trilhas de integridade real:',
      f1Desc: 'Pureza Visual, Lealdade do Coração (infidelidade), Ruído Digital, Calma Noturna e Mansidão antes da Ira.',
      f2Title: 'Protocolo bíblico imediato:',
      f2Desc: '3 passos silenciosos para cortar o impulso no momento da tentação e uma jornada guiada de 7 dias sem culpa.',
      f3Title: 'Aliado de pacto 1 a 1 (Gálatas 6:2):',
      f3Desc: 'Caminhe apoiado por um amigo ou mentor com apelido anônimo e avisos silenciosos de oração, sem espionagem.',
      cardHeader: 'PACTO DE LIBERDADE · 02:14 AM',
      cardAlias: 'Apelido Anônimo: Farol-418 · 93% Consistência',
      cardQuote: '«Sobre tudo o que se deve guardar, guarda o teu coração. Deixe o celular fora do quarto por 10 minutos e envie um aviso silencioso de oração.»',
      cardBtn: 'Pedir oração silenciosa ao aliado',
    },
    intercesion: {
      tab: 'Interceder por Alguém',
      cap: '/assets/drop-caps/cap-C.png',
      capAlt: 'C',
      titleAfterCap: 'olocar-se na brecha por quem você ama',
      scriptureBadge: 'Gálatas 6:2 · Tiago 5:16 — «Levai as cargas uns dos outros»',
      desc: 'Quando alguém querido enfrenta doença, luto ou incerteza e você não sabe o que dizer, apresente o nome dessa pessoa ao Pai. O santuário prepara uma carta pastoral cheia de ternura e promessas bíblicas para consolar seu coração.',
      c1Title: 'Carta pastoral personalizada:',
      c1Desc: 'Escrita diretamente para o coração de quem sofre, com versículos de consolo e oração de cobertura.',
      c2Title: 'Pronta para enviar no WhatsApp ou Status:',
      c2Desc: 'Compartilhe um lembrete sereno de que ela não está sozinha e de que alguém está intercedendo por sua vida hoje.',
    },
    pacto: {
      tab: 'Pacto de Paz',
      cap: '/assets/drop-caps/cap-A.png',
      capAlt: 'A',
      titleAfterCap: 'cordo sagrado de paz e perdão',
      scriptureBadge: 'Mateus 5:9 · Mateus 18:19 — «Bem-aventurados os pacificadores»',
      desc: 'Quando o cansaço ou uma discussão levantam um muro no casamento, na família ou na amizade, interrompam mensagens precipitadas. Ambos compartilham um único celular, ouvem-se sem interrupções e deixam a Escritura trazer reconciliação.',
      f1Title: 'Escuta sem interrupções:',
      f1Desc: 'Cada pessoa expressa seu sentir com honestidade e respeito antes de tentar ter razão.',
      f2Title: 'Luz bíblica para ambos os corações:',
      f2Desc: 'Versículos que desarmam o orgulho (Efésios 4:26, Colossenses 3:13) e orientam um acordo mútuo de paz.',
      f3Title: 'Oração de unidade:',
      f3Desc: 'Uma prece compartilhada para curar a ferida antes do pôr do sol e voltar a caminhar juntos.',
    },
  },
  fr: {
    alma: {
      tab: 'Pour Mon Âme',
      cap: '/assets/drop-caps/cap-L.png',
      capAlt: 'L',
      titleAfterCap: 'a quiétude dont votre âme a besoin',
      scriptureBadge: '2 Corinthiens 10:5 · « Amenant toute pensée captive à l’obéissance de Christ »',
      desc: 'Lorsque l’esprit refuse de s’apaiser à 2h du matin et que la crainte oppresse votre cœur, déposez ici ce qui vous pèse en toute vérité. La Parole de Dieu répond à la racine de vos pensées pour désarmer l’inquiétude et rendre le repos à votre âme.',
      f1Title: 'Parole au cœur :',
      f1Desc: 'Un message pastoral ancré dans 2 Corinthiens 10:5 qui ôte la culpabilité et rappelle que vous ne portez pas le monde seul.',
      f2Title: 'La Promesse Vivante :',
      f2Desc: 'Des versets bibliques précis (Matthieu 11:28, Philippiens 4:7) pour remplacer l’hypervigilance par Sa paix.',
      f3Title: 'Prière de repos et Pierres de Mémoire :',
      f3Desc: 'Une prière personnelle pour dormir en paix et conserver chaque témoignage de Sa fidélité.',
    },
    libertad: {
      tab: 'Pacte de Liberté',
      cap: '/assets/drop-caps/cap-P.png',
      capAlt: 'P',
      titleAfterCap: 'acte de Liberté pour les combats cachés',
      scriptureBadge: '1 Corinthiens 10:13 · Proverbes 4:23 — « Garde ton cœur plus que toute autre chose »',
      desc: 'Dieu prépare toujours un moyen de sortir de la tentation. Un sanctuaire silencieux, discret et sans condamnation (Romains 8:1) pour vaincre les luttes intérieures dont on ose rarement parler : pornographie, tentation d’infidélité émotionnelle ou numérique, bruit numérique, insomnie et colère.',
      f1Title: '5 parcours d’intégrité réelle :',
      f1Desc: 'Pureté Visuelle, Loyauté du Cœur (infidélité), Bruit Numérique, Calme Nocturne et Douceur avant la Colère.',
      f2Title: 'Protocole biblique immédiat :',
      f2Desc: '3 gestes silencieux pour briser l’impulsion dès qu’elle surgit, accompagnés d’un parcours de 7 jours sans culpabilité.',
      f3Title: 'Allié de pacte 1 à 1 (Galates 6:2) :',
      f3Desc: 'Avancez soutenu par un ami ou mentor via un alias anonyme et des demandes silencieuses de prière, sans espionnage.',
      cardHeader: 'PACTE DE LIBERTÉ · 02:14 AM',
      cardAlias: 'Alias Anonyme : Phare-418 · 93% Constance',
      cardQuote: '« Garde ton cœur plus que toute autre chose. Pose ton téléphone hors de la chambre pendant 10 minutes et envoie un signal silencieux de prière. »',
      cardBtn: 'Demander la prière en silence',
    },
    intercesion: {
      tab: 'Intercéder pour Quelqu’un',
      cap: '/assets/drop-caps/cap-S.png',
      capAlt: 'S',
      titleAfterCap: 'e tenir à la brèche pour ceux que vous aimez',
      scriptureBadge: 'Galates 6:2 · Jacques 5:16 — « Portez les fardeaux les uns des autres »',
      desc: 'Lorsqu’un proche traverse la maladie, le deuil ou l’incertitude et que les mots vous manquent, présentez son nom devant le Père. Le sanctuaire prépare une lettre pastorale remplie de tendresse et de promesses bibliques pour consoler son cœur.',
      c1Title: 'Lettre pastorale personnalisée :',
      c1Desc: 'Rédigée directement pour le cœur de la personne éprouvée, avec versets de consolation et prière de couverture.',
      c2Title: 'Prête à partager sur WhatsApp ou Stories :',
      c2Desc: 'Envoyez un rappel paisible qu’elle n’est pas seule et que quelqu’un intercède pour sa vie aujourd’hui.',
    },
    pacto: {
      tab: 'Pacte de Paix',
      cap: '/assets/drop-caps/cap-A.png',
      capAlt: 'A',
      titleAfterCap: 'ccord sacré de paix et de pardon',
      scriptureBadge: 'Matthieu 5:9 · Matthieu 18:19 — « Heureux ceux qui procurent la paix »',
      desc: 'Lorsque la fatigue ou une dispute dresse un mur dans le couple, la famille ou l’amitié, arrêtez les messages précipités. Partagez un seul téléphone, écoutez-vous sans interruption et laissez l’Écriture éclairer vos deux cœurs vers la réconciliation.',
      f1Title: 'Écoute sans interruption :',
      f1Desc: 'Chacun exprime son ressenti avec sincérité et respect avant de chercher à avoir raison.',
      f2Title: 'Lumière biblique pour les deux cœurs :',
      f2Desc: 'Des versets qui désarment l’orgueil (Éphésiens 4:26, Colossiens 3:13) et guident un accord mutuel de paix.',
      f3Title: 'Prière d’unité :',
      f3Desc: 'Une prière partagée pour guérir la blessure avant le coucher du soleil et avancer ensemble.',
    },
  },
};

const EXTRA_FREEDOM_FAQS: Record<'es' | 'en' | 'pt' | 'fr', FaqItem[]> = {
  es: [
    {
      q: '¿Qué es «Pacto de Libertad» y qué batallas ocultas aborda?',
      verse: '1 Corintios 10:13 · Proverbios 4:23 — «Sobre toda cosa guardada, guarda tu corazón»',
      a: 'Es un espacio discreto, silencioso y libre de culpa diseñado para las luchas íntimas que rara vez se hablan en voz alta: Pureza Visual y Sexual (pornografía), Lealtad e Integridad del Corazón (frenar chats secretos, vínculos emocionales ocultos o tentación de infidelidad), Ruido Digital, Calma Nocturna e Insomnio, y Mansedumbre antes de la Ira. Incluye un protocolo de acción inmediata de 3 pasos, rutas guiadas de 7 días y registro de consistencia sin culpa.',
    },
    {
      q: '¿Cómo funciona el Aliado de Pacto (1 a 1) sin vigilancia invasiva?',
      verse: 'Gálatas 6:2 · Eclesiastés 4:9-10 — «Mejores son dos que uno... porque si cayeren, el uno levantará a su compañero»',
      a: 'A diferencia de aplicaciones costosas que toman capturas de tu pantalla o instalan agentes espía, God Got You parte de la gracia y la confianza: vinculas a un amigo o mentor mediante un alias anónimo y un código temporal de 24 horas. Nadie lee tus notas ni ve tu pantalla; solo puedes enviar un aviso silencioso de oración cuando atraviesas un momento difícil y desvincular el pacto en un toque.',
    },
  ],
  en: [
    {
      q: 'What is «Freedom Pact» and which hidden battles does it address?',
      verse: '1 Corinthians 10:13 · Proverbs 4:23 — “Above all else, guard your heart”',
      a: 'It is a discreet, quiet, shame-free sanctuary built for the hidden struggles rarely discussed aloud: Visual & Sexual Purity (pornography), Heart Loyalty & Marriage Integrity (stopping secret chats, hidden emotional bonds, or infidelity temptation), Digital Noise, Night Calm, and Meekness Before Anger. It includes a 3-step immediate action protocol, 7-day guided paths, and shame-free consistency tracking.',
    },
    {
      q: 'How does the 1-on-1 Pact Ally work without invasive surveillance?',
      verse: 'Galatians 6:2 · Ecclesiastes 4:9-10 — “Two are better than one... if either falls, one can help the other up”',
      a: 'Unlike costly apps that take screenshots of your phone or install monitoring agents, God Got You is rooted in trust and grace: you link a trusted friend or mentor using anonymous aliases and a 24-hour invite code. Nobody reads your private notes or spies on your screen—you simply send a silent prayer notice when facing a tough moment and can unlink anytime.',
    },
  ],
  pt: [
    {
      q: 'O que é o «Pacto de Liberdade» e quais batalhas ocultas ele aborda?',
      verse: '1 Coríntios 10:13 · Provérbios 4:23 — «Sobre tudo o que se deve guardar, guarda o teu coração»',
      a: 'É um espaço discreto, silencioso e livre de culpa criado para lutas íntimas raramente faladas em voz alta: Pureza Visual e Sexual (pornografia), Lealdade e Integridade do Coração (frear conversas secretas, vínculos emocionais ocultos ou tentação de infidelidade), Ruído Digital, Calma Noturna e Mansidão antes da Ira. Inclui protocolo de ação imediata em 3 passos, trilhas de 7 dias e consistência sem culpa.',
    },
    {
      q: 'Como funciona o Aliado de Pacto (1 a 1) sem vigilância invasiva?',
      verse: 'Gálatas 6:2 · Eclesiastes 4:9-10 — «Melhor é serem dois do que um... se um cair, o outro levanta o seu companheiro»',
      a: 'Diferente de aplicativos caros que tiram capturas da sua tela, o God Got You parte da confiança e da graça: você vincula um amigo ou mentor usando apelidos anônimos e um código temporário de 24h. Ninguém lê suas notas nem espiona seu celular; você apenas envia um aviso silencioso de oração quando precisa de cobertura.',
    },
  ],
  fr: [
    {
      q: 'Qu’est-ce que le « Pacte de Liberté » et quels combats cachés aborde-t-il ?',
      verse: '1 Corinthiens 10:13 · Proverbes 4:23 — « Garde ton cœur plus que toute autre chose »',
      a: 'C’est un espace discret, silencieux et sans culpabilité conçu pour les batailles intérieures dont on ose rarement parler : Pureté Visuelle et Sexuelle (pornographie), Loyauté et Intégrité du Cœur (freiner les discussions secrètes, liens émotionnels cachés ou tentations d’infidélité), Bruit Numérique, Calme Nocturne et Douceur avant la Colère. Il comprend un protocole d’action immédiate en 3 étapes et des parcours de 7 jours.',
    },
    {
      q: 'Comment fonctionne l’Allié de Pacte (1 à 1) sans surveillance intrusive ?',
      verse: 'Galates 6:2 · Ecclésiaste 4:9-10 — « Deux valent mieux qu’un... car s’ils tombent, l’un relève son compagnon »',
      a: 'Contrairement aux applications coûteuses qui font des captures d’écran de votre téléphone, God Got You repose sur la confiance et la grâce : vous reliez un ami ou mentor via des alias anonymes et un code de 24h. Personne ne lit vos notes ni n’espionne votre écran : vous envoyez simplement une demande silencieuse de prière en cas de combat.',
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'alma' | 'libertad' | 'intercesion' | 'pacto'>('alma');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [legalModalOpen, setLegalModalOpen] = useState<boolean>(false);
  const [legalInitialTab, setLegalInitialTab] = useState<'privacy' | 'terms' | 'refunds'>('privacy');
  
  const { t, locale, tKey } = useTranslation();

  const safeLocale = (locale === 'en' || locale === 'pt' || locale === 'fr') ? locale : 'es';
  const targetAppUrl = `https://godgotyou.app?lang=${safeLocale}`;
  const pillars = PILLARS_SPIRITUAL_COPY[safeLocale];
  const pathsHeader = PATHS_HEADER_COPY[safeLocale];

  const openLegal = (tab: 'privacy' | 'terms' | 'refunds') => {
    setLegalInitialTab(tab);
    setLegalModalOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const baseFaqList: FaqItem[] = (t?.faq?.items as FaqItem[]) || [];
  const faqList: FaqItem[] = [
    ...EXTRA_FREEDOM_FAQS[safeLocale],
    ...baseFaqList,
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#D4B373]/30 selection:text-[#2D4523] flex flex-col justify-between relative font-sans">
      
      {/* Componente de SEO dinámico */}
      <SeoHead />

      {/* 1. NAVEGACIÓN SUPERIOR */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <img 
              src="/logo.png" 
              alt="GodGotYou Sello" 
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-xs transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span className="font-serif-display text-lg sm:text-2xl font-bold tracking-tight text-[#1A1A1A] leading-none">
                God Got You
              </span>
              <span className="hidden sm:block text-[11px] font-sans font-semibold tracking-wider text-[#5E7153] mt-0.5">
                {tKey('nav.tagline')}
              </span>
            </div>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            <a 
              href={targetAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-2xl bg-[#2D4523] hover:bg-[#23371B] text-white text-xs sm:text-sm font-serif-display font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span>{tKey('nav.cta')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4B373]" />
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO PRINCIPAL */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D4B373]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#ECD9C6] text-[#8C6D4F] text-xs font-bold font-serif-display uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D4F]" />
            <span>{tKey('hero.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-[#1A1A1A] leading-[1.16] tracking-tight max-w-4xl mx-auto">
            {tKey('hero.title')}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#4A5568] max-w-2xl mx-auto font-serif-bible italic leading-relaxed">
            {tKey('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a 
              href={targetAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#2D4523] hover:bg-[#1F3018] text-white text-sm sm:text-base font-serif-display font-bold tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>{tKey('hero.primaryCta')}</span>
              <ArrowRight className="w-4 h-4 text-[#D4B373]" />
            </a>

            <a 
              href="#pilares"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-[#F5F2EB] border border-[#E2DDD5] text-[#2C3E50] text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              <span>{tKey('hero.secondaryCta')}</span>
              <ChevronRight className="w-4 h-4 text-[#5E7153]" />
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4 sm:gap-6 text-xs text-[#64748B] flex-wrap">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#5E7153]" />
              <span>{tKey('hero.privacyProof')}</span>
            </div>
            <span className="hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5E7153]" />
              <span>{tKey('hero.availabilityProof')}</span>
            </div>
          </div>
        </div>

        {/* Mockup Editorial de la App */}
        <div className="max-w-4xl mx-auto mt-12 sm:mt-16 relative">
          <div className="rounded-3xl p-3 sm:p-5 bg-white border border-[#EAE5DC] shadow-[0_20px_60px_rgba(0,0,0,0.07)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_25px_70px_rgba(45,69,35,0.12)]">
            <div className="rounded-2xl p-6 sm:p-10 border border-[#E8E1D5] bg-[#FAF9F6] text-left space-y-6 relative">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE5DC] pb-4">
                <div className="flex items-center gap-3">
                  <img src="/medallion-master.png" alt="Sello" className="w-10 h-10 object-contain drop-shadow-xs" />
                  <div>
                    <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#1A1A1A]">
                      {tKey('mockup.title')}
                    </h3>
                    <p className="text-[11px] text-[#5E7153] font-sans font-semibold tracking-wider uppercase">
                      {tKey('mockup.verseRef')}
                    </p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D4F] font-bold border border-[#ECD9C6]">
                  {tKey('mockup.badge')}
                </span>
              </div>

              <p className="font-serif-bible italic text-lg sm:text-xl text-[#1A1A1A] leading-relaxed">
                "{tKey('mockup.verseText')}"
              </p>

              <div className="p-4 rounded-xl bg-white border border-[#E8E1D5] text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                <strong className="text-[#2D4523] font-serif-display font-bold block mb-1">
                  {tKey('mockup.heartWordTitle')}
                </strong>
                {tKey('mockup.heartWordDesc')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 MANIFIESTO */}
      <section id="manifiesto" className="py-14 sm:py-20 bg-[#FAF0E6]/50 border-t border-[#EAE5DC] px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ECD9C6] text-[#8C6D4F] text-[11px] font-bold font-serif-display uppercase tracking-widest">
            <Scroll className="w-3.5 h-3.5" />
            <span>{tKey('manifesto.badge')}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif-display font-bold text-[#1A1A1A] leading-snug">
            {tKey('manifesto.title')}<br className="hidden sm:inline" />
            {' '}{tKey('manifesto.titleEnd')}
          </h2>

          <div className="p-7 sm:p-12 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4B373]/10 rounded-bl-full pointer-events-none" />

            <p className="font-serif-bible text-base sm:text-lg text-[#334155] leading-relaxed">
              <img 
                src="/assets/drop-caps/cap-E.png" 
                alt="E" 
                className="float-left w-16 h-16 sm:w-20 sm:h-20 object-contain mr-3.5 mb-1 select-none pointer-events-none drop-shadow-xs" 
              />
              {tKey('manifesto.textAfterDropCap')}
            </p>

            <div className="mt-6 pt-6 border-t border-[#EAE5DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#64748B]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5E7153]" />
                <span>{tKey('manifesto.freeNote')}</span>
              </div>
              <span className="font-serif-bible italic text-[#8C6D4F]">
                {tKey('manifesto.verseScripture')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAMINOS DE GRACIA Y LIBERTAD (LIMPIO, SIN ETIQUETAS COMERCIALES NI NUMERACIÓN) */}
      <section id="pilares" className="py-16 sm:py-24 bg-white border-y border-[#EAE5DC] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5E7153] font-serif-display">
              {tKey('paths.badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-display font-bold text-[#1A1A1A]">
              {pathsHeader.title}
            </h2>
            <p className="text-sm text-[#64748B] font-serif-bible italic">
              {pathsHeader.subtitle}
            </p>
          </div>

          {/* Selector de Pestañas limpio y sin jerarquía */}
          <div className="flex items-center justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] shadow-inner gap-1.5 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => setActiveTab('alma')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-serif-display transition-all cursor-pointer ${
                  activeTab === 'alma'
                    ? 'bg-[#2D4523] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A1A1A]'
                }`}
              >
                {pillars.alma.tab}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('libertad')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-serif-display transition-all cursor-pointer ${
                  activeTab === 'libertad'
                    ? 'bg-[#2D4523] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A1A1A]'
                }`}
              >
                {pillars.libertad.tab}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('intercesion')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-serif-display transition-all cursor-pointer ${
                  activeTab === 'intercesion'
                    ? 'bg-[#2D4523] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A1A1A]'
                }`}
              >
                {pillars.intercesion.tab}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pacto')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-serif-display transition-all cursor-pointer ${
                  activeTab === 'pacto'
                    ? 'bg-[#2D4523] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A1A1A]'
                }`}
              >
                {pillars.pacto.tab}
              </button>
            </div>
          </div>

          {/* Tarjetas interactivas con Letras Capitales y Sustento Bíblico */}
          <div className="rounded-3xl p-6 sm:p-10 border border-[#E8E1D5] bg-[#FAF9F6] shadow-sm transition-all duration-300">
            
            {/* 1. PARA MI ALMA (2 CORINTIOS 10:5) */}
            {activeTab === 'alma' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-2">
                    <img
                      src={pillars.alma.cap}
                      alt={pillars.alma.capAlt}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 drop-shadow-xs"
                    />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A] leading-tight -ml-1">
                        {pillars.alma.titleAfterCap}
                      </h3>
                      <span className="text-xs text-[#5E7153] font-serif-bible italic font-semibold block mt-1 -ml-1">
                        {pillars.alma.scriptureBadge}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {pillars.alma.desc}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#2C3E50]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{pillars.alma.f1Title}</strong> {pillars.alma.f1Desc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{pillars.alma.f2Title}</strong> {pillars.alma.f2Desc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{pillars.alma.f3Title}</strong> {pillars.alma.f3Desc}</span>
                    </li>
                  </ul>
                </div>

                {/* Lienzo Lino Esencial */}
                <div 
                  className="relative rounded-2xl overflow-hidden border border-[#E2DDD5] shadow-lg max-w-xs mx-auto aspect-[9/16] flex flex-col justify-center px-7 py-16 bg-cover bg-center" 
                  style={{ backgroundImage: "url('/story-bg-free-light.png')" }}
                >
                  <div className="my-auto text-center space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#8C6D4F] font-serif-display block font-bold">
                      ✦ {tKey('canvas.lightBadge')} ✦
                    </span>
                    <p className="font-serif-bible italic text-xs sm:text-sm text-[#2C3E50] leading-relaxed">
                      "{tKey('canvas.lightVerse')}"
                    </p>
                    <span className="text-[11px] font-sans text-[#5E7153] font-semibold block">
                      — {tKey('canvas.lightRef')} —
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PACTO DE LIBERTAD (1 CORINTIOS 10:13 · PROVERBIOS 4:23) */}
            {activeTab === 'libertad' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-2">
                    <img
                      src={pillars.libertad.cap}
                      alt={pillars.libertad.capAlt}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 drop-shadow-xs"
                    />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A] leading-tight -ml-1">
                        {pillars.libertad.titleAfterCap}
                      </h3>
                      <span className="text-xs text-[#5E7153] font-serif-bible italic font-semibold block mt-1 -ml-1">
                        {pillars.libertad.scriptureBadge}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {pillars.libertad.desc}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#2C3E50]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{pillars.libertad.f1Title}</strong> {pillars.libertad.f1Desc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{pillars.libertad.f2Title}</strong> {pillars.libertad.f2Desc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{pillars.libertad.f3Title}</strong> {pillars.libertad.f3Desc}</span>
                    </li>
                  </ul>
                </div>

                {/* Tarjeta Vista Previa Modo Nocturno Discreto */}
                <div className="rounded-3xl p-6 bg-[#121619] border-2 border-[#D4B373]/40 text-[#F0EBE1] shadow-2xl max-w-sm mx-auto space-y-5 text-left">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#D4B373]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4B373]">
                        {pillars.libertad.cardHeader}
                      </span>
                    </div>
                    <Lock className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-[#D4B373] block">
                      {pillars.libertad.cardAlias}
                    </span>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="w-[93%] h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>

                  <p className="font-serif-bible italic text-xs sm:text-sm text-[#E3DDD3] leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                    {pillars.libertad.cardQuote}
                  </p>

                  <a
                    href={targetAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#D4B373] text-[#0E1113] font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{pillars.libertad.cardBtn}</span>
                  </a>
                </div>
              </div>
            )}

            {/* 3. INTERCEDER POR ALGUIEN (GÁLATAS 6:2 · SANTIAGO 5:16) */}
            {activeTab === 'intercesion' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-2">
                    <img
                      src={pillars.intercesion.cap}
                      alt={pillars.intercesion.capAlt}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 drop-shadow-xs"
                    />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A] leading-tight -ml-1">
                        {pillars.intercesion.titleAfterCap}
                      </h3>
                      <span className="text-xs text-[#5E7153] font-serif-bible italic font-semibold block mt-1 -ml-1">
                        {pillars.intercesion.scriptureBadge}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {pillars.intercesion.desc}
                  </p>
                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] flex items-start gap-3">
                      <Send className="w-4 h-4 text-[#2D4523] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                          {pillars.intercesion.c1Title}
                        </strong>
                        <p className="text-[11px] text-[#64748B] leading-relaxed">
                          {pillars.intercesion.c1Desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] flex items-start gap-3">
                      <Share2 className="w-4 h-4 text-[#D4B373] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                          {pillars.intercesion.c2Title}
                        </strong>
                        <p className="text-[11px] text-[#64748B] leading-relaxed">
                          {pillars.intercesion.c2Desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lienzo Oro y Ceniza */}
                <div 
                  className="relative rounded-2xl overflow-hidden border border-[#D4B373]/60 shadow-xl max-w-xs mx-auto aspect-[9/16] flex flex-col justify-center px-7 py-16 bg-cover bg-center text-white" 
                  style={{ backgroundImage: "url('/story-bg-oro-ceniza.png')" }}
                >
                  <div className="my-auto text-center space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4B373] font-serif-display block font-bold">
                      ✦ {tKey('canvas.goldBadge')} ✦
                    </span>
                    <p className="font-serif-bible italic text-xs sm:text-sm text-[#F1F5F9] leading-relaxed">
                      "{tKey('canvas.goldVerse')}"
                    </p>
                    <span className="text-[11px] font-sans text-[#D4B373] font-semibold block">
                      — {tKey('canvas.goldRef')} —
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. PACTO DE PAZ (MATEO 5:9 · MATEO 18:19) */}
            {activeTab === 'pacto' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-2">
                    <img
                      src={pillars.pacto.cap}
                      alt={pillars.pacto.capAlt}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 drop-shadow-xs"
                    />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1A1A1A] leading-tight -ml-1">
                        {pillars.pacto.titleAfterCap}
                      </h3>
                      <span className="text-xs text-[#5E7153] font-serif-bible italic font-semibold block mt-1 -ml-1">
                        {pillars.pacto.scriptureBadge}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {pillars.pacto.desc}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#2C3E50]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{pillars.pacto.f1Title}</strong> {pillars.pacto.f1Desc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{pillars.pacto.f2Title}</strong> {pillars.pacto.f2Desc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5E7153] shrink-0 mt-0.5" />
                      <span><strong>{pillars.pacto.f3Title}</strong> {pillars.pacto.f3Desc}</span>
                    </li>
                  </ul>
                </div>

                {/* Lienzo Olivo */}
                <div 
                  className="relative rounded-2xl overflow-hidden border border-[#D4B373] shadow-2xl max-w-xs mx-auto aspect-[9/16] flex flex-col justify-center px-7 py-16 bg-cover bg-center text-white" 
                  style={{ backgroundImage: "url('/story-bg-olivo.png')" }}
                >
                  <div className="my-auto text-center space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4B373] font-serif-display block font-bold">
                      ✦ {tKey('canvas.oliveBadge')} ✦
                    </span>
                    <p className="font-serif-bible italic text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
                      "{tKey('canvas.oliveVerse')}"
                    </p>
                    <span className="text-[11px] font-sans text-[#D4B373] font-semibold block">
                      — {tKey('canvas.oliveRef')} —
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3.5 MATICES LITÚRGICOS PARA COMPARTIR */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C6D4F] font-serif-display">
              {tKey('gallery.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1A1A1A]">
              {tKey('gallery.title')}
            </h2>
            <p className="text-sm text-[#64748B] font-serif-bible italic">
              {tKey('gallery.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            <div className="rounded-2xl overflow-hidden border border-[#E8E1D5] bg-white shadow-xs group hover:shadow-md transition-all">
              <div className="aspect-[9/13] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]" style={{ backgroundImage: "url('/story-bg-free-light.png')" }} />
              <div className="p-3 text-center">
                <span className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                  {tKey('gallery.linenTitle')}
                </span>
                <span className="text-[10px] text-[#5E7153] font-semibold">
                  {tKey('gallery.linenTag')}
                </span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#ECD9C6] bg-white shadow-xs group hover:shadow-md transition-all ring-1 ring-[#D4B373]/30">
              <div className="aspect-[9/13] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]" style={{ backgroundImage: "url('/story-bg-pergamino.png')" }} />
              <div className="p-3 text-center">
                <span className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                  {tKey('gallery.parchmentTitle')}
                </span>
                <span className="text-[10px] text-[#8C6D28] font-bold">Refugio PRO</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#2D4523]/30 bg-white shadow-xs group hover:shadow-md transition-all ring-1 ring-[#2D4523]/30">
              <div className="aspect-[9/13] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]" style={{ backgroundImage: "url('/story-bg-olivo.png')" }} />
              <div className="p-3 text-center">
                <span className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                  {tKey('gallery.oliveTitle')}
                </span>
                <span className="text-[10px] text-[#8C6D28] font-bold">Refugio PRO</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-black/40 bg-white shadow-xs group hover:shadow-md transition-all ring-1 ring-[#D4B373]/40">
              <div className="aspect-[9/13] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]" style={{ backgroundImage: "url('/story-bg-oro-ceniza.png')" }} />
              <div className="p-3 text-center">
                <span className="text-xs font-serif-display font-bold text-[#1A1A1A] block">
                  {tKey('gallery.goldTitle')}
                </span>
                <span className="text-[10px] text-[#8C6D28] font-bold">Refugio PRO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEFENSA INSTITUCIONAL Y DOCTRINAL (FAQS) */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 bg-white border-t border-[#EAE5DC]">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D4F] text-[11px] font-bold font-serif-display uppercase tracking-widest border border-[#ECD9C6]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{tKey('faq.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1A1A1A]">
              {tKey('faq.title')}
            </h2>
            <p className="text-sm text-[#64748B] font-serif-bible italic">
              {tKey('faq.subtitle')}
            </p>
          </div>

          <div className="space-y-3">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-[#EAE5DC] bg-[#FAF9F6] overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/60 transition"
                  >
                    <span className="font-serif-display font-bold text-sm sm:text-base text-[#1A1A1A]">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#5E7153] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 space-y-3 text-xs sm:text-sm text-[#4A5568] border-t border-[#EAE5DC]/60 animate-in fade-in duration-200">
                      <div className="p-3 rounded-xl bg-white border border-[#E8E1D5] text-[#2D4523] font-serif-bible italic text-xs">
                        <strong>{tKey('faq.foundationLabel')}</strong> {faq.verse}
                      </div>
                      <p className="leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. CARACTERÍSTICAS DISTINTIVAS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF8F5] border-t border-[#EAE5DC]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1A1A1A]">
              {tKey('features.title')}
            </h2>
            <p className="text-sm text-[#64748B] font-serif-bible italic">
              {tKey('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left space-y-3 hover:border-[#D4B373]/50 transition-all">
              <div className="p-2.5 rounded-xl bg-[#FAF0E6] text-[#8C6D4F] w-fit">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display font-bold text-lg text-[#1A1A1A]">
                {tKey('features.f1Title')}
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                {tKey('features.f1Desc')}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left space-y-3 hover:border-[#5E7153]/50 transition-all">
              <div className="p-2.5 rounded-xl bg-[#5E7153]/15 text-[#2D4523] w-fit">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display font-bold text-lg text-[#1A1A1A]">
                {tKey('features.f2Title')}
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                {tKey('features.f2Desc')}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs text-left space-y-3 hover:border-[#5E7153]/50 transition-all">
              <div className="p-2.5 rounded-xl bg-[#5E7153]/15 text-[#2D4523] w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display font-bold text-lg text-[#1A1A1A]">
                {tKey('features.f3Title')}
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                {tKey('features.f3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LLAMADO FINAL */}
      <section className="py-16 sm:py-20 bg-[#2D4523] text-white px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <img src="/logo.png" alt="GodGotYou" className="w-14 h-14 object-contain mx-auto brightness-110 drop-shadow-md" />
          
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#F8F9FA] max-w-xl mx-auto leading-tight">
            {tKey('finalCta.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#DCE6D9] font-serif-bible italic max-w-lg mx-auto">
            {tKey('finalCta.subtitle')}
          </p>

          <div className="pt-2">
            <a 
              href={targetAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#D4B373] hover:bg-[#C5A361] text-[#0E1113] text-sm font-serif-display font-bold tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <span>{tKey('finalCta.button')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. PIE DE PÁGINA */}
      <footer className="bg-white border-t border-[#EAE5DC] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-serif-display font-bold text-base text-[#1A1A1A]">God Got You</span>
              <span className="text-[11px] text-[#64748B]">· godgotyou.app</span>
            </div>
            <p className="text-xs text-[#718096] font-serif-bible italic">
              {tKey('footer.verse')}
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-[#64748B] flex-wrap">
            <button 
              type="button" 
              onClick={() => openLegal('privacy')}
              className="hover:text-[#2D4523] underline underline-offset-4 cursor-pointer"
            >
              {tKey('footer.privacy')}
            </button>
            <button 
              type="button" 
              onClick={() => openLegal('terms')}
              className="hover:text-[#2D4523] underline underline-offset-4 cursor-pointer"
            >
              {tKey('footer.terms')}
            </button>
            <button 
              type="button" 
              onClick={() => openLegal('refunds')}
              className="hover:text-[#2D4523] underline underline-offset-4 cursor-pointer"
            >
              {tKey('footer.refunds')}
            </button>
          </div>

          <div className="flex items-center justify-center gap-3">
            <a 
              href="mailto:contacto@godgotyou.app"
              className="p-2.5 rounded-xl border border-[#EAE5DC] text-[#4A5568] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] transition"
              title="Contacto"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com/godgotyou.app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[#EAE5DC] text-[#C13584] hover:bg-[#FAF8F5] transition flex items-center justify-center"
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a 
              href="https://tiktok.com/@godgotyou.app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[#EAE5DC] text-[#1A1A1A] hover:bg-[#FAF8F5] transition"
              title="TikTok"
            >
              <Music2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* 8. MODAL LEGAL OFICIAL PADDLE */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        language={locale}
        initialTab={legalInitialTab}
      />

      {/* 9. REPRODUCTOR CONTEMPLATIVO FLOTANTE */}
      <AudioPlayer />

    </div>
  );
}
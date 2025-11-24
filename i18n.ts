
export const translations = {
  en: {
    subtitle: "Generate conversion-ready HTML emails.",
    brandIdentity: "Brand Identity",
    brandName: "Brand Name",
    logoUrl: "Logo URL",
    websiteUrl: "Website URL (Required)",
    privacyPolicyUrl: "Privacy Policy URL",
    privacyPolicyDesc: "If left empty, the Website URL will be used for the footer link.",
    fontFamily: "Font Family",
    primary: "Primary",
    secondary: "Secondary",
    background: "Background",
    campaignContent: "Campaign Content",
    templateLanguage: "Template Language",
    campaignTopic: "Campaign Topic",
    tone: "Tone",
    tones: {
      professional: "Professional & Corporate",
      friendly: "Friendly & Casual",
      urgent: "Urgent / Sales-driven",
      minimalist: "Minimalist & Clean"
    },
    keyMessage: "Key Message",
    ctaText: "CTA Text",
    ctaLink: "CTA Link",
    advanced: "Advanced Configuration",
    customVariables: "Custom Variables",
    customVariablesDesc: "Enter variable names separated by commas (e.g. idea, step_title). The AI will insert them as {{variable}}.",
    generate: "Generate Template",
    crafting: "Crafting Email...",
    topicPlaceholder: "e.g. Summer Sale Announcement",
    messagePlaceholder: "What is the main thing you want to tell the user?",
    variablePlaceholder: "e.g. userName, order_id",
    missingTopic: "Please enter a campaign topic to start.",
    missingWebsite: "Website URL is required.",
    
    // AI Image
    enableAiImage: "Generate AI Banner Image",
    imagePromptLabel: "Image Description (Optional)",
    imagePromptDesc: "Describe the image you want. If empty, AI will use the campaign topic.",
    imagePromptPlaceholder: "e.g. A futuristic office with neon lights, minimal style",

    // Preview Panel
    readyToCraft: "Ready to Craft",
    readyDesc: "Configure your brand and campaign details on the left, then hit 'Generate Template' to see the magic happen.",
    generating: "Generating HTML...",
    generatingDesc: "AI is structuring tables, inlining CSS, and applying your brand colors.",
    errorTitle: "Something went wrong",
    errorDesc: "Failed to generate the template. Please verify your API key and try again.",
    preview: "Preview",
    htmlCode: "HTML Code",
    plainText: "Plain Text",
    desktop: "Desktop View",
    mobile: "Mobile View",
    copy: "Copy",
    copied: "Copied!",
    export: "Export HTML",
    unlock: "Unlock",
    
    // Modal
    unlockTitle: "Unlock Your Template",
    unlockDesc: "Join our community to get instant access to this generated code and future updates.",
    emailLabel: "Email Address",
    getMyCode: "Get My Code",
    privacy: "We respect your privacy. No spam, ever.",
    emailPlaceholder: "you@company.com",
    invalidEmail: "Please enter a valid email address.",
    
    // Meta
    subject: "Subject:",
    preheader: "Preview Text:",

    // Templates
    selectTemplateTitle: "Choose a Starting Point",
    selectTemplateDesc: "Select a structure that best fits your campaign goal. You can customize the content in the next step.",
    templates: {
      modern: { name: "Modern Card", desc: "Rounded corners, gradient headers. Perfect for apps & SaaS." },
      corporate: { name: "Corporate Pro", desc: "Clean, boxy, serious. Best for official announcements." },
      newsletter: { name: "Editorial Newsletter", desc: "Minimalist, text-focused. Great for weekly digests." },
      promo: { name: "Bold Promo", desc: "High impact, large visuals. Ideal for sales & offers." }
    },
    changeTemplate: "Change Template"
  },
  es: {
    subtitle: "Genera correos HTML listos para conversión.",
    brandIdentity: "Identidad de Marca",
    brandName: "Nombre de Marca",
    logoUrl: "URL del Logo",
    websiteUrl: "Sitio Web (Requerido)",
    privacyPolicyUrl: "URL Política de Privacidad",
    privacyPolicyDesc: "Si se deja vacío, se usará el Sitio Web para el enlace del pie de página.",
    fontFamily: "Tipografía",
    primary: "Primario",
    secondary: "Secundario",
    background: "Fondo",
    campaignContent: "Contenido de Campaña",
    templateLanguage: "Idioma de la Plantilla",
    campaignTopic: "Tema de Campaña",
    tone: "Tono",
    tones: {
      professional: "Profesional y Corporativo",
      friendly: "Amigable y Casual",
      urgent: "Urgente / Ventas",
      minimalist: "Minimalista y Limpio"
    },
    keyMessage: "Mensaje Clave",
    ctaText: "Texto del Botón",
    ctaLink: "Enlace del Botón",
    advanced: "Configuración Avanzada",
    customVariables: "Variables Personalizadas",
    customVariablesDesc: "Ingresa nombres de variables separados por comas (ej. idea, paso). La IA las insertará como {{variable}}.",
    generate: "Generar Plantilla",
    crafting: "Creando Email...",
    topicPlaceholder: "ej. Anuncio de Oferta de Verano",
    messagePlaceholder: "¿Qué es lo principal que quieres comunicar?",
    variablePlaceholder: "ej. nombreUsuario, id_pedido",
    missingTopic: "Por favor ingresa un tema para comenzar.",
    missingWebsite: "El Sitio Web es obligatorio.",

    // AI Image
    enableAiImage: "Generar Imagen Banner IA",
    imagePromptLabel: "Descripción de Imagen (Opcional)",
    imagePromptDesc: "Describe la imagen. Si lo dejas vacío, la IA usará el tema de la campaña.",
    imagePromptPlaceholder: "ej. Una oficina futurista con luces neón, estilo minimalista",

    // Preview Panel
    readyToCraft: "Listo para Crear",
    readyDesc: "Configura los detalles de tu marca a la izquierda y presiona 'Generar Plantilla' para ver la magia.",
    generating: "Generando HTML...",
    generatingDesc: "La IA está estructurando tablas, incrustando CSS y aplicando tus colores de marca.",
    errorTitle: "Algo salió mal",
    errorDesc: "Falló la generación de la plantilla. Verifica tu API key e intenta de nuevo.",
    preview: "Vista Previa",
    htmlCode: "Código HTML",
    plainText: "Texto Simple",
    desktop: "Vista Escritorio",
    mobile: "Vista Móvil",
    copy: "Copiar",
    copied: "¡Copiado!",
    export: "Exportar HTML",
    unlock: "Desbloquear",
    
    // Modal
    unlockTitle: "Desbloquea tu Plantilla",
    unlockDesc: "Únete a nuestra comunidad para obtener acceso instantáneo a este código y futuras actualizaciones.",
    emailLabel: "Correo Electrónico",
    getMyCode: "Obtener mi Código",
    privacy: "Respetamos tu privacidad. Sin spam, nunca.",
    emailPlaceholder: "tu@empresa.com",
    invalidEmail: "Por favor ingresa un correo válido.",
    
    // Meta
    subject: "Asunto:",
    preheader: "Pre-encabezado:",

    // Templates
    selectTemplateTitle: "Elige un Punto de Partida",
    selectTemplateDesc: "Selecciona la estructura que mejor se adapte a tu objetivo. Podrás personalizar el contenido después.",
    templates: {
      modern: { name: "Tarjeta Moderna", desc: "Bordes redondeados, degradados. Ideal Apps y SaaS." },
      corporate: { name: "Corporativo Pro", desc: "Limpio, cuadrado, serio. Para comunicados oficiales." },
      newsletter: { name: "Newsletter Editorial", desc: "Minimalista, enfocado en texto. Para boletines." },
      promo: { name: "Promo Impacto", desc: "Visuales grandes, colores fuertes. Ideal para ventas." }
    },
    changeTemplate: "Cambiar Plantilla"
  },
  pt: {
    subtitle: "Gere e-mails HTML prontos para conversão.",
    brandIdentity: "Identidade da Marca",
    brandName: "Nome da Marca",
    logoUrl: "URL do Logo",
    websiteUrl: "Site (Obrigatório)",
    privacyPolicyUrl: "URL Política de Privacidade",
    privacyPolicyDesc: "Se deixado em branco, o Site será usado para o link do rodapé.",
    fontFamily: "Tipografia",
    primary: "Primário",
    secondary: "Secundário",
    background: "Fundo",
    campaignContent: "Conteúdo da Campanha",
    templateLanguage: "Idioma do Modelo",
    campaignTopic: "Tópico da Campanha",
    tone: "Tom",
    tones: {
      professional: "Profissional e Corporativo",
      friendly: "Amigável e Casual",
      urgent: "Urgente / Vendas",
      minimalist: "Minimalista e Limpo"
    },
    keyMessage: "Mensagem Principal",
    ctaText: "Texto do Botão",
    ctaLink: "Link do Botão",
    advanced: "Configuração Avançada",
    customVariables: "Variáveis Personalizadas",
    customVariablesDesc: "Insira nomes de variáveis separados por vírgulas (ex. ideia, passo). A IA as inserirá como {{variavel}}.",
    generate: "Gerar Modelo",
    crafting: "Criando E-mail...",
    topicPlaceholder: "ex. Anúncio de Promoção de Verão",
    messagePlaceholder: "Qual é a principal mensagem que você quer passar?",
    variablePlaceholder: "ex. nomeUsuario, id_pedido",
    missingTopic: "Por favor insira um tópico para começar.",
    missingWebsite: "O Site é obrigatório.",

    // AI Image
    enableAiImage: "Gerar Imagem de Banner IA",
    imagePromptLabel: "Descrição da Imagem (Opcional)",
    imagePromptDesc: "Descreva a imagem. Se vazio, a IA usará o tópico da campanha.",
    imagePromptPlaceholder: "ex. Um escritório futurista com luzes neon, estilo minimalista",

    // Preview Panel
    readyToCraft: "Pronto para Criar",
    readyDesc: "Configure os detalhes da sua marca à esquerda e clique em 'Gerar Modelo' para ver a mágica acontecer.",
    generating: "Gerando HTML...",
    generatingDesc: "A IA está estruturando tabelas, inserindo CSS e aplicando as cores da sua marca.",
    errorTitle: "Algo deu errado",
    errorDesc: "Falha ao gerar o modelo. Verifique sua chave de API e tente novamente.",
    preview: "Visualização",
    htmlCode: "Código HTML",
    plainText: "Texto Simples",
    desktop: "Vista Desktop",
    mobile: "Vista Mobile",
    copy: "Copiar",
    copied: "Copiado!",
    export: "Exportar HTML",
    unlock: "Desbloquear",
    
    // Modal
    unlockTitle: "Desbloqueie seu Modelo",
    unlockDesc: "Junte-se à nossa comunidade para obter acesso instantâneo a este código e atualizações futuras.",
    emailLabel: "Endereço de E-mail",
    getMyCode: "Obter meu Código",
    privacy: "Respeitamos sua privacidade. Sem spam, nunca.",
    emailPlaceholder: "voce@empresa.com",
    invalidEmail: "Por favor, insira um endereço de e-mail válido.",
    
    // Meta
    subject: "Assunto:",
    preheader: "Texto de Pré-visualização:",

    // Templates
    selectTemplateTitle: "Escolha um Ponto de Partida",
    selectTemplateDesc: "Selecione a estrutura que melhor se adapta ao seu objetivo. Você pode personalizar o conteúdo a seguir.",
    templates: {
      modern: { name: "Cartão Moderno", desc: "Bordas arredondadas, gradientes. Ideal para Apps." },
      corporate: { name: "Corporativo Pro", desc: "Limpo, quadrado, sério. Para anúncios oficiais." },
      newsletter: { name: "Newsletter Editorial", desc: "Minimalista, focado em texto. Para boletins." },
      promo: { name: "Promo Impacto", desc: "Visuais grandes, cores fortes. Ideal para vendas." }
    },
    changeTemplate: "Mudar Modelo"
  }
};

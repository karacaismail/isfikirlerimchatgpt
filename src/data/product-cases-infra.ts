import type { ProductCase } from '../lib/product-value.ts';

const frappeApi: ProductCase['sources'][number] = {
  id: 'official-frappe-rest-api',
  title: 'Frappe Framework: REST API',
  url: 'https://docs.frappe.io/framework/user/en/api/rest',
  accessed: '2026-10-10',
  claim:
    'DocType veri işlemleri, izinli yöntem çağrıları ve kullanıcı yetkisine bağlı API erişimi mevcut.',
  limitation:
    'GenUI veya MetaFramer uygulamasının doğruluğunu, tenant sınırını ve işletim kabulünü göstermez.',
};

const frappeWorkflows: ProductCase['sources'][number] = {
  id: 'official-erpnext-workflows',
  title: 'ERPNext: Workflows',
  url: 'https://docs.frappe.io/erpnext/workflows',
  accessed: '2026-10-10',
  claim:
    'Rol, koşul ve birden fazla onay adımı içeren iş akışları zaten sunuluyor.',
  limitation:
    'Belirli müşterinin kurulumu ve bu akışların AI ile çalışması ayrıca incelenmeli.',
};

const raven: ProductCase['sources'][number] = {
  id: 'official-frappe-raven',
  title: 'Frappe Raven: resmî kaynak deposu',
  url: 'https://github.com/frappe/raven',
  accessed: '2026-10-10',
  claim:
    'Frappe/ERPNext entegrasyonları, sohbetten iş akışı etkileşimi ve çok adımlı Raven AI görevleri tarif ediliyor.',
  limitation:
    'Her ERPNext kurulumunda varsayılan AI özelliği veya ölçülmüş müşteri faydası demek değil.',
};

const odooAgents: ProductCase['sources'][number] = {
  id: 'official-odoo19-agents',
  title: 'Odoo 19: AI agents dokümantasyon kaynağı',
  url: 'https://github.com/odoo/documentation/blob/19.0/content/applications/productivity/ai/agents.rst',
  accessed: '2026-10-10',
  claim:
    'Doğal dil agent araçları, veri kaynakları ve uygulama eylemleri mevcut ürün kapsamında.',
  limitation:
    'Araç ve uygulama mevcudiyeti değişir; Türkiye uygunluğu, edisyon ve maliyet karşılaştırması yapılmadı.',
};

const odooActions: ProductCase['sources'][number] = {
  id: 'official-odoo19-ai-actions',
  title: 'Odoo 19: AI server actions dokümantasyon kaynağı',
  url: 'https://github.com/odoo/documentation/blob/19.0/content/applications/productivity/ai/server-actions.rst',
  accessed: '2026-10-10',
  claim:
    'AI araç seçebilir; iş kuralları ve doğru işlem sonucu araç kodunda uygulanmalıdır.',
  limitation:
    'AI ile işlem çağırmak tek başına iş doğruluğu veya otomatik güvenli işlem garantisi değildir.',
};

const businessCentral: ProductCase['sources'][number] = {
  id: 'official-business-central-ai',
  title: 'Microsoft: AI in Business Central',
  url: 'https://learn.microsoft.com/en-us/dynamics365/business-central/ai-in-bc',
  accessed: '2026-10-10',
  claim:
    'Veriye sohbetle erişim, analiz ve fatura/sipariş eşleştirme gibi ERP AI kabiliyetleri belgeleniyor.',
  limitation:
    'Dil, ülke, lisans ve preview koşulları özelliğe göre değişir; hedef müşterinin kurulumu bilinmiyor.',
};

const sapProcurement: ProductCase['sources'][number] = {
  id: 'official-sap-joule-procurement',
  title: 'SAP Learning: Joule in SAP Ariba Procurement',
  url: 'https://learning.sap.com/courses/sap-ariba-procurement-overview/implementing-joule-in-sap-ariba-procurement',
  accessed: '2026-10-10',
  claim:
    'Satın alma talebi, durum ve onaylayan bilgisine sohbetle erişim ürün kapsamında anlatılıyor.',
  limitation:
    'Tüm SAP müşterilerinde aynı kurulum, kalite veya maliyet bulunduğunu göstermez.',
};

const temporal: ProductCase['sources'][number] = {
  id: 'official-temporal-execution',
  title: 'Temporal: Workflow Execution',
  url: 'https://docs.temporal.io/workflow-execution',
  accessed: '2026-10-10',
  claim:
    'Kalıcı yürütüm durumu, olay geçmişi ve hata sonrası devam için hazır altyapı sunuluyor.',
  limitation:
    'ERP kuralları, dış yan etkilerin genel exactly-once garantisi veya MetaFramer ile bire bir eşdeğerlik sağlamaz.',
};

const copilotKit: ProductCase['sources'][number] = {
  id: 'official-copilotkit',
  title: 'CopilotKit: resmî kaynak deposu',
  url: 'https://github.com/CopilotKit/CopilotKit',
  accessed: '2026-10-10',
  claim:
    'Üretken arayüz, ortak durum, araç sonucu gösterimi ve insan onayı için hazır yapı taşları mevcut.',
  limitation:
    'ERP alan kurallarını sağlamaz; bütün ticari hizmetlerinin ücretsiz olduğu çıkarılmadı.',
};

const assistantUi: ProductCase['sources'][number] = {
  id: 'official-assistant-ui',
  title: 'assistant-ui: resmî dokümantasyon',
  url: 'https://www.assistant-ui.com/docs',
  accessed: '2026-10-10',
  claim:
    'Sohbet bileşenleri, çalışma zamanı bağlantıları ve araç arayüzleri için hazır seçenekler mevcut.',
  limitation:
    'EA veri modeli, ERP işlemleri, yetkilendirme veya eksiksiz ürün işletimi sağlamaz.',
};

const frappeHr: ProductCase['sources'][number] = {
  id: 'official-frappe-hr',
  title: 'Frappe HR: resmî kaynak deposu',
  url: 'https://github.com/frappe/hrms',
  accessed: '2026-10-10',
  claim:
    'Özlük, izin/devam, bordro ve performans gibi genel İK modülleri mevcut açık kaynak üründe yer alıyor.',
  limitation:
    'Türkiye bordro uygunluğu, cihaz entegrasyonu veya hedef işletmedeki kabul bu kaynakla doğrulanmaz.',
};

const odooAttendance: ProductCase['sources'][number] = {
  id: 'official-odoo19-attendance',
  title: 'Odoo 19: Attendances dokümantasyon kaynağı',
  url: 'https://github.com/odoo/documentation/blob/19.0/content/applications/hr/attendances.rst',
  accessed: '2026-10-10',
  claim:
    'Giriş/çıkış, kiosk, devam raporları ve yönetici onayı mevcut ürün kapsamında.',
  limitation:
    'People cihaz desteği veya Türkiye hesap kurallarıyla eşdeğerlik kurulmadı.',
};

const odooPayroll: ProductCase['sources'][number] = {
  id: 'official-odoo19-payroll',
  title: 'Odoo 19: Payroll dokümantasyon kaynağı',
  url: 'https://github.com/odoo/documentation/blob/19.0/content/applications/hr/payroll.rst',
  accessed: '2026-10-10',
  claim:
    'Çalışma kayıtlarından bordroya akış mevcut; ülkeye özel yerelleştirme ve hata çözümü gerekiyor.',
  limitation:
    'Türkiye için hazır veya uygun olduğu iddia edilmiyor; mevzuat ve sürüm ayrıca doğrulanmalı.',
};

// Alıcı ve değer ifadeleri sınanacak önerilerdir; talep veya satış kanıtı değildir.
export const infraProductCases: ProductCase[] = [
  {
    id: 'genui',
    position: 'feature',
    buyer: {
      user: 'Olası kullanıcı: satın alma taslağı hazırlayan operasyon çalışanı.',
      decisionMaker: null,
      payer: null,
      firstSegment: null,
      excluded:
        'Genel olarak ERP kullanan bütün şirketler hedef segment sayılmadı. Bağımsız ürün alıcısı belirlenmedi.',
    },
    problem: {
      workflow:
        'Sınanacak akış: satın alma taslağını hazırlama, kontrol ve onay.',
      trigger:
        'Bir satın alma ihtiyacının taslağa dönüşmesi; gerçek hedef işletme seçilmedi.',
      frequency: null,
      cost: null,
    },
    offer: {
      outcome:
        'Sınanacak sonuç: doğru ERP verisinden taslak üretmek ve yetkili kişinin kararını kaydetmek.',
      buyReason: null,
      smallestScope:
        'Tek satın alma taslağı; gerçek kimlik, ürün referansı, insan onayı ve işlem kaydı. Bunun mevcut ERP yolundan daha iyi olduğu ayrıca ölçülmeli.',
    },
    alternatives: [
      {
        name: 'Mevcut ERP ekranı ve onay akışı',
        url: null,
        claim:
          'Kullanıcı var olan yöntemle devam eder; yeni asistanın geçiş maliyeti oluşmaz.',
        limitation:
          'Hedef işletmenin kullandığı akış, sorun ve süre henüz gözlenmedi.',
      },
      {
        name: 'ERPNext workflow + Raven',
        url: raven.url,
        claim:
          'Onay akışları ve Frappe ekosisteminde sohbet/AI entegrasyonları zaten mevcut.',
        limitation:
          'Her ERPNext kurulumunda aynı özellikler etkin değil; somut kurulum karşılaştırılmalı.',
      },
      {
        name: 'Odoo 19 AI agents',
        url: odooAgents.url,
        claim: 'Doğal dil agent ve işlem araçları mevcut ürün kapsamında.',
        limitation:
          'Araçlar iş kurallarını ayrıca uygulamalı; edisyon ve hedef işletme uygunluğu bilinmiyor.',
      },
      {
        name: 'Dynamics Business Central / SAP Joule',
        url: businessCentral.url,
        claim:
          'Büyük ERP ürünlerinde de veriyle sohbet ve satın alma/finans AI işlevleri var.',
        limitation:
          'Ülke, dil, sürüm ve kurulum koşulları farklı; adayın doğrudan eşdeğeri kabul edilmedi.',
      },
    ],
    competition: {
      copyable:
        'Chat, tipli araç çağrısı, zengin arayüz ve insan onayı genel desenlerdir; hazır açık bileşenlerle kurulabilir.',
      advantage: null,
      missingAdvantage:
        'Belirli sektörde zor bir istisnayı daha iyi çözme, özel entegrasyon veya ölçülmüş kullanıcı üstünlüğü gösterilmedi.',
      counterargument:
        'ERP veriyi, yetkiyi ve onayı zaten tutuyor. İkinci asistan katmanının entegrasyon, eğitim ve bakım maliyeti faydasını aşabilir.',
    },
    distribution: {
      channel: null,
      access: 'unknown',
      firstOffer: null,
      steps: [
        'Önce gerçek bir ürün süreci ve onu kullanan işletmeyi belirle.',
        'İşlemi mevcut ERP yolu ve GenUI ile aynı girdide karşılaştır.',
        'Bağımsız satış ancak ayrı alıcı ve ödeme nedeni bulunursa değerlendir.',
      ],
      cost: 'Mevcut erişim, entegrasyon, eğitim ve destek emeği ölçülmedi.',
    },
    economics: {
      unit: null,
      recurrence: null,
      costs: [
        'ERP entegrasyonu',
        'Model kullanımı ve gözlemleme',
        'Yetki/işlem bakımı ve kullanıcı desteği',
      ],
      risk: 'Ayrı gelir modeli yok; mevcut ERP kabiliyetinin ek maliyetle tekrarlanması mümkün.',
    },
    portfolio: {
      consumer: null,
      contribution:
        'Tipli ERP şemaları ve izinli işlem yüzeyi var. Hangi gerçek ürünün bunu tükettiği henüz gösterilmedi.',
      opportunityCost:
        'Genel asistanı büyütmek, daha açık kullanıcı problemi olan ürünün somut akışını geciktirebilir.',
    },
    evidenceIds: ['CONT-REM-SRC-001'],
    sources: [
      frappeWorkflows,
      frappeApi,
      raven,
      odooAgents,
      odooActions,
      businessCentral,
      sapProcurement,
      copilotKit,
    ],
    experiments: [
      {
        assumption: 'Mevcut ERP yolunda çözülmeye değer bir sorun var.',
        action:
          'Gerçek satın alma akışını kullanıcıyla izle; sorun ve alternatifini kaydet.',
        measure:
          'İş sıklığı, süre, hata, yeniden işleme ve onay bekleme nedeni.',
        pass: 'Tekrarlanan ve sahibi belli bir sorun somut örneklerle görülür.',
        fail: 'Yalnız genel AI ilgisi varsa veya mevcut yol yeterliyse bağımsız ürün önerisini kaldır.',
      },
      {
        assumption:
          'GenUI aynı işi mevcut ERP/AI yolundan daha iyi tamamlıyor.',
        action:
          'Aynı girdiler ve kullanıcılarla mevcut yol ile tek GenUI akışını karşılaştır.',
        measure:
          'Doğru tamamlama, süre, destek ihtiyacı, hata ve toplam kullanım maliyeti.',
        pass: 'Kullanıcının önceden belirlediği değer ölçütünde üstünlük oluşur; doğruluk gerilemez.',
        fail: 'Üstünlük yoksa kabiliyeti daralt veya ürün içi kullanım önerisini kaldır.',
      },
      {
        assumption:
          'Bağımsız bir alıcı bu üstünlük için mevcut çözümden ayrılır.',
        action:
          'Kanıtlanan sonucu gerçek karar ve bütçe sahibine mevcut alternatifiyle sun.',
        measure:
          'Alternatif tercih nedeni, bütçe yetkisi ve somut kullanım/ödeme taahhüdü.',
        pass: 'Alıcı neden ayrı ürün istediğini ve kabul koşulunu açıkça belirtir.',
        fail: 'Yalnız olumlu yorum varsa bağımsız satış gerekçesi boş kalır.',
      },
    ],
    facts: {
      buyer: null,
      problem: null,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Bağımsız ürün diye öne çıkarma gerekçesi yok. Somut bir ürün sürecinde faydası ölçülürse GenUI o ürünün kabiliyeti olabilir.',
  },
  {
    id: 'metaframer',
    position: 'infrastructure',
    buyer: {
      user: 'Olası kullanıcı: bir iş uygulamasını geliştiren yazılım ekibi.',
      decisionMaker: null,
      payer: null,
      firstSegment: null,
      excluded:
        'İç referans uygulaması dış müşteri sayılmadı. Bağımsız ekiplerin satın alma veya yardım almadan kullanım kanıtı yok.',
    },
    problem: {
      workflow:
        'Ürünlerde kimlik, işlem, audit, outbox ve sunum sözleşmelerini tekrar kurma.',
      trigger:
        'Yeni ürün veya ikinci tüketicide aynı altyapı ihtiyacının doğması.',
      frequency: null,
      cost: null,
    },
    offer: {
      outcome:
        'Sınanacak iç katkı: gerçek tüketicide doğru kayıt ve hata zincirini daha az tekrar işle kurmak.',
      buyReason: null,
      smallestScope:
        'Tek gerçek tüketicide kayıt, gerçek policy, audit ve outbox; sonra ikinci tüketicide uyarlama ve bakım karşılaştırması.',
    },
    alternatives: [
      {
        name: 'Mevcut ürün frameworkü ve uygulama kodu',
        url: null,
        claim:
          'Yeni çekirdek öğrenmeden ürünü mevcut mimaride geliştirmek mümkün.',
        limitation:
          'Tekrar iş ve bakım maliyeti ölçülmeden daha ucuz olduğu varsayılamaz.',
      },
      {
        name: 'Frappe Framework',
        url: frappeApi.url,
        claim:
          'Hazır veri API erişimi ve izinli iş yöntemleri altyapı kapsamının bir bölümünü karşılayabilir.',
        limitation:
          'MetaFramer sözleşmelerinin bire bir karşılığı değildir; adaptasyon ölçülmeli.',
      },
      {
        name: 'Temporal',
        url: temporal.url,
        claim: 'Kalıcı workflow yürütümü için mevcut altyapı seçeneği var.',
        limitation:
          'UI, ERP domain kuralları ve app-owned veri işlemlerinin bütünü yerine geçmez.',
      },
    ],
    competition: {
      copyable:
        'Tekil API, outbox ve durum makinesi desenleri biliniyor; iyi birleşim ve bakım maliyeti ayrıca kanıtlanmalı.',
      advantage: null,
      missingAdvantage:
        'Başka gerçek üründe ölçülmüş tekrar iş azalması ve bağımsız ekip kabulü gösterilmedi.',
      counterargument:
        'Yeni kernel kendi bakımını, öğrenme maliyetini ve soyutlama uyumsuzluklarını ekleyebilir; Customer örneği bütün iş alanlarını temsil etmez.',
    },
    distribution: {
      channel: null,
      access: 'unknown',
      firstOffer: null,
      steps: [
        'Altyapıya ihtiyaç duyan gerçek ürün tüketicisini seç.',
        'Mevcut yığınla ve MetaFramer ile aynı işlemin eforunu karşılaştır.',
        'Dış ürün iddiasından önce bağımsız ekibin yardım almadan tüketimini gözle.',
      ],
      cost: 'Geliştirici eğitimi, sürüm geçişi, adaptör ve sürekli bakım maliyeti ölçülmedi.',
    },
    economics: {
      unit: null,
      recurrence: null,
      costs: [
        'Ortak çekirdek bakımı',
        'Ürün adaptörleri ve sürüm uyumu',
        'İşletim ve hata desteği',
      ],
      risk: 'Bir ürünü hızlandırmak için kurulan platform başka ürünlerde ek uyarlama yükü yaratabilir.',
    },
    portfolio: {
      consumer: null,
      contribution:
        'Customer referans diliminde typed API, persistence, audit/outbox, surface ve host kodu var. Bağımsız gerçek portföy tüketicisi seçilmedi.',
      opportunityCost:
        'Tüketici talebi olmadan genel SDK kapsamını büyütmek, kullanıcının ürün akışını tamamlamasını geciktirir.',
    },
    evidenceIds: [
      'personal-cont-f32229f7ba217487',
      'personal-cont-b4d10a8b0281b49f',
      'personal-cont-1b88e5a5440d86c7',
      'personal-cont-16aaf996d898135d',
    ],
    sources: [frappeApi, temporal],
    experiments: [
      {
        assumption: 'Gerçek ürün için ortak çekirdeğe ihtiyaç var.',
        action:
          'Bir tüketicinin gerekli işlem ve hata davranışını mevcut yığınıyla karşılaştır.',
        measure: 'Eksik kabiliyet, yeniden yazım, bağımlılık ve bakım yükü.',
        pass: 'Somut tüketicinin mevcut yığında karşılanmayan veya pahalı bir ihtiyacı görünür olur.',
        fail: 'Tüketici yoksa yeni genel çekirdek kapsamını ertele.',
      },
      {
        assumption:
          'Ortak sözleşme ikinci üründe gerçekten tekrar kullanılabilir.',
        action:
          'Aynı kabiliyeti ikinci gerçek ürünün kimlik ve veri sınırına bağla.',
        measure:
          'Uyarlama süresi, özel dal sayısı, hata sonucu ve bakım değişikliği.',
        pass: 'Paylaşımın sağladığı yarar ek uyarlama ve bakım maliyetini aşar.',
        fail: 'Ürünlere ayrı kod daha uygun çıkarsa ortaklaşma kapsamını daralt.',
      },
      {
        assumption: 'Dış yazılım ekibi bu altyapıyı bağımsız kullanmak ister.',
        action:
          'Sürümlü dar paketi bağımsız ekibe ver; kurucu yardımını ayrı kaydet.',
        measure:
          'Yardımsız kurulum, görev başarısı, engeller ve mevcut araç yerine tercih nedeni.',
        pass: 'Ekip kendi sorununu çözmek için paketi tekrar kullanır ve tercih nedenini belirtir.',
        fail: 'Sadece kurucuyla çalışan demo varsa dış ürün hazırlığı veya ödeme nedeni çıkarma.',
      },
    ],
    facts: {
      buyer: null,
      problem: null,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Somut altyapı kodu var; yatırım katkısı gerçek tüketici ve ikinci kullanım üzerinden ölçülmeli. Bağımsız satış gerekçesi henüz yok.',
  },
  {
    id: 'kernel-plan',
    position: 'research',
    buyer: {
      user: 'İç kullanım: ortak altyapı kararını veren geliştirici.',
      decisionMaker: null,
      payer: null,
      firstSegment: null,
      excluded:
        'İki tarihli plan belgesi ayrı müşteri ürünü veya MetaFramer dışında ikinci gelir varlığı sayılmadı.',
    },
    problem: {
      workflow:
        'Tarihli primitive/tüketici hedeflerini güncel kaynak ve kabul kanıtıyla uzlaştırma.',
      trigger: 'Eski plan ile yeni uygulama arasında karar verilmesi.',
      frequency: null,
      cost: null,
    },
    offer: {
      outcome:
        'Aynı hedefe iki kez yatırım yapılmasını önleyecek kaynak ve sorumluluk eşlemesi.',
      buyReason: null,
      smallestScope:
        'İki planın tek tüketici hedefini güncel MetaFramer kaynağı veya açık eksikle eşle.',
    },
    alternatives: [
      {
        name: 'Güncel MetaFramer kaynaklarıyla devam',
        url: null,
        claim:
          'Eski planı yeni ürün gibi geliştirmeden gerçekleşen hedefler kullanılabilir.',
        limitation:
          'Repo ve sözleşme sınırı kurulmadan bütün Kernel hedefleri tamamlandı denemez.',
      },
      {
        name: 'Mevcut tüketicinin frameworkü',
        url: null,
        claim: 'Tüketici gerekli davranışı mevcut mimaride sağlayabilir.',
        limitation: 'Tüketici ihtiyacı ve efor karşılaştırması henüz yok.',
      },
      {
        name: 'Frappe / Temporal gibi mevcut altyapılar',
        url: frappeApi.url,
        claim:
          'Veri API erişimi ve kalıcı workflow için hazır alternatifler bulunuyor.',
        limitation:
          'Bir araya getirilmeleri ayrıca mühendislik ister; Kernel planıyla bire bir eşdeğer değiller.',
      },
    ],
    competition: {
      copyable:
        'Plan ilkeleri ve genel primitive adları tek başına korunabilir ürün avantajı oluşturmaz.',
      advantage: null,
      missingAdvantage:
        'Ayrı paket, bağımsız tüketici ve bağımsız ödeme sebebi gösterilmedi.',
      counterargument:
        'Aynı mimari niyeti farklı adlarla saymak yatırım faydasını şişirebilir. Eski NO-GO hükmü de yeni MetaFramer koduna taşınamaz.',
    },
    distribution: {
      channel: null,
      access: 'unknown',
      firstOffer: null,
      steps: [
        'Tarihli belgeleri ve güncel kaynak sınırlarını eşle.',
        'MetaFramer ile mükerrer hedefleri tekleştir.',
        'Yalnız gerçek tüketicinin açık ihtiyacını geliştirme dilimine aktar.',
      ],
      cost: 'Belge uzlaştırma emeği ölçülmedi; ayrı satış kanalı tanımlanmadı.',
    },
    economics: {
      unit: null,
      recurrence: null,
      costs: ['Plan ve kaynak uzlaştırma', 'Sözleşme sınırı bakımı'],
      risk: 'Mükerrer altyapı geliştirme ve geçmiş durumun bugünkü gerçeklik sanılması.',
    },
    portfolio: {
      consumer: null,
      contribution:
        'Mimari hedef ve kabul stratejisi kaydı; güncel MetaFramer uygulamasından ayrı değerlendirilmeli.',
      opportunityCost:
        'Belgeyi bağımsız ürün gibi genişletmek gerçek ürün eksiklerini çözmeyebilir.',
    },
    evidenceIds: ['CONT-REM-BIN-023', 'CONT-REM-BIN-024'],
    sources: [frappeApi, temporal],
    experiments: [
      {
        assumption: 'Planlarda henüz karşılanmamış güncel bir hedef var.',
        action:
          'Her hedefi tarih, sürüm, güncel kaynak ve kabul durumu ile eşle.',
        measure: 'Karşılanan, eksik, eskimiş ve mükerrer hedefler.',
        pass: 'Eksik hedef somut kaynak sınırıyla ayrılır.',
        fail: 'Hedef zaten karşılanmışsa yeni geliştirme işi çıkarma.',
      },
      {
        assumption: 'Eksik hedef gerçek tüketiciyi engelliyor.',
        action:
          'Seçilen tüketicinin aynı işi mevcut altyapıyla yapıp yapamadığını göster.',
        measure: 'Tekrarlanabilir engel, gerekli sözleşme ve alternatif çözüm.',
        pass: 'Tüketiciye bağlı açık bir eksik ve kabul örneği oluşur.',
        fail: 'Yalnız genel mimari tercih varsa hedefi araştırma olarak bırak.',
      },
      {
        assumption: 'Yeni primitive mevcut araçlardan daha uygun.',
        action:
          'Dar davranışı mevcut framework veya hazır altyapıyla karşılaştır.',
        measure: 'Doğruluk, uyarlama, bakım ve bağımlılık yükü.',
        pass: 'Yeni primitive için somut gerekçe bulunur.',
        fail: 'Hazır yol yeterliyse ayrı Kernel kapsamını büyütme.',
      },
    ],
    facts: {
      buyer: null,
      problem: null,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Tarihli mimari araştırmasıdır. MetaFramer ile mükerrer bağımsız ürün veya gelir adayı olarak sıralanmamalı.',
  },
  {
    id: 'cronbi',
    position: 'umbrella',
    buyer: {
      user: null,
      decisionMaker: null,
      payer: null,
      firstSegment: null,
      excluded:
        'On bir ürünün sunumda listelenmesi, tek alıcı veya uygulanmış ortak çekirdek kanıtı sayılmadı.',
    },
    problem: {
      workflow:
        'Sunumdaki sorun: farklı iş uygulamalarında kopuk bilgi ve tekrar veri girişi.',
      trigger: 'Bir işlemin birden fazla iş uygulaması arasında ilerlemesi.',
      frequency: null,
      cost: null,
    },
    offer: {
      outcome:
        'Sınanacak sonuç: tek süreçte veri tekrarını ve uygulamalar arası kopukluğu azaltmak.',
      buyReason: null,
      smallestScope:
        'Bir alt ürün ve tek bağlı süreç seç; kimlik, veri ve durum geçişinin gerçekten ortak çalıştığını göster.',
    },
    alternatives: [
      {
        name: 'Mevcut ayrı uygulamalar ve dosya aktarımı',
        url: null,
        claim: 'İşletme var olan paketlerini koruyarak işlemi tamamlayabilir.',
        limitation: 'Tekrar iş ve hata bedeli gerçek işletmede ölçülmedi.',
      },
      {
        name: 'ERPNext / Frappe uygulama ekosistemi',
        url: frappeApi.url,
        claim:
          'Veri API erişimi, iş akışları ve bağlı uygulamalar için mevcut temel var.',
        limitation:
          'Cronbi alt ürünleri veya Türkiye senaryosuyla kapsam eşdeğerliği kurulmadı.',
      },
      {
        name: 'Odoo uygulamaları ve AI agents',
        url: odooAgents.url,
        claim:
          'Çoklu iş uygulaması ve bu uygulamalara bağlı agent araçları mevcut.',
        limitation:
          'Geçiş, yerelleştirme, entegrasyon ve maliyet hedef işletmede karşılaştırılmalı.',
      },
    ],
    competition: {
      copyable:
        'Tek çatı, modül listesi ve AI söylemi mevcut ERP ailelerinde de bulunuyor.',
      advantage: null,
      missingAdvantage:
        'Yerel entegrasyon, daha düşük geçiş yükü veya bağlı süreç üstünlüğü gerçek alıcıda gösterilmedi.',
      counterargument:
        'Bütün paketleri değiştirmek veri taşıma ve benimseme maliyeti yaratır; geniş çatı ilk satın alınacak sonucu belirsizleştirir.',
    },
    distribution: {
      channel:
        'Sunumda şirket geçmişi ve yerel ilişki ağı iddiası var; güncel erişilebilir müşteri kanalı doğrulanmadı.',
      access: 'hypothesis',
      firstOffer: null,
      steps: [
        'İlişki ağı iddiasını gerçekten erişilebilir süreç ve karar sahibiyle eşle.',
        'Çatı yerine tek alt ürünün bağlı süreç sonucunu göster.',
        'Mevcut sistemi tamamlamanın mı değiştirmenin mi tercih edildiğini öğren.',
      ],
      cost: 'Satış erişimi, geçiş, veri taşıma ve destek emeği bilinmiyor.',
    },
    economics: {
      unit: null,
      recurrence: null,
      costs: [
        'Alt ürün geliştirme ve uyumu',
        'Veri taşıma ve entegrasyon',
        'Kurulum ve kullanıcı desteği',
      ],
      risk: 'Çatı kapsamı büyürken tek bir alıcı sonucunun tamamlanamaması.',
    },
    portfolio: {
      consumer: null,
      contribution:
        'Ortak kimlik, belge, akış ve rapor vizyonu var; kaynak ve gerçek yeniden kullanım henüz eşlenmedi.',
      opportunityCost:
        'Çatı kapsamını tamamlamaya çalışmak daha dar bir ürünün doğrulanabilir akışını geciktirebilir.',
    },
    evidenceIds: ['CONT-REM-BIN-025'],
    sources: [frappeApi, frappeWorkflows, odooAgents],
    experiments: [
      {
        assumption:
          'Kopuk uygulamalar belirli bir işletmede önemli tekrar iş yaratıyor.',
        action: 'Tek bağlı sürecin veri geçişlerini ve sorumlularını izle.',
        measure: 'Tekrar giriş, mutabakat, hata ve bekleme nedeni.',
        pass: 'Sahibi ve bedeli belirli bir kopukluk gözlenir.',
        fail: 'Yalnız genel paket isteği varsa çatıya değer puanı verme.',
      },
      {
        assumption:
          'Cronbi bu süreci mevcut araçlardan daha iyi birleştiriyor.',
        action:
          'Aynı akışı mevcut paketler, hazır entegrasyon ve dar Cronbi dilimiyle karşılaştır.',
        measure: 'Doğru veri, görev süresi, geçiş ve bakım maliyeti.',
        pass: 'Kullanıcının önem verdiği sonuçta ölçülmüş yarar oluşur.',
        fail: 'Yeni çekirdek ek yük getiriyorsa kapsamı tek alt ürünle sınırla.',
      },
      {
        assumption: 'Şirket geçmişi güncel ve kullanılabilir erişim sağlıyor.',
        action:
          'İddia edilen erişimi gerçek karar sahibi ve somut süreç ilgisiyle doğrula.',
        measure: 'Erişimin kaynağı, problem sahibi ve değerlendirmeye katılım.',
        pass: 'Gerçek erişim ve somut değerlendirme yolu gözlenir.',
        fail: 'Yalnız geçmiş anlatısı varsa kanalı doğrulanmış sayma.',
      },
    ],
    facts: {
      buyer: null,
      problem: null,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Cronbi bir çatı anlatısıdır. İlk yatırım ve alıcı gerekçesi tek alt ürünün gerçek süreç katkısıyla kurulmalı; sunum grafikleri ölçülmüş sonuç sayılmaz.',
  },
  {
    id: 'cronbi-people',
    position: 'product',
    buyer: {
      user: 'Önerilen kullanıcı: puantaj ve dönem kapanışını hazırlayan İK/özlük çalışanı.',
      decisionMaker:
        'Olası karar sahibi: İK yöneticisi; mevcut süreçteki yetkisi doğrulanmadı.',
      payer: null,
      firstSegment: null,
      excluded:
        'Bütün İK ekipleri hedef segment sayılmadı. HRMS ile aynı kaynak/sürüm olduğu ve Türkiye bordro kabulü gösterilmedi.',
    },
    problem: {
      workflow:
        'Puantaj verisi, özlük bilgisi ve dönem kapanış farklarını uzlaştırma.',
      trigger:
        'Bir çalışma döneminin kapanması; hedef işletmenin gerçek istisnaları bilinmiyor.',
      frequency: null,
      cost: null,
    },
    offer: {
      outcome:
        'Sınanacak sonuç: tek dönem kapanışındaki farkı kaynak ve onay iziyle açıklamak.',
      buyReason: null,
      smallestScope:
        'Tek sentetik dönem, puantaj girdisi, fark açıklaması ve yetkili kapanış. Hesap doğruluğu alan sahibinin örnekleriyle sınanmalı.',
    },
    alternatives: [
      {
        name: 'Mevcut PDKS, bordro paketi ve elektronik tablo',
        url: null,
        claim:
          'İşletme mevcut araçlar ve kontrol adımlarıyla dönemi kapatabilir.',
        limitation:
          'Gerçek hata, mutabakat ve destek maliyeti henüz ölçülmedi.',
      },
      {
        name: 'Frappe HR',
        url: frappeHr.url,
        claim:
          'Özlük, devam, izin, performans ve bordro modülleri mevcut açık kaynak üründe var.',
        limitation:
          'Türkiye bordrosu ve belirli PDKS cihazları için uygunluk ayrıca doğrulanmalı.',
      },
      {
        name: 'Odoo Attendances / Payroll',
        url: odooPayroll.url,
        claim:
          'Devam kayıtları, yönetici onayı ve çalışma girdilerinden bordroya akış mevcut.',
        limitation:
          'Ülke yerelleştirmesi ve sürüm koşulları var; Türkiye uygunluğu varsayılmadı.',
      },
    ],
    competition: {
      copyable:
        'Özlük, bordro, PDKS ve geniş modül listesi genel İK ürünlerinde yaygın; modül sayısı farklılaşma değildir.',
      advantage: null,
      missingAdvantage:
        'Belirli vardiya/cihaz/veri istisnası, yerel hesap doğruluğu ve ölçülmüş kapanış yararı gösterilmedi.',
      counterargument:
        'Mevcut bordro paketi alan güvenini ve alışkanlığı taşıyor. Yeni ürün hesap riski, veri taşıma ve sürekli destek yükü yaratabilir.',
    },
    distribution: {
      channel: null,
      access: 'unknown',
      firstOffer: null,
      steps: [
        'Gerçek bir kapanış sorunu ve bu sorunu sahiplenen İK yöneticisi belirle.',
        'Mevcut dönem sonucuyla dar People akışını aynı örneklerde karşılaştır.',
        'Tercih nedeni ve bütçe sahibini doğrulamadan paket satışı önerme.',
      ],
      cost: 'Cihaz, bordro uyarlama, veri taşıma ve dönem kapanışı desteği ölçülmedi.',
    },
    economics: {
      unit: null,
      recurrence: null,
      costs: [
        'Hesap kuralı ve yerelleştirme bakımı',
        'PDKS/bordro entegrasyonu',
        'Kapanış dönemi desteği ve veri taşıma',
      ],
      risk: 'Tekrarlanan iş bulunması, satın alma isteği veya kârlı abonelik anlamına gelmez.',
    },
    portfolio: {
      consumer: null,
      contribution:
        'İK alanında olası ürün akışı; ortak kimlik ve audit tüketimi henüz kaynakla doğrulanmadı.',
      opportunityCost:
        'On beş modülü aynı anda geliştirmek tek doğru kapanış akışını geciktirebilir.',
    },
    evidenceIds: ['CONT-REM-BIN-026'],
    sources: [frappeHr, odooAttendance, odooPayroll],
    experiments: [
      {
        assumption: 'Hedef işletmede kapanış farkı önemli bir sorun.',
        action:
          'Mevcut kapanışın veri kaynaklarını, istisnalarını ve kontrol adımlarını izle.',
        measure: 'Fark türü, tekrar iş, çözüm süresi ve sorumlusu.',
        pass: 'Tekrarlanan somut bir istisna ve problem sahibi bulunur.',
        fail: 'Genel modül isteği dışında sorun yoksa ilk segmenti belirlenmiş sayma.',
      },
      {
        assumption: 'Dar People akışı doğru ve daha yararlı sonuç veriyor.',
        action:
          'Alan sahibinin beklenen sonuçlarıyla aynı sentetik dönem ve sınır örneklerini karşılaştır.',
        measure:
          'Hesap/fark doğruluğu, açıklanabilirlik, süre ve yeniden işleme.',
        pass: 'Beklenen sonuçlar doğru; kullanıcının seçtiği değer ölçütünde yarar var.',
        fail: 'Hesap farkı veya yarar yoksa modül kapsamını büyütme.',
      },
      {
        assumption: 'Alıcı mevcut HR/PDKS yolundan ayrılmak ister.',
        action:
          'Gösterilen sonucu mevcut paket ve geçiş yüküyle birlikte karar/bütçe sahibine değerlendir.',
        measure:
          'Tercih nedeni, geçiş koşulu, destek beklentisi ve somut kullanım taahhüdü.',
        pass: 'Alıcı neden bu çözümü seçtiğini ve kabul sınırını belirtir.',
        fail: 'Mevcut paket yeterliyse veya geçiş yükü ağırsa bağımsız satış önerisini kaldır.',
      },
    ],
    facts: {
      buyer: null,
      problem: null,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Ürün fikri tanımlı, fakat sunumdaki modül listesi ve süre iddiaları uygulama veya alıcı üstünlüğü değildir. Önce tek kapanış problemi sınanmalı.',
  },
  {
    id: 'ai-first-ea',
    position: 'infrastructure',
    buyer: {
      user: 'Olası kullanıcı: AI komut yüzeyini kendi uygulamasına bağlayan frontend geliştiricisi.',
      decisionMaker: null,
      payer: null,
      firstSegment: null,
      excluded:
        'AiCommandCard çalışan EA platformu sayılmadı. Eski persona ve fiyat önerileri müşteri araştırması veya ödeme kanıtı değildir.',
    },
    problem: {
      workflow:
        'Bir ürünün navigation, query, açık/kapalı panel ve odak davranışını bağlama.',
      trigger: 'Mevcut uygulamaya AI komut yüzeyi eklenmesi.',
      frequency: null,
      cost: null,
    },
    offer: {
      outcome:
        'Sınanacak iç katkı: gerçek ürün olayına bağlı, erişilebilir ve tutarlı komut yüzeyi.',
      buyReason: null,
      smallestScope:
        'Bir gerçek tüketicide navigation/query callback, hata, klavye ve 320 CSS px kabulü; backend varmış gibi gösterilmez.',
    },
    alternatives: [
      {
        name: 'Mevcut tasarım sistemi ve özel panel',
        url: null,
        claim: 'Ekip mevcut bileşenleriyle aynı komut yüzeyini kurabilir.',
        limitation:
          'Entegrasyon ve erişilebilirlik emeği aynı görevde ölçülmeli.',
      },
      {
        name: 'assistant-ui',
        url: assistantUi.url,
        claim:
          'Sohbet primitives, runtimes ve tool UI için hazır seçenekler mevcut.',
        limitation:
          'Adayın panel davranışı ve EA vizyonuyla bire bir aynı ürün değildir.',
      },
      {
        name: 'CopilotKit',
        url: copilotKit.url,
        claim:
          'Ortak state, üretken UI ve insan onayı için mevcut araçlar var.',
        limitation:
          'Gerçek domain, backend ve yetki bağlantısı yine ürüne aittir.',
      },
    ],
    competition: {
      copyable:
        'Panel açma/kapatma, callback ve komut kartı genel arayüz desenleridir; tek başına savunulabilir satış nedeni değildir.',
      advantage: null,
      missingAdvantage:
        'Bağımsız tüketicide daha az entegrasyon emeği, daha iyi görev başarısı ve paket tercih nedeni ölçülmedi.',
      counterargument:
        'Ekip mevcut açık araçları veya kendi tasarım sistemini seçebilir. Portal kullanmamak ve Türkçe doküman tek başına üstünlük kanıtı değildir.',
    },
    distribution: {
      channel:
        'Eski analist raporunda iç kullanım, iki tanıdık ekip ve rehber alıcıları anılıyor; güncel erişim ve bağımsız kullanım doğrulanmadı.',
      access: 'hypothesis',
      firstOffer: null,
      steps: [
        'Önce gerçek ürün tüketicisini ve mevcut arayüz sorununu doğrula.',
        'Aynı görevde mevcut bileşenlerle entegrasyonu karşılaştır.',
        'Dış paket/rehber önerisini bağımsız kullanım ve tercih verisine bağla.',
      ],
      cost: 'Paket yayını, sürüm uyumu, dokümantasyon, entegrasyon ve destek emeği ölçülmedi.',
    },
    economics: {
      unit: null,
      recurrence: null,
      costs: [
        'Üretim paketi ve sürüm uyumu',
        'Erişilebilirlik ve tarayıcı kabulü',
        'Dokümantasyon ve tüketici desteği',
      ],
      risk: 'Bir kerelik UI bileşen ihtiyacı sürekli gelir oluşturmayabilir; geniş EA vizyonu bakım kapsamını büyütebilir.',
    },
    portfolio: {
      consumer: null,
      contribution:
        'Somut React komut kartı ve state/callback sözleşmesi var; bağımsız gerçek ürün tüketicisi bu incelemede doğrulanmadı.',
      opportunityCost:
        'EA ürün ailesini varsayarak kapsam büyütmek dar UI kabiliyetinin gerçek kullanımını geciktirebilir.',
    },
    evidenceIds: [
      'CONT-REM-SRC-126',
      'CONT-REM-SRC-127',
      'CONT-REM-SRC-128',
      'CONT-REM-SRC-132',
    ],
    sources: [assistantUi, copilotKit],
    experiments: [
      {
        assumption: 'Gerçek tüketicide komut yüzeyi için somut ihtiyaç var.',
        action:
          'Bir uygulamanın mevcut navigation/query görevini kullanıcı ve geliştiriciyle izle.',
        measure: 'Görev engeli, mevcut bileşen sınırı ve entegrasyon ihtiyacı.',
        pass: 'Somut tüketici ve çözülmesi gereken davranış bulunur.',
        fail: 'Yalnız genel EA vizyonu varsa yeni platform kapsamı çıkarma.',
      },
      {
        assumption: 'AiCommandCard mevcut seçenekten daha iyi sonuç veriyor.',
        action:
          'Aynı tüketicide mevcut panel veya açık alternatifle karşılaştır.',
        measure:
          'Entegrasyon emeği, görev başarısı, klavye/odak ve dar ekran davranışı.',
        pass: 'Önceden seçilen değer ölçütünde yarar vardır ve erişilebilirlik korunur.',
        fail: 'Hazır bileşen yeterliyse ortak UI geliştirme kapsamını daralt.',
      },
      {
        assumption: 'Bağımsız geliştirici bu paketi tercih eder.',
        action:
          'Dar sürümlü paketi bağımsız tüketiciye ver; yardım ve yeniden kullanımını kaydet.',
        measure:
          'Yardımsız kurulum, gerçek kullanım, alternatif tercih nedeni ve destek yükü.',
        pass: 'Tüketici kendi sorununu çözmek için paketi tekrar kullanır.',
        fail: 'Sadece demo beğenisi veya kurucu destekli kurulum varsa satış önerisi kurma.',
      },
    ],
    facts: {
      buyer: null,
      problem: null,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Kanıtlanan bölüm bir UI kabiliyetidir. EA platformu, bağımsız devtool satışı ve tekrar gelir önerisi mevcut kaynaklarla desteklenmiyor.',
  },
];

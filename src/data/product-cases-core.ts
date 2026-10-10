import type { ProductCase } from '../lib/product-value.ts';

const source = (
  id: string,
  title: string,
  url: string,
  claim: string,
  limitation: string,
): ProductCase['sources'][number] => ({
  id,
  title,
  url,
  accessed: '2026-10-10',
  claim,
  limitation,
});

// Olumlu facts değerleri analist hipotezidir; görüşme, kullanım veya satış kanıtı değildir.
export const coreProductCases: ProductCase[] = [
  {
    id: 'atonota',
    position: 'umbrella',
    buyer: {
      user: 'Benzer WordPress sitelerinin SEO işlerini yöneten ajans uzmanı',
      decisionMaker: 'Ajansın SEO veya operasyon yöneticisi',
      payer: 'Ajans sahibi',
      firstSegment:
        'Studio için hipotez: aynı tür sitelerde tekrar eden SEO bakımını yöneten küçük ajans',
      excluded:
        'AtonotA çatısı tek alıcıya satılan tek ürün değildir. Studio analizi, AgencyOps teslim takibi ve reklam yönetimi ayrı seçeneklerdir.',
    },
    problem: {
      workflow:
        'Site bulgularını birleştirip hangi düzeltmenin önce yapılacağını ve nedenini müşteriye açıklamak',
      trigger: 'Trafik değişimi, müşteri talebi veya dönemsel site incelemesi',
      frequency:
        'Her inceleme ve revizyonda tekrarlanabilir; gerçek sıklık ölçülmedi.',
      cost: 'Uzmanın eleme ve açıklama zamanı ile yanlış işe ayrılan emek; tutar ve kayıp gösterilmedi.',
    },
    offer: {
      outcome:
        'Tek sitede kaynak bulgu, önerilen düzeltme ve insanın kabul ettiği öncelik listesini birlikte göstermek',
      buyReason:
        'Hipotez: hazır analiz raporunu yorumlama ve revizyon emeğini, aynı işte kaynakla açıklanan daha kısa bir karar akışıyla azaltmak',
      smallestScope:
        'Studio içinde tek site, tek sorun türü, gerçek veri ve uzman karşılaştırması. Otomatik site değişikliği ve ayrı AgencyOps akışı bu dilime eklenmez.',
    },
    alternatives: [
      {
        name: 'Semrush One / Ahrefs Brand Radar',
        url: 'https://www.semrush.com/kb/1608-semrush-one',
        claim:
          'SEO ve AI görünürlüğü analizi hazır ürünlerde var; GEO etiketi tek başına farklılaşma değildir.',
        limitation:
          'Ürün sayfaları incelendi; aynı ajans dosyasındaki karar emeği ve sonuçlar karşılaştırılmadı.',
      },
      {
        name: 'ManageWP Client Report',
        url: 'https://managewp.com/features/client-report/',
        claim:
          'WordPress işleri için markalı rapor ve özel çalışma bölümü sunuyor.',
        limitation:
          'Rapor varlığı teslim kabulünün bütün ayrıntılarını göstermez; AgencyOps boşluğu olduğu da çıkarılamaz.',
      },
      {
        name: 'Search Console, kontrol listesi ve uzman raporu',
        url: 'https://support.google.com/webmasters/answer/7576553?hl=en',
        claim:
          'Arama verisini uzman kendi tablosu ve müşteri açıklamasıyla birleştirebilir.',
        limitation:
          'Bu yöntem analist karşılaştırma temelidir; gözlenmiş ajans iş akışı ve toplam maliyeti değildir.',
      },
    ],
    competition: {
      copyable:
        'AI özet, SEO puanı, rapor ekranı, anahtar kelime kümesi ve genel görev listesi',
      advantage: null,
      missingAdvantage:
        'Uzmanın kabul ettiği tekrar kullanılabilir teşhis örnekleri, daha iyi karar sonucu ve düzenli ajans kullanımı gösterilmedi.',
      counterargument:
        'Ajans zaten aldığı analiz aracını kullanıp rapor şablonunu iyileştirerek aynı işi daha az geçiş maliyetiyle yapabilir.',
    },
    distribution: {
      channel:
        'WordPress uygulayıcıları ve izinli SEO uzman topluluklarında belirli site sorunu üzerinden tanıtım',
      access: 'unknown',
      firstOffer:
        'Aynı site sorununu mevcut raporla ve Studio karar akışıyla yan yana inceleme',
      steps: [
        'Tek sorun için kaynaklı örnek çıktı hazırla.',
        'İlgili işi yapan uzmana mevcut yöntemle karşılaştırma daveti ilet.',
        'Uzmanın tercih ettiği çıktıyı ve geçiş itirazını kaydet.',
      ],
      cost: 'Örnek hazırlama, uzman görüşme ve veri erişimi emeği var; hazır müşteri veya ortak erişimi gösterilmedi.',
    },
    economics: {
      unit: 'Studio için site veya ajans çalışma alanı; ücret birimi seçilmedi.',
      recurrence:
        'Yeni veri ve düzeltme sonrası yeniden değerlendirme tekrar değer üretebilir; abonelik isteği bilinmiyor.',
      costs: [
        'Veri sağlayıcı ve tarama',
        'Model kullanımı ve uzman incelemesi',
        'Adapter bakımı ve kimlik bağlantıları',
        'Ajansa özgü rapor ve destek',
      ],
      risk: 'Her rapor uzman hizmetine dönüşürse yazılım geliri hizmet emeğini karşılamayabilir.',
    },
    portfolio: {
      consumer: 'Studio; ayrı sınanırsa AgencyOps',
      contribution:
        'Gerçek adapter, çalışma alanı yetkisi ve kaynak izi somut analiz akışında sınanabilir.',
      opportunityCost:
        'Çatıdaki bütün uygulamaları birlikte geliştirmek, tek bir alıcının satın alma nedenini sınamayı geciktirir.',
    },
    evidenceIds: [
      'personal-cont-45cc4166f9b0c2a7',
      'personal-cont-d51a189e7283f8e6',
      'personal-cont-0ce36a8cabc991d6',
      'personal-cont-0842293fab3d8cf2',
      'personal-cont-64ec32bdc9df06a6',
    ],
    sources: [
      source(
        'PV-AT-01',
        'Semrush One resmî açıklaması',
        'https://www.semrush.com/kb/1608-semrush-one',
        'SEO ve AI görünürlüğü araçları birlikte sunuluyor.',
        'Satıcı özellik açıklaması; müşteri sonucu veya Studio karşılaştırması değildir.',
      ),
      source(
        'PV-AT-02',
        'Ahrefs Brand Radar',
        'https://ahrefs.com/brand-radar',
        'AI görünürlüğü, atıflar ve özel sorgular hazır ürün kapsamındadır.',
        'Aynı site ve sorgularla ürün denenmedi.',
      ),
      source(
        'PV-AT-03',
        'ManageWP Client Report',
        'https://managewp.com/features/client-report/',
        'Özelleştirilebilir WordPress müşteri raporu ve çalışma bölümü bulunuyor.',
        'Teslim kabulü ihtiyacının karşılanmadığını kanıtlamaz.',
      ),
      source(
        'PV-AT-04',
        'Search Console performans raporu',
        'https://support.google.com/webmasters/answer/7576553?hl=en',
        'Sorgu ve sayfa düzeyinde tıklama, gösterim ve konum verisi incelenebilir.',
        'Veri raporu hangi düzeltmenin en değerli olduğunu kendi başına kanıtlamaz.',
      ),
    ],
    experiments: [
      {
        assumption: 'Studio, uzmanın rapor eleme işini azaltabilir.',
        action:
          'Aynı site sorunu için mevcut araç çıktısı ile Studio önerisini uzmana karşılaştır.',
        measure:
          'Karara kadar geçen emek, elenen yanlış öneriler ve tercih gerekçesi',
        pass: 'Uzman aynı kalitedeki kararı daha az emekle kurar ve farkın hangi adımdan geldiğini açıklar.',
        fail: 'Kazanç yalnız rapor görünümündedir veya inceleme emeği artar.',
      },
      {
        assumption: 'Kaynak izi tekrar eden revizyonu azaltabilir.',
        action:
          'Bir öneriyi veri kaynağı, gerekçe ve kabul kaydıyla düzeltme sonrasına kadar izle.',
        measure:
          'Tekrar sorulan açıklamalar, eksik kaynaklar ve kabul edilebilir çıktı',
        pass: 'Kaynak zinciri gerçek bir anlaşmazlığı veya tekrar işi çözmeye yardım eder.',
        fail: 'Kullanıcı mevcut rapor notuyla aynı sonucu daha kolay alır.',
      },
      {
        assumption: 'Aynı dar akış birden fazla siteye taşınabilir.',
        action:
          'İkinci sitede aynı sorun türünü yeni özel kod yazmadan işle; adapter ve destek emeğini kaydet.',
        measure: 'Yeniden kullanılan kurallar ve site başına özel emek',
        pass: 'Kurallar tekrar kullanılır, uyarlama emeği gözlenebilir biçimde azalır.',
        fail: 'Her site ayrı danışmanlık ve adapter projesi gerektirir.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: true,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'AtonotA çatısını tek ticari kazanan sayma. Studio için genel AI raporu yerine uzman karar emeğini azaltan dar akışı sına; AgencyOps teslim takibini ayrı alıcı ve alternatiflerle değerlendir.',
  },
  {
    id: 'titanlar',
    position: 'feature',
    buyer: {
      user: 'Ürün fiyatını ve indirimini kendisi belirleyen küçük pazaryeri satıcısı',
      decisionMaker: 'Mağaza sahibi',
      payer: 'Mağaza sahibi; ayrı hesaplayıcıya ödeme isteği bilinmiyor.',
      firstSegment:
        'Hipotez: maliyet, kargo ve komisyon değiştikçe aynı ürünün katkısını tekrar hesaplayan satıcı',
      excluded:
        'Eğitim ve atölye geliri bu yazılım özelliğinin talep kanıtı değildir.',
    },
    problem: {
      workflow:
        'Alış, işçilik, ambalaj, kargo ve komisyonu birlikte kullanıp fiyat kararını kontrol etmek',
      trigger: 'Maliyet, komisyon, kargo veya indirim değişikliği',
      frequency: 'Fiyat kararı oldukça; gerçek tekrar sayısı bilinmiyor.',
      cost: 'Eksik maliyet veya yanlış formül katkıyı azaltabilir; gerçekleşmiş zarar ölçülmedi.',
    },
    offer: {
      outcome:
        'Girdileri, formülü ve sınırları açıklanan güvenilir ürün katkısı hesabı',
      buyReason: null,
      smallestScope:
        'Tek fiyat senaryosunun arayüzden ayrılmış hesap motoru, bağımsız örnekler ve geçersiz girdi davranışı. Genel eğitim platformuna genişletme.',
    },
    alternatives: [
      {
        name: 'Shopify kâr marjı hesaplayıcısı',
        url: 'https://www.shopify.com/tools/profit-margin-calculator',
        claim: 'Temel maliyet, fiyat ve marj hesabı hazır bir araçta var.',
        limitation:
          'Türkiye pazaryeri ücretleri veya bütün vergi kuralları için doğrulanmış eşdeğer değildir.',
      },
      {
        name: 'Satıcının Excel / Sheets maliyet tablosu',
        url: null,
        claim:
          'Aynı girdiler satıcının bildiği formüllerle ve kendi ücret tablosuyla hesaplanabilir.',
        limitation:
          'Gerçek satıcının tablosu incelenmedi; mevcut yöntemin hatalı veya pahalı olduğu varsayılmaz.',
      },
    ],
    competition: {
      copyable:
        'Fiyat, marj, komisyon alanları, sonuç kartı ve paylaşılabilir hesap bağlantısı',
      advantage: null,
      missingAdvantage:
        'Uzman kabulü görmüş örnek seti, güncel ücret bakımı ve kullanıcıların bırakamadığı tekrar akışı yok.',
      counterargument:
        'Satıcı kendi tablosunu kullanabilir; düzgün bir hesap sonucu tek başına ayrı aboneliğe gerekçe olmayabilir.',
    },
    distribution: {
      channel:
        'Pazaryeri uygulayıcısı veya izinli satıcı topluluğunda açıklamalı ürün maliyeti örneği',
      access: 'unknown',
      firstOffer:
        'Satıcının kendi tablosuyla aynı ürünün maliyetini yan yana kontrol etme',
      steps: [
        'Formülü ve kapsam dışı maliyetleri açık örnekle göster.',
        'Aynı fiyat kararını kendi tablosuyla karşılaştırmasını iste.',
        'Tekrar açma nedenini ve ayrı ödeme itirazını kaydet.',
      ],
      cost: 'Örnek hazırlama ve destek emeği var; mevcut satıcı kitlesi veya dağıtım ortağı gösterilmedi.',
    },
    economics: {
      unit: 'Fiyat kararı veya tüketici ürün içindeki mağaza',
      recurrence:
        'Maliyet değişikliği tekrar kullanım yaratabilir; tek hesap için düzenli ücret gerekçesi gösterilmedi.',
      costs: [
        'Formül ve ücret doğrulama',
        'Girdi açıklamaları ve kullanıcı desteği',
        'Pazaryeri ücret değişikliklerinin bakımı',
      ],
      risk: 'Düşük ödeme isteğine rağmen yanlış sonuç ve güncel ücret desteği sürekli emek isteyebilir.',
    },
    portfolio: {
      consumer: 'Satıcı aracı veya ayrı değerlendirilecek eğitim ürünü',
      contribution:
        'Sınanmış hesap motoru faydalı bir ürün içi kabiliyet olabilir; PIM fiyatlandırmasıyla aynı sorumluluk sayılmaz.',
      opportunityCost:
        'Hesaplayıcıyı genel SaaS olarak büyütmek, gerçek tekrar işini ve diğer ürünleri sınamayı geciktirir.',
    },
    evidenceIds: ['pt03', 'personal-cont-75c05faf5a465300'],
    sources: [
      source(
        'PV-TI-01',
        'Shopify kâr marjı hesaplayıcısı',
        'https://www.shopify.com/tools/profit-margin-calculator',
        'Maliyet ve satış fiyatıyla marj hesabı yapılabilen hazır bir araç sunuluyor.',
        'Yerel komisyon, vergi ve Titanlar formüllerinin doğruluğunu kanıtlamaz.',
      ),
    ],
    experiments: [
      {
        assumption: 'Hesap motoru fiyat kararına güvenilir temel olabilir.',
        action:
          'Normal, sıfır, geçersiz yüzde ve ulaşılmaz hedef girdilerini bağımsız hesap örnekleriyle karşılaştır.',
        measure: 'Beklenen sonuç, hata bildirimi ve sonlanma davranışı',
        pass: 'Her açıklanmış kapsamda örnekler tutar; geçersiz hedef sessiz yanlış sonuç üretmez.',
        fail: 'İşaret, yüzde, sıra veya sonlanma hatası sürer.',
      },
      {
        assumption: 'Mevcut tabloya göre pratik bir yarar vardır.',
        action:
          'Aynı satıcının aynı ürün fiyatını kendi tablosu ve hesaplayıcıyla değerlendirmesini gözle.',
        measure: 'Hazırlama emeği, atlanan maliyet ve seçilen yöntem',
        pass: 'Kullanıcı belirli bir tekrar işinde hesaplayıcıyı tercih eder ve nedenini gösterir.',
        fail: 'Kendi tablosu eşit veya daha kullanışlıdır.',
      },
      {
        assumption: 'Bakım yükü faydayı aşmaz.',
        action:
          'Bir ücret değişikliğini kaynak, sürüm, örnek ve kullanıcı açıklamasına kadar güncelle.',
        measure: 'Değişiklik ve destek emeği; hangi bilgiyi kimin güncellediği',
        pass: 'Sorumluluk ve bakım emeği tüketici ürünün sağlayacağı faydayla karşılanabilir.',
        fail: 'Her satıcı için ayrı hesap danışmanlığı gerekir.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'Önce hesap doğruluğunu geliştir; bunu bağımsız ticari üstünlük sayma. Tekrarlı satıcı işi gösterilene kadar hesaplayıcıyı bir ürünün özelliği olarak değerlendir.',
  },
  {
    id: 'hrms',
    position: 'product',
    buyer: {
      user: 'Dönem kapanışında puantaj ve izin farklarını düzelten İK operatörü',
      decisionMaker: 'İK yöneticisi veya işletme sahibi',
      payer: 'İşveren işletme',
      firstSegment:
        'Hipotez: aynı sektörün tekrar eden dönem düzeltme ve mali müşavire aktarım işi; sektör henüz seçilmedi.',
      excluded:
        'Bütün bordro, ATS ve performans modüllerini aynı ilk ürün sayma; kişisel gereksinim belgesi çalışan modül kanıtı değildir.',
    },
    problem: {
      workflow:
        'Puantaj, izin ve sonradan gelen düzeltmeyi dönem kapanışında uzlaştırmak',
      trigger: 'Kapanış öncesi uyuşmazlık veya kapanmış döneme gelen düzeltme',
      frequency:
        'Dönem kapanışı tekrar eder; seçili sektörün hata ve düzeltme sıklığı ölçülmedi.',
      cost: 'Veriyi tekrar birleştirme, düzeltme ve kabul açıklaması emeği; parasal kayıp bilinmiyor.',
    },
    offer: {
      outcome:
        'Tek dönemde kaynak, fark, onay ve muhasebeye aktarılacak sürümü birlikte açıklamak',
      buyReason:
        'Hipotez: belirli bir sektör istisnasında hazır sistemin yapılandırılması veya elle uzlaştırmadan daha az tekrar iş üretmek',
      smallestScope:
        'Tek işyeri ve dönem, tek istisna türü, eski ve yeni kapanış farkı. Önce aynı durumun KolayIK veya Frappe HR yapılandırmasıyla çözülüp çözülmediğini karşılaştır.',
    },
    alternatives: [
      {
        name: 'KolayIK puantaj ve izin yönetimi',
        url: 'https://kolayik.com/puantaj',
        claim:
          'Puantajı birleştirme, uyuşmazlık inceleme ve muhasebeye aktarım; ayrı izin ürününde onay ve bakiye işlevleri var.',
        limitation:
          'Seçilecek sektörün istisnası ürün içinde denenmedi; eksik olduğu ileri sürülmez.',
      },
      {
        name: 'Frappe HR yapılandırması',
        url: 'https://docs.frappe.io/hr/leave-application',
        claim:
          'İzin başvuru, onay, ret ve iptal akışı hazırdır; geniş ürünün yeniden yazılması tek seçenek değildir.',
        limitation:
          'Belge Türkiye bordrosunun veya dar dönem istisnasının doğruluğunu kanıtlamaz.',
      },
      {
        name: 'Excel, e-posta onayı ve mali müşavirle uzlaştırma',
        url: null,
        claim:
          'Kapanış farkları mevcut tabloda ve sorumlu kişilerin açıklamalarıyla çözülebilir.',
        limitation:
          'Gerçek işletmenin süresi, hatası ve geçiş isteği gözlenmedi.',
      },
    ],
    competition: {
      copyable:
        'Çalışan kaydı, izin formu, onay ekranı, genel İK raporu ve AI özet',
      advantage: null,
      missingAdvantage:
        'Seçilmiş sektör kuralları, uzman kabul örnekleri ve düşük maliyetli veri geçişi gösterilmedi.',
      counterargument:
        'Hazır HRMS yapılandırması veya küçük bir eklenti aynı istisnayı bütün yeni ürünün maliyetinden daha ucuza çözebilir.',
    },
    distribution: {
      channel:
        'Mali müşavir, İK uygulayıcısı veya Frappe partneri üzerinden belirli kapanış istisnası',
      access: 'unknown',
      firstOffer:
        'Geçmiş bir dönemin düzeltmesini mevcut yöntem ve dar yazılım akışıyla karşılaştırma',
      steps: [
        'Tek sektör istisnasını ve kabul eden kişiyi seç.',
        'Kimliksiz örnek kapanışın fark raporunu hazırla.',
        'Uygulayıcıyla hazır sistem seçeneğini ve geçiş yükünü birlikte değerlendir.',
      ],
      cost: 'Alan uzmanı, örnek veri hazırlama ve kurulum emeği var; mevcut işveren erişimi kanıtlanmadı.',
    },
    economics: {
      unit: 'İşyeri veya çalışan; ücret birimi seçilmedi.',
      recurrence:
        'Dönemsel kapanış tekrar iş yaratır; bunun yeni ürüne sürekli ödeme olacağı bilinmiyor.',
      costs: [
        'Başlangıç bakiye ve veri aktarımı',
        'Rol ve onay yapılandırması',
        'Dönem kapanışı desteği',
        'Alan kuralı ve entegrasyon bakımı',
      ],
      risk: 'Özelleştirme ve kritik kapanış desteği çalışan başına geliri aşabilir.',
    },
    portfolio: {
      consumer: 'Kişisel HRMS; gerekirse hazır HRMS üzerinde dar eklenti',
      contribution:
        'Dönem, düzeltme, yetki ve denetim izi kuralları gerçek işte sınanabilir.',
      opportunityCost:
        'Geniş modül listesini baştan yapmak, sektöre özgü satın alma nedenini öğrenmeden büyük bakım yükü oluşturur.',
    },
    evidenceIds: ['ph01'],
    sources: [
      source(
        'PV-HR-01',
        'KolayIK puantaj',
        'https://kolayik.com/puantaj',
        'Puantaj toplama, uyuşmazlık inceleme ve muhasebe aktarımı sunuluyor.',
        'Satıcı açıklaması; seçili istisna ve gerçek kapanış denenmedi.',
      ),
      source(
        'PV-HR-02',
        'KolayIK izin ve fazla mesai',
        'https://kolayik.com/izin-fazla-mesai-yonetimi',
        'İzin bakiyesi, çok aşamalı onay, fazla mesai ve raporlama hazır kapsamdır.',
        'Hazır kapsamın bütün işletmelere yeterli olduğu çıkarılamaz.',
      ),
      source(
        'PV-HR-03',
        'Frappe HR izin başvurusu',
        'https://docs.frappe.io/hr/leave-application',
        'Başvuru, onay, ret, iptal ve bildirim akışı belgelenmiştir.',
        'Türkiye bordrosu ve sektör istisnası için kabul kanıtı değildir.',
      ),
    ],
    experiments: [
      {
        assumption: 'Seçilen istisna yeni geliştirmeye değer.',
        action:
          'Aynı dönem düzeltmesini hazır HRMS yapılandırması, küçük eklenti ve yeni akış seçenekleriyle çözümle.',
        measure: 'Karşılanmayan adım, yapılandırma emeği ve bakım sorumluluğu',
        pass: 'Dar geliştirme somut bir eksik işi daha az toplam yükle kapatabilir.',
        fail: 'Hazır yapılandırma işi karşılar; yeni çekirdeği yazmak ek değer üretmez.',
      },
      {
        assumption: 'Fark izi kapanış tekrarını azaltabilir.',
        action:
          'Kimliksiz geçmiş kapanışta düzeltme öncesi ve sonrasını bağımsız İK kabulüyle karşılaştır.',
        measure: 'Eksik farklar, yeniden giriş ve kabul açıklaması emeği',
        pass: 'Uzman bütün farkları izleyebilir ve tekrar iş azalır.',
        fail: 'Hata veya açıklama yükü mevcut tabloya göre artar.',
      },
      {
        assumption: 'Kurulum ve dönem desteği sürdürülebilir.',
        action:
          'Örnek bakiyeleri taşı, rol ve onayları kur; kapanış desteğini ayrıca kaydet.',
        measure: 'İşyeri başına kurulum, düzeltme ve sürekli destek emeği',
        pass: 'Tekrar kullanılabilen kurulum ve sorumluluğu belirli destek modeli oluşur.',
        fail: 'Her işyeri ayrı bordro danışmanlığı projesine döner.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'İzin formunu bitirmek mühendislik adımıdır; satın alma nedeni değildir. Önce tek sektörün kapanış istisnasını hazır HRMS karşısında daralt; yeni geniş HRMS yatırımını bu farkla gerekçelendir.',
  },
  {
    id: 'pim',
    position: 'product',
    buyer: {
      user: 'Tedarikçi dosyalarını satış kanalına hazırlayan katalog operatörü',
      decisionMaker: 'E-ticaret veya ürün operasyon yöneticisi',
      payer: 'Üretici veya distribütör işletme',
      firstSegment:
        'Hipotez: aynı tedarikçiden tekrar dosya alıp aynı kanala güncelleme yapan küçük katalog ekibi',
      excluded:
        'ERP stok ve finansı, fiyatlandırma ve DAM ayrı sorumluluklardır; ürün alanlarının varlığı yayın akışının çalıştığını göstermez.',
    },
    problem: {
      workflow:
        'Değişen tedarikçi dosyasını tekrar eşleyip varyantları bozmadan kanal güncellemesine dönüştürmek',
      trigger: 'İkinci dosya, değişen ürün alanı veya kanalın reddettiği kayıt',
      frequency: 'Dosya güncellendikçe; gerçek sıklık ve hacim ölçülmedi.',
      cost: 'Tekrar eşleme, ret nedenini bulma ve yanlış güncellemeyi düzeltme emeği; tutar bilinmiyor.',
    },
    offer: {
      outcome:
        'İkinci güncellemede eşlemeyi yeniden kullanmak, fark ve ret nedenini göstermek, onaylanan kanal çıktısını üretmek',
      buyReason:
        'Hipotez: aynı dosyanın ikinci güncellemesinde tablo ve yerleşik içe aktarıcıdan daha az elle düzeltme ve daha izlenebilir sonuç sağlamak',
      smallestScope:
        'Tek tedarikçi biçimi, tek kanal, ilk ve ikinci güncelleme. Ürün sayısına keyfî sınır koymak yerine gerçek varyant ve değişiklik örneklerini kapsa.',
    },
    alternatives: [
      {
        name: 'WooCommerce CSV içe aktarıcı / dışa aktarıcı',
        url: 'https://woocommerce.com/document/product-csv-importer-exporter/',
        claim:
          'Yerleşik araç toplu ürün güncelleme, sütun eşleme ve varyant aktarımı sunuyor.',
        limitation:
          'Tedarikçi dosyasının ön temizliği gerekebilir; aynı ikinci güncelleme karşılaştırılmadı.',
      },
      {
        name: 'Akeneo PIM',
        url: 'https://www.akeneo.com/akeneo-pim/',
        claim:
          'Merkezi ürün bilgisi, kalite ve zenginleştirme iş akışları hazır PIM kapsamıdır.',
        limitation:
          'Dar ekibin kurulum yükü ve toplam maliyeti ölçülmedi; büyük ürün olması yetersiz olduğu anlamına gelmez.',
      },
      {
        name: 'Excel / Sheets ve kanalın içe aktarıcısı',
        url: null,
        claim:
          'Eşleme, temizlik ve değişen satırlar mevcut tabloda hazırlanabilir.',
        limitation: 'Gerçek operatörün hata ve emeği gözlenmedi.',
      },
    ],
    competition: {
      copyable: 'CSV yükleme, ürün tablosu, AI açıklama ve basit dışa aktarma',
      advantage: null,
      missingAdvantage:
        'Tekrar kullanımda doğrulanmış kanal kuralları, kararlı ürün kimliği ve düşük destek maliyeti henüz gösterilmedi.',
      counterargument:
        'Kanalın hazır eşlemesi veya Akeneo yapılandırması yeterliyse yeni PIM için geçiş ve veri taşıma gereksizdir.',
    },
    distribution: {
      channel:
        'WooCommerce uygulayıcısı ve katalog taşıma işi yapan e-ticaret ajansı',
      access: 'unknown',
      firstOffer:
        'Aynı dosyanın ilk ve ikinci güncellemesini, mevcut yöntemle karşılaştıran fark ve ret raporu',
      steps: [
        'Gerçekçi tedarikçi biçimi ve kanal şemasına ait örnek hazırla.',
        'Katalog güncelleyen uygulayıcıya ikinci güncelleme karşılaştırmasını göster.',
        'Tekrar iş, destek talebi ve tercih edilen yöntemi kaydet.',
      ],
      cost: 'Örnek dosya ve kanal kuralı hazırlama emeği var; ajans ortaklığı veya dosya erişimi elde olduğu gösterilmedi.',
    },
    economics: {
      unit: 'Katalog, kanal veya işletme; ücret birimi seçilmedi.',
      recurrence:
        'Yeni dosya ve kanal şeması değiştikçe tekrar değer doğabilir; sürekli ödeme bilinmiyor.',
      costs: [
        'Başlangıç dosya temizliği ve eşleme',
        'Kanal şeması bakımı',
        'Hata açıklaması ve destek',
        'Saklama ve işlem altyapısı',
      ],
      risk: 'Her tedarikçi için elle temizleme gerekir ve ilk kurulum bedelsiz sayılırsa yazılım birim ekonomisi bozulabilir.',
    },
    portfolio: {
      consumer: 'PIM katalog ürünü',
      contribution:
        'Sürüm, doğrulama, kimlik ve kontrollü çıktı yeteneklerini gerçek ürün sonucunda sınar.',
      opportunityCost:
        'Çok kanal ve genel platformu önce kurmak, dar ikinci güncellemenin işe yarayıp yaramadığını öğrenmeyi geciktirir.',
    },
    evidenceIds: [
      'personal-cont-15ecf3add98aa743',
      'personal-cont-96d582c806d2eb87',
      'personal-cont-c3c2d506536ac22d',
    ],
    sources: [
      source(
        'PV-PI-01',
        'WooCommerce ürün CSV belgeleri',
        'https://woocommerce.com/document/product-csv-importer-exporter/',
        'Yerleşik CSV aracı ürünleri toplu günceller, sütun eşler ve varyantları aktarabilir.',
        'İkinci tedarikçi güncellemesiyle karşılaştırmalı çalışma yapılmadı.',
      ),
      source(
        'PV-PI-02',
        'Akeneo PIM',
        'https://www.akeneo.com/akeneo-pim/',
        'Ürün bilgisinin merkezileştirilmesi, kalite ve zenginleştirme hazır ürün kapsamıdır.',
        'Dar müşteri için kurulum ve toplam kullanım maliyeti belirlenmedi.',
      ),
    ],
    experiments: [
      {
        assumption: 'Asıl kazanç ikinci güncellemededir.',
        action:
          'Aynı dosyanın iki sürümünü mevcut tablo ve içe aktarıcı ile dar PIM akışında işle.',
        measure:
          'İkinci sürümde yeniden eşleme, elle düzeltme ve yanlış güncelleme',
        pass: 'Doğruluk korunurken ikinci sürümde tekrar iş azalır; hangi kuralın kullanıldığı görülebilir.',
        fail: 'Kazanç yalnız ilk içe aktarma demosundadır veya mevcut eşleme aynı işi yapar.',
      },
      {
        assumption: 'Fark ve ret açıklaması operatörün işini bitirir.',
        action:
          'Varyant kimliği, eksik alan ve değişen değer örneklerini operatöre düzeltip yeniden üretmesini sağla.',
        measure: 'Destek istemeden çözülen ret ve kanalın kabul ettiği çıktı',
        pass: 'Operatör kaynağa kadar izleyip doğru çıktıyı üretebilir.',
        fail: 'Hatalar geliştirici müdahalesi olmadan çözülemez.',
      },
      {
        assumption: 'Kurallar yeni dosyada yeniden kullanılabilir.',
        action:
          'Aynı kanala ikinci tedarikçi biçimini bağla; temizlik ve destek emeğini ayrı kaydet.',
        measure:
          'Ortak kural oranı değil, tekrar kullanılan adımlar ve özel müdahale emeği',
        pass: 'Yeni dosyanın kurulumu tekrar kullanılabilir sözleşmelerle sınırlanır.',
        fail: 'Her dosya ayrı dönüştürme projesi olur.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: true,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'Dar ikinci güncelleme, mevcut alternatifle açıkça karşılaştırılabilen güçlü bir ürün hipotezidir. Bu yüzden önce yanlışlanmaya değer; gerçekleşmiş talep veya ticari kazanan değildir.',
  },
  {
    id: 'ibys',
    position: 'product',
    buyer: {
      user: 'OSGB operasyon planlayıcısı ve sahadaki profesyonel',
      decisionMaker: 'OSGB operasyon yöneticisi veya sahibi',
      payer: 'OSGB işletmesi',
      firstSegment:
        'Hipotez: profesyonel yokluğu ve ziyaret değişikliğinde tekrar plan yapan küçük OSGB',
      excluded:
        'Resmî gönderim gatewayi ve sağlık verisi yönetimi ayrı kapsamdır; operasyon planı bunların yetkili çalıştığını göstermez.',
    },
    problem: {
      workflow:
        'Değişen kapasitede işyeri ziyaretlerini yeniden atayıp çakışmayı ve açık işi görmek',
      trigger:
        'Profesyonelin yokluğu, ertelenen ziyaret veya değişen işyeri ihtiyacı',
      frequency: 'Plan değiştikçe; gerçek değişiklik sıklığı ölçülmedi.',
      cost: 'Telefon, tekrar planlama ve yanlış atama düzeltmesi emeği; gerçekleşmiş kayıp bilinmiyor.',
    },
    offer: {
      outcome:
        'Tek kapasite değişikliğinde uygulanabilir yeni planı, reddedilen seçenekleri ve gerekçeyi göstermek',
      buyReason:
        'Hipotez: hazır takvimde elle tekrar atamaya göre değişiklik sonrası geçerli planı daha az emekle kurmak',
      smallestScope:
        'Tek plan değişikliği, gerçek hayattan seçilmiş kapasite ve zaman kısıtları, insanın kabul ettiği yeniden atama. Genel OSGB paketi ve gateway ekleme.',
    },
    alternatives: [
      {
        name: 'İSG Takibi',
        url: 'https://www.isgtakibi.com/',
        claim:
          'OSGB yıllık plan, eğitim ve ziyaret planlamasını hazır ürün olarak sunuyor.',
        limitation:
          'Seçili kapasite değişikliği denenmedi; rakipte yeniden planlama olmadığı ileri sürülmez.',
      },
      {
        name: 'İSG Asistan',
        url: 'https://www.isgasistan.tr/pricing',
        claim: 'Görev, saha ziyareti, plan ve rol kapsamlarını paketliyor.',
        limitation:
          'Satıcı kapsamı; entegrasyon yetkisi ve aynı operasyon sonucu bağımsız doğrulanmadı.',
      },
      {
        name: 'Excel, takvim ve telefonla yeniden atama',
        url: null,
        claim:
          'Planlayıcı uygunlukları mevcut listeden kontrol edip değişikliği kişilerle teyit edebilir.',
        limitation: 'Gerçek planlayıcının süresi ve hata oranı gözlenmedi.',
      },
    ],
    competition: {
      copyable:
        'İşyeri ve personel listesi, ziyaret takvimi, bildirim ve genel AI plan önerisi',
      advantage: null,
      missingAdvantage:
        'Uzman kabulü görmüş kısıt seti, gerçek değişiklik örnekleri ve düşük kurulum yükü gösterilmedi.',
      counterargument:
        'Mevcut OSGB ürünü küçük bir ayarla aynı planı kurarsa yeni sistemin veri aktarımı ve eğitim maliyeti gereksizdir.',
    },
    distribution: {
      channel:
        'OSGB uygulayıcısı veya meslek ağı üzerinden somut plan değişikliği örneği',
      access: 'unknown',
      firstOffer:
        'Bir profesyonel yokluğunda mevcut yöntem ile açıklanabilir yeniden planı karşılaştırma',
      steps: [
        'Kimliksiz işyeri ve kapasite örneğini hazırla.',
        'Planlayan kişiye kendi yöntemini ve önerilen planı karşılaştırma daveti ilet.',
        'Hangi kısıtın karar değiştirdiğini ve geçiş yükünü kaydet.',
      ],
      cost: 'Alan uzmanı, veri eşleme ve planı teyit etme emeği var; OSGB erişimi elde olduğu gösterilmedi.',
    },
    economics: {
      unit: 'OSGB veya portföy; ücret birimi seçilmedi.',
      recurrence:
        'Kapasite ve ziyaret değiştikçe tekrar plan gerekir; ücretli tekrar talebi bilinmiyor.',
      costs: [
        'Portföy ve takvim aktarımı',
        'Kısıt yapılandırması ve uzman kontrolü',
        'Planlama hatası desteği',
        'Entegrasyon bakımı',
      ],
      risk: 'Her OSGB için ayrı kurallar ve kritik saha desteği gerekirse paket geliri hizmet yükünü karşılamayabilir.',
    },
    portfolio: {
      consumer: 'İBYS operasyon planı',
      contribution:
        'Kural, rol, gerekçe ve plan sürümü somut operasyon sonucunda sınanabilir.',
      opportunityCost:
        'Plan ihtiyacını göstermeden resmî gateway ve bütün OSGB modüllerine yayılmak ilk değeri geciktirir.',
    },
    evidenceIds: ['pi01', 'personal-cont-18c5fa0486a0353f'],
    sources: [
      source(
        'PV-IB-01',
        'İSG Takibi',
        'https://www.isgtakibi.com/',
        'OSGB operasyonu için yıllık plan, eğitim ve ziyaret planı sunuluyor.',
        'Kapasite değişikliğinde aynı iş denenmedi; yetkili resmî entegrasyon kanıtı değildir.',
      ),
      source(
        'PV-IB-02',
        'İSG Asistan paket kapsamları',
        'https://www.isgasistan.tr/pricing',
        'Görev, saha ziyareti, plan ve rol kapsamları listeleniyor.',
        'Liste kapsamı müşteri sonucu veya entegrasyon kabulü değildir.',
      ),
    ],
    experiments: [
      {
        assumption: 'Kapasite değişikliği mevcut üründe maliyetli bir iştir.',
        action:
          'Aynı yokluk ve ziyaret ertelemesini mevcut OSGB ürünü, takvim ve dar akışta karşılaştır.',
        measure: 'Yeniden plan emeği, teyit adımları ve kalan açık işler',
        pass: 'Dar akış aynı kısıtlarla geçerli planı daha az tekrar işle kurar.',
        fail: 'Hazır ürün veya takvim aynı sonucu daha kolay verir.',
      },
      {
        assumption: 'Kural gerekçeleri profesyonelce kabul edilebilir.',
        action:
          'Atanabilir ve atanamaz örnekleri planlayıcıya kontrol ettir; reddedilen seçeneğin gerekçesini göster.',
        measure: 'Yanlış atama, eksik kısıt ve açıklanamayan karar',
        pass: 'Uzman seçili kapsamda bütün kararları açıklayıp kabul edebilir.',
        fail: 'İnsan görünmeyen kurallarla planı sürekli baştan yapar.',
      },
      {
        assumption: 'Yeni portföyü bağlamak tekrar kullanılabilir.',
        action:
          'İkinci örnek portföyü aynı veri ve kural sözleşmesiyle kur; destek emeğini kaydet.',
        measure: 'Özel kod, veri temizliği ve plan sonrası destek',
        pass: 'Yeni kurulumun yükü görünür ve sınırlı kalır.',
        fail: 'Her OSGB ayrı entegrasyon ve danışmanlık projesine dönüşür.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: true,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'Takvim yapmak satın alma nedeni değildir. Değişen kapasitede açıklanabilir yeniden planlama dar ve anlamlı hipotezdir; hazır OSGB ürününde aynı durumu karşılaştırmadan üstünlük ilan etme.',
  },
  {
    id: 'woocommnts',
    position: 'feature',
    buyer: {
      user: 'WooCommerce mağazasının yorum alanını yöneten kişi',
      decisionMaker: 'Mağaza sahibi veya WordPress ajansı',
      payer: 'Mağaza veya bakım hizmeti veren ajans',
      firstSegment:
        'Hipotez: seçilmiş müşteri yorumlarını ürün dışındaki sayfalarda kullanan WooCommerce mağazası',
      excluded:
        'Yorum repository taslağı çalışan slider veya dönüşüm artışı kanıtı değildir.',
    },
    problem: {
      workflow:
        'Gerçek yorumları seçip doğru ürüne ve gösterim alanına bağlamak',
      trigger: 'Yeni yorum, moderasyon veya yorumun silinmesi',
      frequency: 'Yorum ve sayfa değiştikçe; gerçek sıklık bilinmiyor.',
      cost: 'Elle seçim ve bozuk gösterimi düzeltme emeği; satış etkisi ölçülmedi.',
    },
    offer: {
      outcome:
        'Kaynağı belli yorumları seçili sliderda doğru göstermek ve moderasyon sonrası tutarlı kaldırmak',
      buyReason: null,
      smallestScope:
        'Tek yorum kaynağı, tek slider, kayıt ve silme hatasının doğru bildirimi; ön yüzde gerçek çıktı. Yorum toplama platformu ekleme.',
    },
    alternatives: [
      {
        name: 'CusRev: Customer Reviews for WooCommerce',
        url: 'https://wordpress.org/plugins/customer-reviews-woocommerce/',
        claim:
          'Yorum toplama, doğrulama seçeneği, içe aktarma ve liste, grid, slider gösterimi hazır kapsamdır.',
        limitation:
          'Satıcı açıklaması; seçili tema ve moderasyon senaryosu denenmedi.',
      },
      {
        name: 'WooCommerce yorumları ve elle seçilmiş sayfa içeriği',
        url: null,
        claim:
          'Mevcut yorum alanı korunup uygun yorumlar sayfa düzenine elle eklenebilir.',
        limitation: 'Elle bakım yükü ve gerçek mağaza yöntemi ölçülmedi.',
      },
    ],
    competition: {
      copyable: 'Slider, yıldız puanı, yorum kartı ve basit filtre',
      advantage: null,
      missingAdvantage:
        'Hazır eklentiye göre vazgeçilmez mağaza işi ve düşük tema desteği gösterilmedi.',
      counterargument:
        'CusRev zaten slider ve yorum işlevleri sunuyor; yalnız aynı ekranı yeniden yapmak ayrı ödeme nedeni üretmez.',
    },
    distribution: {
      channel:
        'WooCommerce bakım ajansına belirli tema ve yorum güncelleme örneği',
      access: 'unknown',
      firstOffer:
        'Hazır eklentiyle aynı yorum seçimi ve silme senaryosunu karşılaştırma',
      steps: [
        'Yorumun seçilme ve kaldırılma örneğini hazırla.',
        'Ajansın kullandığı eklentiyle aynı çıktıyı kur.',
        'Özel ihtiyacı ve destek emeğini kaydet.',
      ],
      cost: 'Tema uyarlama ve destek emeği var; mevcut ajans erişimi gösterilmedi.',
    },
    economics: {
      unit: 'Mağaza veya ajans bakım paketi içindeki özellik',
      recurrence:
        'Uyumluluk ve yorum değişiklikleri bakım doğurur; ayrı abonelik talebi bilinmiyor.',
      costs: [
        'WordPress ve WooCommerce uyumluluğu',
        'Tema, önbellek ve gösterim desteği',
        'Moderasyon ve veri işlemi doğrulama',
      ],
      risk: 'Hazır eklentiyle rekabet eden küçük özellik, mağazaya özel destek maliyetini taşıyamayabilir.',
    },
    portfolio: {
      consumer: 'WooCommerce mağaza çözümü veya WordPress ajans paketi',
      contribution:
        'Yorum kaynağı, moderasyon ve güvenilir gösterim kabiliyeti sağlar.',
      opportunityCost:
        'Genel yorum platformuna genişlemek, henüz çalışan gösterim hattını ve farklı ihtiyacı doğrulamayı geciktirir.',
    },
    evidenceIds: ['CONT-REM-SRC-002'],
    sources: [
      source(
        'PV-WC-01',
        'CusRev resmî WordPress eklenti kaydı',
        'https://wordpress.org/plugins/customer-reviews-woocommerce/',
        'Liste, grid ve slider kısa kodları; yorum toplama ve içe aktarma özellikleri belgeleniyor.',
        'Eklenti açıklamasıdır; mağazanın dönüşüm etkisi ve seçili tema kabulü değildir.',
      ),
    ],
    experiments: [
      {
        assumption: 'Gösterim hattı güvenilir olabilir.',
        action:
          'Gerçekçi yorumu kaydet, slidera bağla, göster, moderasyona al ve sil; hatalı veri işleminde sonucu kontrol et.',
        measure: 'Kaynak eşliği, yanlış gösterim ve yanlış başarı bildirimi',
        pass: 'Yorumun bütün durumları doğru yansır; hata başarı gibi görünmez.',
        fail: 'Boş sorgu, silinen yorum veya sessiz kayıt hatası sürer.',
      },
      {
        assumption: 'Hazır eklentinin ötesinde özel bir iş vardır.',
        action:
          'Aynı mağaza işini CusRev ve dar özellikte kur; sorumlu kişinin karşılanmayan adımını kaydet.',
        measure: 'Hazır çözümün gerçekten karşılamadığı adım ve tercih nedeni',
        pass: 'Belirli tekrarlı iş için ek değerin nerede olduğu gösterilir.',
        fail: 'Fark yalnız görünüm veya aynı sliderın tekrarıdır.',
      },
      {
        assumption: 'Özellik bakım paketine katkı sağlar.',
        action:
          'İkinci tema ve sürümde gösterimi kur; ajansın uyarlama ve destek emeğini kaydet.',
        measure: 'Mağaza başına özel müdahale ve tekrar kullanılabilir kurulum',
        pass: 'Bakım paketi içinde tekrar kullanılabilir düşük yük oluşur.',
        fail: 'Her tema ayrı geliştirme ister.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Sliderı bağımsız ürün diye önceliklendirme. Güvenilir yorum gösterimini tamamla; CusRev karşısında ayrı tekrar işi çıkarsa ajans paketindeki katkısıyla değerlendir.',
  },
  {
    id: 'destektesvik',
    position: 'product',
    buyer: {
      user: 'Birden fazla firmanın destek ön değerlendirmesini yapan danışman',
      decisionMaker: 'Danışmanlık bürosu sahibi',
      payer: 'Danışmanlık bürosu; doğrudan şirket alıcısı ayrı seçenektir.',
      firstSegment:
        'Hipotez: tek program kümesinde firma dosyalarını tekrar tarayan danışman bürosu',
      excluded:
        'Ön uygunluk sonucu resmî başvuru kabulü, hibe kazanımı veya hukuki hüküm değildir.',
    },
    problem: {
      workflow:
        'Firma bilgilerini güncel çağrı ve koşullarla karşılaştırıp eksik bilgiyi ve kararın dayanağını açıklamak',
      trigger:
        'Yeni çağrı, kaynak değişikliği veya firma profilinin güncellenmesi',
      frequency: 'Çağrı ve dosya değiştikçe; gerçek dosya yükü ölçülmedi.',
      cost: 'Kaynak takibi, yeniden tarama ve yanlış ön değerlendirmeyi düzeltme emeği; kayıp ölçülmedi.',
    },
    offer: {
      outcome:
        'Tek programda kaynak sürümü, geçerlilik, eksik bilgi ve insanın onayladığı ön değerlendirmeyi birlikte göstermek',
      buyReason:
        'Hipotez: çoklu dosyada hangi kararın eski kaynağa dayandığını bulma ve yeniden inceleme emeğini azaltmak',
      smallestScope:
        'Tek program kümesi, sürümlü kaynak paketi ve tekrar değerlendirilen firma örneği. Süresi geçmiş kaynak veya eksik bilgi olumlu kesin karar üretmez.',
    },
    alternatives: [
      {
        name: 'Teşvikcin',
        url: 'https://tesvikcin.com/',
        claim:
          'Firma profili eşleştirme, gerekçeli uygunluk, başvuru taslağı ve danışman çoklu firma kapsamı sunuyor.',
        limitation:
          'Satıcı iddiası; kaynak güncelliği ve ürün içi kararlar bağımsız denenmedi.',
      },
      {
        name: 'Yatırıma Destek',
        url: 'https://www.yatirimadestek.gov.tr/',
        claim:
          'Destek arama, duyuru ve uzman soru-cevap kanalları kamu alternatifidir.',
        limitation:
          'Çalışan hesaplayıcı veya belirli firmanın uygunluğu olarak değerlendirilmedi.',
      },
      {
        name: 'Resmî kaynaklar, firma tablosu ve uzman kontrolü',
        url: null,
        claim:
          'Danışman kriter, evrak ve çağrı tarihini kendi tablosunda tutup belirsiz koşulu uzmana sorabilir.',
        limitation:
          'Gerçek büro emeği ve tercihleri gözlenmedi; toplam maliyetin sıfır olduğu varsayılmaz.',
      },
    ],
    competition: {
      copyable:
        'Destek kataloğu, firma eşleştirme, AI taslağı ve genel uygunluk puanı',
      advantage: null,
      missingAdvantage:
        'Sürekli doğrulanan kaynak bakımı, uzman kabul örnekleri ve danışmanın tercih ettiği karar izi gösterilmedi.',
      counterargument:
        'Ücretsiz kamu keşfi veya mevcut ticari eşleştirme danışmanın işini yeterince karşılayabilir; kaynak sürümü tek başına ödeme gerekçesi olmayabilir.',
    },
    distribution: {
      channel:
        'Destek danışmanı veya SMMM ağına tek programın kaynak değişikliği örneği',
      access: 'unknown',
      firstOffer:
        'Aynı firmanın eski ve yeni kaynakla ön değerlendirmesini, yeniden incelenecek kararlarla gösterme',
      steps: [
        'Resmî kaynağı ve sınırlı kural setini sürümle.',
        'Danışmana kendi incelemesiyle karşılaştırabileceği örnek rapor sun.',
        'Tercih, eksik iş ve tekrar tarama emeğini kaydet.',
      ],
      cost: 'Kaynak izleme ve uzman incelemesi emeği var; büro erişimi veya alıcı tercihi gösterilmedi.',
    },
    economics: {
      unit: 'Danışman portföyü veya program dosyası; ücret birimi seçilmedi.',
      recurrence:
        'Kaynak ve firma değişiklikleri tekrar tarama yaratabilir; düzenli ödeme talebi bilinmiyor.',
      costs: [
        'Resmî kaynak izleme ve sürümleme',
        'Uzman kural kontrolü',
        'Belge ve profil işleme',
        'Hatalı ön değerlendirme desteği',
      ],
      risk: 'Kaynak ve uzman emeği her dosyada yeniden yapılırsa yazılım katkısı düşer; yanlış karar maliyeti ayrıca büyüktür.',
    },
    portfolio: {
      consumer: 'DestekTeşvik ön değerlendirme ürünü',
      contribution:
        'Sürümlü kural ve kaynak geçerliliğini gerekçeli kararda sınar.',
      opportunityCost:
        'Genel destek ekosistemini önce kurmak, tek değişiklik sonrası tekrar değerlendirme değerini öğrenmeyi geciktirir.',
    },
    evidenceIds: ['CONT-REM-SRC-003'],
    sources: [
      source(
        'PV-DT-01',
        'Teşvikcin ürün sayfası',
        'https://tesvikcin.com/',
        'Firma eşleştirme, gerekçeli uygunluk, AI taslağı ve çoklu firma danışman planı listeleniyor.',
        'Özellik ve doğruluk satıcı beyanıdır; ürün içi işlem denenmedi.',
      ),
      source(
        'PV-DT-02',
        'Yatırıma Destek',
        'https://www.yatirimadestek.gov.tr/',
        'Kamusal destek arama, duyuru ve soru-cevap bağlantıları bulunuyor.',
        'Belirli program koşullarının hukuki doğrulaması veya firma uygunluğu değildir.',
      ),
    ],
    experiments: [
      {
        assumption: 'Kaynak değişikliği tekrar taramada somut sorun yaratır.',
        action:
          'Tek programın iki kaynak sürümünde aynı firma örneklerini danışmanın yöntemi ve motorla karşılaştır.',
        measure:
          'Yeniden inceleme emeği ve değişiklikten etkilenen kararların bulunması',
        pass: 'Danışman etkilenen kararları doğru bulur ve tekrar iş azalır.',
        fail: 'Mevcut tablo veya ticari araç aynı işi daha kolay yapar.',
      },
      {
        assumption: 'Karar motoru belirsizliği doğru taşır.',
        action:
          'Süresi geçmiş kaynak, eksik bilgi, çelişen sürüm ve koşullu örnekleri uzmanla değerlendir.',
        measure: 'Yanlış kesin karar ve kaynak-kural eşliği',
        pass: 'Bütün sınırlı örnekler gerekçesiyle doğru duruma gider.',
        fail: 'Eski kaynak veya eksik veri olumlu kesin sonuç üretir.',
      },
      {
        assumption: 'Tekrar dosyalarda uzman emeği azalabilir.',
        action:
          'Aynı program kümesinde sonraki firma dosyasını işle; bakım ve destek emeğini ayrı kaydet.',
        measure: 'Tekrar kullanılan kurallar ve dosyaya özel inceleme yükü',
        pass: 'Uzman kontrolü korunurken tekrar iş azalır; ücret birimi için maliyet tabanı oluşur.',
        fail: 'Her dosya baştan uzman danışmanlığı gerektirir.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: true,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'Genel destek bulucu pazarda zaten var. Önce danışmanın kaynak değişikliği sonrası yeniden inceleme işini sına; kaynak sürümü ve eksik bilgi ayrımı anlamlı hipotezdir, eldeki rekabet üstünlüğü değildir.',
  },
  {
    id: 'lifeos',
    position: 'product',
    buyer: {
      user: 'Günün işlerini ağırlıkla tarayıcıda yürüten bağımsız bilgi çalışanı',
      decisionMaker: 'Kullanıcının kendisi',
      payer: 'Kullanıcının kendisi; ödeme isteği bilinmiyor.',
      firstSegment:
        'Hipotez: gün sonunda hangi projeye zaman ayırdığını toparlayan bireysel kullanıcı',
      excluded:
        'Yerel veri katmanı ve kısmi panel; bütün zaman, alışkanlık ve proje ekranlarının çalıştığını göstermez.',
    },
    problem: {
      workflow:
        'Gün sonunda proje zamanını ve tamamlanan işi dağınık notlardan toparlamak',
      trigger: 'Günlük iş kapanışı veya proje zamanı sorusu',
      frequency:
        'İş günü kapanışında tekrarlanabilir; gerçek kullanım bilinmiyor.',
      cost: 'Not toplama ve eksik kaydı hatırlama emeği; maliyet ölçülmedi.',
    },
    offer: {
      outcome:
        'Tek görünür günlük zaman kaydı ve kapanış özeti; doğrulanabilir yedek ve geri yükleme',
      buyReason: null,
      smallestScope:
        'Bir zaman kaydı, günlük özet ve sağlam yedek döngüsü. Çalışmayan sekmeleri ürün vaadine ekleme.',
    },
    alternatives: [
      {
        name: 'Toggl',
        url: 'https://toggl.com/',
        claim:
          'Zaman takibi, proje planı ve tarayıcı eklentisi hazır kapsamdır.',
        limitation:
          'Yerel LifeOS akışıyla aynı kullanıcı işi denenmedi; gizlilik farkı otomatik üstünlük değildir.',
      },
      {
        name: 'Notion proje ve görev düzeni',
        url: 'https://www.notion.com/product/projects',
        claim: 'Proje ve görev bilgileri mevcut çalışma alanında tutulabilir.',
        limitation:
          'Zaman takibinin bütün ayrıntılarında eşdeğer olduğu ileri sürülmez.',
      },
      {
        name: 'Takvim, basit zamanlayıcı ve günlük not',
        url: null,
        claim: 'Kullanıcı gününü mevcut araçlarla kaydedip özetleyebilir.',
        limitation: 'Gerçek kullanıcının yöntemi ve geçiş isteği gözlenmedi.',
      },
    ],
    competition: {
      copyable: 'Günlük özet, görev listesi, zamanlayıcı ve AI öneri',
      advantage: null,
      missingAdvantage:
        'Mevcut araçlardan daha iyi bir kapanış alışkanlığı, tekrar tercih ve ayrı ödeme nedeni gösterilmedi.',
      counterargument:
        'Toggl veya mevcut not düzeni yeterliyse yeni günlük kayıt aracı ek yük oluşturur.',
    },
    distribution: {
      channel:
        'Bağımsız geliştirici veya bilgi çalışanı topluluğunda günlük kapanış örneği',
      access: 'unknown',
      firstOffer:
        'Kendi günlük notu ile tek paneldeki zaman ve kapanış özetini karşılaştırma',
      steps: [
        'Bir günün kayıt ve kapanış örneğini hazırla.',
        'Aynı iş için mevcut araçla karşılaştırma daveti sun.',
        'Sonraki gün neden yeniden açıldığını ve unutulan kayıtları gözle.',
      ],
      cost: 'Kullanıcı edinme, alışkanlık takibi ve tarayıcı desteği emeği var; topluluk erişimi gösterilmedi.',
    },
    economics: {
      unit: 'Bireysel kullanıcı; ücret birimi seçilmedi.',
      recurrence:
        'Günlük kapanış tekrar eder; bu tekrarın ücretli talebe döneceği bilinmiyor.',
      costs: [
        'Tarayıcı sürümü ve depolama desteği',
        'Yedek doğrulama ve kurtarma',
        'Kullanıcı edinme ve alışkanlık desteği',
      ],
      risk: 'Bireysel ödeme isteği düşük kalırken veri kaybı ve destek sorumluluğu sürebilir.',
    },
    portfolio: {
      consumer: 'LifeOS kişisel araç',
      contribution:
        'Yerel veri, geri yükleme ve günlük iş kapanışını somutlaştırır.',
      opportunityCost:
        'Genel yaşam işletim sistemine genişlemek, tek akışın mevcut alışkanlığı değiştirebildiğini öğrenmeyi geciktirir.',
    },
    evidenceIds: ['CONT-REM-SRC-004', 'CONT-REM-SRC-005'],
    sources: [
      source(
        'PV-LO-01',
        'Toggl',
        'https://toggl.com/',
        'Zaman takibi, proje planlama ve tarayıcı dahil farklı yüzeylerde kayıt sunuluyor.',
        'Satıcı açıklamasıdır; bireysel LifeOS kullanımı veya ödeme isteği ölçülmedi.',
      ),
      source(
        'PV-LO-02',
        'Notion Projects',
        'https://www.notion.com/product/projects',
        'Proje ve görev yönetimi mevcut bir çalışma alanı seçeneğidir.',
        'Tam zaman takip eşdeğerliği veya kullanıcının mevcut düzeni kanıtlanmadı.',
      ),
    ],
    experiments: [
      {
        assumption: 'Günlük kapanışta mevcut düzenden daha faydalıdır.',
        action:
          'Aynı kişinin iş gününü mevcut not ve zaman aracıyla, sonra dar LifeOS akışıyla kapatmasını gözle.',
        measure: 'Kayıt ve toparlama emeği, eksik bilgi ve tercih',
        pass: 'Kullanıcı belirli işi daha kolay bitirir ve faydanın kaynağını gösterir.',
        fail: 'Yeni kayıt işi mevcut notlardan daha fazla yük getirir.',
      },
      {
        assumption: 'Yerel veri güvenilir biçimde taşınabilir.',
        action:
          'Geçerli, bozuk ve eksik yedeği içe aktar; başarısız işlemden sonra eski kaydı kontrol et.',
        measure: 'Veri eşliği, hata mesajı ve geri dönüş',
        pass: 'Geçerli yedek doğru döner; hatalı yedek mevcut veriyi kaybettirmez.',
        fail: 'Sonsuz yükleme veya kısmi silme oluşur.',
      },
      {
        assumption: 'Kullanıcı tekrar açmak için bir neden bulur.',
        action:
          'Sonraki iş günlerinde davet zorlamadan kullanım nedenini ve yardım taleplerini kaydet.',
        measure: 'Tekrar yapılan iş, bırakma gerekçesi ve destek yükü',
        pass: 'Aynı faydalı iş için kendiliğinden tekrar kullanım görülür; ayrı ücret sorusu somutlaşır.',
        fail: 'Tek seferlik merak dışında ihtiyaç çıkmaz.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'Yerel kayıt tek başına satın alma nedeni değil. Önce güvenilir günlük kapanış ve yedeği tamamla; mevcut zaman ve not araçlarından neden geçileceği henüz netleşmedi.',
  },
  {
    id: 'guardian',
    position: 'infrastructure',
    buyer: {
      user: 'Aynı Mac üzerinde birden fazla AI geliştirme oturumu yürüten geliştirici',
      decisionMaker: 'Geliştirici veya geliştirme altyapısı sorumlusu',
      payer: 'İç geliştirme bütçesi; dış alıcı bilinmiyor.',
      firstSegment:
        'Hipotez: süreçlerin hangi oturuma ait olduğunu kaynak baskısında ayıramayan küçük geliştirme ekibi',
      excluded:
        'Policy motorunun varlığı güvenli otomatik süreç kapatma veya dış ücretli ürün kanıtı değildir.',
    },
    problem: {
      workflow:
        'Bellek ve süreç ağacını oturumla eşleyip hangi işin müdahale gerektirdiğini anlamak',
      trigger: 'Kaynak baskısı, takılan oturum veya yetim süreç şüphesi',
      frequency:
        'Çoklu oturum ve kaynak baskısına bağlı; gerçek sıklık bilinmiyor.',
      cost: 'Teşhis emeği ve yanlış müdahalede kaybolabilecek iş; gerçekleşmiş tasarruf ölçülmedi.',
    },
    offer: {
      outcome:
        'Salt okunur oturum kaynak raporu, aitlik gerekçesi ve açıklanabilir müdahale önerisi',
      buyReason:
        'Hipotez: süreç listesini elle ayıklamaya göre oturuma ait kaynak sorununu daha hızlı ve daha az yanlış müdahaleyle bulmak',
      smallestScope:
        'Tek makinede süreç-oturum eşliği ve müdahale edilmemiş iş listesi. Otomatik kapatma bu ilk değerin koşulu değildir.',
    },
    alternatives: [
      {
        name: 'macOS Activity Monitor',
        url: 'https://support.apple.com/guide/activity-monitor/quit-a-process-actmntr1002/mac',
        claim:
          'Süreçleri hiyerarşik görüntüleme, sonlandırma ve sinyal gönderme işletim sisteminde var.',
        limitation:
          'AI oturumuna özgü aitlik eşliği ayrıca kurulmalıdır; Guardian bu işi daha iyi yapmış sayılmaz.',
      },
      {
        name: 'ps / top ve oturum sahibinin elle kontrolü',
        url: null,
        claim:
          'Geliştirici süreç ağacı, komut ve kaynak kullanımını mevcut araçlarla inceleyebilir.',
        limitation: 'Gerçek teşhis zamanı ve yanlış müdahale sayısı ölçülmedi.',
      },
    ],
    competition: {
      copyable: 'Süreç listesi, bellek grafiği, eşik ve genel uyarı',
      advantage: null,
      missingAdvantage:
        'Güvenilir oturum aitliği, yanlış pozitif örnekleri ve ölçülmüş kesinti azalması gösterilmedi.',
      counterargument:
        'Activity Monitor ve basit oturum disiplini yeterliyse ayrı daemon bakımına gerek kalmaz.',
    },
    distribution: {
      channel:
        'Çoklu AI oturumu kullanan geliştirici ekibine süreç aitliği örneği',
      access: 'unknown',
      firstOffer:
        'Aynı kaynak baskısında elle teşhis ile salt okunur oturum raporunu karşılaştırma',
      steps: [
        'Kimliksiz süreç ağacı ve aitlik gerekçesi örneği hazırla.',
        'Geliştiricinin kendi teşhisini aynı durumda kaydet.',
        'Yanlış eşleşmeleri ve raporun kararı nasıl değiştirdiğini incele.',
      ],
      cost: 'İşletim sistemi ve araç sürümü desteği var; dış ekip erişimi gösterilmedi.',
    },
    economics: {
      unit: 'İç geliştirme oturumu veya koltuk',
      recurrence:
        'Yoğun geliştirmede tekrar fayda doğabilir; dış abonelik isteği bilinmiyor.',
      costs: [
        'Süreç ve araç sürümü uyumu',
        'Aitlik ve negatif örnek doğrulaması',
        'Daemon ve hata desteği',
      ],
      risk: 'Yanlış eşleşme pahalı kesinti yaratabilir; önlenen emek ölçülmeden altyapı maliyeti gerekçelenemez.',
    },
    portfolio: {
      consumer:
        'AI geliştirme oturumları; tüketici ekip kullanımı henüz gözlenmedi.',
      contribution:
        'Kaynak teşhisi ve açık oturum sahipliği geliştirme akışını destekleyebilir.',
      opportunityCost:
        'Genel kaynak yöneticisi kurmak, seçilmiş ürünün doğrudan geliştirme ihtiyacını bekletebilir.',
    },
    evidenceIds: ['CONT-REM-SRC-006'],
    sources: [
      source(
        'PV-GU-01',
        'Apple Activity Monitor süreç kontrolü',
        'https://support.apple.com/guide/activity-monitor/quit-a-process-actmntr1002/mac',
        'Süreç hiyerarşisi, güvenli çıkış, zorla çıkış ve sinyal gönderme belgeleniyor.',
        'AI oturumu eşleştirme çözümü değildir; zorla çıkışın veri kaybı etkisi ayrıca belirtiliyor.',
      ),
    ],
    experiments: [
      {
        assumption: 'Oturum aitliği güvenilir biçimde bulunabilir.',
        action:
          'Bilinen sahipli oturum, ortak alt süreç ve yetim örneklerini salt okunur raporla karşılaştır.',
        measure: 'Yanlış sahiplik, açıklanamayan eşleşme ve belirsiz durum',
        pass: 'Aitlik gerekçesi kontrol edilebilir; belirsiz örnek kesin sahiplik gibi sunulmaz.',
        fail: 'Ortak veya ilgisiz süreç yanlış oturuma bağlanır.',
      },
      {
        assumption: 'Rapor elle teşhisten anlamlı biçimde iyidir.',
        action:
          'Aynı kaynak baskısını Activity Monitor ve raporla teşhis et; müdahale yapmadan seçilen nedeni karşılaştır.',
        measure: 'Teşhis emeği ve doğru sorun kaynağı',
        pass: 'Doğru teşhis daha az elle ayıklamayla bulunur.',
        fail: 'Mevcut araç eşit sonucu daha basit verir.',
      },
      {
        assumption: 'İç tüketiciye katkısı bakımını karşılar.',
        action:
          'Seçili geliştirme akışında bulunan sorunları ve araç bakımı için harcanan emeği kaydet.',
        measure: 'Önlenen tekrar iş ve bakım yükü',
        pass: 'Somut tüketici işi için net emek katkısı gösterilir.',
        fail: 'Bakım veya yanlış uyarı yükü önlenen işi aşar.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: true,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'Guardianı önce iç altyapı katkısıyla değerlendir. Süreç ekranı veya otomatik kapatma dış ürün gerekçesi değildir; aitlik ve teşhis faydası somut tüketici işinde ölçülmeli.',
  },
  {
    id: 'qral',
    position: 'feature',
    buyer: {
      user: 'Ders veya sunum için aynı bağlantı kümesini tekrar paylaşan öğretmen',
      decisionMaker: 'Öğretmenin kendisi',
      payer: 'Öğretmen veya kurumu; ayrı ücret isteği bilinmiyor.',
      firstSegment:
        'Hipotez: tekrarlı ders bağlantılarını aynı biçimde hazırlayan öğretmen',
      excluded:
        'Genel QR, ajans kopyalama şablonu ve öğretmen akışı aynı ilk ürün değildir. Base64 yoluna şifreleme denemez.',
    },
    problem: {
      workflow:
        'Bağlantı kümesini doğru başlık, kopya ve QR çıktısıyla ders materyaline hazırlamak',
      trigger: 'Yeni ders veya güncellenen bağlantı kümesi',
      frequency: 'Ders materyali yenilendikçe; gerçek tekrar yükü bilinmiyor.',
      cost: 'Tek tek kopyalama, yanlış bağlantı ve çıktı düzeltme emeği; tutar bilinmiyor.',
    },
    offer: {
      outcome:
        'Tek öğretmen işinde çoklu bağlantıyı doğru ve yeniden kullanılabilir biçimde paylaşmak',
      buyReason: null,
      smallestScope:
        'Tek bağlantı kümesi ve çıktı biçimi; doğru kopyalama başarısı, güvenli metin işleme ve dürüst veri açıklaması. Şifreli QR iddiasını çıkar veya gerçek ayrı tasarımla doğrula.',
    },
    alternatives: [
      {
        name: 'Chrome yerleşik QR paylaşımı',
        url: 'https://support.google.com/chrome/answer/10051760?hl=en',
        claim:
          'Chrome bir sayfanın QR kodunu oluşturup kopyalama ve indirme sunuyor.',
        limitation:
          'Tek sayfa paylaşımı bütün çoklu ders işine eşdeğer değildir; ek ihtiyacın önemli olduğu da gösterilmedi.',
      },
      {
        name: 'Bağlantıları slayt veya belgeye elle eklemek',
        url: null,
        claim:
          'Öğretmen tarayıcıdan bağlantıyı kopyalayıp mevcut ders materyalinde düzenleyebilir.',
        limitation: 'Gerçek hazırlık emeği ve hata sıklığı ölçülmedi.',
      },
    ],
    competition: {
      copyable: 'QR üretimi, sekme kopyalama, geçmiş listesi ve çıktı şablonu',
      advantage: null,
      missingAdvantage:
        'Tekrarlı ders işinde belirgin emek kazancı ve kurumun ödeme nedeni gösterilmedi.',
      counterargument:
        'Yerleşik Chrome paylaşımı ve mevcut slayt şablonu yeterliyse yeni eklenti gereksizdir.',
    },
    distribution: {
      channel:
        'Ders materyali hazırlayan öğretmen topluluğunda örnek bağlantı paketi',
      access: 'unknown',
      firstOffer:
        'Aynı ders bağlantılarını yerleşik Chrome ve tek şablon akışıyla hazırlama karşılaştırması',
      steps: [
        'Bağlantı kümesi ve beklenen ders çıktısını hazırla.',
        'Mevcut hazırlama biçimiyle yan yana göster.',
        'Tekrar kullanılan şablonu ve kuruluma itirazı kaydet.',
      ],
      cost: 'Materyal hazırlama, eklenti kurulum desteği ve erişim emeği var; öğretmen kitlesi elde gösterilmedi.',
    },
    economics: {
      unit: 'Ders hazırlama özelliği veya kurum araç paketi',
      recurrence:
        'Materyal yenileme tekrar eder; ayrı abonelik gerekçesi bilinmiyor.',
      costs: [
        'Tarayıcı izin ve sürüm uyumu',
        'Kopyalama ve çıktı desteği',
        'Kurulum ve kullanıcı edinme',
      ],
      risk: 'Genel QR ücretsiz hazırken küçük hız kazancı destek ve edinme yükünü karşılamayabilir.',
    },
    portfolio: {
      consumer: 'Öğretmen aracı; seçilirse ayrı ajans şablon ürünü',
      contribution:
        'Güvenilir kopyalama ve çoklu bağlantı çıktısı bir ürün içi kabiliyet olabilir.',
      opportunityCost:
        'Çok sayıda QR türüne yayılmak, tek tekrar işinin faydasını göstermeyi geciktirir.',
    },
    evidenceIds: [
      'CONT-REM-SRC-007',
      'CONT-REM-SRC-086',
      'CONT-REM-SRC-087',
      'CONT-REM-BIN-007',
    ],
    sources: [
      source(
        'PV-QR-01',
        'Chrome sekme paylaşımı',
        'https://support.google.com/chrome/answer/10051760?hl=en',
        'Yerleşik QR oluşturma, bağlantı kopyalama ve kod indirme adımları belgeleniyor.',
        'Toplu öğretmen iş akışının faydasını veya şifreli paylaşımı kanıtlamaz.',
      ),
    ],
    experiments: [
      {
        assumption: 'Paylaşım çıktısı doğru ve dürüst olabilir.',
        action:
          'Kopyalama izni reddi, bozuk URL, özel karakter ve QR içeriğini kontrol et; Base64 yolunun iddiasını düzelt.',
        measure: 'Yanlış başarı, yanlış bağlantı ve güvenlik iddiası',
        pass: 'Hata açık bildirilir; çıktı doğru olur; sağlanmayan şifreleme vaat edilmez.',
        fail: 'Kopyalanmayan veri başarılı görünür veya sır düz metin benzeri içerikte korunmuş sayılır.',
      },
      {
        assumption: 'Çoklu ders işi yerleşik paylaşımdan daha faydalıdır.',
        action:
          'Aynı bağlantı kümesini öğretmenin mevcut yöntemi ve tek şablonla hazırla.',
        measure: 'Hazırlama emeği, yanlış bağlantı ve tercih',
        pass: 'Tekrarlı işte belirli adım azalır ve öğretmen yeniden kullanmayı seçer.',
        fail: 'Kazanç yalnız tek QR üretimidir.',
      },
      {
        assumption: 'Özellik bir tüketici üründe sürdürülebilir.',
        action:
          'Sonraki materyal güncellemesinde şablonu yeniden kullan; kurulum ve destek emeğini kaydet.',
        measure: 'Yeniden kullanım nedeni ve yardım yükü',
        pass: 'Şablon tekrar işi azaltır ve bakım yükü sınırlı kalır.',
        fail: 'Her materyal ayrı düzenleme veya destek ister.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Genel QR aracı için ayrı ödeme nedeni henüz gösterilemedi. Önce iddia ve hata davranışını düzelt; çoklu bağlantı işi kanıtlanırsa tüketici üründeki özellik olarak değerlendir.',
  },
  {
    id: 'e-menu',
    position: 'product',
    buyer: {
      user: 'Restoranın menü ve fiyatlarını güncelleyen kişi',
      decisionMaker: 'Restoran sahibi veya menü hizmeti veren ajans',
      payer: 'Restoran veya ajans',
      firstSegment:
        'Hipotez: sezonluk menü ve fiyat değişikliklerini tekrarlayan küçük restoran',
      excluded:
        'Menü veri modeli sipariş, ödeme veya POS ürününün çalıştığını göstermez.',
    },
    problem: {
      workflow:
        'Ürün ve fiyat değişikliğini müşterinin gördüğü menüye tutarlı yayımlamak',
      trigger: 'Fiyat, ürün bulunurluğu veya sezonluk menü değişimi',
      frequency: 'Menü değiştikçe; gerçek sıklık bilinmiyor.',
      cost: 'Tekrar düzenleme, yanlış fiyat ve eski menüyü düzeltme emeği; kayıp ölçülmedi.',
    },
    offer: {
      outcome:
        'Tek restoranın menüsünü ön izleyip yayımlamak ve hatalı sürümü geri almak',
      buyReason: null,
      smallestScope:
        'Tek işletme, fiyat güncellemesi, ön izleme, yayın ve geri alma; diğer işletmeye erişememe. Alerjen bilgisini kaynak sahibi kontrol eder.',
    },
    alternatives: [
      {
        name: 'GloriaFood QR menü ve sipariş',
        url: 'https://www.gloriafood.com/qr-code-ordering-system-restaurant-menu',
        claim:
          'Dijital menü, masa QR kodu ve yerinde sipariş kurulumu hazır kapsamdır.',
        limitation:
          'Seçili restoranın yayın ve geri alma işi denenmedi; sipariş işlevi bu projenin mevcut kabiliyeti sayılmaz.',
      },
      {
        name: 'Mevcut web sayfası veya QR ile açılan PDF menü',
        url: null,
        claim:
          'Restoran fiyatları belge veya web sayfasında değiştirip aynı bağlantıyı paylaşabilir.',
        limitation:
          'Güncelleme ve hata düzeltme emeği gerçek işletmede ölçülmedi.',
      },
    ],
    competition: {
      copyable: 'QR, kategori, ürün, fiyat, tema ve menü ekranı',
      advantage: null,
      missingAdvantage:
        'Hazır menü ürününe göre geçişi haklı çıkaran özel tekrar işi, dağıtım ve düşük destek yükü yok.',
      counterargument:
        'Hazır menü veya güncellenen PDF aynı ihtiyacı yeterince karşılayabilir; geri alma ekranı tek başına tercih sebebi olmayabilir.',
    },
    distribution: {
      channel: 'Restoran sitesi veya menü bakımı yapan yerel ajans',
      access: 'unknown',
      firstOffer:
        'Aynı fiyat değişikliğini mevcut menü ve yayın akışıyla yan yana uygulama',
      steps: [
        'Fiyat değişikliği ve hatalı sürüm örneğini hazırla.',
        'Ajans veya işletmenin mevcut güncellemesini karşılaştır.',
        'Zaman, hata ve geçiş isteğini kaydet.',
      ],
      cost: 'Menü girişi, görsel ve işletme desteği emeği var; restoran erişimi gösterilmedi.',
    },
    economics: {
      unit: 'İşletme veya menü; ücret birimi seçilmedi.',
      recurrence:
        'Menü değişikliği tekrar eder; sürekli ücret isteği bilinmiyor.',
      costs: [
        'İlk menü aktarımı',
        'Görsel, dil ve içerik desteği',
        'Yayın ve erişim altyapısı',
        'İşletme başına yardım',
      ],
      risk: 'Az değişen menüde tekrar değer zayıf kalırken işletme başına içerik hizmeti maliyeti sürebilir.',
    },
    portfolio: {
      consumer: 'E-Menüm',
      contribution:
        'İşletme ayrımı ve sürümlü yayın gerçek akışta sınanabilir.',
      opportunityCost:
        'POS ve siparişe yayılmak, temel menü güncellemesinin satın alma nedenini netleştirmeden kapsamı büyütür.',
    },
    evidenceIds: ['CONT-REM-SRC-008'],
    sources: [
      source(
        'PV-EM-01',
        'GloriaFood QR menü kurulum rehberi',
        'https://www.gloriafood.com/qr-code-ordering-system-restaurant-menu',
        'Dijital menü, yerinde sipariş ve masa QR kodu oluşturma adımları sunuluyor.',
        'Restoranın gerçek faydası, yerel ödeme kapsamı veya E-Menüm karşılaştırması değildir.',
      ),
    ],
    experiments: [
      {
        assumption: 'Yayın akışı işletmenin işini güvenilir bitirir.',
        action:
          'Fiyatı değiştir, ön izle, yayımla ve geri al; başka işletme kullanıcısının erişimini kontrol et.',
        measure: 'Görünen fiyat, sürüm eşliği ve işletmeler arası erişim',
        pass: 'Doğru sürüm görünür ve geri dönüş tutarlıdır; başka işletmenin verisi değişmez.',
        fail: 'Eski fiyat, karışan işletme veya tutarsız geri dönüş oluşur.',
      },
      {
        assumption: 'Mevcut alternatiften geçmeye değer iş vardır.',
        action: 'Aynı değişikliği hazır menü veya PDF yöntemiyle karşılaştır.',
        measure: 'Düzenleme emeği, hata ve işletmenin tercih nedeni',
        pass: 'Belirli tekrar işi daha kolay biter ve tercih nedeni görünümün ötesindedir.',
        fail: 'Mevcut yöntem yeterli ve daha basittir.',
      },
      {
        assumption: 'İşletme başına destek sınırlanabilir.',
        action:
          'Yeni örnek menüyü aynı kurulumla aktar; sonraki değişikliği işletme sorumlusuna yaptır.',
        measure: 'İlk giriş ve sürekli yardım emeği',
        pass: 'İşletme sonraki değişikliği kendisi bitirir; kurulum tekrar kullanılabilir.',
        fail: 'Her değişiklik ajansın içerik hizmetine dönüşür.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'Menü ekranı hazır pazarda farklılaşma değil. Yayın akışını geliştirmek mümkün; yatırımın ticari gerekçesi için belirli işletmenin mevcut yöntemden geçme nedeni ayrıca daraltılmalı.',
  },
  {
    id: 'simulator',
    position: 'feature',
    buyer: {
      user: 'Ajansın proje ön değerlendirmesini hazırlayan kişi',
      decisionMaker: 'Ajans sahibi veya iç proje sponsoru',
      payer: 'Ajans ya da sponsor işletme; ayrı araç bütçesi bilinmiyor.',
      firstSegment:
        'Hipotez: aynı tür yazılım tekliflerini gerekçeli kapsam kararıyla değerlendiren küçük ajans',
      excluded:
        'Mekanik GO / NO çıktısı yatırım doğruluğu veya gelir tahmini değildir; senaryo sayısı talep kanıtı sayılmaz.',
    },
    problem: {
      workflow:
        'Proje varsayımlarını, kanıtları ve kapsam kararını sonraki değişiklikte tekrar açıklamak',
      trigger: 'Yeni teklif veya değişen kapsam varsayımı',
      frequency: 'Teklif ve karar değiştikçe; gerçek iş yükü bilinmiyor.',
      cost: 'Tekrar analiz, toplantı ve eski gerekçeyi bulma emeği; tutar bilinmiyor.',
    },
    offer: {
      outcome:
        'Bir projenin beyan, kanıt, varsayım ve insan kararını sürümlü raporda ayırmak',
      buyReason: null,
      smallestScope:
        'Tek nişte tek proje; birimleri doğru hesapla, eksik veriyi açık göster, insanın gerekçeli kararını kaydet. Genel yatırım hükmü verme.',
    },
    alternatives: [
      {
        name: 'Strategyzer Business Model Canvas ve test araçları',
        url: 'https://www.strategyzer.com/library/the-business-model-canvas',
        claim:
          'Alıcı, değer, kanal, maliyet ve gelir varsayımlarını birlikte inceleyen hazır çerçeve ve şablonlar var.',
        limitation:
          'Kalibre edilmiş simülasyon veya bu projenin sayısal kapılarına eşdeğer olduğu ileri sürülmez.',
      },
      {
        name: 'Karar matrisi, toplantı notu ve hesap tablosu',
        url: null,
        claim: 'Ekip kendi ölçütünü ve gerekçesini mevcut belgede tutabilir.',
        limitation: 'Gerçek karar tekrarının maliyeti gözlenmedi.',
      },
    ],
    competition: {
      copyable: 'Soru formu, ağırlıklı puan, senaryo ve dışa aktarılan rapor',
      advantage: null,
      missingAdvantage:
        'Sonuçlarla kalibre edilmiş model veya mevcut karar belgesinden daha iyi tekrar kullanım gösterilmedi.',
      counterargument:
        'İyi hazırlanmış bir karar tablosu aynı gerekçeyi daha az araç ve model riskiyle taşıyabilir.',
    },
    distribution: {
      channel:
        'Yazılım teklifi hazırlayan uygulayıcı topluluğunda tek karar örneği',
      access: 'unknown',
      firstOffer:
        'Aynı kapsam değişikliğinde eski gerekçeyi bulma ve kararı güncelleme karşılaştırması',
      steps: [
        'Beyan ve kanıtı ayrılmış örnek karar hazırla.',
        'Mevcut teklif tablosuyla karşılaştırma oturumu sun.',
        'Hangi alanın gerçek kararı değiştirdiğini ve raporun sonraki kullanımını kaydet.',
      ],
      cost: 'Örnek, kolaylaştırma ve model açıklaması emeği var; alıcı erişimi gösterilmedi.',
    },
    economics: {
      unit: 'Ön değerlendirme oturumu veya tüketici ürün içindeki karar',
      recurrence:
        'Yeni teklif ve revizyon tekrar eder; ayrı abonelik isteği bilinmiyor.',
      costs: [
        'Model ve birim doğrulama',
        'Alan şablonu bakımı',
        'Analist kolaylaştırması',
        'Dışa aktarma ve kullanıcı desteği',
      ],
      risk: 'Puanı açıklamak için sürekli analist gerekiyorsa araç hizmet emeğini azaltmayabilir.',
    },
    portfolio: {
      consumer: 'Portföy karar rehberi veya ajans teklif akışı',
      contribution:
        'Karar, kanıt ve varsayım izini mevcut ürün içinde taşıyabilir.',
      opportunityCost:
        'Genel strateji motoruna büyümek, gerçek karar tekrarına katkıyı göstermeden model bakımını artırır.',
    },
    evidenceIds: ['CONT-REM-SRC-009'],
    sources: [
      source(
        'PV-SI-01',
        'Strategyzer Business Model Canvas',
        'https://www.strategyzer.com/library/the-business-model-canvas',
        'İş modeli varsayımlarını birlikte sorgulayan resmî şablon ve ilgili test araçları bulunuyor.',
        'Şablonun varlığı doğru yatırım kararı veya sayısal tahmin doğruluğu sağlamaz.',
      ),
    ],
    experiments: [
      {
        assumption: 'Model karar girdilerini doğru taşır.',
        action:
          'Takvim haftası ve kişi-haftayı ayır; sürekli maliyet, eksik veri ve sınır değerleri bağımsız örnekle kontrol et.',
        measure:
          'Birim hatası, yanıltıcı kesinlik ve yeniden üretilebilir sonuç',
        pass: 'Her sonuç girdiye ve kapsama kadar açıklanır; tamlık etiketi kanıt güveni sayılmaz.',
        fail: 'Birim veya maliyet hatası karar etiketini değiştirir.',
      },
      {
        assumption: 'Karar belgesinden daha iyi tekrar kullanım vardır.',
        action:
          'Aynı projeyi mevcut tablo ve araçla iki farklı kapsam sürümünde değerlendir.',
        measure: 'Eski gerekçeyi bulma, güncelleme emeği ve kaybolan varsayım',
        pass: 'Araç kararın neden değiştiğini daha az tekrar işle gösterir.',
        fail: 'Mevcut belge eşit veya daha anlaşılırdır.',
      },
      {
        assumption: 'Özellik tüketici akışında işe yarar.',
        action:
          'Raporu bir teklif veya portföy kararına bağla; sonraki kararda gerçekten kullanılan alanı kaydet.',
        measure: 'Kullanılan çıktı ve analist açıklaması yükü',
        pass: 'Çıktı gerçek takip kararına katkı verir ve kendi başına anlaşılır.',
        fail: 'Rapor yalnız üretilir; karar sürecine girmez.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Simülatörü kararın doğruluğunu satan ürün sayma. Birim ve belirsizlik hatalarını düzelt; gerekçeli karar izinin teklif veya portföy ürünündeki katkısını değerlendir.',
  },
  {
    id: 'hakedis',
    position: 'product',
    buyer: {
      user: 'Dönem ve taşeron dosyalarını uzlaştıran şantiye veya mali işler sorumlusu',
      decisionMaker: 'Mali işler müdürü veya işletme sahibi',
      payer: 'Yüklenici işletme; SMMM büro paketi ayrı alıcıdır.',
      firstSegment:
        'Hipotez: aynı işin dönem ve taşeron dosyaları arasındaki farkları açıklamakta zorlanan yüklenici',
      excluded:
        'Asgari işçilik taslakları çalışan hesap motoru değildir. İlk fark raporu resmî SGK hükmü sayılmaz.',
    },
    problem: {
      workflow:
        'Hakediş ve işçilik dosyalarında dönem, kapsam ve taşeron farkının kaynağını bulmak',
      trigger:
        'Yeni dönem dosyası, kırık bağlantı veya açıklanamayan hesap farkı',
      frequency: 'Dönem ve dosya değiştikçe; gerçek yük ölçülmedi.',
      cost: 'Hücre izleme, yeniden hesap ve uzman uzlaştırması emeği; gerçekleşmiş ceza veya kayıp çıkarılmaz.',
    },
    offer: {
      outcome:
        'Özgün dosyayı değiştirmeden farkı sayfa ve hücre kaynağına bağlayan, uzman kontrolüne uygun rapor',
      buyReason:
        'Hipotez: mevcut Excel düzenini koruyarak açıklanamayan farkı bulma ve kabul etme emeğini azaltmak',
      smallestScope:
        'Tek dönem, etap veya taşeron örneği; dosya sürümü, hücre kaynağı, fark ve uzman açıklaması. Genel mevzuat ve hakediş motorunu aynı dilime ekleme.',
    },
    alternatives: [
      {
        name: 'AMP Kurumsal Hakediş ve Yaklaşık Maliyet',
        url: 'https://www.amp.com.tr/urunler/kurumsal-hakedis-ve-yaklasik-maliyet',
        claim:
          'Hakediş ve yaklaşık maliyet araçları ile Excel şablonlarından veri aktarımı sunuyor.',
        limitation:
          'Asgari işçilik fark incelemesinin birebir eşdeğeri olduğu ileri sürülmez; aynı dosya denenmedi.',
      },
      {
        name: 'Mevcut Excel dosyası ve SMMM / uzman incelemesi',
        url: null,
        claim:
          'Hücre bağları ve dönem farkları mevcut dosyada uzman tarafından kontrol edilebilir.',
        limitation: 'Gerçek inceleme emeği, hata ve kabul maliyeti ölçülmedi.',
      },
    ],
    competition: {
      copyable: 'Dosya yükleme, genel hata listesi, PDF rapor ve AI açıklaması',
      advantage: null,
      missingAdvantage:
        'Uzman kabulü görmüş kaynak-hücre örnekleri, tekrar eden fark kütüphanesi ve düşük dosya uyarlama yükü yok.',
      counterargument:
        'İşletmenin mevcut hakediş programı veya güvenilir çalışma kitabı aynı farkı daha az geçiş maliyetiyle açıklayabilir.',
    },
    distribution: {
      channel:
        'İnşaat muhasebesi uygulayıcısı veya SMMM üzerinden açıklanamayan dosya farkı',
      access: 'unknown',
      firstOffer:
        'Kimliksiz örnek dosyada aynı farkı mevcut yöntem ve kaynaklı raporla inceleme',
      steps: [
        'Dönem ve kapsamı belli örnek dosyayı kaynaklarıyla hazırla.',
        'Kabul eden uzmanla mevcut incelemeyi karşılaştır.',
        'Açıklanan farkı, yanlış bulguyu ve dosya uyarlama emeğini kaydet.',
      ],
      cost: 'Alan uzmanı ve dosya inceleme emeği var; firma erişimi ve müşteri kabulü gösterilmedi.',
    },
    economics: {
      unit: 'İş dosyası, dönem veya işletme; ücret birimi seçilmedi.',
      recurrence:
        'Yeni dönem ve düzeltmeler tekrar inceleme yaratabilir; düzenli ücret talebi bilinmiyor.',
      costs: [
        'Çalışma kitabı ve veri eşleme',
        'Uzman doğrulama',
        'Kural ve kaynak bakımı',
        'Fark açıklaması ve müşteri desteği',
      ],
      risk: 'Her dosyanın ayrı uzman işi olması ölçeklenmeyi sınırlar; resmî hesap sorumluluğu dar rapordan daha geniştir.',
    },
    portfolio: {
      consumer: 'Kişisel hakediş fark inceleme ürünü',
      contribution:
        'Dosya sürümü, veri kökeni ve gerekçeli fark altyapısını somutlaştırır.',
      opportunityCost:
        'Kanıtlanmış fark işi olmadan bütün mevzuat motorunu yazmak yüksek doğrulama ve bakım yükü yaratır.',
    },
    evidenceIds: [
      'CONT-REM-SRC-010',
      'CONT-REM-SRC-023',
      'CONT-REM-SRC-025',
      'CONT-REM-SRC-026',
    ],
    sources: [
      source(
        'PV-HA-01',
        'AMP Kurumsal Hakediş ve Yaklaşık Maliyet',
        'https://www.amp.com.tr/urunler/kurumsal-hakedis-ve-yaklasik-maliyet',
        'Hakediş ve yaklaşık maliyet kapsamı; Excel metraj ve maliyet şablonlarından aktarım belgeleniyor.',
        'Asgari işçilik veya seçili çalışma kitabındaki farkın çözüldüğü kanıtı değildir.',
      ),
    ],
    experiments: [
      {
        assumption: 'Fark raporu uzman incelemesinde işe yarar.',
        action:
          'Bilinen fark içeren kimliksiz dosyayı mevcut yöntem ve raporla bağımsız uzmana incelet.',
        measure: 'Doğru bulunan fark, yanlış bulgu ve açıklama emeği',
        pass: 'Uzman farkı kaynağıyla kabul eder ve inceleme tekrarını azaltır.',
        fail: 'Yanlış bulgu veya açıklama yükü mevcut yöntemden büyüktür.',
      },
      {
        assumption: 'Kaynak izi dönem değişikliğinde korunabilir.',
        action:
          'Dosyanın ikinci sürümünde dönem, taşeron kapsamı ve kırık bağ örneklerini izle.',
        measure: 'Hücre kaynağı, sürüm eşliği ve açıklanamayan değişiklik',
        pass: 'Her bulgu doğru dosya ve hücre sürümüne bağlanır.',
        fail: 'Kaynak kaybolur veya farklı kapsamlar aynı hesapta karışır.',
      },
      {
        assumption: 'Uyarlama ve uzman emeği tekrar kullanılabilir.',
        action:
          'Benzer ikinci dosyayı işle; ilk kurulum, kural tekrar kullanımı ve destek emeğini ayrı tut.',
        measure: 'Dosyaya özgü işlem ve tekrar kullanılan kontrol',
        pass: 'İkinci dosyada daha az özel emek gerekir; ücret birimi için gerçek maliyet tabanı oluşur.',
        fail: 'Her dosya baştan uzman danışmanlığı olur.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: true,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'Genel hakediş yazılımı yerine mevcut dosyadaki açıklanamayan farkı kaynakla çözmek sınanabilir hipotezdir. Dar raporun kabulünü bütün mevzuat motorunun doğruluğu sayma.',
  },
  {
    id: 'wordpress-niche',
    position: 'umbrella',
    buyer: {
      user: 'WooCommerce mağazalarının ödeme ayarlarını yöneten WordPress uygulayıcısı',
      decisionMaker: 'Ajans sahibi veya freelancer',
      payer: 'Ajans; tek mağaza doğrudan alıcı ayrı seçenektir.',
      firstSegment:
        'Hipotez: benzer kapıda ödeme koşulunu farklı müşteri mağazalarında tekrar kuran ajans',
      excluded:
        'KVKKLite, taksit / kapıda ödeme ve IYS Bridge üç ayrı ürün hipotezidir; WooCommnts koduyla aynı ürün sayılmaz.',
    },
    problem: {
      workflow:
        'Mağazanın kapıda ödeme kuralını kurup sipariş durumunda doğru çalıştığını kontrol etmek',
      trigger: 'Yeni mağaza veya değişen ödeme ve teslimat kuralı',
      frequency: 'Kurulum ve kural değiştikçe; gerçek tekrar yükü bilinmiyor.',
      cost: 'Eklenti seçme, yapılandırma, test ve yanlış siparişi düzeltme emeği; tutar bilinmiyor.',
    },
    offer: {
      outcome:
        'Tek kapıda ödeme kuralını açık test örnekleriyle kurup doğrulamak',
      buyReason: null,
      smallestScope:
        'Çatıdan yalnız kapıda ödeme seçeneğini ayır; tek ajans işi ve tek kural. Hukuki metin ve resmî IYS entegrasyonunu bu dilime karıştırma.',
    },
    alternatives: [
      {
        name: 'WooCommerce yerleşik kapıda ödeme',
        url: 'https://woocommerce.com/document/cash-on-delivery/',
        claim:
          'Etkinleştirme, teslimat yöntemi seçimi ve sipariş durumu yönetimi çekirdekte var.',
        limitation: 'Bütün özel mağaza kurallarını karşıladığı ileri sürülmez.',
      },
      {
        name: 'Advanced Cash on Delivery with Fee',
        url: 'https://woocommerce.com/products/advanced-cash-on-delivery-with-fee/',
        claim:
          'Hazır ücret ve koşul seçenekleriyle kapıda ödeme kapsamını genişleten eklenti var.',
        limitation:
          'Seçilecek ajans kuralı denenmedi; eksik özellik olduğu çıkarılmaz.',
      },
      {
        name: 'Hazır ayar ve elle sipariş kontrolü',
        url: null,
        claim:
          'Ajans mevcut ödeme ayarını kurup uygun olmayan siparişleri işletmeyle kontrol edebilir.',
        limitation: 'Gerçek kontrol emeği ve hata maliyeti ölçülmedi.',
      },
    ],
    competition: {
      copyable:
        'Ödeme açma kapama, ücret alanı, koşul formu ve genel onay kaydı',
      advantage: null,
      missingAdvantage:
        'Hazır eklentilerin ötesinde ajansın tekrar eden istisnası ve uyumlu kurulum birikimi gösterilmedi.',
      counterargument:
        'WooCommerce çekirdeği veya mevcut ileri eklenti aynı kuralı karşılıyorsa yeni eklenti yalnız bakım yükü ekler.',
    },
    distribution: {
      channel:
        'WooCommerce uygulayıcı topluluğunda tek mağaza kuralı ve test paketi',
      access: 'unknown',
      firstOffer:
        'Aynı kuralı çekirdek ve hazır eklentiyle karşılaştırıp eksik adımı gösterme',
      steps: [
        'Tek ajans kuralını örnek siparişlerle tanımla.',
        'Mevcut çözümle kurulum ve test karşılaştırması sun.',
        'Karşılanmayan işi ve tekrar kullanım isteğini kaydet.',
      ],
      cost: 'Eklenti kombinasyonu ve uygulayıcı desteği emeği var; hazır ajans kitlesi gösterilmedi.',
    },
    economics: {
      unit: 'Mağaza veya ajans eklenti paketi',
      recurrence:
        'Uyumluluk ve kural değişikliği tekrar bakım yaratır; ayrı ücret talebi bilinmiyor.',
      costs: [
        'WordPress ve WooCommerce sürüm uyumu',
        'Ödeme ve teslimat eklentisi kombinasyonları',
        'Sipariş istisnası desteği',
      ],
      risk: 'Küçük özellik geliri çok sayıda eklenti kombinasyonunun desteğini karşılamayabilir.',
    },
    portfolio: {
      consumer: 'Seçilecek WordPress niş eklentisi',
      contribution:
        'Tek tekrar eden mağaza işinin dağıtılabilir ve sınanmış kabiliyetini oluşturabilir.',
      opportunityCost:
        'Üç eklentiyi aynı anda kurmak ortak alıcı ve bakım varsayımını doğrulamadan yatırımı böler.',
    },
    evidenceIds: ['CONT-REM-BIN-008'],
    sources: [
      source(
        'PV-WN-01',
        'WooCommerce Cash on Delivery',
        'https://woocommerce.com/document/cash-on-delivery/',
        'Kapıda ödeme ve teslimat yöntemi seçimi çekirdek ürün kapsamıdır.',
        'Özel ajans kuralının bütünü için yeterlilik sınanmadı.',
      ),
      source(
        'PV-WN-02',
        'Advanced Cash on Delivery with Fee',
        'https://woocommerce.com/products/advanced-cash-on-delivery-with-fee/',
        'Hazır koşullu kapıda ödeme ve ücret eklentisi sunuluyor.',
        'Satıcı kapsamı; aynı mağaza kuralı ve eklenti kombinasyonu denenmedi.',
      ),
    ],
    experiments: [
      {
        assumption: 'Tek kural hazır alternatifin ötesinde iş içerir.',
        action:
          'Ajansın örnek kuralını çekirdek WooCommerce ve hazır ileri eklentiyle çöz.',
        measure: 'Gerçek karşılanmayan adım ve yapılandırma yükü',
        pass: 'Yeni geliştirmeye değer belirli eksik veya tekrar işi bulunur.',
        fail: 'Hazır ayar yeterlidir; yeni eklenti gerekçesi kalmaz.',
      },
      {
        assumption: 'Kural sipariş durumunda güvenilir çalışabilir.',
        action:
          'İzin verilen, reddedilen ve sınır siparişleriyle ödeme ve teslimat koşullarını kontrol et.',
        measure: 'Yanlış seçenek, yanlış ücret ve açıklanamayan sipariş durumu',
        pass: 'Bütün tanımlı örnekler işletmenin kuralına uyar.',
        fail: 'Kural yalnız ayar ekranında var, gerçek siparişte tutarsızdır.',
      },
      {
        assumption: 'Ajans tekrar kurulumdan fayda görür.',
        action:
          'Aynı kuralı ikinci örnek mağazada kur; uyumluluk ve destek emeğini kaydet.',
        measure: 'Özel kod ve destek gereksinimi',
        pass: 'Tekrar kurulum basitleşir ve bakım paketi içinde katkı gösterilir.',
        fail: 'Her mağaza ayrı eklenti uyarlaması ister.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Üç niş eklentiyi tek ürün sayma. Kapıda ödeme seçeneğinde önce çekirdek ve hazır eklenti karşısındaki eksik işi bul; sırf eklenti yazılabilir diye yeni ürün önceliği verme.',
  },
  {
    id: 'great-doers',
    position: 'product',
    buyer: {
      user: 'Belirli işi dış uzmana yaptıracak küçük işletmenin proje sorumlusu',
      decisionMaker: 'Bütçe sahibi işletme yöneticisi',
      payer: 'İşletme',
      firstSegment:
        'Hipotez: tek uzmanlık kategorisinde kapsam ve teslim kabulünü yönetemeyen küçük işletme',
      excluded:
        'Hizmet kategorileri bağımsız yazılım ürünleri değildir. Uzman arzı ile alıcı talebi ayrı kurulmalıdır.',
    },
    problem: {
      workflow:
        'İhtiyaca uygun uzmanı seçmek, kapsamı anlaşılır kurmak ve teslimin yeterli olup olmadığını kabul etmek',
      trigger: 'İçeride yapılamayan belirli bir iş',
      frequency:
        'Yeni proje ve uzman ihtiyacına bağlı; tekrar sıklığı bilinmiyor.',
      cost: 'Uzman arama, yanlış seçim, kapsam revizyonu ve uyuşmazlık emeği; tutar ölçülmedi.',
    },
    offer: {
      outcome:
        'Tek briefi uygun uzman, açık kapsam ve kontrol edilebilir teslim ölçütüyle yürütmek',
      buyReason: null,
      smallestScope:
        'Tek uzmanlık kategorisi, tek brief, doğrulanmış uzman seçeneği ve kapsam-kabul kaydı. Genel pazaryeri ve bütün kategoriler aynı dilimde kurulmaz.',
    },
    alternatives: [
      {
        name: 'Upwork Project Catalog',
        url: 'https://www.upwork.com/services/',
        claim:
          'Kapsamı paketlenmiş profesyonel hizmetleri bulmak için hazır pazar var.',
        limitation: 'Aynı yerel brief, seçim ve teslim sonucu denenmedi.',
      },
      {
        name: 'Malt',
        url: 'https://www.malt.com/',
        claim:
          'Uzman bulma, sözleşme, yönetim ve ödeme akışları hazır kapsamdır.',
        limitation:
          'Türkiye alıcısı için koşullar veya somut kalite sonucu doğrulanmadı.',
      },
      {
        name: 'Güvenilir tanıdık önerisi veya ajans',
        url: null,
        claim:
          'İşletme bildiği uzmana ya da ajansa kapsamı doğrudan verebilir.',
        limitation:
          'Mevcut ilişki ve memnuniyet gözlenmedi; bu yolun başarısız olduğu varsayılmaz.',
      },
    ],
    competition: {
      copyable: 'Uzman profili, AI eşleştirme, brief formu ve mesajlaşma',
      advantage: null,
      missingAdvantage:
        'Doğrulanmış uzman ağı, teslim performansı, alıcı ilişkisi ve uyuşmazlık çözme birikimi yok.',
      counterargument:
        'İyi referans veya hazır pazaryeri aynı uzmanı bulabilir; yönetilen hizmetin ek bedeli gerçekten azaltılan riskle gerekçelenmelidir.',
    },
    distribution: {
      channel:
        'Tek uzmanlık alanındaki meslek ağına gerçekçi brief ve kabul örneği',
      access: 'unknown',
      firstOffer:
        'Bir iş için uzman seçimi ve teslim kapsamını mevcut yöntemle karşılaştırma',
      steps: [
        'Tek kategoride brief ve kabul örneğini hazırla.',
        'Uzman yeterliğini ve uygunluğunu ayrı doğrula.',
        'Bütçe sahibine seçim ve teslim yükünü nasıl azalttığını göster.',
      ],
      cost: 'Alıcı edinme kadar uzman bulma ve doğrulama emeği var; iki taraflı ağ elde gösterilmedi.',
    },
    economics: {
      unit: 'Tamamlanan hizmet işi; yazılım aboneliği birimi değil.',
      recurrence: 'Başka proje çıkabilir; düzenli abonelik varsayılmaz.',
      costs: [
        'Uzman doğrulama ve eşleştirme',
        'Kapsam ve kalite kontrolü',
        'Satış ve müşteri desteği',
        'Uyuşmazlık ve iptal yönetimi',
      ],
      risk: 'Komisyon görünürken eşleştirme ve kalite hizmeti emeği eksik sayılırsa katkı abartılır.',
    },
    portfolio: {
      consumer: 'Great Doers yönetilen hizmet akışı',
      contribution:
        'Brief, kapsam, kaynak ve teslim kabulü yazılımı gerçek hizmeti destekleyebilir.',
      opportunityCost:
        'Arz ve talep ilişkisi kurulmadan tam pazaryeri yazmak, esas operasyon riskini çözmeden geliştirme yükü yaratır.',
    },
    evidenceIds: [
      'CONT-REM-BIN-009',
      'CONT-REM-BIN-010',
      'CONT-REM-BIN-012',
      'CONT-REM-BIN-013',
    ],
    sources: [
      source(
        'PV-GD-01',
        'Upwork Project Catalog',
        'https://www.upwork.com/services/',
        'Paketlenmiş profesyonel hizmetlere erişim sağlayan hazır katalog bulunuyor.',
        'Aynı briefte uzman kalitesi veya sonuç karşılaştırılmadı.',
      ),
      source(
        'PV-GD-02',
        'Malt',
        'https://www.malt.com/',
        'Uzman arama, sözleşme, yönetim ve ödeme iş akışları sunuluyor.',
        'Satıcı açıklaması; yerel kullanım koşulu ve alıcı sonucu doğrulanmadı.',
      ),
    ],
    experiments: [
      {
        assumption: 'Bütçe sahibinin asıl derdi seçim ve kabuldür.',
        action:
          'Tek briefte tanıdık uzman, hazır katalog ve yönetilen kapsam seçeneklerini bütçe sahibiyle karşılaştır.',
        measure: 'Azalan sorumluluk, karşılanmayan iş ve tercih gerekçesi',
        pass: 'Aynı briefte en iyi hazır yönetilen alternatiften daha az toplam seçim ve kabul yükü oluşur; fayda geçiş maliyetini karşılar.',
        fail: 'Alıcı yalnız daha ucuz uzman ister veya mevcut ilişkisi yeterlidir.',
      },
      {
        assumption: 'Uzman yeterliği teslim kalitesine bağlanabilir.',
        action:
          'Seçili kategoride uzman örnek işini briefin kabul ölçütleriyle incele; örnek teslimi kontrol et.',
        measure: 'Profil iddiası ile teslim eşliği ve düzeltme yükü',
        pass: 'Yeterlik ve kabul aynı ölçüte bağlanır; eksikler şeffaf kalır.',
        fail: 'Eşleştirme yalnız profile dayanır, kalite sonradan belirsiz kalır.',
      },
      {
        assumption: 'Yönetilen hizmetin katkısı pozitiftir.',
        action:
          'Bir örnek işte uzman, satış, eşleştirme, revizyon ve uyuşmazlık emeğini ayrı kaydet.',
        measure: 'İş başına tam hizmet yükü ve tekrar kullanılabilir adımlar',
        pass: 'Alıcının değer verdiği bedelle karşılanabilecek açık maliyet tabanı oluşur.',
        fail: 'Görünen komisyon kurucu ve kalite emeği sayılınca erir.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: null,
      economics: null,
    },
    conclusion:
      'Hazır yönetilen uzman seçeneklerine karşı ayrı geçiş nedeni henüz kurulmadı. Uzman kalitesi, kapsam ve teslim sorumluluğu farkını tek kategoride daralt; genel pazaryeri geliştirmesini ilk yatırım yapma.',
  },
  {
    id: 'cups-clouds',
    position: 'product',
    buyer: {
      user: 'Şubeler ile e-ticaret kanalının sipariş, iade ve stok farkını izleyen operasyon sorumlusu',
      decisionMaker: 'Operasyon yöneticisi veya genel müdür',
      payer: 'Kahve zinciri işletmesi',
      firstSegment:
        'Hipotez: mevcut satış kanalları arasında sipariş-iade-stok farkını uzlaştıran küçük zincir',
      excluded:
        'Cups & Clouds örnek işletme bağlamıdır; marka veya tarihli sunum bütün pazarda ürün talebi kanıtı değildir.',
    },
    problem: {
      workflow:
        'Bir sipariş ve iadenin farklı sistemlerdeki stok ve ölçüm sonuçlarını uzlaştırmak',
      trigger: 'İade, stok uyuşmazlığı veya kanal verisi farkı',
      frequency: 'İşlem ve uyuşmazlık oldukça; gerçek sıklık bilinmiyor.',
      cost: 'Fark arama, tekrar giriş ve yanlış operasyonu düzeltme emeği; parasal kayıp ölçülmedi.',
    },
    offer: {
      outcome:
        'Tek kanalın sipariş-iade-stok zincirinde eksik veya tutarsız olayı kaynaklarıyla göstermek',
      buyReason:
        'Hipotez: mevcut mağaza ve POS sistemini koruyarak sistemler arası farkı daha az elle uzlaştırmak',
      smallestScope:
        'Tek şube veya kanal, sentetik sipariş-iade-stok örnekleri ve kabul edilen fark raporu. Bütün dijital pazarlama ve mağaza dönüşümünü aynı ürün sayma.',
    },
    alternatives: [
      {
        name: 'Shopify sipariş, iade ve konum stok yönetimi',
        url: 'https://help.shopify.com/en/manual/inventory-and-locations',
        claim:
          'Stok, konum, iade ve geri ödeme yönetimi hazır ticaret altyapısında var.',
        limitation:
          'Mevcut mağaza ve POS bağlantısının bütün uzlaştırma ihtiyacını karşıladığı ileri sürülmez.',
      },
      {
        name: 'Mevcut POS / mağaza raporu ve hesap tablosu',
        url: null,
        claim:
          'Operasyon sorumlusu kanal raporlarını alıp farkları tabloda karşılaştırabilir.',
        limitation:
          'Güncel kullanılan sistem ve gerçek iş yükü henüz karşılaştırılmadı.',
      },
    ],
    competition: {
      copyable: 'Sipariş ekranı, gösterge paneli, genel kampanya ve AI raporu',
      advantage: null,
      missingAdvantage:
        'Tekrar kullanılabilir kanal kuralı, farklı zincirde kabul ve düşük entegrasyon desteği gösterilmedi.',
      counterargument:
        'Mevcut ticaret altyapısının yapılandırılması veya integratörün küçük düzeltmesi farkı daha düşük toplam maliyetle çözebilir.',
    },
    distribution: {
      channel:
        'Kahve zincirlerine hizmet veren POS veya e-ticaret uygulayıcısına uzlaştırma örneği',
      access: 'unknown',
      firstOffer:
        'Aynı sipariş ve iadeyi mevcut raporla ve olay zinciriyle yan yana izleme',
      steps: [
        'Kimliksiz sipariş-iade-stok örneğini hazırla.',
        'Uygulayıcıya mevcut sistemleri koruyan karşılaştırmayı sun.',
        'Tekrar kullanılacak kuralı, fark açıklamasını ve kurulum yükünü kaydet.',
      ],
      cost: 'Sistem erişimi, veri eşleme ve uygulayıcı emeği var; işletme veya ortak erişimi elde gösterilmedi.',
    },
    economics: {
      unit: 'İşletme, kanal veya şube; ücret birimi seçilmedi.',
      recurrence:
        'İşlem ve entegrasyon değişiklikleri tekrar değer yaratabilir; sürekli ücret talebi bilinmiyor.',
      costs: [
        'Kanal ve POS bağlama',
        'Olay eşleme ve tekrar işleme',
        'Stok uyuşmazlığı desteği',
        'Sürüm ve entegrasyon bakımı',
      ],
      risk: 'İşletmeye özel entegrasyon ve kritik stok desteği yazılım gelirini aşabilir; reklam bütçesi ürün geliri sayılmaz.',
    },
    portfolio: {
      consumer: 'Şube ve kanal uzlaştırma çözümü',
      contribution:
        'Olay kimliği, tekrar işleme ve kaynak izi somut ticaret işleminde sınanabilir.',
      opportunityCost:
        'Tek işletmenin bütün operasyonunu ürünleştirmek, dar ve tekrar kullanılabilir entegrasyon katkısını bulmayı geciktirir.',
    },
    evidenceIds: [
      'CONT-REM-BIN-014',
      'CONT-REM-BIN-015',
      'CONT-REM-BIN-016',
      'CONT-REM-BIN-027',
      'CONT-REM-BIN-028',
    ],
    sources: [
      source(
        'PV-CC-01',
        'Shopify stok ve konum yönetimi',
        'https://help.shopify.com/en/manual/inventory-and-locations',
        'Stok miktarı, konum, transfer ve satın alma yönetimi hazır altyapıda sunuluyor.',
        'Mevcut POS ile aynı fark işi veya çapraz sistem eşliği doğrulanmadı.',
      ),
      source(
        'PV-CC-02',
        'Shopify iadeler ve değişimler',
        'https://help.shopify.com/en/manual/fulfillment/managing-orders/returns',
        'İade, değişim ve geri ödeme iş akışları belgeleniyor.',
        'Kahve zincirinin gerçek entegrasyonu veya kabul sonucu değildir.',
      ),
    ],
    experiments: [
      {
        assumption: 'Asıl eksik çapraz sistem farkını bulmaktır.',
        action:
          'Aynı sipariş, iade ve stok örneğini mevcut raporlarla ve dar olay zinciriyle uzlaştır.',
        measure: 'Bulunan fark, yanlış eşleşme ve operatör emeği',
        pass: 'Kaynaklar korunarak fark daha az elle aramayla bulunur.',
        fail: 'Mevcut rapor veya küçük ayar aynı işi daha kolay çözer.',
      },
      {
        assumption: 'Olay işleme güvenilir olabilir.',
        action:
          'Tekrarlanan olay, gecikmiş iade ve eksik stok güncellemesi örneklerini işle.',
        measure: 'Çift sayım, kayıp olay ve yeniden işleme sonucu',
        pass: 'Aynı olay tekrar sonucu bozmaz; eksik zincir açık görünür.',
        fail: 'Stok veya ölçüm tutarı sessizce yanlışlaşır.',
      },
      {
        assumption: 'Çözüm ikinci işletmeye taşınabilir.',
        action:
          'Bağımsız ikinci işletmenin farklı iş kuralı ve veri biçimini aynı sözleşmeyle bağla; özel iş ve destek emeğini kaydet. Aynı işletmedeki şube denemesi bu varsayımı doğrulamaz.',
        measure: 'Tekrar kullanılan kural ve yeni bağlantının bakım yükü',
        pass: 'Ortak yetenek ile işletmeye özel kısım ayrılır; yeni kurulum sınırlı kalır.',
        fail: 'Her işletme baştan entegrasyon projesi olur.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: true,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'İşletme adı yerine sistemler arası uzlaştırma işini ürün hipotezi yap. Hazır altyapıyı koruyan dar çözüm anlamlı olabilir; ikinci bağlamda tekrar kullanılmadan genel SaaS üstünlüğü sayılmaz.',
  },
  {
    id: 'arsam',
    position: 'product',
    buyer: {
      user: 'Belirli arsa türü için alıcı adaylarını değerlendiren emlak profesyoneli',
      decisionMaker: 'Emlak işletmesi sahibi veya portföy sorumlusu',
      payer: 'Emlak işletmesi; doğrudan satıcı ayrı seçenek.',
      firstSegment:
        'Hipotez: tek bölge ve arsa türünde uygun alıcı ile güncel ilanı eşleştiren emlak işletmesi',
      excluded:
        'İlan platformu, finans raporu ve yatırım yönetişim paketi ayrı seçeneklerdir; taslak planlar gerçekleşmiş gelir değildir.',
    },
    problem: {
      workflow:
        'Alıcının gerçek ölçütünü güncel ilanla eşleştirip uygun olmayan başvuruyu ayıklamak',
      trigger: 'Yeni alıcı talebi, ilan değişikliği veya geçersiz kalan teklif',
      frequency: 'İlan ve talep değiştikçe; gerçek tekrar yükü bilinmiyor.',
      cost: 'Uygun olmayan görüşme ve eski ilan kontrolü emeği; kayıp tutarı bilinmiyor.',
    },
    offer: {
      outcome:
        'Tek bölgede kaynak ve güncelliği açık ilanı, kabul ölçütleri tanımlı alıcı talebiyle eşleştirmek',
      buyReason:
        'Hipotez: ilan sayısını artırmak yerine emlak işletmesinin kabul ettiği uygun başvuru ve güncel bilgiyle eleme emeğini azaltmak',
      smallestScope:
        'Tek bölge ve kategori, izinli ilan kaynağı, ilan güncelliği ve kabul edilen başvuru tanımı. Ulusal pazaryeri ve yatırım getirisi raporu ekleme.',
    },
    alternatives: [
      {
        name: 'Hepsiemlak',
        url: 'https://www.hepsiemlak.com/en',
        claim:
          'Arsa dahil kategoriler, bölge ve özellik aramasıyla hazır ilan ağı var.',
        limitation:
          'Aynı alıcının eleme ve uygun başvuru sonucu karşılaştırılmadı.',
      },
      {
        name: 'sahibinden arsa ilanları',
        url: 'https://www.sahibinden.com/satilik-arsa/sahibinden',
        claim:
          'Arsa ilanlarını bölge, fiyat ve özellik bilgileriyle sunan mevcut alternatif.',
        limitation:
          'Kamuya açık arama kaydı görüldü; oturum içi işlev ve veri güncelliği bağımsız doğrulanmadı.',
      },
      {
        name: 'Emlakçının kendi ağı, telefon ve portföy tablosu',
        url: null,
        claim:
          'Profesyonel bildiği portföyü ve alıcı talebini doğrudan eşleştirebilir.',
        limitation: 'Mevcut ilişkinin niteliği ve eleme yükü gözlenmedi.',
      },
    ],
    competition: {
      copyable:
        'İlan sayfası, filtre, başvuru formu, AI açıklama ve genel doğrulandı rozeti',
      advantage: null,
      missingAdvantage:
        'Güncel izinli portföy, alıcı ilişkisi, kabul edilmiş başvuru kalitesi ve tekrar dağıtım ağı yok.',
      counterargument:
        'Mevcut büyük ilan ağı veya emlakçının kendi ilişkisi daha fazla seçenek ve daha az geçiş yükü sunabilir; doğrulama etiketi tek başına fark değildir.',
    },
    distribution: {
      channel:
        'Tek bölgedeki emlak işletmesine belirli arsa talebi ve eleme örneği',
      access: 'unknown',
      firstOffer:
        'Aynı alıcı ölçütünü mevcut portal ve kaynaklı dar eşleştirmeyle karşılaştırma',
      steps: [
        'Bölge, kategori ve uygun başvuru kabulünü açık tanımla.',
        'Güncellik ve kaynağı belirtilmiş örnek portföy hazırla.',
        'İşletmeye aynı talepte eleme ve tercih karşılaştırması sun.',
      ],
      cost: 'İlan temini, güncellik teyidi ve başvuru ayıklama emeği var; emlak işletmesi veya portföy erişimi gösterilmedi.',
    },
    economics: {
      unit: 'Kabul edilen başvuru, portföy veya işletme; ücret birimi seçilmedi.',
      recurrence:
        'Yeni talep ve ilan değişimi tekrar değer yaratabilir; düzenli ödeme ve kabul bilinmiyor.',
      costs: [
        'İlan güncelliği ve kaynak kontrolü',
        'Alıcı ölçütünü netleştirme',
        'Moderasyon ve başvuru desteği',
        'İki taraflı erişim ve satış',
      ],
      risk: 'Uygun başvuru üretmek yoğun insan emeğine bağlı olabilir; form doldurma satış veya nitelikli talep sayılmaz.',
    },
    portfolio: {
      consumer: 'Arsam dar ilan ve başvuru eşleştirme ürünü',
      contribution:
        'Güncellik, kaynak, kabul ölçütü ve durum izini somutlaştırır.',
      opportunityCost:
        'Ulusal ilan ağını önce kurmak, yerel alıcı ve portföy erişimi eksikken büyük geliştirme ve edinme yükü yaratır.',
    },
    evidenceIds: [
      'CONT-REM-BIN-017',
      'CONT-REM-BIN-018',
      'CONT-REM-BIN-020',
      'CONT-REM-BIN-021',
      'CONT-REM-BIN-022',
    ],
    sources: [
      source(
        'PV-AR-01',
        'Hepsiemlak',
        'https://www.hepsiemlak.com/en',
        'Arsa dahil ilan kategorileri ve bölge bazlı arama mevcut.',
        'Satıcı ve alıcı kalitesi, ilan güncelliği ve aynı talep sonucu ölçülmedi.',
      ),
      source(
        'PV-AR-02',
        'sahibinden arsa ilanları',
        'https://www.sahibinden.com/satilik-arsa/sahibinden',
        'Kamuya açık arsa ilan arama kaydında fiyat ve özellik bilgileri var.',
        'Arama dizini gözlemi; oturum içi özellik ve ilan doğruluğu kabulü değildir.',
      ),
    ],
    experiments: [
      {
        assumption: 'Dar eşleştirme mevcut portaldan daha faydalıdır.',
        action:
          'Aynı alıcı ölçütünü mevcut portal, emlakçı portföyü ve dar eşleştirmede uygula.',
        measure: 'İlgisiz seçenek, güncel bilgi ve eleme emeği',
        pass: 'İşletme belirli ölçütte daha az eleme işiyle kabul edilebilir seçenek bulur.',
        fail: 'Mevcut portal veya ilişki ağı daha iyi sonuç verir.',
      },
      {
        assumption: 'Güncellik maliyeti sürdürülebilir.',
        action:
          'Fiyatı veya durumu değişen ilanı kaynağına bağla; eski sürüm ve erişimi nasıl yönettiğini göster.',
        measure: 'Teyit emeği, eski bilgi ve izlenebilir değişiklik',
        pass: 'Eski bilgi açık görünür ve güncelleme sorumluluğu uygulanabilir kalır.',
        fail: 'İlanlar insan takibi olmadan hızla geçersizleşir.',
      },
      {
        assumption: 'Uygun başvuru gerçek kabul işidir.',
        action:
          'İşletmeyle başvuru kabul ölçütünü önceden yaz; örnek talepleri aynı ölçütle ayır ve takip yükünü kaydet.',
        measure: 'Kabul gerekçesi, takip edilen talep ve başvuru başına emek',
        pass: 'İşletme kabul ettiği başvuruyu gerçekten kullanır ve değer nedenini açıklar.',
        fail: 'Başvurular yalnız form sayısıdır veya yoğun insan elemesiyle ayakta kalır.',
      },
    ],
    facts: {
      buyer: true,
      problem: true,
      switching: null,
      differentiation: null,
      channel: null,
      recurrence: true,
      economics: null,
    },
    conclusion:
      'Filtreli ilan sitesi mevcut ağlar karşısında yeterli gerekçe değil. Tek bölgenin eleme işi ve uygun başvuru kabulünü daralt; alıcı ve portföy erişimi olmadan ulusal platformu önce kurma.',
  },
];

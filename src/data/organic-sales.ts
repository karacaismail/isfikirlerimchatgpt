import type { Assessment } from '../lib/strategy';

// Kaynakta görülen ürün biçimlerinden çıkarılan potansiyel hipotezleri.
// Kanal örnekleri erişim, talep, satış veya tahsilat kanıtı değildir.
export const organicSalesAssessments: Record<string, Assessment> = {
  atonota: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Çatı markanın tek bir satış yolu yok. Studio için site sahibinin kendi verisinden anlaşılır analiz çıktısı alması; WordPress bağlantısı, örnek analiz içeriği ve kullanıcı tavsiyesi üzerinden reklamsız keşif hipotezi oluşturur. Alıcının raporu işe yarar bulması ve kurulumu yardım almadan yapabilmesi gösterilmedi.',
    evidenceIds: [
      'pa05',
      'personal-cont-45cc4166f9b0c2a7',
      'personal-cont-d51a189e7283f8e6',
      'personal-cont-0ce36a8cabc991d6',
    ],
    verification:
      'Studio için tek alıcı problemi ve örnek rapor tanımla; izinli kullanıcı denemesinde reklamsız erişim kaynağını, bağlantıdan ilk anlamlı sonuca geçişi ve tekrar kullanımı kaydet. Özel kurulum, rapor yorumlama ve adapter bakımının her kullanıcıda istediği emeği ayrı ölç; ajans kitlesine erişimi varsayma.',
    decisionImpact:
      'Anlaşılır analiz çıktısı ve düşük kurulum desteği birlikte gösterilirse Studio diliminin önceliği güçlenir. Çatı marka genişliği veya WordPress bağlantı kodu tek başına satılabilirlik kabulü değildir.',
  },
  titanlar: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Maliyet ve kâr sorusuna kullanıcının kendi girdisiyle hemen sonuç veren hesaplayıcı, açıklayıcı içerik ve paylaşılabilir hesap bağlantısı üzerinden reklamsız keşfe elverişli bir hipotez sunar. Ücretsiz hesap sonucunu paylaşmak, ücretli yazılıma ihtiyaç duyulacağını veya dönüşüm olacağını kanıtlamaz.',
    evidenceIds: ['pt03', 'personal-cont-75c05faf5a465300'],
    verification:
      'Formülleri doğruladıktan sonra hesap sonucuna yardım almadan ulaşmayı, izinli paylaşım bağlantısından gelen denemeyi ve tekrar kullanımı gözle. Kullanıcının hangi ek iş için ödeme değerini gördüğünü araştır; içerik güncelleme, formül bakımı ve birebir açıklama yükünü kaydet.',
    decisionImpact:
      'Kısa ve paylaşılabilir bir değer gösterimi yazılım dilimini cazip kılabilir; ücretli ürün sınırı ve destek yükü belirsizdir.',
  },
  hrms: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'İzin talebi ve onay akışı, İK sorumlusunun dağınık kayıt ve karar takibi problemini somut demoyla anlatma hipotezi sunar. Kullanıcı tavsiyesi veya İK danışmanı yönlendirmesi sınanabilir kanallardır; bu kişilere erişim ve geniş İK ürününün kendi kendine kurulabilirliği gösterilmedi.',
    evidenceIds: ['ph01', 'strategy-proposal-hrms'],
    verification:
      'Sentetik çalışan ve izin örneğiyle alıcı ile kullanıcıyı ayıran bir demo hazırla; reklamsız denemenin kaynağını, ilk talep/onay sonucunu ve tekrar kullanımı kaydet. Veri taşıma, rol kurulumu, eğitim ve devam eden destek emeğini ölç; danışman yönlendirmesini mevcut anlaşma sayma.',
    decisionImpact:
      'Dar izin akışının anlaşılması ve düşük uyarlama yükü gösterilirse organik satış gerekçesi güçlenir. Bordro dahil geniş modül listesi kanıt yerine geçmez.',
  },
  metaframer: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'MetaFramer için ilk katkı, tüketici ürünün kurulum ve işlem güvenilirliğini iyileştirmek olabilir; altyapıyı doğrudan bağımsız satılacak ürün saymak erken olur. Sürümlü SDK, örnek tüketici ve geliştirici belgeleri reklamsız keşif yolu hipotezidir; kod varlığı dış ekibin yardım almadan kullanabildiğini göstermez.',
    evidenceIds: [
      'personal-cont-264ff62bc328b6c6',
      'personal-cont-f32229f7ba217487',
      'personal-cont-5218cd717caa5fc9',
    ],
    verification:
      'Seçilen tüketici üründe ilk kurulum, kayıt işlemi ve hata çözümünü gözle; ortak parçanın ürünün demo veya kullanım sonucuna etkisini kaydet. Dış kullanım ayrıca hedefleniyorsa bağımsız geliştirici denemesinde belgeyle tamamlama ve yardım ihtiyacını ölç; sürüm desteği ve entegrasyon bakımını hesaba kat.',
    decisionImpact:
      'Öncelik, tüketici ürünün reklamsız benimsenmesini kolaylaştıran somut katkıyla artabilir. SDK indirme veya kaynak ilgisi satış kanıtı değildir; bağımsız altyapı pazarı ve geliri varsayılmaz.',
  },
  pim: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Ürün verisindeki eksikleri gösterip kullanılabilir kanal çıktısı üretmek, e-ticaret operatörüne kendi verisiyle görünür değer sunma hipotezidir. Örnek katalog, entegrasyon belgeleri ve uygulayıcı tavsiyesi reklamsız erişim yolu olabilir; kanal çıktısının bulunması alıcı erişimini veya satış dönüşümünü kanıtlamaz.',
    evidenceIds: [
      'personal-cont-15ecf3add98aa743',
      'personal-cont-c3c2d506536ac22d',
      'strategy-proposal-pim',
    ],
    verification:
      'İzinli veya sentetik katalogla içe alma, hata açıklaması ve kanal çıktısı demosu kur; reklamsız deneme kaynağını ve kullanıcı yardım ihtiyacını kaydet. Tekrar yayın ihtiyacını, veri temizleme/alan eşleme emeğini ve kanal değiştikçe gereken bakımı ölç; entegratör kitlesini hazır dağıtım kabul etme.',
    decisionImpact:
      'Tek kanalda kendi verisiyle anlaşılır çıktı ve tekrar kullanım gösterilirse PIM önceliği güçlenir. Her müşteri için özel eşleme gerekiyorsa satış ve bakım emeği bu avantajı azaltır.',
  },
  ibys: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Ziyaret ve kapasite çakışmasını açıklayan plan, OSGB yöneticisine somut operasyon değeri gösterme hipotezidir. Alan içi tavsiye ve örnek plan içeriği reklamsız erişim için sınanabilir; mesleki çevreye erişim, satın alma yetkisi ve resmî entegrasyon kabulü gösterilmedi.',
    evidenceIds: [
      'pi01',
      'personal-cont-18c5fa0486a0353f',
      'strategy-proposal-ibys',
    ],
    verification:
      'Sentetik portföyde çakışmasız ziyaret planını alıcı ve profesyonel kullanıcıya ayrı göster; deneme kaynağını, sonucun anlaşılmasını ve tekrar planlama ihtiyacını kaydet. İlk veri aktarımı, eğitim ve portföy uyarlama emeğini ölç; demo kapsamını resmî gönderim veya sağlık verisi işlemi olarak sunma.',
    decisionImpact:
      'Somut planlama faydası ve erişilebilir bir tavsiye yolu birlikte gösterilirse yatırım gerekçesi güçlenir. Ağır kurulum ve sürekli alan desteği avantajı azaltabilir.',
  },
  genui: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'GenUI altyapısının reklamsız satışa katkısı, tüketici ERP ürününde kullanıcının bir işi güvenilir biçimde tamamlamasını kolaylaştırması olabilir. Satın alma taslağı ve onay demosu, örnek uygulama ve geliştirici içeriğiyle keşif hipotezi sunar; şema ve AI arayüzünün varlığı alıcı değeri veya bağımsız platform talebi değildir.',
    evidenceIds: ['CONT-REM-SRC-001', 'strategy-proposal-genui'],
    verification:
      'Tek ERP tüketicisinde taslaktan onaylı işleme geçişi gerçek kullanıcı yetkisiyle doğrula; reklamsız erişim kaynağını, sonucun anlaşılmasını ve tekrar işlem ihtiyacını kaydet. Şirket verisine uyarlama, model/araç maliyeti, hata çözümü ve eğitim emeğini ölç; ortak geliştirici kitlesini erişilebilir sayma.',
    decisionImpact:
      'Tüketici üründe anlaşılır değer ve düşük uyarlama yükü gösterilirse gereken GenUI parçası öne çıkabilir. Platform gösterisi tek başına satış potansiyelini doğrulamaz; altyapı satışı ayrı hipotez olarak kalır.',
  },
  woocommnts: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Mağaza sahibinin mevcut yorumlarını seçip görünür sunuma dönüştürmesi, kısa kurulum demosuyla anlaşılabilecek bir değer hipotezidir. Eklenti ekosistemi içeriği ve mağaza/uygulayıcı tavsiyesi reklamsız keşif yolu olabilir; bu kanallara kabul, erişim ve ücretli farkın değeri gösterilmedi.',
    evidenceIds: ['CONT-REM-SRC-002', 'strategy-proposal-woocommnts'],
    verification:
      'Yorum seçimi, kaydetme ve güvenli ön yüz sonucunu örnek mağazada doğrula; yardım almadan kurulum, reklamsız deneme kaynağı ve tekrar kullanımını gözle. Tema/eklenti uyumu, moderasyon senaryoları ve sürüm desteği emeğini ölç; satış artışı iddiasını yorum gösterimiyle eşitleme.',
    decisionImpact:
      'Dar eklenti sınırı ve görünür sonuç organik keşif hipotezini güçlendirebilir. Boş slider veya yoğun uyumluluk desteği bu avantajı azaltır; eklenti biçimi tek başına satılabilirlik garantisi değildir.',
  },
  destektesvik: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Şirket profiline kaynaklı ön uygunluk açıklaması vermek, program arayan alıcının araştırma yüküne görünür cevap sunma hipotezidir. Açıklayıcı program içeriği ve danışman tavsiyesi reklamsız erişim yolu olarak sınanabilir; yönlendirme ağı, güncel kaynakla tekrar kullanım ve ücretli değer gösterilmedi.',
    evidenceIds: ['CONT-REM-SRC-003', 'strategy-proposal-destektesvik'],
    verification:
      'Kaynak geçerliliği davranışını uzlaştırıp örnek profillerde açıklanabilir sonuç göster; reklamsız deneme kaynağı, kullanıcının gerekçeyi anlaması ve tekrar kontrol ihtiyacını kaydet. Program güncelleme, yanlış beklentiyi düzeltme ve danışman desteği emeğini ölç; ön uygunluğu destek kazanma garantisi sayma.',
    decisionImpact:
      'Güncel kaynakla anlaşılır sonuç ve tekrarlayan ihtiyaç gösterilirse öncelik artabilir. İçerik ve kural bakımı her programda ağırlaşıyorsa reklamsız edinimin avantajı azalır.',
  },
  lifeos: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Zaman kaydı ve günlük özet, bireyin kendi verisiyle yardım almadan deneyebileceği bir fayda hipotezidir. Kullanım örneği içeriği ve kullanıcı tavsiyesi reklamsız keşif yolu olabilir; kişisel verinin paylaşılması gerekmez. Bir kez deneme, kalıcı kullanım veya ücretli yazılım ihtiyacını kanıtlamaz.',
    evidenceIds: [
      'CONT-REM-SRC-004',
      'CONT-REM-SRC-005',
      'strategy-proposal-lifeos',
    ],
    verification:
      'Zaman kaydı, özet ve güvenli geri yüklemeyi doğrula; reklamsız gelen denemede ilk anlamlı özet, sonraki kullanım ve yardım ihtiyacını gözle. Gerçek kişisel kayıtları istemeden paylaşım/tavsiye yolunu sınamayı planla; veri kurtarma, senkronizasyon beklentisi ve destek emeğini kaydet.',
    decisionImpact:
      'Kendi kendine deneme ve tekrar kullanım gösterilirse organik benimsenme gerekçesi güçlenir. Devam etmeyen kullanım veya yoğun veri desteği avantajı azaltır; yerel çalışma ve tavsiye ihtimali satış kanıtı sayılmaz.',
  },
  guardian: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'AI geliştirme oturumunda hangi süreçlerin kaynak tükettiğini açıklayan yerel rapor, geliştiricinin somut sorununa teknik demoyla cevap verme hipotezidir. Dokümante edilmiş örnek rapor ve geliştirici tavsiyesi reklamsız keşif yolu olabilir; mevcut topluluk erişimi ve ödeme isteği gösterilmedi.',
    evidenceIds: ['CONT-REM-SRC-006', 'strategy-proposal-guardian'],
    verification:
      'Salt okunur rapor dilimini gerçek oturum verisinde izinli biçimde doğrula; denemenin kaynağını, raporla alınabilen kararı ve tekrar kullanımını kaydet. İşletim sistemi/model aracı farklılıkları, yanlış süreç aitliği ve kurulum desteği emeğini ölç; rapor değerini yan etkili otomasyon yetkisi sayma.',
    decisionImpact:
      'Dar geliştirici problemi ve açıklanabilir rapor organik keşif için güçlü bir sınama zemini olabilir. Ortam başına yüksek bakım yükü avantajı azaltır.',
  },
  qral: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Link veya QR sonucunun kullanıcının günlük paylaşım işinde hemen kullanılabilmesi, kısa demo ve tavsiye üzerinden reklamsız keşif hipotezi sunar. QR alıcısının ürünü keşfetmesi ayrıca tasarlanıp sınanmalıdır; bir QR üretmek kendiliğinden viral dağıtım veya ücretli talep oluşturmaz.',
    evidenceIds: [
      'CONT-REM-SRC-007',
      'CONT-REM-SRC-086',
      'CONT-REM-SRC-087',
      'strategy-proposal-qral',
    ],
    verification:
      'Kopyalama sonucunu ve şifreleme iddiasını davranışla uzlaştır; yardım almadan ilk kullanım, reklamsız deneme kaynağı ve tekrar paylaşım ihtiyacını gözle. Ücretsiz tek işlemden hangi sürdürülebilir ücretli değerin ayrılabildiğini araştır; tarayıcı uyumu ve güvenli geçmiş bakımını ölç.',
    decisionImpact:
      'Hızlı değer gösterimi ve tekrar ihtiyaç QRal dilimini organik benimsenme için aday kılar. Yaygın paylaşım varsayımı veya üretim sayısı ödeme değeri yerine geçmez; güven iddiası düzeltilmeden tanıtım avantajı kabul edilmez.',
  },
  'e-menu': {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'İşletmenin fiyat değişikliğini ön izleyip yayımlaması, alıcının kendi menüsünde görebileceği bir değer hipotezidir. Örnek yayımlanmış menü ve işletmeci tavsiyesi reklamsız keşfe katkı verebilir; menünün görülmesi işletmenin yazılımı satın alacağı veya ürünün keşfedileceği anlamına gelmez.',
    evidenceIds: ['CONT-REM-SRC-008', 'strategy-proposal-e-menu'],
    verification:
      'Sentetik menüyle güncelleme, yayın ve geri dönüşü doğrula; yardım almadan ilk yayın, reklamsız erişim kaynağı ve sonraki fiyat güncellemesini kaydet. İlk menü girişi, görsel/tema düzenleme ve işletme başına destek emeğini ölç; menü trafiğini alıcı talebiyle ayrı tut.',
    decisionImpact:
      'Görünür çıktı ve düşük kurulum desteği birlikte gösterilirse öncelik güçlenir. Her işletmede elle menü hazırlama veya tema uyarlama gerekiyorsa organik erişimin değeri azalır.',
  },
  simulator: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Varsayımları açık değerlendirme raporu, proje kararı veren kullanıcının yöntemi kendi örneğinde deneyebilmesine ve raporu paylaşmasına izin veren bir potansiyel hipotezidir. Örnek rapor içeriği ve tavsiye reklamsız keşif yolu olabilir; paylaşılan rapor gerçek talep veya karar kalitesi kanıtı değildir.',
    evidenceIds: ['CONT-REM-SRC-009', 'strategy-proposal-simulator'],
    verification:
      'Birim ve güven etiketi risklerini düzeltip aynı girdinin tutarlı raporunu göster; reklamsız deneme kaynağını, gerekçenin anlaşılmasını ve tekrar senaryo kullanımını kaydet. İlk kullanım, her değerlendirmeyi elle yorumlama ve yöntem güncelleme emeğini ölç; araç raporunu kesin yatırım kararı gibi sunma.',
    decisionImpact:
      'Açıklanabilir, paylaşılabilir sonuç ve yardım almadan tekrar kullanım gösterilirse öncelik artabilir. Sürekli danışman yorumu gereksinimi veya anlaşılmayan varsayımlar avantajı azaltır.',
  },
  hakedis: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Dönem ve taşeron mutabakatında girdiye bağlı fark raporu, hesapla uğraşan alıcıya somut değer gösterme hipotezidir. Anonim örnek hesap içeriği ve mesleki tavsiye reklamsız erişim için sınanabilir; sektörel erişim, hesap güveni ve standart veriyle kendi kendine kullanım gösterilmedi.',
    evidenceIds: [
      'CONT-REM-SRC-010',
      'CONT-REM-SRC-013',
      'strategy-proposal-hakedis',
    ],
    verification:
      'Onaylı sentetik hesap örneklerinde kaynak girdiden fark raporuna geçişi göster; alıcı rolünü, reklamsız deneme kaynağını ve tekrar dönem ihtiyacını kaydet. Sözleşme/formül uyarlama, Excel/veri taşıma ve hesap açıklama emeğini ölç; teklif raporu üreticisini çalışan hesap motoru sayma.',
    decisionImpact:
      'Tekrarlayan mutabakat problemi ve anlaşılır fark çıktısı önceliği güçlendirebilir. Her sözleşmede özel hesap geliştirmek gerekiyorsa satış ve bakım emeği yüksek kalır.',
  },
  'wordpress-niche': {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Üç eklenti fikrinin alıcısı ve değer gösterimi ayrı sınanmalıdır. Seçilen izin kaydı için anlaşılır sürüm/kanıt çıktısı; eklenti içeriği ve uygulayıcı tavsiyesi üzerinden reklamsız keşif hipotezi sunar. Planın eklenti biçiminde olması dağıtım kanalına erişim veya hukuki yeterlilik kanıtı değildir.',
    evidenceIds: ['CONT-REM-BIN-008', 'strategy-proposal-wordpress-niche'],
    verification:
      'Tek eklenti problemini seç; kullanıcı tarafından onaylı örnek metinle kurulumdan kanıt çıktısına demoyu sınamayı planla. Reklamsız deneme kaynağını, tekrar kullanımını ve uygulayıcı desteğini kaydet; sürüm/uyumluluk, içerik değişimi ve entegrasyon bakımını ayrı ölç.',
    decisionImpact:
      'Dar problem ve düşük kurulum desteği gösterilirse ilgili eklentinin önceliği artabilir. Üç fikrin ortak çekirdeğini veya planlanan entegrasyonu tek satılabilir ürün sayma; hukuki uygunluk vaadi ve gerçekleşmiş satış varsayımı kurma.',
  },
  'great-doers': {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Brief ile uzman arasında gerekçeli eşleşme, müşterinin uygun uzman bulma ve uzmanın uygun iş bulma problemlerine değer gösterme hipotezidir. Tavsiye ve paylaşılabilir brief erişim yolu olabilir; iki tarafta yeterli katılımcı, güven ve eşleşme kalitesi gösterilmedi. Profil veya kategori listesi bu açığı kapatmaz.',
    evidenceIds: [
      'CONT-REM-BIN-009',
      'CONT-REM-BIN-010',
      'strategy-proposal-great-doers',
    ],
    verification:
      'Tek brief alanında sentetik akışı kur; izinli denemede her iki tarafın reklamsız erişim kaynağını ve anlamlı eşleşmeye ilerlemesini ayrı kaydet. Uzman bulma, profil doğrulama, elle eşleştirme, uyuşmazlık ve teslim takibi emeğini ölç; mevcut ağ veya otomatik büyüme varsayma.',
    decisionImpact:
      'Somut ve tekrarlanabilir eşleşme ile erişilebilir iki taraf gösterilirse potansiyel güçlenir. Sürekli elle arz oluşturma ve eşleştirme gereksinimi avantajı azaltır.',
  },
  'cups-clouds': {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Sipariş, iade ve stok farkını açıklayan rapor, mağaza operasyonunda görünür bir problem çözme hipotezidir. İç kullanım öğrenme sağlayabilir; dış satış potansiyeli ayrıca benzer işletme ve entegrasyon uygulayıcısı tavsiyesiyle sınanmalıdır. Tarihli mağaza belgeleri hazır alıcı veya dağıtım kanıtı değildir.',
    evidenceIds: [
      'CONT-REM-BIN-027',
      'CONT-REM-BIN-028',
      'strategy-proposal-cups-clouds',
    ],
    verification:
      'Tek kanalda sentetik olaylardan uzlaştırma raporunu üret; iç kullanım sonucu ile dış alıcının reklamsız deneme kaynağını ayrı kaydet. Kanal bağlama, veri düzeltme, olay istisnası ve sürüm bakımı emeğini ölç; her mağazanın aynı süreç ve veriye sahip olduğunu varsayma.',
    decisionImpact:
      'Tekrarlayan fark problemi ve başka işletmeye düşük uyarlama yükü gösterilirse ürünleştirme önceliği artabilir. Tek işletmeye özel çözümün değeri ayrı kalır; işletmenin varlığı yazılım satışını veya peşinatı göstermez.',
  },
  arsam: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Doğrulanmış ilan ile doğru alıcı talebini bağlamak, satıcı ve alıcıya görünür değer sunma hipotezidir. İlan paylaşımı ve yerel tavsiye reklamsız erişim yolu olarak sınanabilir; yeterli ilan, nitelikli talep ve güven oluşumu gösterilmedi. Paylaşılan ilan trafiği ödeme değeriyle aynı değildir.',
    evidenceIds: [
      'CONT-REM-BIN-017',
      'CONT-REM-BIN-018',
      'strategy-proposal-arsam',
    ],
    verification:
      'Dar bir ilan türünde sentetik doğrulama/moderasyon/talep akışını kur; izinli denemede satıcı ve alıcının reklamsız erişim kaynağını ve anlamlı talebe geçişini ayrı kaydet. İlan bulma, doğrulama, moderasyon, sahte talep ve destek emeğini ölç; mevcut yerel ağa erişimi varsayma.',
    decisionImpact:
      'İki tarafın erişimi ve nitelikli talep birlikte gösterilirse potansiyel güçlenir. Sürekli elle arz oluşturma veya ağır doğrulama yükü avantajı azaltır.',
  },
  'kernel-plan': {
    criterion: 'organicSales',
    state: 'unknown',
    finding:
      'Bu kayıt tarihli altyapı planıdır; bağımsız alıcı ve reklamsız satış yolu kaynaklardan çıkarılamıyor. Olası katkı, MetaFramer ve gerçek tüketici ürünündeki sözleşme/kurulum açıklığını artırmaktır. Planı ayrıca satılabilir ürün saymak aynı altyapı potansiyelini iki kez değerlendirmek olur.',
    evidenceIds: ['CONT-REM-BIN-023', 'CONT-REM-BIN-024'],
    verification:
      'Önce tarihli hedefleri güncel MetaFramer tüketicisiyle eşle; mükerrer potansiyeli tekleştir. Katkıyı tüketici ürünün demo, kurulum ve yardım ihtiyacında ara; yeni bağımsız ürün hedeflenirse alıcı, problem, reklamsız erişim yolu ve sürdürülen destek emeğini ayrıca tanımla.',
    decisionImpact:
      'Bilinmeyen doğrudan satış potansiyeli sıfır puan veya engel yapılmaz. Plan uzlaştırmasının önceliği, gerçek ürünün benimsenmesini veya bakımını iyileştiren somut katkıyla belirlenir.',
  },
  cronbi: {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Portföy çatısının tek alıcı problemi ve tek satış yolu yok. Seçilen alt üründe tamamlanan bir iş, örnek süreç içeriği ve uygulayıcı tavsiyesiyle reklamsız erişim hipotezi oluşturabilir; çok sayıda modül sunumu veya ortak kimlik vizyonu tek başına satın alma gerekçesi değildir.',
    evidenceIds: ['CONT-REM-BIN-025', 'strategy-proposal-cronbi'],
    verification:
      'Tek alt ürünün alıcı problemini ve yardım almadan gösterilebilen sonucunu seç; reklamsız deneme kaynağı ile tekrar kullanımını o üründe kaydet. Ortak altyapının kuruluma katkısını, veri taşıma, uyarlama ve destek emeğini ayrı ölç; bütün portföye hazır müşteri kitlesi varsayma.',
    decisionImpact:
      'Alt ürünün anlaşılır değeri ve düşük kurulum yükü gösterilirse gerekli ortak parça öne çıkabilir. Çatı kapsamı bağımsız ürünlerin organik satış potansiyelini toplama gerekçesi değildir.',
  },
  'cronbi-people': {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Puantajdan dönem kapanışına açıklanabilir fark raporu, İK/bordro sorumlusuna kendi işi üzerinden değer gösterme hipotezidir. Mesleki içerik ve uygulayıcı tavsiyesi reklamsız erişim için sınanabilir; alıcıya erişim, cihaz uyumu ve yardım almadan kullanım gösterilmedi. Modül sunumu talep kanıtı değildir.',
    evidenceIds: ['CONT-REM-BIN-026', 'strategy-proposal-cronbi-people'],
    verification:
      'Onaylı sentetik dönemde kapanış ve fark raporunu göster; alıcı/kullanıcı ayrımı, reklamsız deneme kaynağı ve tekrar kapanış ihtiyacını kaydet. PDKS/veri taşıma, kurum kuralı uyarlama ve hesap açıklama desteğini ölç; HRMS ile kaynak ve satış kitlesini aynı kabul etme.',
    decisionImpact:
      'Tekrarlayan dönem ihtiyacı ve düşük uyarlama yükü gösterilirse öncelik güçlenir. Cihaz ve kurum başına yoğun özel destek avantajı azaltır.',
  },
  'ai-first-ea': {
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'AI komut yüzeyinin ilk katkısı tüketici üründe kullanıcının işi bulup tamamlamasını kolaylaştırmak olabilir; tek bileşen geniş platformun bağımsız satışını kanıtlamaz. Örnek entegrasyon, geliştirici belgesi ve erişilebilir demo reklamsız keşif hipotezidir; paket benimsenmesi ve ödeme değeri gösterilmedi.',
    evidenceIds: ['CONT-REM-SRC-126', 'strategy-proposal-ai-first-ea'],
    verification:
      'Tek gerçek tüketici işleminde komut yüzeyinin ilk anlamlı sonuca katkısını ve yardım ihtiyacını gözle. Dış geliştirici kullanımı hedefleniyorsa örnek entegrasyondan tamamlamaya geçişi ve erişim kaynağını ayrıca kaydet; token/sürüm uyumu, erişilebilirlik ve hata desteği bakımını ölç.',
    decisionImpact:
      'Tüketici ürünün anlaşılmasını ve kurulmasını somut biçimde iyileştirirse gerekli UI parçasının önceliği artabilir. Demo ilgisi bağımsız platform satışına eşitlenmez; altyapı katkısı tüketiciyle birlikte değerlendirilir.',
  },
};

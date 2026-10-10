// Paylaşım ve mevcut kanal, bağımsız kullanıcı getiren döngüyle aynı şey değildir.
export const productGrowth: Record<
  string,
  { loop: string | null; reason: string }
> = {
  atonota: {
    loop: null,
    reason:
      'Ajansın müşteriye rapor göndermesinin başka ajansı alıcı olarak getirdiği gösterilmedi. Raporun alıcı getirdiği gözlenmedi.',
  },
  pim: {
    loop: null,
    reason:
      'Katalog çıktısının kanala gönderilmesi başka mağazayı ürüne davet etmez. Entegrasyon dağıtım imkânıdır; viral döngü gösterilmedi.',
  },
  hrms: {
    loop: null,
    reason:
      'Çalışan ve yönetici davetleri aynı şirket içindeki kullanımı büyütür; başka işletmedeki kullanıcıları getiren döngü gösterilmedi.',
  },
  ibys: {
    loop: null,
    reason:
      'OSGB içindeki uzman ve işyeri koordinasyonu tekrar kullanım sağlayabilir; başka OSGB’nin satın almasını tetiklediği gösterilmedi.',
  },
  titanlar: {
    loop: null,
    reason:
      'Hesap sonucunu alan kişinin neden kendi hesabını oluşturacağı ve başka kullanıcı getireceği mekanizma gösterilmedi. Ücretli dönüşüm ayrıca değerlendirilir.',
  },
  woocommnts: {
    loop: null,
    reason:
      'Mağazadaki yorum görünürlüğü ziyaretçiye yarar sağlayabilir; başka mağazanın eklentiyi seçmesini sağlayan döngü gösterilmedi.',
  },
  destektesvik: {
    loop: null,
    reason:
      'Danışmanın firmaya ön değerlendirme göndermesi müşteri iş akışıdır. Firmanın başka danışman veya firma alıcısı getirmesi henüz gösterilmedi.',
  },
  lifeos: {
    loop: null,
    reason:
      'Kişisel yerel kayıt kullanımında başka kullanıcı daveti gerekmiyor; doğal alıcı kazanma döngüsü tarif edilmedi.',
  },
  guardian: {
    loop: null,
    reason:
      'Tek geliştiricinin süreç gözetiminin başka geliştiriciyi kullanıcı olarak getirdiği gösterilmedi. Ekip kullanımının dağıtım etkisi bilinmiyor.',
  },
  qral: {
    loop: null,
    reason:
      'QR ile bağlantıyı alan kişinin aynı ürünü kurması veya ödemesi gerekmez. Paylaşım özelliği büyüme döngüsü sayılmadı.',
  },
  'e-menu': {
    loop: null,
    reason:
      'Müşterinin restoran menüsünü taraması tek başına başka restoranların kullanıma başlamasını sağlayan döngü göstermez. Şube yayılımı aynı ödeyenin genişlemesi olabilir.',
  },
  simulator: {
    loop: null,
    reason:
      'Senaryo raporu paylaşımı başka kullanıcının tekrar kullanma veya ödeme nedenini göstermiyor.',
  },
  hakedis: {
    loop: null,
    reason:
      'Raporun muhasebeci veya yükleniciyle paylaşımı potansiyel tanışma yaratabilir; alıcı getiren ölçülmüş döngü yok.',
  },
  'wordpress-niche': {
    loop: null,
    reason:
      'Ajansın birçok siteye eklenti kurması bir dağıtım kanalıdır. Site ziyaretçisinin başka bağımsız kullanıcı getirmesi gösterilmedi.',
  },
  'great-doers': {
    loop: null,
    reason:
      'Uzman ve alıcı tarafları birbirini çekebilir; başlangıçta iki tarafta da yeterli eşleşme ve tekrar işlem kanıtı yok. Ağ etkisi varsayımla verilmedi.',
  },
  'cups-clouds': {
    loop: null,
    reason:
      'Şube ve kanal eklemek aynı işletme içindeki yayılımdır; başka işletmeye organik aktarım gösterilmedi.',
  },
  arsam: {
    loop: null,
    reason:
      'İlan stoğu ile alıcı ilgisi birbirini besleyebilir; eldeki gerçek stok ve nitelikli talep bilinmediğinden ağ etkisi kanıtı yok.',
  },
  genui: {
    loop: null,
    reason:
      'Bir ERP işleminin kolaylaşmasının başka ERP işletmesini alıcı olarak getirdiği gösterilmedi. Bağımsız alıcı da netleşmedi.',
  },
  metaframer: {
    loop: null,
    reason:
      'İç tüketicinin artması harici geliştiricinin benimsemesini göstermez. Dış tüketici ve katkı döngüsü kanıtlanmadı.',
  },
  'kernel-plan': {
    loop: null,
    reason:
      'Mimari plan ayrı ürün veya dağıtım yüzeyi olarak tanımlanmadı; bağımsız büyüme döngüsü uygulanabilir değil.',
  },
  cronbi: {
    loop: null,
    reason:
      'Bir çatı altında çok ürün adının bulunması ortak alıcı veya çapraz satış döngüsü kanıtlamaz.',
  },
  'cronbi-people': {
    loop: null,
    reason:
      'Personel ve yönetici daveti aynı kurumdaki kullanımı artırır; başka kurumdaki kullanıcıları getiren döngü gösterilmedi.',
  },
  'ai-first-ea': {
    loop: null,
    reason:
      'Bir uygulamadaki komut arayüzü başka şirketi müşteri yapmaz. Harici tüketici ve benimseme yolu netleşmedi.',
  },
};

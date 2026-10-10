export type ProjectId =
  'titanlar' | 'atonota' | 'pim' | 'hrms' | 'ibys' | 'metaframer';
export type ClusterId = 'paid' | 'domain' | 'internal';
export type CustomerId = 'individual' | 'business' | 'internal';
export type RevenueId = 'service' | 'subscription' | 'internal';

export interface ProjectGuide {
  cluster: ClusterId;
  customerType: CustomerId;
  revenueType: RevenueId;
  summary: string;
  buyer: string;
  firstOffer: string;
  nextStep: string;
  steps: string[];
  effort: string;
}

export const customerLabels: Record<CustomerId, string> = {
  individual: 'Bireysel katılımcı',
  business: 'İşletme',
  internal: 'Kendi geliştirme ekibim',
};

export const revenueLabels: Record<RevenueId, string> = {
  service: 'Eğitim veya hizmet satışı',
  subscription: 'Düzenli kullanım hedefi',
  internal: 'İç kullanım ve zaman tasarrufu',
};

export const projectGuides: Record<ProjectId, ProjectGuide> = {
  titanlar: {
    cluster: 'paid',
    customerType: 'individual',
    revenueType: 'service',
    summary:
      'E-ticaret öğrenmek isteyenlere canlı, uygulamalı eğitim. İlk deneme için uzun bir kurs yerine iki oturumluk atölye öneriliyor.',
    buyer:
      'E-ticarete başlayan veya mevcut mağazasını geliştirmek isteyen kişi.',
    firstOffer:
      'İki canlı oturum, tamamlanacak bir çalışma ve sınırı belli soru-cevap desteği.',
    nextStep:
      'Öğrencinin atölye sonunda neyi tamamlayacağını yaz; eğitmen zamanını ve fiyatı belirle.',
    steps: [
      'Tek bir konu ve teslim edilecek öğrenci çalışması seç.',
      'İki oturumun tarihini, fiyatını, destek ve iade şartlarını yaz.',
      'Ulaşabildiğin uygun kişilere teklif sun; 14 günde beş gerçek ödeme hedefini sına.',
      'Atölyeyi teslim et; hazırlık, ders ve destek saatini, iade ve tamamlanan çalışmaları kaydet.',
    ],
    effort: 'Öneri: 6–10 saat hazırlık ve satış; ders ve takip süresi ayrıca.',
  },
  atonota: {
    cluster: 'paid',
    customerType: 'business',
    revenueType: 'service',
    summary:
      'AtonotA birden fazla işin çatı markası. İlk gelir için bir işletmenin tek işini çözen, kapsamı belli hizmetle başlamak öneriliyor.',
    buyer:
      'Seçilen hizmetin bütçesine karar veren işletme sahibi veya ekip yöneticisi.',
    firstOffer:
      'Bir müşteri için tek iş akışı; yazılı teslim ölçütü ve kapsam dışı işler.',
    nextStep:
      'Hangi müşterinin hangi işini teslim edeceğini netleştir; erişimleri ve peşinatı doğrula.',
    steps: [
      'Çatı markanın altında hizmet, AgencyOps veya Studio’dan tek ticari yol seç.',
      'Bir müşterinin tek işini, teslim ölçütünü ve kapsam dışı talepleri yaz.',
      'Gerekli erişimleri ve dış hizmet bağımlılıklarını kontrol et; fiyat ve peşinatı netleştir.',
      'İşi teslim et; harcanan saati, müşterinin kabulünü ve ikinci ücretli talebi kaydet.',
    ],
    effort: 'Öneri: 6–10 saat keşif ve teklif; teslim ayrıca hesaplanır.',
  },
  pim: {
    cluster: 'paid',
    customerType: 'business',
    revenueType: 'subscription',
    summary:
      'Satıcının dağınık ürün bilgisini satış kanalına uygun hale getirme fikri. İlk iş: 100 ürün satırını (SKU) tek kanal için düzeltmek.',
    buyer:
      'Ürün kataloğundan sorumlu e-ticaret veya ürün operasyonu yöneticisi.',
    firstOffer:
      '100 SKU için tek kanal alan eşlemesi, hata listesi ve onaylı aktarım dosyası.',
    nextStep:
      'Bir satıcının son katalog aktarımındaki hataları incele ve 100 SKU için ücretli iş öner.',
    steps: [
      'Tek satıcı, tek satış kanalı ve izinli 100 SKU örneği seç.',
      'Eksik alanları ve eşleme hatalarını çıkar; işin fiyatını ve teslim ölçütünü yaz.',
      'Düzeltilen dosyayı müşteriyle kontrol et; kanalın kabul ettiği sonucu ve süreyi ölç.',
      'İkinci güncelleme için tekrar ödeme isteğini sına; ürün geliştirmeyi bu sonuca bağla.',
    ],
    effort: 'Öneri: 6–10 saat keşif; 8–16 saat ilk eşleme deneyi.',
  },
  hrms: {
    cluster: 'domain',
    customerType: 'business',
    revenueType: 'subscription',
    summary:
      'Çalışan, izin ve puantaj işlerini kolaylaştırma fikri. Genel İK yazılımından önce bir uzmanın desteğiyle tek onay süreci seçilmeli.',
    buyer:
      'İK bütçesine karar veren işletme sahibi veya yönetici; hedef işletme türü henüz seçilmedi.',
    firstOffer:
      'Tek işyerinin izin veya puantaj onayını incelemek ve dar bir çözüm denemek.',
    nextStep:
      'Bir İK alan ortağı bul; işletmelerin aynı süreçte yaşadığı tekrar işi araştır.',
    steps: [
      'İK sürecini ve doğruluk kurallarını bilen bir alan ortağı belirle.',
      'Beş işletmede son izin veya puantaj kapanışını incele; ortak sorunu ve kayıp saati kaydet.',
      'Tek işyeri ve iki rol için sentetik verilerle onay akışını dene.',
      'Dar kapsamlı ücretli pilot öner; bir sonraki dönemde tekrar kullanım ve ödeme isteğini ölç.',
    ],
    effort: 'Öneri: 8–12 saat süreç araştırması; alan ortağı gerekli.',
  },
  ibys: {
    cluster: 'domain',
    customerType: 'business',
    revenueType: 'subscription',
    summary:
      'Ortak sağlık ve güvenlik birimlerinin (OSGB) ziyaret, eğitim ve personel planını yönetme fikri. İlk deneme planlama işiyle sınırlı.',
    buyer: 'OSGB sahibi veya operasyon bütçesinden sorumlu yönetici.',
    firstOffer:
      'Bir OSGB için dört haftalık ziyaret ve eğitim planı; çakışma ve görev takibi.',
    nextStep: 'Bir OSGB alan ortağıyla son ayın planlama sorununu incele.',
    steps: [
      'Bir OSGB alan ortağı ve ödeme kararını veren kişiyi belirle.',
      'Son ayın ziyaret ve eğitim planında tekrar eden sorunu ve harcanan saati bul.',
      'Kimliksiz veya sentetik bilgilerle dört haftalık planı mevcut yöntemle karşılaştır.',
      'İkinci dönem için tekrar ödeme ve destek süresini ölç; sağlık kaydı ve resmî gönderimi ayrı tut.',
    ],
    effort: 'Öneri: 8–12 saat araştırma; 8–16 saat planlama deneyi.',
  },
  metaframer: {
    cluster: 'internal',
    customerType: 'internal',
    revenueType: 'internal',
    summary:
      'Birden fazla iş uygulamasında tekrar edilen teknik işleri ortaklaştırma çalışması. Değeri, seçilen ürünün teslim süresini azaltmasıyla ölçülmeli.',
    buyer: 'İlk aşamada kendi geliştirme ekibin; dış alıcı henüz doğrulanmadı.',
    firstOffer: 'Seçilen ürünün tek görevinde zaman ve hata karşılaştırması.',
    nextStep:
      'Devam eden bir üründen tekrar eden tek teknik görev seç; mevcut yöntemle harcanan süreyi kaydet.',
    steps: [
      'Seçilen üründeki tekrar eden tek teknik görevi ve ölçüm yöntemini yaz.',
      'Aynı görevi mevcut yöntem ve ortak çekirdekle karşılaştır; bakım süresini de kaydet.',
      'Başka bir geliştiricinin yalnız kurulum belgesiyle örneği kullanmasını dene.',
      'Net zaman kazancı yoksa kapsamı büyütme; ilk keşfi haftada en fazla iki saatle sınırla.',
    ],
    effort: 'Önerilen ilk sınır: haftada en fazla 2 saat keşif.',
  },
};

export interface GuideCluster {
  value: ClusterId;
  label: string;
  description: string;
  steps: string[];
  projectIds: ProjectId[];
}

export const guideClusters: GuideCluster[] = [
  {
    value: 'paid',
    label: 'Ücretli pilotlar',
    description:
      'Küçük bir işi satıp teslim ederek başla. Amaç ilk ödeme, gerçek iş yükü ve tekrar talebi görmek.',
    steps: [
      'Ulaşabildiğin müşteriye göre tek proje seç.',
      'Teslim edilecek sonucu, fiyatı ve süreyi yaz.',
      'Ücretli küçük işi teslim et; toplam emek ve sonucu kaydet.',
      'Tekrar ödeme varsa kapsamı genişlet; yoksa teklifi veya müşteriyi değiştir.',
    ],
    projectIds: ['titanlar', 'atonota', 'pim'],
  },
  {
    value: 'domain',
    label: 'Alan ortağı gerekenler',
    description:
      'İK ve iş güvenliği süreçlerinde önce işi ve kuralları bilen bir ortak bul. İlk deneyi tek süreçle sınırla.',
    steps: [
      'Alanı bilen ortak ve bütçeye karar veren kişiyi bul.',
      'Tek bir tekrar işi, sıklığı ve maliyetiyle tanımla.',
      'Dar akışı sentetik veya kimliksiz bilgilerle karşılaştır.',
      'Ücretli pilot ve ikinci dönem talebi görmeden genel ürün kapsamını büyütme.',
    ],
    projectIds: ['hrms', 'ibys'],
  },
  {
    value: 'internal',
    label: 'İç araçlar',
    description:
      'Önce seçtiğin işin teslimini hızlandır. Teknik altyapıyı ayrı bir satış projesine çevirmeden faydasını ölç.',
    steps: [
      'Seçilen ürünün tekrar eden tek görevini belirle.',
      'Mevcut yöntemle süre ve hata kaydı tut.',
      'Ortak araçla aynı görevi yap; kurulum ve bakım yükünü ekle.',
      'Net kazanım ve bağımsız kullanım varsa devam et.',
    ],
    projectIds: ['metaframer'],
  },
];

export function guideFor(id: string): ProjectGuide {
  const guide = projectGuides[id as ProjectId];
  if (!guide) throw new Error(`Proje rehberi bulunamadı: ${id}`);
  return guide;
}

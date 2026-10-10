import type { GoalId } from '../lib/strategy';
export const developmentPaths: {
  id: GoalId;
  title: string;
  description: string;
  steps: string[];
}[] = [
  {
    id: 'flow',
    title: 'Çalışan ürün akışı',
    description:
      'Bir ürünün tek işini girdiden kalıcı sonuca kadar tamamla. Altyapıyı bu akışın gerektirdiği kadar geliştir.',
    steps: [
      'Tek kullanıcı sonucunu ve kapsam dışı işleri yaz.',
      'Mevcut sürümü temiz ortamda kur; kritik akışın başlangıç sonucunu kaydet.',
      'Veri modeli, iş kuralı ve arayüzü aynı dar dilimde tamamla.',
      'Başarı, hata ve geri dönüş senaryolarının kabul kanıtını kaydet.',
    ],
  },
  {
    id: 'core',
    title: 'Ortak altyapı',
    description:
      'Genel bir motorun kapsamından önce onu kullanacak ürün akışını seç. Yeniden kullanımı tüketici sözleşmesiyle göster.',
    steps: [
      'Ortak parçayı kullanacak somut ürün akışını adlandır.',
      'Ortak ve ürüne özel kuralları tüketici sözleşmesinde ayır.',
      'Gerekli çekirdek parçasını ürün dilimiyle birlikte uygula.',
      'Diğer tüketiciyle uyumluluğu ve ek bakım yükünü sınayıp ortaklaştırma kararını yenile.',
    ],
  },
  {
    id: 'reliability',
    title: 'Doğruluk ve güvenilirlik',
    description:
      'Hesap, rol, veri veya entegrasyon riskinin etkisini seçilen akışta doğrula. Yeni özelliğe geçişi gerçek sonuca bağla.',
    steps: [
      'Kararı etkileyen hata veya riski aynı sürümde tekrar üret.',
      'Beklenen sonucu ve olumsuz durumları kabul senaryosuna yaz.',
      'En dar düzeltmeyi yap; izin, veri bütünlüğü ve hata davranışını birlikte sına.',
      'Regresyon ve geri alma sonucunu kaydet; sonraki dilime bu kanıtla geç.',
    ],
  },
  {
    id: 'discovery',
    title: 'Teknik belirsizliği azaltma',
    description:
      'Kararı gerçekten değiştirecek bilinmeyeni seç. Büyük bir geliştirme yerine onu cevaplayan teknik deney yap.',
    steps: [
      'Hangi bilinmeyenin adaylar arasındaki tercihi değiştireceğini yaz.',
      'Varsayımı yanlışlayabilecek en küçük teknik deneyi tasarla.',
      'Sürüm, ortam, komut ve sonucu birlikte kaydet.',
      'Sonucu bağımlılık, kapsam ve kalan iş karşılaştırmasına işle.',
    ],
  },
];

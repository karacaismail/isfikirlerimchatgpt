# İlk sürüm doğrulama kaydı

## Karar ve kaynak güncellemesi

10 Ekim 2026, veri sürümü 1.1. Altı proje özeti yeni kaynak okumalarıyla düzeltildi; çatı marka, iç üretim kabiliyeti ve satılabilecek dar işler ayrıldı. Genel bakış ve karar sayfasına koşullu ilk deney önerisi eklendi. İlk yayın sayaçları korunur; yeni okuma kaydı kendi UTC zamanına bağlıdır. Toplu çıkarım, belge metni/hücresi, tam kaynak metni ve formül yeniden hesaplaması ayrı ölçümlerdir.

Bu adayda yerel formatter, Astro kontrolü, 7 model testi ve üretim derlemesi/gizlilik kapısı geçti. Chromium, Firefox ve WebKit üzerinde **33/33** tarayıcı testi geçti; atlanan, beklenmeyen ve dalgalı sonuç sıfır. Yeni test genel bakış/karar/yöntem metinlerini 320–1280 matrisinde ve yüzde 200 kök metinle kontrol eder. Kaynak projeler çalıştırılmadı.

İçerik değişimi eski altı Darwin görsel referansını önce başarısız yaptı. Bağımsız inceleyici her motorun önce/sonra/fark görüntülerini ve 18 statik sayfa görüntüsünü inceledi; değişim metin ve doğal satır yüksekliğine bağlıydı. Sürüm etiketi, kelime boşluğu ve eski kısmi kaynak notları düzeltildi. İncelenmiş hash bağlı adaylar referansa alındıktan sonra normal sıfır piksel farkı tekrarı geçti. Linux referansları ve yayın sonucu ilgili commitin GitHub Actions kaydına ayrıca bağlanır; aşağıdaki 30 testlik kayıt ilk sürüme aittir.

## İlk sürümün kanıtı

10 Ekim 2026. Bu kayıt katalog sitesini kapsar. Kaynak projelerin çalıştırılması, müşteri kabulü veya gelir doğrulaması değildir. Yerel komutların çalışma dizini bu deponun köküdür.

| Kontrol                                                | Durum   | Gerçek kanıt                                                                                    |
| ------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------- |
| `npm run format:check`                                 | pass    | Prettier kontrolü                                                                               |
| `npm run check`                                        | pass    | 28 kaynak dosyasında 0 hata, 0 uyarı, 0 ipucu                                                   |
| `npm test`                                             | pass    | 7 test: eksik puan, ağırlık, Türkçe arama, finans formülü, yayın şeması ve güvenli dış bağlantı |
| `npm run build`                                        | pass    | 14 statik HTML sayfa ve kamuya açık JSON                                                        |
| Gizlilik kapısı                                        | pass    | Sıkı alan şeması, kaynak/çıktı taraması, özel dosya türleri ve JSON eşitliği                    |
| Sentetik sızıntı deneyi                                | pass    | Yapay mutlak yol içeren çıktı reddedildi; deneme kaldırıldıktan sonra temiz çıktı geçti         |
| `npm run test:browser`                                 | pass    | 30 test; beklenmeyen, atlanan veya dalgalı test 0                                               |
| Linux CI tarayıcı tekrarı                              | pass    | Ubuntu 24.04 x64 üzerinde 30/30; atlanan, beklenmeyen veya dalgalı test 0                       |
| Canlı adreste tarayıcı tekrarı                         | pass    | Aynı üç motorla 30/30; üretim URL'sinde gerçek HTTP istekleri                                   |
| Canlı yayın dosyaları                                  | pass    | 24 dosya HTTP 200; yayımlanan gövdeler CI Pages artefaktıyla SHA-256 ve bayt düzeyinde eşit     |
| Kaynak ürünlerin çalışma doğrulaması                   | not_run | Hiçbir kaynak ürün başlatılmadı                                                                 |
| Gerçek Safari ve fiziksel telefon                      | not_run | WebKit otomasyonu bu katmanın yerine geçmez                                                     |
| Gerçek tarayıcı %400 zoom, sanal klavye, ekran okuyucu | not_run | Kök metin boyutu %200 deneyi ayrı ve geçti                                                      |

Tarayıcılar: Chromium 156.0.8078.4, Firefox 157.0, WebKit 27.2; yerel macOS 26.5.1, Darwin/arm64. Bunlar Playwright motorlarıdır. Dokunma bağlamı coarse pointer, hover yok, reduced motion açık olarak kaydedildi. Chromium bu bağlamda 1 touch point; Firefox ve WebKit 0 bildirdi. `hasTouch` seçeneği fiziksel dokunma donanımı kanıtı sayılmadı.

Genişlikler: 320, 360, 375, 390, 667, 767, 768, 769 ve 1280 CSS px. 320×480 katalog penceresi ve 667×320 yatay görünüm ayrıca sınandı. 48rem eşiğinin iki yanı test edildi. Arama/boş durum, özel seçim ve klavyesi, 2–4 proje seçimi, seçim sınırı, yenilemede saklama, geçersiz ağırlık, Escape ve odak dönüşü, açılmış pencereyle yön değişimi, tüm görünür metinlerin en az kök boyutta kalması, yerel tablo taşması ve ok tuşlarıyla kaydırma kontrol edildi. JavaScript kapalıyken temel sayfalar ve altı proje bağlantısı okundu; doğrudan yenileme geçti.

## Ölçülerek düzeltilen hatalar

- Mantine CSS yükleme sırası uzun düğme etiketini `nowrap` yapıyordu. Önce 320 taşma testi başarısız oldu. Resmî `styles.layer.css` kullanımı ve ortak düğme sınırlarıyla kök neden düzeltildi.
- WebKit, odaklanan tablo bölgesini ok tuşuyla kaydırmadı. Katalog, fırsat ve özellik tablolarındaki başarısız regresyonlar ortak küçük klavye davranışıyla düzeltildi.
- Etkin placeholder metni 2,07:1 kontrast verdi. Test üç motorda önce başarısız oldu. Semantik `text-muted` rengi ve kâğıt yüzeyiyle en az 4,5:1 kontrolü geçti. Odak göstergesi en az 3:1; üst kapsayıcılarda ek gösterge yok.
- Eksik finans girdisi `NaN` sonuç üretiyordu. Eksik girdide hesap yapmayan kontrol ve regresyon eklendi.
- Genel URL doğrulaması yürütülebilir URL şemasını kabul ediyordu. Yayın verisi artık yalnız HTTPS dış kaynak kabul eder; negatif test önce başarısız, sonra başarılı oldu.
- Linux CI yüzde 200 kök metinde uzun sözcük taşması yakaladı. 320 px ve 32 px kök metin, daha geniş Verdana fontuyla yerelde yeniden üretildi. Metni küçültmeyen son çare sözcük sarımıyla sayfa genişliği tekrar 320 px oldu; tablo hücrelerinde normal sarım korundu. Teknik deneme sayfasındaki erken kontrollü giriş yarışı readiness ve başlangıçta kapalı kontrollerle düzeltildi. Yerel, Linux CI ve canlı adres tekrarlarında bu testler üç motorda geçti. Mevcut Darwin referansları güncellenmedi.

## Üretim ağı ve görsel kanıt

Her rota yeni soğuk BrowserContext ile, service worker engellenerek ölçüldü. Başlatılan, başarısız ve yanıtlanan istekler kaydedildi. Gerçek encoded yanıt gövdesi boyutu kullanıldı; protokol başlıkları bütçeye dahil değil. Karşılaştırma için yeniden hesaplanan gzip ayrıca kaydedildi.

| Rota                     | En yüksek aktarım |      JS |    CSS |   HTML |
| ------------------------ | ----------------: | ------: | -----: | -----: |
| Genel bakış              |        5.269 bayt |       0 |  2.237 |  3.032 |
| Fırsatlar                |        5.500 bayt |     382 |  2.237 |  2.881 |
| AtonotA ayrıntısı        |       10.488 bayt |     382 |  2.237 |  7.869 |
| Katalog, ilk arama dahil |      227.653 bayt | 154.957 | 38.364 | 34.332 |

Katalog bütçesi toplam 500 KiB, JS 180 KiB, CSS 50 KiB, HTML 50 KiB altında kaldı. Statik tablolardaki küçük JS klavye desteğidir; React/katalog paketi bu sayfalara taşınmadı. Ana sayfada JS isteği sıfırdır. Ayrı cihaz profili paketleri yoktur.

Tablo yerel/CI önizlemesinin en yüksek değerlerini gösterir. Canlı GitHub Pages ölçümünde katalog en çok 232.918 bayt (JS 157.343, CSS 39.944, HTML 35.631), ana sayfa 5.898 bayt ve sıfır JS verdi; aynı bütçeler geçti. CDN aktarımı ile yerel gzip ölçümü ayrı kaydedildi.

320 dropdown/pencere/tablo, yatay görünüm ve masaüstü görüntüleri yerel kanıt klasörüne kaydedildi. Pencere görüntüsü opaklık 1 olduktan sonra alındı. Aynı ortamda art arda iki masaüstü yakalaması bayt eşitliğiyle karşılaştırıldı. Altı Darwin ve altı Linux referansı ayrı ayrı bağımsız incelemeden sonra ilk kalıcı baseline olarak kabul edildi. Linux adayları 38041528004 run artefaktından alındı; o run davranış hataları ve eksik referanslar nedeniyle başarısızdı, görsel kabul bu hataları başarılı saymaz. `visual.spec.ts` motor/platform bazında sıfır piksel farkı şartıyla karşılaştırır; Darwin, Linux ve canlı adres normal tekrarları üç motorda geçti. Farklı işletim sistemlerinde piksel eşitliği beklenmez. Bağımsız salt okunur UI incelemesinde açık bulgu kalmadı; fiziksel cihaz katmanı buna dahil değildir.

## Yayın iş akışı

Resmî Astro örneği değerlendirildi. Bu proje kilitli `npm ci --ignore-scripts`, kontroller ve tarayıcı testlerinden sonra yalnız `dist` artefaktını resmî Pages upload/deploy actionlarına gönderir. Action sürümleri commit SHA ile sabittir. Build job yalnız içerik okuma; deploy job yalnız Pages yazma ve OIDC yetkisine sahiptir. CI kişisel author/committer kuralını tüm ilgili Git tarihçesinde ayrıca denetler; bu Mac’in hook’unun bulutta çalıştığı varsayılmaz.

[İlk başarılı CI ve yayın](https://github.com/karacaismail/isfikirlerimchatgpt/actions/runs/38041906538), `e081bf86f4540b0732f41abf053380214efde12d` commitini yayımladı. 10 Ekim 2026 09:37–09:39 UTC aralığında [canlı adres](https://karacaismail.github.io/isfikirlerimchatgpt/) test edildi. `SITE_URL=https://karacaismail.github.io/isfikirlerimchatgpt/ npm run test:browser` 30/30 geçti. Ayrı HTTP doğrulamasında 14 HTML, JSON ve 9 varlık dahil 24 dosya HTTP 200 ve CI artefaktıyla tam gövde eşitliği verdi. Yerel/CI React HTML'lerinde derleme kimlikleri değişebildiğinden canlı dosya eşitliği yayımlanan CI artefaktına bağlandı; bu fark gizlenmedi. Sonraki run sonuçları GitHub Actions üzerinde ayrıca izlenir. Lisans kullanıcının kararıyla sonraya bırakıldı.

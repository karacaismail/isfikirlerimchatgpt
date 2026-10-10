# İlk sürüm doğrulama kaydı

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
- Linux CI yüzde 200 kök metinde uzun sözcük taşması yakaladı. 320 px ve 32 px kök metin, daha geniş Verdana fontuyla yerelde yeniden üretildi. Metni küçültmeyen son çare sözcük sarımıyla sayfa genişliği tekrar 320 px oldu; tablo hücrelerinde normal sarım korundu. Teknik deneme sayfasındaki erken kontrollü giriş yarışı readiness ve başlangıçta kapalı kontrollerle düzeltildi. Yerel 30 test ve mevcut Darwin referansları normal tekrar geçti; Linux tekrarının sonucu henüz bekleniyor.

## Üretim ağı ve görsel kanıt

Her rota yeni soğuk BrowserContext ile, service worker engellenerek ölçüldü. Başlatılan, başarısız ve yanıtlanan istekler kaydedildi. Gerçek encoded yanıt gövdesi boyutu kullanıldı; protokol başlıkları bütçeye dahil değil. Karşılaştırma için yeniden hesaplanan gzip ayrıca kaydedildi.

| Rota                     | En yüksek aktarım |      JS |    CSS |   HTML |
| ------------------------ | ----------------: | ------: | -----: | -----: |
| Genel bakış              |        5.253 bayt |       0 |  2.221 |  3.032 |
| Fırsatlar                |        5.484 bayt |     382 |  2.221 |  2.881 |
| AtonotA ayrıntısı        |       10.471 bayt |     382 |  2.221 |  7.868 |
| Katalog, ilk arama dahil |      227.607 bayt | 154.929 | 38.348 | 34.330 |

Katalog bütçesi toplam 500 KiB, JS 180 KiB, CSS 50 KiB, HTML 50 KiB altında kaldı. Statik tablolardaki küçük JS klavye desteğidir; React/katalog paketi bu sayfalara taşınmadı. Ana sayfada JS isteği sıfırdır. Ayrı cihaz profili paketleri yoktur.

320 dropdown/pencere/tablo, yatay görünüm ve masaüstü görüntüleri yerel kanıt klasörüne kaydedildi. Pencere görüntüsü opaklık 1 olduktan sonra alındı. Aynı ortamda art arda iki masaüstü yakalaması bayt eşitliğiyle karşılaştırıldı. Altı Darwin ve altı Linux referansı ayrı ayrı bağımsız incelemeden sonra ilk kalıcı baseline olarak kabul edildi. Linux adayları 38041528004 run artefaktından alındı; o run davranış hataları ve eksik referanslar nedeniyle başarısızdı, görsel kabul bu hataları başarılı saymaz. `visual.spec.ts` motor/platform bazında sıfır piksel farkı şartıyla karşılaştırır; Darwin normal tekrarı üç motorda geçti. Linux yeni normal tekrarı henüz bekleniyor. Farklı işletim sistemlerinde piksel eşitliği beklenmez.

## Yayın iş akışı

Resmî Astro örneği değerlendirildi. Bu proje kilitli `npm ci --ignore-scripts`, kontroller ve tarayıcı testlerinden sonra yalnız `dist` artefaktını resmî Pages upload/deploy actionlarına gönderir. Action sürümleri commit SHA ile sabittir. Build job yalnız içerik okuma; deploy job yalnız Pages yazma ve OIDC yetkisine sahiptir. CI kişisel author/committer kuralını tüm ilgili Git tarihçesinde ayrıca denetler; bu Mac’in hook’unun bulutta çalıştığı varsayılmaz.

GitHub run ve canlı yayın sonuçları ilgili run sayfasında doğrulanır; yukarıdaki yerel sonuçlar tek başına CI veya yayın başarısı sayılmaz. Lisans kullanıcının kararıyla sonraya bırakıldı.

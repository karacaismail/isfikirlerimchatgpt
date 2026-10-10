# Doğrulama kaydı

## UX yenilemesi — 10 Ekim 2026

Bu bölüm yeni UX adayını kapsar. Aşağıdaki önceki yayın kayıtları tarihsel kanıttır; yeni arayüzün tarayıcı, görsel, CI veya canlı yayın sonucu yerine geçmez. Yerel macOS, Linux CI ve canlı adreste normal tarayıcı tekrarları tamamlandı; her birinde 54/54 test geçti. Bağımsız incelemede açık kod veya UI bulgusu kalmadı.

### Değişen akış

- Ana sayfa üç hedefle başlar: ilk ödeme, düzenli kullanım ve geliştirme işini hızlandırma.
- Altı proje **Ücretli pilotlar**, **Alan ortağı gerekenler** ve **İç araçlar** gruplarına ayrılır. Her grubun altında dört adımlı kontrol listesi bulunur.
- Proje özetleri müşteri, ilk teklif ve sonraki adımı sade dille gösterir. Yapılacaklar ve proje ayrıntısı aynı proje kontrol listesi kaydını kullanır.
- Katalog araması başlangıç yolu, müşteri türü, gelir türü, ürün aşaması, önerilen platform, gelir modeli ve önerilen kararla birlikte uygulanır. Etkin filtreler görünür ve temizlenebilir.
- Arama, filtre ve sıralama URL üzerinden paylaşılır. Karşılaştırma seçimleri ve ağırlıklar tarayıcıda saklanır; paylaşılan filtre adresinin parçası değildir.
- Kontrol listeleri `localStorage` içinde kişisel ilerleme tutar. İşaretlemek, kaynak analizi veya deney kabulü değildir. Saklama hatası görünür bir mesaja dönüşür; mevcut sayfanın kontrolleri çalışmaya devam eder.
- Geniş ekranda yan gezinme, dar ekranda klavyeyle kullanılabilen Menü kontrolü vardır. Sayfa içi bağlantı, hedefi kapalı bir ayrıntıysa o bölümü açar. JavaScript kapalıyken temel metinler ve bağlantılar kullanılabilir.

### Bu adayın durumu

| Kontrol                                                                          | Durum   | Kapsam                                                                                                                                       |
| -------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Birim testleri                                                                   | pass    | 10 Ekim 2026 adayında 13 test; model, rehber eşlemesi, filtre birleşimi, URL/saklama doğrulaması ve belirsiz puan sıralaması                 |
| Astro kontrolü                                                                   | pass    | 10 Ekim 2026 adayında 0 hata, 0 uyarı, 0 ipucu                                                                                               |
| Üretim derlemesi ve gizlilik kapısı                                              | pass    | 10 Ekim 2026 adayında veri doğrulama, statik derleme ve kaynak/çıktı kontrolleri                                                             |
| Nihai tam depo formatter kontrolü                                                | pass    | Ortak değişiklikler sonrası Prettier kontrolü                                                                                                |
| Nihai yerel tarayıcı tekrarı                                                     | pass    | Üç motorda 54/54; görsel karşılaştırma açık, altı Darwin referansında sıfır piksel farkı; atlanan/dalgalı/beklenmeyen 0                      |
| Bağımsız UI ve görsel referans incelemesi                                        | pass    | 38 dosya bağı, 12 exact görsel referans ve normal macOS/Linux tekrarları incelendi; kontrast, menü odağı ve yüzde 200 Grid bulguları kapandı |
| Linux CI ve Pages deploy                                                         | pass    | Run 38048957287; 4553eaafc98b1d2ed4823a66f3ae3149b3e3db95, 54/54 ve başarılı Pages deploy                                                    |
| Canlı tarayıcı tekrarı ve dosya eşitliği                                         | pass    | 10 Ekim 2026 11:39 UTC; 54/54, 24 HTTP 200 dosya ve CI Pages artefaktıyla tam gövde/SHA-256 eşitliği                                         |
| Kaynak ürünlerin çalışma doğrulaması                                             | not_run | Bu değişiklik katalog arayüzünü kapsar                                                                                                       |
| Gerçek Safari, fiziksel telefon, sanal klavye, ekran okuyucu ve gerçek %400 zoom | not_run | Playwright motorları ve kök metin büyütme bu katmanların yerine geçmez                                                                       |

### Ölçülen UX sonuçları

320×640 CSS px Chromium görünümünde ilk proje eski düzende 1.724 px, yeni düzende 649 px konumundadır. Sayfa genişliğinde taşma yok; kök metin 16 px kaldı. Arama ve özel Gelir türü alanının hesaplanmış sınırı `rgb(125, 137, 156)`, zemini beyazdır; sınır kontrastı en az 3:1 testi üç motorda geçti.

Yüzde 200 kök metin, uzun MetaFramework kontrol listesi başlığında taşma yakaladı; başlığın esnek minimum genişliği düzeltildi. Teknik sayfada menü özetinin 1023→1024 geçişinde gizlenmesi Chromium'da odağı kaybettiriyordu; önce başarısız regresyon kaydedildi, görünür gezinme bağlantısına odak aktarımıyla üç motorda geçti. Geri/ileri gezinmede URL filtreleri, birleşik arama, adım kalıcılığı ve kayıt hatası da geçti. İlk başarısız çalıştırmalar başarı sayılmaz. Linux aday run 38048707765, 48 davranış/görsel testini geçti; üç eski görsel referans ve üç yüzde 200 kök metin testi başarısız oldu. Geniş Verdana fontuyla aynı hata yerelde önce başarısız regresyonla üretildi. Katalog araç çubuğunun Grid sütunu `minmax(0, 1fr)` ve doğrudan çocukları `min-width: 0` yapıldı; belge 333 px’den 320 px’e, araç çubuğu 301 px’den 256 px’e döndü. Son yerel normal 54/54 tekrar, geniş font regresyonunu üç motorda geçirdi; normal metin görselleri değişmedi. İncelenen Linux adayları referansa alındı; başarısız aday run başarılı yayın sayılmaz.

Yeni üretim çıktısında soğuk yerel ölçümün üç motor arasındaki en yüksek encoded gövde değerleri:

| Rota              | Toplam bayt | Dış JS bayt | CSS bayt | HTML bayt |
| ----------------- | ----------: | ----------: | -------: | --------: |
| Genel bakış       |       8.605 |           0 |    3.854 |     4.751 |
| Fırsatlar         |       9.714 |         382 |    3.854 |     5.478 |
| AtonotA ayrıntısı |      15.811 |         382 |    3.854 |    11.575 |
| Katalog           |     244.116 |     159.687 |   39.981 |    44.448 |

Statik sayfalardaki inline betikler ayrıca gzip ile ölçülür; dış JS ile toplamları 2 KiB altında kaldı. Sıfır dış JS, inline davranış olmadığı anlamına gelmez. Katalog bütçeleri geçti. Bu tablo son Grid düzeltmesinden sonraki yerel önizleme koşusuna aittir; canlı CDN sonucu ayrı ölçümdür. Canlı CDN turunda katalog en çok 249.131 bayt (JS 161.770, CSS 41.544, HTML 45.817), ana sayfa 9.233 bayt ve sıfır dış JS verdi. Aynı bütçeler geçti; inline gezinme/kontrol listesi kodu ayrıca ölçüldü.

### Gerçek doğrulama komutları

Çalışma dizini `isfikirlerimchatgpt` depo köküdür. Araçlar Node 24.21.0 ve npm 11.19.0; paketler lockfile ile sabittir.

```sh
npm run format:check
npm run check
npm test
npm run build
npm run test:browser
```

`npm test`, `tests/*.test.ts` dosyalarını çalıştırır. `npm run build`, sırasıyla `scripts/validate-data.mjs`, Astro derlemesi ve `scripts/privacy-check.mjs` çalıştırır. Tarayıcı testleri geliştirme sunucusunu değil `dist` üretim çıktısını kullanır. Playwright yapılandırması önizlemeyi `127.0.0.1:4179` üzerinde başlatır; kurulu ve proje sürümüyle eşleşen üç motor gerekir.

Odaklı regresyon komutu:

```sh
npx playwright test tests/browser/workspace.spec.ts
```

Bu dosya mobil gezinme ve yeniden boyutlandırmada odak, geri/ileri URL filtreleri, birden çok filtrenin birleşimi, kontrol listesi kalıcılığı, kapalı saklama alanı ve bölüm bağlantısının ayrıntıyı açması davranışlarını kapsar. Testin kaynakta bulunması, çalıştırılmış veya geçmiş olduğu anlamına gelmez; nihai sonuç yukarıya kaydedilir.

Canlı yayın ayrı sınanır:

```sh
SITE_URL=https://karacaismail.github.io/isfikirlerimchatgpt/ npm run test:browser
```

`test-results/browser-results.json` test sonucunu; Playwright ekleri ekran görüntüsü, başarısızlık trace'i ve ağ ölçümlerini taşır. Başarısız veya yeni referansı olmayan görsel aday başarılı sayılmaz. Yalnız bağımsız incelenen adaylar referansa alınabilir; eşik yükseltilmez. Linux ve Darwin görüntüleri ayrı tutulur.

320 CSS px önce gelir; ardından 360, 375, 390, kısa yatay görünüm, tablet, masaüstü ve değişen 48rem/64rem eşiklerinin iki yanı sınanır. Kontroller metin boyutu, yerel tablo kaydırması, fare/klavye odağı, özel seçim paneli ve durumun korunmasını kapsar. Yeni ölçümler eski ağ tablosundan ayrı kaydedilmelidir: ana sayfada artık ortak gezinme ve kontrol listesi için küçük JavaScript vardır. Statik rotalarda aktarılan dış JavaScript gövdesi ve inline betiğin gzip boyutu toplamı 2 KiB altında tutulur; React/katalog paketi istenmemelidir. Katalog bütçesi toplam 500 KiB, JavaScript 180 KiB, CSS 50 KiB, HTML 50 KiB olarak korunur. Bunlar kabul bütçeleridir; nihai ölçüm sonucu değildir.

### UX yayın kanıtı

[Başarılı Linux CI ve Pages yayını](https://github.com/karacaismail/isfikirlerimchatgpt/actions/runs/38048957287), `4553eaafc98b1d2ed4823a66f3ae3149b3e3db95` uygulama sürümünü yayımladı. Yerel ve Linux tekrarları normal snapshot karşılaştırması açıkken 54/54 geçti. 10 Ekim 2026 11:39:23–11:39:52 UTC arasında canlı URL üç motorda 54/54 geçti; atlanan, beklenmeyen ve dalgalı sonuç sıfırdır. Canlı dosya doğrulaması aynı run'ın Pages artefaktına bağlandı: 14 HTML, JSON ve 9 varlık dahil 24 dosyada HTTP 200, bayt eşitliği ve SHA-256 eşitliği sağlandı. Kaynak ürünlerin runtime veya ticari kabulü bu sonuçtan çıkarılmaz.

## Önceki yayın: karar ve kaynak güncellemesi

10 Ekim 2026, veri sürümü 1.1. Altı proje özeti yeni kaynak okumalarıyla düzeltildi; çatı marka, iç üretim kabiliyeti ve satılabilecek dar işler ayrıldı. Genel bakış ve karar sayfasına koşullu ilk deney önerisi eklendi. İlk yayın sayaçları korunur; yeni okuma kaydı kendi UTC zamanına bağlıdır. Toplu çıkarım, belge metni/hücresi, tam kaynak metni ve formül yeniden hesaplaması ayrı ölçümlerdir.

Önceki içerik güncellemesinde yerel formatter, Astro kontrolü, 7 model testi ve üretim derlemesi/gizlilik kapısı geçti. Chromium, Firefox ve WebKit üzerinde **33/33** tarayıcı testi geçti; atlanan, beklenmeyen ve dalgalı sonuç sıfır. O sürümde eklenen test genel bakış/karar/yöntem metinlerini 320–1280 matrisinde ve yüzde 200 kök metinle kontrol eder. Kaynak projeler çalıştırılmadı.

İçerik değişimi eski altı Darwin görsel referansını önce başarısız yaptı. Bağımsız inceleyici her motorun önce/sonra/fark görüntülerini ve 18 statik sayfa görüntüsünü inceledi; değişim metin ve doğal satır yüksekliğine bağlıydı. Sürüm etiketi, kelime boşluğu ve eski kısmi kaynak notları düzeltildi. İncelenmiş hash bağlı adaylar referansa alındıktan sonra normal sıfır piksel farkı tekrarı geçti. Linux adayında 30 davranış testi geçti, üç görsel test eski toplam altı referans nedeniyle başarısız oldu. Bağımsız inceleyici 18 önce/sonra/fark görüntüsünü ve altı SHA-256 bağını ayrıca kontrol etti; açık bulgu kalmadı. Yalnız incelenen altı Linux referansı güncellendi. Başarısız aday run 38045181512 başarılı sayılmaz; normal tekrar ve yayın sonucu bu referans güncellemesinin GitHub Actions kaydına bağlanır. Aşağıdaki 30 testlik kayıt ilk sürüme aittir.

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

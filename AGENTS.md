# İş Fikirlerim proje sözleşmesi

Bu depo yalnız yayımlanabilir dokümantasyon ve arındırılmış kişisel proje verisi içerir. Kaynak projeleri değiştirme. Ham kaynakları, özel analiz defterini, kişisel dizin yapısını, kimlik bilgilerini ve üçüncü tarafın yayımlanmamış içeriğini ekleme. Sahipliği belirsiz kayıt kamuya açık veri kümesine alınmaz.

Yeni Git author ve committer: `karacaismail <35493655+karacaismail@users.noreply.github.com>`. Git guard korunur. Co-author, generated-with ve oturum imzası eklenmez. Geçmiş kimlikleri yeniden yazılmaz. CI yeni commit üretmez; yayınlanan HEAD kimliğini ayrıca kontrol eder. Yerel guard bulut yaptırımı olarak sunulmaz.

Astro 7.3.8 + React 19.3.0 + Mantine 9.7.1 + TypeScript 6.0.3, Node 24.21.0, npm 11.19.0. Paketler ve lockfile sabittir. Astro checker TypeScript 7 kabul etmediği için desteklenen 6.0.3 kullanılır. React plugin 6.1.1, Astro React entegrasyonunun oxc 0.145.0 peer sözleşmesini korumak için overrides ile sabitlenmiştir.

Tek React island içinde MantineProvider ve tüketiciler birlikte bulunur. Statik sayfalar React JS indirmez. Karşılaştırma/katalog aynı iş modelini kullanır; farklı cihazlar için gereksiz ayrı kabuk yoktur. Bu görevde sistem fontu önceliği açıkça istendiği için sistem font zinciri kullanılır. Tüm okunabilir metin en az 1rem, kullanıcı kök fontu korunur.

Kimlik: sıcak kâğıt yüzeyi, koyu orman metni, kaynak/karar vurgusu; tokens.css merkezi semantik kaynaktır. 320 CSS px ilk kabul; ardından 360/375/390, 667 yatay, 768 tablet ve 1280 masaüstü; 48rem sınırında 767/769 da test edilir. Tek focus-visible göstergesi yalnız odaklanan kontrolde; kapsayıcı focus-within çerçevesi yok. Kontrollü tablo kaydırma, doğal sözcük sarımı. Büyütülmüş gövde metninde sığmayan uzun sözcük için son çare break-word kullanılır; tablo başlıkları ve model sütunları normal sarımı ve okunabilir minimum genişliği korur. SSR kontrollü girişler istemci hazır olana kadar disabled kalır; otomasyon readiness bekler. Native select yok; Mantine Select özel paneliyle kullanılır. İkon ve emoji yok. Dokunma alanı 44 px, coarse pointer 48 px. Yeni UI tesliminde bağımsız salt okunur QA gerekir. Ekran görüntüsü referansları sessizce onaylanmaz.

Komutlar repo kökünde: `npm ci --ignore-scripts`, `npm run format:check`, `npm run check`, `npm test`, `npm run build`, `npm run test:browser`. build veri şemasını ve kamuya açık çıktı gizlilik kapısını çalıştırır. Testler yalnız derlenmiş dist üzerinde; yerel sunucu 127.0.0.1:4179, base /isfikirlerimchatgpt. Kaynak projelerin testleri bu komutlarla çalıştırılmaz. Konteyner gerekmez; gerekirse bu Mac'te Colima politikası geçerlidir.

Public veri strict Zod izin listesi ile doğrulanır. Kaynak referansları yalnız güvenli kanıt kimlikleri taşır; kaynak yolu taşımaz. Bilinmeyen puan null. Dosya envanteri, içerik incelemesi, eşleme ve runtime doğrulaması ayrı kaydedilir. Kısmi inceleme tamamlandı sayılmaz. Fiyat/özellik/pazar iddiaları resmî güncel kaynağa ve erişim tarihine bağlanır. Müşteri görüşmesi yapılmadan talep doğrulanmış sayılmaz.

Lisans kararı kullanıcı tarafından sonraya bırakılmıştır; onaysız lisans ekleme. Public görünürlük açık kaynak lisansı değildir.

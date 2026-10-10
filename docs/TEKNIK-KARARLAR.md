# Teknik karar ve doğrulama kaydı

10 Ekim 2026. Kaynak ürünlerin çalışma doğrulaması not_run; bu dosya dokümantasyon arayüzü içindir.

## Sürümler ve uyumluluk

Gözlenen yerel runtime Node 24.21.0, npm 11.19.0. npm kayıtları ve resmi belgeler kontrol edilerek Astro 7.3.8, @astrojs/react 7.0.1, React 19.3.0, Mantine 9.7.1 sabitlendi. TypeScript 7.0.2 checker peer aralığı dışında kaldı; kurulum reddedildi. Desteklenen TypeScript 6.0.3 seçildi. @vitejs/plugin-react 6.1.2, Astro entegrasyonunun oxc 0.145.0 bağımlılığıyla peer uyuşmazlığı gösterdi. Entegrasyonun kabul ettiği 6.1.1 sabitlendi; zorla peer atlama kullanılmadı. Lockfile gerçek çözümü kaydeder.

Mantine'in [3 Ocak 2024 Astro yardım notu](https://help.mantine.dev/q/can-i-use-mantine-with-astro) context sınırını vurgular. [Güncel Astro React belgeleri](https://docs.astro.build/en/guides/integrations-guide/react/) ve [island bağlam sınırları](https://docs.astro.build/en/recipes/sharing-state-islands/) birlikte değerlendirildi. Provider ve tüm tüketiciler tek React ağacında; Astro sayfa içerikleri statik kalır. [Mantine kurulumu](https://mantine.dev/getting-started/) ve [tarayıcı desteği](https://mantine.dev/browser-support/) 10 Ekim 2026 erişimiyle kontrol edildi. Bu doğrulama başka sürüm ve düzenlerin çalışacağı garantisi değildir.

## Erken uyumluluk deneyi

MantineProvider, tema, TextInput, Select, Modal; statik derleme ve 320×480 tarayıcı etkileşimi. Chromium/Firefox geçti; WebKit ilk geçişte pencere sonrası odağı açan düğmeye döndürmedi. Uygulama açık trigger ref ve çıkış geçişi callback'iyle düzeltilerek aynı davranış testi yeniden çalıştırıldı: üç motor geçti. Test, metin girme, özel seçim, pencere açma, Escape, odak dönüşü, sayfa taşması ve JS hatalarını kapsar. Gerçek Safari testi yapılmadı.

Astro 7 preview daemon/port davranışı test runner yaşam döngüsüyle uyumsuz olduğu için üretim dist dosyalarını aynı base altında sunan yerel Node HTTP sunucusu kullanılır. Bu geliştirme sunucusu değildir, çalışan diğer servisleri değiştirmez.

## Tasarım ve kaynak teslimi

320 CSS px başlangıç, sistem fontu göreve özel açık tercih, minimum 1rem. Merkezi semantik tokenlar. Tek akışkan kabuk; cihaz adına göre ayrım yok. Dokunma alanı fine pointer 44 px, any-pointer coarse 48 px. Statik sayfalar React/Mantine JS gerektirmez. Etkileşimli katalog kendi route grubunda yüklenir; özel masaüstü/mobil paketleri yoktur. Ağ testleri statik ve etkileşimli route isteklerini ayrı ölçer.

Yeni proje bütçesi: soğuk bağlam, üretim HTTP gzip, ilk katalog etkileşimine kadar; başlangıç toplam aktarım en çok 500 KiB, JavaScript gzip en çok 180 KiB, CSS gzip en çok 50 KiB, HTML gzip en çok 50 KiB. Statik okuma route'unda React/katalog JS isteği sıfır. Tek ortak kabuk için aynı bütçe tüm genişliklerde geçerlidir; gereksiz ayrı profil kaynağına sıfır istek. Alan verisi şu an küçüktür; büyüdükçe bütçe aşımı incelenmeden yükseltilmez. Sentetik aktarım ölçümü gerçek kullanıcı Core Web Vitals verisi değildir.

## Yayın

[Resmi Astro GitHub Pages yöntemi](https://docs.astro.build/en/guides/deploy/github/) 10 Ekim 2026 tarihinde checkout v7, withastro/action v6, deploy-pages v5 örneğini kullanıyor. Repo site/base buna göre ayarlandı; workflow taglerinin gerçek commitleri ayrıca sabitlenir. [GitHub Pages belgesi](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) yayınların public olabileceği sınırı destekler.

## Kalan doğrulama katmanları

Gerçek macOS Safari, fiziksel iOS/Android, sanal klavye ve gerçek tarayıcı yüzde 400 zoom ayrı katmanlardır. Emülasyon bu sonuçları pass yapmaz. Ekran görüntüleri ilk referans adaylarıdır; sessizce onaylanmış regresyon baseline'ı değildir. CI ve gerçek yayın sonucu yalnız GitHub'daki ilgili run ve canlı adres kontrol edilince doğrulanmış sayılır.

## UX düzenlemesi

Sade Türkçe rehberler, üç proje kümesi, ortak yerel kontrol listeleri ve hedefe göre katalog bağlantıları eklendi. Gezinme alanı 64rem üzerinde kalıcı, dar alanda klavyeyle açılan menüdür; geçerli sayfa aria-current ile belirtilir. Katalog filtreleri dar alanda açılır panelde, sonuç sayısı ve kaldırılabilir etkin filtreler dışarıdadır. Arama ve filtreler paylaşılabilir URL içinde; seçimler ve puan ağırlıkları bu tarayıcıda kalır. İlk yüklemede URL filtreleri kayıtlı filtrelerin önüne geçer. Kontrol listesi işaretleri kullanıcının çalışma notlarıdır. Kaynak veri ve ticari doğrulama durumları değişmedi.

Önceki ana sayfanın sıfır JavaScript koşulu bu teslimde yerel kontrol listesi ve ortak gezinme davranışı nedeniyle küçük ortak betik koşuluyla değişti. Statik rotalarda React/katalog JS hâlâ yüklenmez; ortak üretim JavaScript gzip bütçesi 2 KiB, diğer aktarım bütçeleri aynı kaldı. Kalıcı görsel referanslar bağımsız önce/sonra/fark incelemesiyle kabul edilir.

Katalog araç çubuğunda tek Grid sütunu `minmax(0, 1fr)` ve doğrudan çocuklar `min-width: 0` kullanır. Bu, geniş sistem fontlarında yüzde 200 kök metinle oluşan otomatik min-content taşmasını önler; metin küçültülmez veya taşma gizlenmez. Regresyon Verdana ile de sınanır.

## 10 Ekim 2026: geliştirme yatırımı ve strateji 2.0

Önceki gelir deneyi hedefi geri çekildi. Aktif hedef kullanıcının yazılım altyapısını geliştirmek; satış/tahsilat koşulu teknik öncelik değildir. 6 eski ayrıntılı kaynak kaydı korunur, ticari skorlar null ve kullanım dışıdır. 17 mevcut analiz kaydı daha aday görünümüne alınır. Yeni aday kayıtları önceki altı projenin derinliğiyle incelenmiş gibi sunulmaz.

`src/lib/strategy.ts` sıkı strateji şeması, 14 ölçüt ve 14 deterministik ECA kuralı sağlar. `src/data/development.ts` kaynak gözlemleri ve önerilen dilimleri taşır. `strategy-guidance.ts` ortak çalışma yollarını tanımlar. Bilinmeyen kanıt sıfır puana çevrilmez. Kaynağa bağlanmamış kesin koşul ve gözlenen bağımlılık döngüsü reddedilir. Çalışma/kabul/hata için runtime kanıt türü gerekir; belge iddiası yeterli değildir.

Ortak çekirdek ve ürün rakip proje adları gibi sıralanmaz. Tüketici ihtiyacı ve uyumluluk kanıtı ortaklaştırma kararını belirler. Geliştirme adımı ürün sonucunu, karşı görüşü, kabul koşulunu ve yeniden değerlendirmeyi içerir. ECA önerisi kaynak projede kod çalıştırma veya değişiklik yapma yetkisi vermez.

Katalog seçim/arama/AND filtreleri ve URL geri/ileri davranışını korur; gelir ağırlığı yerine açık geliştirme hedefi, inceleme derinliği ve kabiliyet filtreleri kullanılır. Eski tercihler ve ticari checkbox işaretleri v2 anahtarlarına taşınmaz. Görünür listelerin sırası alfabetik, hedef ilişkisi veya kaynak derinliği düzenidir; kalite veya yatırım puanı değildir.

Bu bölüm önceki rehberdeki ücretli pilot/alan ortağı/iç araç kümeleri ve müşteri/ilk teklif sözleşmesinin yerini alır. Eski kararlar tarihli geçmiş bağlamıdır. Güncel sahiplik, kullanıcının TÜRSAB dışı bütün projelerin kendisine ait olduğu beyanıdır.

## 10 Ekim 2026: reklamsız satış potansiyeli ve strateji 2.1

Kullanıcının düzeltmesi: reklamsız satılabilirlik potansiyeli değerli bir öncelik ölçütüdür; peşinat gerçekleşmiş bir ödeme olayıdır. Önceki düzeltme ticari potansiyeli gereğinden fazla dışlamıştı. Yeni 15. ölçüt teknik katkıyla birlikte alıcı problemi, reklamsız erişim yolu, görülebilir değer, tekrar ihtiyaç ve sürekli satış/kurulum/destek emeğini ele alır. Eski G/V/O/U puanları geri taşınmaz ve satış gerçekleşmesi teknik geliştirme önkoşulu yapılmaz.

`organic-sales.ts` mevcut 23 adayın kendi kaynak kimliklerine bağlı potansiyel hipotezlerini taşır; `development.ts` bunları aktif strateji sözleşmesine birleştirir. Çıkarım, bilinmeyen ve gerçek gözlem ayrımı korunur; çalışma/kabul olguları değişmez. Adayların teknik hedefleri, URL filtreleri ve v2 yerel ilerleme anahtarları korunur. ECA-01 birlikte değerlendirme ayrımını, ECA-13 yeni potansiyel kanıtıyla yeniden değerlendirmeyi kapsar; toplam 14 kural vardır.

Proje ayrıntısı, katalog gerekçesi ve karşılaştırma aynı ölçütü gösterir. Karşılaştırma karara etkiyi de taşır. Başlangıç önerisi, teknik katkıya ek olarak reklamsız erişim ve sürekli satış/destek yükünün PIM/Studio tercihini değiştirebileceğini açıklar. Kanal önerileri kabul edilmiş dağıtım veya satış kanıtı sayılmaz.

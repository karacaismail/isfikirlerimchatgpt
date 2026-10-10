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

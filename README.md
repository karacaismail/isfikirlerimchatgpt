# İş Fikirlerim

Altı kişisel projeyi karşılaştırmak, ilk ücretli işi seçmek ve adım adım ilerlemek için Türkçe karar alanı. [Canlı site](https://karacaismail.github.io/isfikirlerimchatgpt/) · [Public depo](https://github.com/karacaismail/isfikirlerimchatgpt).

İlk yayın **kısmi kaynak incelemesine** dayanır. Kaynak ürünler çalıştırılmadı. Katalogdaki puanlar gelir garantisi veya ölçülmüş başarı olasılığı değildir. İnceleme kapsamı ve sınırlamalar sitede görünürdür.

[Karar sayfası](https://karacaismail.github.io/isfikirlerimchatgpt/kararlar/) ilk ücretli deneyi, koşullu önceliği ve kararı değiştirecek kanıtı açıklar. Veri sürümü 1.1, ilk yayın kapsam snapshot'ını tarihli birleşik okuma kaydından ayırır. Bütün taslaklar yerel analiz kapsamındadır; public veri yalnız sahipliği açık kişisel projelerin arındırılmış özetlerini taşır.

## Kullanım

Ana sayfada ilk ödeme, düzenli kullanım veya kendi geliştirme işini hızlandırma hedefini seç. Projeler üç grupta gösterilir:

- **Ücretli pilotlar:** Titanlar, AtonotA ve PIM.
- **Alan ortağı gerekenler:** HRMS ve İBYS.
- **İç araçlar:** MetaFramer.

Her grubun adım adım kontrol listesi vardır. Proje sayfaları kısa açıklama, kime satılacağı, ilk teklif ve sonraki adımla başlar. Ayrıntılı kaynaklar, rakipler, puanlar ve finans bilgileri açılır bölümlerde korunur. Sayfa içi bağlantılar ilgili bölümü açar; dar ekranda ana gezinme Menü kontrolünden kullanılır.

Katalogda aramayı başlangıç yolu, müşteri türü ve gelir türüyle birleştir. Ek filtrelerde ürün aşaması, önerilen platform, gelir modeli ve önerilen karar bulunur. Etkin filtreler tek tek veya birlikte temizlenebilir. İki ile dört proje karşılaştırılabilir; puan ağırlıkları ayrıca değiştirilebilir. Bilinmeyen puanlar sıfır ya da kesin sıralama sayılmaz.

Arama, filtre ve sıralama adresin sorgu bölümüne yazılır; adresi paylaşmak aynı filtreli görünümü açar. Karşılaştırma seçimleri ve puan ağırlıkları URL'ye eklenmez. Bunlar ve kontrol listesi işaretleri bu tarayıcının `localStorage` alanında saklanır. Aynı projenin Yapılacaklar ve ayrıntı sayfası aynı adım kaydını kullanır. İşaretler kişisel çalışma notudur; deneyin yapıldığını veya projenin doğrulandığını göstermez. Saklama alanı kapalıysa uyarı görünür ve mevcut sayfada çalışmaya devam edilir. JavaScript kapalıyken temel içerik, gezinme ve adım metinleri okunabilir.

10 Ekim 2026 UX yenilemesinde yerel macOS, Linux CI ve canlı adres ayrı ayrı **54/54** tarayıcı testini geçti. Görsel referanslar bağımsız incelendi; canlı 24 dosya CI yayın artefaktıyla eşleşti. Gerçek cihazlar gibi çalıştırılmayan katmanlar ve ayrıntılar [doğrulama kaydında](docs/DOGRULAMA.md) belirtilir.

## Yerel çalışma

Node 24.21.0 ve npm 11.19.0 ile:

```sh
npm ci --ignore-scripts
npm run format:check
npm run check
npm test
npm run build
npm run test:browser
npm run preview
```

Önizleme: `http://127.0.0.1:4179/isfikirlerimchatgpt/`. Playwright tarayıcıları yoksa proje sürümünün Chromium, Firefox ve WebKit paketleri gerekir. Bu testler gerçek Safari/iOS/Android sertifikasyonu değildir.

Komutların çalışma dizini depo köküdür. Önce `npm run build`, sonra `npm run test:browser` çalıştırılır; testler derlenmiş `dist` üzerinde önizlemeyi açar. Canlı adresi ayrıca sınamak için:

```sh
SITE_URL=https://karacaismail.github.io/isfikirlerimchatgpt/ npm run test:browser
```

Canlı test, hedefteki yayını ölçer; yerel adayla aynı commitin yayımlandığı ayrıca doğrulanmalıdır.

## Veri güncelleme

`src/data/portfolio.json` yalnız arındırılmış kişisel özetleri içerir. Özel analiz ayrı tutulur ve derlemede gerekli değildir. Alanlar `src/lib/model.ts` strict şemasıyla doğrulanır. Yeni kayıtta benzersiz kimlik, var olan kanıt bağları, dört ayrı ölçüt grubu ve üç önerilen deney gerekir. Eksik puan sıfır yerine null olmalıdır.

Sade özetler, müşteri/gelir filtreleri, üç grup ve adım listeleri `src/data/guides.ts` içinde tanımlıdır. Her yayımlanan projenin tek gruba ve tam bir rehbere bağlanması birim testiyle denetlenir. Kaynak veri veya ticari doğrulama durumu yalnız arayüz metni değiştirilerek yükseltilmez.

Ham belge, özel kod, müşteri verisi ve yerel kaynak yolu eklemeyin. Yayın öncesinde staged dosyaları, veri, statik çıktı ve indirilebilir JSON incelenir. `npm run build` otomatik izin listesi/örüntü kontrollerini de çalıştırır; bu kontrol tek başına gizlilik garantisi değildir.

## Yayın ve lisans

GitHub Actions, yalnız bu depodaki güvenli veriyle Astro statik site üretir. Özel kaynaklara erişim gerekmez. Güncel resmi Astro GitHub Pages yöntemi `docs/TEKNIK-KARARLAR.md` içinde açıklanmıştır.

10 Ekim 2026 ilk yayınında yerel macOS, Linux CI ve canlı adres üzerinde ayrı ayrı 30 tarayıcı testi geçti. [Doğrulama kaydı](docs/DOGRULAMA.md) gerçek cihaz ve kaynak ürün doğrulaması gibi çalıştırılmayan katmanları ayrı belirtir.

Kullanıcı lisans seçimini sonraya bırakmıştır; bu sürümde açık kaynak lisansı eklenmemiştir. Public görünürlük lisans izni yerine geçmez.

# İş Fikirlerim

Kaynak incelemesiyle iş tanımı, müşteri, mevcut ürün ve ticari yönü birbirinden ayıran Türkçe portföy dokümantasyonu. [Canlı site](https://karacaismail.github.io/isfikirlerimchatgpt/) · [Public depo](https://github.com/karacaismail/isfikirlerimchatgpt).

İlk yayın **kısmi kaynak incelemesine** dayanır. Kaynak ürünler çalıştırılmadı. Katalogdaki puanlar gelir garantisi veya ölçülmüş başarı olasılığı değildir. İnceleme kapsamı ve sınırlamalar sitede görünürdür.

[Karar sayfası](https://karacaismail.github.io/isfikirlerimchatgpt/kararlar/) ilk ücretli deneyi, koşullu önceliği ve kararı değiştirecek kanıtı açıklar. Veri sürümü 1.1, ilk yayın kapsam snapshot'ını tarihli birleşik okuma kaydından ayırır. Bütün taslaklar yerel analiz kapsamındadır; public veri yalnız sahipliği açık kişisel projelerin arındırılmış özetlerini taşır.

## Yerel çalışma

Node 24.21.0 ve npm 11.19.0 ile:

```sh
npm ci --ignore-scripts
npm run check
npm test
npm run build
npm run test:browser
npm run preview
```

Önizleme: `http://127.0.0.1:4179/isfikirlerimchatgpt/`. Playwright tarayıcıları yoksa proje sürümünün Chromium, Firefox ve WebKit paketleri gerekir. Bu testler gerçek Safari/iOS/Android sertifikasyonu değildir.

## Veri güncelleme

`src/data/portfolio.json` yalnız arındırılmış kişisel özetleri içerir. Özel analiz ayrı tutulur ve derlemede gerekli değildir. Alanlar `src/lib/model.ts` strict şemasıyla doğrulanır. Yeni kayıtta benzersiz kimlik, var olan kanıt bağları, dört ayrı ölçüt grubu ve üç önerilen deney gerekir. Eksik puan sıfır yerine null olmalıdır.

Ham belge, özel kod, müşteri verisi ve yerel kaynak yolu eklemeyin. Yayın öncesinde staged dosyaları, veri, statik çıktı ve indirilebilir JSON incelenir. `npm run build` otomatik izin listesi/örüntü kontrollerini de çalıştırır; bu kontrol tek başına gizlilik garantisi değildir.

## Yayın ve lisans

GitHub Actions, yalnız bu depodaki güvenli veriyle Astro statik site üretir. Özel kaynaklara erişim gerekmez. Güncel resmi Astro GitHub Pages yöntemi `docs/TEKNIK-KARARLAR.md` içinde açıklanmıştır.

10 Ekim 2026 ilk yayınında yerel macOS, Linux CI ve canlı adres üzerinde ayrı ayrı 30 tarayıcı testi geçti. [Doğrulama kaydı](docs/DOGRULAMA.md) gerçek cihaz ve kaynak ürün doğrulaması gibi çalıştırılmayan katmanları ayrı belirtir.

Kullanıcı lisans seçimini sonraya bırakmıştır; bu sürümde açık kaynak lisansı eklenmemiştir. Public görünürlük lisans izni yerine geçmez.

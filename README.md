# İş Fikirlerim: yazılım geliştirme stratejisi

Kişisel yazılım portföyünde hangi geliştirme dilimine yatırım yapılacağını karşılaştıran statik çalışma alanı.

[Yayımlanan site](https://karacaismail.github.io/isfikirlerimchatgpt/) · [Strateji ve ECA kuralları](https://karacaismail.github.io/isfikirlerimchatgpt/kararlar/) · [Yöntem](https://karacaismail.github.io/isfikirlerimchatgpt/yontem/)

Aktif strateji 2.1; 6 ayrıntılı ve 17 ilk kaynak değerlendirmesinden oluşan 23 aday kayıt içerir. Çatı, ürün, araştırma ve altyapı ayrı belirtilir; kayıt sayısı bağımsız çalışan ürün sayısı değildir. Kullanıcının güncel beyanına göre TÜRSAB dışındaki projeler kendisine aittir. TÜRSAB geliştirme karşılaştırmasının dışındadır.

Karar birimi tamamlanabilir yazılım dilimidir. 15 ölçüt ve 14 olay–koşul–eylem (ECA) kuralı; gerekçe, karşı görüş, kabul koşulu ve yeniden değerlendirme bilgisini görünür tutar. Reklamsız satış potansiyeli teknik katkıyla birlikte öncelik ölçütüdür; alıcı problemi, erişim yolu, görülebilir değer, tekrar ihtiyaç ve satış/destek emeğiyle değerlendirilir. Her adayın potansiyel değerlendirmesi kaynaklara bağlı bir hipotezdir. Önceki ticari puanlar yeniden kullanılmaz; peşinat veya satış gerçekleşmesi geliştirmeye başlama şartı değildir. Kaynak ürünlerin çalışma sonucu `not_run`; site testleri ürünlerin çalışma kabulü değildir. Bilinmeyen efor ve yeniden kullanım değeri puanlanmaz.

Astro 7.3.8, React 19.3.0, Mantine 9.7.1, TypeScript 6.0.3. Node 24.21.0 ve npm 11.19.0 kullanılır. Kurulu sürümler lockfile ile sabittir.

```sh
npm ci --ignore-scripts
npm run format:check
npm run check
npm test
npm run build
npm run test:browser
```

Üretim çıktısı `dist`; yerel ön izleme `npm run preview`, base `/isfikirlerimchatgpt/`, port 4179. Ham proje belgeleri ve özel analiz kayıtları bu depoya alınmaz. `veri.json` ayrıntılı kaynak kaydı 1.1; `strateji.json` aktif geliştirme verisi 2.1. İkisi de sıkı şema ve yayın eşitliği kontrolünden geçer.

[Kalıcı proje kararları](docs/TEKNIK-KARARLAR.md), [doğrulama kaydı](docs/DOGRULAMA.md).

Lisans kararı kullanıcı tarafından sonraya bırakılmıştır; lisans eklenmemiştir.

import { caseFor } from './product-cases.ts';
import { commercialDecision } from '../lib/product-value.ts';
import type { Strategy } from '../lib/strategy';

// Yazılım yatırımı için sürümlü karar verisi; ticari puanların devamı değildir.
const projectDevelopment: Strategy = {
  version: '2.2',
  date: '2026-10-10',
  objective:
    'Kullanıcının kendi yazılım projelerinde hangi somut geliştirme dilimine yatırım yapılacağını; teknik katkı, reklamsız satış potansiyeli, bağımlılık, ortak kullanım, doğruluk ve belirsizlik üzerinden seçmek. Gerçekleşmiş ödeme geliştirme koşulu değildir.',
  ownershipBasis:
    'Kullanıcının 10 Ekim 2026 açıklaması: TÜRSAB projeleri hariç yazılım projeleri kendisine aittir. Eski işveren/arkadaş etiketleri bu değerlendirmede dışlama gerekçesi değildir.',
  exclusions: [
    'TÜRSAB projeleri kullanıcı talimatıyla bu geliştirme önceliği kapsamı dışındadır.',
    'Crybro için mevcut ayrıntılı veya kalan analiz kayıtlarında kaynak bulunmadı; proje yok sayılmadı ve değerlendirmesi tamamlanmış gösterilmedi.',
    'Bu 23 kayıt bağımsız çalışan 23 ürün değildir; çatı, platform, ürün ve tarihli araştırma kayıtları ayrılır.',
    'Altı kayıt daha ayrıntılı kaynak incelemesine, on yedi kayıt ilk analiz özetlerine dayanır. Kaynak projelerin çalışma zamanı bu değerlendirmede çalıştırılmadı.',
  ],
  candidates: [
    {
      id: 'atonota',
      name: 'AtonotA / Studio',
      aliases: ['Atonota', 'AtonotA çatı marka'],
      kind: 'umbrella',
      ownership: 'user',
      coverage: 'detailed',
      definition:
        'AtonotA çatı markası altında site ve çalışma alanı bazında SEO, içerik ve GEO analiz yazılımı geliştirme hattı. Studio ve AgencyOps ayrı yatırım birimleridir.',
      observed:
        'Studio web/API bileşimi, tenant modeli ve WordPress bağlantı uçları var. İncelenen workspace yetkisi ve adapter sağlık kontrolünde bağlama/iskelet eksikleri görülüyor; yerel connected bayrağı gerçek bağlantı kanıtı değil.',
      goals: ['flow', 'reliability'],
      capabilities: [
        'Kimlik ve yetki',
        'Çalışma alanı',
        'Dış veri bağlantısı',
        'Analiz',
      ],
      slice: {
        title: 'Studio: yetkili çalışma alanından gerçek analiz sonucuna',
        outcome:
          'Kullanıcı yalnız yetkili olduğu siteyi seçer; doğrulanmış adapter verisinden bir analiz üretir ve bağlantı hatasını doğru görür.',
        acceptance: [
          'Yetkisiz kullanıcı ve başka tenant erişimi reddedilir; sonuç doğru çalışma alanına bağlıdır.',
          'Adapter başarısı gerçek kontrol sonucuna dayanır; bağlantı yoksa başarı görünümü üretilmez.',
          'Aynı örnek veri ve sürümle analiz tekrar edilebilir; hata ve kaynak izi kaydedilir.',
        ],
        steps: [
          'Studio kullanıcı, tenant ve site sınırını tek akış için yaz.',
          'Workspace yetkisini gerçek kimlikle bağla; olumsuz erişim örneklerini çalıştır.',
          'Adapter sağlık kontrolünü gerçek bağlantı ve hata sonucuna bağla.',
          'Bir analiz çıktısını kaynak ve hata iziyle uçtan uca doğrula.',
        ],
      },
      rationale:
        'Mevcut kod parçalarını görünür bir ürün sonucunda birleştirmek, hangi altyapı eksiklerinin gerçekten engel olduğunu gösterebilir.',
      counterargument:
        'Çatı kapsamı geniştir; Studio akışının kullanıcının seçtiği hedefe uygunluğu ve tamamlanma eforu henüz ölçülmedi. AgencyOps veya başka ürün daha güçlü tüketici olabilir.',
      reconsiderWhen:
        'Başka adayın daha önemli kullanıcı sonucunu daha açık bağımlılıklarla tamamladığı veya Studio kapsamının tek dilime sığmadığı gösterilirse tüketici seçimini değiştir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Studio web/API bileşimi, tenant modeli ve WordPress bağlantı uçları var. İncelenen workspace yetkisi ve adapter sağlık kontrolünde bağlama/iskelet eksikleri görülüyor; yerel connected bayrağı gerçek bağlantı kanıtı değil.',
          evidenceIds: [
            'pa05',
            'personal-cont-45cc4166f9b0c2a7',
            'personal-cont-d51a189e7283f8e6',
            'personal-cont-0ce36a8cabc991d6',
            'personal-cont-0842293fab3d8cf2',
            'personal-cont-64ec32bdc9df06a6',
          ],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Kullanıcı yalnız yetkili olduğu siteyi seçer; doğrulanmış adapter verisinden bir analiz üretir ve bağlantı hatasını doğru görür.',
          evidenceIds: ['strategy-proposal-atonota'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Mevcut kod parçalarını görünür bir ürün sonucunda birleştirmek, hangi altyapı eksiklerinin gerçekten engel olduğunu gösterebilir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-atonota'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Yetkisiz kullanıcı ve başka tenant erişimi reddedilir; sonuç doğru çalışma alanına bağlıdır. Adapter başarısı gerçek kontrol sonucuna dayanır; bağlantı yoksa başarı görünümü üretilmez. Aynı örnek veri ve sürümle analiz tekrar edilebilir; hata ve kaynak izi kaydedilir.',
          evidenceIds: ['strategy-proposal-atonota'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-atonota'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          reason:
            'Çalıştırılmış hata kanıtı yok. Statik inceleme riski: Statik incelemede yetki bağlama ve gerçek adapter kontrolü eksikleri görülüyor; çalışma zamanı arızası henüz çalıştırılmadı.',
          evidenceIds: [
            'personal-cont-0842293fab3d8cf2',
            'personal-cont-64ec32bdc9df06a6',
            'pa05',
          ],
        },
        scopeLarge: {
          state: 'yes',
          reason:
            'Çatı, Studio ve AgencyOps birbirinden farklı iş akışlarıdır.',
          evidenceIds: ['personal-cont-45cc4166f9b0c2a7'],
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'yes',
          reason:
            'Önerilen dilim için analist çıkarımı: Tenant ve çalışma alanı yetkisi bu dilimin doğrudan sınırıdır.',
          evidenceIds: ['strategy-proposal-atonota'],
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'pa05',
          label: 'WordPress bağlantı uçları',
          kind: 'source',
          claim:
            'Admin yetkili status/metrics/connect endpointleri var; connect gerçek Studio çağrısı yapmadan yerel connected durumunu true yapıyor.',
          limitation:
            'Bağlandı cevabı karşı sistemle bağlantıyı kanıtlamıyor. Statik kaynak gözlemi; kaynak uygulama çalıştırılmadı. Özel kaynak konumu yayımlanmaz.',
        },
        {
          id: 'personal-cont-45cc4166f9b0c2a7',
          label: 'Çatı marka kararı',
          kind: 'source',
          claim:
            'AtonotA; ürünler, hizmetler ve ortak iç kabiliyetleri altında toplayan çatı marka vizyonudur; tek bir Studio ürünüyle eşitlenmez.',
          limitation:
            'Statik kaynak incelemesi; kaynak ürün çalıştırılmadı. Kayıtlı sürüm ve okuma aralığı özel kanıt defterine bağlıdır.',
        },
        {
          id: 'personal-cont-d51a189e7283f8e6',
          label: 'Studio SEO analiz vizyonu',
          kind: 'source',
          claim:
            'Site çalışma alanlarında SEO ve GEO analizi hedefleniyor; NEVER_BUILD sınırı otomatik uygulamayı dışlıyor.',
          limitation:
            'Statik kaynak incelemesi; kaynak ürün çalıştırılmadı. Kayıtlı sürüm ve okuma aralığı özel kanıt defterine bağlıdır.',
        },
        {
          id: 'personal-cont-0ce36a8cabc991d6',
          label: 'Studio içerik analiz vizyonu',
          kind: 'source',
          claim:
            'İçerik kalite, kayıp, öneri ve AI desteği hedef; otomatik site değişikliği kapsam dışı.',
          limitation:
            'Statik kaynak incelemesi; kaynak ürün çalıştırılmadı. Kayıtlı sürüm ve okuma aralığı özel kanıt defterine bağlıdır.',
        },
        {
          id: 'personal-cont-0842293fab3d8cf2',
          label: 'Studio erişim sınırı',
          kind: 'source',
          claim:
            'İncelenen workspace uçlarında tanımlı kullanıcı yetkilendirmesinin bağlandığı gösterilemedi; tenant parametresi tek başına yetki kontrolü değildir.',
          limitation:
            'Statik kaynak incelemesi; kaynak ürün çalıştırılmadı. Kayıtlı sürüm ve okuma aralığı özel kanıt defterine bağlıdır.',
        },
        {
          id: 'personal-cont-64ec32bdc9df06a6',
          label: 'Adapter sağlık görevi',
          kind: 'source',
          claim:
            'Görevde gerçek adapter sağlık kontrolü yerine TODO ve completed sonucu bulunuyor.',
          limitation:
            'Statik kaynak incelemesi; kaynak ürün çalıştırılmadı. Kayıtlı sürüm ve okuma aralığı özel kanıt defterine bağlıdır.',
        },
        {
          id: 'strategy-proposal-atonota',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Studio: yetkili çalışma alanından gerçek analiz sonucuna. Mevcut kod parçalarını görünür bir ürün sonucunda birleştirmek, hangi altyapı eksiklerinin gerçekten engel olduğunu gösterebilir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'titanlar',
      name: 'Titanlar',
      aliases: [
        'Titanlar v1',
        'Titanlar e-ticaret girişimciliği',
        'Titanlar Kâr Pusulası',
      ],
      kind: 'product',
      ownership: 'user',
      coverage: 'detailed',
      definition:
        'E-ticaret çalışma araçları için yazılım projesi; incelenen somut geliştirme dilimi ürün maliyet ve kâr hesaplayıcısıdır. Eğitim sayfaları bu yazılım diliminin öncelik şartı değildir.',
      observed:
        'Statik eğitim sayfasının yanında maliyet, fiyat, komisyon ve vergi girdileriyle hesap yapan JavaScript kaynağı var. İşaret, yüzde gösterimi ve yeniden hesaplama sırası için statik doğruluk riskleri saptandı.',
      goals: ['reliability', 'flow'],
      capabilities: ['Hesap motoru', 'Form doğrulama', 'Paylaşılabilir sonuç'],
      slice: {
        title: 'Hesaplayıcı: arayüzden ayrılmış ve sınanmış hesap motoru',
        outcome:
          'Aynı girdiler doğru ve tutarlı maliyet/fiyat/marj sonucunu üretir; kullanıcı girdiyi değiştirince bağlı sonuçlar yenilenir.',
        acceptance: [
          'Alan sahibi tarafından onaylanmış örnek girdiler ve beklenen sonuçlar otomatik karşılaştırılır.',
          'Boş, sıfır, sınır ve geçersiz yüzde girdileri açıklanabilir sonuç verir.',
          'Girdi değişimi ve URL üzerinden geri yükleme aynı hesap sözleşmesini kullanır.',
        ],
        steps: [
          'Mevcut formülleri ve birimlerini çıkar; beklenen örnek sonuçları yaz.',
          'Hesap fonksiyonlarını arayüz ve gösterimden ayır.',
          'İşaret, oran ve yeniden hesaplama bağımlılıklarını düzeltip sınır örneklerini çalıştır.',
          'Form, sonuç ve URL paylaşımını aynı motorla uçtan uca doğrula.',
        ],
      },
      rationale:
        'Sınırı belli bir hesap motoru, mevcut yazılımın doğruluğunu doğrudan geliştirebilir ve diğer ürünlerde kural/test yaklaşımına örnek olabilir.',
      counterargument:
        'Bu dilimin diğer projelere ortak altyapı etkisi henüz gösterilmedi; küçük görünmesi otomatik olarak stratejik ilk tercih yapmaz.',
      reconsiderWhen:
        'Hesaplayıcının hedef kullanıcı akışı daha düşük öneme sahipse veya alan formülleri tanımlanamıyorsa başka ürün dilimini öne al.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Statik eğitim sayfasının yanında maliyet, fiyat, komisyon ve vergi girdileriyle hesap yapan JavaScript kaynağı var. İşaret, yüzde gösterimi ve yeniden hesaplama sırası için statik doğruluk riskleri saptandı.',
          evidenceIds: ['pt03', 'personal-cont-75c05faf5a465300'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Aynı girdiler doğru ve tutarlı maliyet/fiyat/marj sonucunu üretir; kullanıcı girdiyi değiştirince bağlı sonuçlar yenilenir.',
          evidenceIds: ['strategy-proposal-titanlar'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Sınırı belli bir hesap motoru, mevcut yazılımın doğruluğunu doğrudan geliştirebilir ve diğer ürünlerde kural/test yaklaşımına örnek olabilir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-titanlar'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Alan sahibi tarafından onaylanmış örnek girdiler ve beklenen sonuçlar otomatik karşılaştırılır. Boş, sıfır, sınır ve geçersiz yüzde girdileri açıklanabilir sonuç verir. Girdi değişimi ve URL üzerinden geri yükleme aynı hesap sözleşmesini kullanır.',
          evidenceIds: ['strategy-proposal-titanlar'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-titanlar'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          reason:
            'Çalıştırılmış hata kanıtı yok. Statik inceleme riski: Kaynak incelemesi hesap işareti, oran gösterimi ve tekrar hesaplama riskleri belirledi; çalıştırılmış sonuç hatası iddiası değildir.',
          evidenceIds: ['personal-cont-75c05faf5a465300'],
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'pt03',
          label: 'Ürün maliyet hesaplayıcısı',
          kind: 'source',
          claim:
            'Alış, işçilik, ambalaj, kargo, komisyon ve vergi girdileri; fiyat/marj hesap dalları ve URL ile parametre paylaşma kodu var.',
          limitation:
            'Kaynak metnin tamamı aynı güncel SHA sürümünde okundu. Formül dalları statik incelendi; doğruluk, güncellik, sınır girdileri ve URL paylaşımı çalıştırılarak test edilmedi. Özel kaynak konumu yayımlanmaz.',
        },
        {
          id: 'personal-cont-75c05faf5a465300',
          label: 'Kâr hesaplayıcı kaynak incelemesi',
          kind: 'source',
          claim:
            'Maliyet, fiyat ve komisyon girdili hesaplayıcı var; paketleme/işçilik işareti, yüzde gösterimi ve tekrar hesaplama sırası için doğruluk riski saptandı.',
          limitation:
            'Statik kaynak incelemesi; kaynak ürün çalıştırılmadı. Kayıtlı sürüm ve okuma aralığı özel kanıt defterine bağlıdır.',
        },
        {
          id: 'strategy-proposal-titanlar',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Hesaplayıcı: arayüzden ayrılmış ve sınanmış hesap motoru. Sınırı belli bir hesap motoru, mevcut yazılımın doğruluğunu doğrudan geliştirebilir ve diğer ürünlerde kural/test yaklaşımına örnek olabilir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'hrms',
      name: 'HRMS',
      aliases: ['Kişisel HRMS', 'HR Product SaaS'],
      kind: 'product',
      ownership: 'user',
      coverage: 'detailed',
      definition:
        'Çalışan, izin, zaman, bordro ve diğer İK süreçlerini yönetmeyi hedefleyen yazılım projesi.',
      observed:
        'Türkiye İK gereksinimleri ve geniş modül hedefleri tanımlı. Bu kayıtta entegre çalışan/izin/bordro akışının çalıştırılmış kabulü yok.',
      goals: ['flow', 'discovery'],
      capabilities: ['Alan modeli', 'Rol ve onay', 'Denetim izi'],
      slice: {
        title: 'Çalışan kaydından izin talebi ve onay durumuna',
        outcome:
          'Sentetik çalışan verisi üzerinde izin talebi oluşturulur; yetkili rol karar verir ve durum değişikliği izlenir.',
        acceptance: [
          'Talep eden ve onaylayan rol sınırları ile başka çalışan kaydına erişim sınanır.',
          'İzin durum geçişleri ve tarih çakışması örnekleri alan kurallarına göre sonuç verir.',
          'Tekrar işlem ve ret sonrası davranış denetim iziyle açıklanır.',
        ],
        steps: [
          'Çalışan, izin talebi, roller ve durum geçişleri için tek sözleşme yaz.',
          'Bu dilimi karşılayan mevcut kodu ve eksik parçaları güncel sürümde eşle.',
          'Sentetik veride talep, onay, ret ve geçersiz geçişleri uygula.',
          'Rol sınırını, veri sonucunu ve denetim izini birlikte doğrula.',
        ],
      },
      rationale:
        'Bir gerçek İK durumu, geniş modül listesini uygulanabilir alan modeli ve iş akışı üzerinden değerlendirmeyi sağlar.',
      counterargument:
        'Kaynak kapsaması uygulama düzeyinde sınırlı; bordro gibi ayrı hesap alanları bu ilk akışla doğrulanmış olmaz.',
      reconsiderWhen:
        'Güncel kaynakta farklı bir İK akışı daha tamamlanabilir veya diğer ürünlerin daha önemli ortak tüketicisi olarak kanıtlanırsa dilimi değiştir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Türkiye İK gereksinimleri ve geniş modül hedefleri tanımlı. Bu kayıtta entegre çalışan/izin/bordro akışının çalıştırılmış kabulü yok.',
          evidenceIds: ['ph01'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Sentetik çalışan verisi üzerinde izin talebi oluşturulur; yetkili rol karar verir ve durum değişikliği izlenir.',
          evidenceIds: ['strategy-proposal-hrms'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Bir gerçek İK durumu, geniş modül listesini uygulanabilir alan modeli ve iş akışı üzerinden değerlendirmeyi sağlar. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-hrms'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Talep eden ve onaylayan rol sınırları ile başka çalışan kaydına erişim sınanır. İzin durum geçişleri ve tarih çakışması örnekleri alan kurallarına göre sonuç verir. Tekrar işlem ve ret sonrası davranış denetim iziyle açıklanır.',
          evidenceIds: ['strategy-proposal-hrms'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-hrms'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'yes',
          reason:
            'Bordro, ATS, performans ve diğer modüller farklı kabul kapsamlarıdır.',
          evidenceIds: ['ph01'],
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'yes',
          reason:
            'Önerilen dilim için analist çıkarımı: Yetki, çalışan ve yönetici sınırları gereksinimde tanımlanan ürün konularıdır.',
          evidenceIds: ['strategy-proposal-hrms'],
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'ph01',
          label: 'Kişisel İK gereksinim belgesi',
          kind: 'source',
          claim:
            'Türkiye İK lokalizasyonu; bordro, puantaj, izin, ATS, performans, yetki ve paketleme hedefleri tanımlanmış; müşteri/çekirdek modül soruları açık.',
          limitation:
            'Gereksinim listesi uygulanmış özellik veya müşteri doğrulaması değildir; diğer kaynaklarla sahiplik ve ürün özdeşliği varsayılmadı. Statik kaynak gözlemi; kaynak uygulama çalıştırılmadı. Özel kaynak konumu yayımlanmaz.',
        },
        {
          id: 'strategy-proposal-hrms',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Çalışan kaydından izin talebi ve onay durumuna. Bir gerçek İK durumu, geniş modül listesini uygulanabilir alan modeli ve iş akışı üzerinden değerlendirmeyi sağlar.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'metaframer',
      name: 'MetaFramer / MetaFramework',
      aliases: [
        'Metaframer',
        'Metaframework',
        'MetaFramer Kernel',
        'Meta Framework Domain Checklist',
      ],
      kind: 'platform',
      ownership: 'user',
      coverage: 'detailed',
      definition:
        'İş uygulamalarının kimlik, yetki, veri, işlem ve sunum sözleşmelerini ortaklaştırmayı hedefleyen yazılım altyapısı.',
      observed:
        'Customer uygulama çekirdeği, typed API, sunum durumları, app-owned SQL/audit/outbox kayıtları, sürümlü renderer ve relay kodu görülüyor. Belgedeki drill anlatımı bağımsız çalıştırma değildir; test hostundaki kimlik/policy sınırı üretim auth kabulü sağlamaz.',
      goals: ['core', 'reliability'],
      capabilities: [
        'Ortak sözleşme',
        'Kimlik ve yetki',
        'İşlem bütünlüğü',
        'Denetim izi',
        'SDK',
      ],
      slice: {
        title: 'Gerçek tüketicide güvenli kayıt işlemi ve hata zinciri',
        outcome:
          'Seçilen ürün tüketicisi bir kaydı güvenilir kimlikle yazar; işlem, audit ve outbox sonucu hata/tekrar koşullarında tutarlı kalır.',
        acceptance: [
          'Temiz tüketici kurulumu ve sürümlü sözleşme uyumu bağımsız kaydedilir.',
          'Gerçek kimlik/policy sınırı başka tenant erişimini ve yetkisiz işlemi reddeder.',
          'Kayıt, audit ve outbox atomikliği ile tekrar işlem, relay hatası ve geri yükleme davranışı sınanır.',
          'Ortaklaştırılacak sözleşmenin ikinci üründeki somut kullanıcı akışı ve uyarlama maliyeti gösterilir.',
        ],
        steps: [
          'Tek gerçek ürün tüketicisini ve gereken işlem sözleşmesini seç.',
          'Test kimliği ve genel ALLOW yerine tüketicinin gerçek yetki/policy sınırını bağla.',
          'Transaction, idempotency, audit ve relay hata örneklerini temiz ortamda çalıştır.',
          'İkinci tüketicinin aynı sözleşmeyi kullanıp kullanmadığını entegrasyon ve bakım eforuyla karşılaştır.',
        ],
      },
      rationale:
        'Mevcut altyapı kodunu tüketici üzerinden doğrulamak, portföyde gerçekten ortaklaşabilen parçaları ayırabilir.',
      counterargument:
        'Kod miktarı ve 168 SRS ortak kullanım kanıtı değildir. Tüketici gereksinimi olmadan geniş çekirdeği büyütmek bağımlılık ve bakım yükünü artırabilir.',
      reconsiderWhen:
        'Seçilen tüketicinin daha basit bir çözümle ilerlediği, ikinci tüketicide sözleşmenin ortaklaşmadığı veya altyapının ürün akışını geciktirdiği ölçülürse kapsamı değiştir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Customer uygulama çekirdeği, typed API, sunum durumları, app-owned SQL/audit/outbox kayıtları, sürümlü renderer ve relay kodu görülüyor. Belgedeki drill anlatımı bağımsız çalıştırma değildir; test hostundaki kimlik/policy sınırı üretim auth kabulü sağlamaz.',
          evidenceIds: [
            'personal-cont-264ff62bc328b6c6',
            'personal-cont-f32229f7ba217487',
            'personal-cont-b4d10a8b0281b49f',
            'personal-cont-16aaf996d898135d',
            'personal-cont-1b88e5a5440d86c7',
            'personal-cont-d523cc2b30039ab3',
            'personal-cont-5218cd717caa5fc9',
            'personal-cont-64e1fc81e3b5bda0',
          ],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Seçilen ürün tüketicisi bir kaydı güvenilir kimlikle yazar; işlem, audit ve outbox sonucu hata/tekrar koşullarında tutarlı kalır.',
          evidenceIds: ['strategy-proposal-metaframer'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Mevcut altyapı kodunu tüketici üzerinden doğrulamak, portföyde gerçekten ortaklaşabilen parçaları ayırabilir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-metaframer'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Temiz tüketici kurulumu ve sürümlü sözleşme uyumu bağımsız kaydedilir. Gerçek kimlik/policy sınırı başka tenant erişimini ve yetkisiz işlemi reddeder. Kayıt, audit ve outbox atomikliği ile tekrar işlem, relay hatası ve geri yükleme davranışı sınanır. Ortaklaştırılacak sözleşmenin ikinci üründeki somut kullanıcı akışı ve uyarlama maliyeti gösterilir.',
          evidenceIds: ['strategy-proposal-metaframer'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'reuse',
          state: 'inferred',
          finding:
            'Mevcut altyapı kodunu tüketici üzerinden doğrulamak, portföyde gerçekten ortaklaşabilen parçaları ayırabilir. İkinci gerçek tüketicide aynı sözleşmenin uyarlama ve bakım maliyeti henüz ölçülmedi.',
          evidenceIds: ['strategy-proposal-metaframer'],
          verification:
            'İki ürünün somut kullanıcı akışında ortak kalan sözleşmeyi ve ürüne özel parçaları göster; toplam entegrasyon/bakım eforunu karşılaştır.',
          decisionImpact:
            'Ortak altyapı yatırımı, gerçekleşmiş yeniden kullanım kanıtı geldikçe genişletilir; plan büyüklüğüyle puanlanmaz.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-metaframer'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          reason:
            'Çalıştırılmış hata kanıtı yok. Statik inceleme riski: Test hostunda invariant ve genel ALLOW sınırları görülüyor; ürün yetkisi yerine kullanılamaz.',
          evidenceIds: ['personal-cont-64e1fc81e3b5bda0'],
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          reason:
            'Çok tüketicili ortak kullanım henüz doğrulanmadı. Bu eksiklik tek başına gereksiz genelleme yapıldığını kanıtlamaz.',
          evidenceIds: [],
        },
        roleBoundary: {
          state: 'yes',
          reason:
            'Önerilen dilim için analist çıkarımı: Typed API tenant ve correlation eşleşmesi denetliyor; gerçek auth ayrıca bağlanmalı.',
          evidenceIds: ['strategy-proposal-metaframer'],
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'personal-cont-264ff62bc328b6c6',
          label: 'Kernel güncel ilerleme ve sınır belgesi',
          kind: 'source',
          claim:
            'Güncel README iç kabiliyet olarak deterministik çekirdek/SDK/uygulama yüzeyi vizyonunu koruyor; dış ürün kullanılabilirliği için üç bağımsız ekip ve ownerHelpCount=0 gerektiriyor. Daha sonraki P05–P23 paketleri Customer uygulama tüketicisi, SDK dağıtımı, app-owned persistence, outbox relay, geçici HTTP ve DR drill varlığını bildiriyor; eski Ağustos planlarındaki yokluk ifadeleri bugünün yokluğuna genişletilemez. P24 aktif, 23/25 tamamlandı özbildirimi hazır/satılabilir/production ürün anlamına gelmez; güçlü global readiness bayrakları kapalı.',
          limitation:
            '987 satır bütünü okundu; dış Git/CI/aktivasyon/çalışma zamanı doğrulanmadı. Yerel runtime veya kaynak ürün komutu çalıştırılmadı. Kaynak SHA bağı özel inceleme defterinde; özel konum yayımlanmaz.',
        },
        {
          id: 'personal-cont-f32229f7ba217487',
          label: 'Customer uygulama çekirdeği',
          kind: 'source',
          claim:
            '59 satır gerçek uygulama tüketicisi: public SDK sözleşmesi, exact coordinate ve customer:core grant doğrulaması; persistence opt-in.',
          limitation:
            'status ready yalnız bu nesnenin sözleşme durumudur; kernel/ürün readiness değildir. Tam statik kaynak okuması; komut/test/runtime çalıştırılmadı. Kaynak SHA bağı özel inceleme defterinde; özel konum yayımlanmaz.',
        },
        {
          id: 'personal-cont-b4d10a8b0281b49f',
          label: 'Customer typed modül API',
          kind: 'source',
          claim:
            '96 satır typed Customer API: action/record/insert options, tenant ve audit/outbox correlation eşleşmesini insert öncesi denetliyor.',
          limitation:
            'Bu tek customer.create@1 dilimi HRMS/PIM/İBYS ürün özelliklerini kanıtlamaz. Tam statik kaynak okuması; komut/test/runtime çalıştırılmadı. Kaynak SHA bağı özel inceleme defterinde; özel konum yayımlanmaz.',
        },
        {
          id: 'personal-cont-16aaf996d898135d',
          label: 'Customer sunum durumu',
          kind: 'source',
          claim:
            '116 satır DOM içermeyen sunum durumu: idle/submitting/saved/rejected, single-flight, generic alert ve retry.',
          limitation:
            'Surface kelimesi görsel web arayüzü veya yayınlanmış uygulama demek değildir. Tam statik kaynak okuması; komut/test/runtime çalıştırılmadı. Kaynak SHA bağı özel inceleme defterinde; özel konum yayımlanmaz.',
        },
        {
          id: 'personal-cont-1b88e5a5440d86c7',
          label: 'Customer audit ve outbox kayıtları',
          kind: 'source',
          claim:
            '118 satır app-owned kayıt+audit_log+transactional_outbox yazıları aynı injected query; duplicate outbox key için nonretryable idempotency error.',
          limitation:
            'Transaction garantisi çağıranın query/transaction sınırına bağlı; yalnız adapter satırları tek başına atomik çalışma kanıtı değil. Tam statik kaynak okuması; komut/test/runtime çalıştırılmadı. Kaynak SHA bağı özel inceleme defterinde; özel konum yayımlanmaz.',
        },
        {
          id: 'personal-cont-d523cc2b30039ab3',
          label: 'Tek geçiş outbox relay',
          kind: 'source',
          claim:
            '73 satır gerçek relay_once fonksiyonu: batch claim, deliver callback, yeni transactionda fenced publish/release.',
          limitation:
            'Consumer döngüsü, retry politikası ve DLQ explicit yok; süreklilik/SLA doğrulanmadı. Tam statik kaynak okuması; komut/test/runtime çalıştırılmadı. Kaynak SHA bağı özel inceleme defterinde; özel konum yayımlanmaz.',
        },
        {
          id: 'personal-cont-5218cd717caa5fc9',
          label: 'Sürümlü SDK dağıtım renderer',
          kind: 'source',
          claim:
            '53 satır caller sürümüyle ESM action module + manifest + SHA256 integrity file set renderer var.',
          limitation:
            'Paket registry yayını veya bağımsız ekip kullanımının kanıtı değil. Tam statik kaynak okuması; komut/test/runtime çalıştırılmadı. Kaynak SHA bağı özel inceleme defterinde; özel konum yayımlanmaz.',
        },
        {
          id: 'personal-cont-64e1fc81e3b5bda0',
          label: 'Test host kimlik ve audit sınırı',
          kind: 'source',
          claim:
            '387 satır stdio→gerçek ASGI composition çağrısı; allow modunda explicit trusted tenant/actor, deny default, audit opt-in.',
          limitation:
            'Bu test runner kimlik enjeksiyonu production auth değil; audit default off; evaluateInvariants placeholder true, allow policy genel ALLOW. Tam statik kaynak okuması; komut/test/runtime çalıştırılmadı. Kaynak SHA bağı özel inceleme defterinde; özel konum yayımlanmaz.',
        },
        {
          id: 'strategy-proposal-metaframer',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Gerçek tüketicide güvenli kayıt işlemi ve hata zinciri. Mevcut altyapı kodunu tüketici üzerinden doğrulamak, portföyde gerçekten ortaklaşabilen parçaları ayırabilir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'pim',
      name: 'PIM',
      aliases: [
        'PIM v2',
        'Product Information Management',
        'Ürün Bilgi Yönetimi',
      ],
      kind: 'product',
      ownership: 'user',
      coverage: 'detailed',
      definition:
        'Ürün ve varyant bilgisini modelleyen, veri kalitesini kontrol eden ve satış kanallarına sürümlü yayın hazırlayan yazılım projesi.',
      observed:
        'Temel ürün alanları içeren deklaratif arketip ile kapsam belgeleri görülüyor. Çok dil, varyant, kanal hazır oluşu ve yayın akışı çalıştırılmış özellik olarak gösterilmedi; kapsam belgelerinde DAM ve primitive gereksinimi anlatımı çelişiyor.',
      goals: ['flow', 'core'],
      capabilities: [
        'Alan modeli',
        'Veri doğrulama',
        'Sürüm ve fark',
        'Kanal dışa aktarma',
      ],
      slice: {
        title: 'Ürün kaydından doğrulanmış kanal çıktısına',
        outcome:
          'Ürün kaydı doğrulanır; değişiklik sürüm/fark olarak izlenir ve bir kanalın sözleşmesine uygun çıktı üretilir.',
        acceptance: [
          'Ürün/öznitelik/referans kuralları geçersiz kayıtları açıklanabilir hatayla reddeder.',
          'Tek güncellemenin önce/sonra sürümü ve yayınlanacak farkı doğrulanır.',
          'Aynı onaylı sürümden deterministik kanal çıktısı üretilir; tenant sınırı test edilir.',
        ],
        steps: [
          'Ürün, öznitelik ve seçilen kanalın zorunlu alanlarını sözleşmeye bağla.',
          'İçe alma ve doğrulama hatalarını deterministik olarak uygula.',
          'Güncelleme, sürüm ve fark izini kur.',
          'Bir kanal çıktısını onaylı örnek ve yetki sınırıyla uçtan uca doğrula.',
        ],
      },
      rationale:
        'PIM, alan modeli, doğrulama ve sürümlü yayın gibi diğer ürünlerde de gerekli olabilecek yetenekleri somut ürün sonucunda sınar.',
      counterargument:
        'Ortak yetenek benzerliği kanıtlanmış yeniden kullanım değildir; varyant ve dil kapsamı kontrolsüz büyüyebilir.',
      reconsiderWhen:
        'Seçilen kanalın alan sözleşmesi tanımlanamıyorsa veya mevcut uygulama farklı ürün modelini gerektiriyorsa önce bu belirsizliği çöz.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Temel ürün alanları içeren deklaratif arketip ile kapsam belgeleri görülüyor. Çok dil, varyant, kanal hazır oluşu ve yayın akışı çalıştırılmış özellik olarak gösterilmedi; kapsam belgelerinde DAM ve primitive gereksinimi anlatımı çelişiyor.',
          evidenceIds: [
            'personal-cont-15ecf3add98aa743',
            'personal-cont-96d582c806d2eb87',
            'personal-cont-c3c2d506536ac22d',
          ],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Ürün kaydı doğrulanır; değişiklik sürüm/fark olarak izlenir ve bir kanalın sözleşmesine uygun çıktı üretilir.',
          evidenceIds: ['strategy-proposal-pim'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'PIM, alan modeli, doğrulama ve sürümlü yayın gibi diğer ürünlerde de gerekli olabilecek yetenekleri somut ürün sonucunda sınar. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-pim'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Ürün/öznitelik/referans kuralları geçersiz kayıtları açıklanabilir hatayla reddeder. Tek güncellemenin önce/sonra sürümü ve yayınlanacak farkı doğrulanır. Aynı onaylı sürümden deterministik kanal çıktısı üretilir; tenant sınırı test edilir.',
          evidenceIds: ['strategy-proposal-pim'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-pim'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'yes',
          reason:
            'Önerilen dilim için analist çıkarımı: Tenant izolasyonu deklaratif hedef; gerçek kabul ayrı doğrulanmalı.',
          evidenceIds: ['strategy-proposal-pim'],
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'no',
          reason:
            'DAM ve primitive kapsamındaki belge çelişkisi korunuyor; önerilen ürün modeli/doğrulama/çıktı diliminde DAM zorunlu kapsam değil. Bu nedenle bu çelişki tek başına seçilen dilimi bekletmez.',
          evidenceIds: ['strategy-proposal-pim'],
        },
      },
      evidence: [
        {
          id: 'personal-cont-15ecf3add98aa743',
          label: 'Ürün arketipi sözleşmesi',
          kind: 'source',
          claim:
            'Küçük ürün kaydı alanları var; çok dil, varyant, kanal hazır oluşu ve PIM yayın akışı çalışan ürün olarak gösterilmedi.',
          limitation:
            'Statik kaynak incelemesi; kaynak ürün çalıştırılmadı. Kayıtlı sürüm ve okuma aralığı özel kanıt defterine bağlıdır.',
        },
        {
          id: 'personal-cont-96d582c806d2eb87',
          label: 'PIM kapsam eşleme belgesi',
          kind: 'source',
          claim:
            'Yönergede özellik varlığı iddiaları, çalıştırılmış işlev kanıtıyla eşit değildir; DAM ve yeni primitive gereksinimi anlatımında çelişki var.',
          limitation:
            'Statik kaynak incelemesi; kaynak ürün çalıştırılmadı. Kayıtlı sürüm ve okuma aralığı özel kanıt defterine bağlıdır.',
        },
        {
          id: 'personal-cont-c3c2d506536ac22d',
          label: 'PIM ürün sınırları',
          kind: 'source',
          claim:
            'PIM pazarlama kataloğunun kaynağı; ERP operasyon/finans, fiyatlandırma ve DAM ayrı sorumluluklar.',
          limitation:
            'Statik kaynak incelemesi; kaynak ürün çalıştırılmadı. Kayıtlı sürüm ve okuma aralığı özel kanıt defterine bağlıdır.',
        },
        {
          id: 'strategy-proposal-pim',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Ürün kaydından doğrulanmış kanal çıktısına. PIM, alan modeli, doğrulama ve sürümlü yayın gibi diğer ürünlerde de gerekli olabilecek yetenekleri somut ürün sonucunda sınar.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'ibys',
      name: 'İBYS / İSG operasyon ürünü',
      aliases: [
        'İBYS',
        'IBYS',
        'İNYS — kaynak yazımı',
        'İSG SaaS',
        'OSGB operasyon yazılımı',
      ],
      kind: 'product',
      ownership: 'user',
      coverage: 'detailed',
      definition:
        'OSGB portföyü, işyerleri, profesyoneller, ziyaret/eğitim kapasitesi ve belge durumlarını yöneten yazılım projesi.',
      observed:
        'Ayrıntılı gereksinim taslağı var; teknoloji ve portal kararları birbiriyle çelişiyor. Çalışan modül veya resmî gönderim kabulü bu kayıtta gösterilmedi.',
      goals: ['flow', 'discovery'],
      capabilities: ['Planlama kuralları', 'Rol ve onay', 'Belge durumu'],
      slice: {
        title: 'İşyeri ve profesyonel için çakışmasız ziyaret planı',
        outcome:
          'Sentetik portföyde ziyaret atanır; kapasite ve tarih çakışması açıklanır, yetkili kullanıcı planı onaylar.',
        acceptance: [
          'OSGB, işyeri ve profesyonel erişimleri ayrılır; yetkisiz görünüm reddedilir.',
          'Çakışma ve kapasite kuralları onaylı örneklerde beklenen kararı üretir.',
          'Plan değişikliği ve onay izi doğrulanır; resmî gönderim veya sağlık kaydı kabulü ima edilmez.',
        ],
        steps: [
          'Teknoloji/portal çelişkisini mevcut kaynak ve hedef akışla çöz.',
          'İşyeri, profesyonel, ziyaret, kapasite ve durum sözleşmelerini tanımla.',
          'Sentetik veride atama, çakışma ve plan değişikliğini uygula.',
          'Rol sınırları ve plan kabulünü doğrula; resmî gateway için ayrı entegrasyon dilimi tanımla.',
        ],
      },
      rationale:
        'Operasyon planı, geniş kapsam içinden kural ve rol modelini sınayan gözlemlenebilir bir yazılım sonucu verir.',
      counterargument:
        'Gereksinim ayrıntısı çalışan ürün değildir; güncel kod ve alan kuralları eksikse geliştirme eforu yüksek olabilir.',
      reconsiderWhen:
        'Teknoloji kararı çözülemezse veya farklı iş akışı daha güçlü ilk tüketici olursa önce o dilimi değerlendir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Ayrıntılı gereksinim taslağı var; teknoloji ve portal kararları birbiriyle çelişiyor. Çalışan modül veya resmî gönderim kabulü bu kayıtta gösterilmedi.',
          evidenceIds: ['pi01', 'personal-cont-18c5fa0486a0353f'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Sentetik portföyde ziyaret atanır; kapasite ve tarih çakışması açıklanır, yetkili kullanıcı planı onaylar.',
          evidenceIds: ['strategy-proposal-ibys'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Operasyon planı, geniş kapsam içinden kural ve rol modelini sınayan gözlemlenebilir bir yazılım sonucu verir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-ibys'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: OSGB, işyeri ve profesyonel erişimleri ayrılır; yetkisiz görünüm reddedilir. Çakışma ve kapasite kuralları onaylı örneklerde beklenen kararı üretir. Plan değişikliği ve onay izi doğrulanır; resmî gönderim veya sağlık kaydı kabulü ima edilmez.',
          evidenceIds: ['strategy-proposal-ibys'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-ibys'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'yes',
          reason:
            'Planlama, sağlık verisi ve resmî gateway ayrı kabul kapsamlarıdır.',
          evidenceIds: ['personal-cont-18c5fa0486a0353f'],
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'yes',
          reason:
            'Önerilen dilim için analist çıkarımı: OSGB, işyeri ve profesyonel farklı roller ve veri sınırları gerektiriyor.',
          evidenceIds: ['strategy-proposal-ibys'],
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'yes',
          reason: 'Teknoloji ve portal kararları kapsam taslağında uyuşmuyor.',
          evidenceIds: ['pi01'],
        },
      },
      evidence: [
        {
          id: 'pi01',
          label: 'İSG operasyon araştırması',
          kind: 'source',
          claim:
            'İSG/OSGB operasyon ürünü ve ayrı ÇSGB/sosyal sigorta gateway vizyonu; OSGB alıcı, profesyoneller kullanıcı olarak ele alınıyor.',
          limitation:
            '1989 satırın tamamı aynı güncel SHA sürümünde okundu. İlk bölüm ISO27001/şirket türü şartı derken sonraki bölüm bunları doğrulanamamış sayıyor. Ürün kodu veya canlı yetki kanıtı bulunmadı; kaynak uygulama çalıştırılmadı. Özel kaynak konumu yayımlanmaz.',
        },
        {
          id: 'personal-cont-18c5fa0486a0353f',
          label: 'İSG operasyonunun tam kapsam taslağı',
          kind: 'source',
          claim:
            'OSGB portföyü, işyeri, personel/ziyaret planı, eğitim ve belge takibi; resmî gönderim ve sağlık verisi ayrı yetki ve doğrulama gerektiriyor.',
          limitation:
            'Statik kaynak incelemesi; kaynak ürün çalıştırılmadı. Kayıtlı sürüm ve okuma aralığı özel kanıt defterine bağlıdır.',
        },
        {
          id: 'strategy-proposal-ibys',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'İşyeri ve profesyonel için çakışmasız ziyaret planı. Operasyon planı, geniş kapsam içinden kural ve rol modelini sınayan gözlemlenebilir bir yazılım sonucu verir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'genui',
      name: 'GenUI / Nexus ERP',
      aliases: [],
      kind: 'platform',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'ERP iş verisini şema, izinli işlem ve AI/GenUI yüzeyine bağlayan yazılım altyapısı.',
      observed:
        'Ürün/stok, satış, satın alma ve finans için Zod şemaları ile izinli işlem tanımları görülüyor. Tek sözleşme dosyası gerçek sunucu kimliği, referans bütünlüğü veya ERP uçtan uca kabulü sağlamaz.',
      goals: ['flow', 'core'],
      capabilities: ['Ortak sözleşme', 'Rol ve onay', 'AI işlem yüzeyi'],
      slice: {
        title: 'Satın alma taslağından onaylı işleme',
        outcome:
          'GenUI satın alma taslağı üretir; gerçek kullanıcı yetkisiyle insan onayı alınır ve kararın kaydı tutulur.',
        acceptance: [
          'Sunucunun bağladığı aktör/tenant ile işlem yetkisi doğrulanır.',
          'Geçersiz ürün, miktar ve para birimi referansları açıklanabilir hatayla reddedilir.',
          'Onay, tekrar işlem ve audit olayı tek sürümlü sözleşmeyle sınanır.',
        ],
        steps: [
          'Satın alma taslağı sözleşmesini ve izinli işlemi seç.',
          'Kimliği sunucudan bağla; şema ve gerçek referansları doğrula.',
          'İnsan onayı ve audit sonucunu uygula.',
          'Sentetik veride başarılı, yetkisiz ve tekrar işlem örneklerini çalıştır.',
        ],
      },
      rationale:
        'Somut bir ERP işlemi, AI yüzeyi ile deterministik iş kuralı arasındaki sınırı ölçmeye uygundur.',
      counterargument:
        'Şemalar tek başına çalışan entegrasyon değildir; MetaFramer ile aynı altyapı sayılıp sayılmadığı kanıtlanmadı.',
      reconsiderWhen:
        'Mevcut ERP bağlamı veya ortak sözleşme başka tüketici gerektiriyorsa önce tüketici ve entegrasyon sınırını değiştir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Ürün/stok, satış, satın alma ve finans için Zod şemaları ile izinli işlem tanımları görülüyor. Tek sözleşme dosyası gerçek sunucu kimliği, referans bütünlüğü veya ERP uçtan uca kabulü sağlamaz.',
          evidenceIds: ['CONT-REM-SRC-001'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'GenUI satın alma taslağı üretir; gerçek kullanıcı yetkisiyle insan onayı alınır ve kararın kaydı tutulur.',
          evidenceIds: ['strategy-proposal-genui'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Somut bir ERP işlemi, AI yüzeyi ile deterministik iş kuralı arasındaki sınırı ölçmeye uygundur. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-genui'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Sunucunun bağladığı aktör/tenant ile işlem yetkisi doğrulanır. Geçersiz ürün, miktar ve para birimi referansları açıklanabilir hatayla reddedilir. Onay, tekrar işlem ve audit olayı tek sürümlü sözleşmeyle sınanır.',
          evidenceIds: ['strategy-proposal-genui'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'reuse',
          state: 'inferred',
          finding:
            'Somut bir ERP işlemi, AI yüzeyi ile deterministik iş kuralı arasındaki sınırı ölçmeye uygundur. İkinci gerçek tüketicide aynı sözleşmenin uyarlama ve bakım maliyeti henüz ölçülmedi.',
          evidenceIds: ['strategy-proposal-genui'],
          verification:
            'İki ürünün somut kullanıcı akışında ortak kalan sözleşmeyi ve ürüne özel parçaları göster; toplam entegrasyon/bakım eforunu karşılaştır.',
          decisionImpact:
            'Ortak altyapı yatırımı, gerçekleşmiş yeniden kullanım kanıtı geldikçe genişletilir; plan büyüklüğüyle puanlanmaz.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-genui'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          reason:
            'Çok tüketicili ortak kullanım henüz doğrulanmadı. Bu eksiklik tek başına gereksiz genelleme yapıldığını kanıtlamaz.',
          evidenceIds: [],
        },
        roleBoundary: {
          state: 'yes',
          reason:
            'Önerilen dilim için analist çıkarımı: Satın alma işleminin gerçek aktör/tenant ve izin sınırı doğrulanmalıdır.',
          evidenceIds: ['strategy-proposal-genui'],
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-SRC-001',
          label: 'GenUI / Nexus ERP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Ürün/stok, satış, satın alma ve finans için Zod şemaları ile izinli işlem tanımları görülüyor. Tek sözleşme dosyası gerçek sunucu kimliği, referans bütünlüğü veya ERP uçtan uca kabulü sağlamaz.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-genui',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Satın alma taslağından onaylı işleme. Somut bir ERP işlemi, AI yüzeyi ile deterministik iş kuralı arasındaki sınırı ölçmeye uygundur.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'woocommnts',
      name: 'WooCommnts',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'WooCommerce yorumlarını seçili sunumlara bağlayan WordPress eklentisi.',
      observed:
        'Yorumları alan modeline ve WordPress tablosuna taşıyan repository taslağı var. Slider sorgusu boş koleksiyon döndürüyor; save/delete sonuçlarının kontrolü eksik. Ön yüz ve güvenli çıktı kabulü yapılmadı.',
      goals: ['flow', 'reliability'],
      capabilities: ['WordPress eklentisi', 'Veri saklama', 'Güvenli çıktı'],
      slice: {
        title: 'Yorum seçiminden güvenli slider görünümüne',
        outcome:
          'Seçilen yorum sliderla ilişkilendirilir, kaydedilir ve ön yüzde güvenli olarak gösterilir; silme ve moderasyon değişikliği tutarlı yansır.',
        acceptance: [
          'Slider sorgusu kayıtlı ilişkileri döndürür; save/delete başarısızlığı başarı gibi sunulmaz.',
          'Yorum silme ve moderasyon değişikliğinde eski ilişki/çıktı davranışı doğrulanır.',
          'Kullanıcı kaynaklı metin güvenli kaçışla gösterilir; yetki ve nonce sınırı sınanır.',
        ],
        steps: [
          'Repository sorgu ve yazma sonucunun sözleşmesini yaz.',
          'Slider ilişkisi, sorgu ve hata dönüşünü tamamla.',
          'Ön yüzü güvenli metin üretimiyle bağla.',
          'Kaydetme, silme, moderasyon ve yetkisiz işlem örneklerini çalıştır.',
        ],
      },
      rationale:
        'Eksik sorgu ve yazma sonucu gibi belirli kaynak sorunları tamamlanabilir ürün dilimi oluşturuyor.',
      counterargument:
        'Mevcut statik kapsam dar; ön yüz ve WordPress sürüm uyumu incelenmeden yakın tamamlanma iddiası kurulamaz.',
      reconsiderWhen:
        'Güncel kaynakta eksiklerin daha geniş bir yeniden çalışma gerektirdiği görülürse efor ve dilimi yeniden değerlendir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Yorumları alan modeline ve WordPress tablosuna taşıyan repository taslağı var. Slider sorgusu boş koleksiyon döndürüyor; save/delete sonuçlarının kontrolü eksik. Ön yüz ve güvenli çıktı kabulü yapılmadı.',
          evidenceIds: ['CONT-REM-SRC-002'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Seçilen yorum sliderla ilişkilendirilir, kaydedilir ve ön yüzde güvenli olarak gösterilir; silme ve moderasyon değişikliği tutarlı yansır.',
          evidenceIds: ['strategy-proposal-woocommnts'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Eksik sorgu ve yazma sonucu gibi belirli kaynak sorunları tamamlanabilir ürün dilimi oluşturuyor. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-woocommnts'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Slider sorgusu kayıtlı ilişkileri döndürür; save/delete başarısızlığı başarı gibi sunulmaz. Yorum silme ve moderasyon değişikliğinde eski ilişki/çıktı davranışı doğrulanır. Kullanıcı kaynaklı metin güvenli kaçışla gösterilir; yetki ve nonce sınırı sınanır.',
          evidenceIds: ['strategy-proposal-woocommnts'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-woocommnts'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          reason:
            'Çalıştırılmış hata kanıtı yok. Statik inceleme riski: Sorgu boş koleksiyon döndürüyor ve SQL yazma sonuçları kontrol edilmiyor; statik bulgudur.',
          evidenceIds: ['CONT-REM-SRC-002'],
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-SRC-002',
          label: 'WooCommnts: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Yorumları alan modeline ve WordPress tablosuna taşıyan repository taslağı var. Slider sorgusu boş koleksiyon döndürüyor; save/delete sonuçlarının kontrolü eksik. Ön yüz ve güvenli çıktı kabulü yapılmadı.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-woocommnts',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Yorum seçiminden güvenli slider görünümüne. Eksik sorgu ve yazma sonucu gibi belirli kaynak sorunları tamamlanabilir ürün dilimi oluşturuyor.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'destektesvik',
      name: 'DestekTeşvik',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'Sürümlü kaynak ve kurallardan izlenebilir ön uygunluk kararı üreten yazılım projesi.',
      observed:
        'Şirket profili ile program/kural/kaynak snapshotlarından dört sonuçlu değerlendirme motoru görülüyor. EXPIRED kaynak gerekçeye ekleniyor ancak adaylığı tek başına engellemiyor; kaynak geçerliliği iddiası ve karar davranışı uzlaştırılmalı.',
      goals: ['reliability', 'flow'],
      capabilities: ['Kural motoru', 'Kaynak sürümü', 'Açıklanabilir karar'],
      slice: {
        title: 'Kaynak geçerliliğinden açıklanabilir uygunluk kararına',
        outcome:
          'Süresi dolan, eksik veya çelişen kaynakla üretilen kararın durumu ve gerekçesi açık kurala dayanır.',
        acceptance: [
          'Geçerli, süresi dolmuş, eksik ve çelişkili snapshot örnekleri onaylı beklenen kararları üretir.',
          'Program, kural ve snapshot referansları sürüm düzeyinde tutarlıdır.',
          'Karar aynı kaynak sürümüyle tekrar üretilebilir; insan incelemesi ve kaynak tarihi görünürdür.',
        ],
        steps: [
          'Kaynak statüsünün karar üzerindeki etkisini açık sözleşmeye bağla.',
          'Önce süresi dolmuş kaynak örneğinde beklenen sonucu sabitle.',
          'Snapshot/kural referansını ve dört sonuçlu karar zincirini tamamla.',
          'Tek program kümesinde karar, gerekçe ve sürüm izini birlikte doğrula.',
        ],
      },
      rationale:
        'Kaynak ve kural güvenilirliği projenin öz değeridir; bunu düzeltmek geniş ticari hat açmaktan önce yazılımın doğru davranmasını sağlar.',
      counterargument:
        'Alan kaynağı bakım yükü ve güncel resmî içerik doğrulaması devam eder; motor kabulü gerçek başvuru uygunluğu garantisi değildir.',
      reconsiderWhen:
        'Alan sahibi farklı bir geçerlilik politikası belirlerse veya güncel snapshot bulunamazsa beklenen kararları yeniden tanımla.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Şirket profili ile program/kural/kaynak snapshotlarından dört sonuçlu değerlendirme motoru görülüyor. EXPIRED kaynak gerekçeye ekleniyor ancak adaylığı tek başına engellemiyor; kaynak geçerliliği iddiası ve karar davranışı uzlaştırılmalı.',
          evidenceIds: ['CONT-REM-SRC-003'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Süresi dolan, eksik veya çelişen kaynakla üretilen kararın durumu ve gerekçesi açık kurala dayanır.',
          evidenceIds: ['strategy-proposal-destektesvik'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Kaynak ve kural güvenilirliği projenin öz değeridir; bunu düzeltmek geniş ticari hat açmaktan önce yazılımın doğru davranmasını sağlar. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-destektesvik'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Geçerli, süresi dolmuş, eksik ve çelişkili snapshot örnekleri onaylı beklenen kararları üretir. Program, kural ve snapshot referansları sürüm düzeyinde tutarlıdır. Karar aynı kaynak sürümüyle tekrar üretilebilir; insan incelemesi ve kaynak tarihi görünürdür.',
          evidenceIds: ['strategy-proposal-destektesvik'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-destektesvik'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          reason:
            'Çalıştırılmış hata kanıtı yok. Statik inceleme riski: EXPIRED kaynak statüsünün adaylığa etkisi kaynakta açıkça tamamlanmış değil; çalışma zamanı testi yapılmadı.',
          evidenceIds: ['CONT-REM-SRC-003'],
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'yes',
          reason:
            'Kapalı çağrının görünümü ve kaynak geçerliliği hakkındaki taslaklar aynı kararı desteklemiyor.',
          evidenceIds: ['CONT-REM-SRC-003'],
        },
      },
      evidence: [
        {
          id: 'CONT-REM-SRC-003',
          label: 'DestekTeşvik: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Şirket profili ile program/kural/kaynak snapshotlarından dört sonuçlu değerlendirme motoru görülüyor. EXPIRED kaynak gerekçeye ekleniyor ancak adaylığı tek başına engellemiyor; kaynak geçerliliği iddiası ve karar davranışı uzlaştırılmalı.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-destektesvik',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Kaynak geçerliliğinden açıklanabilir uygunluk kararına. Kaynak ve kural güvenilirliği projenin öz değeridir; bunu düzeltmek geniş ticari hat açmaktan önce yazılımın doğru davranmasını sağlar.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'lifeos',
      name: 'LifeOS',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'Günlük, alışkanlık, proje ve zaman verisini tarayıcı çalışma alanında yöneten yazılım projesi.',
      observed:
        'Yerel zaman/proje veri katmanı ve kısmi Side Panel kabuğu var. Bazı sekmeler Coming Soon; yedek importunda doğrulama, hata bildirimi ve bütün işlem atomikliği eksikleri görülüyor.',
      goals: ['flow', 'reliability'],
      capabilities: ['Yerel veri', 'Yedek ve geri yükleme', 'Günlük akış'],
      slice: {
        title: 'Zaman kaydı, günlük özet ve güvenli geri yükleme',
        outcome:
          'Kullanıcı zaman kaydı oluşturur ve günlük özeti görür; doğrulanmış yedek içe aktarma veriyi kaybetmeden tamamlanır veya geri alınır.',
        acceptance: [
          'Zaman kaydı ve günlük toplamı aynı veriyle tutarlıdır.',
          'Geçersiz veya yarım yedek importu mevcut veriyi bozmaz; hata ve loading durumu doğru biter.',
          'Dışa aktarılan yedek temiz profilde geri yüklenir; eski veriyi silme açık ve geri alınabilir adım olarak doğrulanır.',
        ],
        steps: [
          'Görünen tek zaman kaydı/özet akışını veri katmanıyla eşle.',
          'Yedek şemasını ve import doğrulamasını tanımla.',
          'Atomik import veya güvenli geri alma yolunu uygula.',
          'Hatalı import ve temiz profilde geri yüklemeyi doğrula.',
        ],
      },
      rationale:
        'Yerel veri güvenilirliği ve tek görünür akış, mevcut kabuğun gerçek kullanım kabulüne dönüşmesini sağlar.',
      counterargument:
        'Birçok sekmenin kabuk olması daha büyük geliştirme ihtiyacını gizleyebilir; senkronizasyon ve diğer alanlar ayrıca değerlendirilmelidir.',
      reconsiderWhen:
        'Veri modeli veya ilk kullanıcı akışı değişirse yedek uyumluluğu ve dilim sınırını yeniden kur.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Yerel zaman/proje veri katmanı ve kısmi Side Panel kabuğu var. Bazı sekmeler Coming Soon; yedek importunda doğrulama, hata bildirimi ve bütün işlem atomikliği eksikleri görülüyor.',
          evidenceIds: ['CONT-REM-SRC-004', 'CONT-REM-SRC-005'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Kullanıcı zaman kaydı oluşturur ve günlük özeti görür; doğrulanmış yedek içe aktarma veriyi kaybetmeden tamamlanır veya geri alınır.',
          evidenceIds: ['strategy-proposal-lifeos'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Yerel veri güvenilirliği ve tek görünür akış, mevcut kabuğun gerçek kullanım kabulüne dönüşmesini sağlar. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-lifeos'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Zaman kaydı ve günlük toplamı aynı veriyle tutarlıdır. Geçersiz veya yarım yedek importu mevcut veriyi bozmaz; hata ve loading durumu doğru biter. Dışa aktarılan yedek temiz profilde geri yüklenir; eski veriyi silme açık ve geri alınabilir adım olarak doğrulanır.',
          evidenceIds: ['strategy-proposal-lifeos'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-lifeos'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          reason:
            'Çalıştırılmış hata kanıtı yok. Statik inceleme riski: Import doğrulaması ve bütün yedekte atomik geri dönüş kaynakta gösterilmedi; veri kaybı riski statik bulgudur.',
          evidenceIds: ['CONT-REM-SRC-004'],
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-SRC-004',
          label: 'LifeOS: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Yerel zaman/proje veri katmanı ve kısmi Side Panel kabuğu var. Bazı sekmeler Coming Soon; yedek importunda doğrulama, hata bildirimi ve bütün işlem atomikliği eksikleri görülüyor.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-005',
          label: 'LifeOS: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Yerel zaman/proje veri katmanı ve kısmi Side Panel kabuğu var. Bazı sekmeler Coming Soon; yedek importunda doğrulama, hata bildirimi ve bütün işlem atomikliği eksikleri görülüyor.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-lifeos',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Zaman kaydı, günlük özet ve güvenli geri yükleme. Yerel veri güvenilirliği ve tek görünür akış, mevcut kabuğun gerçek kullanım kabulüne dönüşmesini sağlar.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'guardian',
      name: 'Guardian',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'AI geliştirme oturumlarının kaynak kullanımını ve süreç aitliğini gözleyen yerel yazılım aracı.',
      observed:
        'Süreç aitliği, yetim temizliği ve kaynak baskısına göre müdahale kararı üreten policy motoru görülüyor. Identity, pressure, executor ve daemon sözleşmeleri bütünüyle doğrulanmadı.',
      goals: ['reliability', 'discovery'],
      capabilities: ['Kaynak gözlemi', 'Süreç aitliği', 'Açıklanabilir karar'],
      slice: {
        title: 'Oturum kaynak raporu ve müdahale gerekçesi',
        outcome:
          'Araç oturumun kaynak ve süreç ağacını açıklanabilir biçimde raporlar; belirsiz aitlikte yan etkili işlem yapmaz.',
        acceptance: [
          'Her sürecin aitlik gerekçesi ve belirsizlik durumu görünürdür.',
          'Başlangıç muafiyeti ile yetim temizliği kuralları çelişkili eylem üretmez.',
          'Dry-run raporu ile gerçek müdahale yolu ayrıdır; executor kabulü ayrıca sınanır.',
        ],
        steps: [
          'Identity, pressure ve policy giriş/çıktı sözleşmelerini bağla.',
          'Açıklanabilir salt okunur oturum raporunu tamamla.',
          'Muafiyet, yetim süreç ve belirsiz aitlik örneklerini çalıştır.',
          'Müdahale executorü için ayrı onay, geri alma ve başarısızlık kabulü tanımla.',
        ],
      },
      rationale:
        'Geliştirme ortamının kesintisizliği portföyde çalışma kapasitesini etkileyebilir; bu etki önce gerçek raporla ölçülmelidir.',
      counterargument:
        'Araç bakımı ana ürünleri geciktirebilir; önlediği kesinti ve yanlış müdahale oranı ölçülmeden otomatik üst öncelik verilmez.',
      reconsiderWhen:
        'Kaynak baskısı düzenli engel değilse veya mevcut araç aynı ihtiyacı karşılıyorsa yatırım dilimini yeniden değerlendir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Süreç aitliği, yetim temizliği ve kaynak baskısına göre müdahale kararı üreten policy motoru görülüyor. Identity, pressure, executor ve daemon sözleşmeleri bütünüyle doğrulanmadı.',
          evidenceIds: ['CONT-REM-SRC-006'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Araç oturumun kaynak ve süreç ağacını açıklanabilir biçimde raporlar; belirsiz aitlikte yan etkili işlem yapmaz.',
          evidenceIds: ['strategy-proposal-guardian'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Geliştirme ortamının kesintisizliği portföyde çalışma kapasitesini etkileyebilir; bu etki önce gerçek raporla ölçülmelidir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-guardian'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Her sürecin aitlik gerekçesi ve belirsizlik durumu görünürdür. Başlangıç muafiyeti ile yetim temizliği kuralları çelişkili eylem üretmez. Dry-run raporu ile gerçek müdahale yolu ayrıdır; executor kabulü ayrıca sınanır.',
          evidenceIds: ['strategy-proposal-guardian'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-guardian'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'no',
          reason:
            'Önerilen ilk dilim salt okunur rapordur; süreç durdurma veya temizleme eylemi içermez. Müdahale geliştirmesi ayrıca değerlendirilir.',
          evidenceIds: ['strategy-proposal-guardian'],
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-SRC-006',
          label: 'Guardian: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Süreç aitliği, yetim temizliği ve kaynak baskısına göre müdahale kararı üreten policy motoru görülüyor. Identity, pressure, executor ve daemon sözleşmeleri bütünüyle doğrulanmadı.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-guardian',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Oturum kaynak raporu ve müdahale gerekçesi. Geliştirme ortamının kesintisizliği portföyde çalışma kapasitesini etkileyebilir; bu etki önce gerçek raporla ölçülmelidir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'qral',
      name: 'QRal',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'Link/sekme paylaşımı ve QR üretimini birleştiren tarayıcı eklentisi.',
      observed:
        'Link, sekme, geçmiş kopyalama ve metin/Wi-Fi QR yolları var. Clipboard başarı bildirimi, storage eşliği ve güvenli metin üretimi için riskler görülüyor; şifreli QR yolu Base64 metne şifreyi ekliyor ve gerçek şifreleme sağlamıyor.',
      goals: ['reliability', 'flow'],
      capabilities: ['Tarayıcı eklentisi', 'Güvenli paylaşım', 'Kopyalama'],
      slice: {
        title: 'Doğru ve güvenli kopyalama/QR sonucu',
        outcome:
          'Kullanıcı kopyalama ve QR sonucunun gerçek durumunu görür; şifreleme iddiası davranışla tutarlıdır ve geçmiş güvenli gösterilir.',
        acceptance: [
          'Clipboard Promise sonucu başarı/başarısızlık durumuna doğru taşınır.',
          'MV3 yeniden başlatma ve storage limit davranışı tutarlıdır.',
          'Geçmiş ve sekme metni güvenli üretilir; Base64 şifreleme diye sunulmaz.',
        ],
        steps: [
          'Kopyalama, geçmiş saklama ve QR veri sözleşmelerini çıkar.',
          'Yanlış başarı ve şifreleme iddiasını düzelt.',
          'Güvenli metin/URL üretimi ve MV3 olay bağlamını tamamla.',
          'İzin reddi, service worker yeniden başlatma ve zararlı metin örneklerini doğrula.',
        ],
      },
      rationale:
        'Kullanıcının veriyi paylaşırken güvendiği temel davranışların doğruluğu doğrudan ürün değeridir.',
      counterargument:
        'Bu doğruluk dilimi diğer ürünlerin ortak altyapısını açmayabilir; toplam stratejik etkisi ayrıca seçilen hedefe bağlıdır.',
      reconsiderWhen:
        'Güvenli paylaşım kapsamı veya tarayıcı API kararı değişirse tehdit ve kabul örneklerini yenile.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Link, sekme, geçmiş kopyalama ve metin/Wi-Fi QR yolları var. Clipboard başarı bildirimi, storage eşliği ve güvenli metin üretimi için riskler görülüyor; şifreli QR yolu Base64 metne şifreyi ekliyor ve gerçek şifreleme sağlamıyor.',
          evidenceIds: [
            'CONT-REM-SRC-007',
            'CONT-REM-SRC-086',
            'CONT-REM-SRC-087',
            'CONT-REM-BIN-007',
          ],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Kullanıcı kopyalama ve QR sonucunun gerçek durumunu görür; şifreleme iddiası davranışla tutarlıdır ve geçmiş güvenli gösterilir.',
          evidenceIds: ['strategy-proposal-qral'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Kullanıcının veriyi paylaşırken güvendiği temel davranışların doğruluğu doğrudan ürün değeridir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-qral'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Clipboard Promise sonucu başarı/başarısızlık durumuna doğru taşınır. MV3 yeniden başlatma ve storage limit davranışı tutarlıdır. Geçmiş ve sekme metni güvenli üretilir; Base64 şifreleme diye sunulmaz.',
          evidenceIds: ['strategy-proposal-qral'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-qral'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          reason:
            'Çalıştırılmış hata kanıtı yok. Statik inceleme riski: Clipboard sonucu dış çağrıya dönmüyor; Base64 akışı gerçek şifreleme değil. Statik kaynak bulguları, exploit kabulü değildir.',
          evidenceIds: ['CONT-REM-SRC-007'],
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'yes',
          reason: 'Şifreli QR iddiası incelenen Base64 davranışıyla uyuşmuyor.',
          evidenceIds: ['CONT-REM-SRC-007'],
        },
      },
      evidence: [
        {
          id: 'CONT-REM-SRC-007',
          label: 'QRal: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Link, sekme, geçmiş kopyalama ve metin/Wi-Fi QR yolları var. Clipboard başarı bildirimi, storage eşliği ve güvenli metin üretimi için riskler görülüyor; şifreli QR yolu Base64 metne şifreyi ekliyor ve gerçek şifreleme sağlamıyor.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-086',
          label: 'QRal: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Link, sekme, geçmiş kopyalama ve metin/Wi-Fi QR yolları var. Clipboard başarı bildirimi, storage eşliği ve güvenli metin üretimi için riskler görülüyor; şifreli QR yolu Base64 metne şifreyi ekliyor ve gerçek şifreleme sağlamıyor.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-087',
          label: 'QRal: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Link, sekme, geçmiş kopyalama ve metin/Wi-Fi QR yolları var. Clipboard başarı bildirimi, storage eşliği ve güvenli metin üretimi için riskler görülüyor; şifreli QR yolu Base64 metne şifreyi ekliyor ve gerçek şifreleme sağlamıyor.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-007',
          label: 'QRal: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Link, sekme, geçmiş kopyalama ve metin/Wi-Fi QR yolları var. Clipboard başarı bildirimi, storage eşliği ve güvenli metin üretimi için riskler görülüyor; şifreli QR yolu Base64 metne şifreyi ekliyor ve gerçek şifreleme sağlamıyor.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-qral',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Doğru ve güvenli kopyalama/QR sonucu. Kullanıcının veriyi paylaşırken güvendiği temel davranışların doğruluğu doğrudan ürün değeridir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'e-menu',
      name: 'E-Menüm',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'Çok işletmeli dijital menü oluşturma, güncelleme ve yayınlama yazılımı.',
      observed:
        'Django modelinde tema, yayın, kategori, ürün/fiyat, varyant ve alerjen/besin alanları var. Controller/serializer tenant eşliği, görünür menü ve yayın kabulü bu kayıtta doğrulanmadı.',
      goals: ['flow', 'reliability'],
      capabilities: ['Alan modeli', 'Yayın ve geri alma', 'Tenant ayrımı'],
      slice: {
        title: 'Menü güncellemesinden ön izleme ve yayına',
        outcome:
          'İşletme kullanıcısı ürün/fiyat değiştirir, ön izler ve yayımlar; diğer işletme menüsüne erişemez ve önceki yayına dönebilir.',
        acceptance: [
          'Menü, tema, kategori ve ürün ilişkilerinin aynı tenant içinde kalması doğrulanır.',
          'Varsayılan/yayın sürümü eşzamanlı güncellemelerde tutarlı kalır.',
          'Ön izleme, yayın ve geri alma sonucu gerçek ziyaretçi yüzeyinde doğrulanır.',
        ],
        steps: [
          'Yayın sürümü ile işletme/menü sınırını tanımla.',
          'Controller ve serializer yetkisini modele bağla.',
          'Ön izleme, yayın ve geri alma akışını tamamla.',
          'Eşzamanlılık, başka tenant ve gerçek ziyaretçi görünümünü doğrula.',
        ],
      },
      rationale:
        'Yayınlama akışı alan modeli ile görünür son kullanıcı değerini birleştirir; başka içerik ürünleriyle ortaklık ayrıca sınanabilir.',
      counterargument:
        'Modelin bulunması ön yüz ve yayın zincirinin yakın tamamlandığını kanıtlamaz; kalan efor bilinmiyor.',
      reconsiderWhen:
        'Mevcut kaynak farklı yayın mimarisi veya daha önemli işletme akışı gösterirse dilimi yeniden seç.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Django modelinde tema, yayın, kategori, ürün/fiyat, varyant ve alerjen/besin alanları var. Controller/serializer tenant eşliği, görünür menü ve yayın kabulü bu kayıtta doğrulanmadı.',
          evidenceIds: ['CONT-REM-SRC-008'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'İşletme kullanıcısı ürün/fiyat değiştirir, ön izler ve yayımlar; diğer işletme menüsüne erişemez ve önceki yayına dönebilir.',
          evidenceIds: ['strategy-proposal-e-menu'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Yayınlama akışı alan modeli ile görünür son kullanıcı değerini birleştirir; başka içerik ürünleriyle ortaklık ayrıca sınanabilir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-e-menu'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Menü, tema, kategori ve ürün ilişkilerinin aynı tenant içinde kalması doğrulanır. Varsayılan/yayın sürümü eşzamanlı güncellemelerde tutarlı kalır. Ön izleme, yayın ve geri alma sonucu gerçek ziyaretçi yüzeyinde doğrulanır.',
          evidenceIds: ['strategy-proposal-e-menu'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-e-menu'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'yes',
          reason:
            'Önerilen dilim için analist çıkarımı: Çok işletmeli modelde tenant eşliği controller/serializer düzeyinde ayrıca doğrulanmalıdır.',
          evidenceIds: ['strategy-proposal-e-menu'],
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-SRC-008',
          label: 'E-Menüm: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Django modelinde tema, yayın, kategori, ürün/fiyat, varyant ve alerjen/besin alanları var. Controller/serializer tenant eşliği, görünür menü ve yayın kabulü bu kayıtta doğrulanmadı.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-e-menu',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Menü güncellemesinden ön izleme ve yayına. Yayınlama akışı alan modeli ile görünür son kullanıcı değerini birleştirir; başka içerik ürünleriyle ortaklık ayrıca sınanabilir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'simulator',
      name: 'Strateji Simülatörü',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'Proje ön değerlendirme girdilerini açıklanabilir kurallar ve dışa aktarılan raporlarla işleyen yazılım aracı.',
      observed:
        'Tarayıcıda 12 senaryo, altı karar kapısı ve JSON/CSV/Markdown/XLSX dışa aktarma kaynağı var. Zaman birimleri, geri ödeme paydası ve güven etiketinin anlamında doğruluk riskleri görülüyor.',
      goals: ['reliability', 'discovery'],
      capabilities: ['Kural motoru', 'Birim doğruluğu', 'Açıklanabilir rapor'],
      slice: {
        title: 'Tutarlı birimlerle gerekçeli değerlendirme raporu',
        outcome:
          'Aynı girdiler birimleri açık, varsayım ve kanıtı ayıran, insanın kararını destekleyen tutarlı rapor üretir.',
        acceptance: [
          'Takvim haftası ve kişi-hafta farklı birimler olarak işlenir.',
          'Geri ödeme hesabının maliyet kapsamı açık ve örneklerle doğru olur.',
          'Cevap tamlığı kanıt güveni diye sunulmaz; rapor dışa aktarımlarında aynı açıklamalar korunur.',
        ],
        steps: [
          'Kapıların birim ve veri kökeni sözleşmesini yaz.',
          'Bilinen birim/payda hataları için beklenen örnekleri sabitle.',
          'Güven etiketi ve rapor açıklamalarını düzelt.',
          'Aynı girdiyi tüm dışa aktarımlarda karşılaştır; eski veri geçişini geri alınabilir yap.',
        ],
      },
      rationale:
        'Karar yazılımında açıklanabilirlik ve birim doğruluğu, daha gelişmiş tahmin veya yeni kapı eklemeden önce temel gereksinimdir.',
      counterargument:
        'Kuralların doğru uygulanması yatırım kararının doğru olduğunu garanti etmez; kullanıcı hedefi ve alan varsayımları ayrıca değerlendirilir.',
      reconsiderWhen:
        'Yeni karar hedefi veya farklı kanıt politikası seçildiğinde kurallar ve rapor anlamını yeniden kur.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Tarayıcıda 12 senaryo, altı karar kapısı ve JSON/CSV/Markdown/XLSX dışa aktarma kaynağı var. Zaman birimleri, geri ödeme paydası ve güven etiketinin anlamında doğruluk riskleri görülüyor.',
          evidenceIds: ['CONT-REM-SRC-009'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Aynı girdiler birimleri açık, varsayım ve kanıtı ayıran, insanın kararını destekleyen tutarlı rapor üretir.',
          evidenceIds: ['strategy-proposal-simulator'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Karar yazılımında açıklanabilirlik ve birim doğruluğu, daha gelişmiş tahmin veya yeni kapı eklemeden önce temel gereksinimdir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-simulator'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Takvim haftası ve kişi-hafta farklı birimler olarak işlenir. Geri ödeme hesabının maliyet kapsamı açık ve örneklerle doğru olur. Cevap tamlığı kanıt güveni diye sunulmaz; rapor dışa aktarımlarında aynı açıklamalar korunur.',
          evidenceIds: ['strategy-proposal-simulator'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-simulator'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          reason:
            'Çalıştırılmış hata kanıtı yok. Statik inceleme riski: Zaman birimi ve geri ödeme paydası için statik doğruluk sorunları raporlandı.',
          evidenceIds: ['CONT-REM-SRC-009'],
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'yes',
          reason:
            'Güven etiketi kanıt gücünü ima ederken kaynakta cevap tamlığını ölçüyor.',
          evidenceIds: ['CONT-REM-SRC-009'],
        },
      },
      evidence: [
        {
          id: 'CONT-REM-SRC-009',
          label: 'Strateji Simülatörü: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Tarayıcıda 12 senaryo, altı karar kapısı ve JSON/CSV/Markdown/XLSX dışa aktarma kaynağı var. Zaman birimleri, geri ödeme paydası ve güven etiketinin anlamında doğruluk riskleri görülüyor.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-simulator',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Tutarlı birimlerle gerekçeli değerlendirme raporu. Karar yazılımında açıklanabilirlik ve birim doğruluğu, daha gelişmiş tahmin veya yeni kapı eklemeden önce temel gereksinimdir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'hakedis',
      name: 'Asgari işçilik / Hakediş',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'İnşaatta dönem, etap ve taşeron bazında hesap/mutabakat sağlayan yazılım projesi.',
      observed:
        'Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
      goals: ['flow', 'discovery'],
      capabilities: ['Hesap motoru', 'Kaynak izleme', 'Mutabakat'],
      slice: {
        title: 'Kaynaklı dönem ve taşeron mutabakat hesabı',
        outcome:
          'Sentetik bir dönem/etap/taşeron verisi kaynak girdilere bağlı ve açıklanabilir fark raporu üretir.',
        acceptance: [
          'Girdi türü, dönem ve taşeron kapsamı doğrulanır; belirsiz alan sessizce sıfır sayılmaz.',
          'Onaylı hesap örneklerinin kaynak ve beklenen sonuçları sürümlenir.',
          'Kaynak dosya değişmeden hesap izi ve farklar yeniden üretilebilir; rol sınırı doğrulanır.',
        ],
        steps: [
          'Hesap kuralları, girdi türleri ve kaynak izini tek sözleşmeye bağla.',
          'Alan uzmanının onayladığı sentetik örnekleri hazırla.',
          'Tek dönem/etap/taşeron hesap dilimini ve açıklama raporunu uygula.',
          'Doğru, eksik ve çelişkili girdileri karşılaştır; güncel mevzuat kabulünü ayrı kaydet.',
        ],
      },
      rationale:
        'Alan hesap motorunu kaynaklı örneklerle kurmak, teklif dokümanını ürün uygulamasından ayırır ve gerçek teknik belirsizliği azaltır.',
      counterargument:
        'Güncel oran/mevzuat ve alan hesabı bağımsız doğrulanmalıdır; belge kapsamı yakın tamamlanma veya hukuki sonuç garantisi değildir.',
      reconsiderWhen:
        'Alan hesap sözleşmesi tanımlanamazsa veya kaynak veride beklenmeyen tür farkı çıkarsa önce örnek/kuralları çöz.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
          evidenceIds: [
            'CONT-REM-SRC-010',
            'CONT-REM-SRC-013',
            'CONT-REM-SRC-016',
            'CONT-REM-SRC-023',
            'CONT-REM-SRC-025',
            'CONT-REM-SRC-026',
            'CONT-REM-SRC-027',
            'CONT-REM-SRC-028',
            'CONT-REM-SRC-029',
          ],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Sentetik bir dönem/etap/taşeron verisi kaynak girdilere bağlı ve açıklanabilir fark raporu üretir.',
          evidenceIds: ['strategy-proposal-hakedis'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Alan hesap motorunu kaynaklı örneklerle kurmak, teklif dokümanını ürün uygulamasından ayırır ve gerçek teknik belirsizliği azaltır. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-hakedis'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Girdi türü, dönem ve taşeron kapsamı doğrulanır; belirsiz alan sessizce sıfır sayılmaz. Onaylı hesap örneklerinin kaynak ve beklenen sonuçları sürümlenir. Kaynak dosya değişmeden hesap izi ve farklar yeniden üretilebilir; rol sınırı doğrulanır.',
          evidenceIds: ['strategy-proposal-hakedis'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-hakedis'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'yes',
          reason:
            'Tek müşteri modülleri, çok tenant SaaS ve kurumsal entegrasyonlar ayrı kabul kapsamlarıdır.',
          evidenceIds: ['CONT-REM-SRC-010'],
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-SRC-010',
          label: 'Asgari işçilik / Hakediş: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-013',
          label: 'Asgari işçilik / Hakediş: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-016',
          label: 'Asgari işçilik / Hakediş: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-023',
          label: 'Asgari işçilik / Hakediş: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-025',
          label: 'Asgari işçilik / Hakediş: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-026',
          label: 'Asgari işçilik / Hakediş: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-027',
          label: 'Asgari işçilik / Hakediş: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-028',
          label: 'Asgari işçilik / Hakediş: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-029',
          label: 'Asgari işçilik / Hakediş: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Modül kapsamı, hesap motoru gereksinimleri ve teklif raporu/generator kaynakları incelenmiş. Teklif üretimi çalışan ürün hesap motoru değildir; hesap kabul örnekleri hedef olarak yazılmıştır.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-hakedis',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Kaynaklı dönem ve taşeron mutabakat hesabı. Alan hesap motorunu kaynaklı örneklerle kurmak, teklif dokümanını ürün uygulamasından ayırır ve gerçek teknik belirsizliği azaltır.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'wordpress-niche',
      name: 'WordPress operasyon eklentileri',
      aliases: [],
      kind: 'research',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'İzin kaydı, ödeme kuralı ve ileti izin köprüsü için üç ayrı WordPress eklenti fikri.',
      observed:
        'Sunumda KVKKLite, taksit/kapıda ödeme ve IYS Bridge planı ile ortak lisans/ayar/REST/test çekirdeği var. Bu inceleme kaydında uygulama kodu kabulü yok; WooCommnts ile aynı ürün değildir.',
      goals: ['discovery', 'flow'],
      capabilities: ['WordPress eklentisi', 'Kural kaydı', 'Dışa aktarma'],
      slice: {
        title: 'Tek izin kaydının sürümü ve kanıt çıktısı',
        outcome:
          'Seçilen eklentide kullanıcının sağladığı onaylı metin sürümü ve izin olayı saklanır; tutarlı kanıt çıktısı alınır.',
        acceptance: [
          'Seçilen tek eklentinin güncel kaynak varlığı ve kalan işleri eşlenir.',
          'Metin sürümü, olay kaydı ve dışa aktarma aynı referansı taşır.',
          'WordPress yetki/nonce, silme ve hata davranışı sınanır; hukuki uyum garantisi üretilmez.',
        ],
        steps: [
          'Üç fikrin kaynak ve kullanıcı akışlarını ayrı eşle.',
          'Bir eklentinin veri/olay ve yetki sözleşmesini seç.',
          'Sürüm, kayıt ve dışa aktarmayı uygula.',
          'WordPress sürüm uyumu ve olumsuz örnekleri doğrula.',
        ],
      },
      rationale:
        'Tek bir eklenti dilimi ortak çekirdeğin gerçekten gerekli parçalarını ortaya çıkarabilir.',
      counterargument:
        'Uygulama kaynağı bu kayıtta doğrulanmadığı için efor ve ortaklaştırma değeri belirsiz; üç fikir tek ürün gibi sıralanamaz.',
      reconsiderWhen:
        'Güncel kaynak başka eklentiyi daha açık ilk dilim olarak gösterirse önce o akışı seç.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Sunumda KVKKLite, taksit/kapıda ödeme ve IYS Bridge planı ile ortak lisans/ayar/REST/test çekirdeği var. Bu inceleme kaydında uygulama kodu kabulü yok; WooCommnts ile aynı ürün değildir.',
          evidenceIds: ['CONT-REM-BIN-008'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Seçilen eklentide kullanıcının sağladığı onaylı metin sürümü ve izin olayı saklanır; tutarlı kanıt çıktısı alınır.',
          evidenceIds: ['strategy-proposal-wordpress-niche'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Tek bir eklenti dilimi ortak çekirdeğin gerçekten gerekli parçalarını ortaya çıkarabilir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-wordpress-niche'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Seçilen tek eklentinin güncel kaynak varlığı ve kalan işleri eşlenir. Metin sürümü, olay kaydı ve dışa aktarma aynı referansı taşır. WordPress yetki/nonce, silme ve hata davranışı sınanır; hukuki uyum garantisi üretilmez.',
          evidenceIds: ['strategy-proposal-wordpress-niche'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-wordpress-niche'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'yes',
          reason:
            'Üç eklenti ve ortak çekirdek farklı uygulama/entegrasyon kapsamlarıdır.',
          evidenceIds: ['CONT-REM-BIN-008'],
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          reason:
            'Çok tüketicili ortak kullanım henüz doğrulanmadı. Bu eksiklik tek başına gereksiz genelleme yapıldığını kanıtlamaz.',
          evidenceIds: [],
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-BIN-008',
          label:
            'WordPress operasyon eklentileri: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Sunumda KVKKLite, taksit/kapıda ödeme ve IYS Bridge planı ile ortak lisans/ayar/REST/test çekirdeği var. Bu inceleme kaydında uygulama kodu kabulü yok; WooCommnts ile aynı ürün değildir.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-wordpress-niche',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Tek izin kaydının sürümü ve kanıt çıktısı. Tek bir eklenti dilimi ortak çekirdeğin gerçekten gerekli parçalarını ortaya çıkarabilir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'great-doers',
      name: 'Great Doers',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'Brief, uzman profili, eşleştirme ve teslim durumunu yöneten yazılım platformu fikri.',
      observed:
        'Uzman eşleştirme ve milestone/kabul akışı için plan ve sunumlar var. On iki başlık hizmet kategorileridir; on iki bağımsız çalışan yazılım ürünü değildir.',
      goals: ['flow', 'discovery'],
      capabilities: ['İş akışı', 'Eşleştirme', 'Rol ve onay'],
      slice: {
        title: 'Brief ve uzman önerisinden gerekçeli seçime',
        outcome:
          'Sentetik bir brief için uzman profilleriyle gerekçeli eşleşme üretilir; kullanıcı seçimini ve teslim durumunu kaydeder.',
        acceptance: [
          'Brief, uzman ve eşleşme durumu için veri sözleşmesi doğrulanır.',
          'Eşleştirme gerekçesi ve bilinmeyen alanlar görünürdür; sahte sosyal kanıt kullanılmaz.',
          'Brief sahibi, uzman ve operasyon rolünün erişimi ile durum geçişleri sınanır.',
        ],
        steps: [
          'Tek kategori için brief/profil ve durum modelini tanımla.',
          'Sentetik profillerle açıklanabilir eşleştirme dilimini uygula.',
          'Seçim ve teslim durumu akışını bağla.',
          'Yetkisiz erişim, uyumsuz profil ve geçersiz geçişleri doğrula.',
        ],
      },
      rationale:
        'Yazılım yatırımı, manuel eşleştirme hizmetine zorunlu ön koşul koymadan gerçek iş akışı ve veri modelini sınayabilir.',
      counterargument:
        'Pazaryeri likiditesi yazılım kabulünden ayrı bir risk olarak kalır; plan sunumu güncel uygulama varlığını kanıtlamaz.',
      reconsiderWhen:
        'Güncel kod başka akışı daha tamamlanabilir gösterirse veya eşleştirme alan modeli değişirse dilimi değiştir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Uzman eşleştirme ve milestone/kabul akışı için plan ve sunumlar var. On iki başlık hizmet kategorileridir; on iki bağımsız çalışan yazılım ürünü değildir.',
          evidenceIds: [
            'CONT-REM-BIN-009',
            'CONT-REM-BIN-010',
            'CONT-REM-BIN-013',
            'CONT-REM-BIN-012',
          ],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Sentetik bir brief için uzman profilleriyle gerekçeli eşleşme üretilir; kullanıcı seçimini ve teslim durumunu kaydeder.',
          evidenceIds: ['strategy-proposal-great-doers'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Yazılım yatırımı, manuel eşleştirme hizmetine zorunlu ön koşul koymadan gerçek iş akışı ve veri modelini sınayabilir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-great-doers'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Brief, uzman ve eşleşme durumu için veri sözleşmesi doğrulanır. Eşleştirme gerekçesi ve bilinmeyen alanlar görünürdür; sahte sosyal kanıt kullanılmaz. Brief sahibi, uzman ve operasyon rolünün erişimi ile durum geçişleri sınanır.',
          evidenceIds: ['strategy-proposal-great-doers'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-great-doers'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'yes',
          reason:
            'Çok kategori, eğitim ve kurumsal abonelik ayrı kapsam hedefleridir.',
          evidenceIds: ['CONT-REM-BIN-009'],
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'yes',
          reason:
            'Önerilen dilim için analist çıkarımı: Brief sahibi, uzman ve operasyon farklı rollerdir.',
          evidenceIds: ['strategy-proposal-great-doers'],
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-BIN-009',
          label: 'Great Doers: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Uzman eşleştirme ve milestone/kabul akışı için plan ve sunumlar var. On iki başlık hizmet kategorileridir; on iki bağımsız çalışan yazılım ürünü değildir.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-010',
          label: 'Great Doers: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Uzman eşleştirme ve milestone/kabul akışı için plan ve sunumlar var. On iki başlık hizmet kategorileridir; on iki bağımsız çalışan yazılım ürünü değildir.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-013',
          label: 'Great Doers: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Uzman eşleştirme ve milestone/kabul akışı için plan ve sunumlar var. On iki başlık hizmet kategorileridir; on iki bağımsız çalışan yazılım ürünü değildir.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-012',
          label: 'Great Doers: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Uzman eşleştirme ve milestone/kabul akışı için plan ve sunumlar var. On iki başlık hizmet kategorileridir; on iki bağımsız çalışan yazılım ürünü değildir.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-great-doers',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Brief ve uzman önerisinden gerekçeli seçime. Yazılım yatırımı, manuel eşleştirme hizmetine zorunlu ön koşul koymadan gerçek iş akışı ve veri modelini sınayabilir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'cups-clouds',
      name: 'Cups & Clouds yazılım hattı',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'Mağaza, şube, stok ve sipariş olaylarını uzlaştırmaya yönelik yazılım/entegrasyon projesi.',
      observed:
        'Şube ve e-ticaret operasyonu, ölçüm ve mevcut mağaza entegrasyonu için planlar incelenmiş. Mağaza/uygulamanın varlığına ilişkin tarihli belgeler uyuşmuyor; kaynak kod ve canlı entegrasyon kabulü bu kayıtta yok.',
      goals: ['flow', 'discovery'],
      capabilities: ['Entegrasyon', 'Olay uzlaştırma', 'Veri doğrulama'],
      slice: {
        title: 'Sipariş, iade ve stok olaylarının uzlaştırılması',
        outcome:
          'Sentetik bir kanalın sipariş/iade/stok olayları açıklanabilir bir uzlaştırma sonucu üretir.',
        acceptance: [
          'Güncel kaynak ve mevcut sistem envanteri tarihli çelişkiyi çözer.',
          'Aynı olayın tekrarı çift stok/işlem üretmez; eksik veya ters sıralı olay açıklanır.',
          'Kaynak olay ile sonuç referansı izlenir; canlı müşteri verisi veya servis erişimi gerekmeden sentetik kabul yapılır.',
        ],
        steps: [
          'Güncel mağaza/uygulama ve entegrasyon sözleşmesini eşle.',
          'Sipariş, iade ve stok olayı için referans ve tekrar kurallarını tanımla.',
          'Sentetik olay uzlaştırma dilimini uygula.',
          'Tekrar, eksik ve ters sıralı olayları doğrula.',
        ],
      },
      rationale:
        'Olay uzlaştırma, geliştirilmesi istenen somut entegrasyon altyapısını sınar; müşteri operasyon hizmeti satışı ön koşul değildir.',
      counterargument:
        'Bu kayıt plan düzeyindedir; mevcut servis ve kod gerçeği çözülmeden geliştirme sırası veya efor söylenemez.',
      reconsiderWhen:
        'Güncel envanter entegrasyonun zaten kabul edildiğini veya farklı açığı gösterirse dilimi yeniden seç.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Şube ve e-ticaret operasyonu, ölçüm ve mevcut mağaza entegrasyonu için planlar incelenmiş. Mağaza/uygulamanın varlığına ilişkin tarihli belgeler uyuşmuyor; kaynak kod ve canlı entegrasyon kabulü bu kayıtta yok.',
          evidenceIds: [
            'CONT-REM-BIN-027',
            'CONT-REM-BIN-028',
            'CONT-REM-BIN-014',
            'CONT-REM-BIN-015',
            'CONT-REM-BIN-016',
          ],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Sentetik bir kanalın sipariş/iade/stok olayları açıklanabilir bir uzlaştırma sonucu üretir.',
          evidenceIds: ['strategy-proposal-cups-clouds'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Olay uzlaştırma, geliştirilmesi istenen somut entegrasyon altyapısını sınar; müşteri operasyon hizmeti satışı ön koşul değildir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-cups-clouds'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Güncel kaynak ve mevcut sistem envanteri tarihli çelişkiyi çözer. Aynı olayın tekrarı çift stok/işlem üretmez; eksik veya ters sıralı olay açıklanır. Kaynak olay ile sonuç referansı izlenir; canlı müşteri verisi veya servis erişimi gerekmeden sentetik kabul yapılır.',
          evidenceIds: ['strategy-proposal-cups-clouds'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-cups-clouds'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'yes',
          reason:
            'Tarihli planlarda mağaza/uygulama varlığı farklı anlatılmış.',
          evidenceIds: ['CONT-REM-BIN-027'],
        },
      },
      evidence: [
        {
          id: 'CONT-REM-BIN-027',
          label: 'Cups & Clouds yazılım hattı: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Şube ve e-ticaret operasyonu, ölçüm ve mevcut mağaza entegrasyonu için planlar incelenmiş. Mağaza/uygulamanın varlığına ilişkin tarihli belgeler uyuşmuyor; kaynak kod ve canlı entegrasyon kabulü bu kayıtta yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-028',
          label: 'Cups & Clouds yazılım hattı: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Şube ve e-ticaret operasyonu, ölçüm ve mevcut mağaza entegrasyonu için planlar incelenmiş. Mağaza/uygulamanın varlığına ilişkin tarihli belgeler uyuşmuyor; kaynak kod ve canlı entegrasyon kabulü bu kayıtta yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-014',
          label: 'Cups & Clouds yazılım hattı: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Şube ve e-ticaret operasyonu, ölçüm ve mevcut mağaza entegrasyonu için planlar incelenmiş. Mağaza/uygulamanın varlığına ilişkin tarihli belgeler uyuşmuyor; kaynak kod ve canlı entegrasyon kabulü bu kayıtta yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-015',
          label: 'Cups & Clouds yazılım hattı: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Şube ve e-ticaret operasyonu, ölçüm ve mevcut mağaza entegrasyonu için planlar incelenmiş. Mağaza/uygulamanın varlığına ilişkin tarihli belgeler uyuşmuyor; kaynak kod ve canlı entegrasyon kabulü bu kayıtta yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-016',
          label: 'Cups & Clouds yazılım hattı: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Şube ve e-ticaret operasyonu, ölçüm ve mevcut mağaza entegrasyonu için planlar incelenmiş. Mağaza/uygulamanın varlığına ilişkin tarihli belgeler uyuşmuyor; kaynak kod ve canlı entegrasyon kabulü bu kayıtta yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-cups-clouds',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Sipariş, iade ve stok olaylarının uzlaştırılması. Olay uzlaştırma, geliştirilmesi istenen somut entegrasyon altyapısını sınar; müşteri operasyon hizmeti satışı ön koşul değildir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'arsam',
      name: 'Arsam',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'İlan, satıcı doğrulama, moderasyon ve alıcı talebini yöneten gayrimenkul yazılım platformu.',
      observed:
        'İlan/lead platformu, yönetişim çalışması ve teknik planlar var. Güncel uygulama ve üretim kabulü bu kayıtta yok; yatırım/istihdam planı veya rapor modeli çalışan platform kanıtı değil.',
      goals: ['flow', 'discovery'],
      capabilities: ['İlan modeli', 'Moderasyon', 'Rol ve onay'],
      slice: {
        title: 'İlan taslağından doğrulanmış yayın ve talebe',
        outcome:
          'Sentetik ilan doğrulama ve moderasyondan geçer; alıcının talebi doğru ilan ve erişim kapsamına bağlanır.',
        acceptance: [
          'Satıcı, moderatör ve alıcı rol sınırları ile ilan durumları doğrulanır.',
          'Eksik veya onaysız ilan yayımlanmaz; değişiklik ve ret gerekçesi izlenir.',
          'Talep doğru ilan sürümüne bağlanır; kimlik/ilan yetkisi ve resmî entegrasyon ayrıca doğrulanır.',
        ],
        steps: [
          'İlan, doğrulama, moderasyon ve talep sözleşmelerini yaz.',
          'Güncel kaynakta mevcut uygulama ile plan hedeflerini ayır.',
          'Sentetik ilan ve talep dilimini uygula.',
          'Rol sınırı, ret, tekrar ve sürüm davranışını doğrula.',
        ],
      },
      rationale:
        'Somut yayın ve talep akışı, geniş platform planının uygulanabilir ilk yazılım sonucunu gösterir.',
      counterargument:
        'İlan yetkisi ve kimlik entegrasyonu ayrı alan kabulü gerektirir; belge kapsamı efor ve hazır oluşu kanıtlamaz.',
      reconsiderWhen:
        'Güncel kaynak veya resmî entegrasyon sınırı farklı öncelik gösterirse önce bu bağımlılığı çöz.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: İlan/lead platformu, yönetişim çalışması ve teknik planlar var. Güncel uygulama ve üretim kabulü bu kayıtta yok; yatırım/istihdam planı veya rapor modeli çalışan platform kanıtı değil.',
          evidenceIds: [
            'CONT-REM-BIN-017',
            'CONT-REM-BIN-018',
            'CONT-REM-BIN-019',
            'CONT-REM-BIN-020',
            'CONT-REM-BIN-021',
            'CONT-REM-BIN-022',
          ],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Sentetik ilan doğrulama ve moderasyondan geçer; alıcının talebi doğru ilan ve erişim kapsamına bağlanır.',
          evidenceIds: ['strategy-proposal-arsam'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Somut yayın ve talep akışı, geniş platform planının uygulanabilir ilk yazılım sonucunu gösterir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-arsam'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Satıcı, moderatör ve alıcı rol sınırları ile ilan durumları doğrulanır. Eksik veya onaysız ilan yayımlanmaz; değişiklik ve ret gerekçesi izlenir. Talep doğru ilan sürümüne bağlanır; kimlik/ilan yetkisi ve resmî entegrasyon ayrıca doğrulanır.',
          evidenceIds: ['strategy-proposal-arsam'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-arsam'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'yes',
          reason: 'İlan platformu ve yatırım/yönetişim planı farklı kapsamlar.',
          evidenceIds: ['CONT-REM-BIN-017'],
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'yes',
          reason:
            'Önerilen dilim için analist çıkarımı: Satıcı, moderatör ve alıcı farklı rol ve durum sınırları gerektiriyor.',
          evidenceIds: ['strategy-proposal-arsam'],
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-BIN-017',
          label: 'Arsam: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İlan/lead platformu, yönetişim çalışması ve teknik planlar var. Güncel uygulama ve üretim kabulü bu kayıtta yok; yatırım/istihdam planı veya rapor modeli çalışan platform kanıtı değil.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-018',
          label: 'Arsam: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İlan/lead platformu, yönetişim çalışması ve teknik planlar var. Güncel uygulama ve üretim kabulü bu kayıtta yok; yatırım/istihdam planı veya rapor modeli çalışan platform kanıtı değil.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-019',
          label: 'Arsam: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İlan/lead platformu, yönetişim çalışması ve teknik planlar var. Güncel uygulama ve üretim kabulü bu kayıtta yok; yatırım/istihdam planı veya rapor modeli çalışan platform kanıtı değil.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-020',
          label: 'Arsam: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İlan/lead platformu, yönetişim çalışması ve teknik planlar var. Güncel uygulama ve üretim kabulü bu kayıtta yok; yatırım/istihdam planı veya rapor modeli çalışan platform kanıtı değil.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-021',
          label: 'Arsam: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İlan/lead platformu, yönetişim çalışması ve teknik planlar var. Güncel uygulama ve üretim kabulü bu kayıtta yok; yatırım/istihdam planı veya rapor modeli çalışan platform kanıtı değil.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-022',
          label: 'Arsam: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İlan/lead platformu, yönetişim çalışması ve teknik planlar var. Güncel uygulama ve üretim kabulü bu kayıtta yok; yatırım/istihdam planı veya rapor modeli çalışan platform kanıtı değil.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-arsam',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'İlan taslağından doğrulanmış yayın ve talebe. Somut yayın ve talep akışı, geniş platform planının uygulanabilir ilk yazılım sonucunu gösterir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'kernel-plan',
      name: 'Kernel tarihli planları',
      aliases: [],
      kind: 'research',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'Ortak primitive, tüketici ve sözlük kapsamını anlatan tarihli altyapı araştırma kaydı; MetaFramer ile mükerrer ürün sayılmaz.',
      observed:
        'Kernel v2.3.5/v2.3.6 plan memolarında tek tüketici dilimi ve primitive kabul hedefleri var. Eski plan durumu güncel MetaFramer kaynak yokluğu veya hazır oluşu olarak yorumlanamaz.',
      goals: ['discovery', 'core'],
      capabilities: ['Kaynak eşleme', 'Ortak sözleşme', 'Tüketici kabulü'],
      slice: {
        title: 'Tarihli planı güncel kaynak ve tüketiciyle uzlaştırma',
        outcome:
          'Her plan hedefi güncel kaynak/kanıt veya açık eksik olarak eşlenir; MetaFramer ile aynı kayıtların iki kez yatırım sayılması önlenir.',
        acceptance: [
          'Tarihli hedef ile güncel kod/README sürümü ayrı gösterilir.',
          'Aynı primitive ve tüketici kaydı MetaFramer kapsamında tekleştirilir.',
          'Eksik hedef için somut tüketici ve kabul örneği tanımlanır; yeni bağımsız ürün iddiası kurulmaz.',
        ],
        steps: [
          'Planların tarihini ve sürümünü sabitle.',
          'Güncel MetaFramer sözleşmeleriyle hedef eşlemesi yap.',
          'Mükerrer kayıtları ilişkilendir; kalan açıkları listele.',
          'Tüketici için gerekli açıklığı ayrı geliştirme dilimine aktar.',
        ],
      },
      rationale:
        'Plan uzlaştırması hatalı yokluk veya mükerrer yatırım çıkarımını azaltır.',
      counterargument:
        'Belge uzlaştırması tek başına ürün akışı tamamlamaz; yalnız kararın bağımlılık ve kapsamını düzeltir.',
      reconsiderWhen:
        'Güncel kaynak planın bağımsız bir hat olduğunu gösterirse ilişkiyi ve aday türünü yeniden değerlendir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Kernel v2.3.5/v2.3.6 plan memolarında tek tüketici dilimi ve primitive kabul hedefleri var. Eski plan durumu güncel MetaFramer kaynak yokluğu veya hazır oluşu olarak yorumlanamaz.',
          evidenceIds: ['CONT-REM-BIN-023', 'CONT-REM-BIN-024'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Her plan hedefi güncel kaynak/kanıt veya açık eksik olarak eşlenir; MetaFramer ile aynı kayıtların iki kez yatırım sayılması önlenir.',
          evidenceIds: ['strategy-proposal-kernel-plan'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Plan uzlaştırması hatalı yokluk veya mükerrer yatırım çıkarımını azaltır. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-kernel-plan'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Tarihli hedef ile güncel kod/README sürümü ayrı gösterilir. Aynı primitive ve tüketici kaydı MetaFramer kapsamında tekleştirilir. Eksik hedef için somut tüketici ve kabul örneği tanımlanır; yeni bağımsız ürün iddiası kurulmaz.',
          evidenceIds: ['strategy-proposal-kernel-plan'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'inferred',
          finding:
            'Güncel MetaFramer ile kaynak/plan eşlemesi: Tarihli Kernel planı ile güncel MetaFramer aynı aile olabilir; kaynak/sürüm eşliği doğrulanmadan tek ürün veya zorunlu bağımlılık sayılmaz.',
          evidenceIds: ['CONT-REM-BIN-023'],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [
        {
          candidateId: 'metaframer',
          title: 'Güncel MetaFramer ile kaynak/plan eşlemesi',
          state: 'inferred',
          reason:
            'Tarihli Kernel planı ile güncel MetaFramer aynı aile olabilir; kaynak/sürüm eşliği doğrulanmadan tek ürün veya zorunlu bağımlılık sayılmaz.',
          evidenceIds: ['CONT-REM-BIN-023'],
        },
      ],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-kernel-plan'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          reason:
            'Çok tüketicili ortak kullanım henüz doğrulanmadı. Bu eksiklik tek başına gereksiz genelleme yapıldığını kanıtlamaz.',
          evidenceIds: [],
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-BIN-023',
          label: 'Kernel tarihli planları: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Kernel v2.3.5/v2.3.6 plan memolarında tek tüketici dilimi ve primitive kabul hedefleri var. Eski plan durumu güncel MetaFramer kaynak yokluğu veya hazır oluşu olarak yorumlanamaz.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-BIN-024',
          label: 'Kernel tarihli planları: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Kernel v2.3.5/v2.3.6 plan memolarında tek tüketici dilimi ve primitive kabul hedefleri var. Eski plan durumu güncel MetaFramer kaynak yokluğu veya hazır oluşu olarak yorumlanamaz.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-kernel-plan',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Tarihli planı güncel kaynak ve tüketiciyle uzlaştırma. Plan uzlaştırması hatalı yokluk veya mükerrer yatırım çıkarımını azaltır.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'cronbi',
      name: 'CronBI portföyü',
      aliases: [],
      kind: 'umbrella',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'Ortak kimlik, belge, iş akışı ve rapor kabiliyetleriyle birden fazla iş uygulamasını birleştirme yazılım vizyonu.',
      observed:
        'Kurumsal portföy sunumu People, ERP, Accounting ve başka iş alanlarını listeliyor. Liste on bir bağımsız çalışan ürün veya ortak çekirdeğin kabulü değildir; güncel kaynak incelemesi sınırlı.',
      goals: ['core', 'discovery'],
      capabilities: ['Ortak kimlik', 'İş akışı', 'Rapor sözleşmesi'],
      slice: {
        title: 'Tek portföy tüketicisinde kimlik ve işlem sözleşmesi',
        outcome:
          'Seçilen alt ürün bir işlemi ortak kimlik, iş akışı ve audit sözleşmesiyle tamamlar; gerçek ortaklaşma sınırı görünür olur.',
        acceptance: [
          'Tek alt ürün ve kullanıcı sonucu açıkça seçilir; portföy bütünü tamamlandı sayılmaz.',
          'Kimlik/rol, belge ve işlem sözleşmelerinin hangi kaynakta uygulandığı eşlenir.',
          'Tüketicide yetkisiz işlem, durum geçişi ve audit sonucu doğrulanır; yeniden kullanım ayrıca ölçülür.',
        ],
        steps: [
          'Portföydeki alt ürünleri ve ortak kabiliyet iddialarını ayır.',
          'Bir tüketici işleminin güncel kaynağını eşle.',
          'Gereken ortak kimlik/iş akışı dilimini uygula.',
          'Tek tüketicide kabulü ve ikinci tüketicide uyarlama maliyetini doğrula.',
        ],
      },
      rationale:
        'Kullanıcının kendi yazılım portföyünü ortak çekirdek ve tüketiciler olarak değerlendirmek, çatı markayı çalışan ürün sayma hatasını önler.',
      counterargument:
        'Güncel kaynak kapsamı sınırlı ve MetaFramer/GenUI ile sözleşme ortaklığı kanıtlanmadı; portföy adı otomatik üst öncelik vermez.',
      reconsiderWhen:
        'Güncel alt ürün ve kaynak haritası farklı ilk tüketiciyi gösterirse tüketici seçimini değiştir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Kurumsal portföy sunumu People, ERP, Accounting ve başka iş alanlarını listeliyor. Liste on bir bağımsız çalışan ürün veya ortak çekirdeğin kabulü değildir; güncel kaynak incelemesi sınırlı.',
          evidenceIds: ['CONT-REM-BIN-025'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Seçilen alt ürün bir işlemi ortak kimlik, iş akışı ve audit sözleşmesiyle tamamlar; gerçek ortaklaşma sınırı görünür olur.',
          evidenceIds: ['strategy-proposal-cronbi'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Kullanıcının kendi yazılım portföyünü ortak çekirdek ve tüketiciler olarak değerlendirmek, çatı markayı çalışan ürün sayma hatasını önler. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-cronbi'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Tek alt ürün ve kullanıcı sonucu açıkça seçilir; portföy bütünü tamamlandı sayılmaz. Kimlik/rol, belge ve işlem sözleşmelerinin hangi kaynakta uygulandığı eşlenir. Tüketicide yetkisiz işlem, durum geçişi ve audit sonucu doğrulanır; yeniden kullanım ayrıca ölçülür.',
          evidenceIds: ['strategy-proposal-cronbi'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-cronbi'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'yes',
          reason:
            'Sunum birden fazla iş alanı ve ortak kabiliyet vizyonu içeriyor.',
          evidenceIds: ['CONT-REM-BIN-025'],
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          reason:
            'Çok tüketicili ortak kullanım henüz doğrulanmadı. Bu eksiklik tek başına gereksiz genelleme yapıldığını kanıtlamaz.',
          evidenceIds: [],
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-BIN-025',
          label: 'CronBI portföyü: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Kurumsal portföy sunumu People, ERP, Accounting ve başka iş alanlarını listeliyor. Liste on bir bağımsız çalışan ürün veya ortak çekirdeğin kabulü değildir; güncel kaynak incelemesi sınırlı.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-cronbi',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Tek portföy tüketicisinde kimlik ve işlem sözleşmesi. Kullanıcının kendi yazılım portföyünü ortak çekirdek ve tüketiciler olarak değerlendirmek, çatı markayı çalışan ürün sayma hatasını önler.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'cronbi-people',
      name: 'CronBI People',
      aliases: [],
      kind: 'product',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'Özlük, bordro ve PDKS etrafında izin, performans, ATS ve diğer İK süreçlerini kapsayan yazılım projesi.',
      observed:
        'Üç çekirdek ve on beş modül için sunum planı var. Var etiketi uygulanmış modül kabulü değil; HRMS ile aynı kaynak/sürüm olduğu gösterilmedi.',
      goals: ['flow', 'reliability'],
      capabilities: ['Alan modeli', 'Bordro ve puantaj', 'Rol ve onay'],
      slice: {
        title: 'Puantaj girdisinden kaynaklı dönem kapanışına',
        outcome:
          'Sentetik tek dönem puantaj verisi doğrulanır; kapanış sonucu, farklar ve karar izi açıkça üretilir.',
        acceptance: [
          'Puantaj, özlük ve kapanış referansları tutarlı kalır.',
          'Alan sahibinin onayladığı örneklerde hesap/fark ve tekrar işlem sonuçları doğrulanır.',
          'Çalışan ve yönetici rol sınırı ile audit izi sınanır; cihaz ve bordro entegrasyonları ayrı kabul edilir.',
        ],
        steps: [
          'Güncel kaynakla özlük/PDKS/bordro hedeflerini eşle.',
          'Tek dönem kapanış girdi ve hesap sözleşmesini tanımla.',
          'Sentetik veriyle doğrulama, fark ve onay izini uygula.',
          'Rol, tekrar ve sınır hesap örneklerini çalıştır.',
        ],
      },
      rationale:
        'Tek kapanış, geniş İK listesini veri ve hesap doğruluğu üzerinden somut olarak değerlendirebilir.',
      counterargument:
        'Sunum bilgisi güncel uygulama veya cihaz uyumunu kanıtlamaz; HRMS ile mükerrerliğin çözülmesi gerekir.',
      reconsiderWhen:
        'Güncel kaynak HRMS ile aynı ürünü veya farklı bir ilk akışı gösterirse kayıtları ilişkilendir ve dilimi değiştir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: Üç çekirdek ve on beş modül için sunum planı var. Var etiketi uygulanmış modül kabulü değil; HRMS ile aynı kaynak/sürüm olduğu gösterilmedi.',
          evidenceIds: ['CONT-REM-BIN-026'],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Sentetik tek dönem puantaj verisi doğrulanır; kapanış sonucu, farklar ve karar izi açıkça üretilir.',
          evidenceIds: ['strategy-proposal-cronbi-people'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Tek kapanış, geniş İK listesini veri ve hesap doğruluğu üzerinden somut olarak değerlendirebilir. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-cronbi-people'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Puantaj, özlük ve kapanış referansları tutarlı kalır. Alan sahibinin onayladığı örneklerde hesap/fark ve tekrar işlem sonuçları doğrulanır. Çalışan ve yönetici rol sınırı ile audit izi sınanır; cihaz ve bordro entegrasyonları ayrı kabul edilir.',
          evidenceIds: ['strategy-proposal-cronbi-people'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-cronbi-people'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'yes',
          reason: 'Bordro, PDKS ve on beş modül tek kapanışla kabul edilmez.',
          evidenceIds: ['CONT-REM-BIN-026'],
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        roleBoundary: {
          state: 'yes',
          reason:
            'Önerilen dilim için analist çıkarımı: Özlük, çalışan ve yönetici erişimleri farklı veri sınırları gerektiriyor.',
          evidenceIds: ['strategy-proposal-cronbi-people'],
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-BIN-026',
          label: 'CronBI People: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'Üç çekirdek ve on beş modül için sunum planı var. Var etiketi uygulanmış modül kabulü değil; HRMS ile aynı kaynak/sürüm olduğu gösterilmedi.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-cronbi-people',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Puantaj girdisinden kaynaklı dönem kapanışına. Tek kapanış, geniş İK listesini veri ve hesap doğruluğu üzerinden somut olarak değerlendirebilir.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
    {
      id: 'ai-first-ea',
      name: 'AI First EA / AEP',
      aliases: [],
      kind: 'platform',
      ownership: 'user',
      coverage: 'initial',
      definition:
        'AI komut yüzeyi, tasarım sistemi ve daha geniş EA/EBP/EOP/EBM/ERX ürün ailesi için arayüz altyapısı.',
      observed:
        'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
      goals: ['core', 'flow'],
      capabilities: [
        'AI komut yüzeyi',
        'Semantik token',
        'Klavye ve odak',
        'Bileşen sözleşmesi',
      ],
      slice: {
        title: 'Gerçek ürün işlemine bağlı erişilebilir AI komut yüzeyi',
        outcome:
          'Komut kartı gerçek ürünün navigation/query/işlem sözleşmesine bağlanır; durum, odak ve hata bilgisi tutarlı çalışır.',
        acceptance: [
          'Kaynak TS export ile üretim JS/types çıktısı ve sürümlü paket sözleşmesi ayrılır.',
          'Aç/kapa, klavye, odak, 320 CSS px ve reduced-motion gerçek tüketici yüzeyinde doğrulanır.',
          'Gerçek araç olayı ve hata durumu görünürdür; backend/yetki/audit varmış gibi gösterilmez.',
        ],
        steps: [
          'Tek ürün tüketicisini ve komut olay sözleşmesini seç.',
          'Bileşen callbacklerini gerçek query/navigation durumuna bağla.',
          'Paket çıktı ve token sözleşmesini tüketiciyle doğrula.',
          'Mobil, klavye, odak ve hata akışını çalıştır; bakım/uyarlama eforunu kaydet.',
        ],
      },
      rationale:
        'Mevcut bileşeni gerçek tüketicide kullanmak, daha geniş AI-first platform hedefinin gerekli arayüz parçasını sınar.',
      counterargument:
        'Bileşen kabuğu iş kurallarını ve AI backendini çözmez; kullanıcı akışı olmadan genel arayüz platformunu büyütmek düşük kaldıraç sağlayabilir.',
      reconsiderWhen:
        'Tüketicinin komut akışı farklı sözleşme veya başka UI çözümü gerektirirse bileşen kapsamını değiştir.',
      effort: {
        status: 'not_estimated',
        reason:
          'Güncel kaynak sürümünde temiz kurulum, eksik iş ve bakım yükü ölçülmedi; saat veya takvim taahhüdü üretilmedi.',
      },
      assessments: [
        {
          criterion: 'baseline',
          state: 'observed',
          finding:
            'Önceki kaynak inceleme kaydında gözlenenler: İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          evidenceIds: [
            'CONT-REM-SRC-126',
            'CONT-REM-SRC-127',
            'CONT-REM-SRC-128',
            'CONT-REM-SRC-129',
            'CONT-REM-SRC-130',
            'CONT-REM-SRC-131',
            'CONT-REM-SRC-132',
            'CONT-REM-SRC-133',
            'CONT-REM-SRC-134',
            'CONT-REM-SRC-135',
            'CONT-REM-SRC-136',
            'CONT-REM-SRC-137',
          ],
          verification:
            'Kaynak sürümünü bağlayıp temiz kurulumda önerilen kullanıcı akışını, başarısızlık yollarını ve veri sonucunu çalıştır.',
          decisionImpact:
            'Kaynakta bulunan parça başlangıç noktasıdır; çalışan ürün veya sıralama puanı değildir.',
        },
        {
          criterion: 'slice',
          state: 'inferred',
          finding:
            'Komut kartı gerçek ürünün navigation/query/işlem sözleşmesine bağlanır; durum, odak ve hata bilgisi tutarlı çalışır.',
          evidenceIds: ['strategy-proposal-ai-first-ea'],
          verification:
            'Aşağıdaki kabul ölçütlerini gerçek uygulama üzerinde çalıştır; sonuç ve kullanılan sürümü kaydet.',
          decisionImpact:
            'Proje adını tamamlamak yerine bu sınanabilir yazılım dilimine yatırım yapılıp yapılmayacağı seçilir.',
        },
        {
          criterion: 'uncertainty',
          state: 'unknown',
          finding:
            'Temiz kurulum, uçtan uca çalışma ve toplam geliştirme/bakım eforu bu değerlendirmede ölçülmedi.',
          evidenceIds: [],
          verification:
            'Kurulum, inceleme, düzeltme, entegrasyon ve tekrar çalıştırma sürelerini ayrı kaydet.',
          decisionImpact:
            'Efor veya doğrulanmış çalışma bilinmeden kesin kazanan ilan edilmez; doğrulama adımı planlanır.',
        },
        {
          criterion: 'goal',
          state: 'inferred',
          finding:
            'Mevcut bileşeni gerçek tüketicide kullanmak, daha geniş AI-first platform hedefinin gerekli arayüz parçasını sınar. Bu katkı seçilen geliştirme hedefine göre sınanacak; bütün hedefler için tek kazanan iddiası değildir.',
          evidenceIds: ['strategy-proposal-ai-first-ea'],
          verification:
            'Seçilen hedefin kullanıcı sonucunu, bağımlılığını ve kabul koşulunu diğer adayların somut dilimleriyle karşılaştır.',
          decisionImpact:
            'Hedef değiştiğinde aynı adayın öncelik gerekçesi de değişebilir.',
        },
        {
          criterion: 'correctness',
          state: 'inferred',
          finding:
            'Önerilen doğruluk kabulü: Kaynak TS export ile üretim JS/types çıktısı ve sürümlü paket sözleşmesi ayrılır. Aç/kapa, klavye, odak, 320 CSS px ve reduced-motion gerçek tüketici yüzeyinde doğrulanır. Gerçek araç olayı ve hata durumu görünürdür; backend/yetki/audit varmış gibi gösterilmez.',
          evidenceIds: ['strategy-proposal-ai-first-ea'],
          verification:
            'Onaylı beklenen sonuçları sabitle; başarılı, geçersiz, tekrar ve çelişkili girişleri aynı sürümde çalıştır.',
          decisionImpact:
            'Statik risk gerçek uygulamada sınanır; başarısızlık giderilmeden kabul verilmez.',
        },
        {
          criterion: 'dependency',
          state: 'unknown',
          finding:
            'Diğer adayların bu dilim için zorunlu altyapı olduğu kaynak düzeyinde gösterilmedi. Benzer teknoloji yığını bağımlılık sayılmadı.',
          evidenceIds: [],
          verification:
            'Dilimi tamamlamayı gerçekten engelleyen sözleşmeyi, tüketici akışını ve sürümü göster; daha basit alternatifi karşılaştır.',
          decisionImpact:
            'Kanıtlanmamış proje ilişkisi zorunlu geliştirme sırasına çevrilmez.',
        },
        {
          criterion: 'reuse',
          state: 'inferred',
          finding:
            'Mevcut bileşeni gerçek tüketicide kullanmak, daha geniş AI-first platform hedefinin gerekli arayüz parçasını sınar. İkinci gerçek tüketicide aynı sözleşmenin uyarlama ve bakım maliyeti henüz ölçülmedi.',
          evidenceIds: ['strategy-proposal-ai-first-ea'],
          verification:
            'İki ürünün somut kullanıcı akışında ortak kalan sözleşmeyi ve ürüne özel parçaları göster; toplam entegrasyon/bakım eforunu karşılaştır.',
          decisionImpact:
            'Ortak altyapı yatırımı, gerçekleşmiş yeniden kullanım kanıtı geldikçe genişletilir; plan büyüklüğüyle puanlanmaz.',
        },
        {
          criterion: 'opportunity',
          state: 'unknown',
          finding:
            'Bu dilime ayrılacak geliştirme eforunun diğer adaylarda kaybettirdiği kullanıcı sonucu ve tamamlanma fırsatı ölçülmedi.',
          evidenceIds: [],
          verification:
            'Aynı tamamlanma tanımıyla alternatif dilimlerin eksik iş, bağımlılık ve bakım yükünü karşılaştır; gerçekleşen eforu kaydet.',
          decisionImpact:
            'Ölçülmemiş saat, varsayılan hız veya kısa vadeli ödeme şartıyla kesin sıra üretilmez.',
        },
      ],
      dependencies: [],
      facts: {
        runtime: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        bounded: {
          state: 'yes',
          evidenceIds: ['strategy-proposal-ai-first-ea'],
          reason:
            'Sınırı ve kabul koşulları yazılmış bir sonraki dilim önerisi var; tamamlandığı iddia edilmiyor.',
        },
        blockingFailure: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        scopeLarge: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        sharedContract: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        speculativeCore: {
          state: 'unknown',
          reason:
            'Çok tüketicili ortak kullanım henüz doğrulanmadı. Bu eksiklik tek başına gereksiz genelleme yapıldığını kanıtlamaz.',
          evidenceIds: [],
        },
        roleBoundary: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        externalEffect: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        accepted: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        invalidated: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
        conflictingEvidence: {
          state: 'unknown',
          evidenceIds: [],
          reason:
            'Bu koşul için bağımsız çalışma zamanı veya kabul kanıtı yok.',
        },
      },
      evidence: [
        {
          id: 'CONT-REM-SRC-126',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-127',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-128',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-129',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-130',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-131',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-132',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-133',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-134',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-135',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-136',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'CONT-REM-SRC-137',
          label: 'AI First EA / AEP: önceki kaynak inceleme kaydı',
          kind: 'source',
          claim:
            'İncelenen kaynakta dışa aktarılan AiCommandCard, durum/odak hooku, lazy panel ve semantik token CSS var. Backend AI, yetki, tenant ve audit akışı bileşenin kendisi tarafından sağlanmıyor; paket yayın/kabulü yok.',
          limitation:
            'Önceki statik inceleme kaydının arındırılmış özeti. Özgün ağacın tamamı incelenmedi; kaynak uygulama bu değerlendirmede çalıştırılmadı. Belge ve sunum hedefleri uygulanmış özellik sayılmaz.',
        },
        {
          id: 'strategy-proposal-ai-first-ea',
          label: 'Geliştirme dilimi önerisi',
          kind: 'analysis',
          claim:
            'Gerçek ürün işlemine bağlı erişilebilir AI komut yüzeyi. Mevcut bileşeni gerçek tüketicide kullanmak, daha geniş AI-first platform hedefinin gerekli arayüz parçasını sınar.',
          limitation:
            'Analistin sınanabilir kapsam önerisidir; uygulanmış özellik, ölçülmüş süre veya kesin öncelik değildir.',
        },
        {
          id: 'user-software-objective-2026-10-10',
          label: 'Kullanıcının güncel kapsam açıklaması',
          kind: 'user',
          claim:
            'TÜRSAB projeleri dışındaki yazılım projeleri kullanıcıya aittir. Karar amacı yazılım altyapısını geliştirmek ve geliştirme önceliğini seçmektir.',
          limitation:
            'Sahiplik ve amaç kullanıcı beyanıdır; uygulama, entegrasyon ve çalışma zamanı kabulünü kanıtlamaz.',
        },
      ],
    },
  ],
};

export const development: Strategy = {
  ...projectDevelopment,
  candidates: projectDevelopment.candidates.map((candidate) => {
    const value = caseFor(candidate.id);
    const organicSales = {
      criterion: 'organicSales' as const,
      state:
        value.distribution.access === 'observed'
          ? ('observed' as const)
          : value.distribution.channel
            ? ('inferred' as const)
            : ('unknown' as const),
      finding: `${value.distribution.channel || 'Gerçek alıcı erişimi belirlenemedi.'} İlk teklif: ${value.distribution.firstOffer || 'Belirlenemedi.'} ${value.distribution.cost}`,
      evidenceIds: value.evidenceIds,
      verification: `${value.distribution.steps.join(' ')} ${
        value.position === 'product'
          ? 'Gerçek alıcıya erişim sonucunu, alternatif tercihini ve itirazını kaydet. Edinme, kurulum ve destek emeğini ayrı ölç; teknik tekrar deneyi kanal erişimi kanıtı değildir.'
          : 'Bağımsız ürün satışı varsayma. Somut tüketiciye erişimi, mevcut alternatife göre katkıyı ve kurulum/bakım emeğini kaydet.'
      }`,
      decisionImpact: value.conclusion,
    };
    return {
      ...candidate,
      commercial: commercialDecision(caseFor(candidate.id)).summary,
      assessments: [...candidate.assessments, organicSales],
    };
  }),
};

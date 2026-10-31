/* ==========================================================
   Çok dilli içerik: TR (sayfadaki varsayılan), EN, FR, DE
   Anahtar, sayfadaki Türkçe metnin kendisidir; sayfa açılırken
   seçilen dile göre metinler ve erişilebilirlik etiketleri değiştirilir.
   Özel isimler, adresler ve rakamlar çevrilmez.
   ========================================================== */
(() => {
  const LANGS = ["tr", "en", "fr", "de"];

  // [tr, en, fr, de]
  const TEXT = [
    // Menü ve genel
    ["Biyografi", "Biography", "Biographie", "Biografie"],
    ["Rakamlar", "Figures", "Chiffres", "Kennzahlen"],
    ["Projeler", "Projects", "Projets", "Projekte"],
    ["Grup", "Group", "Groupe", "Gruppe"],
    ["İletişim", "Contact", "Contact", "Kontakt"],
    ["İçeriğe geç", "Skip to content", "Aller au contenu", "Zum Inhalt springen"],
    ["Kurucu Ortak &amp; Yönetim Kurulu Başkanı", "Co-Founder &amp; Chairman of the Board", "Cofondateur &amp; Président du Conseil d’administration", "Mitgründer &amp; Vorsitzender des Verwaltungsrats"],
    ["Kaydırın", "Scroll", "Défiler", "Scrollen"],

    // Yaklaşım
    ["Yaklaşım", "Approach", "Approche", "Haltung"],
    ["Kenti dönüştürüyoruz, yaşamı güzelleştiriyoruz.", "We transform the city, we enhance life.", "Nous transformons la ville, nous embellissons la vie.", "Wir verwandeln die Stadt, wir verschönern das Leben."],

    // Biyografi
    ["Sahadan gelen <em>disiplin</em>", "Discipline <em>from the field</em>", "Une discipline <em>née du terrain</em>", "Disziplin <em>aus der Praxis</em>"],
    ["04.10.1994 doğumlu Ümit FETTAHOĞLU, kariyerine aile şirketi FETTAHOĞLU Yapı bünyesinde aktif rol alarak başladı. Proje üretimi, şantiye yönetimi ve taahhüt süreçlerinde kazandığı deneyim; saha disiplini, organizasyon kabiliyeti ve iş geliştirme yaklaşımıyla daha büyük ölçekli yapılanmaların temelini oluşturdu.",
      "Born on 4 October 1994, Ümit FETTAHOĞLU began his career with an active role at the family company, FETTAHOĞLU Yapı. The experience he gained in project development, site management and contracting — together with his field discipline, organisational strength and business-development approach — laid the foundation for larger-scale ventures.",
      "Né le 4 octobre 1994, Ümit FETTAHOĞLU a débuté sa carrière en jouant un rôle actif au sein de l’entreprise familiale FETTAHOĞLU Yapı. L’expérience acquise dans le développement de projets, la gestion de chantiers et les marchés de travaux — alliée à sa rigueur de terrain, à son sens de l’organisation et à son approche du développement commercial — a posé les bases de structures de plus grande envergure.",
      "Ümit FETTAHOĞLU, geboren am 4. Oktober 1994, begann seine Laufbahn mit einer aktiven Rolle im Familienunternehmen FETTAHOĞLU Yapı. Seine Erfahrung in Projektentwicklung, Bauleitung und Auftragsabwicklung – verbunden mit Praxisdisziplin, Organisationsstärke und unternehmerischem Gespür – legte den Grundstein für Strukturen größeren Maßstabs."],
    ["FETSAN GRUP’un <em>kuruluşu</em>", "Founding <em>FETSAN GRUP</em>", "La fondation de <em>FETSAN GRUP</em>", "Die Gründung von <em>FETSAN GRUP</em>"],
    ["Ahmet Sancaktutan ile güçlerini birleştirerek FETSAN GRUP’un kuruluşuna liderlik etti ve şirketin kısa sürede yüksek ivme yakalamasında belirleyici rol oynadı. Kentsel dönüşüm alanında hızla büyüyen FETSAN GRUP, yüz binlerce metrekareyi bulan inşaat alanlarında çok paydaşlı, ölçekli projeleri başarıyla yönetti.",
      "Joining forces with Ahmet Sancaktutan, he led the founding of FETSAN GRUP and played a decisive role in the company’s rapid momentum. Growing quickly in urban transformation, FETSAN GRUP has successfully managed large-scale, multi-stakeholder projects across construction areas totalling hundreds of thousands of square metres.",
      "En s’associant à Ahmet Sancaktutan, il a mené la fondation de FETSAN GRUP et joué un rôle déterminant dans son essor rapide. En pleine croissance dans la transformation urbaine, FETSAN GRUP a mené à bien des projets d’envergure impliquant de nombreuses parties prenantes, sur des centaines de milliers de mètres carrés de chantiers.",
      "Gemeinsam mit Ahmet Sancaktutan führte er die Gründung von FETSAN GRUP an und prägte den raschen Aufstieg des Unternehmens maßgeblich. Im Bereich der Stadterneuerung schnell gewachsen, hat FETSAN GRUP großangelegte Projekte mit vielen Beteiligten auf Bauflächen von Hunderttausenden Quadratmetern erfolgreich umgesetzt."],
    ["Bugün ve <em>yarın</em>", "Today and <em>tomorrow</em>", "Aujourd’hui et <em>demain</em>", "Heute und <em>morgen</em>"],
    ["Yönetim Kurulu Başkanı olarak planlama, uygulama, kaynak yönetimi ve proje geliştirme süreçlerini bütüncül bir yaklaşımla yönetiyor. Kalite standartlarını, iş güvenliğini ve sürdürülebilir büyümeyi merkeze alarak uzun vadeli değer üreten projelere odaklanıyor.",
      "As Chairman of the Board, he leads planning, execution, resource management and project development with a holistic approach. Placing quality standards, occupational safety and sustainable growth at the centre, he focuses on projects that create long-term value.",
      "En tant que Président du Conseil d’administration, il pilote la planification, l’exécution, la gestion des ressources et le développement des projets selon une approche globale. Plaçant les normes de qualité, la sécurité au travail et la croissance durable au cœur de sa démarche, il se concentre sur des projets créateurs de valeur à long terme.",
      "Als Vorsitzender des Verwaltungsrats steuert er Planung, Umsetzung, Ressourcenmanagement und Projektentwicklung mit einem ganzheitlichen Ansatz. Mit Qualitätsstandards, Arbeitssicherheit und nachhaltigem Wachstum im Mittelpunkt konzentriert er sich auf Projekte, die langfristig Werte schaffen."],

    // Rakamlar
    ["Ölçek", "Scale", "Échelle", "Dimension"],
    ["<span>İstanbul’un dört bir yanında,</span><span><em>eş zamanlı</em> inşa.</span>",
      "<span>Across Istanbul,</span><span>building <em>in parallel</em>.</span>",
      "<span>Aux quatre coins d’Istanbul,</span><span>bâtir <em>en simultané</em>.</span>",
      "<span>Überall in Istanbul,</span><span><em>zeitgleich</em> gebaut.</span>"],
    ["Dairelik proje hacmi", "Apartments in project volume", "Logements en volume de projets", "Wohnungen im Projektvolumen"],
    ["İnşaat alanı", "Construction area", "Surface de construction", "Baufläche"],
    ["Projede eş zamanlı geliştirme", "Projects developed simultaneously", "Projets développés simultanément", "Projekte in paralleler Entwicklung"],
    ["Kişilik teknik kadro", "Technical staff", "Collaborateurs techniques", "Technische Fachkräfte"],
    ["Değerler yaklaşıktır.", "Figures are approximate.", "Valeurs approximatives.", "Werte sind Näherungswerte."],

    // Projeler
    ["Seçili Projeler", "Selected Projects", "Projets choisis", "Ausgewählte Projekte"],
    ["<span>Kentsel dönüşümde</span><span><em>kalıcı</em> izler.</span>",
      "<span><em>Lasting</em> marks</span><span>in urban renewal.</span>",
      "<span>Des traces <em>durables</em></span><span>dans la transformation urbaine.</span>",
      "<span><em>Bleibende</em> Spuren</span><span>in der Stadterneuerung.</span>"],
    ["Güven, şeffaflık, temiz işçilik ve profesyonel süreç yönetimiyle yükselen yaşam alanları.",
      "Living spaces rising on trust, transparency, quality craftsmanship and professional process management.",
      "Des lieux de vie bâtis sur la confiance, la transparence, un travail soigné et une gestion de projet professionnelle.",
      "Lebensräume, getragen von Vertrauen, Transparenz, sauberer Ausführung und professionellem Prozessmanagement."],
    ["Portföy", "Portfolio", "Portfolio", "Portfolio"],
    ["Tüm projeleri<br><em>keşfedin</em>", "Explore<br><em>all projects</em>", "Découvrir<br><em>tous les projets</em>", "Alle Projekte<br><em>entdecken</em>"],

    // Sahada
    ["Sahada", "On Site", "Sur le terrain", "Vor Ort"],
    ["<span>Bir dönüşümün</span><span><em>dört perdesi.</em></span>",
      "<span>A transformation</span><span><em>in four acts.</em></span>",
      "<span>Une transformation</span><span><em>en quatre actes.</em></span>",
      "<span>Eine Erneuerung</span><span><em>in vier Akten.</em></span>"],
    ["Yıkım", "Demolition", "Démolition", "Abriss"],
    ["Bir dönemin izleri silinirken, yeni bir yaşamın ilk adımları atılıyor.",
      "As the traces of an era fade, the first steps of a new life are taken.",
      "Tandis que s’effacent les traces d’une époque, les premiers pas d’une vie nouvelle se dessinent.",
      "Während die Spuren einer Epoche verschwinden, beginnt ein neues Leben."],
    ["Şantiye", "Construction", "Chantier", "Baustelle"],
    ["Her yeni şantiye; yeni bir dönüşümün, yeni bir yaşam alanının başlangıcı.",
      "Every new site marks the beginning of a new transformation and a new place to live.",
      "Chaque nouveau chantier marque le début d’une transformation et d’un nouveau lieu de vie.",
      "Jede neue Baustelle ist der Anfang einer Erneuerung und eines neuen Lebensraums."],
    ["Yükseliş", "Rise", "Élévation", "Aufstieg"],
    ["Vincin tepesinde, yüzlerce insanın emeğini taşıyan, şantiyenin yükünü omuzlayan bir insan var.",
      "At the top of the crane is someone who carries the work of hundreds and shoulders the weight of the site.",
      "Au sommet de la grue, quelqu’un porte le travail de centaines de personnes et le poids du chantier.",
      "Oben im Kran sitzt ein Mensch, der die Arbeit von Hunderten trägt und die Last der Baustelle schultert."],
    ["Kule vinç operatörü", "Tower crane operator", "Grutier", "Turmkranführer"],
    ["Teslim", "Handover", "Livraison", "Übergabe"],
    ["Her detayında konfor, her köşesinde yeni bir başlangıç.",
      "Comfort in every detail, a new beginning in every corner.",
      "Le confort dans chaque détail, un nouveau départ dans chaque recoin.",
      "Komfort in jedem Detail, ein Neuanfang in jeder Ecke."],

    // Miras ve film
    ["Aileden gelen sektör birikimi,<br><em>kurumsal ölçekte.</em>",
      "A family legacy in the industry,<br><em>at corporate scale.</em>",
      "Un savoir-faire familial,<br><em>à l’échelle d’un groupe.</em>",
      "Familiäre Branchenerfahrung,<br><em>im Unternehmensmaßstab.</em>"],
    ["Tanıtım filmini izleyin", "Watch the film", "Voir le film", "Film ansehen"],
    ["Kentsel Dönüşümde Güvenin Adresi", "The address of trust in urban renewal", "La référence de confiance en transformation urbaine", "Die Adresse des Vertrauens in der Stadterneuerung"],

    // Grup
    ["<span>Tek vizyon,</span><span><em>çok sektörlü</em> bir yapı.</span>",
      "<span>One vision,</span><span>a <em>multi-sector</em> group.</span>",
      "<span>Une vision,</span><span>un groupe <em>multisectoriel</em>.</span>",
      "<span>Eine Vision,</span><span>eine <em>branchenübergreifende</em> Gruppe.</span>"],
    ["İnşaat ve kentsel dönüşümün yanı sıra otomotiv, tekstil ve restoran sektörlerinde yatırımlar. Ümit FETTAHOĞLU, bu iş kollarının kurumsal entegrasyonu, büyüme stratejileri ve operasyonel verimliliğinde aktif yönetsel sorumluluk üstleniyor.",
      "Beyond construction and urban transformation, the group invests in automotive, textiles and restaurants. Ümit FETTAHOĞLU holds active executive responsibility for the corporate integration, growth strategies and operational efficiency of these business lines.",
      "Au-delà de la construction et de la transformation urbaine, le groupe investit dans l’automobile, le textile et la restauration. Ümit FETTAHOĞLU assume une responsabilité de direction active dans l’intégration, les stratégies de croissance et l’efficacité opérationnelle de ces activités.",
      "Neben Bau und Stadterneuerung investiert die Gruppe in Automobil, Textil und Gastronomie. Ümit FETTAHOĞLU trägt aktive Führungsverantwortung für die Integration, Wachstumsstrategien und operative Effizienz dieser Geschäftsbereiche."],
    ["İnşaat &amp; Kentsel Dönüşüm", "Construction &amp; Urban Renewal", "Construction &amp; Transformation urbaine", "Bau &amp; Stadterneuerung"],
    ["Mimarlık", "Architecture", "Architecture", "Architektur"],
    ["Otomotiv", "Automotive", "Automobile", "Automobil"],
    ["Tekstil", "Textiles", "Textile", "Textil"],
    ["Restoran", "Restaurants", "Restauration", "Gastronomie"],
    ["Grubun ana faaliyet alanı. 1956’da kurulan FETTAHOĞLU Yapı’nın birikimiyle İstanbul genelinde yaklaşık 500.000 m² büyüklüğünde ve yaklaşık 5.000 bağımsız bölümden oluşan 60 proje eş zamanlı geliştiriliyor.",
      "The group’s core business. Building on the heritage of FETTAHOĞLU Yapı, founded in 1956, 60 projects across Istanbul — approximately 500,000 m² and some 5,000 independent units — are being developed simultaneously.",
      "Cœur d’activité du groupe. Fort de l’héritage de FETTAHOĞLU Yapı, fondée en 1956, le groupe développe simultanément 60 projets à Istanbul, soit environ 500 000 m² et quelque 5 000 unités.",
      "Kerngeschäft der Gruppe. Aufbauend auf dem Erbe der 1956 gegründeten FETTAHOĞLU Yapı entstehen in Istanbul zeitgleich 60 Projekte – rund 500.000 m² mit etwa 5.000 Einheiten."],
    ["Mimari tasarım ve iç mimarlık süreçleri, grup bünyesindeki AST Mimarlık tarafından yürütülüyor.",
      "Architectural design and interior architecture are carried out by AST Mimarlık within the group.",
      "La conception architecturale et l’architecture intérieure sont assurées par AST Mimarlık, au sein du groupe.",
      "Architektur und Innenarchitektur werden von AST Mimarlık innerhalb der Gruppe verantwortet."],
    ["Grubun otomotiv alanındaki yatırımları; Safe Oto ve Fetsan Motors markalarıyla sürdürülüyor.",
      "The group’s automotive investments continue under the Safe Oto and Fetsan Motors brands.",
      "Les investissements automobiles du groupe se poursuivent sous les marques Safe Oto et Fetsan Motors.",
      "Die Automobil-Investitionen der Gruppe laufen unter den Marken Safe Oto und Fetsan Motors."],
    ["Tekstil sektöründeki faaliyetler, grup iştiraki Zalluna Tekstil çatısı altında yürütülüyor.",
      "Textile activities are carried out under the group company Zalluna Tekstil.",
      "Les activités textiles sont menées par la filiale Zalluna Tekstil.",
      "Die Textilaktivitäten werden unter der Gruppengesellschaft Zalluna Tekstil geführt."],
    ["FETSAN GRUP’un çok sektörlü yapısının bir parçası olarak restoran sektöründe yatırımlar bulunuyor.",
      "As part of FETSAN GRUP’s multi-sector structure, the group holds investments in the restaurant sector.",
      "Dans le cadre de sa structure multisectorielle, FETSAN GRUP détient des investissements dans la restauration.",
      "Als Teil der branchenübergreifenden Struktur hält FETSAN GRUP Beteiligungen in der Gastronomie."],

    // Söz
    ["Söz", "In His Words", "Ses mots", "In seinen Worten"],
    ["İşimizin temelinde emek, sözümüzün arkasında sorumluluk var. Bize duyulan güveni korumak ve kalıcı değerler üretmek için aynı kararlılıkla çalışmaya devam ediyoruz.",
      "Our work is built on dedication; behind our word stands responsibility. We continue to work with the same determination to protect the trust placed in us and to create lasting value.",
      "Notre travail repose sur l’engagement, et derrière notre parole se tient la responsabilité. Nous continuons d’avancer avec la même détermination pour préserver la confiance qui nous est accordée et créer une valeur durable.",
      "Unsere Arbeit gründet auf Hingabe, hinter unserem Wort steht Verantwortung. Mit derselben Entschlossenheit arbeiten wir weiter, um das uns entgegengebrachte Vertrauen zu bewahren und bleibende Werte zu schaffen."],

    // İlkeler
    ["Yönetim Anlayışı", "Leadership Principles", "Principes de direction", "Führungsprinzipien"],
    ["<em>Kalite</em> standartları", "<em>Quality</em> standards", "Normes de <em>qualité</em>", "<em>Qualitäts</em>standards"],
    ["<em>İş güvenliği</em>", "<em>Occupational</em> safety", "<em>Sécurité</em> au travail", "<em>Arbeits</em>sicherheit"],
    ["<em>Sürdürülebilir</em> büyüme", "<em>Sustainable</em> growth", "Croissance <em>durable</em>", "<em>Nachhaltiges</em> Wachstum"],

    // İletişim
    ["<span>Birlikte</span><span><em>inşa edelim.</em></span>",
      "<span>Let’s build</span><span><em>together.</em></span>",
      "<span>Bâtissons</span><span><em>ensemble.</em></span>",
      "<span>Lassen Sie uns</span><span><em>gemeinsam bauen.</em></span>"],
    ["Ofis", "Office", "Bureau", "Büro"],

    // İletişim formu
    ["Mesaj Gönderin", "Send a Message", "Envoyer un message", "Nachricht senden"],
    ["Ad Soyad", "Full Name", "Nom complet", "Vor- und Nachname"],
    ["E-posta", "Email", "E-mail", "E-Mail"],
    ["Telefon <small>(isteğe bağlı)</small>", "Phone <small>(optional)</small>", "Téléphone <small>(facultatif)</small>", "Telefon <small>(optional)</small>"],
    ["Konu", "Subject", "Objet", "Betreff"],
    ["Genel", "General", "Général", "Allgemein"],
    ["İş birliği", "Partnership", "Partenariat", "Kooperation"],
    ["Proje", "Project", "Projet", "Projekt"],
    ["Basın", "Press", "Presse", "Presse"],
    ["Diğer", "Other", "Autre", "Sonstiges"],
    ["Mesajınız", "Your Message", "Votre message", "Ihre Nachricht"],
    ["Kişisel verilerimin, talebime yanıt verilmesi amacıyla işlenmesini kabul ediyorum.", "I consent to the processing of my personal data for the purpose of responding to my request.", "J’accepte le traitement de mes données personnelles afin qu’il soit répondu à ma demande.", "Ich willige in die Verarbeitung meiner personenbezogenen Daten zur Beantwortung meiner Anfrage ein."],
    ["KVKK Aydınlatma Metni", "Privacy Notice (KVKK)", "Avis de confidentialité (KVKK)", "Datenschutzhinweis (KVKK)"],
    ["Mesajı Gönder", "Send Message", "Envoyer", "Nachricht senden"],
    ["Lütfen adınızı yazın.", "Please enter your name.", "Veuillez indiquer votre nom.", "Bitte geben Sie Ihren Namen ein."],
    ["Lütfen geçerli bir e-posta adresi yazın.", "Please enter a valid email address.", "Veuillez indiquer une adresse e-mail valide.", "Bitte geben Sie eine gültige E-Mail-Adresse ein."],
    ["Lütfen mesajınızı yazın.", "Please enter your message.", "Veuillez écrire votre message.", "Bitte geben Sie Ihre Nachricht ein."],
    ["Devam etmek için onay kutusunu işaretleyin.", "Please tick the consent box to continue.", "Veuillez cocher la case de consentement pour continuer.", "Bitte bestätigen Sie die Einwilligung, um fortzufahren."],
    ["Gönderiliyor…", "Sending…", "Envoi…", "Wird gesendet…"],
    ["Teşekkürler, <em>mesajınız ulaştı.</em>", "Thank you, <em>your message has arrived.</em>", "Merci, <em>votre message nous est parvenu.</em>", "Vielen Dank, <em>Ihre Nachricht ist angekommen.</em>"],
    ["En kısa sürede size dönüş yapılacaktır.", "We will get back to you as soon as possible.", "Nous vous répondrons dans les meilleurs délais.", "Wir melden uns so bald wie möglich bei Ihnen."],
    ["Mesaj şu anda gönderilemedi. Lütfen e-posta ile ulaşın:", "Your message could not be sent right now. Please reach us by email:", "Votre message n’a pas pu être envoyé. Veuillez nous écrire par e-mail :", "Ihre Nachricht konnte nicht gesendet werden. Bitte kontaktieren Sie uns per E-Mail:"],
    ["E-posta ile gönder", "Send by email", "Envoyer par e-mail", "Per E-Mail senden"],
    ["Genel Merkez", "Headquarters", "Siège", "Hauptsitz"],
    ["Şube — Sefaköy", "Branch — Sefaköy", "Agence — Sefaköy", "Niederlassung — Sefaköy"],
    ["Şube — Zeytinburnu", "Branch — Zeytinburnu", "Agence — Zeytinburnu", "Niederlassung — Zeytinburnu"],
  ];

  // Erişilebilirlik etiketleri, alternatif metinler, bölüm adları ve JS'in ürettiği metinler
  const ATTR = [
    ["Ana menü", "Main menu", "Menu principal", "Hauptmenü"],
    ["Mobil menü", "Mobile menu", "Menu mobile", "Mobiles Menü"],
    ["Menüyü aç", "Open menu", "Ouvrir le menu", "Menü öffnen"],
    ["Menüyü kapat", "Close menu", "Fermer le menu", "Menü schließen"],
    ["Dil seçimi", "Language", "Langue", "Sprache"],
    ["Yaklaşım", "Approach", "Approche", "Haltung"],
    ["Biyografi", "Biography", "Biographie", "Biografie"],
    ["Ölçek", "Scale", "Échelle", "Dimension"],
    ["Projeler", "Projects", "Projets", "Projekte"],
    ["Sahada", "On Site", "Sur le terrain", "Vor Ort"],
    ["Miras", "Legacy", "Héritage", "Erbe"],
    ["Söz", "In His Words", "Ses mots", "In seinen Worten"],
    ["Ümit FETTAHOĞLU sahnede, Türk bayrağının yanında", "Ümit FETTAHOĞLU on stage beside the Turkish flag", "Ümit FETTAHOĞLU sur scène, près du drapeau turc", "Ümit FETTAHOĞLU auf der Bühne neben der türkischen Flagge"],
    ["Grup", "Group", "Groupe", "Gruppe"],
    ["İlkeler", "Principles", "Principes", "Prinzipien"],
    ["İletişim", "Contact", "Contact", "Kontakt"],
    ["Yönetim anlayışı", "Leadership principles", "Principes de direction", "Führungsprinzipien"],
    ["1956'dan bu yana", "Since 1956", "Depuis 1956", "Seit 1956"],
    ["Grup markaları", "Group brands", "Marques du groupe", "Marken der Gruppe"],
    ["Sosyal medya", "Social media", "Réseaux sociaux", "Soziale Medien"],
    ["FETSAN GRUP web sitesi", "FETSAN GRUP website", "Site web de FETSAN GRUP", "Website von FETSAN GRUP"],
    ["Videoyu kapat", "Close video", "Fermer la vidéo", "Video schließen"],
    ["Tanıtım filmini izle: Kentsel Dönüşümde Güvenin Adresi", "Watch the film: The address of trust in urban renewal", "Voir le film : La référence de confiance en transformation urbaine", "Film ansehen: Die Adresse des Vertrauens in der Stadterneuerung"],
    ["Ümit FETTAHOĞLU kürsüde", "Ümit FETTAHOĞLU at the podium", "Ümit FETTAHOĞLU au pupitre", "Ümit FETTAHOĞLU am Rednerpult"],
    ["Aytekin Kent Sitesi'nde yıkım çalışması", "Demolition at Aytekin Kent Sitesi", "Démolition à Aytekin Kent Sitesi", "Abriss in der Aytekin Kent Sitesi"],
    ["Şantiyede kazı çalışması", "Excavation on site", "Travaux d’excavation sur le chantier", "Aushubarbeiten auf der Baustelle"],
    ["Kule vinç kabininden görünüm", "View from the tower crane cab", "Vue depuis la cabine de la grue", "Blick aus der Turmkrankabine"],
    ["Teslime hazır dairenin banyosu", "Bathroom of an apartment ready for handover", "Salle de bains d’un logement prêt à être livré", "Bad einer bezugsfertigen Wohnung"],
    ["FETSAN GRUP ekibi şantiye önünde", "The FETSAN GRUP team in front of a site", "L’équipe FETSAN GRUP devant un chantier", "Das Team von FETSAN GRUP vor einer Baustelle"],
  ];

  // Metin içindeki parçalar (ör. "01 — Site Projesi")
  const PARTS = [
    ["Site Projesi", "Residential Complex", "Résidence", "Wohnanlage"],
    ["Konut Projesi", "Residential Building", "Immeuble résidentiel", "Wohngebäude"],
  ];

  const META = {
    title: ["Ümit FETTAHOĞLU | Kurucu Ortak & Yönetim Kurulu Başkanı", "Ümit FETTAHOĞLU | Co-Founder & Chairman of the Board", "Ümit FETTAHOĞLU | Cofondateur & Président du Conseil d’administration", "Ümit FETTAHOĞLU | Mitgründer & Vorsitzender des Verwaltungsrats"],
    description: ["Ümit FETTAHOĞLU — FETSAN GRUP Kurucu Ortağı ve Yönetim Kurulu Başkanı. İnşaat, kentsel dönüşüm ve çok sektörlü yatırımlar.",
      "Ümit FETTAHOĞLU — Co-Founder and Chairman of the Board of FETSAN GRUP. Construction, urban renewal and multi-sector investments.",
      "Ümit FETTAHOĞLU — Cofondateur et Président du Conseil d’administration de FETSAN GRUP. Construction, transformation urbaine et investissements multisectoriels.",
      "Ümit FETTAHOĞLU — Mitgründer und Vorsitzender des Verwaltungsrats von FETSAN GRUP. Bau, Stadterneuerung und branchenübergreifende Investitionen."],
    locale: ["tr_TR", "en_GB", "fr_FR", "de_DE"],
  };

  const pickLang = () => {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem("lang");
      if (LANGS.includes(saved)) return saved;
    } catch (e) { /* depolama kapalı olabilir */ }
    return "tr";
  };

  const lang = pickLang();
  const idx = LANGS.indexOf(lang);
  const toMap = (rows) => new Map(rows.map((r) => [r[0], r[idx]]));
  const textMap = toMap(TEXT);
  const attrMap = toMap(ATTR);

  const t = (s) => (idx === 0 ? s : attrMap.get(s) || textMap.get(s) || s);

  const apply = () => {
    document.documentElement.lang = lang;
    $$lang();
    if (idx === 0) return;

    document.title = META.title[idx];
    document.querySelector('meta[name="description"]')?.setAttribute("content", META.description[idx]);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", META.title[idx]);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", META.description[idx]);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", META.locale[idx]);

    document.body.querySelectorAll("*").forEach((el) => {
      if (!el.isConnected) return;
      if (el.children.length === 0 || el.querySelector(":scope > em, :scope > span, :scope > br, :scope > small")) {
        const key = el.innerHTML.trim();
        const val = textMap.get(key);
        if (val) el.innerHTML = val;
      }
      for (const name of ["aria-label", "alt", "data-chapter-label"]) {
        const v = el.getAttribute(name);
        if (v && attrMap.has(v)) el.setAttribute(name, attrMap.get(v));
      }
    });

    document.querySelectorAll(".pcard__info span").forEach((el) => {
      PARTS.forEach((p) => { el.textContent = el.textContent.replace(p[0], p[idx]); });
    });
  };

  // Dil seçicideki etkin dili işaretle ve seçimi hatırla
  function $$lang() {
    document.querySelectorAll("[data-lang]").forEach((a) => {
      const on = a.dataset.lang === lang;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "true");
      a.addEventListener("click", () => {
        try { localStorage.setItem("lang", a.dataset.lang); } catch (e) { /* yok say */ }
      });
    });
  }

  window.I18N = { lang, t, apply };
})();

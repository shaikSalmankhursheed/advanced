"use client";

import { useState, useMemo, useEffect } from "react";
import { siteConfigEn, siteConfigAr } from "@/config/site";
import { Logo } from "@/components/Logo";
import { 
  Phone, 
  MapPin, 
  Search, 
  CheckCircle, 
  Clock, 
  Layers, 
  Filter,
  MessageSquare,
  Building,
  Info,
  ChevronRight,
  X,
  Shield,
  Truck,
  Settings,
  Wrench,
  SearchIcon,
  ArrowUp,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<typeof siteConfigEn.products[0] | typeof siteConfigAr.products[0] | null>(null);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryParts, setInquiryParts] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Dynamic config based on chosen language
  const site = lang === "ar" ? siteConfigAr : siteConfigEn;
  const t = site.translations;

  // Monitor scroll position to toggle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedProduct(null);
    scrollToTop();
  };

  // Filter products based on category and search query (utilizing the pre-translated active config)
  const filteredProducts = useMemo(() => {
    return site.products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.oemCompatibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, site]);

  // Handle WhatsApp click
  const handleWhatsAppInquiry = (productName: string, partNumber: string) => {
    const text = lang === "ar" 
      ? `مرحباً أدفانس تيك، أود الاستفسار عن الفلتر التالي:\n\n*الفلتر:* ${productName}\n*رقم القطعة:* ${partNumber}`
      : `Hello ADVANCE TECH, I am interested in inquiring about the following filter:\n\n*Filter:* ${productName}\n*Part Number:* ${partNumber}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/966560043676?text=${encodedText}`, "_blank");
  };

  // Handle local inquiry submit
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName) return;

    const text = lang === "ar"
      ? `مرحباً أدفانس تيك، أود طلب تسعيرة بالبيانات التالية:\n\n*الاسم:* ${inquiryName}\n*أرقام القطع:* ${inquiryParts || 'غير محدد'}\n*التفاصيل:* ${inquiryMessage || 'لا يوجد'}`
      : `Hello ADVANCE TECH, I would like to request a quotation with the following details:\n\n*Name:* ${inquiryName}\n*Part Numbers:* ${inquiryParts || 'Not specified'}\n*Details:* ${inquiryMessage || 'None'}`;
      
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/966560043676?text=${encodedText}`, "_blank");

    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryName("");
      setInquiryParts("");
      setInquiryMessage("");
    }, 4000);
  };

  return (
    <div 
      className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans antialiased selection:bg-red-650 selection:text-white"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      
      {/* Top Header Contact Bar */}
      <div className="bg-zinc-950 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-zinc-400 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a href={`tel:${site.contact.phone}`} className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>{site.contact.formattedPhone}</span>
            </a>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>{site.address.city}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-500 text-[10px] px-2 py-0.5 bg-zinc-900 rounded border border-zinc-800">
              {lang === "ar" ? "أكثر من 20 عاماً من الخبرة" : "20+ Years Trusted Experience"}
            </span>
            <span className="text-red-500 text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-650 animate-pulse"></span>
              {lang === "ar" ? "شحن سريع في جميع أنحاء المملكة" : "Fast Shipping across KSA"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation (Light Header matching Website Homepage Concept 1) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Circular logo link */}
          <a href="#home" onClick={handleLogoClick} className="hover:opacity-90 transition-opacity">
            <Logo size={42} />
          </a>
          
          {/* Header Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] font-extrabold tracking-wider uppercase text-zinc-800">
            <a href="#home" className="hover:text-red-650 transition-colors">{t.home}</a>
            <a href="#solutions" className="hover:text-red-650 transition-colors">{t.solutions}</a>
            <a href="#catalog" className="hover:text-red-650 transition-colors text-red-650">{t.catalog}</a>
            <a href="#about" className="hover:text-red-650 transition-colors">{t.about}</a>
            <a href="#contact" className="hover:text-red-650 transition-colors">{t.contact}</a>
          </nav>

          {/* Action buttons (Call Sales & Language Toggle) */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="border-zinc-300 font-extrabold text-xs h-9 hover:bg-zinc-100 rounded flex items-center gap-1.5 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-500" />
              <span>{lang === "en" ? "العربية" : "English"}</span>
            </Button>
            
            <a href={`tel:${site.contact.phone}`} className="hidden sm:inline">
              <Button size="default" className="bg-red-650 hover:bg-red-700 text-white font-extrabold rounded-full px-5 text-xs h-9 tracking-wider uppercase shadow-md shadow-red-600/10 transition-all">
                {t.callSales}
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-16 pb-24 md:py-32 overflow-hidden bg-gradient-to-b from-zinc-50 to-white border-b border-zinc-200">
        {/* Subtle grid background mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-550/10 border border-red-500/20 text-red-650 text-xs font-bold uppercase tracking-wider">
              {t.taglineBadge}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-zinc-950 leading-[1.08]">
              {t.heroTitleLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-650 to-red-500">
                {t.heroTitleLine2}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto font-medium leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <a href="#catalog">
                <Button size="lg" className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-900 text-white font-bold px-8 rounded-md transition-all">
                  {t.exploreProducts}
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-300 text-zinc-700 hover:bg-zinc-50 font-bold">
                  {t.getQuote}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Solutions Section (Concept: "OUR SOLUTIONS" in Solid Black Background) */}
      <section id="solutions" className="py-24 bg-zinc-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <div className="text-red-555 text-red-500 text-xs uppercase font-extrabold tracking-widest">{t.solutionsSubtitle}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t.ourSolutions}</h2>
            <div className="w-12 h-1 bg-red-600 mx-auto mt-4" />
          </div>

          {/* Solution Grid (Cards styled with clean white bg) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 - Automotive */}
            <div className="bg-white text-zinc-955 bg-white text-zinc-950 rounded-xl p-8 space-y-5 shadow-lg relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-650">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-955 text-zinc-950">
                {lang === "ar" ? "فلاتر السيارات" : "Automotive Filters"}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {lang === "ar" 
                  ? "فلاتر الزيت والهواء والوقود المتوافقة مع معايير الشركة المصنعة والمصممة خصيصاً لسيارات تويوتا ونيسان وهيونداي وغيرها." 
                  : "OEM-compliant oil, air, and fuel filters designed specifically for Toyota, Nissan, Hyundai, and European commercial vehicles."}
              </p>
              <a href="#catalog" onClick={() => setSelectedCategory("all")} className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-xs font-bold text-red-650 hover:underline">
                <span>{lang === "ar" ? "تصفح الفلاتر" : "View range"}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
              </a>
            </div>

            {/* Card 2 - Heavy Duty */}
            <div className="bg-white text-zinc-950 rounded-xl p-8 space-y-5 shadow-lg relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-650">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-955 text-zinc-955 text-zinc-950">
                {lang === "ar" ? "المعدات الثقيلة" : "Heavy Duty Machinery"}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {lang === "ar" 
                  ? "أنظمة تصفية متينة ومحسنة للحفارات الثقيلة والشاحنات وأنظمة المولدات ومعدات كاتربيلر، جي سي بي، أو فولفو." 
                  : "Rugged filtration systems optimized for heavy excavators, trucks, diesel generator systems, and CAT, JCB, or Volvo equipment."}
              </p>
              <a href="#catalog" onClick={() => setSelectedCategory("hydraulic")} className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-xs font-bold text-red-650 hover:underline">
                <span>{lang === "ar" ? "تصفح الفلاتر" : "View range"}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
              </a>
            </div>

            {/* Card 3 - Cabin Air */}
            <div className="bg-white text-zinc-955 bg-white text-zinc-950 rounded-xl p-8 space-y-5 shadow-lg relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-650">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-955 text-zinc-950">
                {lang === "ar" ? "تنقية هواء الكابينة" : "Cabin Air Purification"}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {lang === "ar" 
                  ? "فلاتر الكربون النشط والإلكتروستاتيكية التي تحجز جزيئات الرمل والغبار والروائح الكريهة داخل نظام تكييف الهواء." 
                  : "Activated carbon and electrostatic filters that trap micro-fine sand particles, dust, and outdoor odors inside cabin AC systems."}
              </p>
              <a href="#catalog" onClick={() => setSelectedCategory("cabin")} className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-xs font-bold text-red-650 hover:underline">
                <span>{lang === "ar" ? "تصفح الفلاتر" : "View range"}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
              </a>
            </div>

            {/* Card 4 - Fleet supply */}
            <div className="bg-white text-zinc-955 bg-white text-zinc-950 rounded-xl p-8 space-y-5 shadow-lg relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-650">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-955 text-zinc-950">
                {lang === "ar" ? "إمداد أساطيل النقل" : "Fleet Supply Logistics"}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {lang === "ar" 
                  ? "كميات الجملة وحزم الاستبدال المجدولة لشركات الشحن وأساطيل سيارات الأجرة وموزعي قطع الغيار." 
                  : "Wholesale volumes and scheduled replacement packages for shipping companies, taxi fleets, and parts retailers."}
              </p>
              <a href="#contact" className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-xs font-bold text-red-650 hover:underline">
                <span>{lang === "ar" ? "تواصل معنا" : "View range"}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
              </a>
            </div>

            {/* Card 5 - Custom Sourcing */}
            <div className="bg-white text-zinc-955 bg-white text-zinc-950 rounded-xl p-8 space-y-5 shadow-lg relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-650">
                <SearchIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-955 text-zinc-955 text-zinc-950">
                {lang === "ar" ? "التوريد المخصص العالمي" : "Global Custom Sourcing"}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {lang === "ar" 
                  ? "هل تحتاج لفلتر صناعي نادر أو متوقف إنتاجه؟ أرسل لنا المواصفات وسيقوم مكتب التوريد لدينا بتحديده." 
                  : "Need a rare, obsolete, or highly specialized industrial filter? Send us specifications and our supply desk will locate it."}
              </p>
              <a href="#contact" className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-xs font-bold text-red-650 hover:underline">
                <span>{lang === "ar" ? "طلب تصفح" : "View range"}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
              </a>
            </div>

            {/* Card 6 - Quality */}
            <div className="bg-white text-zinc-955 bg-white text-zinc-950 rounded-xl p-8 space-y-5 shadow-lg relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-650">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-955 text-zinc-955 text-zinc-950">
                {lang === "ar" ? "شهادة الجودة المعتمدة" : "Quality Certification"}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {lang === "ar" 
                  ? "يمر كل فلتر نقوم بتوريده بفحوصات متانة هيكلية صارمة، تلبي معايير الجودة العالمية ISO." 
                  : "Every filter supplied passes structural durability inspections, meeting ISO standards for high-pressure durability."}
              </p>
              <a href="#about" className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-xs font-bold text-red-650 hover:underline">
                <span>{lang === "ar" ? "اقرأ المزيد" : "View details"}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
              </a>
            </div>

          </div>

          <div className="mt-16 text-center">
            <p className="text-zinc-500 text-sm font-semibold max-w-xl mx-auto">
              {lang === "ar" 
                ? "هل تبحث عن مقاس فلتر معين أو طلبات جملة مخصصة؟" 
                : "Looking for a specific filter size or customized B2B bulk orders?"}
              <a href="#contact" className="text-red-500 hover:underline ml-1">
                {lang === "ar" ? "تواصل مع مكتب المبيعات مباشرة." : "Connect with our sales office."}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Product Directory Section */}
      <section id="catalog" className="py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 min-h-[60vh]">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-red-650 text-xs font-bold uppercase tracking-widest">{t.inventoryCatalog}</span>
          <h2 className="text-4xl font-black text-zinc-950 tracking-tight">
            {t.filterDirectory}
          </h2>
          <p className="text-zinc-500 text-sm">
            {lang === "ar"
              ? "ابحث في مخزوننا النشط من فلاتر الهواء والزيت والوقود والمكيف. قم بالتصفية حسب الفئة أو رقم القطعة أو توافق السيارة."
              : "Search our active stock of air, oil, fuel, and cabin filters. Filter by category, serial part number, or vehicle model compatibility."}
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-xl space-y-6 mb-12 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className={`absolute ${lang === "ar" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400`} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${lang === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 bg-white border border-zinc-300 rounded-lg text-zinc-850 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-655 focus:ring-red-650 focus:border-transparent transition-all`}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className={`absolute ${lang === "ar" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 text-zinc-450 hover:text-zinc-650 cursor-pointer`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Total Results Counter */}
            <div className="text-sm font-semibold text-zinc-600 bg-white px-4 py-3.5 rounded-lg border border-zinc-200 flex items-center justify-center gap-2 shrink-0">
              <Layers className="w-4 h-4 text-red-600" />
              <span>{t.foundText} <strong className="text-red-650">{filteredProducts.length}</strong> {t.filtersText}</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="border-t border-zinc-200 pt-4">
            <div className="flex flex-wrap gap-2.5">
              {site.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`cursor-pointer px-4.5 py-2.5 rounded-lg text-sm font-bold transition-all duration-150 ${
                    selectedCategory === cat.id
                      ? "bg-red-650 text-white font-extrabold shadow-sm"
                      : "bg-white hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 border border-zinc-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-zinc-50 rounded-xl border border-dashed border-zinc-300">
            <Filter className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-zinc-900">{t.noFilters}</h3>
            <p className="text-zinc-500 max-w-sm mx-auto mt-2 text-sm leading-relaxed">
              {t.noFiltersDesc}
            </p>
            <Button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} 
              className="mt-6 bg-zinc-950 hover:bg-zinc-900 text-white font-bold"
            >
              {t.resetFilters}
            </Button>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className={`bg-white border border-zinc-200 hover:border-red-600/30 rounded-xl p-6 flex-col justify-between hover:shadow-xl hover:shadow-red-650/5 transition-all group duration-300 ${!isMobileExpanded && index >= 1 ? 'hidden md:flex' : 'flex'}`}
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold bg-zinc-100 text-zinc-700 rounded border border-zinc-200">
                    {site.categories.find(c => c.id === product.category)?.name}
                  </span>
                  {product.inStock ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {t.inStock}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {t.onRequest}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-zinc-955 text-zinc-950 group-hover:text-red-655 group-hover:text-red-650 transition-colors duration-150 line-clamp-1">
                  {product.name}
                </h3>
                
                <div className="text-xs font-mono text-zinc-400 mt-1">
                  {t.partId}: {product.partNumber}
                </div>

                <p className="text-sm text-zinc-500 mt-4 leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Compatibility Info */}
                <div className="bg-zinc-50 rounded-lg p-3.5 border border-zinc-150 mt-5 space-y-1">
                  <div className="text-[10px] text-zinc-400 font-bold">{t.oemCompatibility}</div>
                  <div className="text-xs font-semibold text-zinc-700 line-clamp-1">
                    {product.oemCompatibility}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6 border-t border-zinc-100 pt-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setSelectedProduct(product)}
                  className="border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold"
                >
                  <Info className="w-3.5 h-3.5 mr-1.5 ml-1.5" />
                  {t.specsDetails}
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleWhatsAppInquiry(product.name, product.partNumber)}
                  className="bg-red-655 bg-red-650 hover:bg-red-700 text-white font-bold text-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5 ml-1.5" />
                  {t.whatsapp}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View More Toggle */}
        {filteredProducts.length > 1 && (
          <div className="mt-8 text-center md:hidden">
            <Button 
              onClick={() => setIsMobileExpanded(!isMobileExpanded)}
              variant="outline" 
              className="w-full font-bold border-zinc-300 text-zinc-700 h-12 rounded-lg hover:bg-zinc-50"
            >
              {isMobileExpanded 
                ? (lang === 'ar' ? 'عرض أقل' : 'Show less') 
                : (lang === 'ar' ? `عرض كل ${filteredProducts.length} الفلاتر` : `View all ${filteredProducts.length} filters`)
              }
            </Button>
          </div>
        )}
      </section>

      {/* About/Team Section (Layout matching Website About/Team Page Concept) */}
      <section id="about" className="py-24 bg-zinc-50 border-t border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* About Profile Graphic & Text */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <span className="text-red-650 text-xs font-bold uppercase tracking-widest">{lang === "ar" ? "ملف الشركة" : "ABOUT US"}</span>
              <h2 className="text-4xl font-extrabold text-zinc-950 tracking-tight">
                {t.whoWeAre}
              </h2>
              
              {/* Profile card layout with red circular border matching Concept Image */}
              <div className="flex flex-col sm:flex-row items-center gap-5 bg-white p-5 rounded-xl border border-zinc-200 shadow-sm text-start">
                <div className="w-20 h-20 rounded-full border-2 border-red-650 flex items-center justify-center shrink-0 bg-zinc-50 relative overflow-hidden font-black text-2xl text-red-650">
                  AT
                </div>
                <div>
                  <h4 className="font-extrabold text-zinc-900 text-base">{site.name}</h4>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">{t.tradingImport}</p>
                  <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                    {t.licensedMerchant}
                  </p>
                </div>
              </div>

              <p className="text-zinc-650 text-sm leading-relaxed">
                {t.aboutDesc}
              </p>
            </div>

            {/* Why Choose Us Grid */}
            <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-xl p-8 space-y-8 relative shadow-sm">
              <h3 className="text-2xl font-bold tracking-tight text-zinc-950">{t.whyPartner}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <span className="text-lg font-bold text-red-655 text-red-655 text-red-650 block">{t.sourcingTitle}</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {t.sourcingDesc}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-lg font-bold text-red-650 block">{t.verificationTitle}</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {t.verificationDesc}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-lg font-bold text-red-650 block">{t.fleetsTitle}</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {t.fleetsDesc}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-lg font-bold text-red-655 text-red-650 block">{t.inquiryTitle}</span>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {t.inquiryDesc}
                  </p>
                </div>
              </div>

              {/* Call Out Info */}
              <div className="bg-zinc-950 text-white rounded-lg p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">{t.directSalesLine}</div>
                  <div className="text-lg font-black text-white mt-0.5">{site.contact.formattedPhone}</div>
                </div>
                <a href={`tel:${site.contact.phone}`}>
                  <Button className="bg-red-650 hover:bg-red-700 text-white font-bold rounded">
                    {t.callImmediately}
                  </Button>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Address Details Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-red-655 text-red-650 text-xs font-bold uppercase tracking-widest">{t.officeRegistry}</span>
              <h2 className="text-4xl font-extrabold text-zinc-950 tracking-tight mt-1">{t.contactInfo}</h2>
              <p className="text-zinc-500 text-sm mt-3 leading-relaxed">
                {lang === "ar"
                  ? "تواصل مع مندوبينا المحليين للاستفسارات عن البيع بالجملة أو تحديثات الخدمات اللوجستية أو قوائم التصفية المخصصة."
                  : "Connect with our local representatives for wholesale inquiries, logistics updates, or customized filtration sourcing lists."}
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200 text-red-650">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.phoneLabel}</div>
                  <a href={`tel:${site.contact.phone}`} className="text-base font-bold text-zinc-900 hover:text-red-650 transition-colors">
                    {site.contact.formattedPhone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200 text-red-650">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.addressLabel}</div>
                  <div className="text-sm font-semibold text-zinc-800 mt-1 whitespace-pre-line leading-relaxed">
                    {site.address.fullAddress}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200 text-red-650">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.tradingHours}</div>
                  <div className="text-sm font-semibold text-zinc-700 mt-1 whitespace-pre-line leading-relaxed">
                    {t.hoursDetails}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-xl h-full flex flex-col">
              <h3 className="text-xl font-bold text-zinc-950 mb-6">{t.requestQuote}</h3>
              
              <form onSubmit={handleInquirySubmit} className="space-y-4 flex flex-col flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">{t.yourName}</label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder={lang === "ar" ? "مثال: فهد العتيبي" : "e.g., Fahad Al-Otaibi"}
                      className="w-full px-4 py-3 bg-white border border-zinc-300 rounded text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">{lang === "ar" ? "أرقام قطع الفلاتر" : "Filter Part Numbers"}</label>
                    <input
                      type="text"
                      value={inquiryParts}
                      onChange={(e) => setInquiryParts(e.target.value)}
                      placeholder={t.partNumbersPlaceholder}
                      className="w-full px-4 py-3 bg-white border border-zinc-300 rounded text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col flex-1 min-h-[200px]">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">{t.specificationsLabel}</label>
                  <textarea
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder={lang === "ar" 
                      ? "قدم تفاصيل حول المقاس أو الأبعاد أو الكمية المطلوبة. يمكنك أيضاً تحديد نوع السيارة هنا..."
                      : "Provide details about size, dimensions, or quantity. You can also specify the vehicle compatibility here..."}
                    className="w-full flex-1 px-4 py-3 bg-white border border-zinc-300 rounded text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-650 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  disabled={inquirySubmitted}
                  className="w-full bg-red-650 hover:bg-red-700 text-white font-bold py-3.5 shadow-md shadow-red-600/10"
                >
                  {t.submitRequest}
                </Button>

                {inquirySubmitted && (
                  <p className="text-emerald-600 text-xs text-center font-bold mt-2">
                    {t.thankYouMsg}
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>

        {/* Map Embed (Full Width) */}
        <div className="mt-16 rounded-xl overflow-hidden border border-zinc-200 shadow-sm h-[400px] w-full bg-zinc-50">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4948.937344223398!2d46.762354599999995!3d24.6339477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f070ac344b007%3A0x9d25acc17cb995ba!2z2LTYsdmD2Kkg2KfZhNiu2YrYp9ixINin2YTZhdiq2YLYr9mFINmE2YTYqtis2KfYsdip!5e1!3m2!1sen!2sin!4v1782052442741!5m2!1sen!2sin"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-500 py-16 px-4 sm:px-6 lg:px-8 text-xs border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <a href="#home" onClick={handleLogoClick} className="hover:opacity-90 transition-opacity">
            <Logo size={42} showText={true} textColor="light" />
          </a>
          
          <div className="flex gap-6 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
            <a href="#home" className="hover:text-red-500 transition-colors">{t.home}</a>
            <a href="#solutions" className="hover:text-red-500 transition-colors">{t.solutions}</a>
            <a href="#catalog" className="hover:text-red-500 transition-colors">{t.catalog}</a>
            <a href="#about" className="hover:text-red-500 transition-colors">{t.about}</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">{t.contact}</a>
          </div>

          <div className="text-zinc-650 text-center md:text-right leading-relaxed">
            &copy; {new Date().getFullYear()} {t.footerText}
          </div>
        </div>
      </footer>

      {/* Dynamic Product Specification Modal (Dialog) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white border border-zinc-200 w-full max-w-lg rounded-xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col" dir={lang === "ar" ? "rtl" : "ltr"}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-150 flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-zinc-100 text-zinc-700 rounded border border-zinc-200">
                  {site.categories.find(c => c.id === selectedProduct.category)?.name}
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-2">{selectedProduct.name}</h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">{t.partId}: {selectedProduct.partNumber}</p>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-1.5">{t.descTitle}</h4>
                <p className="text-zinc-650 leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-1.5">{t.oemCompatibility}</h4>
                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 font-semibold text-zinc-700">
                  {selectedProduct.oemCompatibility}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2.5">{t.techSpecs}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                    <div key={key} className="bg-zinc-50/50 border border-zinc-150 p-3 rounded">
                      <span className="text-[9px] uppercase font-bold text-zinc-400 block capitalize">
                        {key}
                      </span>
                      <span className="text-xs font-bold text-zinc-700">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-150 bg-zinc-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">{t.availability}:</span>
                {selectedProduct.inStock ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {t.inStock}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {t.b2bRequest}
                  </span>
                )}
              </div>

              <div className="flex gap-2.5 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedProduct(null)} 
                  className="w-full sm:w-auto border-zinc-200 hover:bg-zinc-50 text-zinc-700"
                >
                  {t.close}
                </Button>
                <Button 
                  onClick={() => {
                    handleWhatsAppInquiry(selectedProduct.name, selectedProduct.partNumber);
                    setSelectedProduct(null);
                  }}
                  className="w-full sm:w-auto bg-red-650 hover:bg-red-700 text-white font-bold"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t.whatsappInquiry}
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 ${lang === "ar" ? "left-6" : "right-6"} z-50 p-3 bg-red-650 hover:bg-red-700 text-white rounded-full shadow-lg shadow-red-600/30 hover:scale-110 active:scale-95 transition-all duration-200 border border-red-500/10 cursor-pointer`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}

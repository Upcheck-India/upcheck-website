import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type LanguageCode = "en" | "ta" | "te" | "hi" | "bn";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
];

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.solutions": "Solutions",
    "nav.resources": "Resources",
    "nav.participate": "Participate",
    "nav.survey": "Surveys",
    "nav.events": "Events",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.getApp": "Get App",
    "nav.download": "Download",
    "nav.ourStory": "Our Story",
    "nav.values": "Our Values",
    "nav.tech": "Technology",

    // Common
    "common.learnMore": "Learn More",
    "common.readMore": "Read More",
    "common.startSurvey": "Start Survey",
    "common.getStarted": "Get Started",
    "common.searchPlaceholder": "Search Posts...",
    "common.all": "All",
    "common.postsPerPage": "Posts per page:",
    "common.showing": "Showing",
    "common.to": "to",
    "common.of": "of",
    "common.posts": "posts",
    "common.prev": "Prev",
    "common.next": "Next",
    "common.backToResources": "Back to Resources",
    "common.resetFilters": "Reset Filters",
    "common.noArticlesFound": "No articles found matching your search.",
    "common.loading": "Loading...",
    "common.readTime": "3 min read",

    // Resources
    "resources.title": "Resources",
    "resources.subtitle": "Explore articles, guides, and tips to enhance your shrimp farming.",

    // Products
    "products.heroEyebrow": "COMPLETE AQUACULTURE PLATFORM",
    "products.heroTitle": "Everything you need to run a smarter farm",
    "products.heroSubtitle": "UpCheck brings together solar-powered IoT hardware, intelligent mobile analytics, and actionable farm insights in a single unified platform.",
    "products.hardware": "Hardware",
    "products.software": "Software",
    "products.intelligence": "Intelligence",
    "products.traceability": "Traceability",
    "products.whyChooseTitle": "Why Choose Upcheck?",
    "products.whyChooseSubtitle": "Discover how UpCheck transforms every pond into a connected, intelligent aquaculture ecosystem.",

    // Footer
    "footer.tagline": "Smart Technology. Smarter Shrimp Farming.",
    "footer.rights": "All rights reserved.",
    "footer.quickLinks": "Quick Links",
    "footer.solutions": "Solutions",
    "footer.contact": "Contact Us",
  },
  ta: {
    // Nav
    "nav.home": "முகப்பு",
    "nav.products": "தயாரிப்புகள்",
    "nav.solutions": "தீர்வுகள்",
    "nav.resources": "வளங்கள்",
    "nav.participate": "பங்கேற்க",
    "nav.survey": "கருத்துக் கணிப்பு",
    "nav.events": "நிகழ்வுகள்",
    "nav.about": "எங்களை பற்றி",
    "nav.contact": "தொடர்பு கொள்ள",
    "nav.getApp": "செயலி பெற",
    "nav.download": "பதிவிறக்கம்",
    "nav.ourStory": "எங்கள் கதை",
    "nav.values": "எங்கள் மதிப்புகள்",
    "nav.tech": "தொழில்நுட்பம்",

    // Common
    "common.learnMore": "மேலும் அறிய",
    "common.readMore": "மேலும் படிக்க",
    "common.startSurvey": "கருத்துக்கணிப்பைத் தொடங்கு",
    "common.getStarted": "தொடங்குங்கள்",
    "common.searchPlaceholder": "பதிவுகளைத் தேடுங்கள்...",
    "common.all": "அனைத்தும்",
    "common.postsPerPage": "பக்கத்திற்கு பதிவுகள்:",
    "common.showing": "காட்டப்படுகிறது",
    "common.to": "முதல்",
    "common.of": "மொத்தம்",
    "common.posts": "பதிவுகள்",
    "common.prev": "முந்தைய",
    "common.next": "அடுத்தது",
    "common.backToResources": "வளங்களுக்குத் திரும்பு",
    "common.resetFilters": "வடிகட்டிகளை மீட்டமை",
    "common.noArticlesFound": "தேடலுக்குரிய கட்டுரைகள் எதுவும் கிடைக்கவில்லை.",
    "common.loading": "ஏற்றுகிறது...",
    "common.readTime": "3 நிமிடம் வாசிப்பு",

    // Resources
    "resources.title": "வளங்கள்",
    "resources.subtitle": "உங்கள் இறால் வளர்ப்பை மேம்படுத்த கட்டுரைகள், வழிகாட்டிகள் மற்றும் குறிப்புகளை ஆராயுங்கள்.",

    // Products
    "products.heroEyebrow": "முழுமையான மீன்வளர்ப்பு தளம்",
    "products.heroTitle": "ஒரு சிறந்த பண்ணையை நடத்த உங்களுக்கு தேவையான அனைத்தும்",
    "products.heroSubtitle": "அப்செக் சூரிய சக்தியால் இயங்கும் ஐஓடி வன்பொருள், நுண்ணறிவு மொபைல் பகுப்பாய்வு மற்றும் பண்ணை நுண்ணறிவுகளை ஒரே தளத்தில் ஒருங்கிணைக்கிறது.",
    "products.hardware": "வன்பொருள்",
    "products.software": "மென்பொருள்",
    "products.intelligence": "நுண்ணறிவு",
    "products.traceability": "கண்காணிப்பு",
    "products.whyChooseTitle": "அப்செக்கை ஏன் தேர்வு செய்ய வேண்டும்?",
    "products.whyChooseSubtitle": "அப்செக் எவ்வாறு ஒவ்வொரு குளத்தையும் இணைக்கப்பட்ட, அறிவார்ந்த பண்ணையாக மாற்றுகிறது என்பதைக் கண்டறியவும்.",

    // Footer
    "footer.tagline": "ஸ்மார்ட் தொழில்நுட்பம். சிறந்த இறால் வளர்ப்பு.",
    "footer.rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "footer.quickLinks": "விரைவு இணைப்புகள்",
    "footer.solutions": "தீர்வுகள்",
    "footer.contact": "எங்களைத் தொடர்பு கொள்ள",
  },
  te: {
    // Nav
    "nav.home": "హోమ్",
    "nav.products": "ఉత్పత్తులు",
    "nav.solutions": "పరిష్కారాలు",
    "nav.resources": "వనరులు",
    "nav.participate": "పాల్గొనండి",
    "nav.survey": "సర్వేలు",
    "nav.events": "ఈవెంట్లు",
    "nav.about": "మా గురించి",
    "nav.contact": "సంప్రదించండి",
    "nav.getApp": "యాప్ పొందండి",
    "nav.download": "డౌన్‌లోడ్",
    "nav.ourStory": "మా కథ",
    "nav.values": "మా విలువలు",
    "nav.tech": "సాంకేతికత",

    // Common
    "common.learnMore": "మరింత తెలుసుకోండి",
    "common.readMore": "మరింత చదవండి",
    "common.startSurvey": "సర్వే ప్రారంభించండి",
    "common.getStarted": "ప్రారంభించండి",
    "common.searchPlaceholder": "పోస్ట్‌లను శోధించండి...",
    "common.all": "అన్నీ",
    "common.postsPerPage": "పేజీకి పోస్ట్‌లు:",
    "common.showing": "చూపుతోంది",
    "common.to": "నుండి",
    "common.of": "మొత్తం",
    "common.posts": "పోస్ట్‌లు",
    "common.prev": "మునుపటి",
    "common.next": "తరువాతి",
    "common.backToResources": "వనరులకు తిరిగి వెళ్లండి",
    "common.resetFilters": "ఫిల్టర్‌లను రీసెట్ చేయండి",
    "common.noArticlesFound": "మీ శోధనకు సంబంధించిన కథనాలు ఏవీ కనుగొనబడలేదు.",
    "common.loading": "లోడ్ అవుతోంది...",
    "common.readTime": "3 నిమిషాల చదువు",

    // Resources
    "resources.title": "వనరులు",
    "resources.subtitle": "మీ రొయ్యల సాగును మెరుగుపరచడానికి వ్యాసాలు, మార్గదర్శకాలు మరియు చిట్కాలను అన్వేషించండి.",

    // Products
    "products.heroEyebrow": "పూర్తి ఆక్వాకల్చర్ ప్లాట్‌ఫారమ్",
    "products.heroTitle": "తెలివైన ఫామ్‌ను నడపడానికి మీకు అవసరమైనవన్నీ",
    "products.heroSubtitle": "అప్‌చెక్ సౌర శక్తితో పనిచేసే ఐఓటి హార్డ్‌వేర్, తెలివైన మొబైల్ విశ్లేషణలు మరియు ఉపయోగకరమైన ఫామ్ సమాచారాన్ని ఒకే వేదికపైకి తెస్తుంది.",
    "products.hardware": "హార్డ్‌వేర్",
    "products.software": "సాఫ్ట్‌వేర్",
    "products.intelligence": "ఇంటెలిజెన్స్",
    "products.traceability": "ట్రేసబిలిటీ",
    "products.whyChooseTitle": "అప్‌చెక్‌ను ఎందుకు ఎంచుకోవాలి?",
    "products.whyChooseSubtitle": "అప్‌చెక్ ప్రతి చెరువును అనుసంధానించబడిన, తెలివైన ఆక్వాకల్చర్ పర్యావరణ వ్యవస్థగా ఎలా మారుస్తుందో తెలుసుకోండి.",

    // Footer
    "footer.tagline": "స్మార్ట్ టెక్నాలజీ. తెలివైన రొయ్యల సాగు.",
    "footer.rights": "అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.",
    "footer.quickLinks": "త్వరిత లింకులు",
    "footer.solutions": "పరిష్కారాలు",
    "footer.contact": "మమ్మల్ని సంప్రదించండి",
  },
  hi: {
    // Nav
    "nav.home": "होम",
    "nav.products": "उत्पाद",
    "nav.solutions": "समाधान",
    "nav.resources": "संसाधन",
    "nav.participate": "भाग लें",
    "nav.survey": "सर्वेक्षण",
    "nav.events": "कार्यक्रम",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क करें",
    "nav.getApp": "ऐप डाउनलोड करें",
    "nav.download": "डाउनलोड",
    "nav.ourStory": "हमारी कहानी",
    "nav.values": "हमारे मूल्य",
    "nav.tech": "प्रौद्योगिकी",

    // Common
    "common.learnMore": "और जानें",
    "common.readMore": "और पढ़ें",
    "common.startSurvey": "सर्वेक्षण शुरू करें",
    "common.getStarted": "शुरू करें",
    "common.searchPlaceholder": "पोस्ट खोजें...",
    "common.all": "सभी",
    "common.postsPerPage": "प्रति पृष्ठ पोस्ट:",
    "common.showing": "दिखाया जा रहा है",
    "common.to": "से",
    "common.of": "का",
    "common.posts": "पोस्ट",
    "common.prev": "पिछला",
    "common.next": "अगला",
    "common.backToResources": "संसाधनों पर वापस जाएं",
    "common.resetFilters": "फ़िल्टर रीसेट करें",
    "common.noArticlesFound": "आपकी खोज से मेल खाने वाले कोई लेख नहीं मिले।",
    "common.loading": "लोड हो रहा है...",
    "common.readTime": "3 मिनट का पठन",

    // Resources
    "resources.title": "संसाधन",
    "resources.subtitle": "अपने झींगा पालन को बेहतर बनाने के लिए लेख, गाइड और टिप्स देखें।",

    // Products
    "products.heroEyebrow": "संपूर्ण जलीय कृषि मंच",
    "products.heroTitle": "स्मार्ट फार्म चलाने के लिए आपको जो कुछ भी चाहिए",
    "products.heroSubtitle": "अपचेक सौर ऊर्जा संचालित आईओटी हार्डवेयर, बुद्धिमान मोबाइल एनालिटिक्स और सटीक फार्म अंतर्दृष्टि को एक मंच पर लाता है।",
    "products.hardware": "हार्डवेयर",
    "products.software": "सॉफ्टवेयर",
    "products.intelligence": "इंटेलिजेंस",
    "products.traceability": "ट्रेसेबिलिटी",
    "products.whyChooseTitle": "अपचेक क्यों चुनें?",
    "products.whyChooseSubtitle": "जानें कि अपचेक कैसे हर तालाब को एक जुड़े हुए, बुद्धिमान जलीय कृषि पारिस्थितिकी तंत्र में बदलता है।",

    // Footer
    "footer.tagline": "स्मार्ट तकनीक। स्मार्ट झींगा पालन।",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.solutions": "समाधान",
    "footer.contact": "संपर्क करें",
  },
  bn: {
    // Nav
    "nav.home": "হোম",
    "nav.products": "পণ্যসমূহ",
    "nav.solutions": "সমাধান",
    "nav.resources": "সম্পদ",
    "nav.participate": "অংশগ্রহণ করুন",
    "nav.survey": "জরিপ",
    "nav.events": "ইভেন্ট",
    "nav.about": "আমাদের সম্পর্কে",
    "nav.contact": "যোগাযোগ",
    "nav.getApp": "অ্যাপ ডাউনলোড",
    "nav.download": "ডাউনলোড",
    "nav.ourStory": "আমাদের গল্প",
    "nav.values": "আমাদের মূল্যবোধ",
    "nav.tech": "প্রযুক্তি",

    // Common
    "common.learnMore": "আরও জানুন",
    "common.readMore": "আরও পড়ুন",
    "common.startSurvey": "জরিপ শুরু করুন",
    "common.getStarted": "শুরু করুন",
    "common.searchPlaceholder": "পোস্ট খুঁজুন...",
    "common.all": "সব",
    "common.postsPerPage": "প্রতি পৃষ্ঠায় পোস্ট:",
    "common.showing": "দেখানো হচ্ছে",
    "common.to": "থেকে",
    "common.of": "এর",
    "common.posts": "পোস্ট",
    "common.prev": "পূর্ববর্তী",
    "common.next": "পরবর্তী",
    "common.backToResources": "সম্পদে ফিরে যান",
    "common.resetFilters": "ফিল্টার রিসেট করুন",
    "common.noArticlesFound": "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নিবন্ধ পাওয়া যায়নি।",
    "common.loading": "লোড হচ্ছে...",
    "common.readTime": "৩ মিনিট পঠন",

    // Resources
    "resources.title": "সম্পদ",
    "resources.subtitle": "আপনার চিংড়ি চাষ উন্নত করতে নিবন্ধ, নির্দেশিকা এবং টিপস অন্বেষণ করুন।",

    // Products
    "products.heroEyebrow": "সম্পূর্ণ জলজ চাষ প্ল্যাটফর্ম",
    "products.heroTitle": "স্মার্ট খামার পরিচালনার জন্য আপনার প্রয়োজনীয় সবকিছু",
    "products.heroSubtitle": "আপচেক সৌর চালিত আইওটি হার্ডওয়্যার, বুদ্ধিমান মোবাইল অ্যানালিটিক্স এবং কার্যকর খামার তথ্য একীভূত প্ল্যাটফর্মে একত্রিত করে।",
    "products.hardware": "হার্ডওয়্যার",
    "products.software": "সফটওয়্যার",
    "products.intelligence": "বুদ্ধিমত্তা",
    "products.traceability": "ট্রেসেবিলিটি",
    "products.whyChooseTitle": "কেন আপচেক বেছে নেবেন?",
    "products.whyChooseSubtitle": "আবিষ্কার করুন কীভাবে আপচেক প্রতিটি পুকুরকে একটি সংযুক্ত এবং বুদ্ধিমান খামারে রূপান্তর করে।",

    // Footer
    "footer.tagline": "স্মার্ট প্রযুক্তি। স্মার্ট চিংড়ি চাষ।",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত।",
    "footer.quickLinks": "দ্রুত লিঙ্ক",
    "footer.solutions": "সমাধান",
    "footer.contact": "যোগাযোগ করুন",
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, defaultText?: string) => string;
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("upcheck_language") as LanguageCode;
      if (saved && ["en", "ta", "te", "hi", "bn"].includes(saved)) {
        return saved;
      }
    }
    return "en";
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("upcheck_language", lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string, defaultText?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const enDict = translations.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return defaultText || key;
  };

  const currentLanguageOption =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLanguageOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

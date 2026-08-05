export type Language = 'en' | 'ar';

export interface TranslationContent {
  // Navbar
  nav: {
    home: string;
    about: string;
    services: string;
    doctors: string;
    offers: string;
    contact: string;
    bookAppointment: string;
  };
  
  // Hero
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    secondaryCta: string;
  };
  
  // Services
  services: {
    title: string;
    subtitle: string;
    dermatology: {
      title: string;
      description: string;
    };
    nutrition: {
      title: string;
      description: string;
    };
    hair: {
      title: string;
      description: string;
    };
    learnMore: string;
  };
  
  // Technologies
  technologies: {
    title: string;
    subtitle: string;
  };
  
  // Why Choose Us
  whyUs: {
    title: string;
    subtitle: string;
    doctorsCare: {
      title: string;
      description: string;
    };
    technology: {
      title: string;
      description: string;
    };
    customized: {
      title: string;
      description: string;
    };
    results: {
      title: string;
      description: string;
    };
  };
  
  // Footer
  footer: {
    about: string;
    aboutText: string;
    quickLinks: string;
    branches: string;
    damietta: string;
    newDamietta: string;
    workingHours: string;
    hours: string;
    copyright: string;
    followUs: string;
  };
  
  // Contact
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
  };
  
  // About
  about: {
    title: string;
    vision: string;
    visionText: string;
    mission: string;
    missionText: string;
    founderTitle: string;
    founderName: string;
    founderBio: string;
  };
  
  // Common
  common: {
    readMore: string;
    viewAll: string;
    callNow: string;
    directions: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      doctors: 'Our Doctors',
      offers: 'Offers',
      contact: 'Contact Us',
      bookAppointment: 'Book Appointment',
    },
    hero: {
      title: 'Integrated Beauty & Wellness',
      subtitle: 'SF Touch Clinic',
      description: 'Where advanced medical expertise meets luxury care. Experience personalized treatments by qualified doctors using the latest technologies in dermatology, laser, and nutrition.',
      cta: 'Book Your Consultation',
      secondaryCta: 'Explore Services',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive care tailored to your unique needs',
      dermatology: {
        title: 'Dermatology & Laser',
        description: 'Advanced skin treatments, laser procedures, and aesthetic injectables performed by expert dermatologists.',
      },
      nutrition: {
        title: 'Clinical Nutrition & Body Contouring',
        description: 'Personalized diet plans,  and advanced body sculpting devices for your wellness journey.',
      },
      hair: {
        title: 'Hair Restoration',
        description: 'State-of-the-art hair transplant procedures and treatments for natural, lasting results.',
      },
      learnMore: 'Learn More',
    },
    technologies: {
      title: 'Advanced Technologies',
      subtitle: 'We use the latest FDA-approved devices for optimal results',
    },
    whyUs: {
      title: 'Why Choose SF Touch',
      subtitle: 'Excellence in every detail',
      doctorsCare: {
        title: 'Perfect Doctors ',
        description: 'Unlike other clinics, all treatments are performed directly by our qualified doctors, not assistants.',
      },
      technology: {
        title: 'Latest Technology',
        description: 'We invest in cutting-edge equipment including Deka Again, Motus Pro,  and Onda .',
      },
      customized: {
        title: 'Customized Treatment Plans',
        description: 'Every patient receives a personalized treatment plan designed for their specific needs and goals.',
      },
      results: {
        title: 'Proven Results',
        description: 'Our track record of successful treatments and satisfied patients speaks for itself.',
      },
    },
    footer: {
      about: 'About SF Touch',
      aboutText: 'A premium dermatology, laser, and nutrition center dedicated to enhancing your natural beauty with advanced medical care.',
      quickLinks: 'Quick Links',
      branches: 'Our Branches',
      damietta: 'Damietta - Safwa Mall',
      newDamietta: 'New Damietta - Central Zone',
      workingHours: 'Working Hours',
      hours: 'Daily: 1 PM - 1 AM',
      copyright: '© 2026 Tungsten Media Agency. All rights reserved.',
      followUs: 'Follow Us',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'We\'re here to answer your questions',
      name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone Number',
      message: 'Your Message',
      send: 'Send Message',
    },
    about: {
      title: 'About SF Touch Clinic',
      vision: 'Our Vision',
      visionText: 'To be the leading destination for integrated beauty and wellness in Egypt, setting new standards in medical aesthetics.',
      mission: 'Our Mission',
      missionText: 'To provide personalized, results-driven treatments using the latest technologies, delivered with care and expertise by qualified medical professionals.',
      founderTitle: 'Founder & Medical Director',
      founderName: 'Dr. Khaled Abo Youssef',
      founderBio: 'With years of experience in dermatology and aesthetic medicine, Dr. Khaled established SF Touch Clinic with a vision to bring world-class care to Egypt.',
    },
    common: {
      readMore: 'Read More',
      viewAll: 'View All',
      callNow: 'Call Now',
      directions: 'Get Directions',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      doctors: 'فريقنا الطبي',
      offers: 'العروض',
      contact: 'تواصل معنا',
      bookAppointment: 'احجز موعد',
    },
    hero: {
      title: 'الجمال والعافية المتكاملة',
      subtitle: 'عيادة إس إف تاتش',
      description: 'حيث تلتقي الخبرة الطبية المتقدمة بالرعاية الفاخرة. استمتع بعلاجات مخصصة من أطباء مؤهلين باستخدام أحدث التقنيات في الجلدية والليزر والتغذية.',
      cta: 'احجز استشارتك',
      secondaryCta: 'استكشف الخدمات',
    },
    services: {
      title: 'خدماتنا',
      subtitle: 'رعاية شاملة مصممة لاحتياجاتك الفريدة',
      dermatology: {
        title: 'الجلدية والليزر',
        description: 'علاجات متقدمة للبشرة وإجراءات الليزر والحقن التجميلية بإشراف أطباء جلدية متخصصين.',
      },
      nutrition: {
        title: 'التغذية العلاجية ونحت الجسم',
        description: 'خطط غذائية مخصصة وتقنيات متقدمة لنحت الجسم ضمن رحلة متكاملة تناسب الاحتياجات والأهداف المختلفة.',
      },
      hair: {
        title: 'عناية الشعر',
        description: 'زراعة الشعر وعلاجات متطورة لاستعادة كثافة الشعر وتحقيق نتائج طبيعية تدوم',
      },
      learnMore: 'اعرف المزيد',
    },
    technologies: {
      title: 'تقنيات متقدمة',
      subtitle: 'نستخدم أحدث الأجهزة المعتمدة من FDA للحصول على أفضل النتائج',
    },
    whyUs: {
      title: 'لماذا إس إف تاتش',
      subtitle: 'التميز في كل التفاصيل',
      doctorsCare: {
        title: ' رعاية متكاملة',
        description: 'تخصصات متعددة تحت سقف واحد، من الجلدية والليزر إلى التغذية واستعادة الشعر.',
      },
      technology: {
        title: 'أحدث التقنيات',
        description: 'أحدث الأجهزة والتقنيات في مجالات الجلدية والليزر ونحت الجسم، بما فيها Deka Again وMotus Pro وOnda Coolwaves.',
      },
      customized: {
        title: 'خطط علاج مخصصة',
        description: 'كل حالة لها احتياجاتها، لذلك يتم تصميم خطة علاج تناسب الحالة وأهدافها.',
      },
      results: {
        title: 'نتائج مثبتة',
        description: 'خبرة متراكمة ونتائج حقيقية لعدد كبير من الحالات، مع اهتمام مستمر بجودة كل تجربة.',
      },
    },
    footer: {
      about: 'عن إس إف تاتش',
      aboutText: 'مركز متخصص في الجلدية والليزر والتغذية، بيجمع بين الخبرة الطبية والتقنيات المتقدمة والرعاية المتكاملة في مكان واحد.',
      quickLinks: 'روابط سريعة',
      branches: 'فروعنا',
      damietta: 'دمياط - مول صفوة',
      newDamietta: 'دمياط الجديدة - المنطقة المركزية',
      workingHours: 'ساعات العمل',
      hours: 'يومياً: 1 صباحاً - 1 مساءً',
      copyright: '© 2026 تنجستين ميديا اجينسي. جميع الحقوق محفوظة.',
      followUs: 'تابعنا',
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نحن هنا للإجابة على أسئلتك',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      message: 'رسالتك',
      send: 'إرسال الرسالة',
    },
    about: {
      title: 'عن عيادة إس إف تاتش',
      vision: 'رؤيتنا',
      visionText: 'أن نكون الوجهة الرائدة للجمال والعافية المتكاملة في مصر، ووضع معايير جديدة في الطب التجميلي.',
      mission: 'مهمتنا',
      missionText: 'تقديم علاجات مخصصة تركز على النتائج باستخدام أحدث التقنيات، يقدمها متخصصون طبيون مؤهلون بعناية وخبرة.',
      founderTitle: 'المؤسس والمدير الطبي',
      founderName: 'د. خالد أبو يوسف',
      founderBio: 'بخبرة سنوات في الجلدية والطب التجميلي، أسس د. خالد عيادة إس إف تاتش برؤية لتقديم رعاية عالمية المستوى في مصر.',
    },
    common: {
      readMore: 'اقرأ المزيد',
      viewAll: 'عرض الكل',
      callNow: 'اتصل الآن',
      directions: 'الاتجاهات',
    },
  },
};

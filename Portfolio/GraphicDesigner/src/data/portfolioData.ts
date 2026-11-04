export interface ProfileData {
  name: string;
  nameEn: string;
  bio: string;
  bioEn: string;
  email: string;
  whatsapp: string;
  location: string;
  defaultAvatar: string;
  socials: {
    youtube: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export interface VideoProject {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  categoryLabel: string;
  categoryLabelBn: string;
  vimeoId: string;
  vimeoEmbedUrl: string;
  thumbnail: string;
  duration: string;
  client: string;
  views: string;
  aspectRatio: string;
  description: string;
  descriptionBn: string;
  toolsUsed: string[];
  keyFeatures: string[];
  keyFeaturesBn: string[];
}

export interface GraphicDesignProject {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  categoryLabel: string;
  categoryLabelBn: string;
  image: string;
  client: string;
  clientBn?: string;
  dimensions: string;
  description: string;
  descriptionBn: string;
  toolsUsed: string[];
  keyFeatures: string[];
  keyFeaturesBn: string[];
}

export const profileData: ProfileData = {
  name: "গ্রাফিক ডিজাইনার",
  nameEn: "Graphic Designer",
  bio: "উচ্চমানের ভিডিও এডিটিং ও ভিজ্যুয়াল স্টোরিটেলিংয়ের মাধ্যমে ব্র্যান্ড ও ক্রিয়েটরদের কাজকে অনন্য রূপ দেই।",
  bioEn: "Transforming footage into captivating, high-retention video stories for creators and brands.",
  email: "nomanhossain517@gmail.com",
  whatsapp: "+8801309465316",
  location: "Jurain, New Wasa Road, Kadamtali, Dhaka-1204",
  defaultAvatar: "/noman-hero.png",
  socials: {
    youtube: "https://youtube.com",
    facebook: "https://www.facebook.com/ifran.hossain.392",
    instagram: "https://www.instagram.com/nomanhossain392/?hl=en#",
    linkedin: "https://linkedin.com"
  }
};

export const videoProjects: VideoProject[] = [
  {
    id: "yt-cinematic-brand-promo",
    title: "Cinematic Commercial Brand Promo",
    titleBn: "সিনেমাটিক কমার্শিয়াল ব্র্যান্ড প্রোমো",
    category: "commercial",
    categoryLabel: "Cinematic Brand Promo",
    categoryLabelBn: "সিনেমাটিক ব্র্যান্ড প্রোমো",
    vimeoId: "IHI9vdIABgQ",
    vimeoEmbedUrl: "https://www.youtube.com/embed/IHI9vdIABgQ?autoplay=1&rel=0",
    thumbnail: "https://i.ytimg.com/vi/IHI9vdIABgQ/hqdefault.jpg",
    duration: "Shorts",
    client: "Noman Hossain",
    views: "Featured Commercial",
    aspectRatio: "9:16",
    description: "High-impact cinematic commercial brand promo with dynamic motion graphics, sound design, and professional visual rhythm.",
    descriptionBn: "ডায়নামিক মোশন গ্রাফিক্স, প্রফেশনাল সাউন্ড ডিজাইন ও সিনেমাটিক ভিজ্যুয়াল রিদম সমৃদ্ধ আকর্ষণীয় কমার্শিয়াল ব্র্যান্ড প্রোমো।",
    toolsUsed: ["Premiere Pro", "After Effects"],
    keyFeatures: ["Motion Graphics & VFX", "Commercial Brand Pacing", "Impactful Sound Design", "Cinematic Color Grading"],
    keyFeaturesBn: ["মোশন গ্রাফিক্স ও ভিএফএক্স", "কমার্শিয়াল ব্র্যান্ড পেসিং", "ইমপ্যাক্টফুল সাউন্ড ডিজাইন", "সিনেমাটিক কালার গ্রেডিং"]
  },
  {
    id: "yt-promotional-promo",
    title: "Digital Society Promotional Promo",
    titleBn: "ডিজিটাল সোসাইটি প্রমোশনাল প্রোমো",
    category: "commercial",
    categoryLabel: "Promotional Promo",
    categoryLabelBn: "প্রমোশনাল প্রোমো",
    vimeoId: "h2Qx5mwvPNY",
    vimeoEmbedUrl: "https://www.youtube.com/embed/h2Qx5mwvPNY?autoplay=1&rel=0",
    thumbnail: "https://i.ytimg.com/vi/h2Qx5mwvPNY/hqdefault.jpg",
    duration: "16:9 Promo",
    client: "Cyber Tech",
    views: "Featured Promo",
    aspectRatio: "16:9",
    description: "In today’s digital world, every click counts, and every second, new threats emerge. High-production widescreen promotional promo video with cinematic grading.",
    descriptionBn: "ডিজিটাল দুনিয়ার নিত্যনতুন সাইবার হুমকি ও সচেতনতা নিয়ে তৈরি ১৬:৯ ওয়াইডস্ক্রিন প্রমোশনাল প্রোমো — প্রিমিয়াম সিনেমাটিক কালার গ্রেডিং ও নিখুঁত অডিও ডিজাইন।",
    toolsUsed: ["Premiere Pro", "After Effects"],
    keyFeatures: ["16:9 Cinematic Widescreen", "Atmospheric Soundscapes", "Kinetic Visual Metaphors", "Professional Color Timing"],
    keyFeaturesBn: ["১৬:৯ সিনেমাটিক ওয়াইডস্ক্রিন", "অ্যাটমোস্ফেরিক সাউন্ডস্কেপ", "কাইনেটিক ভিজ্যুয়াল মেটাফোর", "প্রফেশনাল কালার টাইমিং"]
  },
  {
    id: "yt-commercial-promo",
    title: "Skill Over Certificate Promo",
    titleBn: "স্কিল ওভার সার্টিফিকেট প্রোমো",
    category: "commercial",
    categoryLabel: "Commercial Promo",
    categoryLabelBn: "কমার্শিয়াল প্রোমো",
    vimeoId: "ZZ19t99cf7c",
    vimeoEmbedUrl: "https://www.youtube.com/embed/ZZ19t99cf7c?autoplay=1&rel=0",
    thumbnail: "https://i.ytimg.com/vi/ZZ19t99cf7c/hqdefault.jpg",
    duration: "Shorts",
    client: "Skill Campaign",
    views: "Commercial Hit",
    aspectRatio: "9:16",
    description: "High-impact short-form commercial promo emphasizing skills over certificates with punchy typography and dynamic motion rhythm.",
    descriptionBn: "সার্টিফিকেট নয়, দক্ষতাই হতে পারে আপনার আসল পরিচয় — শক্তিশালী মোশন টাইপোগ্রাফি ও গতিশীল সিনেমাটিক কাটে নির্মিত কমার্শিয়াল প্রোমো।",
    toolsUsed: ["Premiere Pro", "After Effects"],
    keyFeatures: ["Dynamic Motion Typography", "High Retention Hook", "Commercial Grade Sound FX", "Punchy Pacing"],
    keyFeaturesBn: ["ডায়নামিক মোশন টাইপোগ্রাফি", "হাই রিটেনশন হুক", "কমার্শিয়াল গ্রেড সাউন্ড এফএক্স", "গতিশীল পেসিং"]
  },
  {
    id: "yt-freelancer-story-reel",
    title: "A Freelancer's Story | Vertical Reel",
    titleBn: "একজন ফ্রিল্যান্সারের গল্প | শর্ট স্টোরি রিল",
    category: "reels",
    categoryLabel: "Vertical Reel (9:16)",
    categoryLabelBn: "ভার্টিকাল রিলস (৯:১৬)",
    vimeoId: "ywoUnr8l1OQ",
    vimeoEmbedUrl: "https://www.youtube.com/embed/ywoUnr8l1OQ?autoplay=1&rel=0",
    thumbnail: "https://i.ytimg.com/vi/ywoUnr8l1OQ/hqdefault.jpg",
    duration: "Shorts",
    client: "Short Story",
    views: "Inspiring Journey",
    aspectRatio: "9:16",
    description: "An inspiring short-form visual story depicting a freelancer's journey from dreams to success with engaging pacing and cinematic edits.",
    descriptionBn: "স্বপ্ন থেকে সফলতার পথে একজন ফ্রিল্যান্সারের রোমাঞ্চকর ও অনুপ্রেরণামূলক জার্নি নিয়ে নির্মিত ৯:১৬ ভার্টিকাল শর্ট স্টোরি রিল।",
    toolsUsed: ["Premiere Pro", "After Effects"],
    keyFeatures: ["Inspirational Narrative Pacing", "Engaging Vertical Framing", "Atmospheric Sound Design", "Seamless Visual Cuts"],
    keyFeaturesBn: ["অনুপ্রেরণামূলক ন্যারেটিভ পেসিং", "পারফেক্ট ৯:১৬ ভার্টিকাল ফ্রেমিং", "অ্যাটমোস্ফেরিক সাউন্ড ডিজাইন", "সিমলেস ভিজ্যুয়াল কাটস"]
  },
  {
    id: "yt-search-motion",
    title: "Search Motion Panel",
    titleBn: "সার্চ মোশন প্যানেল",
    category: "commercial",
    categoryLabel: "Motion Graphics",
    categoryLabelBn: "মোশন গ্রাফিক্স",
    vimeoId: "JWT9l1E5rXY",
    vimeoEmbedUrl: "https://www.youtube.com/embed/JWT9l1E5rXY?autoplay=1&rel=0",
    thumbnail: "https://i.ytimg.com/vi/JWT9l1E5rXY/hqdefault.jpg",
    duration: "Motion",
    client: "Motion Showcase",
    views: "Motion FX",
    aspectRatio: "16:9",
    description: "Dynamic vector motion graphics, kinetic scene transitions, and rhythmic typography animation.",
    descriptionBn: "ডায়নামিক ভেক্টর মোশন গ্রাফিক্স, কাইনেটিক সিন ট্রানজিশন এবং ছন্দময় টাইপোগ্রাফি অ্যানিমেশন।",
    toolsUsed: ["Premiere Pro", "After Effects"],
    keyFeatures: ["Kinetic Vector Transitions", "Fluid Typography Rhythm", "Spatial Visual Hierarchy", "Custom Sound Sync"],
    keyFeaturesBn: ["কাইনেটিক ভেক্টর ট্রানজিশন", "ফ্লুইড টাইপোগ্রাফি রিদম", "স্পেশিয়াল ভিজ্যুয়াল হায়ারার্কি", "কাস্টম সাউন্ড সিঙ্ক"]
  },
  {
    id: "vimeo-ui-motion",
    title: "UI Motion Final",
    titleBn: "ইউআই মোশন ফাইনাল",
    category: "commercial",
    categoryLabel: "UI/UX Motion",
    categoryLabelBn: "ইউআই/ইউএক্স মোশন",
    vimeoId: "1226360327",
    vimeoEmbedUrl: "https://player.vimeo.com/video/1226360327?badge=0&autopause=1&player_id=vimeo-modal-player&app_id=58479&autoplay=1",
    thumbnail: "https://vumbnail.com/1226360327.jpg",
    duration: "Motion",
    client: "App Interface",
    views: "UI Design",
    aspectRatio: "16:9",
    description: "High-fidelity app interaction motion design, seamless screen walkthroughs, and clean micro-interactions.",
    descriptionBn: "হাই-ফিডেলিটি অ্যাপ ইন্টারঅ্যাকশন মোশন ডিজাইন, মসৃণ স্ক্রিন ওয়াকথ্রু এবং পরিচ্ছন্ন মাইক্রো-ইন্টারঅ্যাকশন।",
    toolsUsed: ["Premiere Pro", "After Effects"],
    keyFeatures: ["App Walkthrough Animation", "Smooth Micro-Interactions", "Device Screen Motion FX", "Refined Interface Polish"],
    keyFeaturesBn: ["অ্যাপ ওয়াকথ্রু অ্যানিমেশন", "স্মুথ মাইক্রো-ইন্টারঅ্যাকশন", "ডিভাইস স্ক্রিন মোশন এফএক্স", "রিফাইন্ড ইন্টারফেস পলিশ"]
  }
];

export const graphicDesigns: GraphicDesignProject[] = [
  {
    id: "design-amra",
    title: "Mahfil Poster Design",
    titleBn: "মাহফিল পোস্টার ডিজাইন",
    category: "poster",
    categoryLabel: "Poster Design",
    categoryLabelBn: "পোস্টার ডিজাইন",
    image: "https://i.postimg.cc/c1D7SdRG/mahfil-pster-100.jpg",
    client: "",
    clientBn: "",
    dimensions: "High-Res Artwork",
    description: "",
    descriptionBn: "",
    toolsUsed: ["Photoshop", "Illustrator"],
    keyFeatures: ["Bangla Typography Arrangement", "Harmonious Color Palette", "High Contrast Visual Layout", "Digital Feed Optimization"],
    keyFeaturesBn: ["বাংলা টাইপোগ্রাফি বিন্যাস", "মনোরম কালার প্যালেট", "উচ্চ কনট্রাস্ট ভিজ্যুয়াল লেআউট", "সোশ্যাল ফিড অপ্টিমাইজেশন"]
  },
  {
    id: "design-anua-skincare",
    title: "E-Commerce Ad",
    titleBn: "ই-কমার্স অ্যাড",
    category: "ad-creative",
    categoryLabel: "E-Commerce Ad",
    categoryLabelBn: "ই-কমার্স অ্যাড",
    image: "https://i.postimg.cc/858cMKRM/anua-skin-care-ad-design.jpg",
    client: "",
    clientBn: "",
    dimensions: "1080x1080 (Square)",
    description: "",
    descriptionBn: "",
    toolsUsed: ["Photoshop", "Illustrator", "Lightroom"],
    keyFeatures: ["Product Rim Lighting", "Soft Minimal Aesthetic", "High Conversion Ad Hierarchy", "E-commerce Feed Ready"],
    keyFeaturesBn: ["প্রোডাক্ট রিম লাইটিং", "সফট মিনিমালিস্টিক নান্দনিকতা", "হাই কনভার্সন অ্যাড হায়ারার্কি", "ই-কমার্স ফিড ফ্রেন্ডলি"]
  },
  {
    id: "design-artboard-branding",
    title: "Brand Artboard",
    titleBn: "ব্র্যান্ড আর্টবোর্ড",
    category: "poster",
    categoryLabel: "Brand Artboard",
    categoryLabelBn: "ব্র্যান্ড আর্টবোর্ড",
    image: "https://i.postimg.cc/WzRvDBZY/Artboard-1-100.jpg",
    client: "",
    clientBn: "",
    dimensions: "Vector Masterpiece",
    description: "",
    descriptionBn: "",
    toolsUsed: ["Illustrator", "Photoshop"],
    keyFeatures: ["Clean Geometric Layout", "Sharp Vector Composition", "Brand Palette Uniformity", "Multi-format Scaling"],
    keyFeaturesBn: ["ক্লিন জিওমেট্রিক লেআউট", "শার্প ভেক্টর কম্পোজিশন", "ব্র্যান্ড কালার সামঞ্জস্য", "মাল্টি-ফরম্যাট স্কেলিং"]
  },
  {
    id: "design-chicken-bowl",
    title: "Chicken Bowl Promo",
    titleBn: "চিকেন বোল প্রমো",
    category: "ad-creative",
    categoryLabel: "Food Menu Promo",
    categoryLabelBn: "মেনু ও প্রমোশন ব্যানার",
    image: "https://i.postimg.cc/26pyhcQn/chiken-bowl.jpg",
    client: "",
    clientBn: "",
    dimensions: "1080x1080 (Square)",
    description: "Vibrant culinary creative highlighting crispy textures, golden hues, and crisp typography for fast food marketing.",
    descriptionBn: "খাস্তা ক্রিস্পি টেক্সচার, সোনালী আভা এবং চোখধাঁধানো টাইপোগ্রাফির সমন্বয়ে তৈরি ফাস্ট ফুড প্রমোশন ব্যানার।",
    toolsUsed: ["Photoshop", "Illustrator"],
    keyFeatures: ["Food Retouching & Highlights", "Crispy Texture Enhancement", "Call-to-Action Price Tag", "Social Media Ready"],
    keyFeaturesBn: ["ফুড রিটাচিং ও হাইলাইটস", "ক্রিস্পি টেক্সচার বর্ধিতকরণ", "কল-টু-অ্যাকশন অফার ট্যাগ", "সোশ্যাল মিডিয়া অপ্টিমাইজড"]
  },
  {
    id: "design-burger-ad",
    title: "Burger Social Ad",
    titleBn: "বার্গার সোশ্যাল অ্যাড",
    category: "ad-creative",
    categoryLabel: "Food Ad Creative",
    categoryLabelBn: "ফুড অ্যাড ডিজাইন",
    image: "https://i.postimg.cc/mDxkCXYF/Burger.jpg",
    client: "",
    clientBn: "",
    dimensions: "Social Media Feed",
    description: "Appetite-inducing food advertisement with fiery embers, dramatic floating ingredients, and bold headline styling.",
    descriptionBn: "জিভে জল আনা লোভনীয় ফুড সোশ্যাল মিডিয়া ব্যানার — ড্রামাটিক ব্যাকগ্রাউন্ড, স্পাইস এফেক্ট এবং বোল্ড অফার টেক্সট।",
    toolsUsed: ["Photoshop", "Lightroom"],
    keyFeatures: ["Appetite Appeal Styling", "Dynamic Floating Ingredient Compositing", "Vibrant Contrast and Shadow Depth", "Stop-the-Scroll Layout"],
    keyFeaturesBn: ["লোভনীয় কালার গ্রেডিং", "ডায়নামিক ফ্লোটিং উপাদানের কম্পোজিটিং", "উচ্চ কনট্রাস্ট ও শ্যাডো ডেপথ", "স্টপ-দ্য-স্ক্রোল ডিজাইন"]
  },
  {
    id: "design-soundbox-ad",
    title: "Sound Box Ad",
    titleBn: "সাউন্ড বক্স ডিজাইন",
    category: "ad-creative",
    categoryLabel: "Product Ad",
    categoryLabelBn: "প্রোডাক্ট বিজ্ঞাপন",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1080&q=80",
    client: "",
    clientBn: "",
    dimensions: "1080x1080 (Square)",
    description: "High-end commercial sound box speaker advertisement creative with studio acoustics, premium lighting, and sleek branding.",
    descriptionBn: "স্টুডিও অ্যাকোস্টিক অ্যাম্বিয়েন্স, প্রিমিয়াম লাইটিং এবং আধুনিক ব্র্যান্ডিং সমন্বয়ে তৈরি আকর্ষণীয় সাউন্ড বক্স স্পিকার সোশ্যাল অ্যাড ডিজাইন।",
    toolsUsed: ["Photoshop", "Illustrator"],
    keyFeatures: ["Studio Lighting & Depth", "Acoustic Vibe Composition", "High-Conversion Product Layout", "Premium Brand Aesthetic"],
    keyFeaturesBn: ["স্টুডিও লাইটিং ও ডেপথ", "অ্যাকোস্টিক ভাইব কম্পোজিশন", "হাই-কনভার্সন প্রোডাক্ট লেআউট", "প্রিমিয়াম ব্র্যান্ড নান্দনিকতা"]
  },
  {
    id: "design-hasan-typography",
    title: "Hasan Calligraphy Poster",
    titleBn: "হাসান ক্যালিগ্রাফি পোস্টার",
    category: "poster",
    categoryLabel: "Calligraphy Poster",
    categoryLabelBn: "ক্যালিগ্রাফি পোস্টার",
    image: "https://i.postimg.cc/C1y5kPGj/Ha-SAN.jpg",
    client: "Typography Series",
    dimensions: "Artistic Poster",
    description: "Handcrafted typographic letterforms combined with atmospheric textures and cultural visual heritage.",
    descriptionBn: "হাতে আঁকা কাস্টম ক্যালিগ্রাফিক স্টাইল, ক্লাসিক্যাল টেক্সচার ও গভীর নান্দনিকতায় তৈরি শৈল্পিক পোস্টার ডিজাইন।",
    toolsUsed: ["Photoshop", "Illustrator"],
    keyFeatures: ["Custom Typographic Lettering", "Deep Atmospheric Texturing", "Cultural Heritage Aesthetics", "Wall Art & Digital Poster"],
    keyFeaturesBn: ["কাস্টম টাইপোগ্রাফিক লেটারিং", "গভীর অ্যাটমোস্ফেরিক টেক্সচারিং", "ঐতিহ্যবাহী নান্দনিক রূপ", "ওয়াল আর্ট ও ডিজিটাল পোস্টার"]
  },
  {
    id: "design-mirath-poster",
    title: "Mirath Brand Poster",
    titleBn: "মিরাস ব্র্যান্ড পোস্টার",
    category: "poster",
    categoryLabel: "Cinematic Poster",
    categoryLabelBn: "সিনেমাটিক পোস্টার",
    image: "https://i.postimg.cc/gJ9j8SVy/Mirath-2.jpg",
    client: "Mirath Project",
    dimensions: "Cinematic Ratio",
    description: "Dramatic visual poster with cinematic color grading, mysterious shadows, and majestic Islamic branding tone.",
    descriptionBn: "সিনেমাটিক কালার গ্রেডিং, নাটকীয় ছায়া এবং রাজকীয় আভিজাত্যের সমন্বয়ে তৈরি মিরাস ব্র্যান্ডের এক্সক্লুসিভ পোস্টার।",
    toolsUsed: ["Photoshop", "Lightroom"],
    keyFeatures: ["Cinematic Lighting Gradients", "Brand Monogram Placement", "Atmospheric Depth & Mist", "Story-Driven Composition"],
    keyFeaturesBn: ["সিনেমাটিক লাইটিং গ্রেডিয়েন্ট", "ব্র্যান্ড মনোগ্রাম প্লেসমেন্ট", "অ্যাটমোস্ফেরিক ডেপথ ও মিস্ট", "গল্পভিত্তিক আকর্ষণীয় কম্পোজিশন"]
  },
  {
    id: "design-mrittyu-cover",
    title: "Mrityu Book Cover",
    titleBn: "মৃত্যু বুক কভার",
    category: "poster",
    categoryLabel: "Book Cover & Poster",
    categoryLabelBn: "বুক কভার ও পোস্টার",
    image: "https://i.postimg.cc/50cyL7B3/mrittyu.jpg",
    client: "Islamic Publication",
    dimensions: "Book Cover / Vertical",
    description: "Deeply emotional and philosophical book cover design exploring mortality with moody shadows and striking typography.",
    descriptionBn: "গভীর ভাবগাম্ভীর্যপূর্ণ কনসেপ্ট, ড্রামাটিক অন্ধকার ও আলোর খেলা এবং বোল্ড টাইটেল সহযোগে তৈরি মনোগ্রাহী বুক কভার ডিজাইন।",
    toolsUsed: ["Photoshop", "InDesign", "Illustrator"],
    keyFeatures: ["Emotional & Thought-Provoking Theme", "Moody Shadow Composition", "Custom Bangla Book Title Font", "Print-Ready Standard"],
    keyFeaturesBn: ["গভীর ভাবগাম্ভীর্যপূর্ণ বিষয়বস্তু", "মুডি শ্যাডো কম্পোজিশন", "কাস্টম বাংলা টাইটেল ফন্ট", "প্রিন্ট-রেডি নির্ভুল ফরম্যাট"]
  },
  {
    id: "design-set-cover",
    title: "Book Set Cover",
    titleBn: "বইয়ের সেট কভার",
    category: "poster",
    categoryLabel: "Publication Cover",
    categoryLabelBn: "পাবলিকেশন কভার",
    image: "https://i.postimg.cc/vBRTfqrq/set-cover-design-2.jpg",
    client: "Heritage Publications",
    dimensions: "Box Set / Multi-cover",
    description: "Cohesive multi-volume editorial set design with elegant spine consistency, rich foil patterns, and unified color palette.",
    descriptionBn: "ধারাবাহিক বইয়ের সেটের জন্য সমন্বিত স্পাইন ও ফ্রন্ট কভার ডিজাইন — প্রফেশনাল ফয়েল ইফেক্ট ও মার্জিত আর্টওয়ার্ক।",
    toolsUsed: ["InDesign", "Photoshop", "Illustrator"],
    keyFeatures: ["Editorial Spine Uniformity", "Luxurious Decorative Framing", "High-Resolution Vector Borders", "Complete Publication Series Flow"],
    keyFeaturesBn: ["ধারাবাহিক স্পাইন সামঞ্জস্য", "আভিজাত্যপূর্ণ ফ্রেম নকশা", "হাই-রেজোলিউশন ভেক্টর বর্ডার", "পাবলিকেশন সিরিজের পূর্ণাঙ্গ ফ্লো"]
  },
  {
    id: "design-typography-02",
    title: "Bangla Typography",
    titleBn: "বাংলা টাইপোগ্রাফি",
    category: "poster",
    categoryLabel: "Typography Art",
    categoryLabelBn: "টাইপোগ্রাফি আর্ট",
    image: "https://i.postimg.cc/HxGnXZwN/Typography-02.jpg",
    client: "Typography Showcase",
    dimensions: "Artistic Layout",
    description: "Modernized Bengali letterforms exploring fluid strokes, balance, and creative negative space.",
    descriptionBn: "আধুনিক বাংলা হরফের বৈচিত্র্যময় শৈল্পিক রূপ, সুষম নেগেটিভ স্পেস এবং চমৎকার স্ট্রোক শৈলীর অনন্য নিদর্শন।",
    toolsUsed: ["Illustrator", "Photoshop"],
    keyFeatures: ["Custom Handwritten Letterform", "Creative Negative Space Use", "Minimalist Clean Visuals", "Authentic Bengali Artistry"],
    keyFeaturesBn: ["কাস্টম হস্তলিপিক হরফ", "সৃজনশীল নেগেটিভ স্পেস ব্যবহার", "মিনিমালিস্টিক ক্লিয়ার ভিজ্যুয়াল", "খাঁটি বাংলা নান্দনিকতা"]
  },
  {
    id: "design-yt-thumbnail-01",
    title: "YouTube Thumbnail 01",
    titleBn: "ইউটিউব থাম্বনেইল ০১",
    category: "thumbnail",
    categoryLabel: "YouTube Thumbnail",
    categoryLabelBn: "ইউটিউব থাম্বনেইল",
    image: "https://i.postimg.cc/k5H8ZvxK/Thumbnail.png",
    client: "Creator Channel",
    dimensions: "1920x1080 (16:9 HD)",
    description: "Engineered for algorithm click-through success with punchy color grading, clear subject isolation, and curiosity hook.",
    descriptionBn: "অ্যালগরিদম উপযোগী উচ্চ ক্লিক রেট অর্জনের জন্য তৈরি থাম্বনেইল — পপ-আউট বিষয়বস্তু, বোল্ড টেক্সট ও কিউরিওসিটি হুক।",
    toolsUsed: ["Photoshop", "Lightroom"],
    keyFeatures: ["High Visual Contrast for Mobile", "Instant Hook Readability", "Custom Edge Lighting and Retouching", "Proven CTR Optimization"],
    keyFeaturesBn: ["মোবাইল স্ক্রিনে স্পষ্ট ভিজ্যুয়াল কনট্রাস্ট", "০.২ সেকেন্ডে বোঝার উপযোগী হুক", "কাস্টম এজ লাইটিং ও রিটাচিং", "প্রমাণিত হাই সিটিআর ফর্মুলা"]
  },
  {
    id: "design-yt-thumbnail-aam",
    title: "Mango Garden Thumbnail",
    titleBn: "আম বাগান থাম্বনেইল",
    category: "thumbnail",
    categoryLabel: "Story Thumbnail",
    categoryLabelBn: "স্টোরি থাম্বনেইল",
    image: "https://i.postimg.cc/fbPXFfxY/thumbnail-aam.png",
    client: "Documentary YouTube",
    dimensions: "1920x1080 (16:9 HD)",
    description: "Vivid storytelling thumbnail depicting lush orchard vibes, expressive facial acting, and high-impact curiosity cues.",
    descriptionBn: "আম বাগানের সতেজ পরিবেশ, অভিব্যক্তিপূর্ণ ফেস রিটাচিং এবং কৌতূহলোদ্দীপক ফন্ট ডিজাইনে তৈরি স্টোরিটেলিং থাম্বনেইল।",
    toolsUsed: ["Photoshop", "Lightroom"],
    keyFeatures: ["Lush Color Enhancement", "Facial Emotion Accentuation", "3D Perspective Font Styling", "15%+ Click Rate Design"],
    keyFeaturesBn: ["উজ্জ্বল প্রাকৃতিক কালার এনহ্যান্সমেন্ট", "ফেসিয়াল এক্সপ্রেশন রিটাচিং", "থ্রিডি পার্সপেক্টিভ ফন্ট স্টাইলিং", "উচ্চভিউ নিশ্চিতকরণ ডিজাইন"]
  },
  {
    id: "design-yt-thumbnail-02",
    title: "Viral Thumbnail 02",
    titleBn: "ভাইরাল থাম্বনেইল ০২",
    category: "thumbnail",
    categoryLabel: "Viral Thumbnail",
    categoryLabelBn: "ভাইরাল থাম্বনেইল",
    image: "https://i.postimg.cc/q7FnYx8n/Thumnail-02.png",
    client: "Popular YouTuber",
    dimensions: "1920x1080 (16:9 HD)",
    description: "Bold and dynamic YouTube thumbnail artwork crafted to dominate competitive video feeds.",
    descriptionBn: "সোশ্যাল মিডিয়া ও ইউটিউবের তুমুল প্রতিযোগিতামূলক ফিডে দর্শকের চোখ আটকে দেওয়ার জন্য তৈরি পাওয়ারফুল থাম্বনেইল আর্ট।",
    toolsUsed: ["Photoshop", "Illustrator"],
    keyFeatures: ["Extreme Focal Clarity", "Color Pop Glow Accents", "Zero Visual Clutter", "YouTube Algorithm Friendly"],
    keyFeaturesBn: ["চোখধাঁধানো ফোকাস ক্লিয়ারিটি", "কালার পপ গ্লো ইফেক্ট", "ক্লিন আনক্ল্যাটারড লেআউট", "ইউটিউব অ্যালগরিদম ফ্রেন্ডলি"]
  }
];

let currentLang = 'en';

const translationDict = {
    en: {
        invalid: "Please fill out both fields correctly. Mobile must be 10 digits.",
        p1Title: "MOBILE NUMEROLOGY REPORT",
        p2Title: "LO SHU GRID MATRIX & MAP",
        p3Title: " WALLPAPER & REMEDIES ANALYSIS",
        p4Title: "100-YEARS MAHADASHA TIMELINE",
        mantra: "‖ Om Gam Ganapataye Namaha ‖<br>May Lord Ganesha remove all obstacles from your destiny path.",
        recTotal: "Recommended Mobile Total Number",
        luckUnluck: "Lucky / Unlucky Numbers Mapping",
        luckCol: "Lucky / Unlucky Colours Architecture",
        missingNos: "Missing Numbers & Structural Remedies",
        wallpaper: "Recommended Strategic Mobile Wallpaper",
        dashas: "Calculated Mahadasha Timeline (100 Years Horizon)",
        genRem: "General Astrological & Vibration Remedies",
        scoreText: "Calculated Digital Root Vibration:",
        gridTitle: "Your Personal Birth & Mobile Merged Lo Shu Grid Matrix"
    },
    hi: {
        invalid: "कृपया दोनों विवरण सही से भरें। मोबाइल नंबर 10 अंकों का होना चाहिए।",
        p1Title: "मोबाइल अंकशास्त्र विश्लेषण रिपोर्ट",
        p2Title: "लो शू ग्रिड मैट्रिक्स एवं विश्लेषण मैप",
        p3Title: "वॉलपेपर एवं सुधारात्मक रेमेडीज विश्लेषण",
        p4Title: "100 वर्ष महादशा काल चक्र समयरेखा",
        mantra: "‖ ॐ गं गणपतये नमः ‖<br>भगवान श्री गणेश आपके भाग्य मार्ग से सभी बाधाओं को दूर करें।",
        recTotal: "अनुशंसित मोबाइल कुल योग नंबर",
        luckUnluck: "लकी / अनलकी अंक मैपिंग विन्यास",
        luckCol: "भाग्यशाली / दुर्भाग्यपूर्ण रंगों की वास्तुकला",
        missingNos: "मिसिंग नंबर विश्लेषण एवं व्यावहारिक उपाय",
        wallpaper: "अनुशंसित रणनीतिक मोबाइल वॉलपेपर",
        dashas: "गणना की गई महादशा समयरेखा (100 वर्ष क्षितिज)",
        genRem: "सामान्य ज्योतिषीय एवं कंपन रेमेडीज",
        scoreText: "परिकल्पित डिजिटलूट कंपन स्कोर:",
        gridTitle: "आपका व्यक्तिगत जन्म एवं मोबाइल मिश्रित लो शू ग्रिड मैट्रिक्स"
    }
};

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');
    
    if(lang === 'hi') {
        document.getElementById('ui-title').innerText = "🔮 मोबाइल न्यूमरोलॉजी प्रो";
        document.getElementById('ui-subtitle').innerText = "व्यापक लो शू ग्रids और सुधारात्मक रिपोर्ट तैयार करें";
        document.getElementById('lbl-dob').innerText = "जन्म तिथि का चयन करें:";
        document.getElementById('lbl-phone').innerText = "10-अंकों का मोबाइल नंबर दर्ज करें:";
        document.getElementById('ui-btn').innerText = "रणनीतिक रिपोर्ट तैयार करें";
    } else {
        document.getElementById('ui-title').innerText = "🔮 Mobile Numerology Pro";
        document.getElementById('ui-subtitle').innerText = "Generate comprehensive Lo Shu Grid analytical reports";
        document.getElementById('lbl-dob').innerText = "Select Date of Birth:";
        document.getElementById('lbl-phone').innerText = "Enter 10-Digit Mobile Number:";
        document.getElementById('ui-btn').innerText = "Generate Strategic Report";
    }
    
    if(document.getElementById('report-preview').style.display === 'block') {
        generateLoshuReport();
    }
}

function calculateSingleDigit(str) {
    let numbers = str.replace(/\D/g, '');
    let sum = 0;
    for (let char of numbers) { sum += parseInt(char); }
    while (sum > 9) {
        sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
    }
    return sum === 0 ? 9 : sum;
}

function generateLoshuReport() {
    const dobValue = document.getElementById('dobInput').value;
    const phoneValue = document.getElementById('mobileInput').value.replace(/\D/g, '');
    const lang = translationDict[currentLang];

    if (!dobValue || phoneValue.length < 10) {
        alert(lang.invalid);
        return;
    }

    const phoneTotal = calculateSingleDigit(phoneValue);
    
    // Formatting fixing for all mobile phone types
    const rawDob = dobValue.replace(/-/g, '');
    const combinedString = rawDob + phoneValue;
    const counts = {};
    for (let char of combinedString) {
        counts[char] = (counts[char] || 0) + 1;
    }

    const buildGridItem = (num) => {
        if (!counts[num]) return `<td class="grid-missing">${num}</td>`;
        return `<td>${num.toString().repeat(Math.min(counts[num], 3))}</td>`;
    };

    // Safe extraction of birth date component parts
    const dateParts = dobValue.split('-');
    
    // Multi-browser dynamic extraction strategy
    let birthDayStr = "";
    if (dateParts[0].length === 4) {
        // Format is YYYY-MM-DD
        birthDayStr = dateParts[2];
    } else {
        // Format is DD-MM-YYYY
        birthDayStr = dateParts[0];
    }
    
    const driver = calculateSingleDigit(birthDayStr);
    const conductor = calculateSingleDigit(rawDob);

    const engines = {
        en: {
            wallpaperName: ["Neon Solar Crimson Chariot", "Prismatic Crescent Tidal Wave", "Emerald Cyber Lotus Matrix", "Topaz Geometric Vault", "Mercury Messenger Aurora Horizon", "Diamond Luxury Cash Flow Splash", "Deep Violet Cosmic Nebula", "Obelisk Obsidian Fortress Grid", "Ruby Volcano Fire Matrix"],
            remedies: [
                "Carry a copper coin, wear dark ruby tones, offer water to the Sun daily.",
                "Keep a white silver token, sleep facing North, use white screen accents.",
                "Wear yellow topaz accents, tie a yellow silk band, read books outdoors.",
                "Wear clean steel rings, keep dark accessories minimal, feed stray animals.",
                "Use green tech skins, place green plants on working desk, communicate cleanly.",
                "Keep clear quartz stones nearby, wear light pastel colors, use luxury textures.",
                "Wear grey elements, maintain a handwritten diary, practice meditation.",
                "Wear dark blue elements, feed crows on Saturdays, maintain strict timetables.",
                "Wear deep red accents, exercise in mornings, support local construction labor."
            ],
            missing: "Analyze missing grid numbers to structure external gemstone or directional adjustments."
        },
        hi: {
            wallpaperName: ["नियोन सोलर क्रिमसन चेरियट", "प्रिजमैटिक क्रेसेंट टाइडल वेव", "एमराल्ड साइबर लोटस मैट्रिक्स", "टोपाज़ जियोमेट्रिक वॉल्ट", "मरकरी मैसेंजर ऑरोरा होराइजन", "डायमंड लग्जरी कैश फ्लो स्प्लैश", "डीप वॉयलेट कॉस्मिक नेबुला", "ओबिलिस्क ओब्सीडियन फोर्ट्रेस ग्रिड", "रूबी वोल्केनो फायर接收 मैट्रिक्स"],
            remedies: [
                "तांबे का सिक्का पास रखें, गहरे रूबी रंग पहनें, सूर्य देव को अर्घ्य दें।",
                "चांदी का एक छल्ला धारण करें, उत्तर दिशा की ओर सोएं, सफेद रंग का प्रयोग करें।",
                "पुखराज धारण करें, कलाई पर पीला रेशमी धागा बांधें, बड़ों का सम्मान करें।",
                "स्टील की अंगूठी पहनें, गहरे रंग के सामान का सीमित प्रयोग करें, बेसहारा पशुओं को भोजन दें।",
                "हरे रंग के गैजेट कवर्स का उपयोग करें, वर्क डेस्क पर पौधे रखें, स्पष्ट संवाद रखें।",
                "स्फटिक क्रिस्टल पास रखें, हल्के पेस्टल रंगों का उपयोग करें, विलासिता तत्वों को बढ़ाएं।",
                "ग्रे तत्वों का उपयोग करें, हस्तलिखित डायरी रखें, ध्यान का अभ्यास नियमित करें।",
                "शनिवार को कौवे को भोजन खिलाएं, गहरे नीले रंग पहनें, समयबद्धता का पालन करें।",
                "गहरे लाल रंगों का प्रयोग करें, सुबह व्यायाम करें, निर्माण श्रमिकों की सहायता करें।"
            ],
            missing: "ग्रिड के अनुपस्थित अंकों का विश्लेषण करके रत्न धारण या दिशा सुधार की योजना बनाएं।"
        }
    };

    const activeEngine = engines[currentLang];
    
    let missingArray = [];
    for(let i=1; i<=9; i++) {
        if(!counts[i]) missingArray.push(i);
    }
    const missingOutput = missingArray.join(', ');

    let previewHtml = `
        <div class="pdf-page">
            <div class="pdf-header">Page 1</div>
            <div class="cover-title">${lang.p1Title}</div>
            <div class="ganesh-container">
                <svg class="ganesh-svg" viewBox="0 0 100 100">
                    <path d="M50,15 C40,15 35,25 35,35 C35,42 38,48 42,52 C44,54 45,57 45,60 L45,75 C45,78 48,80 50,80 C52,80 55,78 55,75 L55,60 C55,57 56,54 58,52 C62,48 65,42 65,35 C65,25 60,15 50,15 Z M50,22 C53,22 55,24 55,27 C55,30 53,32 50,32 C47,32 45,30 45,27 C45,24 47,22 50,22 Z M42,38 C40,38 39,36 39,34 C39,32 40,31 42,31 C44,31 45,32 45,34 C45,36 44,38 42,38 Z M58,38 C56,38 55,36 55,34 C55,32 56,31 58,31 C60,31 62,32 62,34 C62,36 60,38 58,38 Z" />
                    <path d="M45,55 C40,58 30,55 25,62 C22,66 26,72 32,70 C38,68 42,62 45,55 Z" />
                    <path d="M55,55 C60,58 70,55 75,62 C78,66 74,72 68,70 C62,68 58,62 55,55 Z" />
                </svg>
            </div>
            <div class="mantra">${lang.mantra}</div>
            <div style="margin-top: 50px; background: #faf5ff; padding: 15px; border-radius: 8px; border: 1px solid #e9d8fd;">
                <div class="data-row"><strong>Date of Birth:</strong> ${dobValue}</div>
                <div class="data-row"><strong>Mobile Analyzed:</strong> +91 ${phoneValue}</div>
                <div class="data-row"><strong>Driver (Mulank):</strong> ${driver} &nbsp;|&nbsp; <strong>Conductor (Bhagyank):</strong> ${conductor}</div>
            </div>
            <div class="pdf-footer">MYSTIC SHAKTI</div>
        </div>
        <div class="pdf-page">
            <div class="pdf-header">Page 2</div>
            <div class="section-heading">${lang.p2Title}</div>
            <p style="font-size:0.9em; margin-bottom:5px;">${lang.gridTitle}</p>
            <table class="loshu-table">
                <tr>${buildGridItem(4)}${buildGridItem(9)}${buildGridItem(2)}</tr>
                <tr>${buildGridItem(3)}${buildGridItem(5)}${buildGridItem(7)}</tr>
                <tr>${buildGridItem(8)}${buildGridItem(1)}${buildGridItem(6)}</tr>
            </table>

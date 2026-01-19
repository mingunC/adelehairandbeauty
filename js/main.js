document.addEventListener('DOMContentLoaded', () => {
    // ========== Mobile Navigation Toggle ==========
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('nav ul');

    if (mobileNavToggle && navList) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && navList.classList.contains('active')) {
                mobileNavToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });

        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }

    // ========== Scroll event (navbar, booking-link) ==========
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const button = document.querySelector('.booking-link');

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (button) {
            button.style.backgroundColor = '#2C233A';
        }
    });
});

window.toggleService = function (element, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const content = element.nextElementSibling;
    const icon = element.querySelector('.toggle-icon');

    // Close other service contents
    const allContents = document.querySelectorAll('.service-content');
    const allIcons = document.querySelectorAll('.toggle-icon');

    allContents.forEach((item, index) => {
        if (item !== content) {
            item.classList.remove('active');
            if (allIcons[index]) {
                allIcons[index].textContent = '+';
            }
        }
    });

    // Toggle current content
    content.classList.toggle('active');
    icon.textContent = content.classList.contains('active') ? '−' : '+';

    // Scroll into view with a slight delay to ensure content is visible
    if (content.classList.contains('active')) {
        setTimeout(() => {
            const headerOffset = 100; // Adjust this value based on your header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 50);
    }
};

window.toggleSubCategory = function (element, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const content = element.nextElementSibling;
    const icon = element.querySelector('.sub-toggle-icon');

    // Toggle current sub-category content
    content.classList.toggle('active');
    icon.textContent = content.classList.contains('active') ? '−' : '+';
};

// ========== Service Category Modal System ==========
const serviceCategories = {
    "PROMOTION": {
        title: "PROMOTION",
        services: [
            {
                name: "Current Promotions",
                items: [
                    { name: "Promo - Balayage (Sombre, Ombre, Highlight, 탈색)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/DZLDWR4O54YE6ZJUVNZSGEPK" },
                    { name: "Promo - Perm (펌 프로모션) Digital, Setting, Grace, Elizabeth", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/HKMNRYR7AB3E5PUCA3ET3GNB" },
                    { name: "Promo - Holiday Makeup (메이크업 프로모션)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/7C6S3IXDAFUMKNZQE7UMIXW7" },
                    { name: "Promo - Eyebrow Special (반영구)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/VNPS6G5M2LRIN3552IVB3YD2" },
                    { name: "Promo - HAIR LINE SEMI PERMANENT (헤어라인 반영구)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/IZMSQE5JJXESH6VMHFI2M77T" },
                    { name: "Promo - EyeLiner, Semi Permanent (아이라이너)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/DUOIQQEMH77ZSHFW7AKSBM2O" },
                    { name: "Promo - ALL Lashes (래쉬)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/H3AK2LTIVVH43UOHCCBC2D3R" },
                    { name: "Promo - Botox (보톡스)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/4UBB2KG7MFGGURRG7EMFHTRD" },
                    { name: "Promo - Kid's Face Painting (Birthday Party & Group Service)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/256SP7VLP2SVB3VFKBB2STAF" }
                ]
            }
        ]
    },
    "Women's Hair": {
        title: "WOMEN'S HAIR",
        services: [
            {
                name: "CUT",
                items: [
                    { name: "Women's Haircut & Styling", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/53UWDR6VN5JJPBFNTIW7W53V" },
                    { name: "Women's Bang Trim / Bang Cut (앞머리커트)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/FZWBFDZVJLQDSFFYWMWL3F6R" }
                ]
            },
            {
                name: "COLOR",
                items: [
                    { name: "Women's Balayage (Sombre & Ombre -발레야쥬, 솜브레, 옴브레)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/W3K745QRXBV2NEFNPSL5RYAE" },
                    { name: "Women's Color (Non-Bleach, 염색)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/ODZSZBCOV7H7K7UKSYTKGDD4" },
                    { name: "Women's Color (Bleach,탈색)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/OWLYLHDIGPJM6CBO4JC6RXQK" },
                    { name: "Women's Roots Touch - Color (뿌리염색)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/GRPKD3EHWJZ4JPNGH3MWCIMR" },
                    { name: "Women's Roots Touch - Bleach (뿌리탈색)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/ZYOUITBE3YF3QATL3RPM24YS" }
                ]
            },
            {
                name: "PERM",
                items: [
                    { name: "Women's \"Magic\" Straight Perm (매직스트레이트)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/325IHL4FZUB5LYGCU4TISQE5" },
                    { name: "Women's Volume \"Magic\" Straight Perm (볼륨매직스트레이트)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/OSWB2RFBM3GUACFYQZWSIGIO" },
                    { name: "Women's Setting & Digital Perm (디지털 OR 세팅펌)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/OP72CNTO7JWRZZSQSIKUVTVW" },
                    { name: "Women's Magic Setting Perm (Straight+Curl, 매직세팅)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/SUAYYRVBHAMOIH7LGMBLD2AP" },
                    { name: "Women's Regular Perm (일반펌)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/5N7NLMYMN6A5XYO5AS3QFQ72" },
                    { name: "Women's Bang Perm (앞머리펌)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/CEPBYR3O636MYCB3OFELQEO4" },
                    { name: "Women's Volume Roots Perm (뿌리펌)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/TO2VBD6JW6HJR2L73JCQAXFT" }
                ]
            },
            {
                name: "TREATMENT",
                items: [
                    { name: "Women's Hair Moisturizing Treatment (트리트먼트)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/BTO5EZDIK5WAIAZ5YJGLFARE" },
                    { name: "Women's Scalp & Hair Treatment (두피+헤어케어)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/UBO3VG37M2ZBQVFVJNWE4DXA" }
                ]
            },
            {
                name: "STYLING",
                items: [
                    { name: "Women's Regular Blow Dry & Styling (일반 웨이브 스타일링)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/UK4UF4RFXM3HZY2M47LH7MCA" },
                    { name: "Women's Special Blow Dry & Styling (스페셜 스타일링)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/UK4UF4RFXM3HZY2M47LH7MCA" }
                ]
            },
            {
                name: "EXTENSION",
                items: [
                    { name: "Women's Hair Extension (붙임머리)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/N4UWPKXHY6U73L6JE7H37VHM" }
                ]
            }
        ]
    },
    "Men's Hair": {
        title: "MEN'S HAIR",
        services: [
            {
                name: "Men's Services",
                items: [
                    { name: "Men's Haircut (남성커트)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/3NOHRAGKHZPUUNN6Y5Y5I3VY" },
                    { name: "Men's Barber Style Fade & Haircut (남성 페이드 & 바버 커트)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/XSMZ7IPSIUCFBMXURU6TSUCR" },
                    { name: "Men's Barber Style Fade & Haircut with Beard Trim (남성 바버 페이드 커트 + 구루밍)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/YGYOON3FTHXO3ZNYHMWN5DNV" },
                    { name: "Men's Perm (일반, 디자이너펌)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/LTUE2V4SCEKDAMK5HMJYIGUK" },
                    { name: "Men's Down Perm (다운펌)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/G2SPU5BREZUPS6FIAOWIVTPH" },
                    { name: "Men's Special Blow Dry & Styling (스타일링)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/UO2CLNDQY75OQUILSQXU6Q4S" },
                    { name: "Men's Haircut & Scalp & Hair Spa (커트+두피케어)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/TOJSPNURRNCRGU7FNQOVJVD3" },
                    { name: "Men's Color (Non-Bleach, 염색)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/KVPTFEJJS7222RIXRXVCDX6Y" },
                    { name: "Men's Color (Bleach, 탈색)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/L6Y2PG3A5M6KWED23J4X5LUJ" },
                    { name: "Men's Volume Magic (볼륨매직)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/UR67BM323ISUJEDZZTARFVML" },
                    { name: "Men's Hair Treatment (트리트먼트)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/UN2XI3WLRRHGPQY5NRXPT5QB" },
                    { name: "Men's Scalp & Hair Treatment (두피+헤어케어)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/PBOEUSOOVOOZU5XE243RZMRO" }
                ]
            }
        ]
    },
    "Kids Hair": {
        title: "KIDS HAIR",
        services: [
            {
                name: "Kids Services",
                items: [
                    { name: "Girls' (Toddler) Hair Cut", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/NPR4QK5YZ4LICFMQVKZGGBXB" },
                    { name: "Boys' (Toddler) Hair Cut", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/WQEELYWPD7ICXHBHY2BS6WRF" },
                    { name: "Girl's Perm", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/4GBHTINVLL6J47VWOC7ALRRG" },
                    { name: "Boy's Perm", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/C663A66LSOKAKEHEW6QVERQJ" },
                    { name: "Kid's Face Painting (키즈 페이스 페인팅)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/HESSRKGEEK3SNJNNUU7WZWQ7" }
                ]
            }
        ]
    },
    "Makeup": {
        title: "MAKEUP",
        services: [
            {
                name: "Makeup Services",
                items: [
                    { name: "Personal Daily Make Up (메이크업)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/IATB3OUX5NBFR7GD4JVK3QAV" },
                    { name: "Daily Make up & Hair Styling (스타일링 & 메이크업)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/LQKYJUQIJS6J2KLQ5JWFVJ2I" },
                    { name: "Special Day Make Up (스페셜 데이 메이크업)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/IB2O43W5EQASDSKZWWXXTMXI" },
                    { name: "Special Day Make Up & Styling(스폐셜데이 메이크업 & 스타일링)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/PODUPHMYF4R436KGH3472AAX" },
                    { name: "Personalized 1:1 Make UP Class (메이크업 클래스)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/OQZ2KOHTJEUSBZZQIDHSNQWA" },
                    { name: "Personal Color Analysis (펄스널컬러)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/KDXS2M4NT7TPG5NEOC5YQPAK" }
                ]
            }
        ]
    },
    "EyeBrow": {
        title: "EYEBROW",
        services: [
            {
                name: "Eyebrow Services",
                items: [
                    { name: "EyeBrow Service Consultation - FREE", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/SHF74CEUSQEVR2QF2C4J4T6F" },
                    { name: "Semi Permanent Eyebrow Enhancements (Microblading & Shading Combo)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/LLHR47JRIJAVMC7KEOCWAOM6" },
                    { name: "Semi Permanent Nano Brows (나노 눈썹 시술)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/O2OTDADUDHP2CH4PI7PI77AS" },
                    { name: "Semi Permanent Nano Combo Brows (나노 콤보 눈썹)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/QZJ6WX2XELHPIBCDRCSN3LVN" },
                    { name: "Semi Permanent Microblading & Shading Re-Touch", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/ZBRP3OXT44RJRZH2UGWULFGS" },
                    { name: "Semi Permanent NanoBrow Retouch (나노 리터치)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/NTHZTTMNU2ZFKXJVYHSUHO2W" },
                    { name: "Lash Keratin Lift & Perm", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/YWWOOE4CSTRFIJ2U3OBSHYZ4" }
                ]
            }
        ]
    },
    "EYELINER": {
        title: "EYELINER",
        services: [
            {
                name: "Eyeliner Services",
                items: [
                    { name: "Soft Inner Eyeliner (소프트 반영구 아이라이너)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/QFOEP5634ZRFNVUOP5HDXZSQ" },
                    { name: "Designed Eyeliner (디자인 반영구 아이라이너)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/YPKJQGASWXI4NX4OFRJ22IYG" }
                ]
            }
        ]
    },
    "Hair Line": {
        title: "HAIR LINE",
        services: [
            {
                name: "Hair Line Services",
                items: [
                    { name: "Hair Line - Semi Permanent with Retouch (헤어라인, 리터치 포함)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/JLMDJYQ66KWU33TVQ5OBH3G5" },
                    { name: "Hair Line - Semi Permanent Retouch Only (헤어라인 리터치)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/WFVLPLCJMBGUNYHHVAX2DSCN" }
                ]
            }
        ]
    },
    "LIPS": {
        title: "LIPS",
        services: [
            {
                name: "Lip Services",
                items: [
                    { name: "Lip Blush Semi-Permanent (입술 반영구, 리터치 포함)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/TEVIJSAC43N7DWYABQU2YK62" },
                    { name: "Lip Blush Semi-Permanent Retouch (입술 반영구 리터치)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/4QHFGSXKLNRCATVD75URDKZD" }
                ]
            }
        ]
    },
    "Lashes": {
        title: "LASHES",
        services: [
            {
                name: "Lash Services",
                items: [
                    { name: "Classic Lash", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/ZJE5PDRWZIDLVTUZKOKGASFI" },
                    { name: "Hybrid Lash", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/NKBX5SBXKNNBN3IMWAD5MUTT" },
                    { name: "Volume Lash", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/XQGJGETJHA3FSTNKBCQ72ZGY" },
                    { name: "Mega Volume lash", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/JQUE4EGUMBJ6EJQV7MTGHZNJ" },
                    { name: "Animated Lash", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/4OBT22ARTNOGTSWFUKFFVVQ7" },
                    { name: "Lash Keratin Perm & Lift", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/CEAKIG3S35BQMR7IHSLWD4P7" },
                    { name: "Lash Keratin Lift Dual Perm", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/ONFYUVPKMPS6H3L3QUWP4YA6" },
                    { name: "Lash Tint", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/N7WXP32ECAA5IFGASI4TUB6O" },
                    { name: "Lift & Tint Lash", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/OMHPZAFHKNGAH3BKNHWZOKJ3" },
                    { name: "Lash Removal", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/3IOAYEL2I2HNCYLW7NI7DWQT" },
                    { name: "Lash Touch Up & Refill", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/BL6AE6XOE6B6BSEPOUHXDT6R" }
                ]
            }
        ]
    },
    "Aesthetic": {
        title: "AESTHETIC",
        services: [
            {
                name: "Aesthetic Services",
                items: [
                    { name: "Aesthetic Service Consultation - FREE", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/2JSLP6I6Y5LJBZ4IUGRBCYFQ" },
                    { name: "Botox (주름 보톡스)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/RAUTWJQQYK6RPQTIDHAV6WEV" },
                    { name: "Botox (Swan Neck, Calf Slimming, 승모근, 종아리)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/YYPFJ7QI56Y7EF3SCUROM3DI" },
                    { name: "Botox Re-Touch(재방문)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/UVSOQQ7F2VWQKEJTKBFWSUAI" },
                    { name: "Filler 필러(Lip/Cheek/Chin/Jawline/Nasolabial)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/6DNWAOEKNMWA47OLEQWR2WFR" },
                    { name: "Hair Restoration (PRP) 탈모치료", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/3UUY7NPR7KCHN5E6J7XQJN32" },
                    { name: "Skin booster/ Microneedling (PRP) 피부 재생 시술 (엑소좀/자가혈)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/HNKU4GFHYCYGEIUQE67HRLJG" },
                    { name: "Fat Dissolve 지방 제거 시술 (이중턱/팔뚝살/뱃살/심술보)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/VQ5EQDUVG4TJ4WJXJQGRXECA" },
                    { name: "Fat Dissolve (Include pre-aneasthetic)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/WLK2356G7SGEHU37BSGFYEXC" },
                    { name: "Follow Up - All Service - Aesthetic", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/E6GBKCOAYJCTGV76FP3EF6LD" }
                ]
            }
        ]
    },
    "Wedding": {
        title: "WEDDING",
        services: [
            {
                name: "Wedding Services",
                items: [
                    { name: "Mobile Wedding Package Service (출장웨딩 패키지)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/44RD2UDVY3QAUE2GMEE7YQG5" },
                    { name: "Wedding Make Up (신부 메이크업)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/6SXOTBLOUWMONW6DMKOK7YBA" },
                    { name: "Wedding Make Up & UpDo Styling (신부 메이크업 & 스타일링)", url: "https://book.squareup.com/appointments/e6a0a8a8-5021-462f-911e-c7bdd85626b8/location/T4Q21JQTENKD8/services/HGKZLH7YEZWAQAGNLWDR5JFI" }
                ]
            }
        ]
    }
};

// Open Service Modal
window.openServiceCategory = function (categoryName) {
    const modal = document.getElementById('serviceModal');
    const overlay = document.getElementById('serviceModalOverlay');
    const titleEl = document.getElementById('modalCategoryTitle');
    const contentEl = document.getElementById('modalContent');

    const category = serviceCategories[categoryName];

    if (!category) {
        console.error('Category not found:', categoryName);
        return;
    }

    titleEl.textContent = category.title;
    contentEl.innerHTML = renderServiceContent(category.services);

    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add accordion event listeners
    setTimeout(() => {
        const accordionHeaders = contentEl.querySelectorAll('.service-accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const accordion = header.parentElement;
                accordion.classList.toggle('active');
            });
        });
    }, 100);
};

// Render Service Content with individual booking URLs
function renderServiceContent(services) {
    return services.map((service, index) => `
        <div class="service-accordion ${index === 0 ? 'active' : ''}">
            <div class="service-accordion-header">
                <h3>${service.name}</h3>
                <span class="accordion-icon">+</span>
            </div>
            <div class="service-accordion-content">
                ${service.items.map(item => `
                    <div class="service-list-item">
                        <span>${item.name}</span>
                        <a href="${item.url}" target="_blank" class="book-btn">Book</a>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Close Modal
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    const overlay = document.getElementById('serviceModalOverlay');

    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Listeners for Modal
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('modalClose');
    const overlay = document.getElementById('serviceModalOverlay');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeServiceModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeServiceModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeServiceModal();
        }
    });
});